'use client';

import { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import DayItem from './DayItem';

export default function Calendar() {
  const date = new Date();
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

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

  return (
    <Container
      sx={{
        width: '500px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant='h5'>{`${viewYear}년 ${
          viewMonth + 1
        }월`}</Typography>
        <Box sx={{ display: 'flex', border: '1px solid', borderRadius: '8px' }}>
          <Button>&lt;</Button>
          <Button>Today</Button>
          <Button>&gt;</Button>
        </Box>
      </Box>
      <Box>
        <Box sx={{ display: 'flex', margin: '25px 0 10px' }}>
          <Grid sx={{ width: 'calc(100% / 7)', textAlign: 'center' }}>일</Grid>
          <Grid sx={{ width: 'calc(100% / 7)', textAlign: 'center' }}>월</Grid>
          <Grid sx={{ width: 'calc(100% / 7)', textAlign: 'center' }}>화</Grid>
          <Grid sx={{ width: 'calc(100% / 7)', textAlign: 'center' }}>수</Grid>
          <Grid sx={{ width: 'calc(100% / 7)', textAlign: 'center' }}>목</Grid>
          <Grid sx={{ width: 'calc(100% / 7)', textAlign: 'center' }}>금</Grid>
          <Grid sx={{ width: 'calc(100% / 7)', textAlign: 'center' }}>토</Grid>
        </Box>
        <Grid
          sx={{
            display: 'flex',
            flexFlow: 'row wrap',
            height: '500px',
            borderTop: '1px solid',
            borderRight: '1px solid',
          }}
        >
          <DayItem />
        </Grid>
      </Box>
    </Container>
  );
}
