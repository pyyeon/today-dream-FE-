import React from 'react';
import constructionImage from '../assets/constructure.gif'; // GIF 파일 import
import backgroundImage from '../assets/const.png';
import '../styles/underConstruction.css';

const TarotPage: React.FC = () => {
    return (
        <div className="construction-page">
            <img 
                src={constructionImage} 
                alt="고양이 공사중"
                className="construction-gif"
            />
            <h1 className="construction-message">공사중이다옹🐾</h1>
        </div>
    );
};

export default TarotPage;
