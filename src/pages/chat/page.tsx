import { Flex, Input } from '@chakra-ui/react';
import { PageResponse } from '@/api/@types/@shared';
import { ChatRoomResponse } from '@/api/@types/Chat';
import { ChatService } from '@/api/services/Chat';
import ChatRoomPreview from '@/components/domains/chat/ChatRoomPreview';
import useFetch from '@/hooks/useFetch';

ChatService.onDebug();

const ChatListPage = () => {
  const {
    data: { content },
  } = useFetch(() => ChatService.getChatRooms({ page: 0, size: 100 }), {
    initialValues: {
      content: [],
    } as unknown as PageResponse<ChatRoomResponse>,
  });

  return (
    <Flex flexDir="column">
      <Input placeholder="게시글 제목으로 검색" w="300px" my="1em" />
      <section>
        {content.map(r => (
          <ChatRoomPreview data={r} key={r.reservationSummary.id} />
        ))}
      </section>
    </Flex>
  );
};

export default ChatListPage;
