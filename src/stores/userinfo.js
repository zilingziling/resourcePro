
import { observable, action, autorun } from 'mobx';
import { refreshToke } from './../api/login';

class UserStore {
	@observable isLogin = false;
	@observable token = '';
	@observable userName = '';
	@observable userType = '';
	@observable headerTitle = '';

	@action updateStatus = (status, token, userName, userType, userId, platformId, pingtaiList, openPlatform) => {
		// 更新用户状态
		console.log('更新用户状态===============================')
		this.isLogin = status;
		this.userName = userName;
		this.userType = userType;
		if (token) {
			this.token = token;
			window.sessionStorage.setItem('isLogin', status);
			window.sessionStorage.setItem('userName', userName);
			window.sessionStorage.setItem('userType', userType);
			window.sessionStorage.setItem('token', token);
			window.sessionStorage.setItem('userId', userId);
			window.sessionStorage.setItem('loginPlatformId', platformId);
			window.sessionStorage.setItem('platformId', platformId);
			window.sessionStorage.setItem('pingtaiList', pingtaiList);
			window.sessionStorage.setItem('openPlatform', openPlatform);
		}
	}

}
export default new UserStore();

// function tokens(){
autorun(() => {
	setInterval(function () {
		if (window.sessionStorage.getItem('token') !== null) {
			refreshToke(window.sessionStorage.getItem('token') || '').then(res => {
				console.log(res);
				if (res.token) {
					window.sessionStorage.setItem('token', res.token);
				} else if (res.code === 404) {
					console.log('清楚');
					window.sessionStorage.clear(); //清除所有的变量和值
					console.log(sessionStorage.getItem('token') || '');
					window._guider.History.history.push({
						pathname: '/home'
					});

				}
			}).catch(err => {
				console.log(err);
			});
		}
	}, 59 * 59 * 1000); //15 60

});




// const store = new UserStore();
// autorun(() => {
// 	console.group('Store Info Data:');
// 	console.log(store);

// 	window.sessionStorage.setItem('guider:user', JSON.stringify(store));
// 	console.log(store);
// 	console.groupEnd('Store Info Data:');
// }, {
// 	delay: 300,
// 	onError(e) {
// 		console.error('Store user info to cache get error: ', e);
// 		console.log('Store user now data: ', store);
// 	}
// });
// export default store;

