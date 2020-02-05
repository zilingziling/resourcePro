import React, { Component } from 'react';
import { BackTop } from 'antd';
import ListView from './../../home/items/SelectionItemVideo';
import TeachereItem from './../../home/items/teacherItem';
import { VideoLists, excellentTeacher } from '../../../api/list';
import { microList } from '../../../api/micro';
import ExternalNav from '../../../components/ExternalNav'
import { getTeacherInfo } from '../../../api/personals';
import Lazyloaditem from './../../../components/Lazyload';
import { observer, inject } from 'mobx-react';

@inject('lazyLoad')
@observer
class SearchItem extends Component {
    state = {
        totalPage: 1,
        total: null,
        liveList: [],
        dataList: [],
        youkeList: [],
        teacherList: [],
        totalpa: '1',
        teacherLoading: true,
        dataLoading: true,
    };
    page = 1;
    componentDidMount() {
        this.getIndexList();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.keyword !== nextProps.keyword) {
            this.resetList(
                () => {
                    this.page = 1;
                    this.getIndexList(nextProps.keyword)
                }
            )
        }
    }
    render() {
        return (
            <div className="search-body">
                <BackTop visibilityHeight={200} />
                <div className="search-teacher" style={{ display: this.state.teacherList.length ? "" : "none" }}>
                    <div className="search-teacher_title">
                        <span className="search-teacher_title_text">
                            找到如下老师>>
						</span>
                    </div>
                    <div className="search-teacher_content">
                        <TeachereItem
                            jump={this.props.props}
                            data={this.state.teacherList}
                            loading={this.state.teacherLoading} />
                    </div>
                </div>
                <div className="search-recource">
                    <div className="search-recource_title">
                        <span className="search-recource_title_text">
                            找到如下课程>>
						</span>
                    </div>
                    <div className="search-recource_content">
                        <ListView
                            total={this.state.totalpa}
                            jump={this.props.props}
                            data={this.state.dataList}
                            loading={this.state.dataLoading}
                            liveType={1}
                        />
                        {
                            this.state.dataList.length > 0 ?
                                <Lazyloaditem lazyList={v => { this.lazyLoadingData(v); }} />
                                : null
                        }

                    </div>
                </div>
            </div>
        );
    }

    resetList(Fn) {
        this.setState({
            teacherList: [],
            dataList: [],
            youkeList: [],
            liveList: []
        }, Fn)
    }

    getIndexList(keyword) {
        this.getTeacherList({
            limit: 6,
            page: 1,
            keyword
        });
        this.lazyLoadingList({
            limit: 8,
            page: this.page,
            keyword
        });
    }

    getTeacherList(param = {
        limit: 6,
        page: 1,
    }) {
        !param.keyword && (param.keyword = this.props.keyword)
        excellentTeacher(param).then(res => {
            if (res) {
                this.setState({ teacherList: res || [], teacherLoading: false })
            }
        }).catch(res => {
            console.log("服务器错误")
        })
    }

    lazyLoadingData() {
        if (!this.props.lazyLoad.lazyEnd) {
            this.page = this.page + 1;
        }
        this.lazyLoadingList({
            limit: 8,
            page: this.page,
        })
    }

    async lazyLoadingList(param) {
        !param.keyword && (param.keyword = this.props.keyword)
        try {
            let data = await VideoLists(param);
            let microdata = {
                data: {}
            };
            microdata = await microList(param);
            // console.log(microdata)
            this.props.lazyLoad.lazyEnd = false;
            if (data && !data.list.length) this.props.lazyLoad.lazyEnd = true;
            // let list = this.state.dataList.concat(data.list);
            let list = this.state.dataList.concat(data.list, microdata.data.list);
            this.setState({ dataList: list, dataLoading: false });
            this.props.lazyLoad.lazyLoading = false;
        } catch (error) {
            console.log("服务器错误", error)
        }
    }

    youkeClick() {
        window._guider.History.history.push({
            pathname: '/curriculum',
        });
    }

    liveClick() {
        window._guider.History.history.push({
            pathname: '/live',
        });
    }
}

export default SearchItem;
