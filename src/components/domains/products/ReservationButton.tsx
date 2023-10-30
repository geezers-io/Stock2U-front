import { useState } from 'react';
import {
  Button,
  Grid,
  Link,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useCustomToast } from '@/hooks/useCustomToast';

const ReservationButton = () => {
  const [isReserved, setIsReserved] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useCustomToast();

  const onReserve = () => {
    setIsReserved(true);
  };

  const onlyReserve = () => {
    toast.success('예약에 성공했어요!');
  };

  const cancelReserve = () => {
    setIsReserved(false);
    toast.info('예약 요청이 취소되었습니다.');
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>예약됐습니다😊 채팅으로 바로 이동할까요?</ModalHeader>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={isOpen}>
              <Link to="../">채팅하러 갈래요!</Link>
            </Button>

            <Grid onClick={onlyReserve}>
              <Button variant="ghost" onClick={onClose}>
                아니요. 예약만 할게요
              </Button>
            </Grid>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReservationButton;
