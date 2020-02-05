import React, { Component } from 'react';
import VideoWindow from './items/VideoWindow';
import { infoCourse } from './../../api/video';
import { microDetail } from './../../api/micro';
import VideoBar from './items/VideoBar';
import { observer } from 'mobx-react';
import { observable, toJS } from 'mobx';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import CssTransition from './../../components/Transition';
import('./videos.scss');
import('./videos.less');
@observer
class VideoDetails extends Component {
	@observable name = ''
	@observable infos = [];
	@observable listView = [];
	@observable stopVieo = false;
	@observable file = [];
	@observable collectionType = '';
	constructor(props) {
		super(props)
		this.state = {
			video_detail: {}
		}
	}
	componentDidMount() {
		try {
			this.name = window.sessionStorage.getItem('userName');
			let tokens = window.sessionStorage.getItem('token') || '';
			if (this.props.location.state.classType === "micro") {
				this.microInfo(this.props.location.state.id)
			} else {
				this.info(this.props.location.state.id, tokens);
			}
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<CssTransition>
				<div className="video-body">
					<Breadcrumb style={{ textAlign: 'left', paddingLeft: '1rem', marginBottom: '.5rem' }}>
						<Breadcrumb.Item>
							{
								this.props.location.state.classType === "micro" ?
									<Link to="/micro">微课堂</Link>
									: <Link to="/curriculum">课程中心</Link>
							}
						</Breadcrumb.Item>
						<Breadcrumb.Item style={{ color: '#026dff' }}>
							{
								this.props.location.state.classType === "micro" ?
									'微课播放'
									: '课程播放'
							}
						</Breadcrumb.Item>
					</Breadcrumb>
					<div className="video-center">
						<VideoWindow
							tokens={window.sessionStorage.getItem('token') || ''}
							videoInfo={toJS(this.infos)}
							stop={this.stopVieo}
							collectionType={this.collectionType}
						/>
						{/* <div className="clear"></div> */}
						{/* {console.log(this.id)} */}
						<VideoBar
							ID={this.props}
							onClick={(e) => { this.listVideo(e); }}
							props={this.props}
							list={toJS(this.listView)}
							file={toJS(this.file)}

							video_detail={this.state.video_detail}
						/>
						<div className="clear"></div>
					</div>
				</div>
			</CssTransition>
		);
	}
	listVideo = (e) => {
		// console.log(e);
		this.stopVieo = true;
		let tokens = window.sessionStorage.getItem('token') || '';
		this.name = window.sessionStorage.getItem('userName');
		if (this.props.location.state.classType === "micro") {
			this.microInfo(e.id)
		} else {
			this.info(e.id, tokens);
		}
	}
	microInfo = async (id) => {
		try {
			let res = await microDetail(id);
			this.infos = res.data.detail[0];
			this.setState(() => {
				return ({ video_detail: res.data.detail[0] })
			})
			this.listView = res.data.recommend;
			this.file = res.data.file || [];
			this.collectionType = res.data.type;
		} catch (error) {
			console.log(error);

		}
	}
	info = async (id, tokens) => {
		try {
			let data = await infoCourse(id, tokens);
			console.log(data);
			this.infos = data.detail[0];
			this.setState(() => {
				return ({ video_detail: data.detail[0] })
			})
			this.listView = data.recommend;
			this.file = data.file || [];
			this.collectionType = data.type;
		} catch (error) {
			console.log(error);

		}
	}
}

export default VideoDetails;
