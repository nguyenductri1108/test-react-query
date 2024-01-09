import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
    getUser,
    usePrefetchUserPageQuery,
    useQuerySomethingAfterGetUser,
} from "../ApiHooks/homepage";
import { HomeAction } from "../redux/slices/home";
import { useAppSelector } from "../redux/store";

const asyncAdd =
    (amount: number) => (dispatch: ReturnType<typeof useDispatch>) => {
        dispatch(HomeAction.setLoading(true));
        setTimeout(() => {
            dispatch(HomeAction.setLoading(false));
            dispatch(HomeAction.addByAmount(10));
        }, 1500);
    };

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const { count, err, isLoading } = useAppSelector(
        (state) => state.homeSlice
    );
    const [state, setState] = useState<number>(1);

    const a = useQuery({ queryKey: ["a"], queryFn: () => {} });
    const fetchEmployee = useQuerySomethingAfterGetUser({
        queryKey: ["employee"],
        queryFn: getUser,
        config: {},
    });

    const func = () => {};
    const b = useQuery({
        queryKey: ["abc"],
        queryFn: () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve("abc 5s");
                }, 5000);
            });
        },
    });

    const x = usePrefetchUserPageQuery(state, 2, 10);

    return (
        <>
            <h1>HomePage</h1>
            <h2>{isLoading ? "Loading..." : err ? "Error" : count}</h2>
            <button
                onClick={() => {
                    dispatch(HomeAction.increment());
                }}
            >
                increment
            </button>
            <button
                onClick={() => {
                    setState((prev) => prev + 1);
                }}
            >
                test cache
            </button>
            <button
                onClick={() => {
                    setState((prev) => prev - 1);
                }}
            >
                test cache
            </button>
            <button
                onClick={() => {
                    dispatch(asyncAdd(10) as any);
                }}
            >
                increment
            </button>
        </>
    );
};

export default Home;
