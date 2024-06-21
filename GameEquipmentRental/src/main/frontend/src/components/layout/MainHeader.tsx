import {Link} from "react-router-dom";

export default function MainHeader() {
    return (
        <header>
            <h1>ATTACK</h1>
            <nav>
                <ul>
                    <li>
                        <Link to={"/login"}>로그인</Link>
                    </li>
                    <li>
                        <Link to={"/register"}>회원가입</Link>
                    </li>
                    <li>
                        <Link to={"/admin"}>어드민</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}