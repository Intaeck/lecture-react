import React from 'react';
import Header from './components/Header';

export default class App extends React.Component {
  render() {
    // return <Header />;
    // 어트리뷰트를 props로 넘긴다
    return <Header title="검색"/>;
  }
}