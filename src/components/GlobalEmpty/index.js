import React, { Component } from 'react'
import('./index.less');
export default class index extends Component {
    render() {
        return (
            <div className="empty-container">
                <div className="empty-container-item">
                    <img src={require("./../../assets/img/empty-bg.png")}></img>
                    <div style={this.props.emptyStyle}>{this.props.emptyText || '暂无数据'}</div>
                </div>
            </div>
        )
    }
}
