import React, { useState, useEffect } from 'react';
import '../styles/login.css';
import ResultBigBox from '../components/BigBox.tsx';
import ResultSmallBox from '../components/SmallBox.tsx';
import Button from '../components/Button.tsx';
import { LoginResponse, memberApiResponse } from '../interfaces/member.ts'
import { getMember, postLogin } from '../services/MemberService.ts';
import { useMember } from '../hooks/MemberManager.tsx';
import { MemberContextType } from '../hooks/MemberManager.tsx';
import { MemberManager } from '../hooks/MemberManager.tsx';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import Footer from '../components/Footer.tsx';
import Input from '../components/Input.tsx';
import styled from 'styled-components';
import googleIcon from '../assets/img-google.svg';
import happycat from '../assets/happycat.gif';
import constructionImage from '../assets/constructure.gif';

const GoogleOAuth = styled.div`
    display: flex;
    flex-direction: column;
    background-image: url(${googleIcon});
    background-repeat: no-repeat;
    background-size: contain;
    width: 250px;
    height: 60px;
    cursor: pointer;
`;

const Login = () => {
    const { setAuthorization, setRefresh, setLogin, setName, setProfileUrl} = useMember();
    
    const navigate = useNavigate();
    const [response, setResponse] = useState<LoginResponse | null>(null);
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

   
    // 이메일 추출
    const emailHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEmail(e.target.value);
    };

    // 키다운 이벤트로 이메일 입력 필터링
    const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const allowedKeys = /^[a-zA-Z0-9@._-]+$/;

        // 한글 및 허용되지 않은 키 입력 차단
        if (!allowedKeys.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
            e.preventDefault();
        }
    };

    // 패스워드 추출
    const passwordHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPassword(e.target.value);
    };

    // Enter 키 입력 방지 함수
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // 엔터키 입력으로 줄바꿈 방지
        }
    };

    // 로그인 처리
    const loginHandler = async () => {
        if (email !== undefined && password != undefined) {
            const response = await postLogin(email as string, password as string);
            if (response.status === 401) {
                Swal.fire({
                    title: '다시 입력하라냥',
                    html: ` <p>이메일 또는 비밀번호가 잘못되었다냥 ㅇㅅㅇ</p> <img src="${happycat}" alt="Happy Cat" style="width: 300px; height: auto; margin-bottom: 10px;" />
                    `,
                    confirmButtonText: '확인'
                });
                return;
            } else if (response.status === 500) {
                Swal.fire({
                    title: '로그인 중 문제가 발생했다옹 ',
                    html: `<img src="${happycat}" alt="Happy Cat" style="width: 300px; height: auto; margin-bottom: 10px;" />
                     <p>다시 시도해라냥 ㅇㅅㅇ</p>
                    
                `,
                    confirmButtonText: '확인'
                });
                return;
            } else {
                setResponse(response.data);
                 // 로그인 성공 시 토큰 저장 및 페이지 이동
                setAuthorization(response.headers.authorization);
                setRefresh(response.headers.refresh);
                setLogin(true);
                navigate('/');
            }
        } else if (email === undefined) {

            Swal.fire({
                text: '이메일 또는 비밀번호가 잘못되었다냥 ㅇㅅㅇ',
                html: `<img src="${happycat}" alt="Happy Cat" style="width: 300px; height: auto; margin-bottom: 10px;" />

            `,
                confirmButtonText: '확인'
            });
            return;
        } else if (password === undefined) {
            Swal.fire({
                text: '로그인 중 문제가 발생했서 다시 시도해라냥 ㅇㅅㅇ',
                html: `<img src="${happycat}" alt="Happy Cat" style="width: 300px; height: auto; margin-bottom: 10px;" />
                <p>로그인해야 공유할 수 있다냥.</p>
            `,
                confirmButtonText: '확인'
            });
            return;
        }
    };

    return (
        <div className='login-background'>
            <ResultSmallBox name='로그인이다 냥🐾' mode='loginbox' />
            <ResultBigBox mode='loginbox'>
                <div className='login-input'>
                    <h5>이메일</h5>
                    <Input
                        onChange={emailHandler}
                        onKeyDown={(e) => { handleKeyDown(e); handleEmailKeyDown(e); }}
                        placeholder='아이디를 입력하세요'
                        $m_height='15vw'
                        $m_width='85vw'
                        $m_fontSize='20px'
                        $w_height='56px'
                        $w_width='320px'
                        $w_fontSize='20px'
                        type='email'
                    ></Input>
               </div>
                <div className='login-input'>
                    <h5>비밀번호</h5>
                    <Input
                        onChange={passwordHandler}
                        onKeyDown={handleKeyDown}
                        placeholder='비밀번호를 입력하세요'
                        $m_height='15vw'
                        $m_width='85vw'
                        $m_fontSize='20px'
                        $w_height='56px'
                        $w_width='320px'
                        $w_fontSize='20px'
                        type='password'
                    ></Input>
                </div>
            </ResultBigBox>
            <div className= 'logBtn'>
            <Button
                name='로그인🐾'
                mode='login'
                draggable={true}
                onClick={loginHandler}
            />
            <div className='loginoption'>
            <Button
                name='SNS로그인'
                mode='pass'
                // option='mode'
                onClick={() => {
                    Swal.fire({
                        title: '공사중이다냥~!',
                    html: ` <img src="${constructionImage}" alt="고양이 공사중" style="width: 300px; height: auto; margin-bottom: 10px;" />
                    `,
                confirmButtonText: '확인'
                    })    
                }}
            />
            <Link to='/signup'>
                <Button
                    name='회원가입'
                    mode='pass'
                    draggable={true}
                />
            </Link>
            <Link to='/preparing'>
                <Button
                    name='비밀번호 찾기'
                    mode='pass'
                    draggable={true}
                />
            </Link>
            </div>
            </div>
            <div id='blank'></div>
        </div>
    );
}

export default Login;
