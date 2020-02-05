import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { observer, inject } from 'mobx-react';
@inject('routerStore', 'UserStore')
@observer
class PersonalMenu extends Component {
    render() {
        const userType = window.sessionStorage.getItem('userType');
        let pathname = window.location.pathname;
        let routearr = pathname.split('/')
        const route = routearr[routearr.length - 1];
        this.props.routerStore.SETROUTER(route)
        return (
            <div className="personal_menu">
                <Menu
                    selectedKeys={[this.props.routerStore.GlobalRouter]}
                    defaultOpenKeys={[this.props.routerStore.GlobalRouter]}
                    mode="vertical"
                >
                    {/* <Menu.Item key="teacher_main" style={userType !== 'student' ? { display: '' } : { display: 'none' }}>
                        <Link to={{ pathname: '/personal/teacher_main' }}>我的主页</Link>
                    </Menu.Item> */}
                    <Menu.Item key="resourcemanager" style={userType !== 'student' ? { display: '' } : { display: 'none' }}>
                        <Link to={{ pathname: '/personal/resourcemanager' }}>资源审核</Link>
                    </Menu.Item>
                    <Menu.Item key="spacemanager" style={userType !== 'student' ? { display: '' } : { display: 'none' }}>
                        <Link to={{ pathname: '/personal/spacemanager' }}>空间管理</Link>
                    </Menu.Item>
                    <Menu.Item key="personal_data" style={userType != 'user' ? { display: '' } : { display: 'none' }}>
                        <Link to={{ pathname: '/personal/personal_data' }}>个人资料</Link>
                    </Menu.Item>
                    <Menu.Item key="personal_notes" style={userType === 'student' ? { display: '' } : { display: 'none' }}>
                        <Link to={{ pathname: '/personal/personal_notes' }}>我的笔记</Link>
                    </Menu.Item>
                    <Menu.Item key="collect" style={userType === 'student' ? { display: '' } : { display: 'none' }}>
                        <Link to={{ pathname: '/personal/collect' }}>我的收藏</Link>
                    </Menu.Item>
                    <Menu.Item key="browsing" style={userType !== 'user' ? { display: '' } : { display: 'none' }}>
                        <Link to={{ pathname: '/personal/browsing' }}>观看记录</Link>
                    </Menu.Item>
                    <Menu.Item key="teachingevaluation" style={userType === 'teacher' ? { display: '' } : { display: 'none' }}>
                        <Link to={{ pathname: '/personal/teachingevaluation' }}>教学评价</Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
export default PersonalMenu;