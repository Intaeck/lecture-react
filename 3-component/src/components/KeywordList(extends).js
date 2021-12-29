import React from 'react';
import List from './List';
import store from '../Store';

// List.js를 상속 -> 리액트에서는 클래스 상속으로 컴포넌트 재활용하는 것은 권장하지 않음
// 실제 render 처리는 List.js에서 하며 여기서는 li 내부에 렌더링 될 리액트 엘리먼트만 반환한다
export default class KeywordList extends List {
  // 컴포넌트가 마운트 된 후 store에서 데이터를 가져온다
  componentDidMount() {
    const data = store.getKeywordList();
    // 부모인 List.js의 state를 update 처리
    this.setState({ data });
  }

  // List.js 클래스의 추상 메서드인 renderItem을 구현
  renderItem(item, index) {
    // li 내부에 렌더링 될 리액트 엘리먼트를 반환
    return (
      <>
        <span className='number'>{index + 1}</span>
        <span>{item.keyword}</span>
      </>
    );
  }
}