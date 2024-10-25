import React, { useRef } from 'react';
import ChatBalloon from '../components/ChatBalloon.tsx';
import Button from '../components/Button.tsx';
import '../styles/result.css';
import '../styles/global.css';
import ResultBox from '../components/ResultBox.tsx';
import ResultBigBox from '../components/BigBox.tsx';
import ResultSmallBox from '../components/SmallBox.tsx';
import Share from './Share.tsx';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas'; // html2canvas 라이브러리 가져오기

interface DreamDatas {
    advice: string;
    interpertaionKeyword: object;
    summary: string;
    dreamContent: string;
    interpertaionContent: string;
    boardId: number;
    username: string | null;
    dreamId: number;
}

const BoardContent: React.FC<DreamDatas> = ({
    advice,
    interpertaionKeyword,
    summary,
    dreamContent,
    interpertaionContent,
    boardId,
    username,
    dreamId
}) => {
    const captureRef = useRef<HTMLDivElement>(null); // 캡처할 요소에 대한 참조

    // 이미지 저장 함수
    const handleCapture = async () => {
        if (captureRef.current) {
            const canvas = await html2canvas(captureRef.current);
            const dataUrl = canvas.toDataURL('image/png');

            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'dream_result.png';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            Swal.fire({
                title: '오류',
                text: '캡처할 수 없습니다.',
                icon: 'error',
                confirmButtonText: '확인',
            });
        }
    };

    return (
        <div className='background-morning' ref={captureRef}> {/* 캡처할 요소 */}
            <div className='result-cat'>
                <ChatBalloon message={advice} />
            </div>
            <div id='marginbox'>
                <ResultBox message={summary} mode='board' />
            </div>
            <div className='bottom-button'>
                <div id='result-sharing'>
                    <p className='font-bold'>공유하기</p>
                    <div id="result-sharing-area">
                        <Share
                            dreamId={dreamId}
                            boardId={boardId}
                            username={username}
                            content={dreamContent}
                        />
                   </div>
                   <div className='result-imgdown'>
                            <Button name="이미지로 저장하기" mode="save-image" onClick={handleCapture} />
                    </div>
                </div>
            </div>
            <ResultSmallBox name='내가 기록한 꿈이다 냥냥🐾' mode='resultbox' />
            <ResultBigBox mode='resultbox'>{dreamContent}</ResultBigBox>
            <ResultSmallBox name='자세한 꿈해몽이다 냥냥🐾' mode='resultbox' />
            <ResultBigBox mode='resultbox'>{interpertaionContent}</ResultBigBox>
        </div>
    );
}

export default BoardContent;
