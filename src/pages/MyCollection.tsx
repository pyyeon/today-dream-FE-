import React, { useState, useEffect } from 'react';
import '../styles/global.css';
import '../styles/getpicture.css';
import styled, { css } from "styled-components";
import Swal from 'sweetalert2';
import { useProfile } from '../hooks/ProfileContext.tsx'; // Context 가져오기
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { patchProfile } from '../services/MemberService.ts';

const ImageItem = styled.img`
    flex: 0 0 21%; 
    margin: 5px; 
    max-width: 43%; /* 부모 컨테이너의 너비에 맞추기 */
    max-height: 50%; /* 최대 높이 설정 */
    object-fit: cover; /* 이미지 비율 유지하며 크기 조절 */
    cursor: pointer; /* 이미지에 포인터 커서 추가 */
`;

const ImageContainer = styled.div`
    display: flex; /* Flexbox로 이미지 배치 */
    flex-wrap: wrap; /* 이미지가 자동으로 줄바꿈되도록 설정 */
    justify-content: center; /* 중앙 정렬 */
    align-items: flex-start; /* 수직 정렬을 상단 기준으로 설정 */
    height: 100%;
    border: 1px solid #ccc; /* 필요에 따라 테두리 추가 */
    border-radius: 8px; /* 필요에 따라 모서리 둥글게 만들기 */
    height: max-content;
    width: 80%;
`;
type PictureState = {
    pictures: [];
    memberId: number;
    accessToken: AxiosRequestConfig;
}

interface picture {
    rewardPictureId: number;
    rewardUrl: string;
}

const MyCollection = () => {
    const location = useLocation();
    const state = location.state as PictureState | null;
    const pictures: picture[] = state?.pictures as [];
    const memberId: number = state?.memberId as number;
    const accessToken: AxiosRequestConfig = state?.accessToken as AxiosRequestConfig;
    const navigate = useNavigate();

    const [profileResponse, setProfileResponse] = useState<AxiosResponse | null>(null);
    // 안에 타입지정 

    const patchProfileAsync = async (profileUrl: string) => {
        // 비동기는 다 asynic붙여줘야함
        console.log(profileUrl);
        const response = await patchProfile(memberId, profileUrl, accessToken);
        setProfileResponse(response);
        if (response.status === 200) {
            Swal.fire("완료다냥");
        }
    }

    const handleImageClick = (index: number, newProfileUrl: string) => {
        Swal.fire({
            title: '사진을 변경할꺼냥?',
            showCancelButton: true,
            confirmButtonText: '변경',
            cancelButtonText: '취소',
        }).then((result) => {
            if (result.isConfirmed) {
                patchProfileAsync(newProfileUrl);
            } navigate('/mypage', { state: { accessToken, newProfileUrl } });
        });
    };

    return (
        <div className='background'>
            <div className='collectionbox'>
                <h2>내 컬렉션</h2>
                <ImageContainer>
                    {pictures.map((picture) => (
                        <ImageItem src={picture.rewardUrl}
                            onClick={() => handleImageClick(picture.rewardPictureId, picture.rewardUrl)} // 이미지 클릭 시 핸들러 호출
                        />
                    ))}
                </ImageContainer>
            </div>
        </div>
    );
}
export default MyCollection;