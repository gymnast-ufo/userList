import UsersList from "./UsersList";
import NewUser from './NewUser';

export default class Content {
  constructor(props) {
    this.props = props;
    this.node = document.querySelector('.content');
    this.usersList = null;
  }

  insertWrap() {
    this.node.append(this.wrap);

    return this;
  }

  createWrap() {
    let wrap = document.createElement('div');
    wrap.classList.add('content__wrap');

    this.wrap = wrap;
    return this;
  }

  createList() {
    this.getUsers()
      .then(resolve => {
        this.list = new UsersList({ users: resolve });
        this.wrap.prepend(this.list.createList());

        this.insertWrap();
        return this;
      });
  }

  createNewUser() {
    this.newUser = new NewUser(this);

    this.wrap.append(this.newUser.create());

    return this;
  }

  async getUsers() {
    const response = await fetch('uploads/users.json', {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    return response.json();
  }
}