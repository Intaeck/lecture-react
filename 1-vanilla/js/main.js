import Controller from "./Controller.js";
import Store from "./Store.js";
import storage from "./storage.js";
import SearchFormView from './views/SearchFormView.js';
import SearchResultView from './views/SearchResultView.js';
import TabView from './views/TabView.js';
import KeywordListView from './views/KeywordListView.js';
import HistoryListView from './views/HistoryListView.js';

const tag = '[main]';
document.addEventListener("DOMContentLoaded", main);

function main() {
  console.log(tag);
  //Model 생성
  const store = new Store(storage);

  //View 생성
  const views = {
    // TODO
    searchFormView: new SearchFormView(),
    searchResultView: new SearchResultView(),
    tabView: new TabView(),
    keywordListView: new KeywordListView(),
    historyListView: new HistoryListView(),
  };

  //Controller 생성
  new Controller(store, views);
}
