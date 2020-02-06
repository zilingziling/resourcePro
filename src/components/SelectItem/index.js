
import React, { Component } from 'react';
// import { observer, inject, } from 'mobx-react';
// import { observable, toJS, } from 'mobx';
import { gatewayLists } from './../../api/list';
import { infoCourse } from './../../api/live';
import { Icon, Tooltip } from 'antd';
import './index.less'

class Item extends Component {
	state = {
		list: {
			courseType: [],
			dict: [],
			classes: [],
			teacher: []
		},
		grade: true,
		course: true,
		lecturer: true,
		courseCatalogueStyles: null,
		gradeStyles: null,
		courseStyles: null,
		lecturerStyles: null,
		courseType: true

	}
	componentDidMount() {
		this.list();
		// console.log(this.props.mark);
	}
	render() {
		const platformType = window.sessionStorage.getItem("platformType")
		return (
			<div className="select-item">
				{/* 课程目录 */}
				{
					platformType === "person" ? null :
						<div className="item-grade" style={this.state.courseType === true ? { height: '3rem', borderBottom: 'none' } : null}>
							<span className="item-grade-p">课程目录：</span>
							<div className="item-grade-row">
								<div className="item-grade-row-itme">
									{typeof (this.state.list.courseType) !== 'undefined' ?
										this.state.list.courseType.map((data, index) => {
											return (
												<a
													onClick={() => { this.courseCatalogue('courseCatalogueStyles', data, index); }}
													key={index}
													className={`item-grade-row-itme-a ${index === this.state.courseCatalogueStyles ? 'item-grade-row-itme-a-selected' : ''}`}
													href="javascript:void(0)"><span>{data.name}</span></a>
											);
										})
										: null}
								</div>
								<div style={{display:this.state.list.courseType.length>9?'block':'none'}} className="item-grade-right">
									<a
										style={this.state.courseType === false ? { border: '1px solid #d2d2d1', } : null}
										className="item-grade-right-a"
										onClick={() => { this.showHid('courseType'); }} href="javascript:void(0)">
										{this.state.courseType === true ? '更多' : '收起'}
										{this.state.courseType === true ?
											<Icon type="down" theme="outlined" /> :
											<Icon type="up" theme="outlined" />
										}
									</a>
								</div>
							</div>
						</div>
				}

				{/* 年级 */}
				{this.props.mark === 1 ? null :
					<div className="item-grade" style={this.state.grade === true ? { height: '3rem', borderBottom: 'none' } : null}>
						<span className="item-grade-p">年&nbsp;&nbsp;级：</span>
						<div className="item-grade-row">
							<div className="item-grade-row-itme">
								{/* {console.log(this.state.list)} */}
								{typeof (this.state.list.classes) !== 'undefined' ?
									this.state.list.classes.map((data, index) => {
										return (
											<a
												onClick={() => { this.gradeItmeVlue('gradeStyles', data, index); }}
												key={index}
												className={`item-grade-row-itme-a ${index === this.state.gradeStyles ? 'item-grade-row-itme-a-selected' : ''}`}
												href="javascript:void(0)"><span>{data.classes}</span></a>
										);
									})
									: null}
							</div>
							<div style={{display:this.state.list.classes.length>9?'block':'none'}} className="item-grade-right">
								<a
									className="item-grade-right-a"
									style={this.state.grade === false ? { border: '1px solid #d2d2d1', } : null}
									onClick={() => { this.showHid('grade'); }} href="javascript:void(0)">
									{this.state.grade === true ? '更多' : '收起'}
									{this.state.grade === true ?
										<Icon type="down" theme="outlined" /> :
										<Icon type="up" theme="outlined" />
									}
								</a>
							</div>
						</div>
					</div>
				}
				{/* 课程 */}
				<div className="item-grade" style={this.state.course === true ? { height: '3rem', borderBottom: 'none' } : null}>
					<span className="item-grade-p">课&nbsp;&nbsp;程：</span>
					<div className="item-grade-row">
						<div className="item-grade-row-itme">
							{typeof (this.state.list.dict) !== 'undefined' ?
								this.state.list.dict.map((data, index) => {
									return (
										<a
											onClick={() => { this.courseItmeVlue('courseStyles', data, index); }}
											key={index}
											className={`item-grade-row-itme-a ${index === this.state.courseStyles ? 'item-grade-row-itme-a-selected' : ''}`}
											href="javascript:void(0)"><span>{data.name}</span></a>
									);
								})
								: null}
						</div>
						<div style={{display:this.state.list.dict.length>9?'block':'none'}} className="item-grade-right">
							<a
								style={this.state.course === false ? { border: '1px solid #d2d2d1', } : null}
								className="item-grade-right-a"
								onClick={() => { this.showHid('course'); }} href="javascript:void(0)">
								{this.state.course === true ? '更多' : '收起'}
								{this.state.course === true ?
									<Icon type="down" theme="outlined" /> :
									<Icon type="up" theme="outlined" />
								}
							</a>
						</div>
					</div>
				</div>
				{/* 讲师 */}
				<div className="item-grade" style={this.state.lecturer === true ? { height: '3rem', borderBottomWidth: 'none' } : null}>
					<span className="item-grade-p">讲&nbsp;&nbsp;师：</span>
					<div className={!this.state.lecturer ? 'scrolls item-grade-row' : 'item-grade-row'}>
						<div className="item-grade-row-itme">
							{typeof (this.state.list.teacher) !== 'undefined' ?
								this.state.list.teacher.map((data, index) => {
									return (
										<Tooltip
											key={index}
											title={data.name.length >= 5 ? data.name : null}
										>
											<a
												onClick={() => { this.lecturerItmeVlue('lecturerStyles', data, index); }}
												className={`item-grade-row-itme-a ${index === this.state.lecturerStyles ? 'item-grade-row-itme-a-selected' : ''}`}
												href="javascript:void(0)">
												<span>{data.name.length > 4 ? data.name.substr(0, 4) + '...' : data.name}</span>
											</a>
										</Tooltip>
									);
								})
								: null}
						</div>
						<div style={{display:this.state.list.teacher.length>9?'block':'none'}} className="item-grade-right">
							<a
								className="item-grade-right-a"
								style={this.state.lecturer === false ? { border: '1px solid #d2d2d1', } : null}
								onClick={() => { this.showHid('lecturer'); }} href="javascript:void(0)">
								{this.state.lecturer === true ? '更多' : '收起'}
								{this.state.lecturer === true ?
									<Icon type="down" theme="outlined" /> :
									<Icon type="up" theme="outlined" />
								}
							</a>
						</div>
					</div>
				</div>
				{/* <hr className="item_hr"></hr> */}
			</div>
		);
	}
	// 课程目录
	courseCatalogue = (item, data, index, control) => {
		// console.log(this.state.gradeStyles);
		if (this.state.courseCatalogueStyles === index) {
			this.setState({ [item]: null });
			this.props.courseCatalogue('');
		} else {
			this.setState({ [item]: index });
			this.props.courseCatalogue(data);
		}
	}

	// 年级
	gradeItmeVlue = (item, data, index, control) => {
		// console.log(this.state.gradeStyles);
		if (this.state.gradeStyles === index) {
			this.setState({ [item]: null });
			this.props.gradeItmeVlue('');
		} else {
			this.setState({ [item]: index });
			this.props.gradeItmeVlue(data);
		}
	}
	//课程
	courseItmeVlue = (item, data, index) => {
		if (this.state.courseStyles === index) {
			this.setState({ [item]: null });
			this.props.courseReturn('');
		} else {
			this.setState({ [item]: index });
			this.props.courseReturn(data);
		}
	}
	//讲师
	lecturerItmeVlue = (item, data, index) => {
		if (this.state.lecturerStyles === index) {
			this.setState({ [item]: null });
			this.props.lecturerItmeVlue('');

		} else {
			this.setState({ [item]: index });
			this.props.lecturerItmeVlue(data);
		}
	}
	list = async () => {

		if (this.props.mark === 1) {
			let res = await infoCourse();
			// console.log(res);
			if (res) this.setState({ list: res });
		} else {
			let data = await gatewayLists();
			// console.log(Object.keys(data).map(key => data[key]));
			if (data) this.setState({ list: data });
		}
	}
	//显示隐藏
	showHid = (item) => {
		// console.log(this.state[item]);
		if (this.state[item] === true) {
			this.setState({ [item]: false });
		} else {
			this.setState({ [item]: true });
		}
	}
}

export default Item;
