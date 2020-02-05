import React, { Component } from 'react';
import { Modal, Tooltip,Notification } from 'antd';
import BOOK from './../../../assets/img/book.png';
import HAOKE from './../../../assets/img/lightning.png';
import TeacherCenter from './TeacherCenter';
import { observer } from 'mobx-react';
import { observable, toJS } from 'mobx';
// import { preview } from './../../../api/video';
@observer
class VideoBar extends Component {
	@observable imgs = '';
	@observable sele = null;
	@observable stylea = null;

	state = {
		previewModalWidth: 1000,
		previewModalHeight: 600,
		previewVisible: false,
		previewSrc: '/resource/image/活动方案.pdf'
	}
	// @observable listImg = [];
	componentDidMount() {
		// this.listimgs(this.props.props.location.state.classId);
	}
	render() {
		return (
			<div className="video-right">
				{
					// sessionStorage.getItem('userType') === 'student'
					//     ? <TeacherCenter video_detail={this.props.video_detail} />
					//     : ''
				}
				<TeacherCenter video_detail={this.props.video_detail} />
				{/* {this.props.PPt.length !== 0 ? */}
				<div className="video-right-file" style={{ display: this.props.file.length ? "" : "none" }}>
					<div className="video-right-imgs">
						<img className="video-right-img" src={BOOK} />
						<span className="video-right-span">资源文件</span>
					</div>
					<div className="video-right-filelist">
						{
							this.props.file.map((item, index) => {
								return (
									<div className="video-right-filelist_item" key={index}>
										<a onClick={this.preview.bind(this, item)}>《{item.file || ''}》</a>
										<button onClick={this.download.bind(this, item.name)}>下载</button>
									</div>
								)
							})
						}
					</div>
				</div>
				{/* 	: null
				} */}
				<div className="video-right-list">
					<div className="video-right-imgs">
						<img className="video-right-img" src={HAOKE} />
						<span className="video-right-span">好课推荐</span>
					</div>
					{/* {console.log(this.props.list)} */}
					<div className="video-right-list-div">
						{this.props.list.length !== 0 ?
							this.props.list.map((e, index) => {
								return (
									<div className="video-right-list-div-p" key={index} >
										{/* <img src={this.sele === index? SL : null}  style={{marginRight:'1rem'}}/> */}
										<Tooltip
											placement="right"
											title={e.name.length >= 15 ? e.name : null}
										>
											<a
												style={this.stylea === index ? { color: null } : null}
												href="javascript:void(0)"
												onClick={() => { this.clicks(e, index); }}
												// style={this.sele === index ?{ color:'#4993f0', fontWeight:'1rem',marginLeft:'-5px'}: null}
												className="video-right-list-div-a">
												{/* {e.name} */}
												{e.name.length > 16 ? e.name.substr(0, 16) + '...' : e.name}
											</a>
										</Tooltip>

									</div>
								);
							})
							: null}
					</div>
				</div>
				<Modal
					className="preview_modal"
					title="预览文件"
					maskClosable={false}
					width={this.state.previewModalWidth}
					height={this.state.previewModalHeight}
					visible={this.state.previewVisible}
					footer={null}
					destroyOnClose
					onCancel={this.handleCancel.bind(this)}>
					{/* <PdfPreview></PdfPreview> */}
					<embed width="100%" height="100%" src={this.state.previewSrc}></embed>
					{/* <iframe src="/resource/image/活动方案.pdf"></iframe> */}
				</Modal>

			</div>
		);
	}

	// listimgs = async(id: number) => {
	// 	let tokens =  window.sessionStorage.getItem('token') || '';
	// 	if(id !== null){
	// 		try {
	// 			let data = await preview(tokens, id);
	// 			if(data.code === 0){
	// 				this.listImg = data.data;
	// 			}
	// 			// console.log(data);
	// 		} catch (error){
	// 			console.log(error);
	// 		}
	// 	}
	// }
	clicks = (e, index) => {
		this.stylea = index;
		this.props.onClick(e);
		this.sele = index;
	}
	handleCancel() {
		this.setState({ previewVisible: false })
	}

	preview(item) {
		const filename = item.pdfUrl
		console.log(filename)

		if (!filename) {
			Notification.info({
				message: '提示！',
				description: "该文件暂不支持预览！",
				duration: 2,
			})
			return
		};
		window.open(window.location.origin + filename, "文件预览")
		// this.setState({ previewSrc: filename, previewVisible: true, previewModalWidth: window.innerWidth - 10, previewModalHeight: window.innerHeight - 72 })
	}

	download(filename) {
		window.open(window.location.origin + `/resource/file/download?filename=${filename}&token=${window.sessionStorage.getItem('token') || ''}`)
	}
}

export default VideoBar;
