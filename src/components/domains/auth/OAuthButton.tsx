import { FC, PropsWithChildren } from 'react';
import { Box, Button, Image } from '@chakra-ui/react';
import { AuthVendor } from '@/api/@types/@enums';

interface Props {
  vendor: AuthVendor;
  label: string;
  onClick: () => void;
}

const OAuthButton: FC<PropsWithChildren<Props>> = ({ vendor, label, onClick }) => {
  return (
    <Button
      variant={vendor}
      size="lg"
      width="320px"
      fontSize="md"
      justifyContent="space-between"
      leftIcon={<Image src={imageSRCDict[vendor]} w="24px" h="24px" />}
      rightIcon={<Box w="24px" h="24px" />}
      onClick={onClick}
    >
      {label}로 로그인
    </Button>
  );
};

const imageSRCDict: Record<AuthVendor, string> = {
  [AuthVendor.GOOGLE]: '/svg/oauth/google.svg',
  [AuthVendor.KAKAO]: '/svg/oauth/kakao.svg',
  [AuthVendor.NAVER]: '/svg/oauth/naver.svg',
};

export default OAuthButton;
