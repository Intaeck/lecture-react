class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyword: "",
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("TODO: handleSubmit", this.state.searchKeyword);
  }

  handleReset() {
    // //state를 변경하기 위해 setState() 사용
    // //setState는 항상 "비동기"로 사용되므로 하단의 콘솔로그에는 state값이 남아있음
    // this.setState({ searchKeyword: '' });
    // // 서버로 전송되지 않기 때문에 event.preventDefault() 불필요
    // console.log('TODO: handleReset', this.state.searchKeyword);

    // setState가 완료된 시점을 찾는 방법이 있음
    // 첫번째 인자로 state를 변경할 function을 넘기고, 
    // 두번째 인자로 state변경이 완료 후 실행될 callback함수를 넘김
    this.setState(() => {
      return { searchKeyword: ''}
    }, () => {
      console.log('TODO: handleReset', this.state.searchKeyword);
    });
  }

  handleChangeInput(event) {
    const searchKeyword = event.target.value;

    if (searchKeyword.length <= 0) {
      return this.handleReset();
    }

    this.setState({ searchKeyword });
  }

  render() {
    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          <form
            onSubmit={(event) => this.handleSubmit(event)}
            // button type="reset"이 눌러졌을 때 onReset 함수 실행
            onReset={() => this.handleReset()}
          >
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              autoFocus
              value={this.state.searchKeyword}
              onChange={(event) => this.handleChangeInput(event)}
            />
            {this.state.searchKeyword.length > 0 && (
              <button type="reset" className="btn-reset"></button>
            )}
          </form>
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
