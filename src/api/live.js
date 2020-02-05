// @flow

import { makeRequest, returnResults } from './config';
import { Live } from './url';

//直播列表头部选项
export const infoCourse = () => {
	return makeRequest(Live.itemName);
};


//直播列表
export const listVideo = (page, keyword, teacherld, code ) =>{
	const params = new URLSearchParams();
	params.append('keyword', keyword);
	params.append('teacherld', teacherld);
	params.append('code', code);
	params.append('limit', 8);
	params.append('page', page);
	params.append('token', sessionStorage.getItem('token') || '');
	return makeRequest(Live.list, params);
};

//直播info
export const liveInfo = (id, token) =>{
	const params = new URLSearchParams();
	params.append('id', id);
	params.append('token', token);
	return makeRequest(Live.listInfo, params);
};
 

export const appDetail = (id) =>{
	const params = new URLSearchParams();
	params.append('id', id);
	return returnResults(Live.appDetail, params);

};

export const liveStatus = (id, token) =>{
	const params = new URLSearchParams();
	params.append('id', id);
	params.append('token', token);
	return returnResults(Live.liveStatus, params);
};