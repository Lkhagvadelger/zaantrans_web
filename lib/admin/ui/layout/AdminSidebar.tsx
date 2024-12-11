import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactNode } from "react";
import {
  FaHospitalUser,
  FaNewspaper,
  FaUserCog,
  FaUserGraduate,
  FaUserInjured,
  FaUserMd,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import {
  MdCalendarMonth,
  MdDashboard,
  MdMessage,
  MdReport,
  MdSupervisedUserCircle,
} from "react-icons/md";

type MenuItemType = {
  label: string;
  icon?: ReactNode;
  href?: string;
};

const menuItems: (MenuItemType & { items?: MenuItemType[] })[] = [
  {
    label: "Users",
    items: [
      {
        label: "Бүх өвчтөн",
        icon: <MdSupervisedUserCircle />,
        href: "/admin/users?role=PATIENT",
      },
      {
        label: "Мессеж",
        icon: <MdMessage />,
        href: "/admin/message",
      },
      {
        label: "Цагийн хуваарь",
        icon: <MdCalendarMonth />,
        href: "/admin/calendar",
      },
      {
        label: "Тайлан",
        icon: <MdDashboard />,
        href: "/admin/dashboard",
      },
      {
        label: "Мэдээ, мэдээлэл",
        icon: <FaNewspaper />,
        href: "/admin/news",
      },
      {
        label: "Дотоод ажилтан",
        icon: <MdSupervisedUserCircle />,
        href: "/admin/staff",
      },
      {
        label: "Тохиргоо",
        icon: <FaUserCog />,
        href: "/admin/settings",
      },
    ],
  },
];

export const AdminSidebar = () => {
  return (
    <Flex h="full" minW={48} w={48} direction="column">
      <Stack spacing="4" flex="1" overflow="auto" py="3" pr="2">
        {menuItems.map((item, i) =>
          item.items ? (
            <NavGroup key={`menuitem-${i}`} label={item.label}>
              {item.items.map((subitem, si) => (
                <AdminNavLinkItem
                  key={`menuitem-${i}-${si}`}
                  href={subitem.href}
                  icon={subitem.icon}
                  label={subitem.label}
                />
              ))}
            </NavGroup>
          ) : (
            <AdminNavLinkItem
              key={`menuitem-${i}`}
              href={item.href}
              icon={item.icon}
              label={item.label}
            />
          )
        )}
      </Stack>
    </Flex>
  );
};

const NavGroup = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <Box>
    <Stack spacing="1">{children}</Stack>
  </Box>
);

const AdminNavLinkItem = ({
  label,
  icon,
  href,
}: {
  label: string;
  icon: ReactNode;
  href?: string;
}) =>
  href ? (
    <NextLink href={href}>
      <HStack
        px="3"
        py="2"
        color="teal.900"
        rounded="md"
        transition="all 0.2s"
        _hover={{ bg: "teal.100", color: "teal.800" }}
      >
        <Text fontSize="lg">{icon}</Text>
        <Text>{label}</Text>
      </HStack>
    </NextLink>
  ) : (
    <HStack px="2" py="1" color="teal.900">
      <Text fontSize="lg">{icon}</Text>
      <Text>{label}</Text>
    </HStack>
  );
