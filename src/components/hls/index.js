import React, { Component } from 'react';
import Hls from 'hls.js';
import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';

@inject('Videos')
@observer
class HLSSource extends Component {
	// @observable id = null;
	constructor(props, context) {
		super(props, context);
		this.hls = new Hls();
		this.refresh = this.refresh.bind(this);
	}

	componentDidMount() {
		// console.log(this.props.id);
		// console.log(this.props);
		// this.props.onRef();
		// `src` is the property get from this component
		// `video` is the property insert from `Video` component
		// `video` is the html5 video element
		const { src, video } = this.props;
		// load hls video source base on hls.js
		if (Hls.isSupported()) {
			this.hls.loadSource(src);
			this.hls.attachMedia(video);
			this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
				video.play();
			});
		}
		// //判断网络问题， 如果下课和网络错误在这里处理
		this.hls.on(Hls.Events.ERROR, this.onLevelLoaded);
		// this.hls.on(Hls.Events.ERROR, this.MediaErrors);
	}
	componentDidUpdate(prevProps, prevState) {
		// console.log(prevProps);
		// console.log(this.props.src);
		// console.log('start');
		const { src, video } = this.props;
		if (prevProps.src !== src) {
			console.log('刷新');
			this.hls.loadSource(src);
			this.hls.attachMedia(video);
			this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
				video.play();
			});
		}

	}
	//刷新加载视频
	refresh = () => {
		//处理从新拉去流
		this.hls.off(Hls.Events.ERROR, this.onLevelLoaded);  //来停止监听
		let Time = setTimeout(() => {
			this.props.Videos.NETWORKERROR(true);
			clearTimeout(Time);
		}, 4000);
	}
	//网络错误时候处理
	onLevelLoaded = (event, data) => {
		switch (data.type) {
			case Hls.ErrorTypes.NETWORK_ERROR:
				console.log('尝试重新拉取直播流动');
				// 试图恢复网络错误 
				//回复过后来处理直播会报错 由于超时而导致片段加载失败时引发 从新来来拉去直播流动  定时器来判断超过5秒就处理从新拉流
				this.hls.startLoad();
				break;
			case Hls.ErrorTypes.MEDIA_ERROR:
				console.log('媒体错误');
				//媒体遇到错误
				// this.props.Videos.MEDIAERROR('媒体遇到错误');
				this.hls.recoverMediaError();
				break;
			default:
				// 无法恢复 处理
				console.log('无法恢复 处理');
				// this.hls.destroy();
				break;
		}
		switch (data.details) {
			case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
				console.log('由于网络错误导致清单加载失败时引发');
				break;
			case Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT:
				console.log('由于超时而导致清单加载失败时引发');
				break;
			case Hls.ErrorDetails.LEVEL_LOAD_ERROR:
				console.log('由于网络错误导致级别加载失败时引发');
				break;
			case Hls.ErrorDetails.LEVEL_LOAD_TIMEOUT:
				console.log(' 由于超时而导致级别加载失败时引发');
				break;
			case Hls.ErrorDetails.FRAG_LOAD_ERROR:
				console.log(' 由于网络错误导致片段加载失败时引发');
				this.refresh();
				break;
			case Hls.ErrorDetails.FRAG_LOAD_TIMEOUT:
				console.log('由于超时而导致片段加载失败时引发');
				break;
		}
	}
	// 媒体错误时候处理
	MediaErrors = (event, data) => {
		switch (data.details) {
			case Hls.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR:
				console.log('清单仅包含与MediaSource Engine不兼容的编解码器的质量级别时引发');
				break;
			case Hls.ErrorDetails.FRAG_DECRYPT_ERROR:
				console.log('片段解密失败时引发');
				break;
			case Hls.ErrorDetails.BUFFER_ADD_CODEC_ERROR:
				console.log('当MediaSource无法添加新的sourceBuffer时引发');
				break;
			case Hls.ErrorDetails.BUFFER_APPEND_ERROR:
				console.log('在调用缓冲区追加时引发异常时引发');
				break;
			case Hls.ErrorDetails.BUFFER_APPENDING_ERROR:
				console.log('在缓冲区追加期间引发异常时引发');
				break;
			case Hls.ErrorDetails.BUFFER_STALLED_ERROR:
				console.log('由于缓冲区数据耗尽而导致播放停止时引发');
				break;
			case Hls.ErrorDetails.BUFFER_FULL_ERROR:
				console.log('媒体缓冲区中没有数据可以再添加时，引发它，因为它已满。通过减少最大缓冲区长度来恢复此错误。');
				break;
			case Hls.ErrorDetails.BUFFER_SEEK_OVER_HOLE:
				console.log('在hls.js寻找一个缓冲孔以解开播放之后提出');
				break;
			case Hls.ErrorDetails.BUFFER_NUDGE_ON_STALL:
				console.log('尽管currentTime位于缓冲区域，但在播放被卡住时引发');
				break;
			case Hls.ErrorDetails.REMUX_ALLOC_ERROR:
				console.log('在重新加载期间内存分配失败时引发');
				break;
		}
	}
	componentWillUnmount() {
		// destroy hls video source
		if (this.hls) {
			this.hls.destroy();
		}
	}

	render() {
		return (
			<source
				src={this.props.src}
				type={this.props.type || 'application/x-mpegURL'}
			/>
		);
	}
}
export default HLSSource;