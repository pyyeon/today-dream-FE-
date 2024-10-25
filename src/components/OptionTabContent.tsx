import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import '../styles/global.css';

type OptionContentProps = {
    children: ReactNode;
    onClick?(parm: any): void;
}

interface OptionContentFormProps {
    isClicked: boolean;
}

export const OptionContentForm = styled.div<OptionContentFormProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
    width: 100%;
    height: 70px;
    background-color: ${(props) => (props.isClicked ? '#C1C1C1' : 'white')};
    user-select: none;
    cursor: pointer;
`;

const OptionContent: React.FC<OptionContentProps> = ({ children, onClick }) => {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const mouseDownHandler = () => {
        setIsClicked(true);
    };

    const mouseUpHandler = () => {
        setIsClicked(false);
    };

    const touchStartHandler = () => {
        setIsClicked(true);
    };

    const touchEndHandler = () => {
        setIsClicked(false);
    };

    return (
        <OptionContentForm
            className='font-bold'
            isClicked={isClicked}
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
            onMouseLeave={mouseUpHandler}
            onTouchStart={touchStartHandler} // Mobile: Touch start
            onTouchEnd={touchEndHandler}     // Mobile: Touch end
            onTouchCancel={touchEndHandler}  // Mobile: Touch cancelled
            onClick={onClick}
        >
            {children}
        </OptionContentForm>
    );
}

export default OptionContent;