import React from 'react';
import '../styles/board.css';
import '../styles/global.css';
import { DreamData } from '../interfaces/dream.ts';
import { Link } from 'react-router-dom';
import { Dreams } from '../interfaces/member.ts';

type BoardListProps = {
    contentData: DreamData | Dreams;
}

const formatDate = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diff / (1000 * 60));

    if (diffHours < 24) {
        if (diffHours >= 1) {
            return `${diffHours}시간 전`;
        } else if (diffMinutes >= 1) {
            return `${diffMinutes}분 전`;
        } else {
            return `방금 전`;
        }
    } else {
        const month = date.getMonth() + 1; // getMonth()는 0부터 시작함.
        const day = date.getDate();
        return `${month}.${day}`;
    }
};

const BoardList: React.FC<BoardListProps> = ({ contentData }) => {  // 수정
    const number: number = contentData.dreamId;
    const content: string = contentData.content;
    const createdAt: Date = new Date(contentData.createdAt);
    const urn = '/board/' + number;
    // 2024-08-22 09:49:25


    return (
        <div id='board-list-container' className='font-normal'>
            <div className='board-no'>{number}</div>
            <Link
                to={urn}
                style={{ textDecoration: 'none', color: 'black' }}
            >
                <div
                className='board-content font-extrabold font-size-17 order-left'
                >
                    {content}</div>
            </Link>
            <div className='board-created'>{formatDate(createdAt)}</div>
            {/* API 받아서 Map */}
        </div>
    );
}

export default BoardList; // 수정