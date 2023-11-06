import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
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

  useEffect(() => {
    if (!user) {
      throw Error('로그인이 필요합니다.');
    }

    // 객체 초기화(소켓 연결) 수행
    if (!client) {
      const headers = {
        userId: String(user.id),
        phone: user.phone,
      };
      const client = new Client({
        brokerURL: SOCKET_URL,
        connectHeaders: headers,
        onConnect: () => {
          console.debug('소켓 커넥션이 수행됨');
          client.subscribe(
            `/topic/alert/${user.id}`,
            o => {
              info(o.body);
            },
            headers,
          );
        },
        onStompError: frame => {
          console.error('stomp 에러 발생');
          console.log(frame.body);
        },
      });
      client.activate();
      setClient(client);
    }
  }, [client, user]);

  return client;
};

export default useStompSocket;
