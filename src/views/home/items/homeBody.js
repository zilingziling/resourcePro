import React, { Component } from 'react';
import { BackTop, Notification } from 'antd';
import SelectionItemVideo from './SelectionItemVideo';
import TeachereItem from './teacherItem';
import { VideoLists, excellentTeacher, platformData } from '../../../api/list';
import { listVideo } from '../../../api/live';
import ExternalNav from '../../../components/ExternalNav'
import Lazyloaditem from './../../../components/Lazyload';
import { observer, inject } from 'mobx-react';

@inject('lazyLoad', 'routerStore', 'UserStore')
@observer
class HomeBody extends Component {
	state = {
		CourseList: {
			teacherId: '',
			grade: '',
			code: '',
			keyword: '',
			limit: 20,
			page: 1,
			orderScore: '',
			orderTime: '',
			courseType: ''
		},
		totalPage: 1,
		total: null,
		liveList: [],
		dataList: [],
		youkeList: [],
		teacherList: [],
		pingtaiList: [],
		totalpa: '1',
		youkeLoading: true,
		teacherLoading: true,
		liveLoading: true,
		dataLoading: true,
	};
	page = 1;
	componentWillReceiveProps(nextProps) {
		// if (nextProps) {
		// 	console.log('监听的数据>>>>>>>>>>>>', nextProps);
		// 	let param = Object.assign({}, this.state.CourseList, { keyword: nextProps.props.location.params || '', page: 1, });
		// 	this.VideoList(param);
		// 	this.setState({ CourseList: param });
		// }
	}
	componentDidMount() {
		this.getIndexList();
	}
	render() {
		return (
			<div className="home-body">
				<BackTop visibilityHeight={200} />
				{
					sessionStorage.getItem('openPlatform') != "1" ?
						<ExternalNav dataList={this.state.pingtaiList || []} itemClick={(e) => { this.PingtaiClick(e) }} returnClick={(e) => { this.personageClick(e) }} /> : null
				}

				{
					sessionStorage.getItem('platformType') != 'person' ?
						<div className="home-youke">
							<div className="home-youke_title">
								<span className="home-youke_title_text">
									名师优课
						</span>
								<a className="home-youke_title_handle" onClick={this.youkeClick.bind(this)}>
									更多>>
						</a>
							</div>
							<div className="home-youke_content">
								<SelectionItemVideo
									current={this.state.CourseList.page}
									total={this.state.totalpa}
									jump={this.props.props}
									data={this.state.youkeList}
									loading={this.state.youkeLoading}
									liveType={1}
								/>
							</div>
						</div> : null
				}
				{
					sessionStorage.getItem('platformType') != 'person' ?
						<div className="home-teacher">
							<div className="home-teacher_title">
								<span className="home-teacher_title_text">
									优秀教师
						</span>
								{/* <a className="home-teacher_title_handle">
							更多>>
						</a> */}
							</div>
							<div className="home-teacher_content">
								<TeachereItem
									jump={this.props.props}
									data={this.state.teacherList}
									loading={this.state.teacherLoading} />
							</div>
						</div> : null
				}
				<div className="home-live">
					<div className="home-live_title">
						<span className="home-live_title_text">
							直播
						</span>
						<a className="home-live_title_handle" onClick={this.liveClick.bind(this)}>
							更多>>
						</a>
					</div>
					<div className="home-live_content">
						<SelectionItemVideo
							current={this.state.CourseList.page}
							total={this.state.totalpa}
							jump={this.props.props}
							data={this.state.liveList}
							loading={this.state.liveLoading}
							liveType={2}
						/>
					</div>
				</div>
				<div className="home-recource">
					<div className="home-recource_title">
						<span className="home-recource_title_text">
							时间排序
						</span>
						<a className="home-recource_title_handle">

						</a>
					</div>
					<div className="home-recource_content">
						<SelectionItemVideo
							current={this.state.CourseList.page}
							total={this.state.totalpa}
							jump={this.props.props}
							data={this.state.dataList}
							loading={this.state.dataLoading}
							liveType={1}
						/>
						{
							this.state.dataList.length > 0 ?
								<Lazyloaditem lazyList={v => { this.lazyLoadingData(v); }} />
								: null
						}
					</div>
				</div>
			</div>
		);
	}

	getIndexList() {
		this.getTeacherList();
		this.getYoukeList();
		this.getLiveList();
		this.setState({ dataList: [], dataLoading: true }, () => {
			this.page = 1
			this.lazyLoadingList({
				limit: 8,
				page: this.page
			});
		})
		this.getPingtaiList();
	}

	PingtaiClick(item) {
		let indexName = item.id ? item.name : "弈简互动教学资源平台";
		window.sessionStorage.setItem('platformId', item.id);
		window.sessionStorage.setItem('platformType', item.code);
		window.sessionStorage.setItem("platformName", indexName);
		this.props.UserStore.headerTitle = indexName
		this.getIndexList();
		Notification.success({
			message: '提示！',
			description: `切换为${indexName}`,
			duration: 2,
		});
	}
	personageClick() {
		if (!window.sessionStorage.getItem("loginPlatformId")) return;
		window.sessionStorage.setItem('platformId', window.sessionStorage.getItem("loginPlatformId"))
		window.sessionStorage.setItem('platformType', window.sessionStorage.getItem("loginPlatformType"))
		window.sessionStorage.setItem('platformName', window.sessionStorage.getItem("loginPlatformName"))
		this.props.UserStore.headerTitle = window.sessionStorage.getItem("loginPlatformName");
		this.getIndexList();
		Notification.success({
			message: '提示！',
			description: `返回登陆平台`,
			duration: 2,
		});
	}

	getPingtaiList() {
		platformData().then(res => {
			let arr = res;
			arr.unshift({
				code: "systemPlatform",
				id: '',
				name: "平台主页"
			})
			if (res) {
				this.setState({ pingtaiList: res || [] })
			}
		}).catch(res => {
			console.log("服务器错误")
		})
	}

	getTeacherList(param = {
		limit: 6,
		page: 1,
	}) {
		excellentTeacher(param).then(res => {
			if (res) {
				this.setState({ teacherList: res || [], teacherLoading: false })
			}
		}).catch(res => {
			console.log("服务器错误")
		})

	}

	getYoukeList(param = {
		limit: 8,
		page: 1,
	}) {
		VideoLists(param).then(res => {
			if (res && res.list) this.setState({ youkeList: res.list, youkeLoading: false })
		}).catch(res => {
			console.log("服务器错误")
		})
	}

	getLiveList(page = 1, keyword = '', teacherld = '', code = '') {
		listVideo(page, keyword, teacherld, code).then(res => {
			if (res && res.list) this.setState({ liveList: res.list, liveLoading: false })
		}).catch(res => {
			console.log("服务器错误")
		})
	}

	lazyLoadingData() {
		// console.log(this.props.routerStore.GlobalRouter)
		if (this.props.routerStore.GlobalRouter != "/index") return;
		if (!this.props.lazyLoad.lazyEnd) {
			this.page = this.page + 1;
		}
		this.lazyLoadingList({
			limit: 8,
			page: this.page
		})
	}

	async lazyLoadingList(param) {
		try {
			// console.log("首页滚动加载》》》》》》")
			param.orderTime = 1;
			let data = await VideoLists(param);
			this.props.lazyLoad.lazyEnd = false;
			if (data && !data.list.length) this.props.lazyLoad.lazyEnd = true;
			let list = this.state.dataList.concat(data.list);
			this.setState({ dataList: list, dataLoading: false });
			this.props.lazyLoad.lazyLoading = false;
		} catch (error) {
			console.log("服务器错误")
		}

	}

	youkeClick() {
		window._guider.History.history.push({
			pathname: '/curriculum',
		});
	}

	liveClick() {
		window._guider.History.history.push({
			pathname: '/live',
		});
	}
}

export default HomeBody;
