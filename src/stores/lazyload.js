import {observable, action} from 'mobx';
class lazyLoad {
	@observable lazyModule;
	@observable lazyEnd = false;
	@observable scrollNum = 0;
	@observable lazyLoading = false;
	constructor() {}
	//设置加载是否完成的状态
	@action
	SETLAZYEND = (INFO) =>{
		this.lazyEnd = INFO;
	}
}
export default new lazyLoad();