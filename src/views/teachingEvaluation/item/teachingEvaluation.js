import React, { Component } from 'react';
import { Notification, Table, Popconfirm, Radio, Icon } from 'antd';
import { scoreList } from '../../../api/personals';

class teachingEvaluation extends Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '课堂名称',
            dataIndex: 'name',
            key: 'name',
            width: 300,
        }, {
            title: '评价内容',
            dataIndex: 'comment',
            key: 'comment',
        }, {
            title: '评分',
            dataIndex: 'score',
            key: 'score',
            width: 120
        }, {
            title: '操作',
            dataIndex: 'active',
            key: 'active',
            width: 160,
            render: (text, record) => (
                <span>
                    <a href="javascript:;" onClick={this.examine.bind(this, record)}>查看</a>
                </span>
            ),
        }];
        this.state = {
            dataSource: [],
            pingtaivalue: null,
            pagination: {
                page: 1,
                limit: 10,
                hideOnSinglePage: true,
                total:0
            }
        };
    }
    render() {
        return (
            <div className="teachingEvaluation-body">
                <div className="teachingEvaluation-title">
                    <div className="teachingEvaluation-title_content">
                        <div className="teachingEvaluation-title_info">教学评价</div>
                    </div>
                </div>
                <Table onChange={this.getTableData.bind(this)} pagination={this.state.pagination} dataSource={this.state.dataSource} columns={this.columns} bordered />
            </div>
        )
    }
    componentDidMount() {
        this.getTableData()
    }

    async getTableData() {
        scoreList().then(res => {
            if (res.code === 0) {
                let pagination = {
                    page: res.data.page || 0,
                    limit: res.data.limit || 10,
                    hideOnSinglePage: true,
                    total: res.data.totalCount || 0
                }
                this.setState({ dataSource: res.data.list || [], pagination })
            }
        })
    }
    examine(record) {
        window._guider.History.history.push({
            pathname: '/video',
            state: {
                classType: record.classType,
                id: record.id
            },
            isLoig: true,
        })
    }

}
export default teachingEvaluation;