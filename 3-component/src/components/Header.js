// jxs문법을 사용하는 경우 React를 import 해야한다
import React from 'react';

// 내부 state가 없는 것들은 함수 컴포넌트로 만든다
// 외부에서 props를 주입 받아서 사용할 수 있다
const Header = (props) => {
  // 리엑트 엘리먼트를 반환한다
  return (
    <header>
      <h2 className='container'>{props.title}</h2>
    </header>
  )
}

export default Header;