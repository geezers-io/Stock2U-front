import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Avatar, VStack, HStack, Text, Divider, Flex, Button } from '@chakra-ui/react';
import { PurchaserGetAccountInfo } from '@/api/@types/@shared';
import { MyService } from '@/api/services/My';
import { useCustomToast } from '@/hooks/useCustomToast';

const MyPage: FC = () => {
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
    <Box display="flex" flexDirection="row" p={4} pt={10}>
      <Box ml={8} w="100%">
        <HStack spacing={4}>
          <Avatar size="lg" name={purchaserInfo.name} src={purchaserInfo.avatarUrl} />
          <VStack align="start" ml="inherit" w="80%">
            <Text fontSize="xl" fontWeight="bold">
              {purchaserInfo.name}
            </Text>
            <Text fontSize="xl" color="gray">
              판매 재고 {purchaserInfo.buyCount} 후기 {purchaserInfo.reviewCount}
            </Text>
          </VStack>
          <Flex>
            <Link to="/my/profile">
              <Button colorScheme="brand" align-items="center" flexDirection="row-reverse">
                프로필 보기
              </Button>
            </Link>
          </Flex>
        </HStack>

        <Box mt={8}>
          <Text fontSize="xl" fontWeight="bold">
            구매 내역
          </Text>
        </Box>
        <Divider my={10} />
        <Box mt={8}>
          <Text fontSize="xl" fontWeight="bold">
            예약 내역
          </Text>
        </Box>
        <Divider my={10} />
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            찜한 상품
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default MyPage;
