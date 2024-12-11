import {
  Box,
  HStack,
  Icon,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "@lib/auth/ui";
import { SEO } from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { Router, useRouter } from "next/router";
import React, { ReactNode } from "react";
import {
  MdCalendarMonth,
  MdChatBubble,
  MdChatBubbleOutline,
  MdEmergency,
  MdHouse,
  MdSettings,
} from "react-icons/md";
import { H4Appointment } from "./H4Appointment";
import { H4Emergency } from "./H4Emergency";
import { H4Home } from "./H4Home";
import { H4Message } from "./H4Message";
import { H4Settings } from "./H4Settings";

export enum H4AppNavigationKey {
  home = "home",
  appointment = "appointment",
  message = "message",
  emergency = "emergency",
  settings = "settings",
}

type H4AppNavigationType = {
  isActive: boolean;
  fontIcon?: ReactNode;
  fontIconActive?: ReactNode;
  text?: string;
  ping?: boolean;
  screen: ReactNode;
};

type H4AppNavigationItemType = Record<H4AppNavigationKey, H4AppNavigationType>;

export const H4AppNavigationData: H4AppNavigationItemType = {
  home: {
    isActive: true,
    fontIcon: <Icon as={MdHouse} w="24px" h="24px" />,
    text: "Нүүр",
    screen: <H4Home />,
  },
  appointment: {
    isActive: true,
    fontIcon: <Icon as={MdCalendarMonth} w="24px" h="24px" />,
    text: "Цаг авах",
    screen: <H4Appointment />,
  },
  message: {
    isActive: true,
    fontIcon: <Icon as={MdChatBubble} w="24px" h="24px" />,
    fontIconActive: <Icon as={MdChatBubbleOutline} w="24px" h="24px" />,
    text: "",
    ping: true,
    screen: <H4Message />,
  },
  emergency: {
    isActive: true,
    fontIcon: <Icon as={MdEmergency} w="24px" h="24px" />,
    text: "Тусламж",
    screen: <H4Emergency />,
  },
  settings: {
    isActive: true,
    fontIcon: <Icon as={MdSettings} w="24px" h="24px" />,
    text: "Тохиргоо",
    screen: <H4Settings />,
  },
};

const H4AppLayout = ({
  selectedNav,
  onNavChange,
}: {
  selectedNav: H4AppNavigationKey;
  onNavChange: (key: H4AppNavigationKey) => void;
}) => {
  const { t: to } = useTranslation("common");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [NavPing] = React.useState({
    isSocial: true,
    isMessage: false,
  });
  const gototopRef = React.useRef(null);

  React.useEffect(() => {
    Router.events.on("routeChangeStart", onOpen);
    Router.events.on("routeChangeError", onClose);
    Router.events.on("routeChangeComplete", onClose);

    return () => {
      Router.events.off("routeChangeStart", onOpen);
      Router.events.off("routeChangeError", onClose);
      Router.events.off("routeChangeComplete", onClose);
    };
  }, [onOpen, onClose]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const renderContent = () => {
    const Component = H4AppNavigationData[selectedNav]?.screen;
    return (
      Component &&
      React.cloneElement(Component as React.ReactElement, {
        onNavChange:
          selectedNav === H4AppNavigationKey.home ? onNavChange : undefined,
      })
    );
  };

  return (
    <Box ref={gototopRef} as="main" w="full" bg="#fff" fontFamily="nunito">
      <SEO title={`H4 ${H4AppNavigationData[selectedNav]?.text}`} />
      {renderContent()}
      {selectedNav && (
        <NavToolbox
          selectedNav={selectedNav}
          NavPing={NavPing}
          onNavChange={onNavChange}
        />
      )}
    </Box>
  );
};

const H4AppPage = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  if (!isLoggedIn) return null;

  return (
    <H4AppLayout
      selectedNav={router.query.nav as H4AppNavigationKey}
      onNavChange={(key) =>
        router.push(`/h4/${key}`, undefined, { shallow: true })
      }
    />
  );
};

const NavToolbox = ({
  selectedNav,
  NavPing,
  onNavChange,
}: {
  selectedNav: H4AppNavigationKey;
  NavPing?: { isSocial: boolean; isMessage: boolean };
  onNavChange?: (nav: H4AppNavigationKey) => void;
}) => {
  const navButtons = [
    { key: H4AppNavigationKey.home },
    { key: H4AppNavigationKey.appointment },
    { key: H4AppNavigationKey.message, bg: "#FF7A88" },
    { key: H4AppNavigationKey.emergency },
    { key: H4AppNavigationKey.settings },
  ];

  return (
    <Box mt="-96px" top="100%" pos="fixed" w="full" textAlign="center">
      <HStack
        fontFamily="nunito"
        border="1px solid #F6F6F6"
        borderBottomRadius="26px"
        borderTopRadius="8px"
        px={0}
        mx={4}
        paddingTop={3}
        paddingBottom="3"
        h="75px"
        w="calc(100% - 32px)"
        gap={3}
        background="#fff"
        justifyContent="center"
        zIndex="101"
        position="relative"
      >
        <Image
          src="/images/navbar.svg"
          alt="H4 Logo"
          mt="-32px"
          pos="fixed"
          zIndex={1}
        />
        <HStack
          position="relative"
          zIndex={2}
          w="full"
          gap={3}
          justifyContent="center"
        >
          {navButtons.map(({ key, bg }) => (
            <NavButton
              key={key}
              nav={H4AppNavigationData[key]}
              selectedNav={selectedNav}
              myKey={key}
              onNavChange={onNavChange}
              bg={bg}
            />
          ))}
        </HStack>
      </HStack>
    </Box>
  );
};

const NavButton = ({
  nav,
  selectedNav,
  myKey,
  onNavChange,
  bg,
}: {
  nav: H4AppNavigationType;
  selectedNav: H4AppNavigationKey;
  myKey: H4AppNavigationKey;
  onNavChange?: (nav: H4AppNavigationKey) => void;
  bg?: string;
}) => {
  const isSelected = selectedNav === myKey;
  const baseStyles = {
    borderRadius: bg ? "full" : "none",
    bg,
    mt: bg ? "-60px" : "0",
    h: bg ? "55px" : "48px",
    w: bg ? "55px" : "52px",
    //FF7A88 shadow, x=0 y =4 blur= 12
    boxShadow: bg ? "0px 4px 12px 0px rgba(255, 122, 136, 0.5)" : "none",
  };

  return (
    <Box
      display="inline-block"
      h="full"
      w="64px"
      textAlign="center"
      marginInlineStart="0 !important"
    >
      {onNavChange ? (
        <Box
          {...baseStyles}
          color={
            isSelected
              ? bg
                ? "#ffffff"
                : "#FF7A88"
              : bg
              ? "#ffffff"
              : "#9DB2CE"
          }
          onClick={() => !isSelected && onNavChange(myKey)}
        >
          <Box h="32px" w="full" mx="auto" pt={bg ? "16px" : "0"}>
            <Box>
              {isSelected ? nav.fontIcon : nav.fontIconActive || nav.fontIcon}
            </Box>
          </Box>
          <Text
            fontSize="11px"
            lineHeight={isSelected ? "16px" : "15px"}
            fontWeight="600"
          >
            {nav.text}
          </Text>
        </Box>
      ) : (
        <Box h="32px" w="full" mx="auto" />
      )}
    </Box>
  );
};

export default H4AppPage;
