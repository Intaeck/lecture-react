import React from 'react';
import { formatRelativeDate } from '../helpers';

// 특수화 방식 (컴포넌트 재활용) -> 내부에서 조건부 렌더링을 할 수 있도록 props를 외부에서 받아서 처리한다
// 함수 컴포넌트로 만든다 -> 리액트 엘리먼트(ul, li 태그)를 반환한다
// 외부에서 상태(data, onClick 함수, KeywordList와 HistoryList를 구분할 boolean값:
// KeywordList는 index가 있고 HistoryList는 index가 없다), hasDate는 반대이고
// X버튼의 이벤트핸들러인 콜백함수(onRemove)를 props로 받는다
const List = ({
  data = [],
  onClick,
  hasIndex = false,
  hasDate = false,
  onRemove,
}) => {
  const handleClickRemoveHistory = (event, keyword) => {
    event.stopPropagation();
    onRemove(keyword);
  };

  // props에 따라서 조건부 렌더링 처리
  return (
    <ul className='list'>
      {data.map((item, index) => {
        // 리액트 엘리먼트 반환
        return (
          // KeywordList, HistoryList에서 props로 받은 콜백함수 onClick 실행
          <li key={item.id} onClick={() => onClick(item.keyword)}>
            {/* hasIndex에 따른 조건부 렌더링으로 KeywordList와 HistoryList를 다르게 렌더링 처리 */}
            {hasIndex && <span className='number'>{index + 1}</span>}
            <span>{item.keyword}</span>
            {/* hasDate가 있는 경우에만 날짜를 출력하도록 처리 */}
            {hasDate && (
              <span className='date'>{formatRelativeDate(item.date)}</span>
            )}
            {/* onRemove 콜백함수에 따른 조건부 렌더링 */}
            {!!onRemove && (
              <button
                className='btn-remove'
                // x 버튼 클릭 이벤트 처리
                onClick={(event) =>
                  handleClickRemoveHistory(event, item.keyword)
                }
              ></button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
