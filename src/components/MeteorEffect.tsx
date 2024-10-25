import React from 'react';
import styled, { keyframes, css } from 'styled-components';

// 별똥별 애니메이션을 정의하는 keyframes 함수
const MeteorKeyframe = (direction: "left" | "right", angle: number) => keyframes`
    0% {
        top: 2vh; // 애니메이션 시작 위치 (화면 위쪽)
        transform: translateX(0px); // X축 이동 없음
        opacity: 1; // 완전 불투명
    }
    100% {
        top: 160vh; // 애니메이션 끝 위치 (화면 아래쪽)
        transform: translateX(${direction === "left" ? "-" : "+"}${130 / Math.tan((angle * Math.PI) / 180)}vh); // 방향에 따라 X축 이동
        opacity: 1; // 끝 위치에서도 불투명 유지
    }
`;

// MeteorLayoutProps 인터페이스 정의: MeteorEffectLayout의 props 타입
interface MeteorLayoutProps {
    $direction: "left" | "right"; // 별의 이동 방향
    $angle: number; // 각도
}

// MeteorEffectLayout: 별똥별 효과의 전체 레이아웃을 정의하는 styled-component
const MeteorEffectLayout = styled.div<MeteorLayoutProps>`
    position: absolute; // 절대 위치
    left: 0; // 왼쪽에 위치
    width: 100%; // 전체 너비
    height: 100%; // 전체 높이
    overflow: hidden; // 내용이 넘치지 않도록
    pointer-events: none; /* 클릭 이벤트 방지, 배경과 상호작용하지 않도록 */

    .star {
        position: relative;
        top: 50%;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #ffffff;
        animation: ${(props) => MeteorKeyframe(props.$direction, props.$angle)} 4s ease-in infinite;
        opacity: 0;
    }

    .star::after {
        position: absolute;
        top: calc(50% - 1px);
        left: -950%;
        width: 2000%;
        height: 2px;
        background: linear-gradient(to left, #fff0, #ffffff);
        content: "";
        transform: ${(props) => props.$direction === "left" ? `rotateZ(-${props.$angle}deg)` : `rotateZ(-${180 - props.$angle}deg)`} translateX(50%);
    }

    .star:nth-child(2) {
        transform: translateX(300px);
        animation-delay: 5.1s;
    }

    .star:nth-child(3) {
        transform: translateX(450px);
        animation-delay: 1s;
    }

    /* 미디어 쿼리 추가 */
    @media (max-width: 768px) {
     

        .star {
            width: 3px; /* 별 크기 조정 */
            height: 3px; /* 별 크기 조정 */
            animation: ${(props) => MeteorKeyframe(props.$direction, props.$angle)} 3s ease-in infinite; /* 애니메이션 속도 조정 */
        }
    }

    @media (max-width: 430px) {
    position: absolute; // 절대 위치
    left: 0; // 왼쪽에 위치
    width: 100vw; // 전체 너비
    height: 100vh; // 전체 높이
    overflow: hidden; // 내용이 넘치지 않도록
    pointer-events: none; /* 클릭 이벤트 방지, 배경과 상호작용하지 않도록 */

        .star {
            width: 3px; /* 별 크기 조정 */
            height: 4px; /* 별 크기 조정 */
            animation: ${(props) => MeteorKeyframe(props.$direction, props.$angle)} 2.3s ease-in infinite; /* 애니메이션 속도 조정 */
        }
    }
`;



// MeteorEffectProps 인터페이스 정의: MeteorEffect 컴포넌트의 props 타입
interface MeteorEffectProps {
    count?: number;
    white?: boolean;
    maxDelay?: number;
    minSpeed?: number;
    maxSpeed?: number;
    angle?: number;
    direction?: "left" | "right";
}

// 최대 별의 수 정의
const MAX_STAR_COUNT = 50;
const colors = ["#c77eff", "#f6ff7e", "#ff8d7e", "#ffffff"];
// MeteorEffect 컴포넌트 정의
export default function MeteorEffect({ count = 12, white = false, maxDelay = 15, minSpeed = 2, maxSpeed = 4, angle = 30, direction = "right" }: MeteorEffectProps) {
    // 실제 생성할 별의 수를 결정 (최대 별의 수를 초과하지 않도록)
    const starCount = Math.min(count, MAX_STAR_COUNT);

    return (
        <MeteorEffectLayout $direction={direction} $angle={angle}>
            {/* starCount 만큼 별을 생성 */}
            {Array.from({ length: starCount }).map((_, idx) => {
                const animationDelay = `${Math.random() * 5}s`; // 랜덤한 애니메이션 지연 시간
                const size = `${2 + Math.floor(Math.random() * 5)}px`; // 랜덤한 별의 크기 (2px에서 6px 사이)
                const left = `${Math.random() * 100}%`; // 랜덤한 X 위치 설정 (0%에서 100% 사이)

                return (
                    <div
                        key={idx} // 각 별의 고유 키
                        className='star' // 클래스 이름
                        style={{
                            left, // 랜덤 X 위치
                            width: size, // 랜덤 크기
                            height: size, // 랜덤 크기
                            animationDelay, // 랜덤 애니메이션 지연
                        }}
                    />
                );
            })}
        </MeteorEffectLayout>
    );
}
