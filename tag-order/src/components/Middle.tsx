import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 35px;
  padding-bottom: 30px;
  font-size: 18px;
  line-height: 1.3;
`;

const Icon = styled.img`
  position: absolute;
  top: -35px;
  left: 20px;
  width: 65px;
  height: 65px;
  border-radius: 10px;
  border: 1px solid gray;
  background-color: white;
  object-fit: contain;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.h1`
  margin: 0%;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 1.5;
`;


export default function Middle() {
  return (
    <Container>
      <Icon src='/image/store.png' alt='logo' />
      <Text>저희 매장에 오신 것을 환영합니다.</Text>
    </Container>
  );
}
