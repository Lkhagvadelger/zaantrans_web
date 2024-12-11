import { ReactNode } from "react";
import { useAuth } from "@lib/auth/ui";
import { UserRole } from "@prisma/client";
import { AppLayout, Flex } from "@ui/index";
import { AdminSidebar } from "./AdminSidebar";
import NotFoundPage from "pages/404";

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  return user?.role !== UserRole.ADMIN ? (
    <NotFoundPage />
  ) : (
    <AppLayout>
      <Flex h="full" flexDirection="column">
        <Flex flex="1" fontSize="sm" py="4" gap={4}>
          <AdminSidebar />
          <Flex
            p="4"
            width="full"
            direction="column"
            overflowY="auto"
            bg="#ffffff"
            boxShadow="0px 0px 20px 0px rgba(0, 0, 0, 0.1)"
            borderRadius={{ sm: "xl" }}
          >
            {children}
          </Flex>
        </Flex>
      </Flex>
    </AppLayout>
  );
};
