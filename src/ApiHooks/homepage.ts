import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
    Query,
    QueryFunction,
    QueryKey,
    QueryOptions,
    UndefinedInitialDataOptions,
    UseQueryResult,
    useQueries,
    useQuery,
} from "@tanstack/react-query";

enum SKILL_CLASS {
    "FRESHER",
    "JUNIOR",
    "MIDDLE",
    "SENIOR",
}

export interface IUser {
    name: string;
    age: number;
    id: number;
}

export interface IEmployee {
    name: string;
    class: SKILL_CLASS;
    id: number;
}

export const getUser: () => Promise<IUser[]> = async () => {
    return axios
        .get("http://localhost:3500/user")
        .then((response) => response.data);
};

export const getEmployee: () => Promise<IEmployee[]> = async () => {
    return axios
        .get("http://localhost:3500/employee")
        .then((response) => response.data);
};

export const getUserById: (id: string) => Promise<IUser> = async (id) => {
    return axios
        .get(`http://localhost:3500/user/${id}`)
        .then((response) => response.data);
};

export const addUser: (user: Omit<IUser, "id">) => Promise<IUser> = async (
    user
) => {
    return axios
        .post(`http://localhost:3500/user`, user)
        .then((response) => response.data);
};

export const fetchUserPage = (page: number, limit: number) => {
    return axios
        .get(`http://localhost:3500/user?_page=${page}&_limit=${limit}`)
        .then((response) => response.data);
};

export const fetchUserPageQuery: (meta: {
    _page: number;
    _limit: number;
}) => UndefinedInitialDataOptions<IUser[], unknown> = ({ _page, _limit }) => {
    return {
        queryKey: ["fetchUserPage", _page, _limit],
        queryFn: fetchUserPage as unknown as QueryFunction<
            IUser[],
            QueryKey,
            never
        >,
        staleTime: 60 * 1000,
    };
};

export const usePrefetchUserPageQuery = (
    page: number,
    limit: number,
    max: number
): UseQueryResult<IUser[], unknown> => {
    const a = [];
    page > 1 && a.push(fetchUserPageQuery({ _page: page - 1, _limit: limit }));
    page < max &&
        a.push(fetchUserPageQuery({ _page: page + 1, _limit: limit }));
    const prefetch = useQueries({ queries: a as any });

    return useQuery(fetchUserPageQuery({ _page: page, _limit: limit }));
};

export const useQueryEmployeeAfterUser = () => {
    const { data, isFetching } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    });

    const EmployeeApi = useQuery({
        queryKey: ["employee"],
        queryFn: getEmployee,
        enabled: !!data && !isFetching,
    });

    return EmployeeApi;
};

export const useQuerySomethingAfterGetUser = ({
    queryKey,
    queryFn,
    config,
}: {
    queryKey: Array<any>;
    queryFn: QueryFunction;
    config?: Omit<QueryOptions, "enabled">;
}) => {
    const { data, isFetching } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        retry: 3,
    });
    console.log(data);

    return useQuery({
        queryKey,
        queryFn,
        ...config,
        enabled: !!data && !isFetching,
    });
    // return useQuery([...queryKey], queryFn, config);
};

// export const useIsTokenValid = () => {
//     const { data: token } = useQuery<string | null>(["token"], getToken, {
//         refetchOnMount: false,
//     });
//     return useQuery(["isTokenValid", token], validateToken, {
//         refetchOnMount: false,
//         enabled: typeof token !== "undefined",
//     });
// };
