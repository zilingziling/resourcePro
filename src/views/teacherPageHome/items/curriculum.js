import React, { Component } from 'react'
import { Pagination } from 'antd'
import { getTeacherVideos } from './../../../api/list'
import ListView from './../../../components/VideoList'

export default class curriculum extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            index: null,
            show: false,
            page: 1,
            limit: 12,
            total: 0,
            keyword: '',
            teacherId: "",
            platformId: "",
            video_list: [],
        }
        this.onPageChange = this.onPageChange.bind(this)
    }
    render() {
        return (
            <div>
                <ListView dataList={this.state.video_list} jump={this.props} loading={this.state.loading}
                    onMouseOver={(index) => { this.setState({ show: true, index }) }}
                    onMouseOut={(index) => { this.setState({ show: false, index }) }}
                    shows={this.state.show} indexs={this.state.index} liveType='1' />
                <div>
                    <Pagination
                        pageSize={this.state.limit}
                        hideOnSinglePage={true}
                        total={this.state.total}
                        onChange={this.onPageChange} />
                </div>
            </div>
        )
    }
    componentDidMount() {

    }
    static getDerivedStateFromProps(prevProps, prevState) {
        if (prevProps.teacherId !== prevState.teacherId) {
            return {
                teacherId: prevProps.teacherId,
                platformId: prevProps.platformId 
            };
        }
        return null
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.teacherId !== this.props.teacherId) {
            this._getTeacherVideos();
        }
    }
    _getTeacherVideos() {
        const data = {
            page: this.state.page,
            limit: this.state.limit,
            keyword: this.state.keyword,
            teacherId: this.state.teacherId,
            platformId: this.state.platformId
        }
        getTeacherVideos(data).then(res => {
            if (!res || !res.list) return
            this.setState({ video_list: res.list, loading: false, total: res.totalCount })
        })
    }
    onPageChange(page, page_size) {
        this.setState({ page }, () => {
            this._getTeacherVideos()
        })
    }
}
