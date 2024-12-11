import { AuthFormAdminInvite } from "@lib/auth/ui/AuthFormAdminInvite";
import { UserRole } from "@prisma/client";
import { QueryParamType } from "@ui/hooks/query-param";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  InputRightElement,
  Select,
  InputLeftElement,
  Button,
  Icon,
  Modal,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { BsSearch } from "react-icons/bs";
import { MdAdd } from "react-icons/md";
import { selectInput } from "../data/types";

export const UsersTableActions = ({
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
            <FormLabel srOnly>Код, утсаар хайх</FormLabel>
            <InputLeftElement pointerEvents="none" color="gray.400" pl={1}>
              <BsSearch />
            </InputLeftElement>
            <Input
              rounded="base"
              type="search"
              placeholder="Код, утсаар хайх..."
              pl="8"
              pr="2"
              value={params.text}
              onChange={(e) => setParam("text", e.target.value, true)}
            />
          </InputGroup>
        </FormControl>
        {/* <Select
        w="40"
        size="sm"
        value={params.role}
        onChange={(e) => setParam("role", e.target.value as UserRole, true)}
      >
        {roleList.map((role) => (
          <option key={`option-role-${role.value}`} value={role.value}>
            {role.label}
          </option>
        ))}
      </Select> */}
        <Button variant={"add"} onClick={() => onOpen()}>
          <Icon as={MdAdd} mr={2} /> Өвчтөн нэмэх
        </Button>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={700} bg="white">
          <ModalHeader color={"main.700"} fontWeight={700}>
            Өвчтөн нэмэх
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AuthFormAdminInvite onComplete={onAdded} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
