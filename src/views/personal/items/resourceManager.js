import React, { Component } from 'react';
import { Tabs } from 'antd';
import TeacherTableData from './teacherTableData';
import MicroRecource from './microRecource';
import CssTransition from './../../../components/Transition';
const { TabPane } = Tabs;

class ResourceMangener extends Component {
    render() {
        return (
            <CssTransition>
                <div className="resourcemangener-container">
                    <Tabs className="customTabs" defaultActiveKey="1" onChange={this.callback.bind(this)}>
                        <TabPane tab="普课" key="1">
                            <TeacherTableData></TeacherTableData>
                        </TabPane>
                        <TabPane tab="微课" key="2">
                            <MicroRecource></MicroRecource>
                        </TabPane>
                    </Tabs>
                </div>
            </CssTransition>
        )
    }
    callback(v) {
        console.log(v)
    }
}

export default ResourceMangener;