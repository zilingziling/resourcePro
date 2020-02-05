
import React, { Component } from 'react';
import { Input, Modal, Divider, Menu } from 'antd';
import Monkey from './../../assets/img/logo.png';
import XY from './../../assets/img/xy.png';
import ZY from './../../assets/img/zy.png';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
const confirm = Modal.confirm;

const Search = Input.Search;

import('./index.less');
@inject('routerStore', 'UserStore')
@observer
class Home extends Component {
    render() {
        let constkey = window._guider.History.history.location.pathname.split('/')[1] || 'index';
        return (
            <div className="Header">
                <div className="Header-top">
                    <div className="Header-top_container">
                        <div className="Header-left">
                            <Link to="/index">
                                <div className="Header_logo">
                                    <img alt='' className="Header-left-img1" src={Monkey} />
                                    <span className="Header_logo_text">{this.props.UserStore.headerTitle||window.sessionStorage.getItem("platformName") || '弈简互动教学资源平台'}</span>
                                </div>
                            </Link>

                            <span className="Header-left-spans" style={this.props.routerStore.GlobalRouter === '/login' ? { display: '' } : { display: 'none' }}> 欢迎登录!</span>
                        </div>
                        <div className="Header-right">
                            <div className="Header-right-input">
                                {
                                    window._guider.History.history.location.pathname.indexOf('/personal') === -1
                                        ?
                                        <Search
                                            size="small"
                                            className="Header-right-input"
                                            placeholder={'请输入  ' + '"学科"' + '  "老师"' + '  "班级"' + '  等搜索'}
                                            enterButton="搜索"
                                            size="large"
                                            style={this.props.routerStore.GlobalRouter != '/login' ? { display: '' } : { display: 'none' }}
                                            onSearch={this.onSearch.bind(this)}
                                        />
                                        : null
                                }

                            </div>
                            <div style={this.props.routerStore.GlobalRouter != '/login' ? { display: '' } : { display: 'none' }}>
                                {
                                    window.sessionStorage.getItem('isLogin') ?
                                        <a onClick={this.onPersonalClick.bind(this)} className="Header-right-name" href="javascript:void(0)">个人中心</a>
                                        :
                                        null
                                }
                                {
                                    window.sessionStorage.getItem('isLogin') ?
                                        <Divider type="vertical" />
                                        :
                                        null
                                }
                                {
                                    window.sessionStorage.getItem('isLogin') ?
                                        <a onClick={() => { this.exit('exit'); }} className="Header-right-name" href="javascript:void(0)">退出登录</a>
                                        :
                                        <a onClick={() => { this.exit('login'); }} className="Header-right-name" href="javascript:void(0)">登录</a>
                                }
                            </div>
                        </div>
                    </div>

                </div>
                {
                    window._guider.History.history.location.pathname.indexOf('/personal') === -1
                        ?
                        <div className="Header-Nav">
                            <div className="Header-Nav_container">
                                <div className="Header_nav_menu" style={this.props.routerStore.GlobalRouter !== '/login' ? { display: '' } : { display: 'none' }}>
                                    <Menu selectedKeys={[constkey]} mode="horizontal" onClick={this.menuClick.bind(this)}>
                                        <Menu.Item key="index">
                                            首页
                                    </Menu.Item>
                                        <Menu.Item key="curriculum">
                                            课程中心
                                    </Menu.Item>
                                        <Menu.Item key="live">
                                            视频直播
                                    </Menu.Item>
                                        <Menu.Item key="micro">
                                            微课堂
                                    </Menu.Item>
                                        <Menu.Item key="educationinfo">
                                            新闻资讯
                                    </Menu.Item>
                                    </Menu>
                                </div>
                            </div>

                        </div> : null
                }


            </div>
        );
    }
    onSearch(value) {
        window._guider.History.history.push({ pathname: `/search/${value || null}` })

    }
    menuClick({ item, key, keyPath }) {
        let pathname = '/' + key;
        window._guider.History.history.push({ pathname });
    }
    onPersonalClick() {
        document.querySelector('.ant-menu-item-selected') && document.querySelector('.ant-menu-item-selected').classList.remove('ant-menu-item-selected')
        
        // if (!window.sessionStorage.getItem("loginPlatformId")) return;
		window.sessionStorage.setItem('platformId', window.sessionStorage.getItem("loginPlatformId"))
		window.sessionStorage.setItem('platformType', window.sessionStorage.getItem("loginPlatformType"))
		window.sessionStorage.setItem('platformName', window.sessionStorage.getItem("loginPlatformName"))
		this.props.UserStore.headerTitle = window.sessionStorage.getItem("loginPlatformName");
        
        
        window._guider.History.history.push({
            pathname: '/personal',
        });
    }
    exit = (type) => {
        const name = window.sessionStorage.getItem('userName')
        const title = name && name != 'undefined' ? name + '确定退出吗?' : '确定退出吗?'
        if (type == 'exit') {
            confirm({
                title: title,
                // content: 'When clicked the OK button, this dialog will be closed after 1 second',
                onOk: () => {
                    window.sessionStorage.clear(); //清除所有的变量和值
                    this.props.UserStore.headerTitle = ""
                    window._guider.History.history.push({
                        pathname: '/login',
                        // // state: item,
                        // isLoig: false,
                    });
                },
                onCancel() { },
            });
        } else {
            window.sessionStorage.clear(); //清除所有的变量和值
            window._guider.History.history.push({
                pathname: '/login',
                // // state: item,
                // isLoig: false,
            });
        }

    }
}

export default Home;
