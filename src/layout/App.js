import React, { Fragment, Component } from 'react';
import { Provider } from 'mobx-react';
import { LocaleProvider, Layout } from 'antd';
import { HashRouter, Switch, Route, Router } from 'react-router-dom';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import GlobalHeader from './../components/GlobalHeader';
import GlobalFooter from './../components/GlobalFooter';
import GlobalMain from './../components/GlobalMain';
import IM from './../components/IM';
import Historys from './../utils/history';
import { BrowserType, debounce } from './../utils/utils';
import stores from './../stores';
import { observer } from 'mobx-react';
import { permissionsVerify } from './../api/login';
import CssTransition from './../components/Transition';
import waringPNG from './../assets/img/warning.png';
import chromePNG from './../assets/img/chrome.png';
import './App.less'

const {
  Header, Footer, Content,
} = Layout;

@observer
class App extends Component {
  state = {
    searchValu: '',
    compatibility: 'none',
    tipTextShow: 'none',
  };
  browserDebounceFn = debounce(this.updateBrowser.bind(this), 500);
  componentWillMount() {
    this.initOrigin()
  }
  initOrigin() {
    if (window["context"] == undefined) {
      if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
      }
      window["context"] = location.origin + "/V6.0";
    }
    if (!window.location.origin) {
      window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
  }
  componentDidMount() {
    const browser = BrowserType();
    if (browser != "Chrome") this.setState({ compatibility: '' });
    window.addEventListener("resize", this.browserDebounceFn);
  }
  updateBrowser() {
    let tipTextShow = "none"
    if (window.innerWidth < 1800) tipTextShow = "";
    this.setState({
      tipTextShow
    })
  }
  close(num) {
    if (num == 1) {
      this.setState({ compatibility: 'none' })
    } else if (num == 2) {
      this.setState({ tipTextShow: 'none' })
    }
  }
  download() {
    window.open("https://www.google.cn/intl/zh-CN/chrome/")
  }
  render() {

    return (
      <Fragment>
        <CssTransition>
          <Provider {...stores}>
            <LocaleProvider locale={zhCN}>
              <div className="App">
                <IM></IM>
                <div className="compatibility-item" style={{ display: this.state.compatibility }}>
                  <div className="compatibility-info">
                    <img src={waringPNG} alt="警告" />
                    <span>当前浏览器或内核模式可能存在兼容性问题,建议更换后访问。</span>
                  </div>
                  <div className="compatibility-handle">
                    <img src={chromePNG} alt="谷歌浏览器" />
                    <a className="compatibility-handle_download" href="javascript:void(0)" onClick={this.download.bind(this)}>下载Chrome</a>
                    <a href="javascript:void(0)" onClick={this.close.bind(this, 1)}>X</a>
                  </div>
                </div>
                <div className="compatibility-item" style={{ display: this.state.tipTextShow }}>
                  <div className="compatibility-info">
                    <img src={waringPNG} alt="警告" />
                    <span>当前分辨率可能存在兼容性问题，推荐使用1920*1080分辨率访问。</span>
                  </div>
                  <div className="compatibility-handle">
                    <a className="close" href="javascript:void(0)" onClick={this.close.bind(this, 2)}>X</a>
                  </div>
                </div>
                <Layout className="resource_container">
                  <Router history={Historys.history}>
                    <Header className="resource_header">
                      <GlobalHeader
                        search={V => {
                          this.setState({ searchValu: V });
                        }}>
                      </GlobalHeader>
                    </Header>
                    <Content className="resource_main">
                      <GlobalMain search={this.state.searchValu} props={this.props}></GlobalMain>
                    </Content>
                    <Footer className="resource_footer">
                      <GlobalFooter></GlobalFooter>
                    </Footer>
                  </Router>
                </Layout>
              </div>
            </LocaleProvider>
          </Provider>
        </CssTransition>
      </Fragment >
    );
  }
}
export default App;
