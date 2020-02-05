import React, { Component } from 'react';
import { Layout } from 'antd';
import MicroCurriculum from './item/microcurriculum'
import CssTransition from './../../components/Transition';
import('./index.less');

class app extends Component {
	render() {
		return (
			<CssTransition>
			<Layout className="microcurriculum">
                <MicroCurriculum></MicroCurriculum>
			</Layout>
			</CssTransition>
		);
	}
}

export default app;