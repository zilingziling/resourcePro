import React, { Component } from 'react'
import { myAttendClass } from '../../../api/personals'
import { Pagination } from 'antd';
import ListView from './../../../components/VideoList';
class TeacherMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            index: null,
            show: false,
            page: 1,
            limit: 12,
            total: 0,
            keyword: '',
            totalPage: '',
            teacher_info: {},
            video_list: []
        }
    }
    render() {
        return (
            <div>
                <ListView dataList={this.state.video_list} jump={this.props} loading={this.state.loading}
                    onMouseOver={(index) => { this.setState({ show: true, index }) }}
                    onMouseOut={(index) => { this.setState({ show: false, index }) }}
                    shows={this.state.show} indexs={this.state.index} liveType="1" />
                {this.state.total !== null ?
                    <div className="home-bottom">
                        <Pagination
                        hideOnSinglePage={true}
                            onChange={(e) => { this.onchanges(e); }}
                            defaultPageSize={this.state.limit}
                            current={this.state.page} total={this.state.total} />
                    </div>
                    : null
                }
            </div>


        )
    }
    componentDidMount() {
        this.onSearch();
    }
    onSearch(keyword) {
        this.setState({ page: 1 }, () => {
            this._getTeacherVideos(window.sessionStorage.getItem('userId'))
        })

    }
    onchanges = (e) => {
        this.setState({ page: e }, () => {
            this._getTeacherVideos(window.sessionStorage.getItem('userId'));
        });
    }
    _getTeacherVideos(teacher_id) {
        const data = {
            page: this.state.page,
            limit: this.state.limit,
            teacherId: window.sessionStorage.getItem("userType") === "teacher" ? teacher_id : "",
        }
        myAttendClass(data).then(res => {
            if (!res || !res.list) return
            this.setState({ video_list: res.list, loading: false, page: res.page, total: res.totalCount, totalPage: res.totalPage })
        })
    }
}
export default TeacherMain;