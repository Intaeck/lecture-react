import React from "react";
import store from "../Store.js";
import List from "./List.js";

// export default class KeywordList extends List {
export default class KeywordList extends React.Component {
  constructor() {
    super();

    // state를 App이 아닌 여기서 관리
    this.state = {
      keywordList: [],
    }
  }

  componentDidMount() {
    const keywordList = store.getKeywordList();
    this.setState({ keywordList });
  }

  render() {
    return (
      // List.js(컴포넌트)를 조합해서 사용함
      <List
        data={this.state.keywordList}
        // App.js에서 props로 받은 onClick 콜백함수를 전달
        onClick={this.props.onClick}
        // render props라고 함
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

  // renderItem(item, index) {
  //   return (
  //     <>
  //       <span className='number'>{index + 1}</span>
  //       <span>{item.keyword}</span>
  //     </>
  //   );
  // }
}
