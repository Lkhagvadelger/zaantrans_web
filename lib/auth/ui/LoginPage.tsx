import { UserRole } from "@prisma/client";
import {
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  PinInput,
  PinInputField,
  Text,
  toaster,
} from "@ui/index";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { MdPerson } from "react-icons/md";
import { AuthLayout } from ".";
import { usePhoneConfirmation, usePhoneVerification } from "../data/authHooks";
import { CardCaption } from "./components";

type AdminLoginInput = {
  phoneNumber: string;
  pin: string;
  showPin: boolean;
  code: string;
};
export const LoginPage = () => {
  const router = useRouter();

  const requestCodeMutation = usePhoneVerification();
  const mutation = usePhoneConfirmation();

  const {
    control,
    register,
    handleSubmit,
    formState,
    reset,
    getValues,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<AdminLoginInput>({
    defaultValues: {
      pin: "123456",
    },
  });
  const action = handleSubmit(async (data) => {});
  const onPinChange = (value: string) => {
    clearErrors("pin");
    setValue("pin", value);
  };
  watch("showPin");
  const doLogin = () => {
    const body = {
      username: getValues("phoneNumber").toLowerCase(),
      method: "phone",
      code: getValues("code"),
    };

    if (getValues("showPin") !== true) {
      requestCodeMutation.mutate(body, {
        onError: (error: any) => {
          setError("phoneNumber", { message: error.translationKey });
        },
        onSuccess: (data: any) => {
          if (data.success == true) {
            setValue("showPin", true);
            toaster.success(
              "Таны утсанд очсон баталгаажуулах кодыг оруулна уу"
            );
          }
        },
      });
      return;
    }

    if (!getValues("pin") || getValues("pin").length != 6)
      return setError("pin", {
        message: "Зөв код оруулна уу",
      });

    mutation.mutate(
      { ...body, pin: getValues("pin") },
      {
        onError: (error: any) => {
          toaster.success("Баталгаажуулах код буруу байна.");
          setError("pin", { message: error.translationKey });
        },
        onSuccess: (data: any) => {
          toaster.success("Баталгаажуулалт амжилттай боллоо.");
          if (data.role == UserRole.ADMIN)
            router.push({
              pathname: `/admin`,
              query: "",
            });
        },
      }
    );
  };
  return (
    <AuthLayout title={"Нэвтрэх"} caption={""} contentWidth="480px">
      <chakra.form onSubmit={action}>
        <Flex flex="1" gap="3" flexDir="column" borderLeftRadius={"10px"}>
          <FormControl id="email" isInvalid={!!errors.phoneNumber}>
            <CardCaption text={"Утасны дугаар"} />
            <InputGroup>
              <Input
                w="full"
                fontSize="sm"
                border="1px"
                borderRadius="3px"
                color={"gray.900"}
                borderColor={"green.400"}
                _focus={{
                  color: "green.900",
                  borderColor: "green.500",
                  bg: "white",
                }}
                disabled={getValues("showPin") === true}
                type="text"
                placeholder={""}
                {...register("phoneNumber", {
                  required: "Утасны дугаар оруулна уу",
                })}
              />
            </InputGroup>
          </FormControl>
          {getValues("showPin") && (
            <FormControl id="pin" pt={4} isInvalid={!!errors.pin}>
              <CardCaption text={`Таны утсанд ирсэн пин кодыг оруулна уу`} />
              <HStack justify="space-between">
                <PinInput
                  size={"md"}
                  isInvalid={!!errors.pin}
                  onChange={onPinChange}
                  value={getValues("pin")}
                >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
              <FormErrorMessage>
                {errors.pin && errors.pin.message}
              </FormErrorMessage>
              <Box pt={4}>
                <Text
                  onClick={() => {
                    setValue("showPin", false);
                  }}
                  textAlign={"center"}
                  color="gray.600"
                  fontSize={"14px"}
                >
                  Өөр утасны дугаараар нэвтрэх
                </Text>
              </Box>
            </FormControl>
          )}
          <Button
            w="full"
            variant="onboarding"
            isLoading={requestCodeMutation.isLoading || mutation.isLoading}
            onClick={doLogin}
          >
            Үргэлжлүүлэх
          </Button>
        </Flex>
      </chakra.form>
    </AuthLayout>
  );
};
