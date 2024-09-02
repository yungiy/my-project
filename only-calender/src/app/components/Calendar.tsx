'use client';

import { useEffect, useState } from 'react';
import './Calendar.css';

export default function Calendar() {
  const [dates, setDates] = useState<JSX.Element[]>([]);
  const date = new Date();
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  useEffect(() => {
    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    const prevDates: number[] = [];
    const thisDates: number[] = Array.from({ length: TLDate }, (_, i) => i + 1);
    const nextDates: number[] = [];

    if (PLDay !== 6) {
      for (let i = 0; i < PLDay + 1; i++) {
        prevDates.unshift(PLDate - i);
      }
    }

    for (let i = 1; i < 7 - TLDay; i++) {
      nextDates.push(i);
    }

    const allDates = prevDates.concat(thisDates, nextDates);

    const dateElements = allDates.map((date, index) => (
      <div key={index} className='date'>{date}</div>
    ));

    setDates(dateElements);
  }, [viewYear, viewMonth]);

  return (
    <div className="calendar">
        <div className="header">
            <div className="year-month">{`${viewYear}년 ${viewMonth + 1}월`}</div>
            <div className="nav">
                <button className="nav-btn go-prev">&lt;</button>
                <button className="nav-btn go-today">Today</button>
                <button className="nav-btn go-next">&gt;</button>
            </div>
        </div>
        <div className="main">
            <div className="days">
                <div className="day">일</div>
                <div className="day">월</div>
                <div className="day">화</div>
                <div className="day">수</div>
                <div className="day">목</div>
                <div className="day">금</div>
                <div className="day">토</div>
            </div>
            <div className="dates">
              {dates.map((date)=> date)}
            </div>
        </div>
    </div>
  );
}
