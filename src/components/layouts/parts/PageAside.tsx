import { FC } from 'react';
import {
  Chat,
  ChatFill,
  GeoAlt,
  GeoAltFill,
  Heart,
  HeartFill,
  HouseDoor,
  IconProps,
  Person,
  PersonFill,
} from 'react-bootstrap-icons';
import { Link, useLocation } from 'react-router-dom';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useTheme } from '@emotion/react';

const HOME_WRAP_WIDTH = '6rem';

const PageAside: FC = () => {
  const { pathname } = useLocation();
  const { appStyles } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box as="aside" w="100%" h={appStyles.asideHeight} position="fixed" bottom={0}>
      <Flex as="nav" h="100%" maxW={appStyles.maxWidth} margin="0 auto">
        <NavLink to="/products" /* TODO: with filter */ icon={{ normal: GeoAlt, active: GeoAltFill }} text="내주변" />
        <NavLink to="/chat" icon={{ normal: Chat, active: ChatFill }} text="채팅" />

        <Box w={HOME_WRAP_WIDTH} position="relative" zIndex={30}>
          <Box position="absolute" left="50%" transform="translate(-50%, -10%)">
            {pathname === '/' && (
              <Button
                onClick={scrollToTop}
                variant="unstyled"
                w="3rem"
                h="3rem"
                boxShadow="0 3px 6px -1.5px rgba(0,0,0,.3)"
                borderRadius="50%"
              >
                <Image src="svg/brand/logo-fill.svg" w="100%" h="100%" />
              </Button>
            )}
            {pathname !== '/' && (
              <Link to="/">
                <Box
                  w="3rem"
                  h="3rem"
                  boxShadow="0 3px 6px -1.5px rgba(0,0,0,.3)"
                  borderRadius="50%"
                  bg="white"
                  css={{
                    '&:hover > img': {
                      display: 'block',
                    },
                    '&:hover > div': {
                      display: 'none',
                    },
                  }}
                >
                  <Image src="svg/brand/logo-fill.svg" w="100%" h="100%" display="none" />
                  <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
                    <HouseDoor size={20} />
                  </Flex>
                </Box>
              </Link>
            )}
          </Box>
        </Box>

        <NavLink to="/wishlist" icon={{ normal: Heart, active: HeartFill }} text="찜" />
        <NavLink to="/my" icon={{ normal: Person, active: PersonFill, size: 24 }} text="마이" />

        <Flex
          w="100%"
          position="absolute"
          inset={0}
          zIndex={-1}
          _before={{
            content: '""',
            width: '50%',
            height: '5.6rem',
            display: 'inline-block',
            background: 'white',
            boxShadow: '0 -2px 2px -2px rgba(0,0,0,.3)',
            borderRightRadius: '1rem',
          }}
          _after={{
            content: '""',
            width: '50%',
            height: '5.6rem',
            display: 'inline-block',
            background: 'white',
            boxShadow: '0 -2px 2px -2px rgba(0,0,0,.3)',
            borderLeftRadius: '1rem',
          }}
        >
          <Box w="3rem" h="3rem" bg="white" position="relative" top="1.33rem" />
        </Flex>
      </Flex>
    </Box>
  );
};

function NavLink({
  to,
  icon: { normal: NormalIcon, active: ActiveIcon, size: iconSize = 18 },
  text,
}: {
  to: string;
  icon: { normal: FC<IconProps>; active: FC<IconProps>; size?: number };
  text: string;
}) {
  const { pathname } = useLocation();
  const isActive = pathname.startsWith(to);

  return (
    <Link
      to={to}
      style={{
        width: `calc(25% - (${HOME_WRAP_WIDTH} / 4))`,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Flex w="24px" h="24px" justifyContent="center" alignItems="center" color={isActive ? 'brand.500' : 'gray.900'}>
        {isActive ? <ActiveIcon fontSize={iconSize} /> : <NormalIcon fontSize={iconSize} />}
      </Flex>
      <Text fontSize="2xs">{text}</Text>
    </Link>
  );
}

export default PageAside;
