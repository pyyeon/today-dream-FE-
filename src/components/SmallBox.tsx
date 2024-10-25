import React from "react";
import '../styles/result.css';
import '../styles/global.css';

type SmallBox = {
    name: string; // message prop의 타입 정의
    mode?: 'resultbox' | 'loginbox' | 'findbox'; // 모드 제한
}

const ResultSmallBox: React.FC<SmallBox> = ({ name, mode }) => {
    let currentClass = ''; // currentClass 변수를 초기화

    switch (mode) {
        case 'resultbox':
            currentClass = 'result-tinybox';
            break;
        case 'loginbox':
            currentClass = 'login-tinybox';
            break;
        case 'findbox':
            currentClass = 'login-findsmallbox';
            break;
        default:
            break;
    }
    return (
        <div className={currentClass}>
            {name && <span>{name}</span>}
        </div>
    );
}

export default ResultSmallBox;