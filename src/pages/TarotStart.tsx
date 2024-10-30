import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';
import '../styles/home.css';
import Button from '../components/Button.tsx';
import { getDreams } from '../services/DreamService.ts';
import { GetsApiResponse } from '../interfaces/dream.ts';
import { useHeaderMode } from '../hooks/HeaderManager.tsx';
import { useMember } from '../hooks/MemberManager.tsx';
import { AxiosRequestConfig } from 'axios';
import { getMember } from '../services/MemberService.ts';
import { memberApiResponse } from '../interfaces/member.ts'
import love from '../assets/love.png'
import money from '../assets/money.png'
import axios from 'axios';
import job2 from '../assets/job2.png'


const TarotStart = () => {
    const { authorization, name, login, setName, profileUrl, setProfileUrl } = useMember();
    const [responseMember, setResponseMember] = useState<memberApiResponse | null>(null);
    const { headerMode, setHeaderMode } = useHeaderMode();
    const navigate = useNavigate();
    const [responseDreams, setResponseDreams] = useState<GetsApiResponse | null>(null);

    setHeaderMode('main'); // 헤더 상태

    const accessToken: AxiosRequestConfig = {
        headers: {
            Authorization: authorization,
        },
    };

    const getMemberAsync = async () => {
        const response = await getMember(accessToken);
        setResponseMember(response.data);
    }

    setName(responseMember?.data.nickName as string);
    setProfileUrl(responseMember?.data.profileUrl as string);

    // useReload();

    const getDreamsAsync = async () => {
        const response = await getDreams(1, 10);
        setResponseDreams(response.data);
    }

    useEffect(() => {
        getDreamsAsync();
        if (login) {
            getMemberAsync();
        }
    }, [])


    const handleCategorySelect = (category: string) => {
        navigate('/tarot-choice', {
            state: {
                category: category
            }
        });
    };

    return (
        <div className='background-night'>
            <div style={{ fontFamily: 'PF-StartDust-ExtraBold', fontSize: '21px', marginBottom: '-10px', marginTop: '10px', color: '#000000' }}> 오늘은 어떤게 궁금하냥?</div>
            <div className='tarot-cat' />
            <div onClick={() => handleCategorySelect('연애운')}>
                <Button
                    name='연애운'
                    mode='love'>
                    <img src={love} alt="하트" style={{ width: '27px', height: '25px', marginLeft: '5px' }} />
                </Button>
            </div>
            <div onClick={() => handleCategorySelect('금전운')}>
                <Button
                    name='금전운'
                    mode='money'>
                    <img src={money} alt="하트" style={{ width: '30px', height: '30px', marginLeft: '5px' }} />
                </Button>
            </div>
            <div onClick={() => handleCategorySelect('취업운')}>
                <Button
                    name='취업운'
                    mode='job'>
                    <img src={job2} alt="하트" style={{ width: '46px', height: '32px', marginRight: '-17px' }} />
                </Button>
            </div>
        </div>
    );
};

export default TarotStart;