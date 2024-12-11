import { useAuth, withRequireLogin } from "@lib/auth/ui";
import { UserRole } from "@prisma/client";
import { AdminLayout } from "@lib/admin/ui/layout/AdminLayout";
import { VehicleList } from "@lib/vehicle/ui/VehicleList";
import NotFoundPage from "pages/404";

const AdminUsers = () => {
  const { user } = useAuth();
  return user?.role !== UserRole.ADMIN ? (
    <NotFoundPage />
  ) : (
    <AdminLayout>
      <VehicleList />
    </AdminLayout>
  );
};

export default withRequireLogin(AdminUsers);
