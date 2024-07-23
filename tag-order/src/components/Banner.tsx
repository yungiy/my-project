import React from 'react';
import styled from 'styled-components';

const BannerImage = styled.img`
  display: block; 
  max-height: 140px;
  width: 100%;
  object-fit: cover;
`;

export default function Banner() {
  return <BannerImage src='image/banner.jpg' alt='banner' />;
}

