import View from './View.js';
import { qs } from '../helpers.js';

const tag = '[SearchFormView]';

export default class SearchFormView extends View {

  constructor() {
    console.log(tag);
    super(qs('#search-form-view'));

    this.resetElement = qs('[type=reset]', this.element);
    this.showResetButton(false);
  }

  showResetButton(visible = true) {
    this.resetElement.style.display = visible ? 'block' : 'none';
  }
}