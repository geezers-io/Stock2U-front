import { FC, useState, useEffect } from 'react';
import { Avatar, Box, HStack, VStack, Text, Badge, Divider, Flex, Button } from '@chakra-ui/react';
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
      <Box p={3} pt={10}>
        <HStack spacing={4}>
          <Avatar size="lg" name={purchaserInfo.name} src={purchaserInfo.name ?? 'https://bit.ly/broken-link'} />
          <VStack align="start" ml="inherit" w="80%">
            <Text fontSize="xl" fontWeight="bold">
              {purchaserInfo.name}
            </Text>
          </VStack>
        </HStack>
      </Box>
      <Divider orientation="horizontal" mt={3} />
      <Box align-items="center">
        <Flex p="30px" gap="10px">
          <Badge fontSize="xl" colorScheme="green">
            전화번호
          </Badge>
          <Text fontSize="xl" as="b" w="80%">
            {purchaserInfo.phone}
          </Text>
          <Button w="auto"> 수정</Button>
        </Flex>
      </Box>
    </>
  );
};

export default ProfilePage;
