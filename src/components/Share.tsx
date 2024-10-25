import React, { useState } from 'react';
import '../styles/result.css';
import { useMember } from "../hooks/MemberManager";
import Swal from 'sweetalert2'; 
import happycat from '../assets/happycat.gif';
import { postStamp } from '../services/DreamService.ts';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { RewardPictureResponse } from '../interfaces/dream.ts';

type ShareProps = {
    boardId: number;
    username: string | null;
    content: string;
    onClick?(parm?: any): void;
    dreamId: number;
};

const Share: React.FC<ShareProps> = ({ boardId, username, content, dreamId }) => {
    const shareUrl = `http://dream-high.s3-website.ap-northeast-2.amazonaws.com/board/${boardId}`;
    const { authorization, login } = useMember();
    const [stamp, setStamp] = useState<AxiosResponse | null>(null);
    const [responsePicture, setResponsePicture] = useState<RewardPictureResponse | null>(null);
    // 안에 타입지정 
  
    const accessToken: AxiosRequestConfig = {
        headers: {
            Authorization: authorization,
        },
    };
    const postAsync = async () => {
        const response = await postStamp(dreamId, accessToken);
        setResponsePicture(response.data);
    }
    

    const showLoginAlert = () => {
        Swal.fire({
            title: '로그인하라냥!',
            html: `<img src="${happycat}" alt="Happy Cat" style="width: 300px; height: auto; margin-bottom: 10px;" />
                <p>로그인해야 공유할 수 있다냥.</p>
            `,
            confirmButtonText: '로그인하러 가기',
            showCancelButton: true,
            cancelButtonText: '취소',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/login-home'; // 로그인 페이지로 이동
            }
        });
    };

    const handleShareKakaoClick = () => {
        if (!login) {
           showLoginAlert(); 
           return;
        }
        

        if (window.Kakao) {
            const kakao = window.Kakao;

            kakao.Share.sendDefault({
                objectType: 'feed',
                content: {
                    title: `${username}님의 해몽 결과다냥`,
                    description: content.substring(0, 30) + '...',
                    imageUrl: 'https://dream-high.s3.ap-northeast-2.amazonaws.com/thumbnail.jpeg',
                    link: {
                        mobileWebUrl: shareUrl,
                        webUrl: shareUrl,
                    },
                },
                buttons: [
                    {
                        title: '자세히 보기',
                        link: {
                            mobileWebUrl: shareUrl,
                            webUrl: shareUrl,
                        },
                    },
                ],
            });
        }postAsync();
    };

    const handleShareTwitterClick = () => {
        if (!login) {
            showLoginAlert();
            return;
        }

        const twitterIntent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(username + '님의 해몽 결과를 확인하세요!')}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterIntent, '_blank');
        postAsync();
    };

    const handleShareInstagramClick = () => {
        if (!login) {
            showLoginAlert();
            return;
        }postAsync();

        Swal.fire({
            icon: 'error',
            title: 'Instagram이 냥이를 거부한다냥😿',
            text: '너무 나쁜 집사다냥!🐾',
            confirmButtonText: '알겠다냥!'
        });

        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                alert('링크가 클립보드에 복사되었습니다!');
            })
            .catch(err => {
                console.error('클립보드에 복사 실패:', err);
            });
    };

    const handleCopyLinkClick = () => {
        if (!login) {
            showLoginAlert();
            return;
        }postAsync();

        Swal.fire({
            icon: 'error',
            title: 'ClipBoard가 냥이를 거부한다냥😿',
            text: '너무 나쁜 집사다냥!🐾',
            confirmButtonText: '알겠다냥!'
        });

        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                alert('공유 링크가 클립보드에 복사되었습니다!');
            })
            .catch(err => {
                console.error('클립보드에 복사 실패:', err);
            });
    };
   

    return (
        <div className="share-buttons">
            <div id="result-sharing-kakao" onClick={handleShareKakaoClick}>
            </div>
            <div id="result-sharing-x" onClick={handleShareTwitterClick}>
            </div>
            <div id="result-sharing-insta" onClick={handleShareInstagramClick}>
            </div>
            <div id="result-sharing-link" onClick={handleCopyLinkClick}></div>
        </div>
    );
}

export default Share;