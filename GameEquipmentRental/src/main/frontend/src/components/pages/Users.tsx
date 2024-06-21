import useFetch from "../../hooks/useFetch.tsx";
import {fetchUsers, User} from "../../api/users.ts";

export default function Users() {
    const { data, error, isLoading } = useFetch<User[], Error>('users', fetchUsers);

    /*const {data, error, isLoading} = useQuery<User[], Error>({
        queryKey: ['users'],  // 쿼리 키를 배열로 설정
        queryFn: fetchUsers   // 쿼리 함수 설정
    });*/

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {data?.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </div>
    );
}