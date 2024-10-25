import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import '../styles/global.css';
import '../styles/mypage.css';
import ProfileImg from './ProfileImg.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { useMember } from '../hooks/MemberManager.tsx'
import Swal from 'sweetalert2';
import { postLogout } from '../services/MemberService.ts';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import defaultProfile from '../assets/img-non-login.png';


// Modal Container
export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

// 모달 뒷 배경
export const ModalBackdrop = styled.div`
  position: fixed;
  width: 375px;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);

  @media all and (max-width:430px) {
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
  }
`;
// 유즈멤버에서 네임이랑 프로필사진 가져오고 가져온걸로 이미지 등록하는거 
// 우리가 한 마이페이지 설정한것처럼 마이페이지 참고하고 네임 유즈멤버 자동적용


// 모달
export const ModalView = styled.div.attrs(() => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: 'dialog',
}))`
  // TODO : Modal창 CSS를 구현합니다.
  // top: 472px;
  top: 50%;
  left: 238px;
  transform: translate(-50%, -50%);
  width: 275px;
  height: 100%;
  background-color: #BAA9C1;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  @media all and (max-width:430px) {
    // TODO : Modal창 CSS를 구현합니다.
    top: 50%;
    left: 65%;
    transform: translate(-50%, -50%);
    width: 70vw;
    height: 100%;
    background-color: #BAA9C1;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
`;

const ProfileImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 10%;
`

export const MenuTab = () => {
  // 전역으로 토큰 및 로그인 상태를 저장하기 위한 훅스 호출
  const [isOpen, setIsOpen] = useState<boolean>(false); // 메뉴탭 상태
  const [isLogin, setIsLogin] = useState<boolean>(false); // 로그인 상태
  const navigation = useNavigate();

  // AxiosRequestConfig 타입 선언.
  const { authorization, refresh, login, name, profileUrl, setAuthorization, setRefresh, setLogin } = useMember();
  const accessToken: AxiosRequestConfig = {
    headers: {
      Authorization: authorization,
    },
  };

  // 로그아웃 API 호출
  const LogoutAsync = async () => {
    const response: AxiosResponse = await postLogout(accessToken);
  }

  const openModalHandler = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const closeModalHandler = () => {
    setIsOpen(false);
  }

  useEffect(() => {
    console.log('로그인 상태: ' + login + '토큰: ' + authorization + ' isLogin : ' + isLogin);
    if (login !== null) {
      setIsLogin(true);
    } else setIsLogin(false);
  })

  const myPageHandler = () => {
    setIsOpen(false);
    navigation('/mypage', { state: { accessToken } });
  }

  // 로그아웃
  const logoutHandler = () => {
    console.log('로그아웃 감지');
    Swal.fire({
      title: '로그아웃 할거냥?',
      icon: 'info',
      confirmButtonText: '예',
      cancelButtonText: '아니요',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLogin(false);
        setLogin(null);
        setAuthorization(null);
        setRefresh(null);
        LogoutAsync();
        closeModalHandler();
        navigation('/');
        Swal.fire('다음에 또 보자냥~');
      }
    })
  };


  if (isLogin) {
    // 로그인 상태
    return (
      <>
        <ModalContainer>
          <div
            id='menu-tap'
            className='draggable'
            onClick={openModalHandler}
          />
          {isOpen ? (
            <ModalBackdrop onClick={openModalHandler}>
              <ModalView onClick={(event) => event.stopPropagation()}>
                <div id='menu-container'>
                  <div></div>
                  <ProfileImage src={profileUrl ? profileUrl : defaultProfile}></ProfileImage>
                  <span
                    id='menu-profile-name'
                    className='font-extrabold'
                  >
                    {name}<span> 이다냥🐱</span></span>
                  <div className='menu-line-bold'></div>
                  <div
                    onClick={myPageHandler}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className='menu-content font-bold'>마이페이지</div>
                  </div>
                  <Link
                    to='/board'
                    onClick={closeModalHandler}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className='menu-content font-bold'>게시판 보러가기</div>
                  </Link>
                  <div
                    className='menu-content font-bold'
                    onClick={logoutHandler}
                  >로그아웃</div>
                </div>
              </ModalView>
            </ModalBackdrop>
          ) : null}
        </ModalContainer>
      </>
    );
  } else {
    return (
      // 비로그인 상태
      <>
        <ModalContainer>
          <div
            id='menu-tap'
            className='draggable'
            onClick={openModalHandler}
          />
          {isOpen ? (
            <ModalBackdrop onClick={openModalHandler}>
              <ModalView onClick={(event) => event.stopPropagation()}>
                <div id='menu-container'>
                  <div></div>
                  <Link
                    to='/login-home'
                    onClick={closeModalHandler}
                  >
                    <ProfileImg login={isLogin}></ProfileImg>
                  </Link>
                  <span
                    id='menu-profile-name'
                    className='font-extrabold'
                    >로그인 하라냥🐱</span>
                    <div className='menu-line-bold'></div>
                  <Link
                    to='/login-home'
                    onClick={closeModalHandler}
                    style={{ textDecoration: 'none' }}
                  >
                  <div className='menu-content font-bold'>로그인 하기</div>
                  </Link>
                  <Link
                    to='/login-home'
                    onClick={closeModalHandler}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className='menu-content font-bold'>마이페이지</div>
                  </Link>
                  <Link
                    to='/board'
                    onClick={closeModalHandler}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className='menu-content font-bold'>게시판 보러가기</div>
                  </Link>
                </div>
              </ModalView>
            </ModalBackdrop>
          ) : null}
        </ModalContainer >
      </>
    );
  }
};