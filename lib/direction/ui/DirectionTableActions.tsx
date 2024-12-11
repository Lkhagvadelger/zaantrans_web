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
import { MdDirectionsCar } from "react-icons/md";

export const VehicleTableActions = ({
  params,
  setParam,
  roles,
}: {
  params: QueryParamType;
  setParam: (key: string, value: string, resetPage?: boolean) => void;
  roles?: UserRole[];
}) => {
  const { t: ta } = useTranslation("auth");
  const roleList = (roles ? roles : Object.keys(UserRole)).map((r) => ({
    label: ta("role." + r),
    value: r,
  }));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onAdded = () => {};
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
            <FormLabel srOnly>Улсын дугаар, арлын дугаар</FormLabel>
            <InputLeftElement pointerEvents="none" color="gray.400" pl={1}>
              <BsSearch />
            </InputLeftElement>
            <Input
              rounded="base"
              type="search"
              placeholder="Улсын дугаар, арлын дугаар хайх..."
              pl="8"
              pr="2"
              value={params.text}
              onChange={(e) => setParam("text", e.target.value, true)}
            />
          </InputGroup>
        </FormControl>

        <Button variant={"add"} onClick={() => onOpen()}>
          <HStack spacing={2}>
            <Icon as={MdDirectionsCar} />
            <Text>Машин нэмэх</Text>
          </HStack>
        </Button>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={700} bg="white">
          <ModalHeader color={"main.700"} fontWeight={700}>
            Машин нэмэх
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
