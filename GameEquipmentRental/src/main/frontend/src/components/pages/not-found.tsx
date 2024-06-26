import {useNavigate} from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    }

    return (
        <div>
            4-0-4 Not Found
            <button onClick={handleClick}>메인페이지로</button>
        </div>
    );
}