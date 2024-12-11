import { useUserList } from "@lib/user/data/userHooks";
import { Pagination } from "@ui/components/Pagination";
import { useQueryParam } from "@ui/hooks/query-param";
import { Badge, TableContent, Text } from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { useVehicleList } from "../data/vehicleHooks";
import { VehicleTableActions } from "./VehicleTableActions";

export const columns = [
  {
    Header: "Улсын дугаар",
    Cell: (data: any) => <Text>{data.plateNumber}</Text>,
  },
  {
    Header: "Марк",
    Cell: (data: any) => <Badge fontSize="11px">{data.markName}</Badge>,
  },

  {
    Header: "Модель",
    Cell: (data: any) => <Badge fontSize="11px">{data.modelName}</Badge>,
  },
  {
    Header: "Он",
    Cell: (data: any) => <Badge fontSize="11px">{data.buildYear}</Badge>,
  },
  {
    Header: "Жолооч",
    Cell: (data: any) => (
      <Badge fontSize="11px">
        {data.driver?.lastName} {data.driver?.firstName}
      </Badge>
    ),
  },
];

export const VehicleList = () => {
  const { t: td } = useTranslation("local-doctor");
  const { params, setParam } = useQueryParam({
    size: "10",
    page: "1",
    role: "",
    text: "",
    hospitalId: "",
  });
  const { data: vehicleList } = useVehicleList(params);

  return (
    <>
      <VehicleTableActions params={params} setParam={setParam} />
      <TableContent columns={columns} data={vehicleList?.data || []} mt="4" />
      <Pagination
        name={"Машины бүртгэл"}
        size={Number(params.size)}
        page={Number(params.page)}
        total={vehicleList?.total}
        pages={vehicleList?.pages}
        filtered={!!(params.text || params.role)}
        onChange={(page) => setParam("page", page.toString())}
      />
    </>
  );
};
