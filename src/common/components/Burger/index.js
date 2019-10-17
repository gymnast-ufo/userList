const CLASS_NAMES = {
	main: 'burger',
	inner: 'burger__inner',
	open: 'burger--open',
};

export default class Burger {
	constructor(props) {
		this.props = props;
		this.burger = this.create();
	}

	create() {
		let burger = document.createElement('div');
		burger.classList.add(...this.props.classes, CLASS_NAMES.main);

		let inner = document.createElement('div');
		inner.classList.add(CLASS_NAMES.inner);

		burger.append(inner);
		this.props.parent.append(burger);

		return burger;
	}

	active() {
		this.burger.classList.add(CLASS_NAMES.open);

		return this;
	}
}