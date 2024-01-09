import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addUser, getUser } from "../ApiHooks/homepage";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const MutationPage: React.FC = () => {
    const { data } = useQuery({ queryKey: ["mutate"], queryFn: getUser });
    const [state, setState] = useState<{ a: string; b: number }>({
        a: "",
        b: 5,
    });
    const { data: users, refetch } = useQuery({
        queryKey: ["user", state],
        queryFn: getUser,
        initialData: [{ name: "tri", age: 1, id: 1 }],
    });
    const nameInputRef = useRef<HTMLInputElement>(null);
    const ageInputRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            console.log("hehe");

            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
    return (
        <>
            <button
                onClick={() => {
                    setState((state) => ({ ...state, b: state.b }));
                }}
            >
                Add B
            </button>
            <div style={{ display: "flex" }}>
                <input ref={nameInputRef} name="name"></input>
                <input ref={ageInputRef} name="age"></input>
                <button
                    onClick={() => {
                        const user = {
                            name: nameInputRef.current?.value || "abc",
                            age: Number(ageInputRef.current?.value) || 12,
                        };
                        mutate(user);
                    }}
                >
                    Add
                </button>
            </div>
            <button
                onClick={() => {
                    refetch();
                }}
            >
                Refetch users
            </button>
            <ul>
                {users?.map((item, i) => {
                    return (
                        <li>
                            <Link to={`/user-detail/${item.id}`}>
                                {item.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default MutationPage;
