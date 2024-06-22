import {AdminAside, MainWrapper} from '../layout';

export default function Admin() {
    return (
        <MainWrapper>
            <AdminAside/>
            <div className="admin-content">
                <header className="admin-header">
                    <p>Login Admin Info</p>
                </header>
                <section>
                    <div className="sales-summary">
                        <div className="sales-summary-item">
                            <span className="sales-summary-title">총 매출</span>
                            <span className="sales-summary-value">₩10,000,000</span>
                        </div>
                        <div className="sales-summary-item">
                            <span className="sales-summary-title">이번 달 매출</span>
                            <span className="sales-summary-value">₩1,000,000</span>
                        </div>
                        <div className="sales-summary-item">
                            <span className="sales-summary-title">지난 달 매출</span>
                            <span className="sales-summary-value">₩900,000</span>
                        </div>
                    </div>
                    <div className="sales-chart">
                        <h3>월별 매출 그래프</h3>
                        {/* 그래프 컴포넌트 추가 */}
                    </div>
                    <div className="sales-details">
                        <h3>매출 상세 내역</h3>
                        <table>
                            <thead>
                            <tr>
                                <th>날짜</th>
                                <th>제품명</th>
                                <th>수량</th>
                                <th>가격</th>
                                <th>총액</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>2024-06-01</td>
                                <td>제품 A</td>
                                <td>3</td>
                                <td>₩100,000</td>
                                <td>₩300,000</td>
                            </tr>
                            <tr>
                                <td>2024-06-02</td>
                                <td>제품 B</td>
                                <td>2</td>
                                <td>₩200,000</td>
                                <td>₩400,000</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                <section>
                    <div className="device-management">
                        <table>
                            <thead>
                            <tr>
                                <th>기기 ID</th>
                                <th>기기 이름</th>
                                <th>상태</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>001</td>
                                <td>기기 A</td>
                                <td>사용 중</td>
                            </tr>
                            <tr>
                                <td>002</td>
                                <td>기기 B</td>
                                <td>대기 중</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                <section>
                    <div className="rental-status">
                        <table>
                            <thead>
                            <tr>
                                <th>대여 ID</th>
                                <th>회원 ID</th>
                                <th>기기 ID</th>
                                <th>대여일</th>
                                <th>반납일</th>
                                <th>상태</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1001</td>
                                <td>user01</td>
                                <td>001</td>
                                <td>2024-06-01</td>
                                <td>2024-06-10</td>
                                <td>대여 중</td>
                            </tr>
                            <tr>
                                <td>1002</td>
                                <td>user02</td>
                                <td>002</td>
                                <td>2024-06-05</td>
                                <td>2024-06-15</td>
                                <td>반납 완료</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                <section>
                    <div className="member-info">
                        <table>
                            <thead>
                            <tr>
                                <th>회원 ID</th>
                                <th>이름</th>
                                <th>이메일</th>
                                <th>전화번호</th>
                                <th>가입일</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>user01</td>
                                <td>홍길동</td>
                                <td>hong@example.com</td>
                                <td>010-1234-5678</td>
                                <td>2023-01-01</td>
                            </tr>
                            <tr>
                                <td>user02</td>
                                <td>김철수</td>
                                <td>kim@example.com</td>
                                <td>010-9876-5432</td>
                                <td>2023-02-15</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </MainWrapper>
    );
}