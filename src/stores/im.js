import { observable, action } from 'mobx';
class IM {
    @observable IMInfo = {};
    constructor() { }
    //设置加载是否完成的状态
    @action
    SEIMINFO = (INFO) => {
        this.IMInfo = INFO;
    }
}
export default new IM();