import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';
import '../styles/home.css';
import TodayTMI from '../components/TodayTMI.tsx';
import tmiDatas from '../static/tmiData.tsx';
import Button from '../components/Button.tsx';
import BoardIndex from '../components/BoardIndex.tsx';
import BoardList from '../components/BoardList.tsx';
import BoardSeeMore from '../components/BoardSeeMore.tsx';
import Footer from '../components/Footer.tsx';
import { getDreams } from '../services/DreamService.ts';
import { GetsApiResponse } from '../interfaces/dream.ts';
import HotDream from '../components/HotDream.tsx';
import { useHeaderMode } from '../hooks/HeaderManager.tsx';
import useReload from '../hooks/useReload.tsx';
import { useMember } from '../hooks/MemberManager.tsx';
import { AxiosRequestConfig } from 'axios';
import { getMember } from '../services/MemberService.ts';
import { memberApiResponse } from '../interfaces/member.ts'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { authorization, name, login, setName, profileUrl, setProfileUrl } = useMember();
    const [responseMember, setResponseMember] = useState<memberApiResponse | null>(null);
    const { headerMode, setHeaderMode } = useHeaderMode();
    const [responseDreams, setResponseDreams] = useState<GetsApiResponse | null>(null);
    const navigate = useNavigate();
    setHeaderMode('main'); // 헤더 상태

    const accessToken: AxiosRequestConfig = {
        headers: {
            Authorization: authorization,
        },
    };

    const getMemberAsync = async () => {
        try {
            console.log("Fetching member with token:", authorization);
            const response = await getMember(accessToken);
            console.log("Member API Response:", response); // 전체 응답 확인
            console.log("Member Data:", response.data); // 실제 데이터 확인
            setResponseMember(response.data);
            console.log(new Date(1740843386 * 1000)); 
            console.log(new Date(1740843386 * 1000)); 
        } catch (error) {
            console.error("Error fetching member:", error);
        }
    };
    
    setName(responseMember?.data.nickName as string);
    setProfileUrl(responseMember?.data.profileUrl as string);

    // useReload();

    const getDreamsAsync = async () => {
        const response = await getDreams(1, 10);
        setResponseDreams(response.data);
    }

    useEffect(() => {
        getDreamsAsync();
    }, []);
    
    useEffect(() => {
        if (login && authorization) {
            getMemberAsync();
        }
    }, [login, authorization]);
    

    const totalElements = responseDreams?.pageInfo.totalElements as number;

    const datas: any[] = responseDreams?.data || [];
    const boards = datas.map((data) => (<BoardList contentData={data}></BoardList>))

    const hotDreamMaker = () => {
        if (responseDreams && totalElements > 0) {
            // totalElements가 10 이하인 경우에도 인덱스 범위 내에서 랜덤 선택
            const maxIndex = Math.min(totalElements, 10);
            const randomHotDream: number = Math.floor(Math.random() * maxIndex);
            return responseDreams?.data[randomHotDream].content;
        }
        return "데이터가 없습니다.";// fallback 메시지 또는 null
    };

    
    const goToTarotPage = () => {
        navigate('/tarot-start');
    };

    const randomTmiIdx: number = Math.floor(Math.random() * tmiDatas.length);

    return (
        <div className='background-night'>
            <div className='main-cat'>
                <TodayTMI
                    content={tmiDatas[randomTmiIdx]} />
                <Link to={'/interpretation'}>
                    <Button
                        name='start'
                        mode='main' />
                </Link>
                
                <div className='content-name-container'>
                    <span className='font-bold content-name'>이런 해몽도 있다냥 🐾</span>
                </div>
                <HotDream>{hotDreamMaker()}</HotDream>
                {/* <Button
                    name='타로도 보러갈래냥?🐾'
                    mode='gotarot'
                    draggable={true}
                    onClick={goToTarotPage}
                /> */}
                <div className='another-dream font-extrabold'>다른꿈도 보러가기  ▼</div>
                <BoardIndex />
                {boards}
                <Link to='/board'>
                    <BoardSeeMore />
                </Link>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
