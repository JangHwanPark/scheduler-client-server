// userInfo 속성에 대한 타입 정의
interface AdminHeaderProps {
    user_name: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = (
    {user_name}
) => {
    return (
        <header className="admin-header">
            <p>{user_name} 님 환영합니다.</p>
        </header>
    );
};