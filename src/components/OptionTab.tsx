import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import '../styles/global.css';
import { useMember } from '../hooks/MemberManager.tsx';
import meatballs from '../assets/icon-meatballs-menu.png';

// 미트볼 메뉴
export const OptionTabButton = styled.div`
    width: 25px;
    height: 30px;
    background-image: url(${meatballs});
    background-repeat: no-repeat;
    position: relative;
    margin-left: 20px;
    cursor: pointer;
    `;

// Modal Container
export const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  overflow: hidden;
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
  background: rgba(0, 0, 0, 0.7);
  overflow: hidden;

  @media all and (max-width:430px) {
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 9999;
  background: rgba(0, 0, 0, 0.7);
}
`;

// 모달
export const ModalView = styled.div.attrs(() => ({
    // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
    role: 'dialog',
}))`
  // TODO : Modal창 CSS를 구현합니다.
  // top: 472px;
  width: 100%;
  height: max-content;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  overflow: hidden;
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

type Option = {
    children: ReactNode
}

export const OptionTab: React.FC<Option> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false); // 메뉴탭 상태
    const [isHost, setIsHost] = useState<boolean>(false); // 로그인 상태

    const openModalHandler = () => {
        setIsOpen(!isOpen);
    };

    const Test = () => {
        return (
            <div>
                // 불러온 좌표값으로 배치하기
            </div>
        );
    }

    return (
        <>
            <ModalContainer>
                <OptionTabButton
                    onClick={openModalHandler}
                />
                {isOpen ? (
                    <ModalBackdrop
                        onClick={openModalHandler}
                    >
                        <ModalView onClick={(event) => event.stopPropagation()}>
                            <OptionContainer>
                                {children}
                            </OptionContainer>
                        </ModalView>
                    </ModalBackdrop>
                ) : null}
            </ModalContainer>
        </>
    );
};