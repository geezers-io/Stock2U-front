import { Flex, Image, Text } from '@chakra-ui/react';
import { ChatRoomResponse } from '@/api/@types/Chat';
import { RESERVATION_STATUS_LABEL } from '@/constants/labels';

interface ChatRoomPreviewProps {
  data: ChatRoomResponse;
}

const ChatRoomPreview = ({ data: { latestChat, reservationSummary } }: ChatRoomPreviewProps) => {
  return (
    <Flex justify="space-between" alignItems="center" cursor="pointer" h="80px">
      <Flex alignItems="center">
        <Image
          src={reservationSummary.uploadUrl}
          w={['80px', '140px']}
          h="80px"
          fit="cover"
          mr={['10px', '20px']}
          shadow="sm"
        />
        <Flex flexDir="column">
          <Text fontSize={['sm', 'md']} color="gray.800">
            {reservationSummary.title}
          </Text>
          <Flex columnGap="2">
            <Text
              minW="40px"
              w={['100px', '230px']}
              maxW="230px"
              fontSize="sm"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              overflow="hidden"
              color="gray.600"
            >
              {latestChat.message}
            </Text>
            <Text color="gray.500" fontSize="sm">
              {/*{latestChat.createdAt.toISOString()}*/}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Text whiteSpace="nowrap" fontSize={['xs', 'sm', 'md']}>
        {RESERVATION_STATUS_LABEL[reservationSummary.status]}
      </Text>
    </Flex>
  );
};

export default ChatRoomPreview;
