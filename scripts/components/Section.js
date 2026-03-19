export default class Section {
  constructor({ items, renderer }, containerSelector, method) {
    this._items = items;
    this._renderer = renderer;
    this._method = method;

    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    // console.log(this._method === "append");
    if (this._method === "append") {
      this._container.append(element);
    } else if (this._method === "prepend") {
      this._container.prepend(element);
    }
  }
}
