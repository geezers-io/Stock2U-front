import { useEffect, useState } from 'react';
import { Flex, Input } from '@chakra-ui/react';
import { ChatRoomAlertType } from '@/api/@types/Chat';
import { ChatService } from '@/api/services/Chat';
import ChatRoomPreview from '@/components/domains/chat/ChatRoomPreview';
import InfiniteScroll from '@/components/shared/InfinityScroll';
import useChatRoomReducer from '@/hooks/domain/chat/useChatRoomReducer';
import useOnSubscribe from '@/hooks/useOnSubscribe';
import { usePagination } from '@/hooks/usePagination';
import useStompSocket from '@/hooks/useStompSocket';

// ChatService.onDebug();

const ChatListPage = () => {
  const [title, setTitle] = useState<string>();
  const { data, nextPage, loading, pageable } = usePagination(ChatService.getChatRooms, {
    page: 0,
    size: 15,
    title,
  });
  const { observeAllRoomAlert } = useStompSocket();
  const {
    state: { rooms },
    dispatch,
  } = useChatRoomReducer();
  useOnSubscribe(() => observeAllRoomAlert(dispatch));

  useEffect(() => {
    if (!data) return;
    const currLen = rooms.length;
    if (currLen === 0) {
      dispatch({ type: ChatRoomAlertType.FORCE_UPDATE, forceUpdateValues: data });
    }

    const existsIds = rooms.map(r => r.reservationSummary.id);
    const updatedParts = data.filter(p => !existsIds.includes(p.reservationSummary.id));
    const forUpdate = rooms.concat(updatedParts);
    dispatch({ type: ChatRoomAlertType.FORCE_UPDATE, forceUpdateValues: forUpdate });
  }, [data]);

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
