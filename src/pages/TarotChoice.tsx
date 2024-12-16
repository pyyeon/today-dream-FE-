import React, { useEffect, useState, useRef } from 'react';
import '../styles/global.css';
import '../styles/home.css';
import { useHeaderMode } from '../hooks/HeaderManager.tsx';
import '../styles/tarotcard.css';
import cardback from '../assets/cardback.png';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button.tsx';
import { PostTarot } from '../services/DreamService.ts';

// 카드 객체 타입 정의
interface Card {
    id: number;
}

// 카드 데이터 생성
const allCards: Card[] = Array.from({ length: 22 }, (_, i) => ({ id: i + 1 }));

const TarotChoice = () => {
    const { setHeaderMode } = useHeaderMode();
    const location = useLocation();
    const [cards, setCards] = useState<Card[]>([]);
    const [selectedCards, setSelectedCards] = useState<Card[]>([]);
    const navigate = useNavigate();
    const cardSliderRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // 카테고리 가져오기
    const category = location.state?.category;

    const shuffleCards = () => {
        const shuffled = [...allCards].sort(() => Math.random() - 0.5);
        setCards(shuffled);
    };

    useEffect(() => {
        shuffleCards();
        setHeaderMode('main');
    }, [setHeaderMode]);

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

    const handleMouseUp = () => setIsDragging(false);

    const handleCardSelect = (card: Card, e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            e.preventDefault();
            return;
        }
        if (selectedCards.some(selectedCard => selectedCard.id === card.id)) {
            setSelectedCards(prev => prev.filter(selectedCard => selectedCard.id !== card.id));
        } else if (selectedCards.length < 3) {
            setSelectedCards(prevSelected => [...prevSelected, card]);
        }
    };

    const handleResultClick = async () => {
        if (!category) {
            alert('카테고리를 선택해주세요.');
            return;
        }
    
        try {
            const requestData = { category }; // 카테고리 정보만 서버로 전송
            await PostTarot(requestData);    // 서버에 POST 요청
            navigate('/tarot-loading', { state: { category } }); // 로딩 페이지로 이동
        } catch (error) {
            console.error('서버 요청 중 오류 발생:', error);
            alert('결과를 가져오지 못했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="background-night">
            <div className="tarot-container">
                <div
                    className="card-slider"
                    ref={cardSliderRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    style={{
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        cursor: isDragging ? 'grabbing' : 'grab',
                    }}
                >
                    <div
                        style={{
                            display: 'inline-flex',
                            gap: '10px',
                            whiteSpace: 'nowrap',
                            padding: '0 20px',
                        }}
                    >
                        {cards.map(card => (
                            <div
                                key={card.id}
                                className={`card ${selectedCards.some(selectedCard => selectedCard.id === card.id) ? 'selected' : ''}`}
                                onClick={(e) => handleCardSelect(card, e)}
                                style={{
                                    width: '90px',
                                    flexShrink: 0,
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s ease',
                                    transform: selectedCards.some(selectedCard => selectedCard.id === card.id)
                                        ? 'translateY(20px)'
                                        : 'none',
                                }}
                            >
                                <img
                                    src={cardback}
                                    alt="Card Back"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        borderRadius: '10px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* 선택된 카드 영역 */}
            <div className="selected-cards">
                <div className="selected-card-container">
                    {selectedCards.map(card => (
                        <div key={card.id} className="selected-card">
                            <img
                                src={cardback}
                                alt="Card Back"
                                style={{
                                    width: '90px',
                                    height: 'auto',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                }}
                            />
                        </div>
                    ))}
                </div>
                {selectedCards.length === 3 && (
                    <Button name="결과보기" mode="tarot" onClick={handleResultClick} />
                )}
            </div>
        </div>
    );
};

export default TarotChoice;
