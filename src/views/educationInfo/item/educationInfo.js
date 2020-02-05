import React, { Component } from 'react';
import { List, Icon, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { EducationInfoList } from '../../../api/educationInfo';
class Education extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        listData: [],
        total: 0
    };
    componentDidMount() {
        let param = {
            limit: 10,
            page: 1,
        };
        this.EducationList(param);
    }
    render() {
        return (
            <div className="educationinfo-body">
                <Breadcrumb className="video-left-link" style={{ textAlign: 'left', marginBottom: '.5rem' }}>
                    <Breadcrumb.Item><Link to="/index">首页</Link></Breadcrumb.Item>
                    <Breadcrumb.Item style={{ color: '#026dff' }}>新闻资讯</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <div className="educationinfo-title">
                        <div className="educationinfo-title_content">
                            <div className="educationinfo-title_info">教育新闻</div>
                        </div>
                    </div>
                    <List
                        className="educationinfo-list"
                        size="large"
                        pagination={{
                            onChange: page => {
                                this.EducationList({ page, limit: 10 })
                            },
                            pageSize: 10,
                            hideOnSinglePage: true,
                            total: this.state.total
                        }}
                        dataSource={this.state.listData}
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                                onClick={this.itemClick.bind(this, item)}
                            >
                                <div className="educationinfo-list-item_title" style={{ textAlign: 'left', flex: '1' }}>{item.title}</div>
                                <div className="educationinfo-list-item_time" style={{ width: '16rem',textAlign:'right' }}>{item.addtime}</div>

                            </List.Item>
                        )}
                    />
                </div>

            </div>

        );
    }

    EducationList(params) {
        EducationInfoList(params).then(res => {
            this.setState({ listData: res.list || [], total: res.totalCount || 0 })
        }).catch(res => {
            console.log(res)
        })
    }
    itemClick(item) {
        window._guider.History.history.push({ pathname: `/eduinfodetails/${item.id || null}` })
    }
}

export default Education;