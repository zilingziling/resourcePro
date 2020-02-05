import {observable, action} from 'mobx';
import Api from '../api';
class Video {
	@observable name = null;
	@observable NETWO =  false;
	@observable id =  null;
	constructor() {}

	//由于网络错误导致片段加载失败时引发
	@action
	NETWORKERROR = async(marak) =>{
		if(this.id !== null){
			if(navigator.onLine){
				let res = await Api.Live.liveStatus(this.id, window.sessionStorage.getItem('token') || '');
				if(res.code === 1){
					this.NETWO = marak;
					this.name = null;
				}else if(res.code === 0){
					// 
				}else{
					this.NETWO = marak;
					this.name = '网络错误';
				}
			}else{
				this.NETWO = marak;
				this.name = '网络错误';
			}
		}
	}

	//恢复网络成功状态
	@action
	SURCCESSMEDIA = (id) =>{
		this.id = id;
		this.NETWO = false;
		this.name = null;
	}

	//媒体出现错误时候调用
	@action
	MEDIAERROR = (text) =>{
		this.name = text;
		this.NETWO = true;
	}
}
export default new Video();