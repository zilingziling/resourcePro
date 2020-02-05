import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import ListView from '../../../components/teacherInfoList';
@observer
class TeacherItem extends Component {
	@observable show = false;
	@observable indexs = ''
	render() {
		return (
				<ListView
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
export default TeacherItem;

