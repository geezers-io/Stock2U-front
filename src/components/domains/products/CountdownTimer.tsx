import { FC, useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
import dayjs from 'dayjs';

interface Props {
  expiredAt: Date;
}

const CountdownTimer: FC<Props> = ({ expiredAt }) => {
  const [diff, setDiff] = useState(0);
  const expired = diff < 0;
  const [mm, ss] = dayjs(diff).format('mm:ss').split(':');

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = expiredAt.getTime() - Date.now();

      setDiff(diff);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [expiredAt]);

  return (
    <Text fontSize="xs" textAlign="right" color={expired ? 'error.500' : 'gray.500'} letterSpacing={-0.2}>
      {expired && '마감'}
      {!expired && (
        <>
          남은 시간
          <Text as="span" display="inline-block" textAlign="center" w={4} ml={0.5}>
            {mm}
          </Text>
          :
          <Text as="span" display="inline-block" textAlign="center" w={4}>
            {ss}
          </Text>
        </>
      )}
    </Text>
  );
};

export default CountdownTimer;
