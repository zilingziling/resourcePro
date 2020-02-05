import { observable, action } from 'mobx';
import { gatewayLists } from './../api/list';
const data = [
	{ title: '年级' },
	{ title: '课程' },
	{ title: '教师姓名' },
];
class itemList {
	@observable  listName = data;
	@observable  listData = [];
	constructor() {
		this.list();
	}

	// @computed get
	@action
	list = async () => {

		try {
			let data = await gatewayLists(); 
			this.listData = data;
		} catch (error) {
			console.log(error);
		}
	};

}
export default itemList;
