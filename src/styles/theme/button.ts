import { defineStyle, defineStyleConfig } from '@chakra-ui/react';
import { AuthVendor } from '@/api/@types/@enums';
import { lightenDarkenColor } from '@/utils/color';

const VENDOR_COLORS: Record<AuthVendor, string> = {
  [AuthVendor.GOOGLE]: '#4285F4',
  [AuthVendor.KAKAO]: '#fae100',
  [AuthVendor.NAVER]: '#2db400',
};

const variants = {
  [AuthVendor.GOOGLE]: defineStyle({
    bgColor: VENDOR_COLORS[AuthVendor.GOOGLE],
    color: 'white',
    _hover: {
      bgColor: lightenDarkenColor(VENDOR_COLORS[AuthVendor.GOOGLE], -25),
    },
  }),
  [AuthVendor.KAKAO]: defineStyle({
    bgColor: VENDOR_COLORS[AuthVendor.KAKAO],
    color: 'black',
    _hover: {
      bgColor: lightenDarkenColor(VENDOR_COLORS[AuthVendor.KAKAO], -25),
    },
  }),
  [AuthVendor.NAVER]: defineStyle({
    bgColor: VENDOR_COLORS[AuthVendor.NAVER],
    color: 'white',
    _hover: {
      bgColor: lightenDarkenColor(VENDOR_COLORS[AuthVendor.NAVER], -25),
    },
  }),
};

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    _active: {
      transform: 'scale(0.98)',
    },
  },
  variants,
});
