import { delegate, qs, qsAll } from "../helpers.js";
import View from "./View.js";

const tag = "[TabView]";

export const TabType = {
  KEYWORD: "KEYWORD",
  HISTORY: "HISTORY",
};

const TabLabel = {
  [TabType.KEYWORD]: "추천 검색어",
  [TabType.HISTORY]: "최근 검색어",
};

export default class TabView extends View {
  constructor() {
    console.log(tag, 'constructor');

    super(qs('#tab-view'));

    this.template = new Template();
    // TODO - 클릭이벤트
    this.bindEvents();
  }

  bindEvents() {
    // 이벤트를 li에게 위임
    delegate(this.element, 'click', 'li', event => this.handleClick(event));
  }

  // click 이벤트 발생 시 @change 이벤트를 발행하는 콜백함수를 eventlistener에 등록
  handleClick(event) {
    console.log(tag, event.target);
    const value = event.target.dataset.tab;
    this.emit('@change', { value });
  }

  // 클릭한 tab에 따라서 active class 변경
  show(selectedTab) {
    this.element.innerHTML = this.template.getTabList();
    qsAll('li', this.element).forEach((li) => {
      li.className = li.dataset.tab == selectedTab ? 'active' : '';
    });

    super.show();
  }
}

class Template {
  getTabList() {
    return `
      <ul class="tabs">
        ${Object.values(TabType)
          .map((tabType) => ({ tabType, tabLabel: TabLabel[tabType] }))
          .map(this._getTab)
          .join("")}
      </ul>
    `;
  }

  _getTab({ tabType, tabLabel }) {
    return `
      <li data-tab="${tabType}">${tabLabel}</li>
     `;
  }
}
