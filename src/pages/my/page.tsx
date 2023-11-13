import { FC, useEffect, useState } from 'react';
import {
  Box,
  Avatar,
  VStack,
  HStack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
} from '@chakra-ui/react';
import { MyService } from '@/api/services/My';

interface PurchaserGetAccountInfo {
  username: string;
  avatarUrl: string;
}

const MyPage: FC = () => {
  const [purchaserInfo, setPurchaserInfo] = useState<PurchaserGetAccountInfo>();

  useEffect(() => {
    const fetchPurchaserInfo = async () => {
      try {
        const { username, avatarUrl } = await MyService.purchaserGetAccountInfo();

        if (username && avatarUrl) {
          setPurchaserInfo({ username, avatarUrl });
        } else {
          console.error('구매자 정보를 가져오지 못했습니다.');
        }
      } catch (error) {
        console.error('구매자 정보를 가져오는중 오류가 발생했습니다.', error);
      }
    };

    fetchPurchaserInfo();
  }, []);

  return (
    <Box display="flex" flexDirection="row" p={4} pt={10}>
      <VStack align="start" spacing={4}>
        <Text fontWeight="bold" fontSize="xl">
          마이페이지
        </Text>
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Text fontWeight="bold">나의 쇼핑</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text>구매 내역</Text>
              <Text>예약 내역</Text>
              <Text>찜한 상품</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Text fontWeight="bold">내 정보</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Text>정보 관리</Text>
              <Text>결제 관리</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>

      <Box ml={8}>
        <HStack spacing={4}>
          <Avatar size="lg" name={purchaserInfo?.username} src={purchaserInfo?.avatarUrl} />
          <VStack align="start">
            <Text fontSize="xl" fontWeight="bold">
              {purchaserInfo?.username}
            </Text>
            <Text fontSize="md" color="gray.500">
              사용자 설명 또는 상태 메시지
            </Text>
          </VStack>
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
