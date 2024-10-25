import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBalloon from '../components/ChatBalloon.tsx';
import Button from '../components/Button.tsx';
import '../styles/result.css';
import '../styles/global.css';
import ResultBox from '../components/ResultBox.tsx';
import ResultBigBox from '../components/BigBox.tsx';
import ResultSmallBox from '../components/SmallBox.tsx';
import Footer from '../components/Footer.tsx';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import Share from '../components/Share.tsx';
import Swal from 'sweetalert2';
import { StateFromReducersMapObject } from 'redux';

interface LocationState {
    advice: string;
    interpertaionKeyword: string;
    summary: string;
    dreamContent: string;
    interpertaionContent: string;
    dreamId: number;
    name: string;
}

const InterpretationResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState | null;

    const interpertaionKeyword = state?.interpertaionKeyword as string;
    const advice = state?.advice as string;
    const summary = state?.summary as string;
    const dreamContent = state?.dreamContent as string;
    const interpertaionContent = state?.interpertaionContent as string;
    const dreamId = state?.dreamId as number;
    const username = state?.name as string;

    const captureRef = useRef<HTMLDivElement>(null);

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

    const goToTarotPage = () => {
        navigate('/preparing');
    };

    return (
        <React.Fragment>
            <div className='background-morning' ref={captureRef}>
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
                            <Share boardId={dreamId} username={username} content={dreamContent} dreamId={dreamId}/>
                        </div>
                        <div className='result-imgdown'>
                            <Button name="이미지로 저장하기" mode="save-image" onClick={handleCapture} />
                        </div>
                    </div>
                </div>
                <ResultSmallBox name='자세한 꿈해몽이다 냥냥🐾' mode='resultbox' />
                <ResultBigBox mode='resultbox'>{interpertaionContent}</ResultBigBox>
                <Button
                    name='타로도 보러갈래냥?🐾'
                    mode='gotarot'
                    draggable={true}
                    onClick={goToTarotPage}
                />
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default InterpretationResult;
