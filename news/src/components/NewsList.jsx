import { Box } from '@mui/material';
import React from 'react';
import usePromise from '../lib/usePromise';
import NewsItem from './NewsItem';
import axios from 'axios';

export default function NewsList({ category }) {
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=0a8c4202385d4ec1bb93b7e277b3c51f`,
    );
  }, [category]);
  // 대기 중이면
  if (loading) {
    return <Box>대기 중</Box>;
  }

  // 아직 response 값이 설정되지 않았을 때
  if (!response) {
    return null;
  }

  if (error) {
    return <Box>에러 발생</Box>;
  }

  // response 값이 유효할 때
  const { articles } = response.data;
  return (
    <Box
      boxSizing="border-box"
      paddingBottom="3rem"
      width="768px"
      margin="0 auto"
      marginTop="2rem"
      sx={{
        '@media screen and (max-width: 768px)': {
          width: '100%',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        },
      }}
    >
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </Box>
  );
}
