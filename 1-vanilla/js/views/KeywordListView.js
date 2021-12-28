import { delegate, qs } from '../helpers.js';
import View from './View.js';

const tag = '[KeywordListView]';

export default class KeywordListView extends View {
  //element와 template를 외부에서 주입받도록 함 -> HistoryListView에서 상속하기 위함
  //기본은 kewword-list-view
  constructor(element = qs('#keyword-list-view'), template = new Template()) {
    console.log(tag, 'constructor');

    super(element);

    //template도 외부에서 주입받도록 함 -> HistoryListView에서 상속하기 위함
    this.template = template;
    this.bindEvents();
  }

  bindEvents() {
    //keyword-list-view div태그 하위의 li들에게 이벤트를 위임
    delegate(this.element, 'click', 'li', (event) => this.handleClick(event));
  }

  handleClick(event) {
    console.log(tag, 'handleClick', event.target.dataset.keyword);
    const value = event.target.dataset.keyword;
    this.emit('@click', { value });
  }

  // View.js의 메서드를 override
  show(data = []) {
    this.element.innerHTML =
      data.length > 0
        ? this.template.getList(data)
        : this.template.getEmptyMessage();
    super.show();
  }
}

class Template {
  getEmptyMessage() {
    return `
      <div class="empty-box">추천 검색어가 없습니다</div>
    `;
  }
  getList(data = []) {
    return `
      <ul class="list">
        ${data.map(this._getItem).join('')}
      </ul>
    `;
  }

  //storage.keywordData의 데이터가 들어옴
  _getItem({ id, keyword }) {
    return `
      <li data-keyword="${keyword}">
        <span class="number">${id}</span>
        ${keyword}
      </li>
    `;
  }
}
