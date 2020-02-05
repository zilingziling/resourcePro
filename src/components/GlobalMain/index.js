import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router';
import { HashRouter, Switch, Route, Router } from 'react-router-dom';
import router from './../../routes/route.config';
import RedirectLogin from './../RedirectLogin';
import { debounce } from './../../utils/utils';
import { permissionsVerify } from './../../api/login';
import('./index.less');

@inject('routerStore', 'lazyLoad')
@observer
class Main extends Component {
	constructor(props) {
		super(props)
	}
	state = {
		isLoading: false,
	};
	componentWillMount() {
		this.regScroll(this);
	}
	componentDidMount() {
		permissionsVerify().then(res => {
			if (res.code === 0) {
				if (res.data.visit === 1 && !sessionStorage.getItem("isLogin")) {
					window.sessionStorage.clear();
					window._guider.History.history.push({
						pathname: '/login'
					})
				}
			}
		}).catch(e => {
			window._guider.Utils.alert({
				message: "服务器错误，请联系管理员！",
				type: 'error'
			});
			window.sessionStorage.clear();
			window._guider.History.history.push({
				pathname: '/login'
			})
		})
	}
	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/" render={() => <Redirect to="index" />} />
					<Route exact path="/login" component={router.Login()}></Route>
					<Route exact path="/index" component={router.Home()}></Route>
					<Route exact path="/curriculum" component={router.curriculumCenter()}></Route>
					<Route exact path="/live" component={router.Live()} />
					<Route exact path="/micro" component={router.MicroCurriculum()} />
					<Route exact path="/educationinfo" component={router.EducationInfo()} />
					<Route exact path="/eduinfodetails/:id" component={router.EducationInfoDetails()} />
					<Route exact path="/personal/pingtai" component={router.PingtaiHome()} />
					<Route path="/search/:id" component={router.Search()} />
					<RedirectLogin>
						<Route path="/personal" component={router.Personal()} />
						<Route exact path="/video" component={router.VideoPlayer()} />
						<Route exact path="/livevideo" component={router.liveVideo()} />
						<Route exact path="/teachercenter/:id" component={router.teacherCenter()} />
					</RedirectLogin>
					<Redirect from="*" to="/index" />
				</Switch>
			</div>
		);
	}

	regScroll() {
		window.document.documentElement.scrollTop = 0;
		const Fn = e => {
			// console.log("滚动事件》》》》",e)
			let scrollTop = e.target.documentElement.scrollTop;
			let clientHeight = e.target.documentElement.clientHeight;
			let scrollHeight = e.target.documentElement.scrollHeight;
			if (scrollTop + clientHeight === scrollHeight) {
				this.props.lazyLoad.lazyLoading = true;
				this.props.lazyLoad.lazyModule = 1;
				this.props.lazyLoad.lazyNum = scrollTop;
				document.documentElement.scrollTop = this.props.lazyLoad.lazyNum - 5;
				e.stopPropagation()
			} else {
				this.props.lazyLoad.lazyModule = 2;
			}
		}
		window.addEventListener("scroll", debounce(Fn, 100))
	}
}

export default Main;