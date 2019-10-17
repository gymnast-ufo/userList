import Validate from "../../../../common/components/Validate";
import UpdateFile from '../../../../common/components/UpdateFile';
import { scrollTo } from '../../../../common/components/helpers';

export default class Send {
	constructor(props) {
		this.props = props;
		this.list = this.props.form.props.list;
		this.listItem = this.props.form.listItem;
		this.isNewUser = !this.listItem;

		this.send = this.send.bind(this);
	}

	create() {
		let block = document.createElement('div');
		block.classList.add(...this.props.classes);

		let button = document.createElement('button');
		button.innerHTML = this.isNewUser ? 'Создать' : 'Обновить';
		button.setAttribute('form', this.props.form.formNode.id);
		button.onclick = this.send;

		block.append(button);

		return block;
	}

	checkForNewChanges(oldData, newData) {
		for(let key in oldData) {
			if (!oldData.hasOwnProperty(key)) continue;
			if (key === 'id') continue;

			if(oldData[key] !== newData[key]) return true;
		}

		return false;
	}

	async send(e) {
		e.preventDefault();

		let inputs = this.props.form.userChangers;
		let validate = new Validate(inputs).check();

		let data = inputs.reduce((sum, input) => {
      return sum[input.field.name] = input.field.type === 'checkbox' ? input.field.checked : input.field.value, sum;
    }, {});

		let checkForNew = this.checkForNewChanges(this.props.form.user, data);
		if (!checkForNew || !validate) return;

		data = JSON.stringify(data);
		// let response = await fetch('https://api2.esetnod32.ru/frontend/test/', {
		// 	method: 'POST',
		// 	mode: 'cors',
		// 	body: data,
		// });
    //
		// let result = await response.json();
    // let id = result.data.id;
    // data = { id, ...data };

		data = JSON.parse(data);

		if(this.isNewUser) {
      data = { id: this.list.users.length + 1, ...data };
      this.listItem = this.list.createItem(data);

      console.log('new user has been created', this.listItem);
    }

    this.listItem.updateValues(data);
    console.log('user`s data has been updated', this.listItem);

    // let updateFile = new UpdateFile({ list: this.list });
    // updateFile.update();
    console.log('the file has been successfully updated');

    this.props.form.hide();

    console.log('scrolling to user', this.listItem.item);
    scrollTo(this.listItem.item);
	}
}