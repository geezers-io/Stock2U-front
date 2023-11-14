import { FC, useState, useEffect } from 'react';
import { Avatar, Box, HStack, VStack, Text, Badge, Divider, Flex } from '@chakra-ui/react';
import { PurchaserGetAccountInfo } from '@/api/@types/@shared';
import { MyService } from '@/api/services/My';
import { useCustomToast } from '@/hooks/useCustomToast';

const ProfilePage: FC = () => {
  const [purchaserInfo, setPurchaserInfo] = useState<PurchaserGetAccountInfo>();
  const toast = useCustomToast();

  const fetchPurchaserInfo = async () => {
    try {
      const response = await MyService.purchaserGetAccountInfo();
      if (!response) return;
      setPurchaserInfo(response);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchPurchaserInfo();
  }, []);

  if (!purchaserInfo) {
    return;
  }

  return (
    <>
      <Box p={3}>
        <HStack spacing={4}>
          <Avatar size="lg" name={purchaserInfo.name} src={purchaserInfo.name ?? 'https://bit.ly/broken-link'} />
          <VStack align="start" ml="inherit" w="80%">
            <Text fontSize="xl" fontWeight="bold">
              {purchaserInfo?.name}
            </Text>
            <Text fontSize="md" color="gray.500">
              사용자 설명 또는 상태 메시지
            </Text>
          </VStack>
        </HStack>
      </Box>
      <Divider orientation="horizontal" />
      <Flex p="30px" gap="10px">
        <Badge fontSize="xl" colorScheme="green">
          전화번호
        </Badge>
        <Text> {purchaserInfo?.phone}</Text>
      </Flex>
    </>
  );
};

export default ProfilePage;
