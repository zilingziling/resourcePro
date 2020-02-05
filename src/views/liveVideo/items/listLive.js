// @flow

import React, { Component } from 'react';
import { List, Card, Tabs, Skeleton, Divider, Button, Popover } from 'antd';
// import Top from './../../../assets/img/timg.jpg';
import dataBackground from './../../../assets/img/databackground.png';
import Bf from './../../../assets/img/bf.png';
import { observer } from 'mobx-react';
import { observable, toJS } from 'mobx';
import ListView from '../../../components/VideoList';
import Api from '../../../api';
const TabPane = Tabs.TabPane;

@observer
class SelectionItemVideo extends Component {
	@observable show = false;
	@observable indexs = '';
	@observable Phonelive = null;
	render() {
		return (
			<div className="home-boyd-list">
				<ListView
					jump={this.props.jump}
					dataList={this.props.data}
					loading={this.props.loading}
					Phonelive={this.Phonelive}
					onMouseOver={(index, data, e) => {
						this.live(index, data, e);
					}}
					onMouseOut={(index, event) => {
						this.show = false;
						this.indexs = index;
					}}
					shows={this.show}
					indexs={this.indexs}
					liveType={this.props.liveType || 2}
				/>
			</div>
		);
	}
	live = async (index, data, e) => {
		this.show = true;
		this.indexs = index;
	}
}
export default SelectionItemVideo;
