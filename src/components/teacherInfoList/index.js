import React, { Component } from 'react';
import { List, Card, Button, Modal, Avatar } from 'antd';
import dataBackground from './../../assets/img/databackground.png';
import Bf from './../../assets/img/bf.png';
import './index.less'
const confirm = Modal.confirm;
class teacherInfoList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="teacherinfo-body-list-div-list">
                <div className="teacherinfo-body-list-div-list-style">
                    {this.props.dataList && this.props.dataList.length !== 0 ?

                        <List
                            grid={{ gutter: 24, md: 2, lg: 3, xl: 4, xxl: 6 }}
                            dataSource={this.props.dataList}
                            locale={{
                                emptyText: '暂无数据'
                            }}
                            renderItem={(item, index) => {
                                return (
                                    <List.Item>
                                        <Card
                                            style={{ width: 160, height: 200, zIndex: 999, margin: 'auto' }}
                                            onClick={() => {
                                                // window.sessionStorage.getItem('isLogin') === 'true' ?
                                                 window._guider.History.history.push({pathname: `/teachercenter/${item.teacherId || null}`})
                                                    // :
                                                    // confirm({
                                                    //     title: '你还没有登录，是否登陆？',
                                                    //     onOk: () => {
                                                    //         window.sessionStorage.clear(); //清除所有的变量和值
                                                    //          window._guider.History.history.push({ pathname: '/login', isLoig: true, state: item, });
                                                    //     },
                                                    //     onCancel() { },
                                                    // });
                                            }}
                                            className="teacherinfo-body-list-grp"
                                            hoverable={true}
                                            title={
                                                <Avatar src={item.headImage ||require('./../../assets/img/touxiang.png')}  size={80} style={{ backgroundColor: '#87d068' }} icon="user" />
                                            }>
                                            <div className="teacherinfo-body-list_name">
                                                {item.teacher}
                                            </div>
                                            <div className="teacherinfo-body-list_resource">
                                                共{item.count}个资源
                                            </div>
                                            <div className="teacherinfo-body-list_resource">
                                                {item.platform}
                                            </div>
                                        </Card>
                                    </List.Item>
                                );
                            }}
                        />
                        : <div className="teacherinfo-body-list-div-list-style-dataImg">

                            <img src={dataBackground} style={{ marginRight: '1.2rem' }} />
                            <div className="dataImg">
                                <div className="dataImg-span">{this.props.loading === false ? '抱歉，暂时没有找到您需要的数据哦...' : '正在加载数据....'}</div>
                                {/* {
                                    this.props.loading === false ?
                                        <Button className="dataImg-bnts" onClick={() => {
                                             window._guider.History.history.push({
                                                pathname: '/'
                                            });
                                        }}
                                            type="primary">返回首页</Button>
                                        : null
                                } */}
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default teacherInfoList;