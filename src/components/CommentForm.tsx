import React, { useEffect, useState } from 'react';
import '../styles/global.css';
import styled from 'styled-components';
import { OptionTab } from './OptionTab';
import OptionContent from './OptionTabContent';
import { useMember } from '../hooks/MemberManager';
import { updateComment, deleteComment } from '../services/DreamService';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import Swal from 'sweetalert2';

export const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #E2E2E2;
    margin-top: 2px;
    margin-bottom: 2px;
    padding: 4px;
    padding-top: 6px;
`;

export const ContentInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 2em;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    padding-left: 20px;
    color: black;
    grid-template-columns: minmax(100px, max-content) 1fr;
`;

export const Date = styled.span`
    margin-left: 10px;
    font-size: 15px;
    color: #4d4d4d;
    position: relative;
    top: 2px;
`;

const EditContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Input = styled.input`
    width: 70%;
`;

const Button = styled.button`
    width: 30%;
`;

type CommentProps = {
    username: string;
    dateTime: string;
    content: string;
    commentId: number;
    memberId: number;
    uploadEdit(pram: any): void;
    uploadDelete(pram: any): void;
}

const CommentForm: React.FC<CommentProps> = ({ username, dateTime, content, commentId, memberId, uploadEdit, uploadDelete }) => {
    const { login, authorization } = useMember();
    const [edit, setEdit] = useState<boolean>(false);
    const [currentContent, setContent] = useState<string>('');
    const [response, setResponse] = useState<AxiosResponse | null>(null);
    const [commentDeleteResponse, setCommentDeleteResponse] = useState<AxiosResponse | null>(null);
    const [onDelete, setOnDelete] = useState<boolean>(false);

    const accessToken: AxiosRequestConfig = {
        headers: {
            Authorization: authorization,
        },
    };

    useEffect(() => {
        setContent(content);
    }, [])

    useEffect(() => {
        setOnDelete(false);
    }, [onDelete])

    const setEditHandler = () => {
        setEdit(true);
    }

    const updateCommentAsync = async () => {
        const response = await updateComment(commentId, currentContent, accessToken);
        setResponse(response);
        uploadEdit(true);
        if (response.status === 200) {
            setEdit(false);
            Swal.fire({
                title: '완료!',
                text: '댓글 수정을 완료했다냥',
                icon: 'success',
                confirmButtonText: '확인',
            });
        } else if (response.status === 403) {
            Swal.fire({
                title: '너의 댓글이 아니다냥!',
                text: '확인해보라냥',
                icon: 'error',
                confirmButtonText: '확인',
            });
        }
    }

    const deleteCommentAsync = async () => {
        const response = await deleteComment(commentId, accessToken);
        uploadDelete(true);
        setCommentDeleteResponse(response);
    }

    const deleteCommentHandler = () => {
        setOnDelete(true);
        console.log(onDelete);
        Swal.fire({
            title: '댓글 삭제',
            text: '삭제할거냥?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: '응',
            cancelButtonText: '아니야',
        }).then(async (result) => {
            if (result.isConfirmed) {
                deleteCommentAsync();
            }
        });
        if (commentDeleteResponse?.status === 200) {
            Swal.fire({
                title: '완료!',
                text: '댓글 삭제를 완료했다냥',
                icon: 'success',
                confirmButtonText: '확인',
            });
        } else if (commentDeleteResponse?.status === 403) {
            Swal.fire({
                title: '너의 댓글이 아니다냥!',
                text: '확인해보라냥',
                icon: 'error',
                confirmButtonText: '확인',
            });
        }
    }

    const UserInfo = () => {
        return (
            <div className='comment-name-space'>
                <h5 className='font-extrabold'>{username}</h5>
                <Date className='font-normal'>{dateTime}</Date>
            </div>
        )
    }

    const OptionTabComponent = () => {
        return (
            <div className='comment-option'>
                {login && <OptionTab>
                    <OptionContent
                        onClick={setEditHandler}
                    >
                        수정
                    </OptionContent>
                    <OptionContent
                        onClick={deleteCommentHandler}
                    >
                        삭제
                    </OptionContent>
                </OptionTab>}
            </div>
        );
    }

    return (
        <CommentContainer>
            <ContentInfo>
                <UserInfo />
                <OptionTabComponent />
            </ContentInfo>
            {edit ?
                <EditContainer>
                    <Input
                        value={currentContent}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
                    ></Input>
                    <Button onClick={updateCommentAsync}>수정완료</Button>
                </EditContainer>
                :
                <Content className='font-normal'>
                    {content}
                </Content>}
        </CommentContainer>
    );
}

export default CommentForm;