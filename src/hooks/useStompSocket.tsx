import { Dispatch, SetStateAction } from 'react';
import { Client } from '@stomp/stompjs';
import { User } from '@/api/@types/Auth';
import { ChatDetails, ChatMessagePayload, ChatPayload, ChatPubAlert, HistoryResponse } from '@/api/@types/Chat';
import { ChatRoomAlertAction } from '@/hooks/domain/chat/useChatRoomReducer';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useBoundedStore } from '@/stores';

const SOCKET_URL = 'ws://localhost:8081/api/ws';
// const SOCKET_URL = 'ws://galaxy4276.asuscomm.com:8081/api/ws';

const useStompSocket = () => {
  const { user, client, setClient } = useBoundedStore(({ user, client, setClient }) => ({
    user,
    client,
    setClient,
  }));
  const toast = useCustomToast();

  /**
   * 소켓 연결을 수행하여 객체를 초기화합니다.
   * @param userInject 유저객체는 외부 주입으로 초기화할 수도 있습니다
   */
  const connect = async (userInject?: User): Promise<boolean | undefined> => {
    const adjustedUser = userInject ?? user;

    if (!adjustedUser) {
      toast.error('로그인이 필요합니다.');
      return Promise.resolve(false);
    }

    // 객체 초기화(소켓 연결) 수행
    if (!client) {
      const headers = {
        userId: String(adjustedUser.id),
        phone: adjustedUser.phone,
      };
      const client = new Client({
        brokerURL: SOCKET_URL,
        connectHeaders: headers,
        onConnect: () => {
          client.subscribe(
            `/topic/alert/${adjustedUser.id}`,
            o => {
              console.log(`Message Received: ${o.body}`);
              toast.info(o.body);
            },
            headers,
          );
        },
        onStompError: frame => {
          console.log(frame.body);
        },
      });
      client.activate();
      setClient(client);

      return await new Promise(resolve => {
        let tick = 0;
        setInterval(() => {
          if (tick === 8) {
            // 4000ms
            resolve(false);
          }
          tick++;
          if (client.connected) {
            resolve(true);
          }
        }, 500);
      });
    }
  };

  const observeAllRoomAlert = (dispatch: Dispatch<ChatRoomAlertAction>) => {
    if (!user) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    if (!client?.connected) {
      toast.error('서버 연결 간 에러가 발생하였습니다.');
      return;
    }

    const sub = (client as Client).subscribe(
      `/topic/chat/alert/${user.id}`,
      socket => {
        const alert = JSON.parse(socket.body) as ChatPubAlert;
        const { type } = alert;
        console.debug({ alert });
        dispatch({ type, data: alert });
      },
      {
        userId: String(user.id),
        phone: user.phone,
      },
    );

    return sub.id;
  };

  const observeChat = (
    reservationId: number,
    mutate: Dispatch<SetStateAction<HistoryResponse | null>>,
  ): string | undefined => {
    if (!user) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    if (!client?.connected) {
      toast.error('소켓 객체가 초기화되지 않았습니다');
      return;
    }

    const sub = client.subscribe(
      `/topic/chat/room/${reservationId}`,
      socket => {
        const chat = JSON.parse(socket.body) as ChatDetails;
        console.log({ chat });
        mutate(prev => {
          if (!prev) return null;
          return {
            ...prev,
            histories: [...prev.histories, chat],
          };
        });
      },
      {
        userId: String(user.id),
        phone: user.phone,
      },
    );

    return sub.id;
  };

  const sendChat = (reservationId: number, messagePayload: ChatMessagePayload) => {
    if (!user) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    if (!client?.connected) {
      return;
    }

    const payload: ChatPayload = {
      roomId: reservationId,
      userId: user.id,
      sender: user.name,
      ...messagePayload,
    };

    client.publish({
      destination: `/app/chat/${reservationId}`,
      body: JSON.stringify(payload),
      headers: {
        userId: String(user.id),
        phone: user.phone,
      },
    });
  };

  return { client, connect, observeAllRoomAlert, observeChat, sendChat };
};

export default useStompSocket;
