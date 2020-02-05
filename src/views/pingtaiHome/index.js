import React, { Component } from 'react';
import { BackTop, Breadcrumb } from 'antd';
import VideoItem from './items/videoItem';
import TeachereItem from './items/teacherItem';
import { VideoLists, excellentTeacher } from '../../api/list';
import { listVideo } from '../../api/live';
import Lazyloaditem from './../../components/Lazyload';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import './index.less'

@inject('lazyLoad')
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
		console.log("平台类型>>>", sessionStorage.getItem('loginPlatformType'))
		return (
			<div className="pingtai">
				<BackTop visibilityHeight={200} />
				<Breadcrumb style={{ textAlign: 'left', paddingLeft: '1rem', marginBottom: '1rem' }}>
					<Breadcrumb.Item>
						<Link to="/personal">个人中心</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>{sessionStorage.getItem("loginPlatformName") ? sessionStorage.getItem("loginPlatformName") : ''}</Breadcrumb.Item>
				</Breadcrumb>
				{
					sessionStorage.getItem('loginPlatformType') != 'person' ?
						<div className="pingtai-youke">
							<div className="pingtai-youke_title">
								<span className="pingtai-youke_title_text">
									名师优课
						</span>
								<a className="pingtai-youke_title_handle" onClick={this.youkeClick.bind(this)}>
									更多>>
						</a>
							</div>
							<div className="pingtai-youke_content">
								<VideoItem
									current={this.state.CourseList.page}
									total={this.state.totalpa}
									jump={this.props.props}
									data={this.state.youkeList}
									loading={this.state.youkeLoading}
								/>
							</div>
						</div> : null
				}
				{
					sessionStorage.getItem('loginPlatformType') != 'person' ?
						<div className="pingtai-teacher">
							<div className="pingtai-teacher_title">
								<span className="pingtai-teacher_title_text">
									优秀教师
						</span>
								<a className="pingtai-teacher_title_handle">
									更多>>
						</a>
							</div>
							<div className="pingtai-teacher_content">
								<TeachereItem
									jump={this.props.props}
									data={this.state.teacherList}
									loading={this.state.teacherLoading} />
							</div>
						</div> : null
				}

				<div className="pingtai-live">
					<div className="pingtai-live_title">
						<span className="pingtai-live_title_text">
							直播
						</span>
						<a className="pingtai-live_title_handle" onClick={this.liveClick.bind(this)}>
							更多>>
						</a>
					</div>
					<div className="pingtai-live_content">
						<VideoItem
							current={this.state.CourseList.page}
							total={this.state.totalpa}
							jump={this.props.props}
							data={this.state.liveList}
							loading={this.state.liveLoading}
						/>
					</div>
				</div>
				<div className="pingtai-recource">
					<div className="pingtai-recource_title">
						<span className="pingtai-recource_title_text">
							时间排序
						</span>
						<a className="pingtai-recource_title_handle">

						</a>
					</div>
					<div className="pingtai-recource_content">
						<VideoItem
							current={this.state.CourseList.page}
							total={this.state.totalpa}
							jump={this.props.props}
							data={this.state.dataList}
							loading={this.state.dataLoading}
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
		this.lazyLoadingList({
			limit: 8,
			page: this.page
		});
	}

	getTeacherList(param = {
		limit: 6,
		page: 1,
	}) {
		excellentTeacher(param).then(res => {
			if (res && res.list) {
				this.setState({ teacherList: res.list || [], teacherLoading: false })
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
			console.log(res)
			if (res && res.list) this.setState({ liveList: res.list, liveLoading: false })
		}).catch(res => {
			console.log("服务器错误")
		})
	}

	lazyLoadingData() {
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
