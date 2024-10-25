// TarotDeck.tsx
import React from 'react';
import TarotCard from './TarotCard.tsx';
import '../styles/tarot.css';

const tarotCards = [
    { image: '/path/to/image1.png', title: 'The Fool', description: '설명 1' },
    { image: '/path/to/image2.png', title: 'The Magician', description: '설명 2' },
    { image: '/path/to/image3.png', title: 'The High Priestess', description: '설명 3' },
    // 더 많은 카드 데이터 추가 가능
];

const TarotDeck: React.FC = () => {
    const handleCardClick = (title: string) => {
        alert(`${title} 카드를 선택하셨습니다.`);
        // 더 복잡한 로직 구현 가능
    };

    return (
        <div className='tarot-deck'>
            {tarotCards.map((card) => (
                <TarotCard
                    key={card.title}
                    image={card.image}
                    title={card.title}
                    description={card.description}
                    onClick={() => handleCardClick(card.title)}
                />
            ))}
        </div>
    );
};

export default TarotDeck;
