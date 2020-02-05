/**
 */
window.YJFPlayerUrl = {
    "HWFlashPlayer": []
}
window.YJFPlayerFullscreenPlayerIdx = 0;
window.YjFPlayer = {

    myBrowser: function () {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("trident") > -1 && !isOpera; //判断是否IE浏览器
        var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isSafari = userAgent.indexOf("Safari") > -1
            && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1
            && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

        if (isIE) {
            // var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            // reIE.test(userAgent);
            // var fIEVersion = parseFloat(RegExp["$1"]);
            // if (fIEVersion == 7) {
            //     return "IE7";
            // } else if (fIEVersion == 8) {
            //     return "IE8";
            // } else if (fIEVersion == 9) {
            //     return "IE9";
            // } else if (fIEVersion == 10) {
            //     return "IE10";
            // } else if (fIEVersion == 11) {
            //     return "IE11";
            // } else {
            //     return "0";
            // }//IE版本过低
            return "IE";
        }
        if (isOpera) {
            return "Opera";
        }
        if (isEdge) {
            return "Edge";
        }
        if (isFF) {
            return "FF";
        }
        if (isSafari) {
            return "Safari";
        }
        if (isChrome) {
            return "Chrome";
        }

    },

    myFlash: function (pP) {
        // console.log("浏览器类型>>>", YjFPlayer.myBrowser())
        if (YjFPlayer.myBrowser() && YjFPlayer.myBrowser().indexOf("IE") > -1) {
            return document[pP + "IE"];
        } else {
            return document[pP];
        }
    },

    onPlay: function (instId) {
        if (instId === -1) instId = "HWFlashPlayer";
        // console.log("当前的flashdom", instId)
        // console.log("当前的flashdom", YjFPlayer.myFlash(instId))
        // console.log("当前的播放地址URL", JSON.stringify(YJFPlayerUrl[instId]))
        YjFPlayer.myFlash(instId) && YjFPlayer.myFlash(instId).play && YjFPlayer.myFlash(instId).play(JSON.stringify(YJFPlayerUrl[instId]));
    },

    onPlay2: function (instId) {
        if (instId === -1) instId = "HWFlashPlayer";
        var url_json2 = [];
        url_json2[0] = YJFPlayerUrl[instId][YJFPlayerFullscreenPlayerIdx];
        YjFPlayer.myFlash(instId).play(JSON.stringify(url_json2));
    },

    onStop: function (instId) {
        if (instId === -1) instId = "HWFlashPlayer";
        YjFPlayer.myFlash(instId).stop();
    },

    onSetVolumn: function (v) {
        if (instId === -1) instId = "HWFlashPlayer";
        YjFPlayer.myFlash("HWFlashPlayer").setVolumn(v, 1); // 第二个参数是指定第一个视频画面打开声音。其他画面会关闭声音。
    },


    onSetParams: function (instId) {
        let pa = {
            "row": 1,
            "col": 1,
            "video_border_color": 1717581,
            "video_border_width": 1,
            "banner_bg_color": 1717581,
            "banner_bg_alpher": 0.5,
            "video_col_gap": 0,
            "video_row_gap": 0,
            "banner_font_size": 14,
            "show_footer": true
        };
        if (instId === -1) instId = "HWFlashPlayer";
        YjFPlayer.myFlash(instId) && YjFPlayer.myFlash(instId).setParams && YjFPlayer.myFlash(instId).setParams(JSON.stringify(pa));
    },


    onEvent: function (str, instId, playerIdx) {
        console.log(str + "_" + instId + " " + playerIdx);
        if (str == "PLAYER_INIT_DONE") {
            setTimeout(YjFPlayer.onSetParams(instId), 1)
            setTimeout(YjFPlayer.onPlay(instId), 1);
        } else if (str == "PLAYER_SCREEN_FULL") {
            YJFPlayerFullscreenPlayerIdx = playerIdx;
            setTimeout(YjFPlayer.onPlay(instId), 1); //可以播放大码率
        } else if (str == "PLAYER_SCREEN_NORMAL") {
            setTimeout(YjFPlayer.onPlay(instId), 1); //播放小码率
        }
    },

}

