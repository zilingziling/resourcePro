import React, { Component } from 'react';
import { Layout } from 'antd';
import Education from './item/educationInfo';
import CssTransition from './../../components/Transition';
import('./index.less');

class app extends Component {
	render() {
		return (
			<CssTransition>
			<Layout className="educationinfo">
                <Education></Education>
			</Layout>
			</CssTransition>
		);
	}
}

export default app;