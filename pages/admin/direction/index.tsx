import { AdminLayout } from "@lib/admin/ui/layout/AdminLayout";
import { useAuth, withRequireLogin } from "@lib/auth/ui";
import { DirectionList } from "@lib/direction/ui/DirectionList";
import { UserRole } from "@prisma/client";
import NotFoundPage from "pages/404";

const AdminUsers = () => {
  const { user } = useAuth();
  return user?.role !== UserRole.ADMIN ? (
    <NotFoundPage />
  ) : (
    <AdminLayout>
      <DirectionList />
    </AdminLayout>
  );
};

export default withRequireLogin(AdminUsers);
