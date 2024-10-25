import React, { ReactNode } from "react";
import '../styles/result.css';
import '../styles/global.css';

type BigBox = {
    mode?: 'resultbox' | 'loginbox' | 'signupbox'; // 모드 제한
    children: ReactNode;
}

const ResultBigBox: React.FC<BigBox> = ({ mode, children }) => {
    let currentClass = ''; // currentClass 변수를 초기화

    switch (mode) {
        case 'resultbox':
            currentClass = 'result-bigbox';
            break;
        case 'loginbox':
            currentClass = 'result-loginbigbox';
            break;
        case 'signupbox':
            currentClass = 'loginbigbox';
            break;
        default:
            break;
    }

    return (
        <div className={currentClass}>
            {children}
        </div>
    );
}

export default ResultBigBox;