import Noty from 'noty'; // https://ned.im/noty/#/options
import 'noty/lib/noty.css';
import 'noty/lib/themes/nest.css';
import { Notification } from 'antd';

import NProgress from 'nprogress'; // https://github.com/rstacruz/nprogress
import 'nprogress/nprogress.css';
const GlobalNProgressKey = 'updatable';
//数字
export const returnNumber = (e) => {
	if (e.replace(/[^\d]/, '')) {
		return e.replace(/(^\s*)|(\s*$)/g, '');
	}
};

//????
export const selNmbreturn = (e, numbers) => {
	console.log(e);
	if (e.length <= numbers) {
		return e;
	} else { return; }
};


//纯数字	
export const NumberType = (e) => {
	// console.log(e);
	let reg = new RegExp(/^\d+$/);
	if (reg.test(e)) {
		return e;
	}
};
export const alert = (data) => {
	// new Noty({
	// 	text: data.message,
	// 	type: data.type,
	// 	theme: 'nest',
	// 	timeout: 2000,
	// 	progressBar: false,
	// }).show();
	const type = data.type || 'info'
	Notification[type]({
		key: GlobalNProgressKey,
		message: '提示！',
		description: data.message,
		duration: 2
	});
};
export const loading = {
	start() {
		NProgress.start();
	},
	set(n) {
		NProgress.set(n);
	},
	inc(n) {
		NProgress.inc(n);
	},
	done() {
		NProgress.done();
	}
};

export const debounce = (method, delay) => {
	// console.log("防抖函数>>>")
	let timer = null;
	return function () {
		let self = this,
			args = arguments;
		timer && clearTimeout(timer);
		timer = setTimeout(function () {
			method.apply(self, args);
		}, delay);
	};
};


export const BrowserType = () => {
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
	var isIE = userAgent.indexOf("trident") > -1 && !isOpera; //判断是否IE浏览器
	var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
	var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
	var isSafari = userAgent.indexOf("Safari") > -1
		&& userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
	var isChrome = userAgent.indexOf("Chrome") > -1
		&& userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

	if (isIE) {
		return "IE";
	}
	if (isOpera) {
		return "Opera";
	}
	if (isEdge) {
		return "Edge";
	}
	if (isFF) {
		return "FF";
	}
	if (isSafari) {
		return "Safari";
	}
	if (isChrome) {
		return "Chrome";
	}

}