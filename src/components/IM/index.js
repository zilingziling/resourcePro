import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('im')
@observer
export default class index extends Component {
    state = {
        reconnectTimeout: 2000,
        mqtt: {},
        msg: ""
    }
    componentDidMount() {
        this.MQTTconnect();
    }
    render() {
        return (
            <div>

            </div>
        )
    }

    //实时数据变化
    addtopic(msg) {
        // this.msg = msg;
    }

    //实时通信
    MQTTconnect() {
        let mqttObj = new Paho.MQTT.Client(host, port, "client" + this.getuuid());
        var options = {
            timeout: 10,
            useSSL: useTLS,
            cleanSession: cleansession,
            onSuccess: this.onConnect.bind(this),
            onFailure: message => {
                //连接失败定时重连
                console.log("连接失败>>>即将自动启动重连>>>", message);
                setTimeout(() => {
                    this.MQTTconnect();
                }, this.state.reconnectTimeout);
            }
        };
        mqttObj.onConnectionLost = this.onConnectionLost.bind(this);
        mqttObj.onMessageArrived = this.onMessageArrived.bind(this);
        if (username != null) {
            options.userName = username;
            options.password = password;
        }
        this.setState({
            mqtt: mqttObj
        })
        mqttObj.connect(options);
    }
    //uuid随机生成
    getuuid() {
        var uid = [];
        var hexDigits = "0123456789abcdefghijklmnopqrst";
        for (var i = 0; i < 32; i++) {
            uid[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        uid[6] = "4";
        uid[15] = hexDigits.substr((uid[15] & 0x3) | 0x8, 1);
        var uuid = uid.join("");
        return uuid;
    }
    //连接
    onConnect() {
        //连接成功，订阅主题
        console.log("连接成功");
        this.state.mqtt.subscribe(addtopic, {
            qos: 2
        });

        //发布一个消息
        //   this.mqtt.send("aaaaaaa");
    }
    //连接丢失
    onConnectionLost(response) {
        console.log("异常掉线，掉线信息为:" + response.errorMessage);
    }

    //接收到消息，处理
    onMessageArrived(message) {
        var topics = message.destinationName;
        var msg = message.payloadString;
        console.log("接收消息>>>", msg);
        const msgObj = JSON.parse(msg);
        // this.IM_UPDATE(msgObj);
        this.props.im.IMInfo = msgObj;
        //判断主题
        if (topics == "mqtt-topic-demo") {
            //添加,此处同时可对数据进行增删改查，等相关数据操作
            this.addtopic(msg);
        } else {
            return;
        }
    }
}
