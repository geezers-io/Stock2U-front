import { ReactNode, useEffect, useRef, useCallback, FC } from 'react';
import { Box, BoxProps, Spinner } from '@chakra-ui/react';

interface InfiniteScrollProps {
  load: () => void;
  dataLength: number | undefined;
  hasMore: boolean;
  isLoading: boolean;
  children: ReactNode;
  endMessage?: ReactNode;
  wrapperProps?: BoxProps;
  observedBoxProps?: BoxProps;
  intersectionObserverOptions?: IntersectionObserverInit;
}

const InfiniteScroll: FC<InfiniteScrollProps> = ({
  children,
  load,
  dataLength,
  hasMore,
  isLoading,
  endMessage,
  wrapperProps,
  observedBoxProps,
  intersectionObserverOptions,
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observedRef = useRef<HTMLDivElement | null>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        load();
      }
    },
    [load, hasMore, isLoading],
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
      ...intersectionObserverOptions,
    });

    if (observedRef.current) {
      observerRef.current.observe(observedRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [handleIntersect, intersectionObserverOptions]);

  useEffect(() => {
    if (observerRef.current && observedRef.current) {
      observerRef.current.disconnect();
      observerRef.current.observe(observedRef.current);
    }
  }, [hasMore]);

  return (
    <Box {...wrapperProps}>
      {children}
      <Box
        ref={observedRef}
        height="300px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="md"
        {...observedBoxProps}
      >
        {hasMore && isLoading && <Spinner />}
        {!hasMore && !isLoading && !!dataLength && endMessage}
      </Box>
    </Box>
  );
};

export default InfiniteScroll;
