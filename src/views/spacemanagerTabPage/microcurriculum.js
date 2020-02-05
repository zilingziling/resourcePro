import React, { Component } from 'react';
import { Notification, Table, Popconfirm, Icon, Button } from 'antd';
import { spaceManage, deletecurriculum } from './../../api/micro';

class spaceManageItem extends Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '标题',
            dataIndex: 'name',
            key: 'name',
            width: 160,
        }, {
            title: '所有者',
            dataIndex: 'teacher',
            key: 'teacher',
            width: 90
        }, {
            title: '资源大小(M)',
            dataIndex: 'size',
            key: 'size',
            width: 80
        }, {
            title: '创建时间',
            dataIndex: 'uploadtime',
            key: 'uploadtime',
            width: 100
        }, {
            title: '上报状态',
            dataIndex: 'reportName',
            key: 'reportName',
            width: 70
        }, {
            title: '发布状态',
            dataIndex: 'releaseName',
            key: 'releaseName',
            width: 70
        }, {
            title: '操作',
            dataIndex: 'active',
            key: 'active',
            width: 100,
            render: (text, record) => (
                <span>
                    <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.id)}>
                        <a href="javascript:;" style={{ color: '#DB2121' }}>删除</a>
                    </Popconfirm>
                </span>
            ),
        }];
        this.state = {
            dataSource: [],
            editRecord: null,
            pingtaivalue: null,
            sortType: 'time',
            orderTime: 0,
            orderSize: 0,
            pagination: {
                page: 1,
                limit: 10,
                hideOnSinglePage: true
            }
        };
    }
    render() {
        return (
            <div className="spacemanage-container">
                <div className="spacemanage-sort_btn" style={{ textAlign: 'left', marginBottom: '1rem', marginTop: '1rem' }}>
                    {/* <Radio.Group onChange={this.onRadioChange.bind(this)} defaultValue={this.state.sortType}>
                        <Radio.Button onClick={this.onRadioChange.bind(this)} value="time">时间排序<Icon type="caret-down" /></Radio.Button>
                        <Radio.Button value="space">空间排序<Icon type="caret-down" /></Radio.Button>
                    </Radio.Group> */}
                    <Button className={this.state.sortType === "time" ? "selected_btn" : ''} onClick={this.onRadioChange.bind(this, "time")}>时间排序
                    {
                            this.state.orderTime === 0 ? <Icon type="caret-down" /> : <Icon type="caret-up" />
                        }

                    </Button>
                    <Button className={this.state.sortType === "space" ? "selected_btn" : ''} onClick={this.onRadioChange.bind(this, "space")}>空间排序
                    {
                            this.state.orderSize === 0 ? <Icon type="caret-down" /> : <Icon type="caret-up" />
                        }
                    </Button>
                </div>
                <Table className='space_table_data' onChange={this.getTableData.bind(this)} pagination={this.state.pagination} dataSource={this.state.dataSource} columns={this.columns} bordered />
            </div>
        )
    }
    componentDidMount() {
        this.getTableData()
    }

    async getTableData(paginat) {
        let page = (paginat && paginat.current) || this.state.pagination.page;
        let limit = (paginat && paginat.limit) || this.state.pagination.limit;
        let params = {
            page, limit
        }
        if (this.state.sortType === 'time') {
            params.orderTime = this.state.orderTime;
        } else {
            params.orderSize = this.state.orderSize;
        }
        let res = await spaceManage(params);
        if (!res) {
            return
        }
        let pagination = {
            hideOnSinglePage: true,
            showQuickJumper: true,
            current: res.data.page,
            defaultPageSize: res.data.limit,
            total: res.data.totalCount,
            totalPage: res.data.totalPage,
            page: res.data.page,
            limit: res.data.limit
        }
        if (!res.data.list.length && this.state.pagination.page > 1) {
            pagination.page = res.data.page - 1;
            this.setState({ dataSource: res.data.list, pagination }, () => {
                this.getTableData();
            })
        } else {
            res.data && this.setState({ dataSource: res.data.list, pagination });
        }
    }
    onRadioChange(value) {
        let time, space;
        if (value === "time") {
            this.state.orderTime === 0 ? time = 1 : time = 0;
            space = 0;
        } else if (value === "space") {
            this.state.orderSize === 0 ? space = 1 : space = 0;
            time = 0;
        }
        this.setState({ sortType: value, orderSize: space, orderTime: time }, () => {
            this.getTableData()
        })
    }
    //删除课件
    async handleDelete(id) {
        let res = await deletecurriculum(id);
        this.callback(res);
    }

    callback(res) {
        if (!res) {
            const args = {
                message: '提示！',
                description: '系统错误',
                duration: 2,
            };
            return Notification.info(args);
        }
        if (res.code == 0) {
            this.getTableData();
            const args = {
                message: '提示！',
                description: res.msg,
                duration: 2,
            };
            Notification.info(args);
        }/*  else {
            const args = {
                message: '提示！',
                description: res.msg,
                duration: 2,
            };
            Notification.error(args);
        } */
    }

}
export default spaceManageItem;