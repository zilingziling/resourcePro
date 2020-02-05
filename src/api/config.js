// @flow
import axios from 'axios';
import { Notification } from 'antd';
import {debounce} from './../utils/utils';
axios.defaults.withCredentials = true;
export const instance = axios.create({
	baseURL: '/resource',
	// timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	}
});
// let i = 0;

export function makeRequest(requestData, data) {
	const config = {
		...requestData
	};
	if (data) {
		if (config.method === 'get') {
			config.params = data;
		} else {
			config.data = data;
		}
	}
	return instance(config)
		.then(res => {
			// console.log(res);
			if (res.data.code === 0) {
				return res.data.data;
			} else if (res.data.code === 1) {
				window._guider.Utils.alert({
					message: res.data.msg,
					type: 'warning'
				});
				return res.data;
			} else if (res.data.code === 404) {
				window.sessionStorage.clear(); //清除所有的变量和值
				window._guider.History.history.replace('/login');
				window._guider.Utils.alert({
					message: res.data.msg,
					type: 'error'
				});
				return res.data.data;
			} else {
				window._guider.Utils.alert({
					message: res.data.msg,
					type: 'error'
				});
				// return res.data.msg;
				throw new Error(res.data.msg ? res.data.msg : 'fetch 获取数据错误!');
			}
			// return res.data;
		})
		.catch(error => {
			console.log(error);
			// return failRequest(error);
		});
}

export function returnResults(requestData, data) {
	const config = {
		...requestData
	};
	if (data) {
		if (config.method === 'get') {
			config.params = data;
		} else {
			config.data = data;
		}
	}
	return instance(config)
		.then(res => {
			// console.log(res);
			if (res.data.code === 0) {
				return res.data;
			} else if (res.data.code === 404) {
				window.sessionStorage.clear(); //清除所有的变量和值
				window._guider.History.history.replace('/login');
				window._guider.Utils.alert({
					message: res.data.msg,
					type: 'error'
				});
				return '';
			} else {
				window._guider.Utils.alert({
					message: res.data.msg,
					type: 'error'
				});
				// throw new Error(res.data.msg ? res.data.msg : 'fetch 获取数据错误!');
				return res.data;
			}
			// return res.data;
		})
		.catch(error => {
			console.log(error);
			// return failRequest(error);
		});
}
// window._guider.Utils.loading.start();
// window._guider.Utils.loading.done();
// window._guider.Utils.loading.done();

//验证暂时不要删除
export function validations(requestData, data) {
	const config = {
		...requestData
	};
	if (data) {
		if (config.method === 'get') {
			config.params = data;
		} else {
			config.data = data;
		}
	}
	// window._guider.Utils.loading.start();

	return instance(config)
		.then(res => {
			// console.log(res);
			// console.log(res.config.url);
			if (res) {
				// return res.request.responseURL;
				return res.config.url;
			} else {
				throw new Error(res.data.msg ? res.data.msg : 'fetch 获取数据错误!');
			}
			// return res.data;
		})
		.catch(error => {
			console.log(error);
			// window._guider.Utils.loading.done();
			// return failRequest(error);
		});
}
