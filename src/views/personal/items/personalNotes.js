import React, { Component } from 'react';
import { notesList, notesDletet, SeveDletet } from './../../../api/personals';
import { Table, Divider, Pagination, message, Modal, Input, Button, Popconfirm } from 'antd';
// 引入编辑器以及EditorState子模块
import BraftEditor, { EditorState } from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import CssTransition from './../../../components/Transition';
class Notes extends Component {

	state = {
		columns: [
			{ title: '课程名称', dataIndex: 'name', key: 'name', width: 300 },
			{
				title: '笔记标题', dataIndex: 'title', key: 'title', width: 300, render: (text, data) => {
					return (
						<span>{data.title.length >= 12 ? data.title.substr(0, 12) + '...' : data.title}</span>
					);
				}
			},
			{
				title: '笔记内容', dataIndex: 'content', width: 120, key: 'content', render: (text) => {
					return (
						<a
							onClick={() => {
								this.setState({
									visible: true,
									ViewState: 1,
									content: text,
									title: '笔记内容'
								});
							}}
							href="javascript:void(0);">查看笔记</a>
					);
				}
			},
			{
				title: '操作', dataIndex: 'id', key: 'id', width: 100, render: (text, data) => {
					return (
						<div>
							<a
								onClick={() => {
									this.setState({
										visible: true,
										ViewState: 2,
										content: data.classes,
										title: '编辑笔记',
										editorState: data.content,
										id: data.id,
										TheTitle: data.title
									});
								}}
								href="javascript:void(0);">编辑</a>
							<Divider type="vertical" />
							<Popconfirm
								placement="left"
								title={'确定删除该笔记吗'}
								onConfirm={() => { this.Delete(data.id); }}
							>
								<a style={{ color: 'red' }} href="javascript:void(0);">删除</a>
							</Popconfirm>
						</div>
					);
				}
			},
		],
		listData: [],
		pages: 1,
		total: 1,
		title: '',
		visible: false,
		content: '',
		ViewState: null,
		editorState: '',
		id: '',
		TheTitle: ''
	}

	componentDidMount() {
		let tokens = window.sessionStorage.getItem('token') || '';
		let params = {
			page: 1,
			token: tokens,
		};
		this.list(params);
	}
	render() {
		return (
			<CssTransition>
				<div className="notesPage-body">
					<div className="notesPage-title">
						<div className="notesPage-title_content">
							<div className="notesPage-title_info">我的笔记</div>
						</div>
					</div>
					<Table
						bordered
						pagination={false}
						columns={this.state.columns}
						dataSource={this.state.listData}
					// scroll={{ x: 1300 }}
					// loading={this.state.listData.length === 0 ? true : false}
					/>
					{
						this.state.listData.length > 0 ? <div className="notes-pages">
							<Pagination
								onChange={this.switch}
								Current={this.state.pages}
								total={this.state.total}
								hideOnSinglePage={true}
							/>

							<Modal
								maskClosable={false}
								keyboard={false}
								width={900}
								style={{ overflow: 'hidden' }}
								title={this.state.title}
								visible={this.state.visible}
								onOk={this.handleOk}
								onCancel={this.handleCancel}
							>
								{this.state.ViewState === 1 ? this.notes() : null}
								{this.state.ViewState === 2 ? this.Modifynotes() : null}
							</Modal>
						</div> : null
					}

				</div>
			</CssTransition>
		);
	}
	Modifynotes = () => {
		let content = this.state.editorState;

		const editorState = EditorState.createFrom(content);
		return (
			<div>
				<p>
					<span style={{ color: 'red' }}>*</span>
					<span style={{ color: '#000' }}>标题：</span>
					<Input
						maxLength={50}
						value={this.state.TheTitle}
						onChange={(v) => { this.setState({ TheTitle: v.target.value }); }}
						style={{ width: '20rem', marginLeft: '1rem', marginRight: '0.5rem' }} />
					<span style={{ color: 'red', fontSize: '1rem' }}>{this.state.content === '' ? '!请填写修改标题内容' : null}</span>
				</p>
				<BraftEditor
					style={{ border: '1px solid #ddd', marginTop: '0.2rem', width: '100%' }}
					defaultValue={EditorState.createFrom(content)}
					onChange={this.handleEditorChange}
					media={{
						image: false
					}}
					controls={['undo', 'redo', 'separator',
						'font-size', 'line-height', 'letter-spacing', 'separator',
						'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
						'superscript', 'subscript', 'remove-styles', 'text-align', 'separator',
						'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
						'link', 'separator', 'separator',
						'media', 'separator',
						'clear']}
				/>
			</div>
		);
	}
	//富文本
	handleEditorChange = (editorState) => {
		// console.log(editorState);
		this.setState({ editorState: editorState });
	}
	notes = () => {
		let text = this.state.content;
		console.log(text);
		return (
			<div className="text-content" dangerouslySetInnerHTML={{ __html: text }}></div>
		);
	}
	//确定
	handleOk = async () => {
		let res = this.state.ViewState;
		if (res === 1) {
			this.handleCancel();
		} else {
			const htmlContent = this.state.editorState.toHTML();
			// let content = this.state.content;
			let tokens = window.sessionStorage.getItem('token') || '';
			let id = this.state.id;
			let name = this.state.TheTitle;
			console.log(htmlContent);
			if (name !== '' && typeof (name) !== 'undefined') {
				try {
					let data = await SeveDletet(tokens, id, name, htmlContent);
					// console.log(data);
					if (data.code === 0) {
						message.success(data.msg);
						this.handleCancel();
						let param = {
							token: tokens,
							page: this.state.pages,
						};
						this.list(param);
					} else {
						message.error(data.msg);
					}
				} catch (error) {
					console.log(error);
				}
			} else {
				message.warning('请填写，笔记标题');
			}
		}



	}
	//取消
	handleCancel = () => {
		this.setState({
			visible: false,
			ViewState: null,
			title: '',
		});
	}

	//删除
	Delete = async (id) => {
		let tokens = window.sessionStorage.getItem('token') || '';
		let pages = this.state.pages;

		try {
			let data = await notesDletet(tokens, id);
			console.log(data);
			if (data.code === 0) {
				let param = {
					page: pages,
					token: tokens,
				};
				this.list(param);
				message.success(data.msg);
			} else {
				message.success(data.msg);
			}

		} catch (error) {
			console.log(error);
		}

	}

	//分页
	switch = (e) => {
		let tokens = window.sessionStorage.getItem('token') || '';
		this.setState({
			pages: e,
		});
		let param = {
			token: tokens,
			page: e,
		};
		this.list(param);
	}
	//列表数据
	list = async (params) => {
		// console.log(params);
		// params['limit'] = 10;
		try {
			let data = await notesList(params);
			let nextPage = data.page;
			if (data.list.length !== 0) {
				this.setState({
					total: data.totalCount,
					listData: data.list,
					pages: data.page
				});
			} else if (nextPage > 1 && data.list.length === 0) {
				params['page'] = nextPage - 1;
				this.list(params);
			} else {
				this.setState({
					listData: [],
					total: 1
				});
			}

		} catch (error) {
			console.log(error);
		}
	}
}

export default Notes;
