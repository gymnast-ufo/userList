import UserForm from '../../Popup/UserForm';

const CLASS_NAMES = {
	main: 'new-user',
	text: 'new-user__text',
};

export default class NewUser {
	constructor(props) {
		this.props = props;

		this.createNewUser = this.createNewUser.bind(this);
	}

	create() {
		let block = document.createElement('div');
		block.classList.add(CLASS_NAMES.main);
		block.onclick = this.createNewUser;

		let text = document.createElement('span');
		text.classList.add(CLASS_NAMES.text);
		text.innerHTML = 'Добавить пользователя';

		block.append(text);

		return block;
	}

	createNewUser(e) {
		let userForm = new UserForm({ list: this.props.list });
		userForm.show();
	}
}