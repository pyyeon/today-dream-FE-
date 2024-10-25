import React, { useEffect } from 'react';
import '../styles/board.css';
import '../styles/global.css';
import Input from './Input.tsx';
import { XButton } from '../interfaces/input.ts';

type SearchBarProps = {
    onChange(pram: any): void;
    value: string
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange, value }) => {
    const option: XButton = { right: '15px', top: '12px' };

    return (
        <div id='searchbar' className='font-normal'>
            <Input
                placeholder='검색어를 입력하라냥'
                $m_height='50px'
                $m_width='70vw'
                $m_fontSize='20px'
                $w_height='50px'
                $w_width='270px'
                $w_fontSize='20px'
                deleteButton={true}
                deleteButtonOption={option}
                onChange={onChange}
                value={value}
            />
        </div>
    );
};

export default SearchBar;
