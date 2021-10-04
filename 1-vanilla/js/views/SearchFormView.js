import { on, qs } from "../helpers.js";
import View from "./View.js";

const tag = "[SearchFormView]";

export default class SearchFormView extends View {
  constructor() {
    console.log(tag, "constructor");

    super(qs("#search-form-view"));
    console.log(tag, this.element);

    this.inputElement = qs("[type=text]", this.element);
    this.resetElement = qs("[type=reset]", this.element);

    this.showResetButton(false);
    this.bindEvents();
  }

  showResetButton(visible = true) {
    this.resetElement.style.display = visible ? "block" : "none";
  }

  bindEvents() {
    on(this.inputElement, 'keyup', () => this.handleKeyup()); // helper.js의 on 메서드
    // TODO
    on(this.element, 'submit', (event) => this.handleSubmit(event)); // helper.js의 on 메서드
  }

  handleKeyup() {
    const { value } = this.inputElement;
    this.showResetButton(value.length > 0);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(tag, 'handleSubmit');
    const { value } = this.inputElement;
    console.log('this.inputElement.value ::: ', typeof this.inputElement);
    console.log('value::::: ', typeof value, value);
    console.log('{ value } ::::: ', typeof { value }, { value });
    this.emit('@submit', { value }); // View.js의 emit 메서드
  }
}
