// TarotCard.tsx
import React from 'react';
import '../styles/tarot.css';

type TarotCardProps = {
    image: string;
    title: string;
    description: string;
    onClick: () => void;
};

const TarotCard: React.FC<TarotCardProps> = ({ image, title, description, onClick }) => {
    return (
        <div className='tarot-card' onClick={onClick}>
            <img src={image} alt={title} className='tarot-card-image' />
            <h3 className='tarot-card-title'>{title}</h3>
            <p className='tarot-card-description'>{description}</p>
        </div>
    );
};

export default TarotCard;
