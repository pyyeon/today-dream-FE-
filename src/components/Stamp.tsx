import React from 'react';
import styled from 'styled-components';
import stamp01 from '../assets/img-stamp01.png';
import stamp02 from '../assets/img-stamp02.png';
import stamp03 from '../assets/img-stamp03.png';
import stamp04 from '../assets/img-stamp04.png';
import noStamp from '../assets/img-no-stamp.png';

interface StampProps {
    count: number; // 스탬프 개수
}

const StampContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const StampLine = styled.div`
    display: flex;
    flex-direction: row;
`;

const Blank = styled.div`
    width: 60px;
    height: 75px;
`;

const Stamp: React.FC<StampProps> = ({ count }) => {
    let stamp1 = noStamp;
    let stamp2 = noStamp;
    let stamp3 = noStamp;
    let stamp4 = noStamp;
    let stamp5 = noStamp;

    let currentCount = count;

    if (currentCount > 5) {
        currentCount %= 5;
    }

    if (currentCount >= 1) {
        stamp1 = stamp01;
    }

    if (currentCount >= 2) {
        stamp2 = stamp02;
    }

    if (currentCount >= 3) {
        stamp3 = stamp03;
    }

    if (currentCount >= 4) {
        stamp4 = stamp04;
    }

    if (currentCount >= 5) {
        stamp5 = stamp01; // 변경: 5번째 스탬프도 올바른 값으로 설정
    }

    return (
        <StampContainer>
            <StampLine>
                <img src={stamp1} />
                <Blank />
                <img src={stamp2} />
                <Blank />
                <img src={stamp3} />
                <Blank />
            </StampLine>
            <StampLine>
                <Blank />
                <img src={stamp4} />
                <Blank />
                <img src={stamp5} />
                <Blank />
                </StampLine>
        </StampContainer>
    );
}

export default Stamp;
