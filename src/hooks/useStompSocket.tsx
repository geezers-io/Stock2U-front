import { Client } from '@stomp/stompjs';
import { User } from '@/api/@types/Auth';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useBoundedStore } from '@/stores';

const SOCKET_URL = 'ws://localhost:8081/api/ws';

const useStompSocket = () => {
  const { user, client, setClient } = useBoundedStore(({ user, client, setClient }) => ({
    user,
    client,
    setClient,
  }));
  const { info } = useCustomToast();

  /**
   * 소켓 연결을 수행하여 객체를 초기화합니다.
   * @param userInject 유저객체는 외부 주입으로 초기화할 수도 있습니다
   */
  const connect = (userInject?: User) => {
    const adjustedUser = userInject ?? user;

    if (!adjustedUser) {
      throw Error('로그인이 필요합니다.');
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
              info(o.body);
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

  return { client, connect };
};

export default useStompSocket;
