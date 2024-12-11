import { Pagination } from "@ui/components/Pagination";
import { useQueryParam } from "@ui/hooks/query-param";
import { Badge, TableContent, Text } from "@ui/index";
import { useDirectionList } from "../data/directionHooks";
import { DirectionTableActions } from "./DirectionTableActions";

export const columns = [
  {
    Header: "Чиглэлийн нэр",
    Cell: (data: any) => <Text>{data.shortName}</Text>,
  },
  {
    Header: "Ачих цэг",
    Cell: (data: any) => (
      <Badge fontSize="11px">{data.startingLocation.name}</Badge>
    ),
  },
  {
    Header: "Буулгах цэг",
    Cell: (data: any) => (
      <Badge fontSize="11px">{data.endingLocation.name}</Badge>
    ),
  },
  {
    Header: "Нийт зай",
    Cell: (data: any) => <Badge fontSize="11px">{data.totalDistance} км</Badge>,
  },
  {
    Header: "Нийт хугацаа",
    Cell: (data: any) => <Badge fontSize="11px">{data.totalTime} цаг</Badge>,
  },
  {
    Header: "Км-ийн үнэ",
    Cell: (data: any) => <Badge fontSize="11px">{data.costPerKm}₮</Badge>,
  },
];

export const DirectionList = () => {
  const { params, setParam } = useQueryParam({
    size: "10",
    page: "1",
    role: "",
    text: "",
    hospitalId: "",
  });
  const { data: directionList, refetch } = useDirectionList(params);

  return (
    <>
      <DirectionTableActions
        params={params}
        setParam={setParam}
        refetch={refetch}
      />
      <TableContent columns={columns} data={directionList?.data || []} mt="4" />
      <Pagination
        name={"Тээвэр хийх чиглэл"}
        size={Number(params.size)}
        page={Number(params.page)}
        total={directionList?.total}
        pages={directionList?.pages}
        filtered={!!(params.text || params.role)}
        onChange={(page) => setParam("page", page.toString())}
      />
    </>
  );
};
