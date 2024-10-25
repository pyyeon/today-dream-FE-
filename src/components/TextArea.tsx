import React, { ReactNode } from 'react';
import '../styles/global.css';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type TextAreaProps = {
    onChange?(parm?: any): void;
    onKeyDown?(parm?: any): void;
    placeholder?: string;
    children?: ReactNode;
    m_height: string;
    m_width: string;
    m_fontSize: string;
    w_height: string;
    w_width: string;
    w_fontSize: string;
    value?:string;
}

const TextAreaForm = styled.textarea<TextAreaProps>`
height: ${(props) => props.w_height};
width: ${(props) => props.w_width};
border: 5px solid black;
padding: 10px;
font-size: ${(props) => props.w_fontSize};
margin-bottom: 5px;
resize: none;
position: relative;

@media all and (max-width:430px) {
height: ${(props) => props.m_height};
width: ${(props) => props.m_width};
border: 5px solid black;
padding: 10px;
font-size: ${(props) => props.m_fontSize};
margin-bottom: 5px;
resize: none;
position: relative;
}
`;

const TextArea: React.FC<TextAreaProps> = ({ onChange, onKeyDown, value, placeholder, children, m_height, m_width, m_fontSize, w_height, w_width, w_fontSize }) => {
    return (
        <TextAreaForm
            className='font-normal'
            placeholder={placeholder}
            onChange={onChange}
            m_height={m_height}
            m_width={m_width}
            m_fontSize={m_fontSize}
            w_height={w_height}
            w_width={w_width}
            w_fontSize={w_fontSize}
            onKeyDown={onKeyDown}
            value={value}
        >
            {children}
        </TextAreaForm>
    );
}

export default TextArea;