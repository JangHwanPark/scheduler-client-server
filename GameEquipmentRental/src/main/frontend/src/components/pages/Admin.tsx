import {fetchUsers, User} from "../../api/users.ts";
import useFetch from "../../hooks/useFetch.tsx";
// import {useQuery} from "@tanstack/react-query";

export default function Admin() {
    const { data, error, isLoading } = useFetch<User[], Error>('users', fetchUsers);

    /*const {data, error, isLoading} = useQuery<User[], Error>({
        queryKey: ['users'],  // 쿼리 키를 배열로 설정
        queryFn: fetchUsers   // 쿼리 함수 설정
    });*/

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            Admin Page
            {data?.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </div>
    );
}