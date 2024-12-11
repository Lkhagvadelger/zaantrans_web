import { useAuth, withRequireLogin } from "@lib/auth/ui";
import { UserRole } from "@prisma/client";
import { AdminLayout } from "@lib/admin/ui/layout/AdminLayout";
import NotFoundPage from "pages/404";
import { LocationList } from "@lib/direction/ui/LocationList";

const AdminUsers = () => {
  const { user } = useAuth();
  return user?.role !== UserRole.ADMIN ? (
    <NotFoundPage />
  ) : (
    <AdminLayout>
      <LocationList />
    </AdminLayout>
  );
};

export default withRequireLogin(AdminUsers);
