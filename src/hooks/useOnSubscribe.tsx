import { useEffect } from 'react';
import useStompSocket from '@/hooks/useStompSocket';

/**
 * 채널 구독 함수를 수행하기 직전에 소켓 연결여부를 확인하고 자동으로 재연결을 수행해주는 유틸성 훅입니다.
 * @param subscribe 채널 구독 함수
 */
const useOnSubscribe = (subscribe: () => string | undefined) => {
  const { client, connect } = useStompSocket();

  useEffect(() => {
    if (!client || !client.connected) {
      connect();
      return;
    }

    let subId: string;
    (async () => {
      const id = await subscribe();
      if (id) {
        subId = id;
      }
    })();

    return () => {
      subId && client?.unsubscribe(subId);
    };
  }, [client]);
};

export default useOnSubscribe;
