import React, { ReactNode } from 'react';
import '../styles/global.css';
import '../styles/result.css';

type Box = {
    message: string; // message prop의 타입 정의
    mode?: 'board' | 'main' | 'tarot'; // 모드 제한
    children?: ReactNode;
}

const ResultBox: React.FC<Box> = ({ message, mode, children }) => {  // 수정
    let currentClass = ''; // currentClass 변수를 초기화

    switch (mode) {
        case 'board':
            currentClass = 'result-message-board';
            break;
        case 'main':
            currentClass = 'result-message-main';
            break
        case 'tarot':
            currentClass = 'result-tarot-main';
            break
        default:
            break;
    }
    return (
        <div className={currentClass}>
            {message && <span>{message}</span>}
            {children}
        </div>
    );
}

export default ResultBox; 