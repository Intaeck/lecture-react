import { TabType } from './views/TabView.js';

const tag = '[Controller]';

export default class Controller {
  constructor(
    store,
    {
      searchFormView,
      searchResultView,
      tabView,
      keywordListView,
      historyListView,
    }
  ) {
    console.log(tag);
    this.store = store;

    // Views
    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
    this.tabView = tabView;
    this.keywordListView = keywordListView;
    this.historyListView = historyListView;

    // View들의 event 수신
    this.subscribeViewEvents();
    //화면 렌더링
    this.render();
  }

  subscribeViewEvents() {
    // 검색어 입력 후 submit 이벤트가 발생되었을 시
    this.searchFormView
      .on('@submit', (event) => this.search(event.detail.value))
      // event chaining : searchFormView의 reset버튼 이벤트 수신
      .on('@reset', () => this.reset());

    //tabView 이벤트 수신 -> tab 변경
    this.tabView.on('@change', (event) => this.changeTab(event.detail.value));
    //KeywordListView 이벤트 수신 -> search함수 호출
    this.keywordListView.on('@click', (event) =>
      this.search(event.detail.value)
    );
    //historyListView 이벤트 수신 -> search함수 호출
    this.historyListView
      .on(
        '@click',
        (event) => this.search(event.detail.value)
        //삭제버튼 이벤트 수신
      )
      .on('@remove', (event) => this.removeHistory(event.detail.value));
  }

  search(searchKeyword) {
    console.log(tag, searchKeyword);
    this.store.search(searchKeyword);
    this.render();
  }

  reset() {
    console.log(tag, 'reset');
    //store의 변수들을 초기화 후에 다시 화면 render처리
    this.store.searchKeyword = '';
    this.store.searchResult = '';
    this.render();
  }

  changeTab(tab) {
    console.log(tag, 'changeTab', tab);
    this.store.selectedTab = tab;
    this.render();
  }

  removeHistory(keyword) {
    this.store.removeHistory(keyword);
    this.render();
  }

  //Controller가 관리하고 있는 View들을 이용해서 화면에 출력
  render() {
    //검색어가 있는 경우(store.search 메서드는 키워드와 결과를 다 가지고 있음) 검색결과 View를 보여줌
    if (this.store.searchKeyword.length > 0) {
      return this.renderSearchResult();
    }

    //기본 화면
    //selectedTab = store에 설정된 기본설정인 KEYWORD를 넘겨줌
    this.tabView.show(this.store.selectedTab);
    //선택된 tab에 따라서 추천검색어 or 최근검색어를 보여줌
    if (this.store.selectedTab === TabType.KEYWORD) {
      this.keywordListView.show(this.store.getKeywordList());
      this.historyListView.hide();
    } else if (this.store.selectedTab === TabType.HISTORY) {
      this.keywordListView.hide();
      this.historyListView.show(this.store.getHistoryList());
    } else {
      throw '사용할 수 없는 탭 입니다';
    }
    this.searchResultView.hide();
  }

  //검색결과 render
  renderSearchResult() {
    this.tabView.hide();
    this.keywordListView.hide();
    this.historyListView.hide();
    //검색폼이나 추천검색어를 보여줌
    this.searchFormView.show(this.store.searchKeyword);
    this.searchResultView.show(this.store.searchResult);
  }
}
