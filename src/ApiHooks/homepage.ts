import axios from "axios";
import { QueryFunction, QueryOptions, useQuery } from "react-query";

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

export const useQueryEmployeeAfterUser = () => {
    const { data, isFetching } = useQuery(["user"], getUser);

    const EmployeeApi = useQuery(["employee"], getEmployee, {
        enabled: !!data && !isFetching,
        onError: (err) => {},
    });

    return EmployeeApi;
};

export const useQuerySomethingAfterGetUser = ({
    queryKey,
    queryFn,
    config,
}: {
    queryKey: Array<any> | string;
    queryFn: QueryFunction;
    config?: Omit<QueryOptions, "enabled">;
}) => {
    const { data, isFetching } = useQuery(["user"], getUser, { retry: 3 });
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
