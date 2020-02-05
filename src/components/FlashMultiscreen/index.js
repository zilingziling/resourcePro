import React, { Component } from 'react'
import swfobject from 'swfobject'
import('./index.less')
export default class index extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        urlArr: [],
        flashVideo: window.location.origin + "/SinglePlayer.swf?debug=true"
    }
    static getDerivedStateFromProps(prevProps, prevState) {
        if (prevProps.flashUrl !== prevState.urlArr) {
            return {
                urlArr: prevProps.flashUrl
            };
        }
        return null
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.urlArr !== this.props.flashUrl) {
            this.initVideo(prevState.urlArr)
        }
    }
    componentDidMount() {
    }
    initVideo(urlArr) {
        // console.log("视频初始化>>>",this.props.flashUrl)
        YJFPlayerUrl.HWFlashPlayer = this.props.flashUrl;
        console.log(YJFPlayerUrl)
        setTimeout(() => {
            // console.log("执行初始化操作>>>>")
            YjFPlayer.onPlay('HWFlashPlayer');
        }, 0)
    }
    render() {
        return (
            <div className="flashplayer-container-video">
                <object classID="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="HWFlashPlayerIE">
                    <param name="movie" value={this.state.flashVideo} />
                    <param name="quality" value="high" />
                    <param name="bgcolor" value="#000000" />
                    <param name="allowScriptAccess" value="always" />
                    <param name="allowFullScreen" value="true" />
                    <param name="wmode" value="window" />
                    <object type="application/x-shockwave-flash" data={this.state.flashVideo} id="HWFlashPlayer">
                        <param name="quality" value="high" />
                        <param name="bgcolor" value="#000000" />
                        <param name="allowScriptAccess" value="always" />
                        <param name="allowFullScreen" value="true" />
                        <param name="wmode" value="window" />
                        <p>
                            Either scripts and active content are not permitted to run or Adobe Flash Player version
                            10.0.0 or greater is not installed.
                        </p>
                        <a href="http://www.adobe.com/go/getflashplayer">
                            <img
                                src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif"
                                alt="Get Adobe Flash Player"
                            />
                        </a>
                    </object>
                </object>
                {/* <a onClick={this.initVideo.bind(this)}>播放</a> */}
            </div >
        )
    }
}
