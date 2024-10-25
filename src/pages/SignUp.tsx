import React, { useState } from 'react';
import ResultSmallBox from '../components/SmallBox.tsx';
import ResultBigBox from '../components/BigBox.tsx';
import '../styles/login.css';
import '../styles/terms.css';
import '../styles/global.css';
import Footer from '../components/Footer.tsx';
import Button from '../components/Button.tsx';
import TermsModal from '../components/TermsModal.tsx';
import { useNavigate } from 'react-router-dom';
import Timer from '../components/Timer.tsx';
import Swal from 'sweetalert2';
import { postMember, postEmail, postVerifyEmail } from '../services/MemberService.ts';
import Input from '../components/Input.tsx';
import { emailValidation, nameValidation, passwordValidation } from '../utils/Validation.tsx';
import clapcat from '../assets/clapcat.gif';
import { AxiosResponse } from 'axios';

const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const SignUp = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isAgreed, setIsAgreed] = useState<boolean>(false);
    const [nickname, setNickname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repassword, setRepassword] = useState<string>('');
    const [verificationCode, setVerificationCode] = useState<string>('');
    const [verifyComplete, setVerifyComplete] = useState<boolean>(false);
    const [showVerification, setShowVerification] = useState<boolean>(false);
    const [isTimer, setIsTimer] = useState<boolean>(false);
    const [resendEmail, setResendEmail] = useState<boolean>(false);
    const [isEmailResponse, setIsEmailResponse] = useState<AxiosResponse | null>(null);
    const navigate = useNavigate();

    const timerHandler = () => {
        setIsTimer(false);
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAgree = () => setIsAgreed(true);

    const postEmailAsync = async () => {
        const response = await postEmail(email);
        setIsEmailResponse(response);
    }

    // 이메일 인증 API 요청 코드
    const sendEmailAsync = async () => {
        await delay(500);
        setIsTimer(true);
        postEmailAsync();
        setShowVerification(true);
        if (isEmailResponse && isEmailResponse?.status !== 200) {
            Swal.fire({
                text: '이메일 전송에 실패했습니다. 다시 시도해 주세요.',
                icon: 'error',
                confirmButtonText: '확인'
            });
        }
    };

    // 이메일 인증 확인 API 요청 코드
    const matchCodeAsync = async () => {
        const response = await postVerifyEmail(email, verificationCode);
        if (response && response.status === 200) {
            setVerifyComplete(true); // 이메일 인증이 완료되면 이메일 수정 및 클릭 불가
            setShowVerification(false);
            Swal.fire({
                text: '이메일 인증이 완료되었다냥~',
                icon: 'success',
                confirmButtonText: '확인'
            });
        } else if (response.status === 400) {
            Swal.fire({
                text: '인증번호 틀렸다냥~',
                icon: 'error',
                confirmButtonText: '확인'
            });
        } else {
            Swal.fire({
                text: '관리자에게 문의 바란다냥~',
                icon: 'warning',
                confirmButtonText: '확인'
            });
        }

    };

    // 회원가입 완료 처리 코드
    const handleComplete = async (name: string, password: string, email: string) => {
        // 유효성 검사
        if (!nameValidation(name)) return;  // 이름이 유효하지 않으면 종료
        if (!emailValidation(email)) return; // 이메일이 유효하지 않으면 종료
        if (!passwordValidation(password)) return; // 비밀번호가 유효하지 않으면 종료
        if (!verifyComplete) {
            Swal.fire({
                text: '이메일 인증 진행시키라냥~',
                icon: 'error',
                confirmButtonText: '확인'
            });
            return;
        }
        // 이용약관 동의 여부 확인
        if (!isAgreed) {
            Swal.fire({
                text: '이용약관에 동의하라냥~',
                icon: 'error',
                confirmButtonText: '확인'
            });
            return;
        }

        // 회원가입 API 요청 처리
        const response = await postMember(email, password, nickname, verificationCode);
        console.log(email, password, nickname, verificationCode);
        if (response?.status === 201) {
            Swal.fire({
                title: '회원가입이 완료되었다냥~!',
                    html: ` <img src="${clapcat}" alt="Clap Cat" style="width: 300px; height: auto; margin-bottom: 10px;" />
                    `,
                confirmButtonText: '확인'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login-home');
                }
            });
        } else if (response?.status === 409) {
            Swal.fire({
                text: '이미 존재하는 이메일이다냥~~',
                icon: 'error',
                confirmButtonText: '확인'
            });
        }
        else if (response?.status >= 500) {
            Swal.fire({
                text: '회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.',
                icon: 'error',
                confirmButtonText: '확인'
            });
        }
    };

    const verifyPassword = password === repassword ? '일치하다냥😻' : '틀리다냥😿';

    return (
        <div className='login-background'>
            <ResultSmallBox name='회원가입🐾' mode='findbox' />
            <ResultBigBox mode='signupbox'>
                <div className='font-extrabold'>
                    <div className='login-input'>
                        <h5>닉네임</h5>
                        <Input
                            onChange={e => setNickname(e.target.value)}
                            placeholder='닉네임을 입력하세요'
                            $m_height='15vw'
                            $m_width='85vw'
                            $m_fontSize='20px'
                            $w_height='56px'
                            $w_width='320px'
                            $w_fontSize='20px'
                        />
                    </div>
                    <div className='login-input'>
                        <h5>이메일</h5>
                        <Input
                            onChange={e => setEmail(e.target.value)}
                            placeholder='이메일을 입력하세요'
                            $m_height='15vw'
                            $m_width='85vw'
                            $m_fontSize='20px'
                            $w_height='56px'
                            $w_width='320px'
                            $w_fontSize='20px'
                            type='email'
                            readonly={verifyComplete}
                        />
                        {!verifyComplete && (
                            <Button
                                name='이메일 인증'
                                mode="normalButton"
                                onClick={sendEmailAsync}
                            />
                        )}
                    </div>
                    {showVerification && (
                        <div className='login-input'>
                            <div className='signup-validation'>
                                <h5 className='email-margin'>이메일 인증번호</h5>
                                <div className='style-timer'>
                                    {isTimer && <Timer />}
                                </div>
                            </div>
                            <Input
                                onChange={e => setVerificationCode(e.target.value)}
                                placeholder='인증번호를 입력해주세요.'
                                $m_height='15vw'
                                $m_width='85vw'
                                $m_fontSize='20px'
                                $w_height='56px'
                                $w_width='320px'
                                $w_fontSize='20px'
                                type='number'
                            />
                            <Button
                                mode='normalButton'
                                name='인증 완료'
                                onClick={matchCodeAsync}
                            />
                            {!resendEmail && (
                                <Button
                                    mode='normalButton'
                                    name='이메일 재전송'
                                    onClick={() => {
                                        timerHandler();
                                        sendEmailAsync();
                                    }}
                                />
                            )}
                        </div>
                    )}
                    <div className='login-input'>
                        <div className='signup-validation'>
                            <h5>비밀번호</h5>
                            <span className='signup-validation-text'>{verifyPassword}</span>
                        </div>
                        <Input
                            onChange={e => setPassword(e.target.value)}
                            placeholder='비밀번호를 입력하세요'
                            $m_height='15vw'
                            $m_width='85vw'
                            $m_fontSize='20px'
                            $w_height='56px'
                            $w_width='320px'
                            $w_fontSize='20px'
                            type='password'
                        />
                    </div>
                    <div className='login-input'>
                        <div className='signup-validation'>
                            <h5>비밀번호 확인</h5>
                            <span className='signup-validation-text'>{verifyPassword}</span>
                        </div>
                        <Input
                            onChange={e => setRepassword(e.target.value)}
                            placeholder='비밀번호를 재입력하세요'
                            $m_height='15vw'
                            $m_width='85vw'
                            $m_fontSize='20px'
                            $w_height='56px'
                            $w_width='320px'
                            $w_fontSize='20px'
                            type='password'
                        />
                    </div>
                    <h5 className='h5'>이용약관 확인하라옹</h5>
                    <div className='cat-paw-button'>
                        <button onClick={handleOpenModal}>
                            <div className="paw"></div>
                            <div className="paw"></div>
                            <div className="paw"></div>
                            <div className="paw"></div>
                            <div className="paw"></div>
                        </button>
                    </div>
                </div>
            </ResultBigBox>
            <div id='signup-confirm'>
                <Button name='가입하러가자냥🐾' mode='login' onClick={() => handleComplete(nickname, password, email)} />
            </div>
            {isModalOpen && (
                <TermsModal onClose={handleCloseModal} onAgree={handleAgree} />
            )}
            <Footer />
        </div>
    );
}

export default SignUp;
