import { useUserList } from "@lib/user/data/userHooks";
import { UserRole } from "@prisma/client";
import { Pagination } from "@ui/components/Pagination";
import { useQueryParam } from "@ui/hooks/query-param";
import { Badge, Box, Pill, TableContent, Text } from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import TimeAgo from "react-timeago";
import { UserActions } from "./UserActions";
import { UserDescription } from "./UserDescription";
import { UsersTableActions } from "./UserTableActions";

export const columns = [
  {
    Header: "Бүртгэл",
    Cell: (data: any) => <UserDescription userId={data.id} {...data} />,
  },
  {
    Header: "Эрх",
    Cell: (data: any) => <Badge fontSize="11px">{data.role}</Badge>,
  },
];

export const UserList = () => {
  const { t: td } = useTranslation("local-doctor");
  const { params, setParam } = useQueryParam({
    size: "10",
    page: "1",
    role: "",
    text: "",
    hospitalId: "",
  });
  const { data: userList, refetch } = useUserList(params);

  return (
    <>
      <UsersTableActions params={params} setParam={setParam} refetch={refetch} />
      <TableContent
        columns={columns}
        data={userList?.data || []}
        RowAction={UserActions}
        mt="4"
      />
      <Pagination
        name={td(`header.paging.items.users`)}
        size={Number(params.size)}
        page={Number(params.page)}
        total={userList?.total}
        pages={userList?.pages}
        filtered={!!(params.text || params.role)}
        onChange={(page) => setParam("page", page.toString())}
      />
    </>
  );
};
