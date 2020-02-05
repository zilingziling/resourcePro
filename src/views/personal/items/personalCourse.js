// @flow 

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable, toJS } from 'mobx';
import Headers from './Hader';
import Choose from './choose';
import Slider from 'react-slick';
import {Table, Divider, Pagination, message, Modal, Upload, Button, Icon, Popconfirm } from 'antd';
import { classList, DeleteCourse, upload, preview } from './../../../api/personals';
import url from './../../../../package.json';
// import ChooseMOdel from './model';

// @observer 
class Course extends Component {
	state = {
		columns: [
			{	title: '资源名称 ', dataIndex: 'name', key: 'name'},
			{	title: '创建时间 ', dataIndex: 'createtime', key: 'createtime'},
			{	title: '上传时间 ', dataIndex: 'uploadtime', key: 'uploadtime'},
			{	title: '有无课件 ', dataIndex: 'count', key: 'count', render:(text)=>{
				return(
					<span>{text === 0 ? '无' : '有'}</span>
				);
			}},
			{	title: '操作 ', dataIndex: 'id', key: 'id', render:(text, data)=>{
				return(
					<div>
						{data.count === 0 ?
							<a 
								onClick={()=> {this.setState({view:1, title: data, visibles: true});}}
								href={null}>上传资料</a> 
							: 
							<div>
								<a className="Table-a" 
									onClick={()=>{this.toView(data);}}
									href={null}>查看</a>
								<Divider type="vertical" />
								<Popconfirm 
									placement="left"
									onConfirm={() => {
										this.AllDeletes(data.key);
									}}
									title={'确定删除该课件吗'} okText="确定" cancelText="取消">
									<a className="Table-b" href={null}>删除</a>
								</Popconfirm>
								
							</div>
						}
					
						
					</div>
				);
			}},
		],
		list: [],
		pages: 1,
		total: 1,
		recordParam: {},
		selectedRowKeys: [],
		visibles: false,
		title: {},
		view: null,
		Upname: '',
		Loading: false,
		file: {},
		imgAll: [],
	}
	componentDidMount(){
		let tokens =  window.sessionStorage.getItem('token') || '';
		let param = {
			token: tokens
		};
		this.list(param);
	}
	render() {
		// console.log(url.url);
		const { selectedRowKeys } = this.state;
		return (
			<div>
				<Headers title={'所授教程'}/>
				<Choose 
					value={(v) => {this.returnValue(v);}}
					show={1}
					Course={()=>{this.AllDeletes(); }}
					selectedRowKeys={selectedRowKeys}
				/>
				<Table
					// scroll={{ y: 480 }}
					bordered
					columns={this.state.columns}
					dataSource={this.state.list}
					pagination={false}
					rowSelection={{
						onChange: this.onSelectChange,
						selectedRowKeys,
						getCheckboxProps: (record)=>(
							{
								disabled: record.count === 0,
								count: record.count,
							})
					}}
				/>
				<Modal
				
					width={700}
					maskClosable={false}
					keyboard={false}
					title={'资源名称:' +this.state.title.name}
					visible={this.state.visibles}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					okText="确定"
					cancelText="取消"
					confirmLoading={this.state.Loading}
				>
					{this.state.view === 1 ? this.view1(this.state.title) :null}
					{this.state.view === 2 ? this.view2(this.state.title) :null}
				</Modal>
				<div className="Pagination">
					{this.state.list !== [] ?
						<Pagination 
							onChange={this.pages}
							current={this.state.pages}
							total={this.state.total}
						/>
						: null}
					
				</div>	
			</div>
		);
	}
	// 查看
	toView = async(data) => {
		// console.log(data);
		let tokens =  window.sessionStorage.getItem('token') || '';
		try{
			let res = await preview(tokens, data.fileId);
			// console.log(res);
			if(res.code === 0){
				this.setState({
					view: 2,
					title: data,
					visibles: true,
					imgAll: res.data
				});
			}
		} catch (error ){
			console.log(error);
		}
	}
	//确定
	handleOk = async() => {
		let page = this.state.pages;
		// console.log(page);
		if(this.state.view === 1){
			this.setState({Loading: true});
			let obj = this.state.title;
			let file = this.state.file;
			let tokens =  window.sessionStorage.getItem('token') || '';
			console.log(file);
			try {
				let data = await upload(tokens, file, obj.id, obj.fileId);
				// console.log(data);
				if(data.code === 0){
					message.success(data.msg);
					this.setState({Loading: false});
					this.pages(page);
					this.handleCancel();
				}else{
					message.success(data.msg);
				}
			} catch (error ) {
				console.log(error);
			}
		}else{
			this.handleCancel();
		}
	}
	//清楚
	handleCancel = () => {
		this.setState({
			visibles: false,
			file: {},
			Upname: '',
			// title: {},
			Loading: false,
		});
	}
	//上传view
	view1 = (obj) => {
		console.log(obj);
		return(
			<div>
				<p>
					<span>附件名称：</span>
					<span style={{color: 'red'}}>{this.state.Upname}</span>
				</p>

				<Upload 
					name='file'
					beforeUpload={(res)=> {this.Update(res);}}
					showUploadList={false}

				>
					<Button>
						<Icon type="upload" /> 上传ppt
					</Button>
				</Upload>
	
			</div>
		);
	}
	//查看 view
	view2 = (obj) => {
		
		const settings = {
			// dots: true,
			infinite: true,
			speed: 1000,
			slidesToShow: 1,
			slidesToScroll: 1,
			accessibility: true,
			adaptiveHeight: true,
			autoplay: true,
			arrows: true,
			className: 'slides',
		};
		return(
			<div style={{overflow:'hidden'}}>
				<p>附件：<span>{obj.file}</span></p>
				<span>预览效果</span>
				<Slider 
					{...settings}
				>
					{this.state.imgAll.length > 0 ?this.state.imgAll.map((e,index)=>{
						return(	
							<img style={{width:'800px'}} src={e.url} key={index}/>
						);
					}):null}
				</Slider>
			</div>
		);
	}
	//文件判断赋值
	Update = (file) => {
		console.log(file);
	
		console.log(file.name.indexOf('ppt'));
		if(file.name.indexOf('ppt') == -1){
			message.warning('你的文件类型不是ppt');
		}else {
			this.setState({
				file: file,
				Upname: file.name
			});
		}
	}
	//删除
	AllDeletes = async(key) => {
		let page = this.state.pages;
		if(this.state.selectedRowKeys.length >0 || typeof(key) !== 'undefined'  ){
			let tokens =  window.sessionStorage.getItem('token') || '';
			let kyes = this.state.selectedRowKeys;
			// console.log(kyes);
			// console.log(this.state.selectedRowKeys);
			if(typeof(key) !== 'undefined'){
				try {
					let data = await DeleteCourse(tokens, key);
					// console.log(data);
					if(data.code === 0){ 
						message.success(data.msg);
						this.pages(page);
						this.onSelectChange([]);
						this.setState({selectedRowKeys: []});

					}else{
						message.error(data.msg);
					}
				} catch (error) {
					console.log(error);
				}
			}else{
				try {
					let data = await DeleteCourse(tokens, kyes);
					// console.log(data);
					if(data.code === 0){ 
						message.success(data.msg);
						this.pages(page);
						this.onSelectChange([]);
					}else{
						message.error(data.msg);
					}
				} catch (error) {
					console.log(error);
				}
			}
		
		}
	}
	//单选
	onSelectChange = ( selectedRowKeys ) => {
		console.log(selectedRowKeys);
		// console.log('触发了');
		this.setState({
			selectedRowKeys: selectedRowKeys
		});
	}
	// //全选
	// SelectAll = ( ) => {
	// 	console.log(123);
	// 	this.onSelectChange( [1414]);
 
	// }
	//监听
	pages = (e) => {
		console.log(e);
		let pararm = this.state.recordParam;
		let tokens =  window.sessionStorage.getItem('token') || '';
		pararm['token'] = tokens;
		pararm['page'] = e;
		this.setState({
			pages: e
		});
		this.list(pararm);
	}
	//列表
	list = async(param) => {
		try {
			
			let data = await classList(param);
			// console.log(data);
			this.setState({
				list: this.format(data.list),
				total: data.totalCount
			});
 
			// console.log(data);
		} catch (error) {
			console.log(error);
		}
	}
	//查询
	returnValue = (v) => {
		let tokens =  window.sessionStorage.getItem('token') || '';
		v['token'] = tokens;
		
		this.setState({
			recordParam: v,
			pages: 1
		});
		
		this.list(v);
	}
	//遍历格式
	format = (data) =>{
		// console.log(data);
		let array = [];
		data.forEach(e => {
			array.push({
				id: e.id,
				key: e.id,
				count: e.count,
				file: e.file,
				fileId: e.fileId,
				name: e.name,
				uploadtime: e.uploadtime,
				createtime: e.createtime
			});
		});
		return array;
	}
}

export default Course;

