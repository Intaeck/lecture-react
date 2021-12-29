import React from 'react';

// 조합 방식 (컴포넌트 재활용)
// 함수 컴포넌트로 만든다 -> 리액트 엘리먼트( li 태그)를 반환한다
// 외부에서 상태(data, onClick/renderItem 함수)를 props로 받는다
const List = ({ data = [], onClick, renderItem }) => {
  return (
    <ul className='list'>
      {data.map((item, index) => {
        // 리액트 엘리먼트 반환
        return (
          // KeywordList, HistoryList에서 props로 받은 콜백함수 onClick 실행
          <li key={item.id} onClick={() => onClick(item.keyword)}>
            {/* 외부에서 리액트 엘리먼트를 반환할 수 있는 함수를 props로 전달 받는다 */}
            {renderItem(item, index)}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
