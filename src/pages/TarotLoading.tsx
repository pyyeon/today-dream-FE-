import React, { useEffect, useState } from 'react';
import '../styles/global.css';
import '../styles/home.css';
import { useHeaderMode } from '../hooks/HeaderManager.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/tarotcard.css';
import '../styles/tarotloading.css';
import cardback from '../assets/cardback.png';
import { PostTarot } from '../services/DreamService.ts';
import { TarotPostApiResponse } from '../interfaces/dream.ts';
import Swal from 'sweetalert2';

// 카드 객체 타입 정의
interface Card {
    id: number; // 카드의 고유 ID
    cardName: string; // 카드 이름
    cardMeaning: string; // 카드의 키워드
    image: string; // 카드 이미지
}

// 결과 인터페이스
interface Result {
    category: string;
    firstCard: string;
    secondCard: string;
    thirdCard: string;
    content: string;
}

// 타로 데이터 인터페이스
interface TarotData {
    category: string;
    firstCard: string;
    secondCard: string;
    thirdCard: string;
    result: string;
}

// API 응답 인터페이스
interface ApiResponse {
    data: TarotData;
}

// LocationState 타입 정의
type LocationState = {
    category: string; // 카테고리 추가
    selectedCards: Card[]; // 선택된 카드 배열
};

// 카드 데이터 생성
const cards: Card[] = Array.from({ length: 3 }, (_, index) => ({
    id: index,
    cardName: `Card ${index + 1}`,
    cardMeaning: `Meaning for Card ${index + 1}`,
    image: cardback,
}));

const TarotLoading = () => {
    const { setHeaderMode } = useHeaderMode();
    const location = useLocation();
    const state = location.state as LocationState | null;
    const category = state?.category; // 카테고리 가져오기
    const selectedCards = state?.selectedCards; // 선택된 카드 가져오기
    const navigate = useNavigate();
    const [responseContent, setResponseContent] = useState<ApiResponse | null>(null);

    useEffect(() => {
        setHeaderMode('main'); // 헤더 상태 설정
    }, [setHeaderMode]);

    const postAsync = async () => {
        try {
            if (!category) {
                throw new Error('카테고리가 선택되지 않았습니다.');
            }

            const requestData = { category }; // 요청 데이터
            const response = await PostTarot(requestData); // API 요청

            console.log(response); // API 응답 확인

            if (response.status === 200) {
                const tarotData: TarotPostApiResponse = response.data; // ApiResponse에서 TarotPostApiResponse로 변경
                const result: TarotData = tarotData.data; // TarotData 가져오기

                const firstCard = result.firstCard; // Result에서 카드 정보 가져오기
                const secondCard = result.secondCard; // Result에서 카드 정보 가져오기
                const thirdCard = result.thirdCard; // Result에서 카드 정보 가져오기
                const resultContent = result.result; // Result에서 해석 내용 가져오기

                navigate('/tarot-result', {
                    state: { category, firstCard, secondCard, thirdCard, resultContent }
                });
            } else {
                throw new Error('타로 해석 에러가 발생했습니다.');
            }
        } catch (error) {
            console.error(error); // 에러 로그 추가
            if (error instanceof Error) {
                Swal.fire({
                    icon: 'error',
                    title: '타로해석 에러다냥😿',
                    text: error.message || '해석을 할 수 없었다냥... 다시 해보자냥!🐾',
                    confirmButtonText: '알겠다냥!'
                }).then(() => {
                    navigate(-1); // 뒤로 가기
                });
            }
        }
    };

    useEffect(() => {
        postAsync(); // 컴포넌트가 마운트될 때 API 호출
    }, []);


    return (
        <div className='background-night'>
            <div style={{ marginTop: '70px' }} className="lcard-container">
                {cards.map((card) => (
                    <img key={card.id} src={card.image} alt={card.cardName} className="lcard" />
                ))}
            </div>
            <div className='loading-cat' />
        </div>
    );
};

export default TarotLoading;
