import { Pagination } from "@ui/components/Pagination";
import { useQueryParam } from "@ui/hooks/query-param";
import { Badge, TableContent, Text } from "@ui/index";
import useTranslation from "next-translate/useTranslation";
import { useLocationList } from "../data/directionHooks";
import { LocationTableActions } from "./LocationTableActions";
export const columns = [
  {
    Header: "Байршил",
    Cell: (data: any) => <Text>{data.shortName}</Text>,
  },
  {
    Header: "Тайлбар",
    Cell: (data: any) => <Text>{data.description}</Text>,
  },
  {
    Header: "Үүсгэсэн огноо",
    Cell: (data: any) => <Badge fontSize="11px">{data.createdAt}</Badge>,
  },
];

export const LocationList = () => {
  const { params, setParam } = useQueryParam({
    size: "10",
    page: "1",
    role: "",
    text: "",
    hospitalId: "",
  });
  const { data: locationList, refetch } = useLocationList(params);

  return (
    <>
      <LocationTableActions params={params} setParam={setParam} refetch={refetch} />
      <TableContent columns={columns} data={locationList?.data || []} mt="4" />
      <Pagination
        name={"Ачих, буулгах байрлалууд"}
        size={Number(params.size)}
        page={Number(params.page)}
        total={locationList?.total}
        pages={locationList?.pages}
        filtered={!!(params.text || params.role)}
        onChange={(page) => setParam("page", page.toString())}
      />
    </>
  );
};
