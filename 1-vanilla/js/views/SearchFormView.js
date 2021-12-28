import View from './View.js';
import { qs, on } from '../helpers.js';

const tag = '[SearchFormView]';

export default class SearchFormView extends View {

  constructor() {
    console.log(tag);
    super(qs('#search-form-view'));

    this.inputElement = qs('[type=text]', this.element);
    //form 내부 reset 버튼
    this.resetElement = qs('[type=reset]', this.element);
    this.showResetButton(false);

    // event들을 바인딩
    this.bindEvent();
  }

  showResetButton(visible = true) {
    this.resetElement.style.display = visible ? 'block' : 'none';
  }

  bindEvent() {
    //검색어 입력 : helpers.js 의 on 메서드 (addEventListener)
    on(this.inputElement, 'keyup', () => this.handleKeyup());
    //검색 실행(enter 입력)
    on(this.element, 'submit', event => this.handleSubmit(event));
    //검색어 삭제 버튼 클릭
    on(this.resetElement, 'click', () => this.handleReset());
  }

  handleKeyup() {
    // console.log(tag, 'handleKeyup', this.inputElement.value);
    const { value } = this.inputElement;
    this.showResetButton(value.length > 0);
    // 검색어 삭제 시
    if (value.length <= 0) {
      this.handleReset();
    }
  }

  handleSubmit(event) {
    console.log(tag, 'handleSubmit');
    //form의 submit event는 기본적으로 화면을 refresh 하는데, 그것을 방지
    event.preventDefault();
    // search-form-view는 검색어만 입력하는 역할이며, 
    // 검색결과를 보여주는건 검색결과를 보여주는 view의 역할이므로,
    // event만 발행해서 Controller가 받아서 처리하는 위임으로 구현
    const { value } = this.inputElement;
    // View.js의 emit 메서드 => helpers.js의 emit 메서드 (CustomEvent dispatch)
    this.emit('@submit', { value });
  }

  handleReset() {
    console.log(tag, 'handleReset');
    //외부로 이벤트 위임 -> Controller.js가 받음
    this.emit('@reset');
  }

  //View.js의 메서드를 override
  //input element의 value를 설정함
  show(value = '') {
    this.inputElement.value = value;
    this.showResetButton(this.inputElement.value.length > 0); 
    super.show();
  }
}