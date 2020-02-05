import React, { Component } from 'react';
import { Layout } from 'antd';
import Curriculum from './item/curriculum'
import CssTransition from './../../components/Transition';
import('./index.less');

class app extends Component {
	render() {
		return (
			<CssTransition>
			<Layout className="curriculum">
                <Curriculum></Curriculum>
			</Layout>
			</CssTransition>
		);
	}
}

export default app;
