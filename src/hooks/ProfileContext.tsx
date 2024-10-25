import React, { createContext, useContext, useState, ReactNode } from 'react';

// Context의 상태 타입 정의
interface ProfileContextType {
    profileImage: string | null;
    setProfileImage: (image: string | null) => void;
}

// Context 생성
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Provider 컴포넌트 생성
export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    
    return (
        <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
            {children}
        </ProfileContext.Provider>
    );
};

// Context를 사용하는 커스텀 훅
export const useProfile = (): ProfileContextType => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error("useProfile must be used within a ProfileProvider");
    }
    return context;
};