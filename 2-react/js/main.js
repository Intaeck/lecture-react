import { formatRelativeDate } from './js/helpers.js';
import store from './js/Store.js';

const TabType = {
  KEYWORD: 'KEYWORD',
  HISTORY: 'HISTORY',
};

const TabLabel = {
  [TabType.KEYWORD]: '추천 검색어',
  [TabType.HISTORY]: '최근 검색어',
};

// Component class 사용
class App extends React.Component {
  constructor() {
    super();

    // state 객체는 Component 내부에서만 접근가능
    this.state = {
      searchKeyword: '',
      searchResult: [],
      submittd: false,
      selectedTab: TabType.KEYWORD,
      keywordList: [],
      historyList: [],
    };
  }

  // DOM에 component가 마운트 완료 시
  componentDidMount() {
    // 추천검색어를 store에서 가져옴
    const keywordList = store.getKeywordList();
    // 최근검색어를 store에서 가져옴
    const historyList = store.getHistoryList();

    this.setState({ keywordList, historyList });
  }

  handleChangeInput(event) {
    // //onChange 이벤트에서 넘어온 input의 입력값을 state에 반영 BUT 자동으로 화면을 다시 render하지는 않음
    // this.state.searchKeyword = event.target.value;
    // //강제로 render를 다시 하도록 처리 BUT 잘 사용하지 않는다
    // this.forceUpdate();

    const searchKeyword = event.target.value;

    if (searchKeyword.length <= 0 && this.state.submittd) {
      return this.handleReset();
    }
    //state의 변화에 따라 스스로 화면을 render하는 방법을 사용한다 => setState
    this.setState({ searchKeyword });
  }

  handleSubmit(event) {
    // form에서 submit 기본기능인 화면 refresh를 막기위함
    event.preventDefault();
    this.search(this.state.searchKeyword);
  }

  search(searchKeyword) {
    const searchResult = store.search(searchKeyword);
    // state는 변경된 state만 기존 state객체에 병합하는 방식을 사용한다
    this.setState({ searchKeyword, searchResult, submittd: true });
  }

  handleReset() {
    // setState는 항상 비동기로 처리되며, setState 이후의 코드에서 state의 변경완료여부를 보장할 수 없음
    // 또한 여러번 호출되더라도 모았다가 한번에 처리하게 됨(성능이유)
    // this.setState( { searchKeyword: '' });

    // update가 완료가 보장된 후에 처리할 수 있는 방식 -- (특별한 case이긴 함)
    // 첫번째 파라메터 : state를 update할 수 있는 콜백함수
    // 두번째 파라메터 : state의 update가 완료된 상태를 전달받는 콜백함수
    this.setState(
      () => {
        return { searchKeyword: '', submittd: false };
      },
      () => {
        console.log('handleReset', this.state.searchKeyword);
      }
    );
  }

  handleClickRemove(event, keyword) {
    // 상위 li의 이벤트로 bubbling을 막음
    event.stopPropagation();

    store.removeHistory(keyword);
    const historyList = store.getHistoryList();
    this.setState({ historyList });
  }

  // React.Component 클래스의 render method를 override -> React Component를 return 함
  render() {
    // React element 변수들
    const searchForm = (
      // form이 제출 시 발생하는 이벤트 처리
      <form
        onSubmit={(event) => this.handleSubmit(event)}
        onReset={() => this.handleReset()}
      >
        <input
          type='text'
          placeholder='검색어를 입력하세요'
          autoFocus
          // state와 input의 value를 연결(binding)
          value={this.state.searchKeyword}
          // onChange 이벤트를 연결
          onChange={(event) => this.handleChangeInput(event)}
        />
        {/* reset button */}
        {/* 조건부 렌더링 : &&연산자 사용 -- &&가 true여야만 뒤의 조건을 실행, false면 무시 */}
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
              // 가상돔에게 key값을 전달해 줘야한다
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

    const keywordList = (
      <ul className='list'>
        {this.state.keywordList.map((item, index) => {
          return (
            <li key={item.id} onClick={() => this.search(item.keyword)}>
              <span className='number'>{index + 1}</span>
              <span>{item.keyword}</span>
            </li>
          );
        })}
      </ul>
    );

    const historyList = (
      <ul className="list">
        {this.state.historyList.map(({ id, keyword, date }) => {
          return (
            <li key={id} onClick={() => this.search(keyword)}>
              <span>{keyword}</span>
              <span className='date'>{formatRelativeDate(date)}</span>
              <button
                className='btn-remove'
                onClick={(event) => this.handleClickRemove(event, keyword)}
              ></button>
            </li>
          );
        })}
      </ul>
    );

    const tabs = (
      <>
        <ul className='tabs'>
          {Object.values(TabType).map((tabType) => {
            return (
              <li
                className={this.state.selectedTab === tabType ? 'active' : ''}
                key={tabType}
                onClick={() => this.setState({ selectedTab: tabType })}
              >
                {TabLabel[tabType]}
              </li>
            );
          })}
        </ul>
        {this.state.selectedTab === TabType.KEYWORD && keywordList}
        {this.state.selectedTab === TabType.HISTORY && historyList}
      </>
    );

    return (
      // 리엑트 엘리먼트는 Root가 하나만 있어야 하므로 <> fragment를 써준다
      <>
        {/* Header */}
        <header>
          <h2 className='container'>검색</h2>
        </header>

        {/* Container */}
        <div className='container'>
          {searchForm}

          {/* content */}
          <div className='content'>
            {/* 검색이 된 경우에는 검색결과, 아니면 tab 렌더링 처리 */}
            {this.state.submittd ? searchResult : tabs}
          </div>
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
