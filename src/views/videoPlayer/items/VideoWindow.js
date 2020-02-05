// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Tabs, Input, message, Rate, List, Avatar, Notification } from 'antd';
import { observer } from 'mobx-react';
import { observable, toJS } from 'mobx';
import { KeepNotes, PullMake, pushScore, evaluationList, infoCourse } from './../../../api/video';
import { collection } from './../../../api/micro';
import collectImg from "./../../../assets/img/collect.png";
import uncollectImg from "./../../../assets/img/uncollect.png";
import {
	Player, LoadingSpinner, BigPlayButton, ControlBar, VolumeMenuButton,
	PlaybackRateMenuButton
} from 'video-react';
// 引入编辑器以及EditorState子模块
import BraftEditor, { EditorState } from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import HeadeTop from './../../../assets/img/touxiang.png';
const TabPane = Tabs.TabPane;
const { TextArea } = Input;


@observer
class VideoWindow extends Component {
	@observable url = null;
	@observable className = '';				//笔记标题		
	@observable editorState = null;		//笔记内容
	@observable score = 0;						//评分分数
	@observable scoreText = '';				//频分文本
	@observable evaluation = null;		//评分状态第一次null第二0
	@observable list = [];						//评论列表
	@observable total = null;						//总数
	@observable pages = 1;						//当前页数
	@observable stop = '1'; 						//初始化
	@observable collection = '1'; 						//初始化
	@observable activeKey = '1'; 						//初始化
	componentWillReceiveProps(nextProps) {
		if (nextProps.collectionType !== this.collection) {
			this.collection = nextProps.collectionType;
		}
		if (nextProps.videoInfo.length !== 0 && this.url !== nextProps.videoInfo.url) {
			this.url = nextProps.videoInfo.url;
			if (nextProps.stop === true) {
				this.stop = '1';
				this.refs.player.load();
			}
			if (window.sessionStorage.getItem('userType') !== 'student') {
				let token = nextProps.tokens;
				let id = nextProps.videoInfo.id;
				if (id !== 'undefined') {
					// setTimeout(()=>{
					this.pullList(token, '1', 3, id);
					// },3000);
				}
			}
		}
	}
	componentDidMount() {
		this.activeKey = window.sessionStorage.getItem('userType') != 'student' ? '3' : this.stop;
	}


	render() {
		return (
			<div className="video-left">
				{/* <Breadcrumb className="video-left-link" style={{textAlign:'left'}}>
					<Breadcrumb.Item>视频</Breadcrumb.Item>
					<Breadcrumb.Item>{this.props.videoInfo.name}</Breadcrumb.Item>

				</Breadcrumb> */}
				<div className="video-left-video">
					<div className="video-left-video-title">
						<span className="video-left-video-title-span1">{this.props.videoInfo.name}</span>
						<span className="video-left-video-title-span2">讲师：{this.props.videoInfo.teacher}&nbsp;&nbsp;&nbsp;</span>
						<span className="video-left-video-title-span3">上传时间：{this.props.videoInfo.addTime}</span>

						<span className="video-left-video-title-span4">评分：{this.props.videoInfo.score}分</span>
						{
							this.props.collectionType ?
								<a className="video-left-video-title-span5" onClick={this.handleCollect.bind(this, this.props.videoInfo.id)}>
									{
										this.collection === '1' ?
											<span><img src={collectImg} /> 已收藏</span>
											: <span><img src={uncollectImg} /> 未收藏</span>
									}

								</a>
								: null
						}

					</div>
					<Player
						autoPlay
						src={this.props.videoInfo.url}
						className="videoPlayer_container"
						ref="player">
						<LoadingSpinner />
						<BigPlayButton position="center"
						/>

						<ControlBar autoHide={false} >
							<VolumeMenuButton className="video-left-video-music" vertical />
							<PlaybackRateMenuButton
								rates={[5, 3, 1.5, 1, 0.5, 0.1]}
								order={7.1}
							/>
						</ControlBar>

					</Player>

				</div>

				<div className="video-left-comments">
					<Tabs
						onChange={(activeKey) => { this.switch(activeKey); }}
						size="large"
						animated={false}
						activeKey={this.activeKey}
					>
						{window.sessionStorage.getItem('userType') != 'student' ?
							null :
							<TabPane tab="课堂笔记" key="1">
								<div className="video-left-comments-comments">
									<div style={{ marginTop: '0.9rem', }}>
										<span style={{ marginLeft: '0.4rem' }}>
											笔记名称：
										</span>
										<Input
											maxLength={50}
											className="video-left-comments-name"
											onChange={(e) => { this.className = e.target.value; }} />
									</div>
									<div className="video-left-comments-div">
										<span className="video-left-comments-titme">笔记内容：</span>
										<BraftEditor
											style={{
												border: '1px solid #ddd', marginTop: '0.2rem', borderRight: 'none',
												borderLeft: 'none'

											}}
											value={this.editorState}
											onChange={this.handleEditorChange}
											// onSave={this.submitContent}
											media={{
												image: false
											}}
											// value={this.editorState}
											// onVlear={this.Delete}
											controls={['undo', 'redo', 'separator',
												'font-size', 'line-height', 'letter-spacing', 'separator',
												'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
												'superscript', 'subscript', 'remove-styles', 'text-align', 'separator',
												'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
												'link', 'separator', 'separator',
												'media', 'separator',
												'clear']}
										/>
										<Button
											className="video-left-comments-btn" type="primary"
											onClick={this.Update}>
											保存笔记</Button>
										<div className="clear"></div>
									</div>
								</div>
							</TabPane>}


						{window.sessionStorage.getItem('userType') != 'student' ?
							null : <TabPane tab="课堂评价" key="2">
								<div className="video-left-comments-score">
									<div className="video-left-comments-top">
										<span className="video-left-comments-span">评分：</span>
										<Rate
											onChange={(number) => { this.score = number; }}
											// allowHalf 
											value={this.score} />
									</div>
									<div className="video-left-comments-texts">
										<span>我有话说：</span>
										<TextArea
											maxLength={300}
											className="video-left-comments-textInput"
											value={this.scoreText}
											onChange={(v) => { this.scoreText = v.target.value; }}
											rows={4} />
										<div className="clear"></div>
									</div>

									<Button
										className="video-left-comments-btn"
										type="primary"
										onClick={this.reviewWhee}
									>发表评论</Button>
									<div className="clear"></div>

								</div>
							</TabPane>}


						<TabPane tab="全部评论" key="3">
							{/* {console.log(toJS(this.list))} */}
							<div className="video-left-comments-list">
								<div className="video-left-comments-list-div">
									<span className="video-left-comments-list-span">全部评价({this.total})</span>
								</div>
								<List
									// itemLayout="horizontal"
									dataSource={toJS(this.list)}
									locale={{
										emptyText: '暂无评价'
									}}
									pagination={toJS(this.list).length === 0 ? null : {
										total: this.total,
										pageSize: 3,
										hideOnSinglePage: true,
										onChange: (page) => {
											let token = this.props.tokens;
											let id = this.props.videoInfo.id;
											this.pullList(token, page, 3, id);
										},
									}}
									renderItem={(item) => {
										return (
											<List.Item>
												<div className="list">
													<div className="list-left">
														<div>
															<Avatar src={HeadeTop} />
														</div>
														<span>
															{item.name}
														</span>
													</div>
													<div style={{ float: 'left', marginLeft: '1rem', marginRight: '1rem' }}>
														<span className="list-comment">{item.comment}</span>
													</div>
													{/* <div className="clear"></div> */}

													<div style={{ float: 'right', display: 'flex', flexDirection: 'column' }}>
														{
															item.score ?
																<span><Rate disabled value={item.score} /><span>{item.score}分</span></span>
																: null
														}
														<span className="list-right">发表时间：{item.addTime}</span>
													</div>
													{/* <div className="clear"></div> */}
												</div>
											</List.Item>

										);
									}}
								/>
							</div>
						</TabPane>

					</Tabs>
				</div>
			</div>
		);
	}

	handleCollect(id) {
		this.collection === '0' ? (this.collection = '1') : (this.collection = '0')
		collection({ id, type: this.collection }).then(res => {
			const args = {
				message: '提示！',
				description: res.msg,
				duration: 2,
			};
			return Notification.info(args);
		})
	}

	//评论
	reviewWhee = async () => {
		console.log("评论列表")
		let score = this.score;
		let comment = this.scoreText;
		let token = this.props.tokens;
		let mediaFileId = this.props.videoInfo.id;
		let teacherId = this.props.videoInfo.teacherId;
		let id = this.evaluation;
		if (comment !== '' && typeof (comment) !== 'undefined' && comment !== null) {
			try {
				let data = await pushScore(token, score, comment, mediaFileId, id, teacherId);
				// console.log(data);
				if (data.code === 0) {
					message.success(data.msg);
					// let token = this.props.tokens;
					// let id = this.props.videoInfo.id;
					// this.pullScreen(id, token);
					this.switch("3")
					this.scoreText = null;
					this.score = null;
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			message.warning('请填写评价内容');
		}

	}
	//富文本
	handleEditorChange = (editorState) => {
		// console.log(editorState);
		this.editorState = editorState;
	}
	//上传笔记
	Update = async () => {
		let editorState = this.editorState.toHTML();
		// console.log(editorState);
		let name = this.className;
		let token = this.props.tokens;
		let id = this.props.videoInfo.id;
		console.log(id);
		if (this.className !== null && this.className !== '' && typeof (this.className) !== 'undefined') {
			if (editorState !== '<p></p>') {
				let data = await KeepNotes(token, name, editorState, id);
				console.log(data);
				if (data.code === 0) {
					message.success(data.msg);
				}
			} else {
				message.warning('请填写笔记内容');

			}
		} else {
			message.warning('请填写笔记名称');

		}
	}
	//切换
	switch = (e) => {
		this.stop = e;
		// console.log(e);
		let token = this.props.tokens;
		let id = this.props.videoInfo.id;
		this.activeKey = e;
		if (e === '2') {
			console.log('1');
			this.pullScreen(id, token);
		} else if (e === '3') {
			this.pullList(token, '1', 3, id);
		}
	}
	//2 
	pullScreen = async (id, token) => {
		try {
			let data = await PullMake(id, token);
			// console.log(data);
			if (data.code === 0) {
				this.evaluation = data.data.id;
			}
		} catch (error) {
			console.log(error);
		}
	}
	//3
	pullList = async (token, page, number, mediaFileId) => {
		if (!mediaFileId) {
			const args = {
				message: '提示！',
				description: "查询参数不存在！",
				duration: 2,
			};
			return Notification.error(args);
		}
		try {
			let data = await evaluationList(token, page, number, mediaFileId);
			// console.log(data);
			if (data) {
				// console.log(data);
				this.list = data.list;
				this.total = data.totalCount;
			}
		} catch (error) {
			console.log(error);
		}
	}



	Updata = () => {
		let tokens = window.sessionStorage.getItem('token') || '';

		let fd = new FormData();
		fd.append('token', tokens);
		fd.append('classId', 19);
		// 创建XMLHttpRequest对象
		let xhr = new XMLHttpRequest();
		// console.log(xhr);
		// 调用open方法准备ajax请求
		xhr.open('get', 'http://192.168.0.104:8099/resource/attendclasses/findPPT?token=' + tokens + '&classId=19', true);
		// xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		// 绑定onprogress事件
		xhr.upload.onprogress = evt => {

		};
		console.log(xhr);

		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4) {
				// let data = JSON.parse(xhr.responseText);

				console.log(xhr.responseText);
			}
		};
		// 发送ajax请求
		xhr.send(null);
	}

}


export default VideoWindow;
