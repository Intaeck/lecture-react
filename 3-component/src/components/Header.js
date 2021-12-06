// jSX문법을 사용하기 위해서는 react를 import 해야한다
import React from 'react';

//함수형 컴포넌트 
// -> 리액트 엘리먼트를 반환하며, state 관리 할 필요가 없는 엘리먼트에 사용한다
// -> props를 주면 유동적인 값을 줄 수 있으며 state의 역할을 한다
const Header = (props) => {
  return (
    <header>
      {/* <h2 className="container">검색</h2> */}
      <h2 className='container'>{props.title}</h2>
    </header>
  );
}

//모듈로 등록한다
export default Header;