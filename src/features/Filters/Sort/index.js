export default class Sort {
	constructor(props) {
		this.props = props;
	}

	sort() {

	}

	getNode() {
		this.field = document.createElement('div');
		this.field.innerHTML = this.props.placeholder;

		let icon = this.getIcon();

		return this.field;
	}
}