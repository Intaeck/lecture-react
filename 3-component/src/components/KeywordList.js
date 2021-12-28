import React from 'react';
import List from './List';
import store from '../Store';

// List.js를 상속
export default class KeywordList extends List {
  // 컴포넌트가 마운트 된 후 store에서 데이터를 가져온다
  componentDidMount() {
    const data = store.getKeywordList();
    // List.js의 state를 update 처리
    this.setState({ data });
  }

  // List.js 클래스의 추상 메서드인 renderItem을 구현
  renderItem(item, index) {
    // 리액트 엘리먼트를 반환
    return (
      <>
        <span className='number'>{index + 1}</span>
        <span>{item.keyword}</span>
      </>
    );
  }
}