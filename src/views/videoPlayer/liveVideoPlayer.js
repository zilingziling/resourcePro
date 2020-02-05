//@flow

import React, { Component } from 'react';
import Api from '../../api';
import { observer, inject } from 'mobx-react';
import HLSSource from '../../components/hls';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import CssTransition from './../../components/Transition';
import {
	Player,
	LoadingSpinner,
	BigPlayButton,
	ControlBar,
	VolumeMenuButton,
} from 'video-react';
import('./liveVideoPlayer.scss');

@inject('Videos')
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
	};
	componentDidMount() {
		this.props.Videos.SURCCESSMEDIA(this.props.location.state.id);
		if (this.props.location.state.id) {
			this.setState({ id: this.props.location.state.id });
			this.info(this.props.location.state.id);
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
						<Breadcrumb.Item style={{color:'#026dff'}}>{this.props.location.state.teacher}</Breadcrumb.Item>
					</Breadcrumb>
					<div className="live-center" style={this.props.Videos.NETWO === true ? { display: 'none' } : null}>
						<div className="live-title">
							<div className="live-title-left">
								<span style={{marginRight:'5rem',fontSize:'1rem',letterSpacing:'2px'}}>{this.props.location.state.name}</span>
								<span>
									教师:{this.props.location.state.teacher}
								</span>
							</div>
							<div className="live-title-right">
								<span>开播时间：{this.props.location.state.addTime}</span>
							</div>
						</div>
						<div className="live_centen">
							<div className="live_centen-left">
								<Player
									autoPlay
									// aspectRatio="16:9"
									fluid={false}
									width={'100%'}
									height={495}
									className="live_centen-left-video"
								//设置false 可以自己定义宽度高度，  如果想要视屏支持的那么就关闭视屏自己计算
								// poster="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2395352930,1504332986&fm=173&app=25&f=JPEG?w=218&h=146&s=F0330274021149D40282244D030070FA"
								>
									<HLSSource
										id={this.props.location.state.id}
										isVideoChild
										ref={instance => { this.child = instance; }}
										src={this.state.desktop + '&rnd=' + Math.floor(Math.random() * (1 - 1000000) + 1000000)}
									/>
									<LoadingSpinner />
									<BigPlayButton position="center"
									/>
									{/* <ControlBar
										className="my-class"
										disableDefaultControls			//禁止下面按钮样式
									>
										<VolumeMenuButton vertical />
									</ControlBar> */}
								</Player>


							</div>
							<div className="live_centen-right">
								<div
									className="live_centen-right-top" // onClick={this.tops}
								>
									{this.state.teacher !== '' ?
										<Player
											fluid={false}
											width={'100%'}
											height={'100%'}
											ref="right1"
											autoPlay>
											<HLSSource
												isVideoChild
												src={this.state.teacher + '&rnd=' + Math.floor(Math.random() * (1 - 1000000) + 1000000)}
											/>
											<BigPlayButton position="center" />
										</Player>
										: null}
								</div>

								<div
									className="live_centen-right-bottom" //onClick={this.bootoms}
								>
									{this.state.student !== '' ?
										<Player
											fluid={false}
											width={'100%'}
											height={'100%'}
											ref="right2"
											autoPlay>
											<HLSSource

												isVideoChild
												src={this.state.student + '&rnd=' + Math.floor(Math.random() * (1 - 1000000) + 1000000)}
											/>
											<BigPlayButton position="center" />
										</Player>
										: null}
								</div>
							</div>
						</div>
					</div>

					<div className="live-centers" style={this.props.Videos.NETWO === false ? { display: 'none' } : null}>
						{/* <img src={require('./../../assets/img/liveViodeError.png')} /> */}
						<div className="live-center-error">
							<img src={require('./../../assets/img/end.png')} />
							{this.props.Videos.name === null ?
								<a onClick={this._pushLogin.bind(this)} href={null} className="live-center-error-span">课堂已下课,直播关闭。查看更多直播</a>
								: <a onClick={this.reconnection.bind(this)} href={null} style={{ marginLeft: '10px', color: '#fff' }}>网络加载错误，请检查网络</a>
							}
						</div>
					</div>

				</div>
			</div>
			</CssTransition>
		);
	}
	_pushLogin = () => { window._guider.History.history.push({ pathname: '/live', }); }
	_check = () => {
		this.child.wrappedInstance.refresh();
	}
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
		try {
			this.setState({
				teacher: res.teacher,
				desktop: res.desktop,
				student: res.student,
			});
		} catch (error) {
			console.log(error);
		}


		// console.log(res);
	};
}

export default LiveVideo;
