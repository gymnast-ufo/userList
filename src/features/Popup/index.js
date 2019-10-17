import Burger from '../../common/components/Burger';
import { hideScroll, showScroll } from '../../common/components/prototypes';


const CLASS_NAMES = {
	main: 'popup',
	show: 'popup__visible',
  close: 'popup__close',
  item: 'popup__item',
};

/**
 * parent class for every popup
 * @param props {object}
 */
export default class Popup {
  constructor(props) {
    this.props = props;
    this.popup = document.querySelector(`.${CLASS_NAMES.main}`);
    this.close = this.popup.querySelector(`.${CLASS_NAMES.close}`) || this.createClose();

    this.hide = this.hide.bind(this);
    this.checkHide = this.checkHide.bind(this);

    this.popup.onclick = this.checkHide;
  }

  show() {
    document.body.hideScroll();
  	this.popup.classList.add(CLASS_NAMES.show);
  }

  hide() {
    document.body.showScroll();
  	this.popup.classList.remove(CLASS_NAMES.show);

    this.popup.innerHTML = '';
  }

  createClose() {
    let close = new Burger({
      parent: this.popup,
      classes: [ CLASS_NAMES.close ],
    });
    close.active();

    return close.burger;
  }

  createItem(node = 'div') {
    let item = document.createElement(node);
    item.classList.add(CLASS_NAMES.item);

    return item;
  }

  checkHide(e) {
    if (e.target.nodeName === 'A') return;

    let el = e.target;

    if(el.classList.contains(CLASS_NAMES.item)
      || el.parents(this.popupItem)) return;

    this.hide();
  }
}