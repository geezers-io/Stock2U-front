import { useMemo } from 'react';
import { useToast } from '@chakra-ui/react';
import { getErrorMessage } from '@/api/helper';

export function useCustomToast() {
  const toast = useToast({
    position: 'top',
    duration: 4000,
    isClosable: true,
  });

  return useMemo(
    () => ({
      ...toast,

      info: (description: string) => {
        toast({
          status: 'info',
          colorScheme: 'brand',
          description,
        });
      },
      success: (description: string) => {
        toast({
          status: 'success',
          colorScheme: 'success',
          description,
        });
      },
      error: (e: unknown) => {
        toast({
          status: 'error',
          colorScheme: 'error',
          title: 'Error',
          description: getErrorMessage(e),
        });
      },
    }),
    [toast],
  );
}
