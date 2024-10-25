import React from 'react';
import ResultSmallBox from '../components/SmallBox.tsx';
import ResultBigBox from '../components/BigBox.tsx';
import TextArea from '../components/TextArea.tsx';
import '../styles/login.css';
import Button from '../components/Button.tsx';
import Footer from '../components/Footer.tsx';




function FindPassword() {
    return (
        <div className='password-background'>
            <ResultSmallBox name='아이디를 입력하라냥🐾' mode='findbox' />
            <ResultBigBox mode='loginbox'>
                <div className='login-input'>
                    <h5>이메일</h5>
                    <TextArea
                        placeholder='이메일을 입력하세요'
                        m_height='15vw'
                        m_width='85vw'
                        m_fontSize='20px'
                        w_height='100px'
                        w_width='330px'
                        w_fontSize='20px'
                    ></TextArea>
                </div>
            </ResultBigBox>
            <Button name='전송버튼이다냥🐾' mode='login' />
            <div id='passwordblank' />
            <Footer />
        </div>
    );
}

export default FindPassword;