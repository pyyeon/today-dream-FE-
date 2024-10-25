import React from 'react';
import '../styles/todaytmi.css';

type TodayTMI = {
    content: string;
}

const TodayTMI: React.FC<TodayTMI> = ({ content }) => {
    return (
        <section>
            <div className='content-box'>
                <h2 className='content draggable'>오늘의 TMI</h2>
                <span className='content draggable'>{content}</span>
            </div>
        </section>
    );
}

export default TodayTMI;