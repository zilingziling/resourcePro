

import React, { Component } from 'react';
import { Modal } from 'antd';

class ChooseMOdel extends Component {
	render() {
		return (
			<Modal
				title={this.props.name}
				visible={this.props.visible}
				onOk={this.props.Ok}
				onCancel={this.props.Cancel}
        
			>
				{this.props.children}
			</Modal>
		);
	}
}

export default ChooseMOdel;
