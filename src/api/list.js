import { makeRequest } from './config';
import { List } from './url';

// 选择列表
export const gatewayLists = () => {
	return makeRequest(List.infoList);
};

//视屏列表

export const VideoLists = (param) => {
	// console.log(param);
	const params = new URLSearchParams();

	Object.keys(param).map(key => params.append(key, param[key]));
	params.append('version', '1.1');
	!param.platformId && sessionStorage.getItem('platformId') && params.append('platformId', window.sessionStorage.getItem('platformId'));
	params.append('token', window.sessionStorage.getItem('token') || '');
	return makeRequest(List.VideoLists, params);
};


// 获取某老师的视频列表 2019-4-10 邓竣峰
export const getTeacherVideos = (param) => {
	const params = new URLSearchParams();
	params.append('token', sessionStorage.getItem('token') || '');
	params.append('version', '1.1');
	!param.platformId && sessionStorage.getItem('platformId') && params.append('platformId', sessionStorage.getItem('platformId'));
	Object.keys(param).map(key => params.append(key, param[key]));
	return makeRequest(List.VideoLists, params);
};
// 优秀教师列表
export const excellentTeacher = (param) => {
	const params = new URLSearchParams();
	Object.keys(param).map(key => params.append(key, param[key]));
	!param.platformId && sessionStorage.getItem('platformId') && params.append('platformId', sessionStorage.getItem('platformId'));
	params.append('token', sessionStorage.getItem('token') || '');
	return makeRequest(List.excellentTeacher, params);
};
// 优秀教师列表
export const platformData = () => {
	const params = new URLSearchParams();
	params.append('token', sessionStorage.getItem('token') || '');
	return makeRequest(List.platformData, params);
};
// 直播详情
export const videoDetail = (id) => {
	const params = new URLSearchParams();
	params.append('id', id);
	params.append('token', sessionStorage.getItem('token') || '');
	return makeRequest(List.detail, params);
};
