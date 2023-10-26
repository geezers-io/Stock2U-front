import { ChangeEventHandler, FC, KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { ChevronDoubleLeft, ChevronDoubleRight, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { Text, IconButton, Flex, ButtonProps, Input } from '@chakra-ui/react';

interface Props {
  pageIndex: number;
  setPageIndex: (pageIndex: number) => void;
  totalPages: number;
  totalCount: number;
}

const Pagination: FC<Props> = ({ pageIndex, setPageIndex, totalPages, totalCount }) => {
  const [currPage, setCurrPage] = useState<number>(pageIndex + 1);
  const [pageDisplay, setPageDisplay] = useState<string /* '' */ | number>(currPage);
  const [pageFocused, setPageFocused] = useState(false);
  const pageRef = useRef<HTMLInputElement>(null);

  const handleChangePage: ChangeEventHandler<HTMLInputElement> = e => {
    setPageDisplay(e.target.value.replace(/\D/g, ''));
  };

  const setRealPage = () => {
    const formattedPage = Number(String(pageDisplay).replace(/(^0+|\.\d+$|\D)/g, ''));

    const nextPage = (() => {
      if (pageDisplay === '' || formattedPage <= 0 || Number.isNaN(formattedPage)) {
        return 1;
      }

      if (formattedPage >= totalPages) {
        return totalPages;
      }

      return formattedPage;
    })();

    if (nextPage === currPage) {
      // currPage 변화를 감지하여 setPageDisplay 를 해주는 useEffect 의 보완부
      // 예시)
      // total 이 20 일때 20 입력 후 엔터, 그 다음 9999 입력 후 엔터 치면,
      // currPage 가 20 으로 동일하여 변화가 없기 때문에 effect 가 안 터져서 9999가 그대로 보여짐
      setPageDisplay(nextPage);
    }
    setCurrPage(nextPage);
    setPageIndex(nextPage - 1);
  };

  const handleKeydownPage: KeyboardEventHandler<HTMLSpanElement> = e => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      setRealPage();
    }
  };

  const handleFocusPage = () => {
    setPageFocused(true);
  };

  const handleBlurPage = () => {
    setPageFocused(false);
    setRealPage();
  };

  useEffect(() => {
    // 필터링 걸릴 때 페이지 초기화
    setCurrPage(1);
  }, [totalCount]);

  useEffect(() => {
    setCurrPage(pageIndex + 1);
  }, [pageIndex]);

  useEffect(() => {
    setPageDisplay(currPage);
  }, [currPage]);

  return (
    <Flex maxW="max-content" alignItems="center" gap={0.5}>
      <IconButton
        aria-label="first"
        icon={<ChevronDoubleLeft />}
        onClick={() => setPageIndex(0)}
        isDisabled={pageIndex === 0}
        {...buttonProps}
      />
      <IconButton
        aria-label="prev"
        icon={<ChevronLeft />}
        onClick={() => setPageIndex(pageIndex - 1)}
        isDisabled={pageIndex === 0}
        {...buttonProps}
      />

      <Flex alignItems="center" gap={2.5}>
        <Input
          ref={pageRef}
          value={pageDisplay.toString()}
          w="60px"
          px="0"
          textAlign="center"
          minW={`calc(${pageDisplay.toString().length} * 0.9em)` /* page 자릿수가 늘어나면 width 도 늘림 */}
          onChange={handleChangePage}
          onKeyDown={handleKeydownPage}
          onFocus={handleFocusPage}
          onBlur={handleBlurPage}
        />

        <Text fontSize="md" color={pageFocused ? 'gray.300' : 'gray.500'} whiteSpace="nowrap" userSelect="none">
          {`/ ${totalPages || 1}`}
        </Text>
      </Flex>

      <IconButton
        aria-label="next"
        icon={<ChevronRight />}
        onClick={() => setPageIndex(pageIndex + 1)}
        isDisabled={pageIndex + 1 === totalPages}
        {...buttonProps}
      />
      <IconButton
        aria-label="last"
        icon={<ChevronDoubleRight />}
        onClick={() => setPageIndex(totalPages - 1)}
        isDisabled={pageIndex + 1 === totalPages}
        {...buttonProps}
      />
    </Flex>
  );
};

const buttonProps: ButtonProps = {
  size: 'sm',
  variant: 'ghost',
  colorScheme: 'gray',
  h: '30px',
  w: '30px',
  borderWidth: 0,
  p: 0,
};

export default Pagination;
