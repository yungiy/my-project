import React from 'react';
import GlobalStyles from './style/Global';
import Banner from './components/Banner';
import Middle from './components/Middle';

function App() {
  return (
    <>
      <GlobalStyles />
      <Banner />
      <Middle />
      <div>
        <h1>모바일 웹 페이지</h1>
        <p>모든 기기에서 모바일 뷰를 제공합니다.</p>
      </div>
    </>
  );
}

export default App;
