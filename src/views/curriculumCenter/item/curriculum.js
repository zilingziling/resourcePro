import React, { Component } from 'react';
import { BackTop, Layout, Menu, Dropdown, Icon } from 'antd';
import SelectionItem from '../../../components/SelectItem';
import CurriculumVideoList from './curriculumVideoList';
import { VideoLists } from '../../../api/list';
import Lazyloaditem from './../../../components/Lazyload';
import { observer, inject } from 'mobx-react';
import SORT_0 from './../../../assets/img/sort_0.png';
import SORT_1 from './../../../assets/img/sort_1.png';
import SORT_2 from './../../../assets/img/sort_2.png';
import SORT_3 from './../../../assets/img/sort_3.png';
import SORT_4 from './../../../assets/img/sort_4.png';
const {
    Header, Footer, Sider, Content,
} = Layout;

@inject('lazyLoad', 'routerStore')
@observer
class HomeBody extends Component {
    state = {
        CourseList: {
            grade: '',
            code: '',
            teacherId: '',
            courseType: ''
        },
        total: null,
        dataList: [],
        totalpa: '1',
        loading: true,
        sortText: '时间排序',
        orderTime: 1,
        orderScore: 0,
        synthetical: 3,
    };
    page = 1;
    componentWillReceiveProps(nextProps) {
        // if (nextProps) {
        //     console.log('监听的数据>>>>>>>>>>>>', nextProps);
        //     return
        //     let param = Object.assign({}, this.state.CourseList, { keyword: nextProps.props.location.params || '', page: 1, });
        //     this.VideoList(param);
        //     this.setState({ CourseList: param });
        // }
    }
    componentDidMount() {
        let param = {
            limit: 8,
            page: 1,
        };
        this.VideoList(param);
    }
    render() {
        const sort_img = [SORT_0, SORT_1, SORT_2, SORT_3, SORT_4]
        return (
            <div className="curriculum-body">
                <BackTop visibilityHeight={200} />
                <Layout className="curriculum_layout">
                    <Header className="curriculum_header">
                        <SelectionItem
                            lecturerItmeVlue={e => { this.lecturerCourseList(e); }}
                            courseCatalogue={e => { this.courseCatalogueList(e); }}
                            gradeItmeVlue={e => { this.gradeCourseList(e); }}
                            courseReturn={e => { this.courseCourseList(e); }} />
                    </Header>
                    <Content className="curriculum_content">
                        <div className="curriculum_content_sort">
                            <a href="#" className={this.state.orderTime ? "sort_selected" : ""} onClick={this.sortlistupdate.bind(this, 'orderTime')}>
                                时间排序<img src={sort_img[this.state.orderTime]}></img>
                            </a>
                            <a href="#" className={this.state.orderScore ? "sort_selected" : ""} onClick={this.sortlistupdate.bind(this, 'orderScore')}>
                                评价排序<img src={sort_img[this.state.orderScore]}></img>
                            </a>
                            <a href="#" className={this.state.synthetical === 4 ? "sort_selected" : ""} onClick={this.sortlistupdate.bind(this, 'synthetical')}>
                                综合排序<img src={sort_img[this.state.synthetical]}></img>
                            </a>
                        </div>
                        <div className="curriculum_content_title">找到如下课程>></div>
                        <CurriculumVideoList
                            total={this.state.totalpa}
                            jump={this.props.props}
                            data={this.state.dataList}
                            loading={this.state.loading}
                            liveType={1} />
                        {
                            this.state.dataList.length > 0 ?
                                <Lazyloaditem lazyList={v => { this.switchListData(v); }} />
                                : null
                        }
                    </Content>
                </Layout>
            </div>
        );
    }
    sortlistupdate(key) {
        let num = this.state[key], newnum;
        if (key != "synthetical") {
            if (num === 0) newnum = 1;
            if (num === 1) newnum = 2;
            if (num === 2) newnum = 0;
            this.setState({
                orderTime: 0,
                orderScore: 0,
                synthetical: 3,
            }, () => {
                this.setState({ [key]: newnum, dataList: [] }, () => {
                    this.page = 1;
                    this.VideoList({
                        limit: 8,
                        page: this.page
                    })
                })
            })
        } else if (key === "synthetical") {
            if (num === 3) newnum = 4;
            if (num === 4) newnum = 3;
            this.setState({
                orderTime: 0,
                orderScore: 0,
                synthetical: 3,
            }, () => {
                this.setState({ [key]: newnum, dataList: [] }, () => {
                    this.page = 1;
                    this.VideoList({
                        limit: 8,
                        page: this.page
                    })
                })
            })
        }
    }

    //切换数据
    switchListData = (e) => {
        if (this.props.routerStore.GlobalRouter != "/curriculum") return;
        if (!this.props.lazyLoad.lazyEnd) {
            this.page = this.page + 1;
        }
        this.VideoList({
            limit: 8,
            page: this.page
        })
    };
    //视频列表
    VideoList = async (param) => {
        try {
            param.orderTime = this.state.orderTime;
            param.orderScore = this.state.orderScore;
            param = { ...param, ...this.state.CourseList }
            let data = await VideoLists(param);
            this.props.lazyLoad.lazyEnd = false;
            if (data && !data.list.length) this.props.lazyLoad.lazyEnd = true;
            let list = this.state.dataList.concat(data.list);
            this.setState({ dataList: list, loading: false });
            this.props.lazyLoad.lazyLoading = false;
        } catch (error) {
            console.log(error);
        }
    };

    //年级
    gradeCourseList = (e) => {
        this.page = 1;
        let param = Object.assign({}, this.state.CourseList, { grade: e === '' ? '' : e.grade });
        this.setState({ dataList: [], loading: false, CourseList: param }, () => {
            this.VideoList(param);
        });
    };
    //课程
    courseCourseList = (e) => {
        this.page = 1;
        let param = Object.assign({}, this.state.CourseList, { code: e === '' ? '' : e.code });
        this.setState({ dataList: [], loading: false, CourseList: param }, () => {
            this.VideoList(param);
        });
    };
    //讲师
    lecturerCourseList = (e) => {
        this.page = 1;
        let param = Object.assign({}, this.state.CourseList, { teacherId: e === '' ? '' : e.id });
        this.setState({ dataList: [], loading: false, CourseList: param }, () => {
            this.VideoList(param);
        });
    };
    //课程目录
    courseCatalogueList = (e) => {
        this.page = 1;
        let param = Object.assign({}, this.state.CourseList, { courseType: e === '' ? '' : e.id });
        this.setState({ dataList: [], loading: false, CourseList: param }, () => {
            this.VideoList(param);
        });
    };
}

export default HomeBody;
