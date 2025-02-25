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

// 모달
export const ModalView = styled.div.attrs(() => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: 'dialog',
}))`
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
  const [isOpen, setIsOpen] = useState<boolean>(false); // 메뉴탭 상태
  const [isLogin, setIsLogin] = useState<boolean>(false); // 로그인 상태
  const navigation = useNavigate();

  const { authorization, refresh, login, name, profileUrl, setAuthorization, setRefresh, setLogin } = useMember();
  const accessToken: AxiosRequestConfig = {
    headers: {
      Authorization: authorization,
    },
  };

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
                     <Link to="/tarot-start"  onClick={closeModalHandler} style={{ textDecoration: 'none' }}>
                     <div className='menu-content font-bold'>타로 보러가기</div>
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
                  <Link to="/tarot-start" className="menu-content font-bold" onClick={closeModalHandler}>
                    타로 보러가기
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


