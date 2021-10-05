const tag = '[Store]';

export default class Store {
  constructor(storage) {
    console.log(tag, 'constructor');

    if (!storage) throw 'no storage';

    this.storage = storage;

    // TODO
    this.searchKeyword = '';
    this.searchResult = [];
  }

  search(keyword) {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter((product) =>
      product.name.includes(keyword)
    );
  }
}
