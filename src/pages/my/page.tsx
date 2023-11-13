import { FC } from 'react';
import {
  Box,
  VStack,
  Image,
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
} from '@chakra-ui/react';

const MyPage: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userImageUrl = '';
  const purchaseHistoryUrl = '';
  const reservationHistoryUrl = '';
  const subscribedSellersUrl = '';

  const handleLogout = () => {
    console.log('로그아웃');
  };

  return (
    <Box p={4}>
      <VStack align="start" spacing={4}>
        <Box>
          <Link onClick={onOpen}>
            <Image
              src={userImageUrl || 'https://w7.pngwing.com/pngs/665/132/png-transparent-user-defult-avatar.png'}
              boxSize="100px"
              borderRadius="full"
            />
          </Link>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>회원 정보 수정</ModalHeader>
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
