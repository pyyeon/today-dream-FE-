import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/global.css';
import '../styles/mypage.css'; // 마이페이지 스타일
import { useProfile } from '../hooks/ProfileContext.tsx'; // 프로필 컨텍스트
import { getMember } from '../services/MemberService.ts'; // 사용자 정보 API
import { useMember } from '../hooks/MemberManager.tsx'; // 회원 정보를 관리하는 훅
import Stamp from '../components/Stamp.tsx'; // Stamp 컴포넌트
import { memberApiResponse } from '../interfaces/member.ts';
import styled from 'styled-components';
import background from '../assets/img-background-night.png';
import defaultProfile from '../assets/img-non-login.png';
import BoardIndex from '../components/BoardIndex.tsx';
import BoardList from '../components/BoardList.tsx';
import { AxiosRequestConfig } from 'axios';
import setting from '../assets/icon-setting.png';

type PictureList = {
    pictureDate: memberApiResponse;
}

interface LocationState {
    pictures: [];
}

const MyPageContainer = styled.div`
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

const ContentArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 30px;
    height: max-content;
    width: 90%;
    background-color: rgba(140, 68, 124, 0.8);
    background-repeat: no-repeat;
    margin: 10px;
    color: white;
    border-radius: 10px;
`;

const ContentArea_col = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 90%;
    background-color: rgba(140, 68, 124, 0.8);
    background-repeat: no-repeat;
    margin: 10px;
    color: white;
    border-radius: 10px;
`;

const Title = styled.h5`
    padding-left: 10px;
    padding-top: 10px;
`;

const ProfileImgArea = styled.div`
    justify-content: center;
    padding: 20px;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    position: relative;
`;

const Setting = styled.div`
    background-image: url(${setting});
    background-repeat: no-repeat;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 35px;
    height: 35px;
`;

type AccessToken = {
    accessToken: AxiosRequestConfig;
}

const MyPage = () => {
    const { profileUrl, setProfileUrl } = useMember();
    const [responseMember, setResponseMember] = useState<memberApiResponse | null>(null); // 사용자 정보 상태
    const [accessToken, setAccessToken] = useState<AxiosRequestConfig | null>(null);
    const navigation = useNavigate();
    const location = useLocation();

    // 컴포넌트가 마운트될 때 사용자 정보 가져오기
    useEffect(() => {
        console.log("ㅁㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁ");
        const state: AccessToken = location.state;
        setAccessToken(state.accessToken);

        const getMemberAsync = async () => {
            const response = await getMember(state.accessToken); // API 호출
            setResponseMember(response.data); // 사용자 정보 상태 업데이트
        }
        getMemberAsync(); // API 호출

    }, [location]);

    console.log(`마이페이지 : ${accessToken?.headers?.Authorization}`);

    // 스탬프 개수를 증가시키는 함수
    const pictures: [] = responseMember?.data.pictures as [];
    const email: string = responseMember?.data.email as string;
    const name: string = responseMember?.data.nickName as string;
    const memberId: number = responseMember?.data.memberId as number;
    const memberStatus: string = responseMember?.data.memberStatus as string;

    console.log(name);
    const changeMyProfile = () => {
        navigation('/member-modification', { state: { email, name, accessToken, memberId, memberStatus } })
    }

    const changeProfileImg = () => {
        // TODO: 프로파일 이미지 변경하는 링크로 이동
        // navigation 사용, 스테이트 넘기기
        navigation('/mycollection', { state: { pictures, accessToken, memberId } })
    }

    useEffect(() => {
        setProfileUrl(responseMember?.data.profileUrl as string);
    }, [responseMember])

    useEffect(() => {
        const state2 = location.state as { newProfileUrl?: string };
        if (state2?.newProfileUrl) {
            setProfileUrl(state2.newProfileUrl);
        }
    }, [responseMember])

    const stampCount:number = (responseMember?.data.stampCount as number + 1) % 5;
    return (
        <MyPageContainer>
            <ContentArea className='font-extrabold'>
                <ProfileImgArea>
                    <img
                        src={profileUrl ? profileUrl : defaultProfile}
                        width='150px'
                        onClick={changeProfileImg}  // 서연
                    ></img>
                </ProfileImgArea>
                <UserInfo className='font-bold'>
                    <h1>{name}</h1><h5> 회원님 환영한다냥~</h5>
                    <Setting onClick={changeMyProfile} />
                </UserInfo>
            </ContentArea>
            <Link to={'/memberModification'}>
            </Link>
            <ContentArea_col>
                <Title
                    className='font-bold'
                >스탬프 현황</Title>
                <Stamp count={responseMember?.data.stampCount as number} /> {/* 현재 스탬프 개수를 전달 */}
            </ContentArea_col>
            <ContentArea_col>
                <Title>
                    나의 꿈해몽🐾
                </Title>
                <BoardIndex />
                {responseMember?.data.dreams.map((data) => (<BoardList contentData={data}></BoardList>))}
            </ContentArea_col>

        </MyPageContainer>
    );
};

export default MyPage; // MyPage 컴포넌트 내보내기