import React from 'react';
import '../styles/global.css';
import '../styles/footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {  // 수정

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        if (selectedValue) {
            window.open(selectedValue);
        }
    };

    return (
        <div className='footer'>
            <div className='footer-item font-normal'>
                <Link to="/" className='width-child'>
                    <img
                        className='footer-img'
                        src={require('../assets/logo-night.png')}
                    />
                </Link>
                <select id="page-select" onChange={handleSelectChange}>
                    <option value="">Select an option</option>
                    <option value='https://github.com/YoungJunRoh/dream-high'>About</option>
                    <option value='/preparing'>Privacy Policy</option>
                    <option value='https://discord.com/channels/1271016042243817604/1274978267212021760'>Contact Us</option>
                    <option value='https://energetic-voyage-1d2.notion.site/Dream-High-e4814e208c7f4a03a1ad2ffbc857751e?pvs=4'>Our Team</option>
                </select>
            </div>
            <div className='footer-ourteam font-normal'>Develop by
                <span className='footer-color-gold font-extrabold'>Team DreamHigh</span>
            </div>
        </div>
    );
}

export default Footer; // 수정