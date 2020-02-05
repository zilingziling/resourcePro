import React, { Component } from 'react';
import { BackTop, Popconfirm, List, Notification, Icon } from 'antd';
import GlobalEmpty from "./../../../components/GlobalEmpty";
import { CollectList } from '../../../api/collect';
import { collection } from '../../../api/micro';
import { observer, inject } from 'mobx-react';

@inject('lazyLoad', 'routerStore')
@observer
class Collect extends Component {
    state = {
        listData: [],
        total: 0
    };

    componentDidMount() {
        this.list({
            page: 1,
            limit: 10
        })
    }
    render() {
        return (
            <div className="collect-body">
                <div className="collect-title">
                    <div className="collect-title_content">
                        <div className="collect-title_info">我的收藏</div>
                    </div>
                </div>
                {
                    this.state.listData.length > 0 ?
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: page => {
                                    this.list({
                                        page, limit: 10
                                    })
                                },
                                hideOnSinglePage: true,
                                pageSize: 10,
                                total: this.state.total
                            }}
                            dataSource={this.state.listData}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <List.Item.Meta
                                        avatar={
                                            <img
                                                width={181}
                                                alt="logo"
                                                onError={(e) => { e.target.onerror = null; e.target.src = require("./../../../assets/img/un-img.png") }}
                                                src={item.imageUrl ? item.imageUrl : './../../../assets/img/un-img.png'}
                                            />}
                                        description={
                                            <div className="collect-list_content">
                                                <div className="collect-list_content_info">
                                                    <div className="collect-list_content_info_name">{item.name || '无'}</div>
                                                    <div className="collect-list_content_info_details"><a onClick={this.handleDetails.bind(this, item)}>查看详情<Icon type="double-right" /></a><span>评分：{item.score}分</span></div>
                                                    <div className="collect-list_content_info_time">收藏时间：{item.time || '无'}</div>
                                                </div>
                                                <div className="collect-list_content_btn">
                                                    <Popconfirm
                                                         title="确认取消收藏?" onConfirm={() => this.handleRemoveCollect(item.id)}
                                                        okText="确认"
                                                        cancelText="取消"
                                                    >
                                                        <button>取消收藏</button>
                                                    </Popconfirm>
                                                </div>
                                            </div>
                                        }
                                    />

                                </List.Item>
                            )}
                        />
                        :
                        <GlobalEmpty emptyText={'暂无收藏课程...'} emptyStyle={{ fontSize: '1.63rem', fontFamily: 'MicrosoftYaHei', color: 'rgba(255,193,107,1)' }}></GlobalEmpty>
                }

            </div>
        );
    }

    list(params) {
        CollectList(params).then(res => {
            this.setState({ listData: res.list || [], total: res.totalCount || 0 })
        })
    }

    handleDetails(item) {
        window._guider.History.history.push({
            pathname: '/video',
            state: {
                classType: item.classType,
                id: item.videoId
            },
            isLoig: true,
        })
    }

    handleRemoveCollect(id) {
        collection({ id, type: '0' }).then(res => {
            if (res.code === 0) {
                const args = {
                    message: '提示！',
                    description: res.msg,
                    duration: 2,
                };
                Notification.info(args);
                this.list({ page: 1, limit: 10 })
            }
        })
    }

}

export default Collect;
