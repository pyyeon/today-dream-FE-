import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';
import '../styles/home.css';
import Button from '../components/Button.tsx';
import { useHeaderMode } from '../hooks/HeaderManager.tsx';
import { useMember } from '../hooks/MemberManager.tsx';
import { AxiosRequestConfig } from 'axios';
import { getMember } from '../services/MemberService.ts';
import { memberApiResponse } from '../interfaces/member.ts';
import love from '../assets/love.png';
import money from '../assets/money.png';
import job2 from '../assets/job2.png';

const TarotStart = () => {
    const { authorization, name, login, setName, profileUrl, setProfileUrl } = useMember();
    const [responseMember, setResponseMember] = useState<memberApiResponse | null>(null);
    const { setHeaderMode } = useHeaderMode();
    const navigate = useNavigate();

    // 헤더 모드 설정
    setHeaderMode('main');

    const accessToken: AxiosRequestConfig = {
        headers: {
            Authorization: authorization,
        },
    };

    // 로그인한 사용자 정보 가져오기
    const getMemberAsync = async () => {
        try {
            const response = await getMember(accessToken);
            setResponseMember(response.data);
            setName(response.data?.data?.nickName || '');
            setProfileUrl(response.data?.data?.profileUrl || '');
        } catch (error) {
            console.error('사용자 정보를 가져오지 못했습니다:', error);
        }
    };

    useEffect(() => {
        if (login) {
            getMemberAsync();
        }
    }, [login]);

    // 카테고리 선택 처리
    const handleCategorySelect = (category: string) => {
        navigate('/tarot-choice', {
            state: { category },
        });
    };

    return (
        <div className="background-night">
            <div
                style={{
                    fontFamily: 'PF-StartDust-ExtraBold',
                    fontSize: '21px',
                    marginBottom: '-10px',
                    marginTop: '10px',
                    color: '#000000',
                }}
            >
                오늘은 어떤게 궁금하냥?
            </div>
            <div className="tarot-cat" />
            {/* 카테고리 버튼 */}
            <div onClick={() => handleCategorySelect('연애운')}>
                <Button name="연애운" mode="love">
                    <img src={love} alt="하트" style={{ width: '27px', height: '25px', marginLeft: '5px' }} />
                </Button>
            </div>
            <div onClick={() => handleCategorySelect('금전운')}>
                <Button name="금전운" mode="money">
                    <img src={money} alt="돈" style={{ width: '30px', height: '30px', marginLeft: '5px' }} />
                </Button>
            </div>
            <div onClick={() => handleCategorySelect('취업운')}>
                <Button name="취업운" mode="job">
                    <img src={job2} alt="직업" style={{ width: '46px', height: '32px', marginRight: '-17px' }} />
                </Button>
            </div>
        </div>
    );
};

export default TarotStart;
