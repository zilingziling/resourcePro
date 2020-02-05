
import React, { Component } from 'react';

class Headers extends Component {
	render() {
		return (
			<div className="header-text">
				<span>{this.props.title}</span>
			</div>
		);
	}
}

export default Headers;
