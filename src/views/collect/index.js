import React, { Component } from 'react';
import { Layout } from 'antd';
import Collect from './item/collect';
import CssTransition from './../../components/Transition';
import('./index.less');

class app extends Component {
	render() {
		return (
			<CssTransition>
			<Layout className="collect">
                <Collect></Collect>
			</Layout>
			</CssTransition>
		);
	}
}

export default app;
