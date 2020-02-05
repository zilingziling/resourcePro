import React, { Component } from 'react';
import { Layout } from 'antd';
import TeachingEvaluation from './item/teachingEvaluation';
import CssTransition from './../../components/Transition';
import('./index.less');

class app extends Component {
	render() {
		return (
			<CssTransition>
				<Layout className="teachingEvaluation">
					<TeachingEvaluation></TeachingEvaluation>
				</Layout>
			</CssTransition>
		);
	}
}

export default app;
