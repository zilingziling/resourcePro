import React, { Component } from 'react'
import { Avatar } from 'antd';
import './index.scss'

class TeacherCenter extends Component {
    constructor(props) {
        super(props)
        this.onClickPersonalCenter = this.onClickPersonalCenter.bind(this)
    }

    render() {
        const { headImage, teacher, school } = this.props.video_detail
        return (
            <div className="root">
                <Avatar className="root_left" style={{ backgroundColor: '#87d068' }} size={64} src={headImage || require('./../../../../assets/img/touxiang.png')} />
                <div className="root_right">
                    <div className="root_right_top">{teacher}</div>
                    <div className="root_right_center">
                        {school}
                    </div>
                    <div className="root_right_bottom" onClick={this.onClickPersonalCenter}>进入主页>></div>

                </div>
            </div>
        )
    }

    onClickPersonalCenter() {
        // window._guider.History.history.push({
        //     pathname: '/teacher_center',
        //     teacher_id: this.props.video_detail.teacherId
        // });
        // sessionStorage.setItem('teacher_id', this.props.video_detail.teacherId)
        window._guider.History.history.push({ pathname: `/teachercenter/${this.props.video_detail.teacherId || null}` })
    }
}

export default TeacherCenter