import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import axios from 'axios';

export default function NewsList() {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/top-headlines?country=kr&apiKey=6dcef8ea2cc443e5ba666a954b355c73',
        );
        setArticles(response.data.articles);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  // 대기 중이면
  if (loading) {
    return <Box>대기 중</Box>;
  }

  // 아직 articles 값이 설정되어 있지 않으면
  if (!articles) {
    return null;
  }

  // articles 값이 유효하면
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
        <Box>
          {' '}
          <NewsItem key={article.url} article={article} />
        </Box>
      ))}
    </Box>
  );
}
