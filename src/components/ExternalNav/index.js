import React, { Component } from 'react';
import './index.less'
class ExternalNav extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="external-nav">
                <div className="external-nav_title">
                    <div className="external-nav_title_left">级平台</div>
                    {/* <a className="external-nav_title_right" onClick={this.props.returnClick.bind(this)}>返回</a> */}
                </div>
                <div className="external-nav_content">
                    {
                        this.props.dataList.map(item => {
                            // if (sessionStorage.getItem('platformId') == item.id) {
                            //     return (
                            //         <div key={item.id}><a style={{background:'#0d8ffa',color:'#fff'}} onClick={this.props.itemClick.bind(this, item)}>{item.name}</a></div>
                            //     )
                            // }
                            return (
                                <div key={item.id}><a onClick={this.props.itemClick.bind(this, item)}>{item.name}</a></div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ExternalNav;