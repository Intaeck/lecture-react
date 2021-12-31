import React from 'react';
import List from './List';
import store from '../Store';
import { formatRelativeDate } from '../helpers';

// 실제 render 처리는 List.js에서 하며 여기서는 li 내부에 렌더링 될 리액트 엘리먼트만 반환한다
export default class HistoryList extends React.Component {
  constructor() {
    super();

    // 내부에서 state로 최근검색어 관리
    this.state = {
      historyList: [],
    }
  }

  // 컴포넌트가 마운트 된 후 store에서 데이터를 가져온다
  componentDidMount() {
    this.fetch();
  }

  fetch() {
    const historyList = store.getHistoryList();
    this.setState({ historyList });
  }

  // x 버튼 클릭 시 처리
  handleClickRemoveHistory(keyword) {
    store.removeHistory(keyword);
    this.fetch();
  }

  render() {
    return (
      <List
        data={this.state.historyList}
        onClick={this.props.onClick}
        //
        hasDate={true}
        onRemove={(keyword) => this.handleClickRemoveHistory(keyword)}
      />
    )
  }
}