import {UserInput} from "../types";

export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 8;
};

export const validateTrim = (input: string): boolean => {
    return input.trim() !== "";
}

export const validateUserInput = (userInput: UserInput): boolean => {
    if (!validateTrim(userInput.id)) {
        alert("아이디를 입력해 주세요.");
        return false;
    }

    if (!validateTrim(userInput.password)) {
        alert("비밀번호를 입력해 주세요.");
        return false;
    }

    /*if (!validateEmail(userInput.id)) {
        alert("이메일 형식이 올바르지 않습니다.");
        return false;
    }*/

    /*if (!validatePassword(userInput.password)) {
        alert("비밀번호는 8자 이상이어야 합니다.");
        return false;
    }*/

    if (userInput.password !== userInput.passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    }

    if (!validateTrim(userInput.name ?? "")) {
        alert("이름을 입력해 주세요.");
        return false;
    }

    if (!validateTrim(userInput.phoneNumber ?? "")) {
        alert("전화번호를 입력해 주세요.");
        return false;
    }

    return true;
};