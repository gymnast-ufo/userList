import FileSaver from 'file-saver';

export default class UpdateFile {
	constructor(props) {
		this.props = props;
		this.list = this.props.list;
		this.listNode = this.list.list;
	}

	update() {
		let json = this.getDataFromList();
		json = JSON.stringify(json);

		let blob = new Blob([json], { type: 'application/json' });
		FileSaver.saveAs(blob, 'users.json');
	}

	getDataFromList() {
		return [...this.listNode.children].map(user => this.getDataFromUser(user));
	}

	getDataFromUser(user) {
		let id = this.getUserData(user, 'id').split(': ')[1];
		let name = this.getUserData(user, 'name');
		let role = this.getUserData(user, 'role');
		let phone = this.getUserData(user, 'phone');
		let isArchive = this.getUserIsArchive(user);
		let birthday = user.dataset.birthday;

		return { id, name, isArchive, role, phone, birthday };
	}

	getUserData(user, type) {
		return user.querySelector(`.item__${type} .item__label`).innerHTML;
	}

	getUserIsArchive(user) {
		return user.querySelector('.item__isArchive .pseudo-check__checkbox').classList.contains('pseudo-check__checkbox__checked');
	}
}