'use client';

import { useEffect, useState } from 'react';
import './Calendar.css';
import { Box, Button, Container, Grid, Grid2, Typography } from '@mui/material';

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
      <Grid key={index} className='date'>{date}</Grid>
    ));

    setDates(dateElements);
  }, [viewYear, viewMonth]);

  return (
    <Container className="calendar">
        <Box className="header">
            <Typography className="year-month">{`${viewYear}년 ${viewMonth + 1}월`}</Typography>
            <Box className="nav">
                <Button className="nav-btn go-prev">&lt;</Button>
                <Button className="nav-btn go-today">Today</Button>
                <Button className="nav-btn go-next">&gt;</Button>
            </Box>
        </Box>
        <Box className="main">
            <Box className="days">
                <Grid className="day">일</Grid>
                <Grid className="day">월</Grid>
                <Grid className="day">화</Grid>
                <Grid className="day">수</Grid>
                <Grid className="day">목</Grid>
                <Grid className="day">금</Grid>
                <Grid className="day">토</Grid>
            </Box>
            <Grid className="dates">
              {dates.map((date)=> date)}
            </Grid>
        </Box>
    </Container>
  );
}
