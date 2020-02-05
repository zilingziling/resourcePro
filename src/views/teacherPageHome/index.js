import React, { Component } from 'react'
import TeacherHader from './items/TeacherHader'
import { Tabs } from 'antd'
import { getTeacherInfo } from './../../api/personals'
import Curriculum from './items/curriculum'
import MicroCurriculum from './items/microcurriculum'
import CssTransition from './../../components/Transition';
import './index.less'
const TabPane = Tabs.TabPane

class TeacherCenter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teacher_info: {},
        }
        this.onTabChange = this.onTabChange.bind(this)
    }

    render() {
        return (
            <CssTransition>
                <div className="root1">
                    <div className="root1_body">
                        <div><TeacherHader teacher_info={this.state.teacher_info} /></div>
                        <div className="root1_body_content">
                            <Tabs defaultActiveKey="1" onChange={this.onTabChange}>
                                <TabPane forceRender={true} tab="教学资源" key="1">
                                    <Curriculum teacherId={this.state.teacher_info.id || ""} platformId={this.state.teacher_info.platformId || ""}></Curriculum>
                                </TabPane>
                                <TabPane forceRender={true} tab="微课资源" key="2">
                                    <MicroCurriculum teacherId={this.state.teacher_info.id || ""} platformId={this.state.teacher_info.platformId || ""}></MicroCurriculum>
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </CssTransition>
        )
    }

    componentDidMount() {
        const teacher_id = this.props.match.params.id || ''
        getTeacherInfo(teacher_id).then(res => {
            if (!res || !res.data) return
            this.setState({ teacher_info: res.data[0] })
        })
    }

    onTabChange(key) {
        console.log(key);
        
    }
}

export default TeacherCenter