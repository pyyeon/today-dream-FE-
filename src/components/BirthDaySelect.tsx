import React, { useState } from 'react';
import '../styles/global.css';
import '../styles/birthday.css';

const Year = () => {
    let years: number[] = [];
    for (let i: number = 2024; i >= 1930; i--) {
        years.push(i);
    }
    return <select className='birthday-year' name='year'>
        {years.map((year: number) => (
            <option key={year} value={year}>{year}</option>
        ))}
    </select>
}

type MonthNum = number;

// 1) onMonthChange 만들어서
const Month: React.FC<{ onMonthChange: (month: MonthNum) => void }> = ({ onMonthChange }) => {
    let months: number[] = [];
    for (let i: number = 1; i <= 12; i++) {
        months.push(i);
    }

    // 3) onMonthChange()에 값을 넣어준다.
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => { // 이벤트 객체에 타입 지정
        onMonthChange(parseInt(e.target.value));
    }

    // 2) select onChange 이벤트를 handleSelect에 위임한다.
    return <select className='birthday-font' name='month' onChange={handleSelect}>
        {months.map((month: number) => (
            <option key={month} value={month}>{month}</option>
        ))}
    </select>
}

type DayProps = {
    month: number
}

const Day: React.FC<DayProps> = ({ month }) => {
    let days: number[] = [];

    const is31DayMonth = [1, 3, 5, 7, 8, 10, 12].includes(month);

    if (is31DayMonth) {
        days = Array.from({ length: 31 }, (_, i) => i + 1);
    } else if (month === 2) {
        // 2월 처리 (윤년 처리 필요 시 추가 가능)
        days = Array.from({ length: 28 }, (_, i) => i + 1);
    } else {
        days = Array.from({ length: 30 }, (_, i) => i + 1);
    }

    return <select className='birthday-font' name='day'>
        {days.map((day: number) => (
            <option key={day} value={day}>{day}</option>
        ))}
    </select>
}

const BirthDaySelect = () => {
    const [selectedMonth, setSelectedMonth] = useState<MonthNum>(1);

    const handleMonthChange = (month: MonthNum) => {
        setSelectedMonth(month);
    }

    return (
        <div id='birthday-container'>
            <span id='birthday-text' className='font-bold'>생년월일을 선택하라냥</span>
            <div id='birthday-select-area'>
                <Year />
                {/* 4) onMonthChange prop을 사용해서 handleMonthChange로 */}
                <Month onMonthChange={handleMonthChange}></Month>
                <Day month={selectedMonth}></Day>
            </div>
        </div>
    );
}

export default BirthDaySelect;