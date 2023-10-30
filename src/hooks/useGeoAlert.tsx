import { useEffect, useState } from 'react';
import { Flex, Text, ToastId, UseToastOptions } from '@chakra-ui/react';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useBoundedStore } from '@/stores';

export function useGeoAlert() {
  const toast = useCustomToast();
  const [geo, startGeoTracking] = useBoundedStore(state => [state.geo, state.startGeoTracking]);
  const [errorToastId, setErrorToastId] = useState<ToastId>();
  const [warningToastId, setWarningToastId] = useState<ToastId>();

  useEffect(() => {
    startGeoTracking();
  }, []);

  useEffect(() => {
    if (!geo.status.supported) {
      if (errorToastId) {
        toast.close(errorToastId);
      }

      const id = toast.error(
        '브라우저가 위치 정보 제공을 지원하지 않아 서비스 정상적으로 이용할 수 없어요 :(',
        toastOptions,
      );
      setErrorToastId(id);
      return;
    }

    if (!geo.status.allowed) {
      if (warningToastId) {
        toast.close(warningToastId);
      }

      const id = toast.warning(
        <Flex flexDirection="column" gap={1}>
          <Text color="gray.900" fontWeight={500}>
            내 주변 재고를 찾아보려면 브라우저 위치 정보 제공을 허용해야해요.
          </Text>
          <Text fontSize="sm" color="gray.600" fontWeight={500}>
            위치 정보 제공을 허용하셨다면 페이지를 새로고침 해주세요 :)
          </Text>
        </Flex>,
        toastOptions,
      );

      setWarningToastId(id);
    }
  }, [geo.status]);
}

const toastOptions: UseToastOptions = {
  position: 'bottom-right',
  isClosable: false,
  duration: null,
  containerStyle: { position: 'relative', bottom: '60px', minWidth: 'unset' },
};
