import { useQuery, useMutation } from "react-query";
import { API, Method } from "@util/query";
import { UserRole } from "@prisma/client";
import { QueryParamType } from "@ui/hooks/query-param";

export const useVehicleList = (filter: QueryParamType) =>
    useQuery(
        ["vehicleList", filter.size, filter.page, filter.role, filter.text],
        API._query(Method.POST, `vehicles/list`, {}, filter),
        { enabled: !!filter }
    );