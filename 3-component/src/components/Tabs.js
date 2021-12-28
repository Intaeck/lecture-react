import React from 'react';

export const TabType = {
  KEYWORD: 'KEYWORD',
  HISTORY: 'HISTORY',
};

export const TabLabel = {
  [TabType.KEYWORD]: '추천 검색어',
  [TabType.HISTORY]: '최근 검색어',
};

// 내부 state 관리가 없고, 부모 App.js에서 Tabs의 state를 관리하고 props로 주입 받으므로 함수 컴포넌트로 작성
const Tabs = ({ selectedTab, onChange }) => {
  return (
    <>
      <ul className='tabs'>
        {Object.values(TabType).map((tabType) => {
          return (
            <li
              className={selectedTab === tabType ? 'active' : ''}
              key={tabType}
              // props로 받은 onChange 콜백함수 실행
              onClick={() => onChange(tabType)}
            >
              {TabLabel[tabType]}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Tabs;