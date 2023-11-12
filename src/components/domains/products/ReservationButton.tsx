import { FC } from 'react';
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
import { ReservationStatus } from '@/api/@types/@enums';
import { ReservationService } from '@/api/services/Reservation';
import { useCustomToast } from '@/hooks/useCustomToast';

interface ReservationButtonProps {
  productId: number;
  isReserved: ReservationStatus | undefined;
}

const ReservationButton: FC<ReservationButtonProps> = ({ productId, isReserved }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useCustomToast();
  const navigate = useNavigate();

  const onReserve = async ({ productId }) => {
    try {
      await ReservationService.create({ productId });
      toast.success('예약 요청에 성공했어요!');
    } catch (error: Error) {
      if (error.response && error.response.status === 410) {
        toast.info('이미 예약이 요청되어 있습니다. 판매자 측에서 처리될 때까지 기다려주세요');
      } else {
        toast.error('에약 요청에 실패했어요');
      }
    }
  };
  return (
    <>
      {isReserved && (
        <Grid p="1.2rem 0" onClick={() => onReserve({ productId })}>
          <Button colorScheme="brand" onClick={onOpen}>
            구매 예약 요청하기
          </Button>
        </Grid>
      )}
      {!isReserved && (
        <Grid p="1.2rem 0" onClick={() => onReserve({ productId })}>
          <Button colorScheme="gray">{isReserved ? ReservationStatus[isReserved] : '이미 예약 요청 중'}</Button>
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
