class App extends React.Component {
  //state는 Component 내부에서만 접근 가능
  constructor() {
    super();

    //state = 상태관리를 위한 내부변수
    this.state = {
      // 입력창
      searchKeyword: '',
    }
  }

  handleChangeInput(event) {
    //state가 변경되었다고 해서 render 메서드가 자동으로 호출되지는 않는다
    //다시 화면을 그리기 위해서는 forceUpdate()를 호출해야한다
    //그러나 view와 controller의 역할을 동시에 하는 이런 코드는 잘 사용되지 않는다
    // this.state.searchKeyword = event.target.value;
    // this.forceUpdate();

    //state의 변화를 감지하고 자동으로 render하기 위해서는 setState메서드를 사용한다
    //class가 제공하는 setState메서드를 통해서만 state를 변경해야한다
    this.setState({
      searchKeyword: event.target.value,
    });
  }

  //UI element를 반환
  render() {
    return (
      <>
        <header>
          <h2 className='container'>검색</h2>
        </header>
        <div className='container'>
          <form>
            {/* JSX문법으로 state와 onChange이벤트를 연결 */}
            <input
              type='text'
              placeholder='검색어를 입력하세요'
              autoFocus
              value={this.state.searchKeyword}
              onChange={event => this.handleChangeInput(event)}
            />
            
            <button type='reset' className='btn-reset'></button>
          </form>
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
