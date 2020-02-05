//个人中心
import React, { Component } from 'react';
import { Layout } from 'antd';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import TeacherInfo from './items/personalInfo';
import TeacherMenu from './items/personalMenu';
import TeacherTableData from './items/teacherTableData';
import PersonalData from './items/personalData';
import PersonalNotes from './items/personalNotes';
import PersonalCourse from './items/personalCourse';
import SpaceManager from './items/spaceManager';
import ResourceManager from './items/resourceManager';
import Collect from './../collect';
import BrowsingHistory from './../browsingHistory';
import TeachingEvaluation from './../teachingEvaluation';
import './index.less';
import TeacherMain from './items/teacherMain';
import { getTeacherInfo, getAdminInfo, infosData } from '../../api/personals';
const {
    Header, Footer, Sider, Content,
} = Layout;

class PersonalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spaceTotal: 0,
            spaceSize: 0,
            headImage: '',
            username: '用户'
        };
    }
    componentDidMount() {
        this.getPersonageInfo()
    }
    render() {
        return (
                <div className="personal_container">
                    <Layout className="personal_main">
                        <Sider width='11rem'>
                            <TeacherInfo username={this.state.username} spaceTotal={this.state.spaceTotal} spaceSize={this.state.spaceSize} headImage={this.state.headImage} />
                            <TeacherMenu />
                        </Sider>
                        <Layout>
                            {/* <Header>{this.state.contentTitle}</Header> */}
                            <Content>
                                <Switch>
                                    <Route
                                        exact
                                        path="/personal/teacher_main"
                                        component={TeacherMain}
                                    />
                                    <Route
                                        exact
                                        path="/personal/resourcemanager"
                                        component={ResourceManager}
                                    />
                                    <Route
                                        exact
                                        path="/personal/spacemanager"
                                        component={SpaceManager}
                                    />
                                    <Route
                                        exact
                                        path="/personal/curriculumlist"
                                        component={TeacherTableData}
                                    />
                                    <Route
                                        exact
                                        path="/personal/personal_data"
                                        component={PersonalData}
                                    />
                                    <Route
                                        exact
                                        path="/personal/personal_notes"
                                        component={PersonalNotes}
                                    />
                                    <Route
                                        exact
                                        path="/personal/personal_course"
                                        component={PersonalCourse}
                                    />
                                    <Route
                                        exact
                                        path="/personal/collect"
                                        component={Collect}
                                    />
                                    <Route
                                        exact
                                        path="/personal/teachingevaluation"
                                        component={TeachingEvaluation}
                                    />
                                    <Route
                                        exact
                                        path="/personal/browsing"
                                        component={BrowsingHistory}
                                    />
                                    {
                                        window.sessionStorage.getItem('userType') == 'student' ?
                                            <Redirect exact path="/personal" to='/personal/personal_data' /> :
                                            <Redirect exact path="/personal" to='/personal/resourcemanager' />
                                    }

                                </Switch>
                            </Content>
                        </Layout>
                    </Layout>
                </div>
        )
    }
    getPersonageInfo() {
        const userType = window.sessionStorage.getItem('userType');
        console.log(userType)
        if (userType === 'teacher') this.getTeacherData();
        if (userType === 'user') this.getAdminData();
        if (userType === 'student') this.getStudent();
    }
    async getTeacherData() {
        let res = await getTeacherInfo(window.sessionStorage.getItem('userId')), spaceTotal, spaceSize, headImage, username;
        if (res && res.code == 0 && res.data.length > 0) {
            spaceSize = res.data[0].spaceSize || 0;
            spaceTotal = res.data[0].spaceTotal || 0;
            headImage = res.data[0].headImage;
            username = res.data[0].name;
            this.setState({ spaceSize, spaceTotal, headImage, username });
        }
    }
    async getAdminData() {
        let res = await getAdminInfo(window.sessionStorage.getItem('userId')), spaceTotal, spaceSize, headImage, username;
        console.log(res)
        if (res && res.code == 0 && res.data.length > 0) {
            spaceSize = res.data[0].spaceSize || 0;
            spaceTotal = res.data[0].spaceTotal || 0;
            headImage = res.data[0].headImage;
            username = res.data[0].name;
            this.setState({ spaceSize, spaceTotal, headImage, username });
        }
    }
    //个人中心数据
    async getStudent() {
        try {
            let res = await infosData(), spaceTotal, spaceSize, headImage, username;
            if (res) {
                spaceSize = 0;
                spaceTotal = 0;
                headImage = res.headImage;
                username = res.name;
                this.setState({ spaceSize, spaceTotal, headImage, username });
            }
        } catch (error) {
            console.log(error);
        }
    };
}
export default PersonalPage;