import React, { useEffect, useRef } from 'react';
import '../styles/global.css';
import '../styles/home.css';
import { useHeaderMode } from '../hooks/HeaderManager.tsx';
import '../styles/tarotcard.css';
import '../styles/tarotresult.css';
import '../styles/result.css';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import Button from '../components/Button.tsx';
import ResultBox from '../components/ResultBox.tsx';
import result냥 from '../assets/result냥.png'
import tarot1 from '../assets/tarot1.png'
import tarot2 from '../assets/tarot2.png'
import tarot3 from '../assets/tarot3.png'
import tarot4 from '../assets/tarot4.png'
import tarot5 from '../assets/tarot5.png'
import tarot6 from '../assets/tarot6.png'
import tarot7 from '../assets/tarot7.png'
import tarot8 from '../assets/tarot8.png'
import tarot9 from '../assets/tarot9.png'
import tarot10 from '../assets/tarot10.png'
import tarot11 from '../assets/tarot11.png'
import tarot12 from '../assets/tarot12.png'
import tarot13 from '../assets/tarot13.png'
import tarot14 from '../assets/tarot14.png'
import tarot15 from '../assets/tarot15.png'
import tarot16 from '../assets/tarot16.png'
import tarot17 from '../assets/tarot17.png'
import tarot18 from '../assets/tarot18.png'
import tarot19 from '../assets/tarot19.png'
import tarot20 from '../assets/tarot20.png'
import tarot21 from '../assets/tarot21.png'
import tarot22 from '../assets/tarot22.png'


// 카드 객체 타입 정의
interface Card {
    id: number; // 카드의 고유 ID
    cardName: string; // 카드 이름
    cardMeaning: string; // 카드의 키워드
    image: string; // 카드 이미지
}


interface LocationState {
    category: string;
    firstCard: string;
    secondCard: string;
    thirdCard: string;
    resultcontent: string;
}


const TarotResult = () => {
    const { headerMode, setHeaderMode } = useHeaderMode();
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState | null;
    const category = state?.category as string;
    const firstCard = state?.firstCard as string;
    const secondCard = state?.secondCard as string;
    const thirdCard = state?.thirdCard as string;
    const resultcontent = state?.resultcontent as string;
    const captureRef = useRef<HTMLDivElement>(null);

    // state에서 카드 선택 결과를 받습니다.
    const selectedCards: Card[] = (location.state as Card[]) || []; // 빈 배열로 초기화

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


    useEffect(() => {
        setHeaderMode('main');
    }, [setHeaderMode]);



    return (
        <div className='background-night'>
            <div style={{ marginTop: '30px' }} className="rcard-container">
                {selectedCards.map((card) => (
                    <img key={card.id} src={card.image} alt={card.cardName} className="rcard" />
                ))}
            </div>

            <div className="rcat-image">
                <img src={result냥} alt="결과Cat" />
            </div>

            <div className="result-container">
                <h2>타로 카드 결과</h2>
                <p>선택된 카드에 따른 당신의 운세는...</p>
                <ResultBox message={resultcontent} mode='tarot' />
                <div className='result-imgdown' style={{display:'flex', justifyContent:'center', alignItems: 'center'}}>
                    <Button name="이미지로 저장하기" mode="save-image" onClick={handleCapture} />
                </div>
            </div>

        </div>
    );
};

export default TarotResult;