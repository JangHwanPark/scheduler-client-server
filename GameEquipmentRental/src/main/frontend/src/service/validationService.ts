import {UserInput} from "../types";

// 이메일 형식 검사 (정규식 사용)
export const validateEmail = (email: string | undefined): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

// 비밀번호 길이 검사
export const validatePassword = (password: string): boolean => {
    return password.length >= 8;
};

// 비밀번호 형식 검사 (하나 이상의 대문자, 소문자, 숫자, 특수문자가 포함되어야 함)
export const validatePasswordFormat = (password: string): boolean => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return re.test(password);
}

// 공백 검사
export const validateTrim = (input: string | undefined): boolean => {
    if (input === undefined) return false;
    return input.trim() !== "";
}


// 사용자 입력 검증 함수
export const validateUserInput = (userInput: UserInput): boolean => {
    if (!validateTrim(userInput.username ?? "")) {
        alert("아이디를 입력해 주세요.");
        return false;
    }

    if (!validateTrim(userInput.password ?? "")) {
        alert("비밀번호를 입력해 주세요.");
        return false;
    }

    if (!validatePassword(userInput.password ?? "")) {
        alert("비밀번호는 8자 이상이어야 합니다.");
        return false;
    }

    if (!validatePasswordFormat(userInput.password ?? "")) {
        alert("비밀번호는 대문자, 소문자, 숫자, 특수문자가 포함되어야 합니다.");
        return false;
    }

    if (userInput.password !== userInput.passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    }

    if (!validateTrim(userInput.name ?? "")) {
        alert("이름을 입력해 주세요.");
        return false;
    }

    if (!validateTrim(userInput.phone ?? "")) {
        alert("전화번호를 입력해 주세요.");
        return false;
    }

    if (!validateEmail(userInput.username ?? "")) {
        alert("이메일 형식이 올바르지 않습니다.");
        return false;
    }

    return true;
};