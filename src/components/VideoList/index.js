import React, { Component } from 'react';
// import { observer, inject, } from 'mobx-react';
// import { observable, toJS, } from 'mobx';
import { List, Card, Button, Modal, Icon } from 'antd';
import dataBackground from './../../assets/img/databackground.png';
import './index.less'
const confirm = Modal.confirm;
class VideoList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="video-body-list-div-list">
                <div className="video-body-list-div-list-style">
                    {this.props.dataList && this.props.dataList.length !== 0 ?

                        <List
                            grid={{ gutter: 24, md: 1, lg: 2, xl: 3, xxl: 4 }}
                            dataSource={this.props.dataList}
                            locale={{
                                emptyText: '暂无数据'
                            }}
                            renderItem={(item, index) => {
                                let urls;
                                if (this.props.liveType == 1) {
                                    urls = require('./../../assets/img/un-img.png');
                                    if (item && item.imageUrl && item.imageUrl.indexOf('null') == -1) urls = item.imageUrl;
                                }
                                if (this.props.liveType == 2) {
                                    urls = require('./../../assets/img/live.png');
                                }
                                return (
                                    <List.Item>
                                        <Card
                                            style={{ width: 278, zIndex: 999, margin: 'auto' }}
                                            onClick={() => {
                                                let path;
                                                this.props.liveType == 1 ? path = '/video' : path = '/livevideo';
                                                console.log(path)
                                                window._guider.History.history.replace({
                                                    pathname: path,
                                                    state: item,
                                                    isLoig: true,
                                                })
                                            }}
                                            className="video-body-list-grp"
                                            hoverable={true}
                                            title={
                                                <div
                                                    onMouseEnter={(e) => { this.props.onMouseOver(index, e); }}
                                                    onMouseLeave={(e) => { this.props.onMouseOut(index, e); }}
                                                    className="video-body-list-imgas"
                                                >
                                                    <img className="video-body-list-img" src={urls} onError={(e) => { e.target.onerror = null; e.target.src = require("./../../assets/img/un-img.png") }} />
                                                    <p className="video-body-list-imgas-post">{item.subject}</p>
                                                    {
                                                        item.timelength?
                                                        <div className="video-body-list-timelength">{item.timelength}</div>
                                                        :null
                                                    }
                                                    {/* {this.props.indexs === index ?
                                                        this.props.shows === true ? <img
                                                            // this.props.onMouseOver={(e) => {this.props.onMouseOver(index);}}
                                                            className="video-body-list-img-bf" src={Bf} />
                                                            : null
                                                        : null} */}
                                                </div>}>

                                            <div className="video-body-list-title">
                                                <div className="video-body-list-title_name">
                                                    {item.name.length >= 23 ? item.name.substr(0, 23) + '...' : item.name}
                                                </div>
                                                <div className="video-body-list-title_teacher">{item.teacher}</div>
                                            </div>
                                            {
                                                this.props.liveType == 1 ?
                                                    <div className="video-body-list-info">
                                                        {/* <span className="video-body-list-p1">{item.score}分 <Button>123</Button></span> */}
                                                        <span className="video-body-list-info_left">{item.uploadtime || '上传时间无'}</span>
                                                        <span className="video-body-list-info_right">
                                                            <span><img src={require('./../../assets/img/score.png')}></img> {item.score || 0}</span>
                                                            <span style={{ marginLeft: '.5rem' }}><Icon type="message" /> {item.comments || 0}</span>
                                                        </span>
                                                    </div> :
                                                    <div className="video-body-list-info">
                                                        <span className="video-body-list-info_left">开播时间：{item.addTime || '无'}</span>
                                                        <span className="video-body-list-info_right">
                                                            <span><Icon type="play-square" /> 直播中</span>
                                                        </span>
                                                    </div>
                                            }
                                            {
                                                item.platform ? <div className="ribbon-zzsc-green"><div className="ribbon-green">{item.platform || ''}</div></div> : null
                                            }
                                        </Card>
                                    </List.Item>
                                );
                            }}
                        />
                        : <div className="video-body-list-div-list-style-dataImg">

                            <img src={dataBackground} style={{ marginRight: '1.2rem' }} />
                            <div className="dataImg">
                                <div className="dataImg-span">{this.props.loading === false ? '抱歉，暂时没有找到您需要的数据哦...' : '正在加载数据....'}</div>
                                {
                                    // this.props.loading === false ?
                                    //     <Button className="dataImg-bnts" onClick={() => {
                                    //          window._guider.History.history.push({
                                    //             pathname: '/'
                                    //         });
                                    //     }}
                                    //         type="primary">返回首页</Button>
                                    //     : null
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default VideoList;