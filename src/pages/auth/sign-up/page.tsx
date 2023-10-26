import { FC } from 'react';
import { Person, PersonVcard } from 'react-bootstrap-icons';
import { Button, ButtonProps, Flex, Text } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { UserRole } from '@/api/@types/@enums';
import { USER_ROLE_LABEL } from '@/constants/labels';
import { useRedirect } from '@/hooks/useRedirect';
import { useSearchParamsObject } from '@/hooks/useSearchParamsObject';

const ChoiceRolePage: FC = () => {
  const theme = useTheme();
  const { navigateWithRedirectPath } = useRedirect();
  const [searchParams] = useSearchParamsObject();

  const handleClickBox = (type: UserRole) => {
    const path = type === UserRole.PURCHASER ? './purchaser' : './seller';

    navigateWithRedirectPath(path, undefined, searchParams);
  };

  return (
    <Flex
      minH="inherit"
      py={theme.appStyles.paddingX}
      flexDirection="column"
      alignItems="center"
      gap={theme.appStyles.paddingX}
    >
      <FullButton colorScheme="brand" bgColor="brand.700" onClick={() => handleClickBox(UserRole.PURCHASER)}>
        <Person color="white" fontSize="4rem" />
        <Text color="white" fontWeight={500}>
          {USER_ROLE_LABEL[UserRole.PURCHASER]}로 가입하기
        </Text>
      </FullButton>
      <FullButton colorScheme="accent" bgColor="accent.700" onClick={() => handleClickBox(UserRole.SELLER)}>
        <PersonVcard color="white" fontSize="4rem" />
        <Text color="white" fontWeight={500}>
          {USER_ROLE_LABEL[UserRole.SELLER]}로 가입하기
        </Text>
      </FullButton>
    </Flex>
  );
};

function FullButton(props: ButtonProps) {
  return (
    <Button
      flex="1"
      w="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p="24px"
      borderRadius="10px"
      {...props}
    />
  );
}

export default ChoiceRolePage;
