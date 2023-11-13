import { FC, useState } from 'react';
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
import { AxiosError } from 'axios';
import { ReservationStatus } from '@/api/@types/@enums';
import { ReservationService } from '@/api/services/Reservation';
import { RESERVATION_STATUS_COLOR, RESERVATION_STATUS_LABEL } from '@/constants/labels';
import { useCustomToast } from '@/hooks/useCustomToast';

interface ReservationButtonProps {
  productId: number;
  reservationStatus?: ReservationStatus;
  reservationId?: number;
}

const ReservationButton: FC<ReservationButtonProps> = ({ productId, reservationStatus, reservationId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useCustomToast();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(() => ({
    id: reservationId,
    status: reservationStatus,
  }));

  const canReservation = !reservation.id;

  const onReserve = async () => {
    try {
      const { id } = await ReservationService.create({ productId });
      setReservation({
        id,
        status: ReservationStatus.REQUESTED,
      });
      toast.success('예약 요청에 성공했어요!');
    } catch (e) {
      const error = e as AxiosError;
      if (error.response && error.response.status === 410) {
        toast.info('이미 예약이 요청되어 있습니다. 판매자 측에서 처리될 때까지 기다려주세요');
      } else {
        toast.error('에약 요청에 실패했어요');
      }
    }
  };

  const cancelReserve = async () => {
    try {
      if (!reservation.id) return;
      await ReservationService.cancel({ reservationId: reservation.id });
      setReservation(prev => ({ ...prev, id: undefined }));
      toast.success('예약 요청이 취소되었어요.');
    } catch {
      toast.error('에약 취소 요청에 실패했어요.');
    }
  };

  return (
    <>
      {canReservation && (
        <Grid p="1.2rem 0" onClick={onReserve}>
          <Button colorScheme="brand" onClick={onOpen}>
            구매 예약 요청하기
          </Button>
        </Grid>
      )}

      {!canReservation && reservationStatus && (
        <Grid p="1.2rem 0">
          <Button colorScheme={RESERVATION_STATUS_COLOR[reservationStatus]} m="5px" disabled>
            {RESERVATION_STATUS_LABEL[reservationStatus]}
          </Button>
          <Button colorScheme="red" m="5px" onClick={cancelReserve}>
            예약 취소하기
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
