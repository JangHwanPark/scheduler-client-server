import AdminAside from "../layout/AdminAside.tsx";
import MainWrapper from "../layout/MainWrapper.tsx";
import MainHeader from "../layout/MainHeader.tsx";

export default function Admin() {
    return (
        <MainWrapper>
            <MainHeader/>
            <AdminAside/>
        </MainWrapper>
    );
}