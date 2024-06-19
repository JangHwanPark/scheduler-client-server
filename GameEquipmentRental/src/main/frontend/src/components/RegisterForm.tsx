
export default function RegisterForm() {
    return (
        <div>
            <input type="text" placeholder="아이디를 입력해 주세요"/>
            <input type="password" placeholder="비밀번호를 입력하세요"/>
            <input type="password" placeholder="비밀번호를 다시 입력해 주세요"/>
            <input type="text" placeholder="이름을 입력해 주세요"/>
            <input type="text" placeholder="전화번호를 입력해 주세요"/>
            <button>회원가입</button>
        </div>
    );
}