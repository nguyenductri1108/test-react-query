import { useQueries, useQuery } from "react-query";
import { getUserById } from "../ApiHooks/homepage";

interface Props {
    ids: string[];
}

type TUseQuery = Parameters<typeof useQuery>;

const DPQueries: React.FC<Props> = ({ ids }) => {
    const Queries = useQueries<TUseQuery>(
        ids.map((id, i) => {
            return {
                queryKey: ["dp", id],
                queryFn: () => {
                    getUserById(id);
                },
            };
        })
    );
    console.log(
        Queries.map((item, i) => {
            return item.isSuccess;
        })
    );
    return <>DPQueries</>;
};

export default DPQueries;
