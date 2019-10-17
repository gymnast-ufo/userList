import "inputmask/dist/inputmask/inputmask.date.extensions";
import Inputmask from 'inputmask';

const CLASS_NAMES = {
	main: 'field-block',
	field: 'field-block__field',
	label: 'field-block__label',
	error: 'field-block__error',
	incorrect: 'incorrect-value',
};

/**
 * create changer with field for form like
 * <div>
 * 		<label>
 * 		<input>
 * <div>
 * @param props {object}
 */
export default class ChangeUserBlock {
	constructor(props) {
		this.props = props;

		this.addError = this.addError.bind(this);
		this.removeError = this.removeError.bind(this);
	}

	/**
	 * return this changer
	 * @returns {HTMLDivElement}
	 */
	getNode() {
		return this.block;
	}

	/**
	 * create changer`s DOM
	 * @returns {ChangeUserBlock} this class
	 */
	create() {
		this.block = document.createElement('div');
		this.block.classList.add(this.props.classes, CLASS_NAMES.main);

		this.field = this.createField();
		let label = this.createFieldLabel();
		this.error = this.createError();

		this.field.addEventListener('input', this.removeError);

		this.block.append(label, this.field, this.error);

		return this;
	}

	/**
	 * create field
	 * @returns {*|HTMLSelectElement|HTMLInputElement}
	 */
	createField() {
		let field = this.props.propName === 'role'
			? document.createElement('select')
			: document.createElement('input');
		field.classList.add(CLASS_NAMES.field);

		field = this.setFieldOptions(field);

		return field;
	}

	createFieldLabel() {
		let label = document.createElement('span');
		label.classList.add(CLASS_NAMES.label);

		switch(this.props.propName) {
			case 'name': label.innerHTML = 'Имя'; break;
			case 'phone': label.innerHTML = 'Телефон'; break;
			case 'birthday': label.innerHTML = 'Дата рождения'; break;
			case 'role': label.innerHTML = 'Специальность'; break;
			case 'isArchive': label.innerHTML = 'в архиве'; break;
		}

		return label;
	}

	createError() {
		let error = document.createElement('span');
		error.classList.add(CLASS_NAMES.error);
		error.style.maxHeight = 0;

		return error;
	}

	setFieldOptions(field) {
		field.name = this.props.propName;
		field.required = this.props.propName === 'name'
		|| this.props.propName === 'phone'
		|| this.props.propName === 'birthday';

		switch(this.props.propName) {
			case 'isArchive': field = this.setCheckboxField(field); break;
			case 'phone': field = this.setPhoneField(field); break;
			case 'birthday': field = this.setBirthdayField(field); break;
			case 'role': field = this.setRoleField(field); break;
			default: field = this.setTextField(field);
		}

		return field;
	}

	setTextField(field) {
		field.type = 'text';
		field.value = this.props.propValue;

		return field;
	}

	setRoleField(field) {
		let options = [];
		let roles = {
			default: 'Выберите специальность',
			designer: 'дизайнер',
			developer: 'разработчик',
			manager: 'контент-менеджер',
		};

		for (let role in roles) {
			let option = document.createElement('option');
			option.value = role;
			if (role === 'default') option.value = '';
			option.innerHTML = roles[role];
			option.selected = role === this.props.propValue;

			options.push(option);
		}

		field.append(...options);

		return field;
	}

	setBirthdayField(field) {
		field.type = 'text';
		field.value = this.props.propValue;

		Inputmask.extendAliases({
			'datetime': {
				inputFormat: 'dd.mm.yyyy',
				placeholder: "__.__.____",
				separator: ".",
				alias: "dd/mm/yyyy",
				max: new Date().toLocaleDateString(),
			},
		});
		Inputmask({
			alias: 'datetime',
			"clearIncomplete": true,
		}).mask(field);

		return field;
	}

	setPhoneField(field) {
		field.type = 'text';
		field.value = this.props.propValue;

		Inputmask({
			mask: '(+7|8) (999) 999-9999',
			"clearIncomplete": true,
		}).mask(field);

		return field;
	}

	setCheckboxField(field) {
		field.type = 'checkbox';
		field.checked = this.props.propValue;

		return field;
	}

	addError(errorType) {
		this.block.classList.add(CLASS_NAMES.incorrect);
		this.setErrorMessage(errorType);
	}

	removeError(e) {
		this.block.classList.remove(CLASS_NAMES.incorrect);
		this.removeErrorMessage();
	}

	setErrorMessage(errorType) {
		this.error.innerHTML = '';

		switch(errorType) {
			case 'empty': this.error.innerHTML = 'Отсутствует значение'; break;
			case 'short': this.error.innerHTML = 'Слишком короткое значение'; break;
		}

		this.error.style.maxHeight = `${this.error.scrollHeight}px`;
	}

	removeErrorMessage() {
		this.error.style.maxHeight = 0;
	}
}