const headerFrom = {
	'Content-Type': 'application/x-www-form-urlencoded'
};
const HeaderImg = {
	'responseType': 'arraybuffer',
};
export const VIDEO = {
	info: {
		url: 'attendclasses/detail',  //课程详情 + 推荐课程
		method: 'post',
		headers: headerFrom
	},
	KeepNotess: {
		url: 'attendclasses/saveNote',  //保存笔记
		method: 'post',
		headers: headerFrom
	},
	PullMark: {
		url: 'attendclasses/score',  //拉评分状态
		method: 'post',
		headers: headerFrom
	},
	saveScore: {
		url: 'attendclasses/saveScore',  //拉评分状态
		method: 'post',
		headers: headerFrom
	},
	listView: {
		url: 'attendclasses/scoreList',  //全部评价
		method: 'post',
		headers: headerFrom
	},
	preview: {
		url: 'attendclasses/findPPT',  //视频PPT
		method: 'post',
		headers: headerFrom
	}
};

export const LOGIN = {
	Login: {
		url: 'login',  //登录
		method: 'post',
		headers: headerFrom
	},
	validation: {
		url: 'identifyingCode',  //验证码
		method: 'get',
	},
	tokenUlr: {
		url: 'authenticate',
		method: 'post',
		headers: headerFrom
	},
	permissionsVerify: {
		url: 'permissions/data',
		method: 'post',
		headers: headerFrom
	},
};

export const List = {
	infoList: {
		url: 'attendclasses/queryData',  //首页列表
		method: 'post'
	},
	VideoLists: {
		url: 'attendclasses/attendclassList',  //视频列表
		method: 'post',
		headers: headerFrom
	},
	excellentTeacher: {
		url: 'attendclasses/excellentTeacher',  //优秀教师列表
		method: 'post',
		headers: headerFrom
	},
	platformData: {
		url: 'attendclasses/platformData',  //全平台列表
		method: 'post',
		headers: headerFrom
	}
};

export const PERSONAL = {
	admin_info: {
		url: 'person/userDetail',  // 管理员个人信息
		method: 'post',
		headers: headerFrom
	},
	teach_info: {
		url: 'person/teacherDetail',  // 老师个人信息
		method: 'post',
		headers: headerFrom
	},
	personalInfo: {
		url: 'person/personData',  //个人资料
		method: 'post',
		headers: headerFrom
	},
	password: {
		url: 'person/updatePassword',  //修改密码
		method: 'post',
		headers: headerFrom
	},
	SaveData: {
		url: 'person/edit',  //保存个人资料
		method: 'post',
		headers: headerFrom
	},
	ModifyNotes: {
		url: 'person/editNote',  //修改笔记
		method: 'post',
		headers: headerFrom
	},
	myNotes: {
		url: 'person/myNote',  //我的笔记
		method: 'post',
		headers: headerFrom
	},
	DeleteNotes: {
		url: 'person/deleteNote',  //删除笔记
		method: 'post',
		headers: headerFrom
	},
	MyCourse: {
		url: 'person/myCourse',  //我的课程
		method: 'post',
		headers: headerFrom
	},
	myAttendClass: {
		url: 'attendclasses/myAttendClass',  //我的课程
		method: 'post',
		headers: headerFrom
	},
	DeleteCourse: {
		url: 'person/deleteCourse',  //删除课程
		method: 'post',
		headers: headerFrom
	},
	upload: {
		url: 'person/uploadCourse',  //上传文件
		method: 'post',
	},
	preview: {
		url: 'person/queryFile',  //上传文件
		method: 'post',
		headers: headerFrom
	},
	courseResourceList: {
		url: 'person/courseResourceList',  //课程资源
		method: 'post',
		headers: headerFrom
	},
	saveFile: {
		url: 'person/saveFile',  //上传文件
		method: 'post',
		headers: headerFrom
	},
	deleteCurriculum: {
		url: 'person/delete',  //删除课程
		method: 'post',
		headers: headerFrom
	},
	deleteFile: {
		url: 'person/deleteFile',  //删除课件
		method: 'post',
		headers: headerFrom
	},
	report: {
		url: 'person/report',  //上报课程
		method: 'post',
		headers: headerFrom
	},
	release: {
		url: 'person/release',  //发布课程
		method: 'post',
		headers: headerFrom
	},
	saveKnowledge: {
		url: 'person/saveKnowledge',  //发布课程
		method: 'post',
		headers: headerFrom
	},
	spaceManage: {
		url: 'person/spaceManage',  //空间管理
		method: 'post',
		headers: headerFrom
	},
	reportPlatform: {
		url: 'person/reportPlatform',  //空间管理
		method: 'post',
		headers: headerFrom
	},
	scoreList: {
		url: 'person/scoreList',  //教学评价
		method: 'post',
		headers: headerFrom
	},
	watchRecord:{
		url: 'person/watchRecord',  //观看记录
		method: 'post',
		headers: headerFrom
	},
	saveAttend:{
		url: 'person/saveAttend',  //保存普课
		method: 'post',
		headers: headerFrom
	},
};


export const Live = {
	itemName: {
		url: 'videoLive/queryData',  //首页列表
		method: 'get'
	},
	list: {
		url: 'videoLive/videoList',  //list
		method: 'post',
		headers: headerFrom
	},
	listInfo: {
		url: 'videoLive/detail',  //信息直播
		method: 'post',
		headers: headerFrom
	},
	appDetail: {
		url: 'videoLive/appDetail',  //二维码
		method: 'post',
		headers: headerFrom
	},
	liveStatus: {
		url: 'videoLive/liveStatus',  //
		method: 'post',
		headers: headerFrom
	},
	detail: {
		url: 'videoLive/detail',  //上报平台
		method: 'post',
		headers: headerFrom
	},

};

export const EducationInfo = {
	list: {
		url: 'news/newsList',  //list
		method: 'post',
		headers: headerFrom
	},
	beforeAndNext: {
		url: 'news/beforeAndNext',  //list
		method: 'post',
		headers: headerFrom
	},
};
export const Collect = {
	list: {
		url: 'person/myCollection',  //list
		method: 'post',
		headers: headerFrom
	},
};

export const Micro = {
	microRecourceList: {
		url: 'micro/microRecourceList',  //个人中心，微课资源
		method: 'post',
		headers: headerFrom
	},
	report: {
		url: 'micro/report',  //上报
		method: 'post',
		headers: headerFrom
	},
	saveKnowledge: {
		url: 'micro/saveKnowledge',  //添加知识点
		method: 'post',
		headers: headerFrom
	},
	deleteKnowledge: {
		url: 'micro/deleteKnowledge',  //删除知识点
		method: 'post',
		headers: headerFrom
	},
	saveFile: {
		url: 'micro/saveFile',  //上传文件
		method: 'post',
		headers: headerFrom
	},
	deleteFile: {
		url: 'micro/deleteFile',  //删除课件
		method: 'post',
		headers: headerFrom
	},
	upload: {
		url: 'person/uploadCourse',  //上传文件
		method: 'post',
	},
	release: {
		url: 'micro/release',  //发布课程
		method: 'post',
		headers: headerFrom
	},
	reportPlatform: {
		url: 'person/reportPlatform',  //上报平台
		method: 'post',
		headers: headerFrom
	},
	deleteCurriculum: {
		url: 'micro/delete',  //删除课程
		method: 'post',
		headers: headerFrom
	},
	schoolData: {
		url: 'micro/schoolData',  //获取学校
		method: 'post',
		headers: headerFrom
	},
	subjectData: {
		url: 'micro/subjectData',  //获取科目
		method: 'post',
		headers: headerFrom
	},
	gradeData: {
		url: 'micro/findBySchoolId',  //获取年级
		method: 'post',
		headers: headerFrom
	},
	saveMicro:{
		url: 'micro/save',  //保存微课
		method: 'post',
		headers: headerFrom
	},
	list:{
		url: 'micro/list',  //微课程模块列表
		method: 'post',
		headers: headerFrom
	},
	detail:{
		url: 'micro/detail',  //微课程详情
		method: 'post',
		headers: headerFrom
	},
	collection:{
		url: 'micro/collection',  //收藏微课
		method: 'post',
		headers: headerFrom
	},
	mediaResourceData:{
		url: 'micro/mediaResourceData',  //媒体上传接口数据
		method: 'post',
		headers: headerFrom
	},
	
	spaceManage:{
		url: 'micro/spaceManage',  //空间管理
		method: 'post',
		headers: headerFrom
	},
	
};