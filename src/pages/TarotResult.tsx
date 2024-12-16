import React, { useEffect, useRef } from 'react';
import '../styles/global.css';
import '../styles/home.css';
import { useHeaderMode } from '../hooks/HeaderManager.tsx';
import '../styles/tarotcard.css';
import '../styles/tarotresult.css';
import '../styles/result.css';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import Button from '../components/Button.tsx';
import ResultBox from '../components/ResultBox.tsx';
import result냥 from '../assets/result냥.png';
import tarot1 from '../assets/tarot1.png';
import tarot2 from '../assets/tarot2.png';
import tarot3 from '../assets/tarot3.png';
import tarot4 from '../assets/tarot4.png';
import tarot5 from '../assets/tarot5.png';
import tarot6 from '../assets/tarot6.png';
import tarot7 from '../assets/tarot7.png';
import tarot8 from '../assets/tarot8.png';
import tarot9 from '../assets/tarot9.png';
import tarot10 from '../assets/tarot10.png';
import tarot11 from '../assets/tarot11.png';
import tarot12 from '../assets/tarot12.png';
import tarot13 from '../assets/tarot13.png';
import tarot14 from '../assets/tarot14.png';
import tarot15 from '../assets/tarot15.png';
import tarot16 from '../assets/tarot16.png';
import tarot17 from '../assets/tarot17.png';
import tarot18 from '../assets/tarot18.png';
import tarot19 from '../assets/tarot19.png';
import tarot20 from '../assets/tarot20.png';
import tarot21 from '../assets/tarot21.png';
import tarot22 from '../assets/tarot22.png';

// 카드 객체 타입 정의
interface Card {
    id: number;
    name: string;
    image: string;
}

interface LocationState {
    category: string;
    firstCard: string;
    secondCard: string;
    thirdCard: string;
    result: string; // GPT에서 받은 결과 메시지
}

// 22개의 카드 데이터 생성
const allCards: Card[] = [
    { id: 1, name: '바보', image: tarot1 },
    { id: 2, name: '마법사', image: tarot2 },
    { id: 3, name: '여사제', image: tarot3 },
    { id: 4, name: '여황제', image: tarot4 },
    { id: 5, name: '황제', image: tarot5 },
    { id: 6, name: '교황', image: tarot6 },
    { id: 7, name: '연인', image: tarot7 },
    { id: 8, name: '전차', image: tarot8 },
    { id: 9, name: '힘', image: tarot9 },
    { id: 10, name: '은둔자', image: tarot10 },
    { id: 11, name: '운명의 수레바퀴', image: tarot11 },
    { id: 12, name: '정의', image: tarot12 },
    { id: 13, name: '매달린 사람', image: tarot13 },
    { id: 14, name: '죽음', image: tarot14 },
    { id: 15, name: '절제', image: tarot15 },
    { id: 16, name: '악마', image: tarot16 },
    { id: 17, name: '탑', image: tarot17 },
    { id: 18, name: '별', image: tarot18 },
    { id: 19, name: '달', image: tarot19 },
    { id: 20, name: '태양', image: tarot20 },
    { id: 21, name: '심판', image: tarot21 },
    { id: 22, name: '세계', image: tarot22 },
];

const TarotResult = () => {
    const { setHeaderMode } = useHeaderMode();
    const location = useLocation();
    const state = location.state as LocationState | null;

    const category = state?.category || '기본 카테고리';
    const result = state?.result || '결과가 없습니다.';
    const firstCard = state?.firstCard;
    const secondCard = state?.secondCard;
    const thirdCard = state?.thirdCard;

    const captureRef = useRef<HTMLDivElement>(null);

    // 매칭된 카드 가져오기
    const matchedCards = allCards.filter((card) => {
        const firstName = firstCard?.split(' - ')[0].trim(); // DB에서 카드 이름만 추출
        const secondName = secondCard?.split(' - ')[0].trim();
        const thirdName = thirdCard?.split(' - ')[0].trim();

        return (
            card.name === firstName ||
            card.name === secondName ||
            card.name === thirdName
        );
    });

    const handleCapture = async () => {
        if (captureRef.current) {
            const canvas = await html2canvas(captureRef.current);
            const dataUrl = canvas.toDataURL('image/png');

            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'tarot_result.png';

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
        <div ref={captureRef} className="background-night">
            <div style={{ marginTop: '30px' }} className="rcard-container">
                {matchedCards.map((card) => (
                    <img
                        key={card.id}
                        src={card.image}
                        alt={card.name}
                        className="rcard"
                    />
                ))}
            </div>

            <div className="rcat-image">
                <img src={result냥} alt="결과 Cat" />
            </div>

            <div className="result-container">
                <h2>타로 카드 결과</h2>
                <p>선택된 카드에 따른 당신의 운세는...</p>
                <ResultBox message="" mode="tarot">
                    <h5>{result}</h5>
                </ResultBox>

                <div
                    className="result-imgdown"
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Button name="이미지로 저장하기" mode="save-image" onClick={handleCapture} />
                </div>
            </div>cd
        </div>
    );
};

export default TarotResult;
