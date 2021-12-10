import React from 'react';
import Header from './components/Header.js';
import SearchForm from './components/SearchForm.js';
import SearchResult from './components/SearchResult.js';
import store from './Store.js';

export default class App extends React.Component {
  constructor() {
    super();
    // state 끌어올리기 -> SearchForm에 있던 searchKeyword를 App에서 관리
    this.state = { searchKeyword: '', searchResult: [], submitted: false };
  }

  search(searchKeyword) {
    console.log('TODO: search', searchKeyword);
    const searchResult = store.search(searchKeyword);

    this.setState({
      searchResult,
      submitted: true,
    });
  }

  handleReset() {
    console.log('TODO: reset');
    // 초기화 처리
    this.setState({
      searchKeyword: '',
      submitted: false,
      searchResult: [],
    })
  }

  handleChangeInput(searchKeyword) {
    if (searchKeyword.length <= 0) {
      this.handleReset();
    }
    this.setState({ searchKeyword });
  }

  render() {
    const { searchKeyword, submitted, searchResult } = this.state;

    return (
      <>
        <Header title='검색' />
        <div className='container'>
          <SearchForm
            // 하단의 value 및 콜백함수들은 SearchForm에서 props로 접근이 가능하다
            value={this.state.searchKeyword}
            // 변경된 value가 넘어오면 처리하는 함수 -> state 변경처리
            onChange={(value) => this.handleChangeInput(value)}
            onSubmit={() => this.search(searchKeyword)}
            onReset={() => this.handleReset()}
          />
          {/* 검색결과 */}
          <div className="content">
            {submitted && <SearchResult data={searchResult} />}
          </div>
        </div>
      </>
    );
  }
}
