import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, Input } from '@chakra-ui/react';
import useStompSocket from '@/hooks/useStompSocket';

const ChatPage = () => {
  const params = useParams<string>();
  const reservationId = Number(params?.id);

  const { observeChat } = useStompSocket();

  useEffect(() => {
    observeChat(reservationId);
  }, [observeChat, reservationId]);

  return (
    <Flex>
      <Input w="100%" />
    </Flex>
  );
};

export default ChatPage;
