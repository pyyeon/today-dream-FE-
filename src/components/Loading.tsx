import React, { FC } from 'react';
import { GridLoader } from 'react-spinners';

const override: React.CSSProperties = {
    margin: '0 auto',
    marginTop: '220px',
    textAlign: 'center',
    color: '#fff',
};

interface LoadingProps {
    loading: boolean;
}

const Loading: FC<LoadingProps> = ({ loading }) => {
    return (
        <div>
            <GridLoader 
                color="#fff"
                loading={loading}
                cssOverride={override}
                size={25}  // size는 GridLoader 컴포넌트에 직접 전달됨
                speedMultiplier={0.8}
                margin={5}
            />
            <div style={{
                padding: '20px',
                color: '#fff',
                fontWeight: 700,
            }}>
                <h1> 사진을 분석하고 있어요 </h1>
            </div>
        </div>
    );
}

export default Loading;