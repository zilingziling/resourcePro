import React, { Component } from 'react';
import { Spin } from 'antd';
import { observer, inject } from 'mobx-react';
import { observable, autorun } from 'mobx';
import { debounce } from './../../utils/utils';
import './index.less'

@inject('lazyLoad')
@observer
class app extends Component {
    componentDidMount() {
        autorun(() => {
            if (this.props.lazyLoad.lazyModule === 1) {
                this.props.lazyList()
            }
        }, { delay: 100 })
    }
    moreList(){
        this.props.lazyList()
    }
    render() {
        return (
            <div className="lazyLoad">
                {
                    this.props.lazyLoad.lazyLoading ? <div><Spin />  正在加载</div> : <div>
                        {
                            this.props.lazyLoad.lazyEnd ?
                                <div>已加载全部</div> :
                                <div><a className="lazyLoad-more" onClick={this.moreList.bind(this)}>加载更多</a></div>
                        }
                    </div>
                }
            </div>

        );
    }
}

export default app;