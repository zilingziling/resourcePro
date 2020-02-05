import React, { Component } from 'react'
import { Pagination } from 'antd'
import ListView from './../../../components/VideoList'
import { microList } from './../../../api/micro'

export default class microcurriculum extends Component {
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
            micro_list: [],
        }
        this.onPageChange = this.onPageChange.bind(this)
    }
    render() {
        return (
            <div>
                <ListView dataList={this.state.micro_list} jump={this.props} loading={false}
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
        // const teacher_id = this.props.teacher_info.id || ''

        // this._getMicroList(teacher_id)
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
            this._getMicroList();
        }
    }
    _getMicroList() {
        const data = {
            page: this.state.page,
            limit: this.state.limit,
            keyword: this.state.keyword,
            teacherId: this.state.teacherId,
            platformId: this.state.platformId
        }
        microList(data).then(res => {
            if (!res || !res.data) return
            this.setState({ micro_list: res.data.list, loading: false, total: res.data.totalCount })
        })
    }

    onPageChange(page, page_size) {
        this.setState({ page }, () => {
            this._getMicroList()
        })
    }

}
