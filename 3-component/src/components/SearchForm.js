import React from 'react';

export default class SearchForm extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyword: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('SearchForm : props: ', this.props.onSubmit);
    // App.js에서 props로 받은 어트리뷰트인 onSubmit 콜백함수를 실행하여 부모인 App.js에게 넘겨준다
    this.props.onSubmit(this.state.searchKeyword);
  }

  handleChangeInput(event) {
    const searchKeyword = event.target.value;

    if (searchKeyword.length <= 0) {
      this.handleReset();
    }
    this.setState({ searchKeyword });
  }

  handleReset() {
    // 외부(부모)로 위임
    this.props.onReset();
  }

  render() {
    return (
      <form onSubmit={event => this.handleSubmit(event)}
            onReset={() => this.handleReset()}>
        <input
          type='text'
          placeholder='검색어를 입력하세요'
          autoFocus
          value={this.state.searchKeyword}
          onChange={(event) => this.handleChangeInput(event)}
        />
        {this.state.searchKeyword.length > 0 && (
          <button type='reset' className='btn-reset'></button>
        )}
      </form>
    );
  }
}
