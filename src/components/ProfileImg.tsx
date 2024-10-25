import React from 'react';
import '../styles/global.css';
import '../styles/mypage.css';

type ProfileImgProps = {
    login?: boolean;
}

const ProfileImg: React.FC<ProfileImgProps> = ({ login = true }) => {
    if (login) {
        return (
            <img id='menu-profile-img' src={require('../assets/img-example-profile.png')} />
        );
    } else {
        return (
            <img id='menu-profile-img' src={require('../assets/img-non-login.png')} />
        );
    }

}

export default ProfileImg;