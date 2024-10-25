import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMember } from '../hooks/MemberManager.tsx';
import { getDream, updateDream, postLike, deleteDream } from '../services/DreamService.ts';
import { GetApiResponse } from '../interfaces/dream.ts';
import Swal from 'sweetalert2';
import BoardContent from '../components/BoardContent.tsx';
import '../styles/board.css';
import { OptionTab } from '../components/OptionTab.tsx';
import OptionContent from '../components/OptionTabContent.tsx';
import PostInfo from '../components/PostInfo.tsx';
import Footer from '../components/Footer.tsx';
import Comment from '../components/Comment.tsx';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

const BoardDetails = () => {
    const params = useParams();
    const dreamId: number = parseInt(params.id as string);
    const [responseContent, setResponse] = useState<GetApiResponse | null>(null);
    const [patchResponse, setPatchResponse] = useState<GetApiResponse | null>(null);
    const [likeResponse, setLikeResponse] = useState<AxiosResponse | null>(null);
    const [deleteDreams, setDeleteDreams] = useState<AxiosResponse | null>(null);
    const [updateComment, setUpdateComment] = useState<boolean>(false);
    const { authorization, login } = useMember();
    const navigator = useNavigate();

    const accessToken: AxiosRequestConfig = {
        headers: {
            Authorization: authorization,
        },
    };

    useEffect(() => {
        const getDreamAsync = async () => {
            const response = await getDream(dreamId, accessToken);
            setResponse(response.data);
        }
        getDreamAsync();
        setUpdateComment(false);
    }, [updateComment, likeResponse]);


    const postRoleHandler = async () => {
        currentSecret === 'DREAM_PUBLIC' ? currentSecret = 'DREAM_PRIVATE' : currentSecret = 'DREAM_PUBLIC'; // 다른 경우 'DREAM_PRIVATE'
        console.log(currentSecret);
        const response = await updateDream(dreamId, currentSecret, accessToken);

        setPatchResponse(response.data);
    }

    let currentSecret: string = responseContent?.data.dreamSecret as string;

    const deleteHandler = async () => {
        Swal.fire({
            title: '삭제할거냥?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '응',
            cancelButtonText: '아니야',
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteDream(dreamId, accessToken);
                setDeleteDreams(response);
                if (response.status === 200) {
                    Swal.fire({
                        text: '게시물 삭제 완료다냥',
                        icon: 'success',
                        animation: true
                    });
                    navigator('/board');
                } else if (response.status === 404) {
                    Swal.fire({
                        text: '존재하지 않는 게시물이다냥.',
                        icon: 'error',
                        animation: true
                    });
                } else if (response.status === 501) {
                    Swal.fire({
                        text: '너의 게시물이 아니다냥~',
                        icon: 'error',
                        animation: true
                    });
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    text: '삭제가 취소되었다냥.',
                    icon: 'info',
                    animation: true
                });
            }
        });
    };


    const likeHandler = async () => {
        if (login) {
            const response = await postLike(dreamId, accessToken);
            setLikeResponse(response);
            if (response.status === 201) {
                Swal.fire({
                    text: '좋아요 완료다냥',
                    icon: 'success',
                    animation: true
                });
            } else if (response.status === 204) {
                Swal.fire({
                    text: '좋아요 취소다냥',
                    icon: 'success',
                    animation: true
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: '로그인 하라냥😿',
                text: '로그인 안 한 집사는 이용 못 한다냥!🐾',
                confirmButtonText: '알겠다냥!'
            }).then((result) => {
                if (result.isConfirmed) {
                }
            })
        }
    }

    // 데이터가 아직 로딩되지 않았을 때 로딩 상태를 표시하거나 예외 처리
    if (!responseContent) {
        return <div>Loading...</div>;
    }

    if (responseContent.status === 404) {
        Swal.fire({
            text: '존재하지 않는 게시판입니다.'
        });
        return null; // 알림 후 아무것도 렌더링하지 않음
    }
// 받아서 useEffect 실행하고, 거기서 setUpdateComment false로 변경.

    const onUpdate = (update: boolean) => {
        setUpdateComment(update)
    }

    const data = responseContent.data;
    const interpretationResponse = data?.interpretationResponse;

    const name: string = data.nickName;
    const createdAt: string = data?.createdAt as string;
    const viewCnt: number = data?.viewCount as number;
    const likeCnt: number = data?.likeCount as number;
    const advice: string = interpretationResponse?.advice as string;
    const interpertaionKeyword: object = interpretationResponse?.keyword as object;
    const summary: string = interpretationResponse?.summary as string;
    const dreamContent: string = data?.content as string;
    const interpertaionContent: string = interpretationResponse?.content as string;

    return (
        <div>
            <div className='board-detail-title font-normal'>
                <div id='board-title'>
                    <h4 className='font-extrabold title-string'>{name} 님의 해몽 결과 🐾</h4>
                    {login && <OptionTab>
                        <OptionContent
                            onClick={postRoleHandler}
                        >
                            {currentSecret === 'DREAM_PUBLIC' ? '비밀글로 변경하기' : '공개글로 변경하기'}
                        </OptionContent>
                        <OptionContent
                            onClick={likeHandler}
                        >
                            좋아요
                        </OptionContent>
                        <OptionContent
                            onClick={deleteHandler}
                        >
                            삭제
                        </OptionContent>
                    </OptionTab>}
                </div>
                <p>생성일 : {createdAt}</p>
                <p>조회수 : {viewCnt}</p>
            </div>
            <BoardContent
                advice={advice}
                interpertaionKeyword={interpertaionKeyword}
                summary={summary}
                dreamContent={dreamContent}
                interpertaionContent={interpertaionContent}
                boardId={dreamId}
                username={name}
                dreamId={dreamId}
            />
            <PostInfo
                likeOnClick={likeHandler}
                likeCount={responseContent.data.likeCount}
                commentCount={responseContent.data.comments.length}
            />
            <Comment
                dreamId={dreamId}
                update={onUpdate}
            />
            <Footer />
        </div>
    );
};

export default BoardDetails;
