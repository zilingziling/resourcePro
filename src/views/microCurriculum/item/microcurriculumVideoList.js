import React, { Component } from 'react';
import { Tabs } from 'antd';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import ListView from '../../../components/VideoList';
const TabPane = Tabs.TabPane;
@observer
class SelectionItemVideo extends Component {
    @observable show = false;
    @observable indexs = ''
    render() {
        return (
                <ListView
                    jump={this.props.jump}
                    dataList={this.props.data}
                    loading={this.props.loading}
                    onMouseOver={(index, event) => {
                        this.show = true; this.indexs = index;
                    }}
                    onMouseOut={(index, event) => {
                        this.show = false;
                        this.indexs = index;
                    }}
                    shows={this.show}
                    indexs={this.indexs}
                    liveType="1"
                />
        );
    }
}
export default SelectionItemVideo;

