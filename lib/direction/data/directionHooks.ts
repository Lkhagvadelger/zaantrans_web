import { useQuery, useMutation } from "react-query";
import { API, Method } from "@util/query";
import { UserRole } from "@prisma/client";
import { QueryParamType } from "@ui/hooks/query-param";

export const useLocationList = (filter: QueryParamType) =>
    useQuery(
        ["locationList", filter.size, filter.page, filter.role, filter.text],
        API._query(Method.POST, `direction/location/list`, {}, filter),
        { enabled: !!filter }
    );
export const useDirectionList = (filter: QueryParamType) =>
    useQuery(
        ["directionList", filter.size, filter.page, filter.role, filter.text],
        API._query(Method.POST, `direction/list`, {}, filter),
        { enabled: !!filter }
    );

