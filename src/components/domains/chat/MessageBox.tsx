import { Avatar, Flex, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { User } from '@/api/@types/Auth';
import { ChatDetails } from '@/api/@types/Chat';

interface MessageBoxProps {
  user: User;
  chat: ChatDetails;
}

const MessageBox = ({ chat, user }: MessageBoxProps) => {
  const { createdAt, username, read, type, profileImageUrl } = chat;

  if (type === 'TEXT') {
    return (
      <Content
        username={username}
        read={read}
        createdAt={createdAt}
        user={user}
        profileImageUrl={profileImageUrl}
        content={() => <Text>{chat.message}</Text>}
      />
    );
  }

  return <Flex></Flex>;
};

interface ContentProps {
  username: string;
  createdAt: string;
  content: () => JSX.Element;
  read: boolean;
  profileImageUrl?: string;
  user: User;
}
const Content = ({ content, createdAt, username, user, profileImageUrl }: ContentProps) => {
  const me = user.name === username;
  const alignSelf = me ? 'flex-start' : 'flex-end';
  const bgColor = me ? 'blue.400' : 'gray.50';
  const textColor = me ? 'white' : 'gray.700';
  const time = dayjs(createdAt).format('HH:ss');

  return (
    <Flex columnGap="2" alignSelf={alignSelf}>
      <Flex flexDir="column">
        <Flex flexDirection="column" w="fit-content" px="3" py="1" rounded="2xl" bgColor={bgColor} color={textColor}>
          {content()}
        </Flex>
        {!me && (
          <Text size="xs" color="gray.400" alignSelf="flex-end">
            {time}
          </Text>
        )}
      </Flex>

      {!me && <Avatar size="sm" src={profileImageUrl} />}
    </Flex>
  );
};

export default MessageBox;
