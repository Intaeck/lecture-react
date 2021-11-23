class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyword: "",
    };
  }

  handleChangeInput(event) {
    const searchKeyword = event.target.value;
    this.setState({ searchKeyword });
  }

  render() {
    //조건부 런더링 중 엘리먼트 변수를 사용하는 방식
    // let resetButton = null;
    // if (this.state.searchKeyword.length > 0) {
    //   resetButton = <button type='reset' className='btn-reset'></button>;
    // }

    return (
      <>
        <header>
          <h2 className='container'>검색</h2>
        </header>
        <div className='container'>
          <form>
            <input
              type='text'
              placeholder='검색어를 입력하세요'
              autoFocus
              value={this.state.searchKeyword}
              onChange={(event) => this.handleChangeInput(event)}
            />
            {/* React에서 null을 출력하면 브라우저에 아무것도 출력하지 않는다 */}
            {/* {resetButton} */}

            {/* 조건부 런더링 중 삼항연산자를 사용하는 방식 */}
            {this.state.searchKeyword.length > 0 ? (
              <button type='reset' className='btn-reset'></button>
            ) : null}

            {/* 조건부 런더링 중 &&연산자를 사용하는 방식 */}
            {/* {this.state.searchKeyword.length > 0 && (
              <button type='reset' className='btn-reset'></button>
            )} */}
          </form>
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
