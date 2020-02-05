import { Component } from 'react';
import { observer ,inject} from 'mobx-react';
import {withRouter} from 'react-router';
// import { observable } from 'mobx';
@inject('routerStore')
@observer
class RedirectLogin extends Component {
	state = {
		isLoading: false
	};
	componentWillMount() {
		// let isLogin =  window.sessionStorage.getItem('isLogin');
		// if(!isLogin){
		// 	window._guider.History.replace('/login');
		// }
	}
	render() {
		return this.props.children;
	}
}

export default withRouter(RedirectLogin);
