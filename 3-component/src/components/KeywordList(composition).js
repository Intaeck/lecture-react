import React from 'react';
import List from './List';
import store from '../Store';

// 조합 방식 (컴포넌트 재활용)
export default class KeywordList extends React.Component {
  constructor() {
    super();

    // 추천검색어를 내부 state로 관리
    this.state = {
      keywordList: [],
    }
  }
  // 컴포넌트가 마운트 된 후 store에서 데이터를 가져온다
  componentDidMount() {
    const keywordList = store.getKeywordList();
    this.setState({ keywordList });
  }

  render() {
    return (
      <List
        data={this.state.keywordList}
        // App.js에서 받은 props인 search(keyword) 콜백함수 등록
        onClick={this.props.onClick}
        // 리엑트 엘리먼트를 반환해서 사용하는 측에서 UI를 렌더링하는 용도로 사용하는 것을 '렌더 프롭스'라고 한다
        renderItem={(item, index) => {
          return (
            <>
              <span className='number'>{index + 1}</span>
              <span>{item.keyword}</span>
            </>
          );
        }}
      />
    );
  }
}