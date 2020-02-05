import { makeRequest, returnResults } from './config';
import { PERSONAL } from './url';

// 管理员个人资料
export const getAdminInfo = (teacher_id) => {
	const params = new URLSearchParams();
	params.append('token', sessionStorage.getItem('token') || '');
	sessionStorage.getItem('platformId')&&params.append('platformId', window.sessionStorage.getItem('loginPlatformId'));
	return returnResults(PERSONAL.admin_info, params);
};
// 老师个人资料
export const getTeacherInfo = (teacher_id) => {
	const params = new URLSearchParams();
	params.append('token', sessionStorage.getItem('token') || '');
	params.append('teacherId', teacher_id);
	return returnResults(PERSONAL.teach_info, params);
};

//个人信息
export const infosData = () => {
	const params = new URLSearchParams();
	params.append('token', sessionStorage.getItem('token') || '');
	return makeRequest(PERSONAL.personalInfo, params);
};

//保存信息
export const saveInfo = (token, qq, phone) => {
	const params = new URLSearchParams();
	params.append('token', token);
	params.append('qq', qq);
	params.append('phone', phone);
	return returnResults(PERSONAL.SaveData, params);

};

//修改密码
export const newPassword = (token, Pwd, newPwd) => {
	const params = new URLSearchParams();
	params.append('token', token);
	params.append('oldPwd', Pwd);
	params.append('newPwd', newPwd);
	return returnResults(PERSONAL.password, params);
};

//笔记列表
export const classList = (param) => {
	const params = new URLSearchParams();

	Object.keys(param).map(key => params.append(key, param[key]));
	return makeRequest(PERSONAL.MyCourse, params);
};
//删除课堂
export const DeleteCourse = (token, CourseID) => {
	console.log(CourseID);
	const params = new URLSearchParams();
	params.append('token', token);
	params.append('id', CourseID);
	return returnResults(PERSONAL.DeleteCourse, params);

};
//上传ppt
export const upload = (token, file, classId, fileId) => {
	console.log(file);
	let params = new FormData();
	// const params = new URLSearchParams();
	params.append('token', token);
	params.append('file', file);
	params.append('classId', classId);
	params.append('fileId', fileId === null ? '' : fileId);
	return returnResults(PERSONAL.upload, params);
};
//预览TTP
export const preview = (token, fileId) => {
	const params = new URLSearchParams();
	params.append('token', token);
	params.append('fileId', fileId);
	return returnResults(PERSONAL.preview, params);
};

//笔记列表
export const notesList = (param) => {
	const params = new URLSearchParams();
	Object.keys(param).map(key => params.append(key, param[key]));
	return makeRequest(PERSONAL.myNotes, params);
};

//笔记删除
export const notesDletet = (token, id) => {
	const params = new URLSearchParams();
	params.append('token', token);
	params.append('id', id);
	return returnResults(PERSONAL.DeleteNotes, params);
};

//保存笔记
export const SeveDletet = (token, id, name, content) => {
	const params = new URLSearchParams();
	params.append('token', token);
	params.append('id', id);
	params.append('name', name);
	params.append('content', content);
	return returnResults(PERSONAL.ModifyNotes, params);
};
//课程资源
export const getCourseResourceList = (token, id, page, limit) => {
	const params = new URLSearchParams();
	params.append('token', token);
	params.append('id', id);
	params.append('page', page);
	params.append('limit', limit);
	sessionStorage.getItem('platformId')&&params.append('platformId', window.sessionStorage.getItem('loginPlatformId'));
	return returnResults(PERSONAL.courseResourceList, params);
}
//上传文件
export const saveFile = (id, urls, size) => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	params.append('urls', urls);
	params.append('id', id);
	params.append('size', size);
	return returnResults(PERSONAL.saveFile, params);
}
//删除课程
export const deletecurriculum = (id) => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	params.append('id', id);
	sessionStorage.getItem('platformId')&&params.append('platformId', window.sessionStorage.getItem('loginPlatformId'));
	return returnResults(PERSONAL.deleteCurriculum, params);
}
//删除课件
export const deletefile = (id) => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	params.append('id', id);
	return returnResults(PERSONAL.deleteFile, params);
}
//上报课程
export const report = (id,reportPlatformId) => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	params.append('id', id);
	params.append('reportPlatformId', reportPlatformId);
	sessionStorage.getItem('platformId')&&params.append('platformId', window.sessionStorage.getItem('loginPlatformId'));
	return returnResults(PERSONAL.report, params);
}
//上报的平台list
export const reportPlatform = () => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	sessionStorage.getItem('platformId')&&params.append('platformId', window.sessionStorage.getItem('loginPlatformId'));
	return returnResults(PERSONAL.reportPlatform, params);
}
//发布课程
export const release = (id) => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	params.append('id', id);
	sessionStorage.getItem('platformId')&&params.append('platformId', window.sessionStorage.getItem('loginPlatformId'));
	return returnResults(PERSONAL.release, params);
}
//主页信息
export const myAttendClass = (id) => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	params.append('version', '1.1');
	sessionStorage.getItem('platformId')&&params.append('platformId', window.sessionStorage.getItem('platformId'));
	return returnResults(PERSONAL.myAttendClass, params);
}
//标签保存
export const saveKnowledge = (name, id, knowledgeId) => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	params.append('name', name);
	params.append('attendclass.id', id);
	if (knowledgeId) params.append('id', knowledgeId);
	return returnResults(PERSONAL.saveKnowledge, params);
}
//空间管理
export const spaceManage = (param) => {
	const params = new URLSearchParams();
	Object.keys(param).map(key => params.append(key, param[key]));
	params.append('token', window.sessionStorage.getItem('token') || '');
	sessionStorage.getItem('platformId')&&params.append('platformId', window.sessionStorage.getItem('loginPlatformId'));
	return returnResults(PERSONAL.spaceManage, params);
}
//教学评价列表
export const scoreList = () => {
	const params = new URLSearchParams();
	params.append('token', window.sessionStorage.getItem('token') || '');
	return returnResults(PERSONAL.scoreList, params);
}
//观看记录
export const watchRecord = (param) => {
	const params = new URLSearchParams();
	Object.keys(param).map(key => params.append(key, param[key]));
	sessionStorage.getItem('platformId')&&params.append('platformId', window.sessionStorage.getItem('platformId'));
	params.append('token', window.sessionStorage.getItem('token') || '');
	return returnResults(PERSONAL.watchRecord, params);
}
//保存普课
export const saveAttend = (param) => {
	const params = new URLSearchParams();
	param && Object.keys(param).map(key => params.append(key, param[key]));
	params.append('token', window.sessionStorage.getItem('token') || '');
	return returnResults(PERSONAL.saveAttend, params);
}

