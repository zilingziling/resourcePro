import React, { Component } from 'react';
import { Breadcrumb, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { beforeAndNext } from '../../../api/educationInfo';
import CssTransition from './../../../components/Transition';
import('./../index.less');
const { Header, Footer, Sider, Content } = Layout;
class Details extends Component {
    state = {
        detailsData: {}
    }
    componentDidMount() {
        this.DetailsData(this.props.match.params.id);
    }
    render() {
        return (
            <CssTransition>
                <div className="educationinfo-details">
                    <Breadcrumb className="video-left-link" style={{ textAlign: 'left', marginBottom: '.5rem' }}>
                        <Breadcrumb.Item><Link to="/index">首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="/educationinfo">新闻资讯</Link></Breadcrumb.Item>
                        <Breadcrumb.Item style={{ color: '#026dff' }}>详情</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="educationinfo-details-body">
                        <div className="educationinfo-details-title">
                            <div className="educationinfo-details-title_top">{this.state.detailsData.title}</div>
                            <div className="educationinfo-details-title_bottom">
                                <span>发布时间： {this.state.detailsData.addtime}</span>
                                <span>来源： {this.state.detailsData.source}</span>
                            </div>

                        </div>
                        <div className="educationinfo-details-content" dangerouslySetInnerHTML={{ __html: this.state.detailsData.content }}>

                        </div>
                        <div className="educationinfo-details-footer">
                            <a
                                className={this.state.detailsData.beforeId ? "a_notdisabled" : "a_disabled"}
                                onClick={this.DetailsData.bind(this, this.state.detailsData.beforeId)}>
                                上一篇：
                            {this.state.detailsData.beforeName
                                    && this.state.detailsData.beforeName.length >= 15 ?
                                    this.state.detailsData.beforeName.substr(0, 15) + '...'
                                    : this.state.detailsData.beforeName || '无'}
                            </a>
                            <a
                                className={this.state.detailsData.nextId ? "a_notdisabled" : "a_disabled"}
                                onClick={this.DetailsData.bind(this, this.state.detailsData.nextId)}>
                                下一篇：
                            {this.state.detailsData.nextName
                                    && this.state.detailsData.nextName.length >= 15 ?
                                    this.state.detailsData.nextName.substr(0, 15) + '...'
                                    : this.state.detailsData.nextName || '无'}
                            </a>
                        </div>
                    </div>

                </div>
            </CssTransition>
        );
    }

    DetailsData(id) {
        beforeAndNext({ id }).then(res => {
            if (res && res.length > 0) {
                this.setState({ detailsData: res[0] })
            }
        })
    }
}

export default Details;