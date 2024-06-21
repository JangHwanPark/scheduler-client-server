import {Link} from "react-router-dom";

export default function AdminAside() {
    return (
        <aside>
            <nav>
                <ul>
                    <li>
                        <Link to={"/admin/user"}>회원 관리</Link>
                    </li>
                    <li>
                        <Link to={"/admin/equipment"}>장비 관리</Link>
                    </li>
                    <li>
                        <Link to={"/admin/rental"}>대여 관리</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}