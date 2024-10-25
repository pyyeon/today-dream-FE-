import React, { createContext, useContext, ReactNode, useState } from 'react';

// HeaderType 인터페이스 정의
export interface HeaderType {
    headerMode: string | null;
    setHeaderMode: (headerMode: string | null) => void;
}

// HeaderContext 생성
const HeaderContext = createContext<HeaderType | undefined>(undefined);

export const HeaderManager: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [headerMode, setHeaderMode] = useState<string | null>('main');
    return (
        <HeaderContext.Provider value={{ headerMode, setHeaderMode }}>
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeaderMode = (): HeaderType => {
    const context = useContext(HeaderContext);
    if (context === undefined) {
        throw new Error('헤더 정보 없음');
    }
    return context;
};