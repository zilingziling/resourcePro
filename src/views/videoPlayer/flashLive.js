//@flow

import React, { Component } from 'react';
import Api from '../../api';
import { observer, inject } from 'mobx-react';
import FlashMultiscreen from '../../components/FlashMultiscreen';
import XiaoYiPlayer from '../../components/XiaoYiPlayer';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import CssTransition from './../../components/Transition';
import { toJS } from 'mobx';
import('./liveVideoPlayer.scss');

@inject('Videos', 'im')
@observer
class LiveVideo extends Component {
	constructor(props) {
		super(props);
		this.child = React.createRef();
	}
	state = {
		searchValue: '',
		pages: 1,
		course: '',
		teacherld: '',
		dataList: [],
		teacher: '', //老师
		desktop: '', //桌面
		student: '', //学生
		id: null,
		classroomId: "",
		urlArr: [],
		empty: false,
		classroomType: ""
	};
	componentDidMount() {
		this.props.Videos.SURCCESSMEDIA(this.props.location.state.id);
		if (this.props.location.state.id) {
			this.setState({ id: this.props.location.state.id, classroomId: this.props.location.state.classroomId });
			this.info(this.props.location.state.id);
		}
	}
	static getDerivedStateFromProps(prevProps, prevState) {
		let classroomIdArr = [];
		let classroomType = prevProps.im.IMInfo.status || ""
		if (prevProps.im.IMInfo.classroomId) {
			classroomIdArr = toJS(prevProps.im.IMInfo.classroomId)
		}
		if (classroomIdArr.length) {
			//视频关闭的处理
			if ((classroomType == "off" || classroomType == "offLive") && classroomIdArr.indexOf(prevState.classroomId) > -1) {
				return {
					empty: true,
					classroomType
				}
			}
			//视频重新打开暂不做处理
			// if (classroomType == "on" && classroomIdArr.indexOf(prevState.classroomId) > -1) {
			// 	return {
			// 		empty: false,
			// 		classroomType
			// 	}
			// }
		}
		if (classroomType == "change") {
			return {
				empty: true,
				classroomType
			}
		}
		return null
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.empty && prevProps.im.IMInfo.classroomType === "on") {
			setTimeout(() => {
				this.info(prevState.id);
			}, 3000)
		}
	}
	render() {
		return (
			<CssTransition>
				<div className="live-video">
					<div className="live-body">
						{/* <a onClick={this._check}>	{String(this.props.Videos.NETWO)}</a> */}
						<Breadcrumb className="video-left-link" style={{ textAlign: 'left', marginBottom: '.5rem' }}>
							<Breadcrumb.Item><Link to="/live">视频直播</Link></Breadcrumb.Item>
							<Breadcrumb.Item style={{ color: '#026dff' }}>{this.props.location.state.teacher}</Breadcrumb.Item>
						</Breadcrumb>
						<span style={{ position: "fixed", top: "-100%" }}>{this.props.im.IMInfo.msg}</span>
						<div className="live-center" style={this.state.empty ? { display: 'none' } : null}>
							<div className="live-title">
								<div className="live-title-left">
									<span style={{ marginRight: '5rem', fontSize: '1rem', letterSpacing: '2px' }}>{this.props.location.state.name}</span>
									<span>
										教师:{this.props.location.state.teacher}
									</span>
								</div>
								<div className="live-title-right">
									<span>开播时间：{this.props.location.state.addTime}</span>
								</div>
							</div>
							<div className="live_centen">
								{/* <XiaoYiPlayer></XiaoYiPlayer> */}
								<FlashMultiscreen flashUrl={this.state.urlArr}></FlashMultiscreen>
							</div>
						</div>

						<div className="live-centers" style={this.state.empty ? null : { display: 'none' }}>
							{/* <img src={require('./../../assets/img/liveViodeError.png')} /> */}
							<div className="live-center-error">
								<img src={require('./../../assets/img/end.png')} />
								{this.state.classroomType !== "change" ?
									<a onClick={this._pushLogin.bind(this)} href={null} className="live-center-error-span">课堂已下课,直播关闭。查看更多直播</a>
									: <a onClick={this._pushLogin.bind(this)} href={null} style={{ marginLeft: '10px', color: '#fff' }}>主讲端发生切换，视频播放结束</a>
								}
							</div>
						</div>
					</div>
				</div>
			</CssTransition >
		);
	}
	_pushLogin = () => { window._guider.History.history.push({ pathname: '/live', }); }
	_check = () => {
		this.child.wrappedInstance.refresh();
	}
	VerifyLive() { }
	//重连视屏
	reconnection = async () => {
		if (navigator.onLine) {
			let res = await Api.Live.liveStatus(this.state.id, window.sessionStorage.getItem('token') || '');
			if (res.code === 0) {
				this.props.Videos.SURCCESSMEDIA();
				this.info(this.state.id);
			} else if (res.code === 1) {
				window._guider.History.history.push({
					pathname: '/live',
				});
				window._guider.Utils.alert({
					message: res.msg,
					type: 'warning',
				});
			} else {

				window._guider.Utils.alert({
					message: res.msg,
					type: 'error'
				});
			}
		} else {
			window._guider.Utils.alert({
				message: '网络连接错误，请检查网络后点击从新加载',
				type: 'warning'
			});
		}
	}
	bootoms = () => {
		// let home = this.homeVideo;
		// let bottom = this.bottomVide;
		// // console.log(home);
		// // console.log(bottom);
		// this.bottomVide = home;
		// this.homeVideo = bottom;
	};
	//主屏幕
	tops = () => {
		// let home = this.homeVideo;
		// let top = this.topVideo;
		// this.topVideo = home;
		// this.homeVideo = top;
	};

	//信息
	info = async (id) => {
		let token = window.sessionStorage.getItem('token') || '';
		let ID = id;
		let res = await Api.Live.liveInfo(ID, token);
		let urlArr = [
			{
				url: res.movie,
				title: ''
			}
		]
		try {
			this.setState({
				// urlArr: [res.teacher, res.desktop, res.student]
				urlArr
			});
		} catch (error) {
			console.log(error);
		}


		// console.log(res);
	};
}

export default LiveVideo;
