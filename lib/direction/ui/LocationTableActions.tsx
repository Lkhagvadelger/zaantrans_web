import { UserRole } from "@prisma/client";
import { QueryParamType } from "@ui/hooks/query-param";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { BsSearch } from "react-icons/bs";
import { MdDirectionsCar, MdWarehouse } from "react-icons/md";

export const LocationTableActions = ({
  params,
  setParam,
  refetch,
}: {
  params: QueryParamType;
  setParam: (key: string, value: string, resetPage?: boolean) => void;
  refetch: () => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onAdded = () => {};
  const placeHolder = "Ачих буулгах цэг хайх...";
  const title = "Ачих буулгах цэг нэмэх";
  return (
    <>
      <Stack
        w="full"
        spacing="2"
        direction={{ base: "column", md: "row" }}
        justify="start"
        borderBottom="1px"
        borderColor="gray.100"
        pb="4"
      >
        <FormControl w="64">
          <InputGroup size="sm">
            <FormLabel srOnly>{placeHolder}</FormLabel>
            <InputLeftElement pointerEvents="none" color="gray.400" pl={1}>
              <BsSearch />
            </InputLeftElement>
            <Input
              rounded="base"
              type="search"
              placeholder={placeHolder}
              pl="8"
              pr="2"
              value={params.text}
              onChange={(e) => setParam("text", e.target.value, true)}
            />
          </InputGroup>
        </FormControl>

        <Button variant={"add"} onClick={() => onOpen()}>
          <HStack spacing={2}>
            <Icon as={MdWarehouse} />
            <Text>{title}</Text>
          </HStack>
        </Button>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={700} bg="white">
          <ModalHeader color={"main.700"} fontWeight={700}>
            {title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <></>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
