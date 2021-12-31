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
  handleClickRemoveHistory(event, keyword) {
    event.stopPropagation();
    store.removeHistory(keyword);
    this.fetch();
  }

  render() {
    return (
      <List
        data={this.state.historyList}
        onClick={this.props.onClick}
        // List.js의 props로 넘길 renderItem을 구현
        // li 내부에 렌더링 될 리액트 엘리먼트를 반환 (List.js는 ul, li 태그를 렌더링)
        renderItem={(item) => {
          return (
            <>
              <span>{item.keyword}</span>
              <span className='date'>{formatRelativeDate(item.date)}</span>
              <button
                className='btn-remove'
                // x 버튼 클릭 이벤트 처리
                onClick={(event) =>
                  this.handleClickRemoveHistory(event, item.keyword)
                }
              ></button>
            </>
          );
        }}
      />
    )
  }
}