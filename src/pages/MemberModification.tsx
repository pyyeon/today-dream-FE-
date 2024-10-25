import React, { useEffect, useState } from 'react';
import '../styles/global.css';
import ResultSmallBox from '../components/SmallBox.tsx';
import CheckModal from '../components/CheckModal.tsx';
import Button from '../components/Button.tsx';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import background from '../assets/img-background-night.png';
import Input from '../components/Input.tsx';
import { updateName } from '../services/MemberService.ts';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { postLogout, deleteMember } from '../services/MemberService.ts';
import { useMember } from '../hooks/MemberManager.tsx';



const ModificationContainer = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${background});
    background-size: 100%;
    background-color: #340C62;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    color: black;
    align-items: center;
`;

const InputArea_center = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    margin-bottom: 20px;
    justify-content: center;
`;

const InputArea_left = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    margin-bottom: 20px;
    padding-left: 20px;
`;

const Email = styled.p`
    font-size: 20px;
`;

const DeleteMember = styled.p`
    font-size: 18px;
    text-decoration: underline;
    color: #575757;
`;

const ContentArea_col = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 95%;
    background-color: rgba(243, 243, 243, 0.7);
    border: 2px solid #ff69b4;
    background-repeat: no-repeat;
    margin: 10px;
    color: black;
    border-radius: 10px;
    padding: 10px;
`;

type MemberState = {
    email: string;
    name: string;
    accessToken: AxiosRequestConfig;
    memberId: number;
    memberStatus: string;
}

const MemberModification = () => {
    const gohome = useNavigate();

    const location = useLocation();
    const state: MemberState = location.state;
    const email = state.email;
    const accessToken: AxiosRequestConfig = state.accessToken;
    const memberId = state.memberId;
    let memberStatus = state.memberStatus;

    const { setAuthorization, setRefresh, setLogin, setName, setProfileUrl } = useMember();
    const navigation = useNavigate();
    const navigation2 = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isAgreed, setIsAgreed] = useState<boolean>(false);
    const [nickName, setNickName] = useState<string>(state.name);
    const [response, setResponse] = useState<AxiosResponse | null>(null);
    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickName(e.target.value);
        console.log(nickName);
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    const handleAgree = () => setIsAgreed(true);
    type ErrorResponseProps = {
        code: number;
    }
    const changeNameHandlerAsync = async () => {
        if (memberStatus === '활동중') {
            memberStatus = 'MEMBER_ACTIVE';
        } else if (memberStatus === '휴면 상태') {
            memberStatus = 'MEMBER_SLEEP';
        } else if (memberStatus === '탈퇴 상태') {
            memberStatus = 'MEMBER_QUIT';
        }

        const response = await updateName(memberId, nickName, memberStatus, accessToken);
        if (response.status === 200) {
            Swal.fire({
                text: '닉네임 변경이 완료되었다냥~'
            });
            navigation('/mypage', { state: { accessToken } });
        }
        setResponse(response);
    }

    const changePasswordHandler = () => {
        navigation('/login-passwordreset', { state: { memberId, accessToken, email } })
    }

    const goMypage = () => {
        navigation('/mypage', { state: { accessToken } });
    }

    const handleLeave = () => {
        Swal.fire({
            title: '정말 탈퇴할꺼냥...?',
            text: '탈퇴 후에는 복구할 수 없다냥.....',
            imageUrl: require('../assets/img-leave.png'), // 이미지 경로를 설정합니다.
            imageWidth: 100, // 이미지 너비 설정
            imageHeight: 100, // 이미지 높이 설정
            imageAlt: '탈퇴 아이콘', // 이미지 설명 텍스트
            showCancelButton: true,
            confirmButtonText: '아니.....',
            cancelButtonText: '어..미안..',
        }).then(async (result) => {
            if (!result.isConfirmed) {
                setAuthorization(null);
                setRefresh(null);
                setLogin(null);
                setName(null);
                setProfileUrl(null);
                await deleteMember(memberId, accessToken);
                await postLogout(accessToken);
                gohome('/');
            }
        });
    };
    return (
        <ModificationContainer className='font-extrabold'>
            <ResultSmallBox name='회원정보다냥🐾' mode='loginbox' />
            <ContentArea_col>
                <h5>닉네임 변경</h5>
                <InputArea_center>
                    <Input
                        $m_height='50px'
                        $m_width='100%'
                        $m_fontSize='18px'
                        $w_height='50px'
                        $w_width='100%'
                        $w_fontSize='18px'
                        value={nickName}
                        onChange={inputChangeHandler}
                    >
                    </Input >
                    <Button
                        mode='search'
                        name='변경'
                        onClick={changeNameHandlerAsync}
                    >
                    </Button>
                </InputArea_center>
                <h5>이메일</h5>
                <InputArea_left>
                    <Email>{email}</Email>
                </InputArea_left>
                <h5>비밀번호 변경할꺼냥?</h5>
                <InputArea_center>
                    <Button
                        mode='normalButton'
                        name='비밀번호 수정하기🐾'
                        onClick={changePasswordHandler}
                    >
                    </Button>
                </InputArea_center>
                <h5 >이용약관 확인하라옹</h5>
                <InputArea_center>
                    <div className='cat-paw-button'>
                        <button onClick={handleOpenModal}>
                            <div className="paw"></div>
                            <div className="paw"></div>
                            <div className="paw"></div>
                            <div className="paw"></div>
                            <div className="paw"></div>
                        </button>
                    </div>
                </InputArea_center>
                <InputArea_center>
                    <Button
                        name='수정완료다냥!🐾'
                        mode='leave'
                        onClick={goMypage}
                    >
                    </Button>
                </InputArea_center>
                <InputArea_center>
                    <DeleteMember
                        onClick={handleLeave} // 클릭 시 handleLeave 함수 호출
                        className='font-normal'
                    >
                        ㅎ..회원 탈퇴....
                    </DeleteMember>
                </InputArea_center>
            </ContentArea_col>
            {isModalOpen && (
                <CheckModal onClose={handleCloseModal} onAgree={handleAgree} />
            )}
        </ModificationContainer>
    );
}

export default MemberModification;