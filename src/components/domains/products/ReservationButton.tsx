import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useCustomToast } from '@/hooks/useCustomToast';

const ReservationButton = () => {
  const [isReserved, setIsReserved] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useCustomToast();
  const navigate = useNavigate();

  const onReserve = () => {
    setIsReserved(true);
    toast.success('예약에 성공했어요!');
  };

  const cancelReserve = () => {
    setIsReserved(false);
    toast.info('예약이 취소되었어요.');
  };

  return (
    <>
      {!isReserved && (
        <Grid p="1.2rem 0" onClick={onReserve}>
          <Button colorScheme="brand" onClick={onOpen}>
            구매 예약 요청하기
          </Button>
        </Grid>
      )}
      {isReserved && (
        <Grid p="1.2rem 0">
          <Button colorScheme="gray" onClick={cancelReserve}>
            구매 예약 요청 취소하기
          </Button>
        </Grid>
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />

          <ModalHeader />
          <ModalBody py={6}>
            <Text textAlign="center">예약됐습니다😊 채팅으로 바로 이동할까요?</Text>
          </ModalBody>

          <ModalFooter gap={2}>
            <Button role="link" onClick={() => navigate('/chat')} colorScheme="blue" flex={1}>
              채팅하러 갈래요!
            </Button>

            <Button variant="ghost" onClick={onClose} flex={1}>
              아니요. 예약만 할게요
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReservationButton;
