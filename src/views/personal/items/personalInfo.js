import React, { Component } from 'react';
import { Progress, Avatar } from 'antd';
class PersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progressNum: 0,
      progressType: 'normal',
    }
  }

  render() {
    return (
      <div className="personal_info">
        <Avatar style={{ backgroundColor: '#87d068' }} size={64} icon="user" src={this.props.headImage || require('./../../../assets/img/touxiang.png')} />
        <div>{this.props.username || '用户'}</div>
        {
          window.sessionStorage.getItem('userType') !== 'student' ?
            <div>
              <Progress percent={this.state.progressNum} showInfo={false} status={this.state.progressType} />
              <div>{this.props.spaceSize}GB可用，共{this.props.spaceTotal}GB</div>
            </div>
            : null
        }
        <div style={{ height: '2rem', lineHeight: '2rem' }}><a onClick={this.pingtaiHome}>前往平台主页></a></div>
      </div>
    )
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.spaceTotal !== this.props.spaceTotal) {
      this.progress(nextProps.spaceTotal, nextProps.spaceSize);
    }
  }
  pingtaiHome() {
    // window._guider.History.history.push({ pathname: `/personal/pingtai` })
    // window.sessionStorage.setItem('platformType', 'person');
    // window.sessionStorage.setItem('platformId', window.sessionStorage.getItem("loginPlatformId"))
    window._guider.History.history.push({ pathname: `/index` })
  }
  progress(spacetotal, spacesize) {
    let n = spacetotal - spacesize;
    let progressType, progressNum;
    progressNum = n > 0 ? Math.floor(n / spacetotal * 100) : 0;
    progressType = (progressNum > 95 ? 'exception' : 'normal');
    this.setState({ progressType: progressType, progressNum })
  }
}
export default PersonalInfo;