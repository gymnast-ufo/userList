import Content from './features/Content';
import Filters from "./features/Filters";

const content = new Content();
const filters = new Filters();

content
  .createWrap()
  .createNewUser()
  .createList();

filters
	.create()
	.getUsersList(content);