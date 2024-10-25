/// <reference types="react-scripts" />
interface Window {
    Kakao: any;
}

declare module '*.png';
declare module '*.svg';
declare module '*.gif';
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        PUBLIC_URL: string;
        REACT_APP_KAKAO_APP_KEY: string;
        REACT_APP_BASED_URL: string;
    }
}