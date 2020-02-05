import React, { Component } from 'react';
import Body from './items/homeBody';
import { Layout } from 'antd';
import CssTransition from './../../components/Transition';
// import('./home.scss');
import './home.less'
const { Header, Footer, Sider, Content } = Layout;
class Home extends Component {
	state = {
		searchValu: ''
	};
	render() {
		return (
			<CssTransition>
			<Layout className="home" >
				<Body search={this.state.searchValu} props={this.props} />
			</Layout>
			</CssTransition>
		);
	}
}

export default Home;
