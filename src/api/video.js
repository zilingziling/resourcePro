// @flow

import { makeRequest, returnResults } from './config';
import { VIDEO } from './url';

// 视频信息
export const infoCourse = (id, token) => {
	const params = new URLSearchParams();
	params.append('id', id);
	params.append('token', token);
	sessionStorage.getItem('platformId') && params.append('platformId', sessionStorage.getItem('platformId'));
	return makeRequest(VIDEO.info, params);
};
//提交评论
export const KeepNotes = (token, name, text, mediaFileId) => {
	const params = new URLSearchParams();
	params.append('token', token);
	params.append('name', name);
	params.append('content', text);
	params.append('mediaFileId', mediaFileId);
	return returnResults(VIDEO.KeepNotess, params);
};
// 视频评分首次
export const PullMake = (id, token) => {
	const params = new URLSearchParams();
	params.append('id', id);
	params.append('token', token);
	return returnResults(VIDEO.PullMark, params);
};
//提交评价
export const pushScore = (token, score, comment, mediaFileId, id, teacherId) => {
	const params = new URLSearchParams();
	params.append('token', token);
	params.append('score', score);
	params.append('comment', comment);
	params.append('mediaFileId', mediaFileId);
	params.append('teacherId', teacherId);
	if (id !== null) {
		params.append('id', id);
		return returnResults(VIDEO.saveScore, params);
	} else {
		return returnResults(VIDEO.saveScore, params);
	}
};

//获取评价列表
export const evaluationList = (token, page, limit, id) => {
	const params = new URLSearchParams();
	params.append('token', token);
	params.append('page', page);
	params.append('limit', limit);
	params.append('id', id);
	return makeRequest(VIDEO.listView, params);

};

//预览TTP
export const preview = (token, classId) => {
	const params = new URLSearchParams();
	params.append('token', token);
	params.append('classId', classId);
	return returnResults(VIDEO.preview, params);
};