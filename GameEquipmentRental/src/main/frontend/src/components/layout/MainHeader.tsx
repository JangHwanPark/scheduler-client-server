import { Link } from "react-router-dom";

export default function MainHeader() {
    return (
        <header className="main-header">
            <div className="main-header-wrapper">
                <h1 className="main-header-title">ATTACK</h1>
                <nav className="main-header-nav">
                    <ul className="main-header-nav-list">
                        <li className="main-header-nav-list-item">
                            <Link to="/register" className="main-header-nav-list-item-link">회원가입</Link>
                        </li>
                        <li className="main-header-nav-list-item">
                            <Link to="/admin" className="main-header-nav-list-item-link">어드민</Link>
                        </li>
                        <li className="main-header-nav-list-item">
                            <Link to="/login" className="main-header-nav-list-item-link">로그아웃</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}