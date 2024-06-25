import {useAuth} from "../../context/AuthContext.tsx";
import {useEffect, useState} from "react";

export default function TokenTimer() {
    const { getRemainingTime } = useAuth();
    const [remainingTime, setRemainingTime] = useState<number | null>(null);

    useEffect(() => {
        const updateRemainingTime = () => {
            if (getRemainingTime) {
                const time = getRemainingTime();
                setRemainingTime(time);
            }
        };

        updateRemainingTime(); // 초기 값 설정

        const intervalId = setInterval(updateRemainingTime, 1000); // 매 초마다 업데이트

        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 클리어
    }, [getRemainingTime]);

    return (
        <div>
            {remainingTime !== null
                ? (<p>액세스 토큰 유효 시간: {Math.round(remainingTime)} s</p>)
                : (<p>액세스 토큰이 존재하지 않음</p>)
            }
        </div>
    );
};