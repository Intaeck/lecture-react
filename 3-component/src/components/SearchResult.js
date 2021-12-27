// 검색결과 state도 외부접근을 허용하기 위해서는 상위부모인 App.js가 가지는 것이 좋다
// SearchResult도 함수 컴포넌트로 작성한다
import React from 'react';

// props를 destructuring
const SearchResult = ({data = []}) => {
  if (data.length <= 0) {
    return (
      <div className='empty-box'>검색 결과가 없습니다</div>
    )
  }

  return (
    <ul className='result'>
      {data.map((item) => {
        return (
          // 가상돔에게 key값을 전달해 줘야한다
          <li key={item.id}>
            <img src={item.imageUrl} alt={item.name} />
            <p>{item.name}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default SearchResult;