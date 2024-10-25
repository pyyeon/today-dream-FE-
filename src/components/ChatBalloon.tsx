import React from 'react';
import '../styles/global.css';
import '../styles/chatballon.css';

type Props = {
    message: string; // message prop의 타입 정의
}

const ChatBalloon: React.FC<Props> = ({ message }) => {  // 수정
    return (
        <div className='speech-bubble'>
            {message}
        </div>
    );
}

export default ChatBalloon; 