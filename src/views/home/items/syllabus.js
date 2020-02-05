//教学大纲组件
import React, { Component } from 'react';
import { Tree } from 'antd';
const { TreeNode } = Tree;
class Syllabus extends Component {
    render() {
        return (
            <div style={{height:'100%'}}>
                <h1 className="syllabus_header">教学大纲</h1>
                <div className="syllabus_content">
                    <Tree
                        // checkable
                        defaultExpandedKeys={['0-0-0', '0-0-1']}
                        defaultSelectedKeys={['0-0-0', '0-0-1']}
                        defaultCheckedKeys={['0-0-0', '0-0-1']}
                        onSelect={this.onSelect}
                        onCheck={this.onCheck}
                    >
                        <TreeNode title="parent 1" key="0-0">
                            <TreeNode title="parent 1-0" key="0-0-0" disabled>
                                <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
                                <TreeNode title="leaf" key="0-0-0-1" />
                            </TreeNode>
                            <TreeNode title="parent 1-1" key="0-0-1">
                                <TreeNode title={<span style={{ color: '#1890ff' }}>sss</span>} key="0-0-1-0" />
                            </TreeNode>
                        </TreeNode>
                    </Tree>
                </div>
            </div>
        )
    }
}
export default Syllabus;