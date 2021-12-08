import React from "react";
import Header from "./components/Header.js";
import SearchForm from './components/SearchForm.js';

export default class App extends React.Component {
  search(searchKeyword) {
    console.log('TODO: search', searchKeyword);
  }

  handleReset() {
    console.log('TODO: handleReset');
  }

  render() {
    return (
      <>
        <Header title='검색' />
        <div className='container'>
          {/* 어트리뷰트를 콜백함수(onSubmit)로 props에 넘겨준다 */}
          <SearchForm
            onSubmit={(searchKeyword) => this.search(searchKeyword)}
            onReset={() => this.handleReset()}
          />
        </div>
      </>
    );
  }
}
