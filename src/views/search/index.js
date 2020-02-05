import React, { Component } from 'react';
import { Layout } from 'antd';
import SearchItem from './items/searchItem'
import CssTransition from './../../components/Transition';
import('./index.less');

class app extends Component {
	render() {
		return (
			<CssTransition>
			<Layout className="search">
                <SearchItem keyword={this.props.match.params.id || ''}></SearchItem>
            </Layout>
			</CssTransition>
		);
	}
}

export default app;
