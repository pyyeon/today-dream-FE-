import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/home.css';
import '../styles/interpretation.css';
import Button from '../components/Button.tsx';
import BirthDaySelect from '../components/BirthDaySelect.tsx';
import useKeyboardAvoider from '../hooks/useKeyboardAvoider.tsx';
import TextArea from '../components/TextArea.tsx';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // SweetAlert2 가져오기

const Interpretation = () => {
    useKeyboardAvoider();
    const [prompt, setPrompt] = useState<string>('');
    const navigate = useNavigate();
    const promptHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
        console.log(e.target.value); // 현재 입력된 값 출력
    };
    const buttonClickHandler = () => {
        const charCount = prompt.length; // 문자 수 계산

        // 정규 표현식으로 한글 음절(자음+모음) 확인
        const hasKoreanSyllable = /[가-힣]/.test(prompt);

        // 조건 확인
        if (charCount < 10) {
            Swal.fire({
                title: '입력 오류',
                text: '10자 이상으로 입력해달라옹ㅇㅅㅇ',
                icon: 'warning',
                confirmButtonText: '자세히 적기:발:',
                customClass: {
                    title: 'swal-title', // 제목에 사용자 정의 클래스 적용
                    confirmButton: 'swal-button', // 버튼에 사용자 정의 클래스 적용
                },
            });
        } else if (!hasKoreanSyllable) {
            Swal.fire({
                title: '입력 오류',
                text: '룰루가 알아들을 수 있게 적어달라옹ㅇㅅㅇ',
                icon: 'warning',
                confirmButtonText: '다시적기:발:',
                customClass: {
                    title: 'swal-title', // 제목에 사용자 정의 클래스 적용
                    confirmButton: 'swal-button', // 버튼에 사용자 정의 클래스 적용
                },
            });
        } else {
            navigate('/loading', { state: { prompt } }); // 조건을 만족하면 페이지 이동
        }
    };

    return (
        <div className='background-night'>
            <div className='interpretation-background-cat'>
                <div className='interpretation-blank' />
                <TextArea
                    placeholder='꿈을 입력하라냥'
                    onChange={promptHandler}
                    m_height='11em'
                    m_width='95vw'
                    m_fontSize='18px'
                    w_height='198px'
                    w_width='356.25px'
                    w_fontSize='18px'
                />
                <div className='interpretation-button-area'>
                    <BirthDaySelect />
                    <Button name='완료' mode='result' draggable={true} onClick={buttonClickHandler} />
                </div>
            </div>
        </div>
    );
};
export default Interpretation;