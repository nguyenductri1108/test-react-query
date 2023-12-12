import axios from "axios";
import { useQuery } from "react-query";

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

const getEmployee: () => Promise<IEmployee[]> = async () => {
    return axios
        .get("http://localhost:3500/employee")
        .then((response) => response.data);
};

export const useQueryEmployeeAfterUser = () => {
    const { data, isFetching } = useQuery(["user"], getUser);

    const EmployeeApi = useQuery(["employee"], getEmployee, {
        enabled: !!data && !isFetching,
    });

    return EmployeeApi;
};

export const useQuerySomethingAfterGetUser = ({
    queryKeys,
    queryFn,
    config,
}: {
    queryKeys: Array<any>;
    queryFn: () => {};
    config?: Object;
}) => {
    const { data, isFetching } = useQuery(["user"], getUser);

    return useQuery([...queryKeys], queryFn, config);
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
