import UserFormPopup from '../../../Popup/UserForm';

const CLASS_NAMES = {
  item: {
    main: 'users-list__item',
    label: {
      main: 'item__label',
      bold: 'item__label-bold',
    },
    prop: 'item__prop',
  },
  pseudoCheck: {
    main: 'pseudo-check',
    checkbox: {
      main: 'pseudo-check__checkbox',
      checked: 'pseudo-check__checkbox__checked',
    },
    label: 'pseudo-check__label',
  },

};

// create list item with user properties
export default class UsersListItem {
  constructor(props) {
    this.props = props;
    this.user = this.props.user;

    this.handleClick = this.handleClick.bind(this);
    this.updateValues = this.updateValues.bind(this);
  }

  // create item
  createListItem() {
    this.item = document.createElement('div');
    this.item.classList.add( CLASS_NAMES.item.main );

    this.properties = this.createProperties();
    this.item.dataset.birthday = this.user.birthday;

    this.item.addEventListener('click', this.handleClick);

    this.item.append(...this.properties);
    return this.item;
  }

  /**
   * create properties array
   * @returns {[]} array of properties
   */
  createProperties() {
    let props = [];

    for(let prop in this.user) {
      if (!this.user.hasOwnProperty(prop) || prop === 'birthday') continue;

      let isBold = prop === 'name' || prop === 'role';
      props.push(this.createProperty({
        propName: prop,
        prop: this.user[prop],
        bold: isBold,
      }));
    }

    return props;
  }

  // create each property
  createProperty({ propName, prop, bold = false }) {
    let property = document.createElement('div');
    property.classList.add( CLASS_NAMES.item.prop, `item__${propName}`);

    let inner = propName !== 'isArchive'
      ? this.createTextProperty(propName, prop, bold)
      : this.createCheckboxProperty(propName, prop);

    property.append(inner);
    return property;
  }

  // create checkbox for "isArchive" property
  createCheckboxProperty(propName, prop) {
    let label = document.createElement('div');
    let checkbox = document.createElement('span');
    let text = document.createElement('span');

    checkbox.classList.add( CLASS_NAMES.pseudoCheck.checkbox.main );
    prop && checkbox.classList.add( CLASS_NAMES.pseudoCheck.checkbox.checked );

    text.classList.add( CLASS_NAMES.pseudoCheck.label );
    text.innerHTML = 'в архиве';

    label.classList.add(`item__${propName}__pseudo-check`, CLASS_NAMES.pseudoCheck.main );
    label.append(checkbox, text);
    return label;
  }

  //create inner text for each other property
  createTextProperty(propName, prop, bold) {
    let label = document.createElement('span');
    label.classList.add( CLASS_NAMES.item.label.main );
    bold && label.classList.add( CLASS_NAMES.item.label.bold );

    let text = propName === 'id' ? `${propName}: ${prop}` : `${prop}`;
    label.append(text);

    return label;
  }

  handleClick(e) {
    const userForm = new UserFormPopup({ user: this.user, item: this, list: this.props.list });

    userForm.show();
  }

  updateValues(newProps) {
    for (let prop in newProps) {
      if(!newProps.hasOwnProperty(prop)) continue;

      let propNode = this.item.querySelector(`.item__${prop}`);
      switch (prop) {
        case 'isArchive': this.updateCheckboxValue(propNode, newProps[prop]); break;
        case 'birthday': this.updateBirthdayValue(newProps[prop]); break;
        default: this.updateTextValue(propNode, prop, newProps[prop]); break;
      }
    }
  }

  updateCheckboxValue(propNode, newValue) {
    let checkbox = propNode.querySelector(`.${ CLASS_NAMES.pseudoCheck.checkbox.main }`);
    let check = checkbox.classList.contains( CLASS_NAMES.pseudoCheck.checkbox.checked );

    switch(newValue) {
      case true: !check && checkbox.classList.add( CLASS_NAMES.pseudoCheck.checkbox.checked ); break;
      case false: check && checkbox.classList.remove( CLASS_NAMES.pseudoCheck.checkbox.checked ); break;
    }
  }

  updateTextValue(propNode, propName, newValue) {
    let label = propNode.querySelector(`.${ CLASS_NAMES.item.label.main }`);

    label.innerHTML = propName === 'id' ? `${propName}: ${newValue}` : `${newValue}`;
  }

  updateBirthdayValue(newValue) {
    this.item.dataset.birthday = newValue;
  }
}