import {useEffect} from "react";
import {useNavigate} from 'react-router-dom';

import {AdminAside, MainWrapper} from '../layout';
import {GeneralSection} from "../common/GeneralSection.tsx";
import {SalesSummaryItem} from "../common/SalesSummaryItem.tsx";
import {AdminHeader} from "../common/AdminHeader.tsx";
import {AdminChart} from "../common/AdminChart.tsx";
import {useAuth} from "../../context/AuthContext.tsx";

const salesData = [
    { 날짜: '2024-06-01', 제품명: '제품 A', 수량: 3, 가격: '₩100,000', 총액: '₩300,000' },
    { 날짜: '2024-06-02', 제품명: '제품 B', 수량: 2, 가격: '₩200,000', 총액: '₩400,000' }
];

const deviceData = [
    { '기기 ID': '001', '기기 이름': '기기 A', 상태: '사용 중' },
    { '기기 ID': '002', '기기 이름': '기기 B', 상태: '대기 중' }
];

const rentalData = [
    { '대여 ID': '1001', '회원 ID': 'user01', '기기 ID': '001', '대여일': '2024-06-01', '반납일': '2024-06-10', 상태: '대여 중' },
    { '대여 ID': '1002', '회원 ID': 'user02', '기기 ID': '002', '대여일': '2024-06-05', '반납일': '2024-06-15', 상태: '반납 완료' }
];

const memberData = [
    { '회원 ID': 'user01', 이름: '홍길동', 이메일: 'hong@example.com', 전화번호: '010-1234-5678', 가입일: '2023-01-01' },
    { '회원 ID': 'user02', 이름: '김철수', 이메일: 'kim@example.com', 전화번호: '010-9876-5432', 가입일: '2023-02-15' }
];


const salesHeaders = ['날짜', '제품명', '수량', '가격', '총액'];
const deviceHeaders = ['기기 ID', '기기 이름', '상태'];
const rentalHeaders = ['대여 ID', '회원 ID', '기기 ID', '대여일', '반납일', '상태'];
const memberHeaders = ['회원 ID', '이름', '이메일', '전화번호', '가입일'];


export default function Admin() {

    const navigate = useNavigate();
    const { userInfo } = useAuth();


    useEffect(() => {
        if (!userInfo || userInfo.role !== 'ROLE_ADMIN') {
            navigate('/not-found');
        }
    }, [navigate, userInfo]);


    // 로딩 스피너를 표시
    if (!userInfo || !userInfo.user_name) {
        return null;
    }


    return (
        <MainWrapper>
            <AdminAside/>
            <div className="admin-content">
                <AdminHeader user_name={userInfo.user_name}/>
                <section>
                    <div className="sales-summary">
                        <SalesSummaryItem title="총 매출" value="₩10,000,000"/>
                        <SalesSummaryItem title="이번 달 매출" value="₩1,000,000"/>
                        <SalesSummaryItem title="지난 달 매출" value="₩900,000"/>
                    </div>
                    <AdminChart/>
                </section>
                <GeneralSection
                    title="매출 상세 내역"
                    headers={salesHeaders}
                    data={salesData}
                />
                <GeneralSection
                    title="기기 관리"
                    headers={deviceHeaders}
                    data={deviceData}
                />
                <GeneralSection
                    title="대여 상태"
                    headers={rentalHeaders}
                    data={rentalData}
                />
                <GeneralSection
                    title="회원 정보"
                    headers={memberHeaders}
                    data={memberData}
                />
            </div>
        </MainWrapper>
    );
}