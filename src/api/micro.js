import { makeRequest, returnResults } from './config';
import { Micro } from './url';

//上传ppt
export const upload = (token, file, classId, fileId) => {
	console.log(file);
	let params = new FormData();
	// const params = new URLSearchParams();
	params.append('token', token);
	params.append('file', file);
	params.append('classId', classId);
	params.append('fileId', fileId === null ? '' : fileId);
	return returnResults(Micro.upload, params);
};
//预览TTP
export const preview = (token, fileId) => {
	const params = new URLSearchParams();
	params.append('token', token);
	params.append('fileId', fileId);
	return returnResults(Micro.preview, params);
};


//课程资源
export const getMicroRecourceList = (token, id, page, limit) => {
	const params = new URLSearchParams();
	params.append('token', token);
	params.append('id', id);
	params.append('page', page);
	params.append('limit', limit);
	sessionStorage.getItem('platformId') && params.append('platformId', window.sessionStorage.getItem('loginPlatformId'));
	return returnResults(Micro.microRecourceList, params);
}
//上传文件
export const saveFile = (id, urls, size) => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	params.append('urls', urls);
	params.append('id', id);
	params.append('size', size);
	return returnResults(Micro.saveFile, params);
}
//删除课程
export const deletecurriculum = (id) => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	params.append('id', id);
	sessionStorage.getItem('platformId') && params.append('platformId', window.sessionStorage.getItem('loginPlatformId'));
	return returnResults(Micro.deleteCurriculum, params);
}
//删除课件
export const deletefile = (id) => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	params.append('id', id);
	return returnResults(Micro.deleteFile, params);
}
//上报课程
export const report = (id, reportPlatformId) => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	params.append('id', id);
	params.append('reportPlatformId', reportPlatformId);
	sessionStorage.getItem('platformId') && params.append('platformId', window.sessionStorage.getItem('loginPlatformId'));
	return returnResults(Micro.report, params);
}
//上报的平台list
export const reportPlatform = () => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	sessionStorage.getItem('platformId') && params.append('platformId', window.sessionStorage.getItem('loginPlatformId'));
	return returnResults(Micro.reportPlatform, params);
}
//发布课程
export const release = (id) => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	params.append('id', id);
	sessionStorage.getItem('platformId') && params.append('platformId', window.sessionStorage.getItem('loginPlatformId'));
	return returnResults(Micro.release, params);
}

//标签保存
export const saveKnowledge = (name, id, knowledgeId) => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	params.append('name', name);
	params.append('microclass.id', id);
	if (knowledgeId) params.append('id', knowledgeId);
	return returnResults(Micro.saveKnowledge, params);
}
//学校信息
export const schoolData = () => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	return returnResults(Micro.schoolData, params);
}
//科目信息
export const subjectData = () => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	return returnResults(Micro.subjectData, params);
}
//年级信息
export const gradeData = (id) => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	params.append('schoolId', id);
	return returnResults(Micro.gradeData, params);
}
//微课保存
export const saveMicro = (param) => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	Object.keys(param).map(key => params.append(key, param[key]));
	return returnResults(Micro.saveMicro, params);
}
//微课列表
export const microList = (param) => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	!param.platformId && sessionStorage.getItem('platformId') && params.append('platformId', sessionStorage.getItem('platformId'));
	Object.keys(param).map(key => params.append(key, param[key]));
	return returnResults(Micro.list, params);
}
//微课详情
export const microDetail = (id) => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	sessionStorage.getItem('platformId') && params.append('platformId', sessionStorage.getItem('platformId'));
	params.append('id', id);
	return returnResults(Micro.detail, params);
}
//收藏微课
export const collection = (param) => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	Object.keys(param).map(key => params.append(key, param[key]));
	return returnResults(Micro.collection, params);
}
//媒体上传接口数据
export const mediaResourceData = (param) => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	param && Object.keys(param).map(key => params.append(key, param[key]));
	return returnResults(Micro.mediaResourceData, params);
}
//空间管理
export const spaceManage = (param) => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	sessionStorage.getItem('platformId') && params.append('platformId', window.sessionStorage.getItem('loginPlatformId'));
	param && Object.keys(param).map(key => params.append(key, param[key]));
	return returnResults(Micro.spaceManage, params);
}

