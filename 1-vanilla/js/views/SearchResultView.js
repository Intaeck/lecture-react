import View from './View.js';
import { qs } from '../helpers.js';

export default class SearchResultView extends View {
  constructor() {
    super(qs('#search-result-view'));

    this.template = new Template();
  }

  // View.js의 show 메서드 override
  show(data = []) {
    //data에 따라서 검색결과를 동적으로 보여줌
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
      <div class="empty-box">검색결과가 없습니다.</div>
    `
  }
  getList(data = []) {
    return `
      <ul class="result">
        ${data.map(this._getItem).join('')}
      </ul>
    `
  }

  _getItem({imageUrl, name}) {
    return `
      <li>
        <img src="${imageUrl}" alt="${name}" />
        <p>${name}</p>
      </li>
    `
  }
}