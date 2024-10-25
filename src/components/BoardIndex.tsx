import React from 'react';
import '../styles/board.css';
import '../styles/global.css';

const BoardIndex = () => {  // 수정
    return (
        <div id='board-index-container' className='font-extrabold'>
            <div className='board-no'>No</div>
            <div className='board-content'>꿈내용</div>
            <div className='board-created'>생성일</div>
        </div>
    );
}

export default BoardIndex; // 수정