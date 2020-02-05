import React, { Component } from 'react';
import { Tabs, Button, Input, message, Row, Col, Notification } from 'antd';
import { saveInfo, newPassword, infosData } from './../../../api/personals';
import CssTransition from './../../../components/Transition';
// import { selNmbreturn } from './../../../utils/utils';
import SparkMD5 from 'spark-md5';
import { NumberType } from './../../../utils/utils';
const TabPane = Tabs.TabPane;

class InfoData extends Component {

	state = {
		phone: '',
		qq: '',
		passsword: '',
		newPassword: '',
		yesPassword: '',
		info: {}
	}

	componentWillReceiveProps(nextProps) {
		// console.log(nextProps);
		// if(nextProps ){
		// 	this.setState({
		// 		phone: nextProps.data.phone,
		// 		qq: nextProps.data.qq
		// 	});
		// }
	}
	componentDidMount() {
		let tokens = window.sessionStorage.getItem('token') || '';
		this.infos(tokens);
	}
	render() {
		const x = 9;
		const y = 8;
		return (
			<CssTransition>
				<div className="personal-data">
					<Tabs
						className="personal-Tabs customTabs"
						defaultActiveKey="1"
					>
						<TabPane tab="个人资料" key="1">

							<div className="personal-data-div">
								<Row>
									<Col className="personal-data-div_item_label" span={x}>所属单位：</Col>
									<Col className="personal-data-div_item_value" span={y}>{this.state.info.unit === null ? '无' : this.state.info.unit}</Col>
								</Row>
								<Row>
									<Col className="personal-data-div_item_label" span={x}>账号类型：</Col>
									<Col className="personal-data-div_item_value" span={y}>{this.state.info.userType === 'teacher' ? '老师 ' : '学生'}</Col>
								</Row>
								<Row>
									<Col className="personal-data-div_item_label" span={x}>身&nbsp;&nbsp;份&nbsp;&nbsp;证：</Col>
									<Col className="personal-data-div_item_value" span={y}>{this.state.info.idcard}</Col>
								</Row>
								<Row>
									<Col className="personal-data-div_item_label" span={x}>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</Col>
									<Col className="personal-data-div_item_value" span={y}>{this.state.info.sex}</Col>
								</Row>
								<Row>
									<Col className="personal-data-div_item_label" span={x}>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</Col>
									<Col className="personal-data-div_item_value" span={y}>{this.state.info.name}</Col>
								</Row>
								<Row>
									<Col className="personal-data-div_item_label" span={x}>手&nbsp;&nbsp;机&nbsp;&nbsp;号：</Col>
									<Col className="personal-data-div_item_value" span={y}><Input
										// type="number"
										maxLength={11}
										value={this.state.phone}
										onChange={(e) => {
											this.setState({ phone: NumberType(e.target.value) });
											// if(e.target.value.length <= 11) return
										}}
										className="personal-div-inpit" placeholder="请输入手机号码" /></Col>
								</Row>
								<Row>
									<Col className="personal-data-div_item_label" span={x}>QQ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</Col>
									<Col className="personal-data-div_item_value" span={y}><Input
										maxLength={12}
										value={this.state.qq}
										onChange={(e) => {
											this.setState({ qq: NumberType(e.target.value) });
										}}
										className="personal-div-inpit" placeholder="请输入QQ号码" /></Col>
								</Row>

								<p style={{ height: '3rem' }}>
									<Button
										onClick={this.submit}
										type="primary">
										保存
								</Button>
								</p>
							</div>
						</TabPane>

						<TabPane tab="修改密码" key="2">
							<div className="personal-data-div">
								<Row>
									<Col className="personal-data-div_item_label" span={x}>原始密码：</Col>
									<Col className="personal-data-div_item_value" span={y}>
										<Input
											type="password"
											value={this.state.passsword}
											onChange={(e) => { this.setState({ passsword: e.target.value }); }}
											className="personal-div-inpit" placeholder="请输入原始密码" />
									</Col>
								</Row>
								<Row>
									<Col className="personal-data-div_item_label" span={x}>新&nbsp;&nbsp;密&nbsp;&nbsp;码：</Col>
									<Col className="personal-data-div_item_value" span={y}>
										<Input
											type="password"
											value={this.state.newPassword}
											onChange={(e) => { this.setState({ newPassword: e.target.value }); }}
											className="personal-div-inpit" placeholder="请输入新密码" />
									</Col>
								</Row>
								<Row>
									<Col className="personal-data-div_item_label" span={x}>确定密码：</Col>
									<Col className="personal-data-div_item_value" span={y}>
										<Input
											type="password"
											value={this.state.yesPassword}
											onChange={(e) => { this.setState({ yesPassword: e.target.value }); }}
											className="personal-div-inpit" placeholder="请输入新密码" />
									</Col>
								</Row>

								<p style={{ height: '3rem' }}>

									<Button
										onClick={this.submitPassword}
										type="primary">
										保存
								</Button>
								</p>
							</div>
						</TabPane>
					</Tabs>
				</div>
			</CssTransition>
		);
	}
	//密码修改
	submitPassword = async () => {
		let token = window.sessionStorage.getItem('token') || '';
		let originalPass = this.state.passsword;
		let newPass = this.state.newPassword;
		let yesPass = this.state.yesPassword;
		if (originalPass !== '' && newPass !== '' && yesPass !== '') {
			if (newPass === yesPass) {
				if (newPass.length < 6) {
					return message.warning('密码长度不能低于6位数！');
				}
				if (originalPass !== newPass) {
					try {
						let data = await newPassword(token, SparkMD5.hash(originalPass), SparkMD5.hash(newPass));
						console.log(data);
						if (data.code === 0) {
							//
							window._guider.Utils.alert({
								message: data.msg,
								type: 'success'
							});
							window.sessionStorage.clear(); //清除所有的变量和值
							this.props.historys.push('/login');
						}
					} catch (error) {
						console.log(error);
					}
				} else {
					message.warning('不能输入您之前的原始密码');
				}
			} else {
				message.warning('您输入的新密码不一致，请重新输入');
			}
		} else {
			message.warning('请填写修改密码');
		}
	}
	//信息保存
	submit = async () => {
		// alert(1);
		let phone = this.state.phone;
		let qq = this.state.qq;
		console.log(qq);
		console.log(phone);
		let token = window.sessionStorage.getItem('token') || '';
		try {
			let data = await saveInfo(token, qq === null ? '' : qq, phone === null ? '' : phone);
			console.log(data);
			if (data.code === 0) {
				message.success(data.msg);
			} else {
				message.success(data.msg);
			}
		} catch (error) {
			console.log(error);
		}

	}

	//个人中心数据
	infos = async (tokens) => {
		try {
			let data = await infosData(tokens);
			// console.log(data);
			// this.showHid = data.userType;
			window.sessionStorage.setItem('userName', data.name);
			this.setState({ info: data, phone: data.phone, qq: data.qq });
			this.info = data;
		} catch (error) {
			console.log(error);
		}
	};


}

export default InfoData;
