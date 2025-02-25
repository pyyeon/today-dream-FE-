import React, { useEffect, useState } from 'react';
import '../styles/global.css';
import '../styles/home.css';
import { useHeaderMode } from '../hooks/HeaderManager.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/tarotcard.css';
import '../styles/tarotloading.css';
import cardback from '../assets/cardback.png';
import { PostTarot } from '../services/DreamService.ts';
import Swal from 'sweetalert2';

// LocationState 타입 정의
type LocationState = {
    category: string; // 선택한 카테고리
};

// Tarot 데이터 인터페이스
interface TarotData {
    category: string;
    firstCard: string;
    secondCard: string;
    thirdCard: string;
    summary: string;
    result: string;
}

const TarotLoading = () => {
    const { setHeaderMode } = useHeaderMode();
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState | null;
    const category = state?.category; // 카테고리 가져오기

    // 로딩 화면에 보여질 기본 카드 배열
    const defaultCards = Array.from({ length: 3 }, (_, index) => ({
        id: index,
        image: cardback,
    }));

    useEffect(() => {
        setHeaderMode('main'); // 헤더 상태 설정
    }, [setHeaderMode]);

    const postAsync = async () => {
        try {
            if (!category) {
                throw new Error('카테고리가 선택되지 않았습니다.');
            }
    
            // API 요청
            const response = await PostTarot({ category });
    
            console.log("🔍 API 응답 데이터:", response.data.data); // 응답 확인
            console.log("📌 Summary 값 확인:", response.data.data.summary);
    
            if (response.status === 200) {
                const tarotData: TarotData = response.data.data;
    
                // 결과 페이지로 데이터 전달
                navigate('/tarot-result', {
                    state: {
                        category: tarotData.category,
                        firstCard: tarotData.firstCard,
                        secondCard: tarotData.secondCard,
                        thirdCard: tarotData.thirdCard,
                        summary: tarotData.summary,  
                        result: tarotData.result,   
                    },
                });
            } else {
                throw new Error('서버에서 에러가 발생했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
    
            Swal.fire({
                icon: 'error',
                title: '타로 해석 에러다냥😿',
                text: '해석을 할 수 없었다냥... 다시 해보자냥!🐾',
                confirmButtonText: '알겠다냥!',
            }).then(() => {
                navigate(-1); // 이전 페이지로 이동
            });
        }
    };

    useEffect(() => {
        postAsync(); // API 호출
    }, []);

    return (
        <div className='background-night'>
            <div style={{ marginTop: '70px' }} className="lcard-container">
                {defaultCards.map((card) => (
                    <img key={card.id} src={card.image} alt="카드 뒷면" className="lcard" />
                ))}
            </div>
            <div className='loading-cat' />
        </div>
    );
};

export default TarotLoading;
