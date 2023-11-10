import { useEffect, useState } from 'react';
import { Flex, Input } from '@chakra-ui/react';
import { ChatRoomResponse } from '@/api/@types/Chat';
import { ChatService } from '@/api/services/Chat';
import ChatRoomPreview from '@/components/domains/chat/ChatRoomPreview';
import InfiniteScroll from '@/components/shared/InfinityScroll';
import { usePagination } from '@/hooks/usePagination';
import useStompSocket from '@/hooks/useStompSocket';

// ChatService.onDebug();

const ChatListPage = () => {
  const [title, setTitle] = useState<string>();
  console.log({ title });
  const { data, nextPage, loading, pageable } = usePagination(ChatService.getChatRooms, {
    page: 0,
    size: 15,
    title,
  });
  const { observeAllRoomAlert, client } = useStompSocket();

  // 카운트 값을 따로 갱신해야하기 때문에 ChatRoomResponse[] 상태를 따로 관리함
  const [rooms, setRooms] = useState<ChatRoomResponse[]>([]);

  useEffect(() => {
    if (!data) return;
    const currLen = rooms.length;
    if (currLen === 0) {
      return setRooms(data);
    }
    const updatedParts = data.slice(currLen - 1);
    setRooms(prevList => prevList.concat(updatedParts));
  }, [data, rooms.length]);

  useEffect(() => {
    const subId = observeAllRoomAlert(setRooms);
    return () => {
      subId && client?.unsubscribe(subId);
    };
  }, [client, observeAllRoomAlert]);

  return (
    <Flex flexDir="column">
      <Input placeholder="게시글 제목으로 검색" w="300px" my="1em" onChange={e => setTitle(e.target.value)} />
      <InfiniteScroll
        load={nextPage}
        dataLength={data?.length}
        hasMore={pageable.isLastPage}
        isLoading={loading}
        endMessage="더 이상 불러올 채팅이 없어요"
      >
        <Flex flexDir="column" rowGap="2">
          {rooms.map(r => (
            <ChatRoomPreview data={r} key={r.reservationSummary.id} />
          ))}
        </Flex>
      </InfiniteScroll>
    </Flex>
  );
};

export default ChatListPage;
