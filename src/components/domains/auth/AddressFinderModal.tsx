import { ChangeEventHandler, FC, useEffect, useRef, useState } from 'react';
import { Building, ExclamationCircle } from 'react-bootstrap-icons';
import {
  ButtonSpinner,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  LinkBox,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { isAxiosError } from 'axios';
import { ApiError } from '@/api/@types/@shared';
import { Address } from '@/api/@types/Auth';
import { AuthService } from '@/api/services/Auth';
import { useCustomToast } from '@/hooks/useCustomToast';
import { useDebounce } from '@/hooks/useDebounce';
import { usePagination } from '@/hooks/usePagination';

interface Props {
  title: string;
  isOpen: boolean;
  close: () => void;
  onSelect: (address: string) => void;
}

const SEARCH_MIN = 2;

const AddressFinderModal: FC<Props> = ({ title, isOpen, close, onSelect }) => {
  const { pageRequest, resetPageRequest, setPageResponse } = usePagination();
  const [search, setSearch] = useState('');
  const [searching, setSearching] = useState(false);
  const [helpText, setSearchHelpText] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useCustomToast();

  const fetchAddresses = useDebounce(async (search: string) => {
    try {
      setSearching(true);

      const { results, page } = await AuthService.findAddress({
        ...pageRequest,
        keyword: search,
      });
      setPageResponse(page);
      setAddresses(results);
      setSearchHelpText('');
    } catch (e) {
      setAddresses([]);

      if (isAxiosError<ApiError>(e) && e.status !== 500 && !!e.response?.data?.message) {
        setSearchHelpText(e.response.data.message);
        return;
      }

      toast.error(e);
    } finally {
      setSearching(false);
    }
  });

  const handleChangeSearch: ChangeEventHandler<HTMLInputElement> = e => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (!isOpen) {
      resetPageRequest();
      setSearch('');
      setAddresses([]);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    if (search.length < SEARCH_MIN) {
      setAddresses([]);
      return;
    }
    fetchAddresses(search);
  }, [search]);

  return (
    <Modal initialFocusRef={inputRef} isOpen={isOpen} onClose={close} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center" mt={6}>
          {title}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <InputGroup>
            <Input ref={inputRef} placeholder="도로명 주소 검색" value={search} onChange={handleChangeSearch} />
            <InputRightElement>{searching && <ButtonSpinner color="gray.400" />}</InputRightElement>
          </InputGroup>

          {helpText && (
            <Flex alignItems="center" gap={1} mt={1} ml={1} color="gray.500" fontSize="xs">
              <ExclamationCircle />
              <Text>{helpText}</Text>
            </Flex>
          )}

          <Spacer h="20px" />

          {!addresses.length && (
            <Flex justifyContent="center" alignItems="center" h="160px">
              <Text color="gray.600">검색 결과가 없습니다</Text>
            </Flex>
          )}
          {!!addresses.length && (
            <List maxH="300px" overflowY="auto">
              {addresses.map(address => (
                <ListItem key={address.fullRoadAddrName} _notFirst={{ mt: 2 }}>
                  <LinkBox
                    role="button"
                    onClick={() => onSelect(address.fullRoadAddrName)}
                    border="1px solid"
                    borderRadius="8px"
                    borderColor="gray.300"
                    p={2}
                    _hover={{ bg: 'gray.100' }}
                  >
                    {address.buildingName && (
                      <Flex alignItems="center" gap={1} color="gray.500" fontSize="sm" fontWeight={500}>
                        <Building />
                        <Text>{address.buildingName}</Text>
                      </Flex>
                    )}
                    <Text color="brand.600">{address.fullRoadAddrName}</Text>
                    <Text color="gray.500" fontSize="sm">
                      {address.zipCode}
                    </Text>
                  </LinkBox>
                </ListItem>
              ))}
            </List>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddressFinderModal;
