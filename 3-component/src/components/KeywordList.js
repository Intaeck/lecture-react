import React from 'react';
import List from './List';
import store from '../Store';

export default class KeywordList extends List {
  // List.js에서 React를 상속했기 때문에 사용가능
  componentDidMount() {
    const data = store.getKeywordList();
    //외부에서 사용하는 것이 아니므로 KeywordList 내부에서만 관리
    this.setState({ data });
  }

  renderItem(item, index) {
    return (
      <>
        <span className='number'>{index + 1}</span>
        <span>{item.keyword}</span>
      </>
    );
  }
}
