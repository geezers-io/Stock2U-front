import { FC, useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Link,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Avatar,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { MockProductDetail, mockProductDetail } from '@/api/__mock__/product';

const MyPage: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profile, setProfile] = useState<MockProductDetail>();

  const fetchMockData = async () => {
    setProfile(mockProductDetail);
    if (!profile) return;
  };

  //const userImageUrl = '';
  const purchaseHistoryUrl = '';
  const reservationHistoryUrl = '';
  const subscribedSellersUrl = '';

  const handleLogout = () => {
    console.log('로그아웃');
  };

  useEffect(() => {
    fetchMockData();
  }, []);

  return (
    <Box p={4}>
      <VStack align="start" spacing={4}>
        <Box mt="auto">
          <Flex onClick={onOpen} role="button">
            <Avatar
              size="xl"
              name={profile?.seller.nickname}
              src={profile?.seller.profile ?? 'https://bit.ly/broken-link'}
            />
            <Box ml="3" w="100%">
              <Badge fontSize="xl" colorScheme="green">
                판매자
              </Badge>
              <Text fontSize="xl" fontWeight="bold">
                {profile?.seller.nickname} 님
                <Text fontSize="xl" color="gray">
                  판매 재고 {profile?.seller.stockCount} 후기 {profile?.seller.reviewCount}
                </Text>
              </Text>
            </Box>
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>프로필 페이지</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{/* 프로필 페이지 내용 */}</ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  닫기
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <Box>
          <Link href={purchaseHistoryUrl}>
            <Text>구매 내역 페이지로 이동</Text>
          </Link>
        </Box>
        <Box>
          <Link href={reservationHistoryUrl}>
            <Text>예약 내역 페이지로 이동</Text>
          </Link>
        </Box>
        <Box>
          <Link href={subscribedSellersUrl}>
            <Text>구독한 판매자 리스트 페이지로 이동</Text>
          </Link>
        </Box>
        <Box alignSelf="flex-end">
          <Button onClick={handleLogout}>로그아웃</Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default MyPage;
