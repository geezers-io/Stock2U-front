import { FC } from 'react';
import { PersonFill, PersonVcard } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { UserRole } from '@/api/@types/@enums';
import { USER_ROLE_LABEL } from '@/constants/labels';

const JoinPage: FC = () => {
  const theme = useTheme();

  return (
    <Box position="relative">
      <Heading
        width="100%"
        position="absolute"
        top={0}
        transform={{
          base: 'translateY(calc(-100% - 32px))',
          md: 'translateY(calc(-100% - 40px))',
        }}
        size="md"
        fontWeight="500"
        textAlign="center"
      >
        당신은 누구신가요?
      </Heading>

      <Flex
        justifyContent="center"
        gap={{
          base: theme.appStyles.paddingX,
          sm: `calc(${theme.appStyles.paddingX} + 8px)`,
          md: '36px',
        }}
        px={{
          base: 0,
          sm: '8px',
        }}
      >
        <LinkBox to="./general" style={{ borderTopColor: theme.colors.brand['600'] }}>
          <PersonFill fontSize="4rem" color={theme.colors.gray['900']} />
          <Text fontWeight={500}>{USER_ROLE_LABEL[UserRole.GENERAL]}</Text>
        </LinkBox>
        <LinkBox to="./seller" style={{ borderTopColor: theme.colors.accent['600'] }}>
          <PersonVcard fontSize="4rem" color={theme.colors.gray['900']} />
          <Text fontWeight={500}>{USER_ROLE_LABEL[UserRole.SELLER]}</Text>
        </LinkBox>
      </Flex>
    </Box>
  );
};

const LinkBox = styled(Link)`
  flex: 1;
  max-width: 280px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  border-color: ${({ theme }) => theme.colors.gray['200']};
  border-width: 1px;
  border-top-width: 10px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray['50']};
  }

  &:focus,
  &:active {
    transform: scale(0.99);
  }
`;

export default JoinPage;
