import React, { Component } from 'react';
import 'xgplayer';
import FlvPlayer from 'xgplayer-flv';

export default class index extends Component {

    componentDidMount() {
        let player = new FlvPlayer({
            id: 'mse',
            isLive: true,
            playsinline: true,
            lang: 'zh-cn',
            url: 'http://172.16.3.155:65001/avstream.flv?roomid=1&chairid=4952&type=Movie&fmt=flv',
            autoplay: true,
            height: 600,
            width: window.innerWidth
        });
    }
    render() {
        return (
            <div id="mse"></div>
        )
    }
}
