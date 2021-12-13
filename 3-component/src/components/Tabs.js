import React from 'react';

export const TabType = {
  KEYWORD: 'KEYWORD',
  HISTORY: 'HISTORY',
};

export const TabLabel = {
  [TabType.KEYWORD]: '추천 검색어',
  [TabType.HISTORY]: '최근 검색어',
};

// props => selectedTab, onChange callback 함수
const Tabs = ({ selectedTab, onChange }) => {

  return (
    <>
      <ul className='tabs'>
        {Object.values(TabType).map((tabType) => (
          <li
            key={tabType}
            className={selectedTab === tabType ? 'active' : ''}
            // state를 관리하지 않는 함수형 컴포넌트이므로 props로 받은 
            // onChange 콜백함수를 실행하여 부모에게 상태를 전달한다
            onClick={() => onChange(tabType)}
          >
            {TabLabel[tabType]}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Tabs;