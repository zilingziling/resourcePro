
import React, { Component } from 'react';
// import LiveItem from './../../components/SelectItem';
import Video from './items/listLive';
import { Layout, Dropdown, Icon, Menu } from 'antd';
import { listVideo, } from './../../api/live';
import Lazyloaditem from './../../components/Lazyload';
import { observer, inject } from 'mobx-react';
import CssTransition from './../../components/Transition';
// import('./live.scss');
import('./index.less');
const { Content } = Layout;

@inject('lazyLoad', 'routerStore')
@observer
class LiveVideo extends Component {
	state = {
		searchValue: '',		//搜索
		pages: 1,
		course: '',
		teacherld: '',
		dataList: [],
		courseType: '',
		loading: false,
		sortText: '时间排序'
	}
	page = 1
	componentWillReceiveProps(nextProps) {
		if (nextProps) {
			// let param = Object.assign({}, this.state.CourseList, { keyword: nextProps.props.location.params, page: 1, });
			// this.list(param);
			// this.setState({ CourseList: param });
		}
	}
	componentDidMount() {
		this.lazyLoadingList(this.page);
	}

	render() {
		const menu = (
			<Menu onClick={this.sortlistupdate.bind(this)}>
				<Menu.Item key='时间排序'>
					时间排序
                </Menu.Item>
				{/* <Menu.Item key='评分排序'>
                    评分排序
                </Menu.Item> */}
			</Menu>
		);
		return (
			<CssTransition>
				<div className="live_body">
					{/* <Breadcrumb separator=">">
					<Breadcrumb.Item>首页</Breadcrumb.Item>
					<Breadcrumb.Item href="">视频直播</Breadcrumb.Item>
				</Breadcrumb> */}
					<Layout className="live_layout">
						<Content className="live_main">
							<div className="live_content_sort">
								<Dropdown overlay={menu}>
									<a className="ant-dropdown-link" href="#">
										{this.state.sortText}<Icon type="down" />
									</a>
								</Dropdown>
							</div>
							<div className="live_content_title">找到如下直播课程>></div>
							{this.state.dataList.legnth !== 0 ?
								<Video
									data={this.state.dataList}
									jump={this.props}
									loading={this.state.loading}
									liveType={2}
								/>
								: null
							}
							{
								this.state.dataList.length > 0 ?
									<Lazyloaditem lazyList={v => { this.lazyLoadingData(v); }} />
									: null
							}
						</Content>
					</Layout>
				</div>
			</CssTransition>
		);
	}

	sortlistupdate(obj) {
		this.setState({ sortText: obj.key })
	}

	lazyLoadingData() {
		if (this.props.routerStore.GlobalRouter != "/live") return
		if (!this.props.lazyLoad.lazyEnd) {
			this.page = this.page + 1;
		}
		let value, id, code;
		this.lazyLoadingList(this.page, value, id, code)
	}

	async lazyLoadingList(page, value = '', id = '', code = '') {
		try {
			// console.log("直播中心滚动加载>>>>>>")
			let data = await listVideo(page, value, id, code);
			this.props.lazyLoad.lazyEnd = false;
			if (data && !data.list.length) this.props.lazyLoad.lazyEnd = true;
			let list = this.state.dataList.concat(data.list);
			this.setState({ dataList: list });
			this.props.lazyLoad.lazyLoading = false;
		} catch (error) {
			console.log("服务器错误")
		}

	}
}

export default LiveVideo;