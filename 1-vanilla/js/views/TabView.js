import { delegate, qs, qsAll } from '../helpers.js';
import View from './View.js';

const tag = '[TabView]';
export const TabType = {
  KEYWORD: 'KEYWORD',
  HISTORY: 'HISTORY',
};
//출력용 레이블
const TabLabel = {
  [TabType.KEYWORD]: '추천 검색어',
  [TabType.HISTORY]: '최근 검색어'
}
export default class TabView extends View {
  constructor() {
    super(qs('#tab-view'));

    this.template = new Template();
    //이벤트 바인딩
    this.bindEvents();
  }

  bindEvents() {
    //tab-view 엘리먼트에서 click이벤트가 발생하면, 이 이벤트가 li에서 발생한 것인지 찾음
    delegate(this.element, 'click', 'li', event => this.handleClick(event));
  }

  handleClick(event) {
    console.log(tag, event.target);
    //TabView 하단의 '검색결과 view'의 변환은 TabView의 역할이 아니므로 이벤트발행하여 위임
    const value = event.target.dataset.tab;
    this.emit('@change', { value })
  }

  //View.js 의 메서드 override
  //selectedTab을 관리하는 것은 데이터관리이므로 store.js에서 받는다
  show(selectedTab) {
    this.element.innerHTML = this.template.getTabList();
    //active class 추가
    qsAll('li', this.element).forEach(li => {
      li.className = li.dataset.tab === selectedTab ? 'active' : '';
    });
    super.show();
  }
}

class Template {
  getTabList() {
    return `
      <ul class="tabs">
        ${Object.values(TabType)
          .map((tabType) => ({
            tabType,
            tabLabel: TabLabel[tabType],
          }))
          .map(this._getTab)
          .join('')}
      </ul>
    `;
  }

  _getTab({ tabType, tabLabel }) {
    return `
      <li data-tab=${tabType}>
        ${tabLabel}
      </li>
    `;
  }
}