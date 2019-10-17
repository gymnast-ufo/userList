import { isTablet } from '../helpers';

const CLASS_NAMES = {
  hideScroll: 'overflow',
  fixed: 'fixed',
};

function hideScroll() {
  let { pageYOffset } = window;
  let { offsetWidth } = this;

  this.classList.add(CLASS_NAMES.hideScroll, CLASS_NAMES.fixed);
  this.style.width = isTablet() ? `100%` : `${offsetWidth}px`;
  this.style.top = `${-pageYOffset}px`;
}

function showScroll() {
  let { top } = window.getComputedStyle(this);
  top = -parseFloat(top);

  this.classList.remove(CLASS_NAMES.hideScroll, CLASS_NAMES.fixed);
  this.style.width = ``;
  this.style.top = ``;

  window.scrollTo(0, top);
}

function parents(elem) {
  if (!elem) return this.parentNode;

  let parent = this;

  while ((parent = parent.parentNode) && parent !== elem);
  return parent;
}

HTMLElement.prototype.hideScroll = hideScroll;
HTMLElement.prototype.showScroll = showScroll;
HTMLElement.prototype.parents = parents;

export { hideScroll, showScroll, parents };