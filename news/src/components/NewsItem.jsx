import { Box, Typography, Link } from '@mui/material';
import React from 'react';

export default function NewsItem({ article }) {
  const { title, description, url, urlToImage } = article;

  return (
    <Box margin="10px">
      <Box display="flex">
        {urlToImage && (
          <Link href={url} target="_blank">
            <Box margin="5px" width="160px" height="100px">
              <img src={urlToImage} alt="" width="100%" height="100%" />
            </Box>
          </Link>
        )}
        <Box>
          <Typography variant="h6">
            <Box margin="10px">
              <Link
                href={url}
                target="_blank"
                color="inherit"
                textDecoration="none"
              >
                {title}
              </Link>
            </Box>
          </Typography>
          <Box margin="5px">
            <Typography variant="body2">{description}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
