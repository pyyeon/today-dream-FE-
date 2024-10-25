import Swal from "sweetalert2";

const regexValid = (input: string, mode: string): boolean => {
    if (mode === 'password') {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
        return regex.test(input);
    } else if (mode === 'name') {
        const regex = /^[a-zA-Z가-힣]+$/;
        return regex.test(input);
    } else if (mode === 'email') {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(input);
    }
    return false;
};

export const emailValidation = (email: string): boolean => {
    if (!email) {
        Swal.fire({
            text: '이메일을 입력하라냥',
            icon: 'error'
        });
        return false;
    } else if (!regexValid(email, 'email')) {
        Swal.fire({
            text: '이메일 형식을 맞추라냥',
            icon: 'error'
        });
        return false;
    }
    return true;
};

export const nameValidation = (name: string): boolean => {
    if (!name) {
        Swal.fire({
            text: '이름을 입력하라냥~',
            icon: 'error'
        });
        return false;
    } else if (name.length > 10) {
        Swal.fire({
            text: '이름은 10자 이하다냥~',
            icon: 'error'
        });
        return false;
    } else if (!regexValid(name, 'name')) {
        Swal.fire({
            text: '이름은 한글과 영어만 된다냥~',
            icon: 'error'
        });
        return false;
    }
    return true;
};

export const passwordValidation = (password: string): boolean => {
    if (!password) {
        Swal.fire({
            text: '비밀번호를 입력하라냥~',
            icon: 'error'
        });
        return false;
    } else if (password.length < 8) {
        Swal.fire({
            text: '비밀번호는 8자 이상이다냥~',
            icon: 'error'
        });
        return false;
    } else if (password.length > 16) {
        Swal.fire({
            text: '비밀번호는 16자 이내여야 한다냥~',
            icon: 'error'
        });
        return false;
    } else if (!regexValid(password, 'password')) {
        Swal.fire({
            text: '비밀번호에는 영어와 숫자, 특수문자가 포함되어야 한다냥~',
            icon: 'error'
        });
        return false;
    }
    return true;
};
