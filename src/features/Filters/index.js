const CLASS_NAMES = {
	main: 'filters',
	item: 'filters__item',
	search: 'filters__search',
};

export default class Filters {
  constructor(props) {
    this.props = props;
    this.node = document.querySelector(`.${ CLASS_NAMES.main }`);
  
    this.handleInput = this.handleInput.bind(this);
  }

  create() {
  	this.search = this.node.querySelector(`.${ CLASS_NAMES.search }`) || this.createSearch();
  
  	this.node.append(this.search);

  	console.log('filters has been created');
  	return this;
  }

  createSearch() {
  	let search = document.createElement('input');
  	search.classList.add( CLASS_NAMES.item, CLASS_NAMES.search );
  	search.placeholder = 'Поиск';
  	search.addEventListener('input', this.handleInput);

  	return search;
  }

  createNameSort() {
  	let sortField = this;
  	this.nameSort = new Sort({
  		sortField,
  		placeholder: 'Сортировать по имени',
  	});
  }

  createBirthdaySort() {
  	let sortField = this;
  	this.birtdaySort = new Sort({
  		sortField,
  		placeholder: 'Сортировать по дню рождения',
  	});
  }

  handleInput(e) {
  	let value = e.target.value.toLowerCase();
  	let usersList = this.content.list.users;
  	let listDOM = this.content.list.list;

  	for (let [ key, user ] of usersList.entries()) {
  		let userName = user.name.toLowerCase();

  		!(userName.indexOf(value) + 1)
  			? listDOM.children[key].classList.add('hidden')
  			: listDOM.children[key].classList.remove('hidden');
  	}
  }

  getUsersList(content) {
  	this.content = content;
  }
}