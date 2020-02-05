
import React, { Component } from 'react';
import { Radio, Button, Input, DatePicker, Popconfirm ,Modal, Icon} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
const { RangePicker } = DatePicker;

class Choose extends Component {
	state = {
		classroom: '',
		start: '',
		end: ''
	};
	render() {
		const { selectedRowKeys} = this.props;
		return (
			<div className="Choose">
				{this.props.show === 1 ? <div className="Choose-left">
					<span>课堂名称：</span>
					<Input
						className="Choose-left-input"
						onChange={e => {
							this.setState({ classroom: e.target.value });
						}}
						placeholder="请输入课堂名称"
					/>
					<span className="Choose-left-span">上传时间：</span>
					<DatePicker
						// value={this.state.start}
						className="Choose-left-time"
						format="YYYY/MM/DD"
						placeholder="开始时间"
						disabledEndDate
						onChange={this.start}
						// disabledDate={this.disabledStartDate}
					/>
					-
					<DatePicker
						disabled={this.state.start !== '' ? false: true}
						// value={this.state.end}
						className="Choose-left-time"
						format="YYYY/MM/DD"
						placeholder="结束时间"
						// disabledDate={this.disabledEndDate}
						onChange={this.end}
					/>
					<Button
						onClick={this.query}
						className="Choose-left-btn"
						type="primary"
					>
						查询
					</Button>
				</div>: null}
				
				<div className="Choose-right">
					{/* <Radio className="Choose-span">全选</Radio> */}
					{selectedRowKeys.length > 0 ? 
						<Popconfirm title ="删除选中的课件吗" 
							okText="确定" cancelText="取消"
							placement="leftTop"
							onConfirm={() => {this.props.show === 1 ? this.props.Course(): this.props.Notes();}}
						>
							<Button icon="delete" size={'large'} className="Choose-btn">
						删除
							</Button>
						</Popconfirm> 
						: 	
						<Button onClick={this._dateINfo} icon="delete" size={'large'} className="Choose-btn">
							删除
						</Button>
					}
				</div>
				<div className="clear" />
			</div>
		);
	}
	_dateINfo = () =>{
		Modal.warning({ 
			icon:'none',
			centered: true,
			title: (<div><Icon twoToneColor="#faad14" style={{fontSize:23}} theme="twoTone" type="info-circle" /><span style={{marginLeft:'5px',fontSize:21}}>请选择课件</span></div>),
		});
	}
	query = () => {
		let start = this.state.start;
		let end = this.state.end;
		let name = this.state.classroom;
		let data = {

			keyword: name
		};
		if( end !=='' && start !== ''){
			data['starttime'] = start;
			data['endtime'] = end;
			this.props.value(data);
		}else{
			this.props.value(data);

		}
		// if(start !=='' && end !== ''&& Date.parse(start === ''? 0 : start) <= Date.parse(end === ''? 0 : end)){

		// 	console.log(name);
		// }else{
		// 	message.error('请选择起始时间小于结束时间');
		// }

	};
	start = (value, date) => {
		this.setState({ start: date });
	};
	end = (value, date) => {
		this.setState({ end: date });
	};
	//结束
	disabledEndDate = (endValue) => {
		const startValue = this.state.start;
		if (!endValue || !startValue) {
			return false;
		}
		return endValue.valueOf() <= startValue.valueOf();
	};
	//开始
	disabledStartDate = (startValue) => {
		const endValue = this.state.end;
		if (!startValue || !endValue) {
			return false;
		}
		return startValue.valueOf() > endValue.valueOf();
	};
}

export default Choose;
