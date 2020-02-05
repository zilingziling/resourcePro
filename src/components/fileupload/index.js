import React, { Component } from 'react';
import { Progress, Notification, Radio, Table, Divider, Popconfirm, Modal, Form, Icon, Input, Upload, Button, Tag, Tooltip } from 'antd';
import { mediaResourceData } from '../../api/micro';

import SparkMD5 from 'spark-md5';
import('./index.less');
export default class index extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        fileList: [],
        filename: '',
        progressnum: 0,
        progressstatus: "normal",
        progressshow: "none",
        mediaResourceData: {},
        disableUpload: false,
    }
    render() {
        const Courseprops = {
            listType: 'picture',
            accept: ".mp4",
            beforeUpload: file => {
                if (file.type.indexOf("mp4") === -1) {
                    Notification.error({
                        message: '错误！',
                        description: '只能上传MP4格式的视频文件！',
                        duration: 2,
                    })
                    return false;
                }
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                this.fileuploadclick(file)
                return false;
            },
            onRemove: () => {
                this.setState({ fileList: [], progressshow: 'none', progressnum: 0, progressstatus: 'normal' });
            }
        };
        return (
            <div className="fileupload-container">
                {/* <Input style={{ marginBottom: '1rem' }} placeholder="请输入文件名称" ref="fileInputLabel" /> */}
                <Upload {...Courseprops}>
                    <Button disabled={this.state.fileList.length}>
                        <Icon type="upload" /> 添加
                    </Button>
                </Upload>
                <Progress
                    style={{ display: this.state.progressshow }}
                    strokeColor={{
                        from: '#108ee9',
                        to: '#87d068',
                    }}
                    percent={this.state.progressnum}
                    status={this.state.progressstatus}
                />
                <div>
                    <Button
                        disabled={this.state.progressstatus != 'active'}
                        style={{ marginRight: '2rem' }}
                        onClick={this.fileuploadpause.bind(this)}>
                        {this.state.disableUpload ? "继续" : "暂停"}
                    </Button>
                    {/* <Button
                        disabled={this.state.progressstatus === 'active' || !this.state.fileList.length}
                        type="primary"
                        onClick={this.fileuploadclick.bind(this)}>上传</Button> */}
                </div>
            </div>
        )
    }

    fileuploadclick(fileObj) {
        console.log(this)
        // if (!this.state.fileList.length) return;
        if (!fileObj) return;
        mediaResourceData().then(res => {
            if (res.code === 0) {
                // let fileObj = this.state.fileList[0];
                const filename = fileObj.name;
                const filetype = (fileObj.type && fileObj.type.split("/")[1]) || 'mp4';

                const origin = `http://${res.data.ip || '172.16.3.155'}:${res.data.port || '65002'}`
                const str = filename + fileObj.size + fileObj.lastModified;
                const md5Params = SparkMD5.hash(str) + '.' + filetype;
                this.props.statusCallback(true, res.data, md5Params, fileObj.size);

                this.setState({ progressshow: "", progressstatus: "active", mediaResourceData: res.data }, () => {
                    let xhr = new XMLHttpRequest();
                    xhr.addEventListener('load', (res) => {
                        console.log(xhr)
                        if (res) {
                            try {
                                this.FileSection(fileObj, filename, md5Params, JSON.parse(xhr.responseText).file_size, origin)
                            } catch (error) {
                                console.log(error)
                            }

                        }
                    });
                    xhr.open('POST', `${origin}/fileinfo?file=${md5Params}&token=${window.sessionStorage.getItem('token') || ''}`);
                    xhr.send();
                })

            } else {
                Notification.error({
                    message: '提示！',
                    description: '上传服务器地址获取失败，请联系管理员',
                    duration: 2,
                })
            }

        }).catch(res => {
            Notification.error({
                message: '提示！',
                description: '上传服务器地址获取失败，请联系管理员',
                duration: 2,
            })
        })

    }
    fileuploadpause() {
        this.setState({ disableUpload: !this.state.disableUpload }, () => {
            if (!this.state.disableUpload) this.fileuploadclick(this.state.fileList[0]);
        });
    }
    async FileSection(blob, filename, md5Params, oldfilesize = 0, origin) {
        let bytesPerPiece = 2 * 1024 * 1024; // 每个文件切片大小定为2MB .
        let totalPieces;
        let start = oldfilesize;
        let end, index;
        index = oldfilesize / bytesPerPiece;
        let filesize = blob.size;
        const token = window.sessionStorage.getItem("token");
        //计算文件切片总数
        totalPieces = Math.ceil(filesize / bytesPerPiece);
        if (filesize < bytesPerPiece) {
            let formdata = new FormData();
            formdata.append('files', blob, filename);
            let flag = await this.uploadFile(0, filesize, formdata, token, md5Params, origin);
            let progressstatus = "active";
            if (flag) {
                this.props.statusCallback(false, this.state.mediaResourceData, md5Params, filesize)
                progressstatus = "success"
            } else {
                progressstatus = "exception"
            }
            this.setState({ progressnum: 100, progressstatus })
            return;
        }
        if (oldfilesize === filesize) {
            let progressstatus;
            this.props.statusCallback(false, this.state.mediaResourceData, md5Params, filesize)
            progressstatus = "success"
            this.setState({ progressnum: 100, progressstatus })
            return;
        }
        while (start < filesize) {
            end = start + bytesPerPiece;
            if (end > filesize) {
                end = filesize;
            }

            if (this.state.disableUpload) return;
            let chunk = blob.slice(start, end);//切割文件    
            let formdata = new FormData();
            formdata.append('files', chunk, filename);
            let flag = await this.uploadFile(index * bytesPerPiece, chunk.size, formdata, token, md5Params, origin)
            const progressnum = Math.floor((index + 1) / totalPieces * 100);
            let progressstatus = "active"
            if (progressnum === 100 && flag) {
                this.props.statusCallback(false, this.state.mediaResourceData, md5Params, filesize)
                progressstatus = "success"
            };
            if (!flag) progressstatus = "exception";
            this.setState({ progressnum, progressstatus })
            start = end;
            index++;
        }
    }

    uploadFile(pos, size, formdata, token, md5Params, origin) {
        return new Promise((res, rej) => {
            let xhr = new XMLHttpRequest();
            xhr.onload = (response) => {
                res(true);
            }
            xhr.onerror = (response) => {
                rej(false)
            }
            xhr.open('POST', `${origin}/resource/file/upload?pos=${pos}&size=${size}&token=${token}&file=${md5Params}`);
            xhr.send(formdata);
        })
    }
}
