import { Dispatch, SetStateAction } from 'react';
import { Client } from '@stomp/stompjs';
import { User } from '@/api/@types/Auth';
import { ChatPubAlert, ChatRoomResponse } from '@/api/@types/Chat';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useBoundedStore } from '@/stores';

const SOCKET_URL = 'ws://localhost:8081/api/ws';

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
  const connect = (userInject?: User) => {
    const adjustedUser = userInject ?? user;

    if (!adjustedUser) {
      return toast.error('로그인이 필요합니다.');
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
    }
  };

  const observeAllRoomAlert = (setRooms: Dispatch<SetStateAction<ChatRoomResponse[]>>) => {
    if (!user) {
      toast.error('로그인이 필요합니다.');
      return;
    }
    if (!client) {
      connect();
      console.log('observeAllRoomAlert 에서 초기화');
    }

    if (!client) {
      toast.error('소켓 객체가 초기화되지 않았습니다');
      return;
    }

    const sub = client.subscribe(
      `/topic/chat/alert/${user.id}`,
      socket => {
        const alert = JSON.parse(socket.body) as ChatPubAlert;
        const { reservationId, message } = alert;

        // if (type === PubAlertType.CREATION) {
        //   setRooms(prev => [newRoom, ...prev]);
        //   return sub.id;
        // }

        setRooms(rooms => {
          const targetIdx = rooms.findIndex(r => r.reservationSummary.id === reservationId);
          const results = [...rooms];
          const row = { ...rooms[targetIdx] };
          results[targetIdx] = {
            ...row,
            latestChat: {
              ...row.latestChat,
              message,
            },
            count: row.count + 1,
          };
          return results;
        });
      },
      {
        userId: String(user.id),
        phone: user.phone,
      },
    );

    return sub.id;
  };

  const observeChat = (reservationId: number) => {
    if (!client) {
      toast.error('소켓 객체가 초기화되지 않았습니다');
      return;
    }

    client.subscribe(`/topic/chat/room/${reservationId}`, socket => {
      const alert = JSON.parse(socket.body) as ChatPubAlert;
      console.log({ alert });
    });
  };

  return { client, connect, observeAllRoomAlert, observeChat };
};

export default useStompSocket;
