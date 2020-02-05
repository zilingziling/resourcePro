import React, { Component, Fragment } from 'react';
import { Notification, Message, Radio, Table, Divider, Popconfirm, Modal, Form, Icon, Input, Upload, Button, Tag, Tooltip } from 'antd';
import { saveMicro, reportPlatform, saveKnowledge, getMicroRecourceList, saveFile, deletecurriculum, deletefile, release, report } from '../../../api/micro';
import FileUpload from "./../../../components/fileupload";
import {
    Player, LoadingSpinner, BigPlayButton, ControlBar, VolumeMenuButton,
    PlaybackRateMenuButton
} from 'video-react';

import CurriculumForm from "./addCurriculumForm";
class MicroRecource extends Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            width: 100,
        }, {
            title: '资源文件列表',
            dataIndex: 'filename',
            key: 'filename',
            className: 'td_filename',
            render: (text, record) => {
                let textarr = [], fileIdarr = [], pdfUrls = [], sizearr = [], fileTexts = [];
                text && (textarr = text.split(','));
                record.file && (fileTexts = record.file.split(','));
                record.pdfUrl && (pdfUrls = record.pdfUrl.split(','));
                record.fileId && (fileIdarr = record.fileId.split(','));
                record.size && (sizearr = record.size.split(','));
                fileIdarr.length = textarr.length;
                return (
                    <Fragment>
                        <div style={{ position: 'relative' }}>
                            <Tooltip title="上传">
                                <a className="edit" href="javascript:;" onClick={this.uploadModal.bind(this, record)}><Icon type="upload" /></a>
                            </Tooltip>

                        </div>
                        <div style={{ padding: '1rem 0rem' }}>
                            {

                                textarr.map((v, index) => (
                                    <div key={index}><a href="javascript:;" onClick={this.preview.bind(this, pdfUrls[index])}>{fileTexts[index] + `（${sizearr[index]}）`}</a>
                                        <Popconfirm title="确认删除?" onConfirm={() => this.handleDeleteFile(fileIdarr[index])}>
                                            <Tooltip title="删除">
                                                <a className="filename_a" href="javascript:;"><Icon type="delete" /></a>
                                            </Tooltip>
                                        </Popconfirm>
                                        <Divider type="vertical" />
                                        <Tooltip title="下载">
                                            <a className="filename_a" href="javascript:;" onClick={this.download.bind(this, v)}><Icon type="download" /></a>
                                        </Tooltip>
                                    </div>
                                ))
                            }
                        </div>
                    </Fragment>
                )
            }
        }, {
            title: '知识点摘要',
            dataIndex: 'knowledge',
            key: 'knowledge',
            width: 110,
            className: 'td_filename',
            render: (text, record) => {
                return (
                    <Fragment>
                        <div style={{ position: 'relative' }}>
                            <Tooltip title="修改知识点">
                                <a className="edit" href="javascript:;" onClick={this.knowledgeModal.bind(this, text, record)}><Icon type="edit" /></a>
                            </Tooltip>
                        </div>
                        <div style={{ padding: '1rem 0rem' }}>{text}</div>
                    </Fragment>

                )
            }
        }, {
            title: '所有者',
            dataIndex: 'teacher',
            key: 'teacher',
            width: 90
        },/*  {
            title: '所属教学大纲',
            dataIndex: 'address',
            key: 'address',
            width: 120
        }, */ {
            title: '科目',
            dataIndex: 'subject',
            key: 'subject',
            width: 70
        }, {
            title: '年级',
            dataIndex: 'classes',
            key: 'classes',
            width: 70
        },
        {
            title: '创建时间',
            dataIndex: 'uploadtime',
            key: 'uploadtime',
            width: 110
        }, {
            title: '发布状态',
            dataIndex: 'releaseName',
            key: 'releaseName',
            width: 70
        }, {
            title: '上报状态',
            dataIndex: 'reportName',
            key: 'reportName',
            width: 70
        }, {
            title: '操作',
            dataIndex: 'active',
            key: 'active',
            width: 180,
            render: (text, record) => (
                <span>
                    <span><a href="javascript:;" onClick={this.previewVideo.bind(this, record)}>预览</a><Divider type="vertical" /></span>

                    <span><a href="javascript:;" onClick={this.reportPingtai.bind(this, record)}>上报</a><Divider type="vertical" /></span>

                    <span><a href="javascript:;" onClick={this.release.bind(this, record.id)}>发布</a><Divider type="vertical" /></span>

                    <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.id)}>
                        <a href="javascript:;" style={{ color: '#DB2121' }}>删除</a>
                    </Popconfirm>
                </span>
            ),
        }];
        this.state = {
            dataSource: [],
            uploadVisible: false,
            previewVisible: false,
            knowledgeVisible: false,
            addCourseVisible: false,
            modalData: null,
            resourceList: [],
            fileUrls: [],
            previewModalWidth: 1000,
            previewModalHeight: 600,
            previewSrc: '/resource/image/活动方案.pdf',
            tagArr: [],
            tagInput: null,
            editRecord: null,
            modalVisible: false,
            pingtaivalue: null,
            pingtaiListOptions: [],
            fileUploadLoading: false,
            mediaResourceId: null,
            uploadfilename: null,
            uploadfilesize: null,
            UploadSaveBtn: false,
            previewVideoVisible: false,
            previewVideourl: '',
            previewVideotitle: '视频预览',
            pagination: {
                page: 1,
                limit: 10,
                hideOnSinglePage: true
            }
        };
    }
    render() {
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
        const formValue = {
            subject: 'id',
            classes: 'id'
        };
        const uploaddata = {
            name: 'files',
            accept: ".zip,.doc,.docx,.ppt,.pptx,.rtf,.text,.xls,.xlsx,.pdf",
            action: '/resource/file/upload',
            headers: {
                authorization: 'authorization-text',
            },
            data: {
                token: window.sessionStorage.getItem('token') || ''
            },
            beforeUpload: file => {
                this.setState(state => ({
                    resourceList: [...state.resourceList, file],
                }));
            },
            showUploadList: {
                showPreviewIcon: false,
                showRemoveIcon: false
            }
        };
        return (
            <div>
                <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                    <Button className="addCourseBtn" onClick={this.addCourse.bind(this)}>新增</Button>
                </div>
                <Table className='teacher_table_data' onChange={this.getTableData.bind(this)} pagination={this.state.pagination} dataSource={this.state.dataSource} columns={this.columns} bordered />
                <Modal
                    title="上传文件"
                    visible={this.state.uploadVisible}
                    onOk={this.handleUploadOk.bind(this)}
                    okText={!this.state.UploadSaveBtn ? "确定" : "上传中..."}
                    onCancel={this.handleUploadCancel.bind(this)}
                    okButtonProps={{ disabled: this.state.UploadSaveBtn }}
                    destroyOnClose>
                    <Form>
                        {/* <Form.Item >
                            <Input placeholder="课程名称" />
                        </Form.Item>
                        <Form.Item >
                            <Input placeholder="课程目录" />
                        </Form.Item> */}
                        <Form.Item>
                            <Upload onChange={this.uploadChange.bind(this)} {...uploaddata}>
                                <Button>
                                    <Icon type="upload" /> 点击上传文件
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    className="preview_modal"
                    title="预览文件"
                    maskClosable={false}
                    width={this.state.previewModalWidth}
                    height={this.state.previewModalHeight}
                    visible={this.state.previewVisible}
                    footer={null}
                    destroyOnClose
                    onCancel={this.handleCancel.bind(this)}>
                    {/* <PdfPreview></PdfPreview> */}
                    <embed width="100%" height="100%" src={this.state.previewSrc}></embed>
                    {/* <iframe src="/resource/image/活动方案.pdf"></iframe> */}
                </Modal>
                <Modal
                    title="知识点摘要"
                    okText="保存"
                    maskClosable={false}
                    visible={this.state.knowledgeVisible}
                    destroyOnClose
                    onCancel={this.handleknowledgeCancel.bind(this)}
                    onOk={this.handleknowledgeOk.bind(this)}>
                    {
                        this.state.tagArr.map((tag, index) => {
                            const isLongTag = tag.length > 20;
                            return (
                                <Tag key={tag} closable={true} onClose={() => this.handleTagClose(tag)}>
                                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                </Tag>
                            )
                        })
                    }
                    <div style={{ display: 'flex', marginTop: '2rem' }}><Input value={this.state.tagInput} onChange={this.tagInputChange.bind(this)} placeholder="添加标签"></Input><Button onClick={this.addTag.bind(this)}>添加</Button></div>
                </Modal>
                <Modal
                    className="pingtai-choice"
                    title="选择要上报的平台"
                    maskClosable={false}
                    visible={this.state.modalVisible}
                    onCancel={this.hideModal.bind(this)}
                    footer={null}>
                    <Radio.Group options={this.state.pingtaiListOptions || []} onChange={this.onPingtaiChange.bind(this)} value={this.state.pingtaivalue}>
                    </Radio.Group>
                    <div className="pingtai-choice_button">
                        <Button onClick={this.report.bind(this)} disabled={this.state.pingtaivalue === null} style={{ width: '200px' }} type="primary" size='default'>确定</Button>
                    </div>

                </Modal>
                <Modal
                    title="新增课程"
                    visible={this.state.addCourseVisible}
                    onOk={this.handleCourseOk.bind(this)}
                    onCancel={this.handleCourseCancel.bind(this)}
                    okButtonProps={{ disabled: this.state.fileUploadLoading }}
                    maskClosable={false}
                    destroyOnClose>
                    <CurriculumForm ref="form" formValue={formValue} schoolData={this.state.schoolData} ></CurriculumForm>
                    <Form {...formItemLayout}>
                        <Form.Item label="上传视频" required>
                            <FileUpload ref="fileuploadCmp" statusCallback={this.statusCallback.bind(this)}></FileUpload>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title={this.state.previewVideotitle}
                    visible={this.state.previewVideoVisible}
                    footer={false}
                    onCancel={this.handleCancelPreviewVideo.bind(this)}
                    maskClosable={false}
                    className="previewvideo-modal-container"
                    destroyOnClose
                >
                    <Player
                        autoPlay
                        src={this.state.previewVideourl}
                        ref="player">
                        <LoadingSpinner />
                        <BigPlayButton position="center"
                        />
                        <ControlBar autoHide={true} >
                            <VolumeMenuButton className="video-left-video-music" vertical />
                            <PlaybackRateMenuButton
                                rates={[5, 3, 1.5, 1, 0.5, 0.1]}
                                order={7.1}
                            />
                        </ControlBar>
                    </Player>
                </Modal>
            </div>
        )
    }
    componentDidMount() {
        this.getTableData()
    }

    previewVideo(record) {
        let previewVideotitle = record.title || '视频预览';
        let previewVideourl = record.videourl || 'http://172.16.3.155:65006/movie-3757-Chinese-西南科技大学绵阳校区-2919年级1班-语文-d6db06b696874ad3b7022c3df6bfd3e5.mp4'
        this.setState({ previewVideoVisible: true, previewVideourl, previewVideotitle })
    }
    handleCancelPreviewVideo() {
        let previewVideotitle = '视频预览';
        let previewVideourl = 'http://172.16.3.155:65006/movie-3757-Chinese-西南科技大学绵阳校区-2919年级1班-语文-d6db06b696874ad3b7022c3df6bfd3e5.mp4'
        this.setState({ previewVideoVisible: false, previewVideourl, previewVideotitle })
    }

    async getTableData(paginat) {
        let page = (paginat && paginat.current) || this.state.pagination.page;
        let limit = (paginat && paginat.limit) || this.state.pagination.limit;
        let res = await getMicroRecourceList(window.sessionStorage.getItem('token') || '', window.sessionStorage.getItem('userId'), page, limit);
        if (!res) {
            return
        }
        let pagination = {
            hideOnSinglePage: true,
            showQuickJumper: true,
            current: res.data.page,
            defaultPageSize: res.data.limit,
            total: res.data.totalCount,
            totalPage: res.data.totalPage,
            page: res.data.page,
            limit: res.data.limit
        }
        if (!res.data.list.length && this.state.pagination.page > 1) {
            pagination.page = res.data.page - 1;
            this.setState({ dataSource: res.data.list, pagination }, () => {
                this.getTableData();
            })
        } else {
            res.data && this.setState({ dataSource: res.data.list, pagination });
        }
    }

    statusCallback(flag, mediaResourcedata, uploadfilename, uploadfilesize) {
        this.setState({ fileUploadLoading: flag, mediaResourceId: mediaResourcedata.id, uploadfilename, uploadfilesize })
    }

    addCourse() {
        this.setState({ addCourseVisible: true })
    }

    handleCourseOk() {
        this.refs.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (!this.state.uploadfilename) {
                    return Notification.error({
                        message: '提示！',
                        description: '请先上传视频文件',
                        duration: 2,
                    })
                }
                let data = {
                    title: values.title,
                    'subject.id': values.subject,
                    'classes.id': values.classes,
                    mediaResourceId: this.state.mediaResourceId,
                    fileName: this.state.uploadfilename,
                    fileSize: this.state.uploadfilesize,
                    imageUrl: ''
                }
                saveMicro(data).then(res => {
                    this.callback(res);
                    if (res.code === 0) this.setState({ addCourseVisible: false })
                })
            }
        });
    }
    handleCourseCancel() {
        this.refs.fileuploadCmp.setState({ disableUpload: true })
        this.setState({ addCourseVisible: false, mediaResourceId: null, uploadfilename: null, uploadfilesize: null })
    }
    //上传文件
    uploadChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            let fileUrlArr = this.state.fileUrls;
            fileUrlArr.push(info.file.response.data[0]);
            this.setState({ fileUrls: fileUrlArr });
            Message.success(`${info.file.name} 文件上传成功!`);
        } else if (info.file.status === 'error') {
            Message.error(`${info.file.name} 文件上传失败!`);
        }
    }
    //打开上传文件modal
    uploadModal(record) {
        this.setState({ uploadVisible: true, modalData: record, fileUrls: [], resourceList: [] })
    }
    //关闭上传文件窗口
    handleUploadCancel() {
        this.setState({ uploadVisible: false, modalData: null, fileUrls: [] })
    }
    //保存上传文件
    async handleUploadOk() {
        this.setState({ UploadSaveBtn: true })
        const fileUrls = this.state.resourceList.map(item => item.size)
        let res = await saveFile(this.state.modalData.id, this.state.fileUrls, fileUrls);
        if (!res) {
            const args = {
                message: '提示！',
                description: '系统错误',
                duration: 2,
            };
            return Notification.info(args);
        }
        if (res.code == 0) {
            this.getTableData();
            Message.success(res.msg);
        } else {
            Message.error(res.msg);
        }
        this.setState({ uploadVisible: false, modalData: null, fileUrls: [], UploadSaveBtn: false })
    }
    //删除课件
    async handleDeleteFile(id) {
        let res = await deletefile(id);
        this.callback(res);
    }
    //删除课程
    async handleDelete(id) {
        let res = await deletecurriculum(id);
        this.callback(res);
    }

    hideModal() {
        this.setState({ modalVisible: false, editRecord: null, pingtaivalue: null })
    }
    onPingtaiChange(e) {
        this.setState({
            pingtaivalue: e.target.value,
        });
    }
    reportPingtai(record) {
        reportPlatform().then(res => {
            if (res.code === 0) {
                let arr = res.data.map(v => {
                    return {
                        label: v.name, value: v.id
                    }
                }) || []
                this.setState({ pingtaiListOptions: arr, modalVisible: true, editRecord: record })
            }
        })
        // this.setState({ modalVisible: true, editRecord: record })
    }
    //上报课程
    async report() {
        const reportPlatformId = this.state.pingtaivalue;
        const id = this.state.editRecord.id;
        let res = await report(id, reportPlatformId);
        this.hideModal();
        this.callback(res);
    }
    //发布课程
    async release(id) {
        let res = await release(id);
        this.callback(res);
    }
    //下载课件
    async download(filename) {
        window.open(window.location.origin + `/resource/file/download?filename=${filename}&token=${window.sessionStorage.getItem('token') || ''}`)
    }
    //预览文件 
    async preview(v) {
        if (!v) return;
        window.open(window.location.origin + v, "文件预览")
        // this.setState({ previewSrc: v, previewVisible: true, previewModalWidth: window.innerWidth - 10, previewModalHeight: window.innerHeight - 72 })
    }
    handleCancel() {
        this.setState({ previewVisible: false })
    }

    addTag() {
        if (!this.state.tagInput) return;
        let reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
        if (!reg.test(this.state.tagInput)) {
            const args = {
                message: '提示！',
                description: '只支持中英文以及数字和下划线',
                duration: 2,
            };
            return Notification.error(args);
        }
        let arr = this.state.tagArr;
        arr.push(this.state.tagInput)
        this.setState({ tagArr: arr, tagInput: null })
    }
    tagInputChange(event) {
        this.setState({ tagInput: event.target.value })
    }
    handleTagClose(tag) {
        let arr = this.state.tagArr;
        let index = arr.indexOf(tag)
        if (index > -1) {
            arr.splice(index, 1)
            this.setState({ tagArr: arr })
        }
    }
    knowledgeModal(text, record) {
        if (text) {
            let textarr = text.split(",");
            this.setState({ tagArr: textarr })
        }
        this.setState({ knowledgeVisible: true, editRecord: record })
    }
    handleknowledgeCancel() {
        this.setState({ tagArr: [] })
        this.setState({ knowledgeVisible: false, editRecord: null })
    }
    handleknowledgeOk() {
        if (this.state.tagInput) {
            const args = {
                message: '提示！',
                description: "知识点必须先添加才能保存",
                duration: 2,
            };
            Notification.error(args);
            return
        }
        const text = this.state.tagArr.join(",")
        const id = this.state.editRecord.id;
        const knowledgeId = this.state.editRecord.knowledgeId;
        saveKnowledge(text, id, knowledgeId).then(res => {
            if (res.code === 0) {
                this.callback(res)
            }
        })
        this.setState({ tagArr: [] })
        this.setState({ knowledgeVisible: false, editRecord: null })
    }
    callback(res) {
        if (!res) {
            const args = {
                message: '提示！',
                description: '系统错误',
                duration: 2,
            };
            return Notification.error(args);
        }
        if (res.code == 0) {
            this.getTableData();
            const args = {
                message: '提示！',
                description: res.msg,
                duration: 2,
            };
            Notification.success(args);
        }/*  else {
            const args = {
                message: '提示！',
                description: res.msg,
                duration: 2,
            };
            Notification.error(args);
        } */
    }

}
export default MicroRecource;