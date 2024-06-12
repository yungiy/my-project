import React from 'react';

export default function SearchBar() {
  return (
    <div className='flex max-w-6xl items-center rounded-lg p-8 w-full'>
      <div className='flex items-center bg-white rounded-lg shadow-sm'>
        <input
          type='text'
          placeholder='책을 검색해보세요'
          className='flex-grow px-4 py-2 text-gray-700 rounded-l-lg focus:outline-none'
        />
        <select className='border-l border-gray-300 bg-white text-gray-700 py-2 px-4 focus:outline-none'>
          <option value='title'>제목</option>
          <option value='writer'>지은이</option>
          <option value='total'>총류</option>
          <option value='philosophy'>철학</option>
          <option value='religion'>종교</option>
          <option value='social-science'>사회과학</option>
          <option value='pure-science'>순수과학</option>
          <option value='descriptive-science'>기술과학</option>
          <option value='art'>예술</option>
          <option value='language'>언어</option>
          <option value='literature'>문학</option>
          <option value='history'>역사</option>
        </select>
        <button className='bg-yellow-400 text-yellow-700 px-4 py-2 rounded-r-lg focus:outline-none'>
          검색
        </button>
      </div>
    </div>
  );
}
