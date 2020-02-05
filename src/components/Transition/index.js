import React, { Fragment, Component } from 'react';
import { Transition } from "react-transition-group";
import { Spin } from 'antd';
import('./index.less');

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
}
const transitionSpin = {
    entering: true,
    entered: false,
}

class app extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }
    componentDidMount() {
        this.setState({ show: true })
    }
    render() {
       
        return (
            <Transition in={this.state.show} timeout={duration}>
                {(state) => (
                    <Spin spinning={transitionSpin[state]}>
                        <div style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }}>
                            {this.props.children}
                        </div>
                    </Spin>
                )}
            </Transition>
        );
    }
}


export default app;