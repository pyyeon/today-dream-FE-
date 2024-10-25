import React, { ChangeEvent, useEffect, useState } from "react";
import { CommentsResponse } from '../interfaces/dream.ts';
import { getComments } from '../services/DreamService.ts';
import { useMember } from "../hooks/MemberManager.tsx";
import CommentForm from "./CommentForm.tsx";
import { AxiosRequestConfig } from "axios";
import CommentInput from "./CommentInput.tsx";
import styled from "styled-components";
import '../styles/global.css';

type CommentProp = {
    dreamId: number
    update(pram: any): void;
}

const PageInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 40px;
    width: 100%;
`;

const PageNumberArea = styled.h3`
    margin-left: 20px;
    margin-right: 20px;
`;

const Comment: React.FC<CommentProp> = ({ dreamId, update }) => {
    const { authorization } = useMember();
    const accessToken: AxiosRequestConfig = {
        headers: {
            Authorization: authorization,
        },
    };

    const [response, setResponse] = useState<CommentsResponse | null>(null);
    const [page, setPage] = useState<number>(1);
    const getCommentsAsync = async () => {
        setResponse((await getComments(dreamId, 1, 10)).data);
    }
    const [upload, setUpload] = useState<string>('');
    const [uploadEdit, setUploadEdit] = useState<boolean>(false);
    const [uploadDelete, setUploadDelete] = useState<boolean>(false);

    const currentPage: number = response?.pageInfo.totalPages as number;
    const size: number = 10;
    const pageUp = async () => {
        if (page < currentPage + 1) {
            setPage(page + 1);
            setResponse((await getComments(dreamId, page, size)).data);
        }
    }

    const pageDown = async () => {
        if (page > 1) {
            setPage(page - 1);
            setResponse((await getComments(dreamId, page, size)).data);
        }
    }

    const PageInfo = () => {
        return (
            <PageInfoContainer>
                <h3 onClick={pageDown}>◀</h3>
                <PageNumberArea> {page} </PageNumberArea>
                <h3 onClick={pageUp}>▶</h3>
            </PageInfoContainer>
        );
    }

    useEffect(() => {
        setUploadEdit(false);
        setUploadDelete(false);
        getCommentsAsync();
    }, [upload, uploadEdit, uploadDelete]);
    
    const uploadEvent = (content: string) => {
        setUpload(content);
        update(true);
    }

    return (
        <React.Fragment>
            {response?.data.map((data) => (
                <CommentForm
                    username={data.nickName as string}
                    dateTime={data.createdAt as string}
                    content={data.content as string}
                    commentId={data.commentId as number}
                    uploadEdit={setUploadEdit}
                    memberId={data.memberId}
                    uploadDelete={setUploadDelete}
                ></CommentForm>))}
            <CommentInput
                dreamId={dreamId}
                accessToken={accessToken}
                uploadState={uploadEvent}
            />
            <PageInfo />
        </React.Fragment>
    );
};

export default Comment;