import React, { Component } from 'react';
import { Layout } from 'antd';
import BrowsingHistory from './item/browsingHistory';
import CssTransition from './../../components/Transition';
import('./index.less');

class app extends Component {
	render() {
		return (
			<CssTransition>
			<Layout className="browsinghistory">
                <BrowsingHistory></BrowsingHistory>
			</Layout>
			</CssTransition>
		);
	}
}

export default app;
