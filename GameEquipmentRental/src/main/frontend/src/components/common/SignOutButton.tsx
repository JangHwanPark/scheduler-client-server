/*interface SignOutButtonProps {

}*/

import {useAuth} from "../../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

interface SignOutButtonProps {
    className: string;
}

export default function SignOutButton({className}: SignOutButtonProps) {
    const navigate = useNavigate();
    const {logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
        console.log("로그아웃")
    };

    return (
        <button
            className={className}
            onClick={handleLogout}
        >
            로그아웃
        </button>
    );
}