import React, { Component } from 'react';
import { BackTop, Layout, List, Avatar, Icon } from 'antd';
import GlobalEmpty from "./../../../components/GlobalEmpty";
import { watchRecord } from '../../../api/personals';
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
            <div className="browsinghistory-body">
                <div className="browsinghistory-title">
                    <div className="browsinghistory-title_content">
                        <div className="browsinghistory-title_info">观看记录</div>
                    </div>
                </div>
                {
                    this.state.listData.length ?
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: page => {
                                    this.list({ page, limit: 10 })
                                },
                                hideOnSinglePage: true,
                                pageSize: 10,
                                total: this.state.total
                            }}
                            dataSource={this.state.listData}
                            renderItem={item => (
                                <List.Item key={item.title} onClick={this.handleDetails.bind(this, item)}>
                                    <List.Item.Meta
                                        avatar={
                                            <img
                                                width={181}
                                                alt="logo"
                                                src={item.imageUrl ? item.imageUrl : './../../../assets/img/un-img.png'}
                                                onError={(e) => { e.target.onerror = null; e.target.src = require("./../../../assets/img/un-img.png") }}
                                            />}
                                        description={
                                            <div className="browsinghistory-list_content">
                                                <div className="browsinghistory-list_content_info">
                                                    <div className="browsinghistory-list_content_info_name">{item.name||'无'}</div>
                                                    <div className="browsinghistory-list_content_info_details"><span>主讲：{item.teacher||'无'}</span></div>
                                                    <div className="browsinghistory-list_content_info_time">上次学习时间：{item.time||'无'}</div>
                                                </div>
                                            </div>
                                        }
                                    />

                                </List.Item>
                            )}
                        />
                        :
                        <GlobalEmpty emptyText={'暂无浏览历史...'} emptyStyle={{ fontSize: '1.63rem', fontFamily: 'MicrosoftYaHei', color: 'rgba(255,193,107,1)' }}></GlobalEmpty>
                }

            </div>
        );
    }
    list(params) {
        watchRecord(params).then(res => {
            if (res.code === 0) {
                this.setState({ listData: res.data.list || [], total: res.data.totalCount || 0 })
            }
        })
    }

    handleDetails(item) {
        window._guider.History.history.push({
            pathname: '/video',
            state: {
                classType: item.classType,
                id: item.id
            },
            isLoig: true,
        })
    }

}

export default Collect;
