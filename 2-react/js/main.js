//Store.js
import store from './js/Store.js';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyword: '',
      searchResult: [],
      submitted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('TODO: handleSubmit', this.state.searchKeyword);
    //상품 검색
    this.search(this.state.searchKeyword);
  }

  search(searchKeyword) {
    //
    const searchResult = store.search(searchKeyword);
    //검색결과를 state에 반영 - 변경된 필드만 기존 state 객체에 병합되는 방식임
    this.setState({ searchResult, submitted: true });
  }

  handleReset() {
    console.log('TODO: handleResset');
    this.setState({ searchKeyword: '' });
  }

  handleChangeInput(event) {
    const searchKeyword = event.target.value;
    this.setState({ searchKeyword });
  }

  render() {
    const searchForm = (
      <form
        onSubmit={(event) => this.handleSubmit(event)}
        onReset={() => this.handleReset()}
      >
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

    const searchResult =
      this.state.searchResult.length > 0 ? (
        <ul className='result'>
          {this.state.searchResult.map((item) => {
            return (
              // 엘리먼트에 고유의 key값을 줌으로서 가상돔 비교복잡도를 줄여준다
              <li key={item.id}>
                <img src={item.imageUrl} alt={item.name} />
                <p>{item.name}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className='empty-box'>검색 결과가 없습니다</div>
      );

    return (
      <>
        <header>
          <h2 className='container'>검색</h2>
        </header>
        <div className='container'>
          {searchForm}
          <div className='content'>{this.state.submitted && searchResult}</div>
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
