// @flow

import React, { Component } from 'react';
import { Button, Form, Input, Icon, Radio, Modal } from 'antd';

import SparkMD5 from 'spark-md5';
import { UpLogin, validation } from './../../api/login';
import { observer, inject } from 'mobx-react';

import('./index.less');
const FormItem = Form.Item;

@inject('UserStore', 'homeStore', 'routerStore')
@observer
class Login extends Component {
	state = {
		backgrounds: {
			background: null,//'#ffaf67'
			text: null
		},
		URL: '',
		modalVisible: false,
		pingtaivalue: null,
		pingtaiArr: [],
		userData: null
	}
	componentDidMount() {
		this.validation();
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="login">
				<div className="login-body">
					<div className="login-body-window">
						<div className="login-body-window-title">
							<p className="login-body-window-p">登录</p>
						</div>
						<Form className="login-form" onSubmit={this.handleSubmit}>
							<FormItem style={{ marginBottom: '1rem' }}>
								{getFieldDecorator('Username', {
									rules: [{ required: true, message: <div style={{ marginTop: '10px' }}><Icon type="exclamation-circle" /> 请输入正确的身份证号码!</div> }],
								})(
									<Input
										onBlur={this.appInput}
										onFocus={this.appInput}
										onChange={this.appInput}
										className="login-form-input"
										prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入身份证号码" />
								)}
							</FormItem>

							<FormItem style={{ marginBottom: '1rem' }}>
								{getFieldDecorator('password', {
									rules: [{ required: true, message: <div style={{ marginTop: '10px' }}><Icon type="exclamation-circle" />请输入您的密码!</div> }],
								})(
									<Input
										onBlur={this.appInput}
										onFocus={this.appInput}
										onChange={this.appInput}
										className="login-form-input"
										type='password'
										prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码" />
								)}
							</FormItem>

							<FormItem style={{ marginBottom: '1rem' }}>
								{getFieldDecorator('Verification', {
									rules: [{ required: true, message: <div style={{ marginTop: '10px' }}><Icon type="exclamation-circle" />请输入您的验证码!</div> }],
								})(
									<Input
										onBlur={this.appInput}
										onFocus={this.appInput}
										onChange={this.appInput}
										className="login-form-Verif"
										placeholder="请输入验证码"
									/>
								)}
								<img
									className="login-form-Verif-imgs"
									src={this.state.URL}
									onClick={this.validation}
								/>
							</FormItem>
							<FormItem style={{ marginBottom: '1rem' }}>
								{getFieldDecorator('loginType', {
									rules: [{ required: true, message: <div style={{ marginTop: '10px' }}><Icon type="exclamation-circle" />请输入您的用户类型!</div> }],
									initialValue: 'checker'
								})(
									<Radio.Group >
										<Radio value="checker">审核员</Radio>
										<Radio value="student">学生</Radio>
									</Radio.Group>
								)}
							</FormItem>

							<FormItem className="login-form-item" >
								<Button
									style={this.state.backgrounds}
									htmlType="submit"
									className="login-form-button">登录
								</Button>
								<br />
								<span style={{ color: 'red' }}>{this.state.text}</span>

							</FormItem>
						</Form>
					</div>
				</div>
				<Modal
					className="pingtai-choice"
					title="选择需要登陆的平台"
					maskClosable={false}
					visible={this.state.modalVisible}
					onCancel={this.hideModal}
					footer={null}>
					<Radio.Group onChange={this.onPingtaiChange.bind(this)} value={this.state.pingtaivalue}>
						{
							this.state.pingtaiArr.map(v => {
								return (
									<Radio itemLabel={v.label} itemtype={v.type} key={v.value} value={v.value}>{v.label}</Radio>
								)
							})
						}
					</Radio.Group>
					<div className="pingtai-choice_button">
						<Button onClick={this.loginSuccess} disabled={this.state.pingtaivalue === null} style={{ width: '200px' }} type="primary" size='default'>确定</Button>
					</div>

				</Modal>
			</div>
		);
	}
	appInput = (e) => {
		if (e.target.value !== '') {
			this.setState({ text: null });
		}
	}
	onPingtaiChange = e => {
		window.sessionStorage.setItem("platformType", e.target.itemtype || '');
		window.sessionStorage.setItem("platformName", e.target.itemLabel || '');
		window.sessionStorage.setItem("loginPlatformType", e.target.itemtype || '');
		window.sessionStorage.setItem("loginPlatformName", e.target.itemLabel || '');
		this.props.UserStore.headerTitle = window.sessionStorage.getItem("loginPlatformName");
		this.setState({
			pingtaivalue: e.target.value,
		});
	}
	hideModal = () => {
		this.setState({ modalVisible: false })
	}
	handleSubmit = (e) => {
		e.preventDefault();
		let data = Object.assign({}, this.state.backgrounds, { background: '#fda029' });
		this.setState({ backgrounds: data });
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.login(values);
			} else {
				this.setState({ text: null });
			}
		});
	}
	login = async (values) => {
		try {
			let data = await UpLogin(values.Username, SparkMD5.hash(values.password), values.Verification, values.loginType);
			if (data.code === 0) {
				let arr = data.platform.map(v => {
					return {
						label: v.name, value: v.id, type: v.code
					}
				}) || []
				this.setState({ pingtaiArr: arr, userData: data })
				if (values.loginType === 'student') {
					window.sessionStorage.setItem("platformType", 'student');
					window.sessionStorage.setItem("loginPlatformType", 'student');
					window.sessionStorage.setItem("platformName", '弈简互动教学资源平台');
					window.sessionStorage.setItem("loginPlatformName", '弈简互动教学资源平台');
					this.props.UserStore.headerTitle = window.sessionStorage.getItem("loginPlatformName");
					this.setState({ pingtaivalue: '' }, () => {
						this.loginSuccess()
					})
				} else {
					if (data.platform.length > 1) {
						this.setState({ modalVisible: true })
					} else if (data.platform.length === 1) {
						window.sessionStorage.setItem("platformType", data.platform[0].code || '');
						window.sessionStorage.setItem("loginPlatformType", data.platform[0].code || '');
						window.sessionStorage.setItem("platformName", data.platform[0].name || '');
						window.sessionStorage.setItem("loginPlatformName", data.platform[0].name || '');
						this.props.UserStore.headerTitle = window.sessionStorage.getItem("loginPlatformName");
						this.setState({ pingtaivalue: data.platform[0].id }, () => {
							this.loginSuccess()
						})
					}
				}

			} else {
				this.setState({ text: data.msg });
			}
		} catch (error) {
			console.log(error);
		}
	}
	loginSuccess = () => {
		this.setState({ modalVisible: false })
		let data = this.state.userData;
		console.log(data)
		this.props.userStore.updateStatus(true, data.token, data.name, data.userType, data.userId, this.state.pingtaivalue, JSON.stringify(this.state.pingtaiArr), data.openPlatform);
		if (this.props.location.isLoig === false) {
			this.props.history.push({
				pathname: '/index',
			});
		} else if (this.props.location.isLoig) {
			let tiem = this.props.location.state;
			this.props.userStore.updateStatus(true, data.token, data.name, data.userType, data.userId, this.state.pingtaivalue, JSON.stringify(this.state.pingtaiArr), data.openPlatform);
			this.props.history.push({
				pathname: '/video',
				state: tiem
			});
		} else if (typeof (this.props.location.state) === 'undefined') {
			this.props.userStore.updateStatus(true, data.token, data.name, data.userType, data.userId, this.state.pingtaivalue, JSON.stringify(this.state.pingtaiArr), data.openPlatform);
			this.props.history.push({
				pathname: '/index',
			});
		} else if (this.props.location.isLoig === 0) {
			this.props.userStore.updateStatus(true, data.token, data.name, data.userType, data.userId, this.state.pingtaivalue, JSON.stringify(this.state.pingtaiArr), data.openPlatform);
			console.log(this.props.location);
			this.props.history.push({
				pathname: this.props.location.state,
			});
		}
	}


	validation = async () => {
		try {
			const numbers = Math.floor(Math.random() * 10);
			const url = await validation();
			this.setState({ URL: url + '?' + parseInt(numbers) });
		} catch (err) {
			console.log(err);
		}
	}
}

export const Logins = Form.create()(Login);


export default Logins;
