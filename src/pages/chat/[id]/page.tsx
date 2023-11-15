import { KeyboardEvent, useState } from 'react';
import { redirect, useParams } from 'react-router-dom';
import { Flex, Grid, Input } from '@chakra-ui/react';
import { ChatService } from '@/api/services/Chat';
import MessageBox from '@/components/domains/chat/MessageBox';
import useFetch from '@/hooks/useFetch';
import useOnSubscribe from '@/hooks/useOnSubscribe';
import useStompSocket from '@/hooks/useStompSocket';
import { useBoundedStore } from '@/stores';

const ChatPage = () => {
  const params = useParams<string>();
  const user = useBoundedStore(state => state.user);
  const reservationId = Number(params?.id);
  const { data, mutate } = useFetch([reservationId], () => ChatService.getChatHistories({ reservationId }));
  const [textMessage, setTextMessage] = useState<string>('');
  const { observeChat, client, sendChat } = useStompSocket();
  useOnSubscribe(() => observeChat(reservationId, mutate));

  const onSendMessage = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || textMessage.trim() === '') {
      return;
    }
    send();
  };

  const send = () => {
    if (!client) return;
    sendChat(reservationId, { message: textMessage });
    setTextMessage('');
  };

  if (!user) return redirect('/auth/sign-in');

  // 로딩 UI 로 업데이트
  if (!data) return null;

  return (
    <Grid templateRows="1fr auto" py="5" h="100%" rowGap="5">
      <Flex flexDirection="column" rowGap="4" flex={1} overflowY="scroll">
        {data.histories.map(chat => (
          <MessageBox user={user} chat={chat} />
        ))}
      </Flex>

      <Input w="100%" onKeyPress={onSendMessage} value={textMessage} onChange={e => setTextMessage(e.target.value)} />
    </Grid>
  );
};

export default ChatPage;
