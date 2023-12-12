import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { HomeAction } from "../redux/slices/home";
import { useAppSelector } from "../redux/store";

export interface IPost {
    name: string;
    price: number;
}

const getPost: () => Promise<IPost[]> = async () => {
    return axios
        .get("http://localhost:3500/data")
        .then((response) => response.data);
};

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
    const fetchPost = useQuery(["post"], getPost, { staleTime: 3000 });
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
                    dispatch(asyncAdd(10) as any);
                }}
            >
                increment
            </button>
        </>
    );
};

export default Home;
