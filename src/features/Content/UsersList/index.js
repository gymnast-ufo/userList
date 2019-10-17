import UsersListItem from "./Item";

export default class UsersList {
  constructor(props) {
    this.props = props;
    this.users = this.props.users || null;

    this.createList = this.createList.bind(this);
    this.createItem = this.createItem.bind(this);
  }

  createList() {
    this.list = document.createElement('div');
    this.list.classList.add('users-list');

    this.createItems();

    return this.list;
  }

  createItems() {
    return this.users.map(user => this.createItem(user));
  }

  createItem(user) {
    let id = user.id - 1;
    let listItem = new UsersListItem({user, list: this});

    this.users[id] = user;
    this.list.append(listItem.createListItem());

    return listItem;
  }
}