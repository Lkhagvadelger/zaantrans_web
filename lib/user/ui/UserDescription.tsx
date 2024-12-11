import { Profile, UserRole } from "@prisma/client";
import { Box, Stack } from "@ui/index";
import NextLink from "next/link";
import { UserAvatar } from "./UserAvatar";

type Props = {
  userId?: string;
  image?: string;
  profile?: Pick<Profile, "firstName" | "lastName">;
  code?: string | null;
  phoneNumber?: string | null;
  dob?: string | null;
  role?: UserRole;
};

export const UserDescription = (props: Props) => {
  return props.userId ? (
    <NextLink href={`/admin/user/${props.userId}`}>
      <Box>
        <UserDescriptionDetails {...props} />
      </Box>
    </NextLink>
  ) : (
    <UserDescriptionDetails {...props} />
  );
};

const UserDescriptionDetails = (props: Props) => (
  <Stack direction="row" spacing="2" align="center">
    <Box flexShrink={0} h="8" w="8">
      <UserAvatar phoneNumber={props.phoneNumber} code={props.code} />
    </Box>
    <Box h="8">
      <Box fontSize="xs" color="gray.500">
        {props.phoneNumber}
      </Box>
      <Box fontSize="xs" color="gray.500">
        {props.code ? props.code : "No code"}
      </Box>
    </Box>
  </Stack>
);
