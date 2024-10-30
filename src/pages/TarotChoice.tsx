import React, { useEffect, useState, useRef } from 'react';
import '../styles/global.css';
import '../styles/home.css';
import { useHeaderMode } from '../hooks/HeaderManager.tsx';
import '../styles/tarotcard.css';
import cardback from '../assets/cardback.png'
import { useNavigate, useLocation  } from 'react-router-dom';
import Button from '../components/Button.tsx';
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



// 22개의 카드 데이터 생성
const allCards: Card[] = [
    { id: 1, cardName: "The Fool", cardMeaning: "새로운 시작, 자유, 순수", image: tarot1 },
    { id: 2, cardName: "The Magician", cardMeaning: "의지, 창의성, 자원 활용", image: tarot2 },
    { id: 3, cardName: "The High Priestess", cardMeaning: "직관, 무의식, 신비", image: tarot3 },
    { id: 4, cardName: "The Empress", cardMeaning: "풍요, 모성, 창조", image: tarot4 },
    { id: 5, cardName: "The Emperor", cardMeaning: "권위, 통제, 안정", image: tarot5 },
    { id: 6, cardName: "The Hierophant", cardMeaning: "전통, 사회적 규범, 영적 지도", image: tarot6 },
    { id: 7, cardName: "The Lovers", cardMeaning: "사랑, 조화, 관계의 선택", image: tarot7 },
    { id: 8, cardName: "The Chariot", cardMeaning: "승리, 의지력, 성공", image: tarot8 },
    { id: 9, cardName: "Strength", cardMeaning: "용기, 자제력, 인내", image: tarot9 },
    { id: 10, cardName: "The Hermit", cardMeaning: "고독, 자기 성찰, 지혜", image: tarot10 },
    { id: 11, cardName: "Wheel of Fortune", cardMeaning: "변화, 운명, 행운", image: tarot11 },
    { id: 12, cardName: "Justice", cardMeaning: "정의, 균형, 진실", image: tarot12 },
    { id: 13, cardName: "The Hanged Man", cardMeaning: "희생, 새로운 관점, 중립적인 태도", image: tarot13 },
    { id: 14, cardName: "Death", cardMeaning: "변화, 끝, 새로운 시작", image: tarot14 },
    { id: 15, cardName: "Temperance", cardMeaning: "균형, 조화, 절제", image: tarot15 },
    { id: 16, cardName: "The Devil", cardMeaning: "유혹, 물질주의, 속박", image: tarot16 },
    { id: 17, cardName: "The Tower", cardMeaning: "갑작스러운 변화, 붕괴, 충격", image: tarot17 },
    { id: 18, cardName: "The Star", cardMeaning: "희망, 영감, 재생", image: tarot18 },
    { id: 19, cardName: "The Moon", cardMeaning: "환상, 무의식, 불안", image: tarot19 },
    { id: 20, cardName: "The Sun", cardMeaning: "성공, 기쁨, 긍정적인 에너지", image: tarot20 },
    { id: 21, cardName: "Judgment", cardMeaning: "부활, 내적 각성, 평가", image: tarot21 },
    { id: 22, cardName: "The World", cardMeaning: "완성, 성취, 통합", image: tarot22 },
];


const TarotChoice = () => {
    const { setHeaderMode } = useHeaderMode();
    const location = useLocation();
    const [cards, setCards] = useState<Card[]>([]);
    const category = location.state?.category; // 카테고리 가져오기
    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    const navigate = useNavigate();
    const cardSliderRef = useRef<HTMLDivElement | null>(null);
    const [showButton, setShowButton] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    

    const shuffleCards = () => {
        const shuffled = [...allCards].sort(() => Math.random() - 0.5);
        setCards(shuffled);
    };

    // 카드 초기 셔플
    useEffect(() => {
        shuffleCards();
    }, []);


    useEffect(() => {
        // allCards를 셔플하여 cards 상태에 설정
        const shuffled = [...allCards]
            .map(card => ({ ...card, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ sort, ...card }) => card);

        setCards(shuffled);
    }, []);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardSliderRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX);
        setScrollLeft(cardSliderRef.current.scrollLeft);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !cardSliderRef.current) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (startX - x) * 1.5;
        cardSliderRef.current.scrollLeft = scrollLeft + walk;
    };

    const handleCardSelect = (card: Card, e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            e.preventDefault();
            return;
        }
    
        if (selectedCards.some(selectedCard => selectedCard.id === card.id)) {
            // 카드가 이미 선택된 경우 해제
            setSelectedCards(prev => prev.filter(selectedCard => selectedCard.id !== card.id));
        } else if (selectedCards.length < 3) {
            // 카드가 선택되지 않은 경우 추가
            setSelectedCards(prevSelected => [...prevSelected, card]);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };
    // 터치 이벤트 핸들러 수정
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!cardSliderRef.current) return;
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
        setScrollLeft(cardSliderRef.current.scrollLeft);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging || !cardSliderRef.current) return;
        const x = e.touches[0].clientX;
        const walk = (startX - x) * 2;
        cardSliderRef.current.scrollLeft = scrollLeft + walk;
    };

    const handleResultClick = () => {
        if (selectedCards.length === 3) {
            navigate('/tarot-loading', { state: { category, selectedCards } });
        }
    };

    useEffect(() => {
        setHeaderMode('main');
        setShowButton(selectedCards.length === 3);
    }, [selectedCards]);




    return (
        <div className='background-night'>
            <div className='card-cat' />
            <div className="tarot-container">
                <div
                    className="card-slider"
                    ref={cardSliderRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleMouseUp}
                    style={{
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        cursor: isDragging ? 'grabbing' : 'grab',
                        WebkitOverflowScrolling: 'touch',
                        msOverflowStyle: 'none',
                        scrollbarWidth: 'none',
                        position: 'relative',
                        padding: '20 ruqpx 20px',
                    }}
                >
                    {/* 카드 컨테이너 */}
                    <div style={{
                        display: 'inline-flex',  // 중요: inline-flex로 변경
                        gap: '0px',  // 카드 간격
                        padding: '0 20px',
                        whiteSpace: 'nowrap',
                        width: 'max-content'  // 중요: 컨텐츠 크기만큼 너비 설정
                    }}>
                        {cards.map(card => (
                            <div
                                key={card.id}
                                className={`card ${selectedCards.some(selectedCard => selectedCard.id === card.id) ? 'selected' : ''}`}
                                onClick={(e) => handleCardSelect(card, e)}
                                style={{
                                    width: '90px',  // 카드 크기
                                    flexShrink: 0,   // 카드 크기 고정
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s ease',
                                    transform: selectedCards.some(
                                        selectedCard => selectedCard.id === card.id
                                    ) ? 'translateY(20px)' : 'none'
                                }}
                            >
                                <img
                                    src={cardback}
                                    alt={`Card Back`}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        pointerEvents: 'none',
                                        borderRadius: '10px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="selected-cards">
                <div className="selected-card-container">
                    {selectedCards.map(card => (
                        <div key={card.id} className="selected-card">
                            <img src={card.image} alt={card.name} />
                        </div>
                    ))}
                </div>
                {showButton && (
                    <Button
                        name='결과보기'
                        mode='tarot'
                        onClick={handleResultClick}
                    />
                )}
            </div>
        </div >
    );
};

export default TarotChoice;