import { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useBoundedStore } from '@/stores';

export function useGeoLocationAlert() {
  const toast = useCustomToast();
  const [geoLocation, startGeoLocationTracking] = useBoundedStore(state => [
    state.geoLocation,
    state.startGeoLocationTracking,
  ]);
  const [warningToastId, setWarningToastId] = useState<number | string>();

  useEffect(() => {
    startGeoLocationTracking();
  }, []);

  useEffect(() => {
    if (!geoLocation.status.supported) {
      toast.error('브라우저가 위치 정보 제공을 지원하지 않아 서비스를 이용할 수 없어요 :(');
      return;
    }

    if (!geoLocation.status.allowed) {
      if (warningToastId) {
        toast.close(warningToastId);
      }

      const id = toast.warning(
        <Flex flexDirection="column" alignItems="flex-end" gap={2}>
          <Text color="gray.900" fontWeight={500}>
            정상적인 서비스 이용을 위해 브라우저 위치 정보 제공을 허용해주세요.
          </Text>
        </Flex>,
        {
          position: 'bottom-right',
          isClosable: false,
          duration: null,
          containerStyle: { position: 'relative', bottom: '60px' },
        },
      );

      setWarningToastId(id);
    }
  }, [geoLocation.status]);
}
