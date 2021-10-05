const tag = "[Controller]";

export default class Controller {
  constructor(store, { searchFormView, searchResultView }) {
    console.log(tag, "constructor");

    this.store = store;

    this.searchFormView = searchFormView;
    // TODO
    this.searchResultView = searchResultView;

    this.subscribeViewEvents();
  }

  subscribeViewEvents() {
    this.searchFormView
      .on("@submit", (event) => this.search(event.detail.value))
      .on("@reset", () => this.reset());
  }

  search(searchKeyword) {
    console.log(tag, "search", searchKeyword);
    // TODO
    this.store.search(searchKeyword);
    this.render();
  }

  reset() {
    console.log(tag, "reset");
  }

  // Controller가 관리하는 View들을 이용해서 화면에 출력
  render() {
    if (this.store.searchKeyword.length > 0) {
      this.searchResultView.show(this.store.searchResult);
      return;
    }

    this.searchResultView.hide();
  }
}
