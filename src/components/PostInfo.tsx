import React from 'react';
import '../styles/global.css';
import heartImg from '../assets/icon-heart.png';
import commentImg from '../assets/icon-comment.png';
import styled from 'styled-components';

type PostInfoProps = {
    likeOnClick?(parm?: any): void;
    commentOnClick?(parm?: any | void): void;
    likeCount?: number;
    commentCount?: number;
}

export const PostInfoForm = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 50px;
    width: 100%;
    background-color: #E2E2E2;
`;

export const Heart = styled.div`
    height: 35px;
    width: 30px;
    background-image: url(${heartImg});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    margin-left: 15px;
    cursor: pointer;
`

export const Comment = styled.div`
    height: 40px;
    width: 30px;
    background-image: url(${commentImg});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    margin-left: 20px;
    cursor: pointer;
`

export const Count = styled.span`
    font-size: 20px;
    margin-left: 10px;
`;

const PostInfo: React.FC<PostInfoProps> = ({ likeOnClick, commentOnClick, likeCount=0, commentCount=0 }) => {
    return (
        <PostInfoForm>
            <Heart
                onClick={likeOnClick}
            />
            <Count className='font-bold'>{likeCount}</Count>
            <Comment
                onClick={commentOnClick}
            />
            <Count className='font-bold'>{commentCount}</Count>
        </PostInfoForm>
    );
}

export default PostInfo;