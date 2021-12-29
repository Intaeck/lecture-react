import React from 'react';
import store from './Store';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import SearchResult from './components/SearchResult';
import Tabs, { TabType, TabLabel } from './components/Tabs';
import KeywordList from './components/KeywordList';
import HistoryList from './components/HistoryList';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      // SearchForm.js에 있던 state인 searchKeyword를 App.js로 끌어올림 (SearchForm.js는 class -> 함수 컴포넌트로 변경)
      searchKeyword: '',
      // 검색결과
      searchResult: [],
      submitted: false,
      // 탭
      selectedTab: TabType.KEYWORD,
    };
  }

  // SearchForm /> onChange props의 callback함수
  handleChangeInput(searchKeyword) {
    if (searchKeyword.length <= 0) {
      this.handleReset();
    }
    this.setState({ searchKeyword });
  }

  // <SearchForm /> onSubmit props의 callback함수
  search(searchKeyword) {
    console.log('App.js: search', searchKeyword);
    const searchResult = store.search(searchKeyword);
    // 검색결과 및 검색을 했다는 표시인 submitted: true로 set
    this.setState({ searchKeyword, searchResult, submitted: true });
  }

  // <SearchForm /> onReset props의 callback함수
  handleReset() {
    console.log('TODO: handleReset');
    this.setState({ searchKeyword: '', searchResult: [], submitted: false });
  }

  // React.Component 클래스의 render method를 override -> React Component를 return 함
  render() {
    const { searchKeyword, searchResult, submitted, selectedTab } = this.state;
    return (
      <>
        {/* Header (함수 컴포넌트 - props.title 전달) */}
        <Header title='검색' />

        {/* Container */}
        <div className='container'>
          {/* SearchForm */}
          {/* props로 onSubmit, onReset, onChange 콜백함수를 전달한다 -> SearchForm.js에서 실행해준다 */}
          <SearchForm
            value={searchKeyword}
            onChange={(value) => this.handleChangeInput(value)}
            onSubmit={(searchKeyword) => {
              this.search(searchKeyword);
            }}
            onReset={() => this.handleReset()}
          />

          {/* SearchResult */}
          <div className='content'>
            {submitted ? (
              <SearchResult data={searchResult} />
            ) : (
              <>
                <Tabs
                  selectedTab={selectedTab}
                  // props로 setState를 실행하는 콜백함수를 전달한다 -> Tabs.js에서 실행해준다
                  onChange={(selectedTab) => this.setState({ selectedTab })}
                />
                {/* 추천 검색어, 최근 검색어 */}
                {selectedTab === TabType.KEYWORD && (
                  // 실제 KeywordList, HistoryList의 render 처리는 List.js에서 한다
                  // props로 넘겨주는 onClick 콜백함수는 List.js의 li태그의 이벤트임
                  <KeywordList onClick={(keyword) => this.search(keyword)} />
                )}
                {selectedTab === TabType.HISTORY && (
                  <HistoryList onClick={(keyword) => this.search(keyword)} />
                )}
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}
