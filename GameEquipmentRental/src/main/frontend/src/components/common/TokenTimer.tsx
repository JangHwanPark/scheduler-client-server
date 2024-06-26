import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {jwtDecode} from "jwt-decode";


const TokenTimer = () => {
    const { accessToken } = useAuth();
    const [remainingTime, setRemainingTime] = useState<number | null>(null);
    const [isLogout, setIsLogout] = useState<boolean>(false);


    const getRemainingTime = (token: string | null) => {
        if (!token) return null;
        try {
            const decodedToken: { exp: number } = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decodedToken.exp - currentTime;
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    };


    const updateRemainingTime = () => {
        const time = getRemainingTime(accessToken);
        if (time !== null && time > 0) {
            setRemainingTime(time);
        } else if (!isLogout) {
            setIsLogout(true);
            // logout();
        }
    };


    useEffect(() => {
        updateRemainingTime();
        const intervalId = setInterval(updateRemainingTime, 1000); // 1초마다 갱신
        return () => clearInterval(intervalId);
    }, [accessToken, isLogout]);


    return (
        <div>
            {remainingTime !== null
                ? (<p>남은 시간: {remainingTime} 초</p>)
                : (<p>토큰이 만료되었습니다.</p>)
            }
        </div>
    );
};

export default TokenTimer;