import React, { ReactNode, useRef } from 'react';
import '../styles/global.css';
import styled from 'styled-components';
import useKeyboardAvoider from '../hooks/useKeyboardAvoider.tsx';
import { XButton } from '../interfaces/input.ts';

type InputProps = {
    onChange?(parm?: any): void;
    onKeyDown?(parm?: any): void;
    deleteButton?: boolean;
    deleteButtonOption?: XButton;
    placeholder?: string;
    children?: ReactNode;
    $m_height: string;
    $m_width: string;
    $m_fontSize: string;
    $w_height: string;
    $w_width: string;
    $w_fontSize: string;
    type?: string;
    value?: string;
    disabled?: boolean;
    readonly?: boolean; 
}

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
`;

const DeleteContent = styled.h4<XButton>`
    position: absolute;
    top: ${(props) => props.top};
    bottom: ${(props) => props.bottom};
    left: ${(props) => props.left};
    right: ${(props) => props.right};
    cursor: pointer;
`;

const InputForm = styled.input.attrs<InputProps>(({ type, value, disabled, readonly }) => ({
    type,
    value,
    disabled,
    readOnly: readonly,
}))<InputProps>`
    height: ${(props) => props.$w_height};
    width: ${(props) => props.$w_width};
    border: 5px solid black;
    padding: 10px;
    font-size: ${(props) => props.$w_fontSize};
    margin-bottom: 5px;
    resize: none;
    position: relative;

    @media all and (max-width:430px) {
        height: ${(props) => props.$m_height};
        width: ${(props) => props.$m_width};
        font-size: ${(props) => props.$m_fontSize};
    }
        ${(props) =>
        props.readonly &&
        `
        background-color: #e9ecef;
        cursor: not-allowed;
    `}
`;

const TextArea: React.FC<InputProps> = ({
    onChange,
    onKeyDown,
    type = 'text',
    placeholder,
    children,
    $m_height,
    $m_width,
    $m_fontSize,
    $w_height,
    $w_width,
    $w_fontSize,
    deleteButton,
    deleteButtonOption,
    readonly,
    value
}) => {
    const deleteRef = useRef<HTMLInputElement>(null);
    useKeyboardAvoider();

    return (
        <InputContainer>
            <InputForm
                className="font-normal"
                placeholder={placeholder}
                onChange={onChange}
                ref={deleteRef}
                $m_height={$m_height}
                $m_width={$m_width}
                $m_fontSize={$m_fontSize}
                $w_height={$w_height}
                $w_width={$w_width}
                $w_fontSize={$w_fontSize}
                onKeyDown={onKeyDown}
                type={type}
                readonly={readonly}
                value={value}
            >
                {children}
            </InputForm>
            {deleteButton && (
                <DeleteContent
                    className="font-extrabold"
                    onClick={() => deleteRef.current!.value = ''}
                    top={deleteButtonOption?.top}
                    bottom={deleteButtonOption?.bottom}
                    left={deleteButtonOption?.left}
                    right={deleteButtonOption?.right}
                >
                    X
                </DeleteContent>
            )}
        </InputContainer>
    );
};

export default TextArea;
