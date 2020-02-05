import React, { Component } from 'react'
import { Form, Input, TreeSelect, Select, } from 'antd';
import { schoolData, subjectData, gradeData } from '../../../api/micro';
export default Form.create()(
    class extends Component {
        state = {
            schoolData: [],
            subjectData: [],
            gradeData: []
        }
        render() {
            const { getFieldDecorator } = this.props.form;
            const formItemLayout = {
                labelCol: {
                    xs: { span: 4 },
                    sm: { span: 4 },
                },
                wrapperCol: {
                    xs: { span: 18 },
                    sm: { span: 18 },
                },
            };

            return (
                <Form  {...formItemLayout}>
                    <Form.Item label="学&emsp;&emsp;校" >
                        {
                            getFieldDecorator('schoolid', {
                                rules: [{ required: true, message: '请输入学校名称!' }],
                            })(<TreeSelect onChange={this.treeChange.bind(this)} placeholder="请选择学校" treeData={this.state.schoolData} />)}
                    </Form.Item>
                    <Form.Item label="年&emsp;&emsp;级" >
                        {getFieldDecorator('classes', {
                            rules: [{ required: true, message: '请输入年级名称!' }],
                        })(<Select options={this.state.gradeData} placeholder="请先选择学校" >
                            {this.state.gradeData.map(item => (
                                <Select.Option key={item.id} value={item[this.props.formValue['classes']]}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="学&emsp;&emsp;科" >
                        {getFieldDecorator('subject', {
                            rules: [{ required: true, message: '请输入学科名称!' }],
                        })(<Select placeholder="请选择学科" >
                            {this.state.subjectData.map(item => (
                                <Select.Option key={item.code} value={item[this.props.formValue['subject']]}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="标&emsp;&emsp;题" >
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入标题名称!' }],
                        })(<Input placeholder="请输入标题" />)}
                    </Form.Item>
                </Form>
            )
        }
        componentDidMount() {
            this.getSchool();
            this.getSubject();
        }
        formatSchoolTree(data) {
            return data.map(v => {
                return {
                    title: v.name || '',
                    key: v.id,
                    id: v.id,
                    value: String(v.id),
                    parent: v.parent,
                    isLeaf: (v.children && v.children.length) ? false : true,
                    children: (v.children && v.children.length) ? this.formatSchoolTree(v.children) : []
                }
            })
        }
        formatSelect(data = []) {
            return data.map(item => {
                return {
                    value: item.code,
                    key: item.id,
                    title: item.name
                }
            })
        }
        getSchool() {
            schoolData().then(res => {
                if (res.code === 0) {
                    let data = this.formatSchoolTree(res.data)
                    this.setState({ schoolData: data || [] })
                }

            })
        }
        getSubject() {
            subjectData().then(res => {
                if (res.code === 0) {
                    this.setState({ subjectData: res.data || [] })
                }
            })
        }
        treeChange(value, label, extra) {
            gradeData(value).then(res => {
                if (res.code === 0) {
                    this.setState({ gradeData: res.data || [] })
                }
            })
        }
    }
)



