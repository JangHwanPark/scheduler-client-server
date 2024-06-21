import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div>
            <Link to={"/login"}>로그인</Link>
            <Link to={"/register"}>회원가입</Link>
            <Link to={"/admin"}>어드민</Link>
        </div>
    );
}