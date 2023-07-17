import React from 'react';
import { Box } from '@mui/material';
å;
const Categories = [
  {
    name: 'all',
    text: '전체보기',
  },
  {
    name: 'business',
    text: '비지니스',
  },
  {
    name: 'entertainment',
    text: '연예',
  },
  {
    name: 'health',
    text: '건강',
  },
  {
    name: 'science',
    text: '과학',
  },
  {
    name: 'sports',
    text: '스포츠',
  },
];

export default function Categories() {
  return (
    <Box
      display="flex"
      padding="1rem"
      width="768px"
      margin="0 auto"
      sx={{
        '@media screen and (max-width: 768px)': {
          width: '100%',
          overflowX: 'auto',
        },
      }}
    >
      {Categories.map((c) => (
        <Box
          sx={{
            cursor: 'pointer',
            whiteSpace: 'pre',
            textDecoration: 'none',
            color: 'inherit',
            paddingBottom: '0.25rem',
            '&:hover': {
              color: '#495057',
            },
            '&+&': {
              marginLeft: '1rem',
            },
          }}
          key={c.name}
        >
          {c.text}
        </Box>
      ))}
    </Box>
  );
}
