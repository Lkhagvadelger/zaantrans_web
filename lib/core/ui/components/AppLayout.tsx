import { getRootUrl } from "@lib/auth/data/types";
import { Box } from "@ui/index";
import { ReactNode, useEffect, useState } from "react";
// import { MobileHamburgerMenu } from "./navigation/MobileHamburgerMenu";
// import { NotificationDropdown } from "./navigation/NotificationDropdown";
// import { useMobileMenuState } from "./navigation/useMobileMenuState";
import { useAuth } from "@lib/auth/ui";

export const AppLayout = ({
  title = "",

  hasNavBar = false,
  children,
}: {
  title?: string;
  hasNavBar?: boolean;
  children?: ReactNode;
}) => {
  // const { isMenuOpen, toggle } = useMobileMenuState();
  const { user, isLoggedIn } = useAuth();
  const [rootUrl, setRootUrl] = useState("/");

  useEffect(() => {
    setRootUrl(getRootUrl(user));
  }, [user]);

  return (
    <>
      <Box as="main" display="flex" px="6" backgroundColor={"#f4f6fa"}>
        <Box w="full">{children}</Box>
      </Box>
    </>
  );
};
