import { useState, useEffect, forwardRef, useMemo, ChangeEvent, SyntheticEvent } from 'react';
import { Box, Flex, keyframes, Spinner } from '@chakra-ui/react';
import styled from '@emotion/styled';

interface Props {
  verifying: boolean;
  initialValue?: string;
  length?: number;
  validChars?: string;
  placeholder?: string;
  autoFocus?: boolean;
  onChange?: (v: string) => void;
  onComplete?: (v: string) => Promise<void>;
  styles?: {
    width?: number;
    fontSize?: number;
  };
}

const VerificationInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      verifying,
      initialValue = '',
      length = 6,
      validChars = '0-9',
      placeholder,
      autoFocus = true,
      onChange,
      onComplete,
      styles: { width = 300, fontSize = 24 } = {},
    },
    ref,
  ) => {
    const [localValue, setLocalValue] = useState(initialValue);
    const [isActive, setActive] = useState(false);
    const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
    const isCompleted = localValue.length === length;
    const height = `${fontSize * 2}px`;

    const inputHandlers = useMemo(
      () => ({
        focus: () => {
          setActive(true);
        },
        blur: () => {
          setActive(false);
        },
        select: (e: SyntheticEvent<HTMLInputElement>) => {
          const target = e.target as HTMLInputElement;
          const valueLength = target.value.length;
          target.setSelectionRange(valueLength, valueLength);
        },
        change: async (e: ChangeEvent<HTMLInputElement>) => {
          const nextValue = e.target.value.replace(/\s/g, '');
          const regex = new RegExp(`^[${validChars}]{0,${length}}$`);

          if (regex.test(nextValue)) {
            onChange?.(nextValue);
            setLocalValue(nextValue);

            if (nextValue.length === length) {
              await onComplete?.(nextValue);
              setTimeout(() => {
                inputRef?.focus();
              }, 0);
            }
          }
        },
      }),
      [inputRef, length, onChange, onComplete, validChars],
    );

    useEffect(() => {
      if (autoFocus) {
        inputRef?.focus();
      }
    }, [autoFocus, inputRef]);

    return (
      <Box position="relative" w={`${width}px`} onClick={() => inputRef?.focus()}>
        <HiddenInput
          ref={node => {
            setInputRef(node);
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          value={localValue}
          onChange={inputHandlers.change}
          onFocus={inputHandlers.focus}
          onBlur={inputHandlers.blur}
          onSelect={inputHandlers.select}
          disabled={verifying}
          spellCheck={false}
          style={{ height }}
        />
        <Flex gap="8px" height={height} w="100%" onClick={() => inputRef?.focus()}>
          {...Array.from({ length }).map((_, i) => {
            const selected = isActive && (localValue.length === i || (localValue.length === i + 1 && length === i + 1));

            return (
              <Box
                id={`field-${i}`}
                key={i}
                flex={1}
                h="100%"
                position="relative"
                fontSize={fontSize}
                textAlign="center"
                lineHeight={height}
                color="black"
                bgColor={verifying ? 'gray.50' : 'white'}
                border="1px solid"
                borderColor="gray.500"
                borderRadius="4px"
                cursor={selected ? 'text' : 'default'}
                userSelect="none"
                outline="2px solid"
                outlineColor={selected && !verifying ? 'brand.500' : 'transparent'}
              >
                {localValue[i] || placeholder}

                <CursorLike style={{ display: selected && !isCompleted ? 'block' : 'none' }} />
              </Box>
            );
          })}
        </Flex>
        <Box position="absolute" right="-1.66rem" top="50%" transform="translateY(-50%)">
          {verifying && <Spinner size="sm" />}
        </Box>
      </Box>
    );
  },
);

const HiddenInput = styled.input`
  position: absolute;
  z-index: -1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: transparent;

  &:focus {
    outline: none;
  }
  &::selection {
    background-color: transparent;
  }
`;

const blink = keyframes`
  0%, 100% {
   opacity: 1;
  }
  50% {
   opacity: 0;
  }
`;
const CursorLike = styled.div`
  width: 1px;
  height: 1.1em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  will-change: opacity;
  animation: ${blink} 1s steps(1) infinite;
  background-color: currentColor;
  transition-duration: unset;
`;

export default VerificationInput;
