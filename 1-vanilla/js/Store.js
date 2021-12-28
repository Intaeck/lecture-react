import { createNextId } from './helpers.js';
import { TabType } from './views/TabView.js';

const tag = "[store]";

export default class Store {
  constructor(storage) {
    console.log(tag);
    if (!storage) throw 'no storage';

    this.storage = storage;

    //검색어
    this.searchKeyword = '';
    //검색결과
    this.searchResult = [];
    //탭 정보
    this.selectedTab = TabType.KEYWORD;
  }

  //storage.productData를 keyword를 포함하는 것을 검색
  search(keyword) {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter((product) =>
      product.name.includes(keyword)
    );

    //검색이력에 추가
    this.addHistory(keyword);
  }

  //추천검색어 목록을 storage에서 찾아서 반환
  getKeywordList() {
    return this.storage.keywordData;
  }

  //최근검색어 목록
  getHistoryList() {
    return this.storage.historyData.sort(this._sortHistory);
  }

  _sortHistory(history1, history2) {
    return history2.date > history1.date ? 1 : -1;
  }

  //입력받은 keyword를 삭제하고 다시 배열을 만듬
  removeHistory(keyword) {
    this.storage.historyData = this.storage.historyData.filter(
      (history) => history.keyword !== keyword
    );
  }

  addHistory(keyword) {
    keyword = keyword.trim();
    if (!keyword) { return }

    //historyData에 있는지 확인 후 있으면 삭제
    const hasHistory = this.storage.historyData.some(
      (history) => history.keyword === keyword
    );
    if (hasHistory) {
      this.removeHistory(keyword)
    }

    const id = createNextId(this.storage.historyData);
    const date = new Date();
    //historyData에 push 후 sort 처리
    this.storage.historyData.push({ id, keyword, date });
    this.storage.historyData = this.storage.historyData.sort(this._sortHistory);
  }
}
