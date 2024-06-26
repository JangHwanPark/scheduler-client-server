import { Link } from "react-router-dom";
import {FiUsers} from "react-icons/fi";
import {LuGamepad2} from "react-icons/lu";
import {HiMiniCubeTransparent} from "react-icons/hi2";

interface AdminAsideProps {
    onClick: () => void;
}

const sideMenu = [
    {
        href: '/admin/users',
        icon: <FiUsers />,
        name: '회원 관리'
    },
    {
        href: '/admin/equipment',
        icon: <LuGamepad2 />,
        name: '기기 관리'
    },
    {
        href: '/admin/rental',
        icon: <HiMiniCubeTransparent />,
        name: '대여 관리'
    }
];

export default function AdminAside({ onClick }: AdminAsideProps) {
    return (
        <aside className="admin-aside">
            <h1 className="main-header-title">ATTACK</h1>
            <nav className="admin-aside-nav">
                <ul className="admin-aside-nav-list">
                    {sideMenu.map((menu, index) => (
                        <li key={index} className="admin-aside-nav-list-item">
                            <Link to={menu.href} className="admin-aside-nav-list-item-link">
                                {menu.icon}
                                {menu.name}
                            </Link>
                        </li>
                    ))}
                    <li className="admin-aside-nav-list-item">
                        <button onClick={onClick} className="admin-aside-nav-list-item-link logout-button">
                            <HiMiniCubeTransparent/>
                            로그아웃
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}