import { useQueries, useQuery } from "@tanstack/react-query";
import { getUserById } from "../ApiHooks/homepage";

class Test {
    a: number;
    constructor(x: number = 1) {
        this.a = x;
    }

    logger(Location: string) {
        return new Promise((resolve, reject) => {
            console.log(Location, this, this.a);
            resolve(0);
        });
    }
}

interface Props {
    ids: string[];
}

type TUseQuery = Parameters<typeof useQuery>;
const ObjTest = new Test(1);

const DPQueries: React.FC<Props> = ({ ids }) => {
    ObjTest.logger("Outside useQuery: ");
    const Test = useQuery({
        queryKey: ["test"],
        queryFn: () => {
            return ObjTest.logger("Inside useQuery");
        },
    });

    const Queries = useQueries<TUseQuery>({
        queries: ids.map((id, i) => {
            return {
                queryKey: ["dp", id],
                queryFn: () => {
                    return getUserById(id);
                },
            };
        }),
    });
    return <>DPQueries</>;
};

export default DPQueries;
