import React, { Component } from 'react'
import { Avatar } from 'antd';
import './index.scss'

class TeacherCenter extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { headImage, name, school, course } = this.props.teacher_info
        return (
            <div className="root2">
                <Avatar style={{ backgroundColor: '#87d068' }} size={64} icon="user" src={headImage||require('./../../../../assets/img/touxiang.png')} />
                <div>{name}</div>
                <div>{school}   所授课程：{course}</div>
            </div>
        )
    }
}

export default TeacherCenter