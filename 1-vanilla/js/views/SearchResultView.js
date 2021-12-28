import { qs } from '../helpers.js';
import View from './View.js';

export default class SearchResultView extends View {
  constructor() {
    super(qs('#search-result-view'));

    //동적으로 DOM을 만들기 위한 템플릿 생성
    this.template = new Template();
  }

  //View.js의 method를 override
  show(data) {
    //데이터에 따라서 검색결과를 Template으로 보여줌
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

  //storage에서 검색된 데이터를 넘겨받음 (productData)
  _getItem({imageUrl, name}) {
    return `
      <li>
        <img src="${imageUrl}" alt="${name}" />
        <p>${name}</p>
      </li>
    `
  }
}