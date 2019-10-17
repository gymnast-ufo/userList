import Popup from '../';
import UserFormBlock from './Block';
import Send from './Send';

const CLASS_NAMES = {
	main: 'user-form',
	block: 'user-form__block',
  send: 'user-form__send',
};

const DEFAULT_PROPS = {
  name: '',
  isArchive: false,
  role: '',
  phone: '',
  birthday: '',
};

/**
 * create form to create/update user`s data
 * @param props {object}
 */
export default class UserForm extends Popup {
  constructor(props) {
  	super(props);
  	this.user = !!props.user ? props.user : DEFAULT_PROPS;
  	this.list = this.props.list;
    this.listItem = !!props.item ? props.item : false;

  	this.userChangers = this.createUserChangers();
  	this.popupItem = this.formNode = this.popup.querySelector(`.${CLASS_NAMES.main}`) || this.createForm();

    this.send = new Send({
      form: this,
      classes: [ CLASS_NAMES.block, CLASS_NAMES.send ],
    });
    this.formNode.append(this.send.create());
  }

	/**
	 * main function to create form`s DOM element
	 * @returns {HTMLDivElement} form`s DOM
	 */
  createForm() {
  	let form = this.createItem('form');
  	form.classList.add(CLASS_NAMES.main);
    form.id = 'main-form';

  	let [ name, isArchive, role, phone, birthday ] = this.userChangers;
  	this.userChangers = [ name, phone, birthday, role, isArchive ];
  	let nodes = this.userChangers.map(elem => elem.getNode());

  	form.append(...nodes);
  	this.popup.append(form);

  	return form;
  }

	/**
	 * create changers with fields for form like
	 * @returns {[]} array of changers
	 */
  createUserChangers() {
  	let userChangers = [];

  	for(let prop in this.user) {
  		if(!this.user.hasOwnProperty(prop) || prop === 'id') continue;

  		userChangers.push(new UserFormBlock({
  			classes: [ CLASS_NAMES.block ],
  			propName: prop,
  			propValue: this.user[prop],
  		}).create());
  	}

  	return userChangers;
  }
}