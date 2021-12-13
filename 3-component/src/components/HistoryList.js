import React from 'react';
import List from './List';
import store from '../Store';
import { formatRelativeDate } from '../helpers';

export default class HistoryList extends List {
  // List.js에서 React를 상속했기 때문에 사용가능
  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const data = store.getHistoryList();
    //외부에서 사용하는 것이 아니므로 HistoryList 내부에서만 관리
    this.setState({ data });
  }

  handleClickRemoveHistory(event, keyword) {
    event.stopPropagation();
    store.removeHistory(keyword);
    this.fetch();
  }

  renderItem(item, index) {
    return (
      <>
        <span>{item.keyword}</span>
        <span className='date'>{formatRelativeDate(item.date)}</span>
        <button
          className='btn-remove'
          onClick={(event) =>
            this.handleClickRemoveHistory(event, item.keyword)
          }
        />
      </>
    );
  }
}
