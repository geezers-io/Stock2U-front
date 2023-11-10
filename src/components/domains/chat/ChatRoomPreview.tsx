import { Link } from 'react-router-dom';
import { Flex, Image, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ReservationStatus } from '@/api/@types/@enums';
import { ChatRoomResponse } from '@/api/@types/Chat';
import { RESERVATION_STATUS_LABEL } from '@/constants/labels';

interface ChatRoomPreviewProps {
  data: ChatRoomResponse;
}

const formatHHMM = (ds: string) => dayjs(ds).format('HH:MM');
const pressureCount = (count: number) => (count > 99 ? '99+' : String(count));

const ChatRoomPreview = ({ data: { latestChat, reservationSummary, count } }: ChatRoomPreviewProps) => {
  const overflowCount = count > 99;

  return (
    <Link to={`/chat/${reservationSummary.id}`}>
      <Flex
        justify="space-between"
        alignItems="center"
        cursor="pointer"
        h="80px"
        py="2"
        px="2"
        _hover={{ backgroundColor: 'gray.100' }}
      >
        <Flex alignItems="center">
          <Image
            src={reservationSummary.uploadUrl}
            rounded="sm"
            w={['80px', '140px']}
            h="80px"
            fit="cover"
            mr={['10px', '20px']}
            shadow="sm"
          />
          <Flex flexDir="column">
            <Flex gap={2}>
              <Text fontSize={['sm', 'md']} color="gray.800">
                {reservationSummary.title}
              </Text>
              <Flex
                justify="center"
                align="center"
                w={overflowCount ? '32px' : '24px'}
                h="24px"
                bgColor="red.400"
                rounded="3xl"
                fontSize="xs"
                textColor="white"
              >
                {pressureCount(count)}
              </Flex>
            </Flex>
            <Flex columnGap={2}>
              <Text
                minW="40px"
                w={['120px', '230px', '300px']}
                maxW="300px"
                fontSize="sm"
                fontWeight={latestChat.read ? 'medium' : 'bold'}
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
                color="gray.600"
              >
                {latestChat.message}
              </Text>
              <Text color="gray.500" fontSize="sm">
                {formatHHMM(latestChat.createdAt)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <ChatReservationStatus status={reservationSummary.status} />
      </Flex>
    </Link>
  );
};

const defaultSizes = ['xs', 'sm', 'md'];

const ChatReservationStatus = ({ status }: { status: ReservationStatus }) => {
  const label = RESERVATION_STATUS_LABEL[status];
  switch (status) {
    case ReservationStatus.COMPLETION:
      return (
        <Text fontSize={defaultSizes} fontWeight="bold" color="green.400">
          {label}
        </Text>
      );
    case ReservationStatus.PROGRESS:
      return (
        <Text fontSize={defaultSizes} color="blue.400">
          {label}
        </Text>
      );
    case ReservationStatus.CANCEL:
      return (
        <Text fontSize={defaultSizes} color="red.400">
          {label}
        </Text>
      );
    case ReservationStatus.REQUESTED:
      return (
        <Text fontSize={defaultSizes} color="gray.400">
          {label}
        </Text>
      );
    default:
      return null;
  }
};

export default ChatRoomPreview;
