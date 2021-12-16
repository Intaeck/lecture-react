import React from "react";
import { formatRelativeDate } from '../helpers';

// HistoryList, KeywordList의 render함수에 있는 엘리먼트들을 가져오고, 공통적인 것들을 처리하며
// props를 받아서 처리
const List = ({ data = [], onClick, hasIndex = false, hasDate = false, onRemove }) => {
  const handleClickRemove = (event, keyword) => {
    event.stopPropagation();
    onRemove(keyword);
  }

  return (
    <ul className='list'>
      {data.map((item, index) => (
        <li key={item.id} onClick={() => onClick(item.keyword)}>
          {/*  props로 넘어온 hasIndex가 true 인 경우만 index 출력 - 조건부 렌더링 */}
          {hasIndex && <span className='number'>{index + 1}</span>}
          <span>{item.keyword}</span>

          {hasDate && (
            <span className='date'>{formatRelativeDate(item.date)}</span>
          )}
          {!!onRemove &&
            <button
              className='btn-remove'
              onClick={(event) => handleClickRemove(event, item.keyword)}
            />
          }
        </li>
      ))}
    </ul>
  );
};

export default List;
