import { observable, action } from 'mobx';

class routerStore {
	@observable
	GlobalRouter = '';

	@observable
	GlobalKeyWord = '';

	@action
	SETROUTER = (router) => {
		this.GlobalRouter = router;
	};
	@action
	SETKEYWORD = (keyword) => {
		this.GlobalKeyWord = keyword;
	};
}

export default new routerStore();