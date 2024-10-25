import { postData, getData, patchData, deleteData } from "./index.ts";
import { GetsApiResponse, PostApiResponse, GetApiResponse, CommentsResponse, RewardPictureResponse } from '../interfaces/dream.ts';
import { AxiosRequestConfig, AxiosResponse } from "axios";

const BASED_URL = process.env.REACT_APP_BASED_URL;
const POST_DREAM_URL = process.env.REACT_APP_BASED_URL + '/dreams'

export const postDream = async (prompt: string, accessToken?: AxiosRequestConfig) => {
    const response = await postData<PostApiResponse>(POST_DREAM_URL, prompt, accessToken);
    return response; // result에서 DreamData 반환
};
export const postStamp = async (dreamId: number, accessToken: AxiosRequestConfig ) => {
    const url = POST_DREAM_URL + '/' + dreamId + '/sharing';
    const response = await postData<RewardPictureResponse>(url, {}, accessToken);
    console.log("" + response);

    return response; // result에서 DreamData 반환
};
export const stampReward = async (dreamId: number, accessToken: AxiosRequestConfig ) => {
    const url = POST_DREAM_URL + '/' + dreamId + '/sharing';
    const response = await postData<RewardPictureResponse>(url, {}, accessToken);
    return response; // result에서 DreamData 반환
};
export const postLike = async (dreamId: number, accessToken: AxiosRequestConfig) => {
    const url = POST_DREAM_URL + '/' + dreamId + '/likes';
    const response = await postData<AxiosResponse>(url, {}, accessToken);
    return response; // result에서 DreamData 반환
};

export const postComment = async (dreamId: number, content: string, accessToken: AxiosRequestConfig) => {
    const url = POST_DREAM_URL + '/' + dreamId + '/comments';
    const response = await postData<AxiosResponse>(url, { content, dreamId }, accessToken);
    return response; // result에서 DreamData 반환
};


export const updateComment = async (commentId: number, content: string, accessToken: AxiosRequestConfig) => {
    const url = BASED_URL + '/' + 'comments/' + commentId;
    const response = await patchData<AxiosResponse>(url, { commentId, content }, accessToken);
    return response; // result에서 DreamData 반환
};

export const deleteComment = async (commentId: number, accessToken: AxiosRequestConfig) => {
    const url = BASED_URL + '/' + 'comments/' + commentId;
    const response = await deleteData<AxiosResponse>(url, accessToken);
    return response; // result에서 DreamData 반환
};


export const getDream = async (pathVariable: number, accessToken?: AxiosRequestConfig) => {
    const response = await getData<GetApiResponse>(POST_DREAM_URL + '/' + pathVariable, accessToken);
    return response;
}

export const getDreams = async (page: number, size: number, dreamKeyword?: string) => {
    const currentkeyword = dreamKeyword ? 'dreamKeyword=' + dreamKeyword + "&" : ""
    const url = POST_DREAM_URL + '?' + currentkeyword + 'page=' + page + '&size=' + size;

    const response = await getData<GetsApiResponse>(url);
    return response;
}

export const getComments = async (dreamId: number, page: number, size: number) => {
    const url = POST_DREAM_URL + '/' + dreamId + '/' + 'comments?page=' + page + '&' + 'size=' + size;

    const response = await getData<CommentsResponse>(url);
    return response;
}

export const updateDream = async (dreamId: number, dreamSecret: string, accessToken: AxiosRequestConfig) => {
    const url = POST_DREAM_URL + '/' + dreamId;
    const response = await patchData<GetApiResponse>(url, { dreamId, dreamSecret }, accessToken);
    return response;
}

export const deleteDream = async (dreamId: number, accessToken: AxiosRequestConfig) => {
    const url = POST_DREAM_URL + '/' + dreamId;
    const response = await deleteData<AxiosResponse>(url, accessToken);
    return response;
}