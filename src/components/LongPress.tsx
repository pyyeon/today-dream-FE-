import React, { useState, ReactNode } from 'react';
import { useLongPress, LongPressEventType } from 'use-long-press';
import '../styles/global.css';
import '../styles/mypage.css';

type ProfileImgProps = {
    children?: ReactNode;
};

const ProfileImg: React.FC<ProfileImgProps> = ({ children }) => {
    return (
        <div>{children}</div>
    );
};

const LongPress: React.FC = () => {
    const [url, setUrl] = useState('http://localhost:3000/mycollection'); // 새 창으로 열 URL

    const handleLongPress = () => {
        // 새 창으로 URL 열기
        window.open(url, '_blank');
    };

    // useLongPress 훅 설정
    const longPressEvents = useLongPress(handleLongPress, {
        threshold: 500, // 500ms 동안 누르면
        captureEvent: true,
        cancelOnMovement: false,
        detect: LongPressEventType.Touch, // 올바른 열거형 사용
    });

    return (
        <div>
               <button 
                {...longPressEvents()} 
                onMouseDown={(e) => e.preventDefault()} // 마우스 클릭 시 기본 이벤트 방지
                style={{ border: 'none', background: 'none', padding: 0 }} // 스타일 조정
            >
                <ProfileImg>
                    <img 
                        src="'../assets/img-leave.png" // 실제 이미지 경로로 변경
                        alt="Long Press Me" 
                        style={{ width: '100%', height: 'auto' }} // 이미지 스타일 조정
                    />
                </ProfileImg>
            </button>
        </div>
    );
};

export default LongPress;