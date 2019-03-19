import utils from "./utils";

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }

    this._element = null;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  render() {
    this.initState();
    this._element = utils.createElement(this.template);
    this.addListeners();
    return this._element;
  }

  unrender() {
    this.removeListeners();
    this._element = null;
    this._state = {};
  }

  addListeners() {}

  removeListeners() {}

  initState() {}

  update() {}
}
