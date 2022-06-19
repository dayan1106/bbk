// ==UserScript==
// @name         山东-公需课
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  山东省专业技术人员继续教育管理服务平台-公需课
// @author       帮帮客
// @license      bbk_1106
// @match        *://*.zhuanjipx.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zhuanjipx.com

// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// ==/UserScript==
class Verify {
    constructor() {
        var version = 'version';
        var hear = 'hear';
        var version_ = "0.1";
        var txt = '操作流程：\n' +
            '1.复制输入框里的内容；\n' +
            '2.点击浏览器右上角的油猴图标；\n' +
            '3.点击管理面板，找到刚安装的油猴脚本并点击打开；\n' +
            '4.在下方这行代码下，有一行是空白行，请将复制的内容粘贴上去；\n' +
            '[ // @require      https://www.g****in=zhuanjipx.com]\n' +
            '[                             空白行                          ]\n' + //！！！！注意：并非替换此行（28行），请将复制的内容粘贴到第10行！（鼠标滚轮往上滑，在上方）
            '[ // @grant         GM_setValue]\n' +
            '5.注意！！！记得保存后再刷新页面。 < Ctrl + C 复制输入框内容>';
        var str = '// @require      http://sharemeiriyouxuan.cn/sd/bbk_sd_jn_01.js';
        if (GM_listValues().indexOf("set") == -1) {
            GM_setValue("set", {
                "hear": "",
                "version": ""
            });
            confirm("初始化完毕!\n请按流程完成功能激活。");
        }
        let Set = GM_getValue("set");
        data();
        if (Set[hear] != true) {
            setTimeout(function () {
                prompt(txt, str);
            }, 500);
        }
    }
}

function data() {
    var url_n, url_t;
    url_n = unsafeWindow.location.href.split("/");
    url_t = url_n[url_n.length - 1].split("?")[0];
    if (url_t != "course_list_v2.aspx") {
        $('body').append(`
            <div id=gzh style="font-weight: bold;right: 17px;font-size: 14px;height: 32px;text-align: center;display: block;background: #ffffff;position: fixed; top:272px;width: 129px;color: #717375;margin-left: 0px;line-height: 15px;">微信扫一扫<br>关注帮帮客公众号</div>
            <iframe src="https://mp.weixin.qq.com/mp/qrcode?scene=10000004&size=102&__biz=Mzk0MjMxNTcxOQ==&mid=2247483681&idx=1&sn=382747485cbe09c94f7e7ee0eef363b5&send_time="
            style="right: 17px;display: block;position: fixed; top:143px;width: 129px;color: #555;margin-left: 0px;line-height: 11px;border-radius: 6px;height: 160px;">
            </iframe>
            `);
    }
}
new Verify();

(function() {
    'use strict';
    var banben,url_n;
    banben = '0.1';//版本号
    let Set = GM_getValue("set");
    if (Set["hear"] != true) {
        Set["hear"] = true;
    }
    Set["version"] = banben;
    GM_setValue("set", Set);//混淆加密https://www.bejson.com/encrypt/jsobfuscate/
    url_n = unsafeWindow.location.href.split("/");
    url_n = url_n[url_n.length - 1].split("?")[0];
    if (url_n.indexOf('courseDetails.html') == 0) {
        go();
        return;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', "http://139.224.47.209");
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        var txt = 'sid=' + ursfp() + '&version=' + banben;
        xhr.send(txt);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.responseText == '0') {
                    go();
                } else {
                    confirm(xhr.responseText);
                }
            }
        }
    } else if (url_n.indexOf('getInto.html') == 0) {
        $('body').append(`
            <a id="bbk" href="#" style="border: 2px solid rgb(133, 190, 208);cursor: pointer;
            border-radius: 5px;font-weight: bold;right: 17px;font-size: 17px;text-align: center;
            display: block;background: #ffffff;position: fixed; top:315px;width: 129px;color: #1277af;">Run 帮帮客</a>
        `);
    }

    function go() {
        var s = new Array();
        if (document.title.indexOf("课程详情") == 0) {
            if (document.querySelectorAll('.paraoverflow2')[0]) {
                document.querySelectorAll('.paraoverflow2')[0].click();
                var myTimer = setInterval(enterCourse, 1000);
                var t = setInterval(function(){
                    var c = document.querySelectorAll('.sonLi');//获取课程列表数量
                    var cc = c.length - 1;
                    var vd = document.getElementsByClassName('pv-icon-btn-play').length
                    if (vd == 1) {//检测到视频播放
                        var v = document.getElementsByClassName('pv-video')[0].src;//获取当前视频src值
                        if (s.indexOf(v) == -1) {
                            tusi('执行...',false);
                            s.push(v);
                            setTimeout(function(){
                                skipVideo();
                            },1000);
                        }
                    } else if (vd == 2 && c[cc].className == 'sonLi width100 on') {
                        setTimeout(function(){
                            if (document.getElementsByClassName('pv-icon-btn-play').length == 2) {
                                clearInterval(myTimer);
                                clearInterval(t);
                                location.reload(); //网页刷新
                            }
                        },1000);
                    }
                },2000);
                var w = document.querySelectorAll('.studyZt');
                var n = 0;
                for (var i = 0; i < w.length; i++) {
                    if (w[i].innerText == '完成学习') {
                        n++;
                    } else if (w[i].innerText == '开始学习') {
                        document.querySelectorAll('.sonLi a')[i].click()
                    }
                }
                if (w.length == n) {
                    tusi('课程：' + n + '章节均已完成',true);
                    clearInterval(myTimer);
                    clearInterval(t);
                }
            }
        }
    }//主程序
    function skipVideo() {
        var oVideo = document.getElementsByTagName('video')[0];
        if (oVideo) {
            oVideo.currentTime = oVideo.duration - 1;
        }
    } //这是跳过视频的代码
    function enterCourse() {
        var a = document.getElementsByTagName("BUTTON");
        for (var i = 0; i < a.length; i++) {
            if(a[i].innerHTML == "跳过") {
                tusi('跳过课堂答题',false);
                a[i].click();
            }
        }
    }
    function tusi(msg, zhi) {
        var duration = 2500;
        duration = isNaN(duration) ? 3000 : duration;
        var m = document.createElement('div');
        if (zhi == true) {
            m.setAttribute("id", "Toast");
        }
        m.innerHTML = msg;
        m.style.cssText = 'max-width:60%;min-width: 100%;padding:0 14px;height: 40px;'+
            'color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;'+
            'position: fixed;top: 2.5%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;'+
            'background: rgba(0, 0, 0,.7);font-size: 16px;';
        document.body.appendChild(m);
        setTimeout(function () {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            if (zhi == false) {
                m.style.opacity = '0';
                setTimeout(function () {
                    document.body.removeChild(m);
                }, d * 1000);
            }
        }, duration);
    } //吐司消息
    function guanbitusi() {
        var a = document.getElementById('Toast');
        if (a) {
            setTimeout(function () {
                let d = 0.5;
                a.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
                a.style.opacity = '0';
                setTimeout(function () {
                    document.body.removeChild(a);
                }, 1);
            }, 1);
        }
    } //关闭吐司
    document.addEventListener("click", function (e) {
        try{
            var m = document.getElementById('Toast');
            if (m) {
                setTimeout(function () {
                    var d = 0.5;
                    m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
                    m.style.opacity = '0';
                    setTimeout(function () {
                        if (m) {
                            document.body.removeChild(m);
                        }
                    }, 500);
                }, 500);
            }
            var nihao = document.getElementById("bbk");
            if (nihao) {
                document.getElementById("bbk").onclick = function () {
                    alert('你好');
                }
            }
        } catch (error) {
            console.log(error);
        };
    }, false); //监听鼠标左击事件，关闭吐司
    function ursfp() {
        var i = {
            each: function e(t, n, r) {
                if (null !== t)
                    if (this.nativeForEach && t.forEach === this.nativeForEach)
                        t.forEach(n, r);
                    else if (t.length === +t.length) {
                        for (var i = 0, a = t.length; i < a; i++) {
                            if (n.call(r, t[i], i, t) === {})
                                return
                        }
                    } else
                        for (var s in t) {
                            if (t.hasOwnProperty(s) && n.call(r, t[s], s, t) === {})
                                return
                        }
            }, map: function e(t, r, i) {
                var a = [];
                return null == t ? a : this.nativeMap && t.map === this.nativeMap ? t.map(r, i) : (this.each(t, function (e, t, n) {
                    a[a.length] = r.call(i, e, t, n)
                }),
                                                                                                   a)
            },
            x64Add: function e(t, n) {
                t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]],
                    n = [n[0] >>> 16, 65535 & n[0], n[1] >>> 16, 65535 & n[1]];
                var r = [0, 0, 0, 0];
                return r[3] += t[3] + n[3],
                    r[2] += r[3] >>> 16,
                    r[3] &= 65535,
                    r[2] += t[2] + n[2],
                    r[1] += r[2] >>> 16,
                    r[2] &= 65535,
                    r[1] += t[1] + n[1],
                    r[0] += r[1] >>> 16,
                    r[1] &= 65535,
                    r[0] += t[0] + n[0],
                    r[0] &= 65535, [r[0] << 16 | r[1], r[2] << 16 | r[3]]
            },
            x64Multiply: function e(t, n) {
                t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]],
                    n = [n[0] >>> 16, 65535 & n[0], n[1] >>> 16, 65535 & n[1]];
                var r = [0, 0, 0, 0];
                return r[3] += t[3] * n[3],
                    r[2] += r[3] >>> 16,
                    r[3] &= 65535,
                    r[2] += t[2] * n[3],
                    r[1] += r[2] >>> 16,
                    r[2] &= 65535,
                    r[2] += t[3] * n[2],
                    r[1] += r[2] >>> 16,
                    r[2] &= 65535,
                    r[1] += t[1] * n[3],
                    r[0] += r[1] >>> 16,
                    r[1] &= 65535,
                    r[1] += t[2] * n[2],
                    r[0] += r[1] >>> 16,
                    r[1] &= 65535,
                    r[1] += t[3] * n[1],
                    r[0] += r[1] >>> 16,
                    r[1] &= 65535,
                    r[0] += t[0] * n[3] + t[1] * n[2] + t[2] * n[1] + t[3] * n[0],
                    r[0] &= 65535, [r[0] << 16 | r[1], r[2] << 16 | r[3]]
            },
            x64Rotl: function e(t, n) {
                return n %= 64,
                    32 === n ? [t[1], t[0]] : n < 32 ? [t[0] << n | t[1] >>> 32 - n, t[1] << n | t[0] >>> 32 - n] : (n -= 32, [t[1] << n | t[0] >>> 32 - n, t[0] << n | t[1] >>> 32 - n])
            },
            x64LeftShift: function e(t, n) {
                return n %= 64,
                    0 === n ? t : n < 32 ? [t[0] << n | t[1] >>> 32 - n, t[1] << n] : [t[1] << n - 32, 0]
            },
            x64Xor: function e(t, n) {
                return [t[0] ^ n[0], t[1] ^ n[1]]
            },
            x64Fmix: function e(t) {
                return t = this.x64Xor(t, [0, t[0] >>> 1]),
                    t = this.x64Multiply(t, [4283543511, 3981806797]),
                    t = this.x64Xor(t, [0, t[0] >>> 1]),
                    t = this.x64Multiply(t, [3301882366, 444984403]),
                    t = this.x64Xor(t, [0, t[0] >>> 1])
            },
            x64hash128: function e(t, n) {
                t = t || "",
                    n = n || 0;
                for (var r = t.length % 16, i = t.length - r, a = [0, n], s = [0, n], o = [0, 0], u = [0, 0], l = [2277735313, 289559509], c = [1291169091, 658871167], d = 0; d < i; d += 16) {
                    o = [255 & t.charCodeAt(d + 4) | (255 & t.charCodeAt(d + 5)) << 8 | (255 & t.charCodeAt(d + 6)) << 16 | (255 & t.charCodeAt(d + 7)) << 24, 255 & t.charCodeAt(d) | (255 & t.charCodeAt(d + 1)) << 8 | (255 & t.charCodeAt(d + 2)) << 16 | (255 & t.charCodeAt(d + 3)) << 24],
                        u = [255 & t.charCodeAt(d + 12) | (255 & t.charCodeAt(d + 13)) << 8 | (255 & t.charCodeAt(d + 14)) << 16 | (255 & t.charCodeAt(d + 15)) << 24, 255 & t.charCodeAt(d + 8) | (255 & t.charCodeAt(d + 9)) << 8 | (255 & t.charCodeAt(d + 10)) << 16 | (255 & t.charCodeAt(d + 11)) << 24],
                        o = this.x64Multiply(o, l),
                        o = this.x64Rotl(o, 31),
                        o = this.x64Multiply(o, c),
                        a = this.x64Xor(a, o),
                        a = this.x64Rotl(a, 27),
                        a = this.x64Add(a, s),
                        a = this.x64Add(this.x64Multiply(a, [0, 5]), [0, 1390208809]),
                        u = this.x64Multiply(u, c),
                        u = this.x64Rotl(u, 33),
                        u = this.x64Multiply(u, l),
                        s = this.x64Xor(s, u),
                        s = this.x64Rotl(s, 31),
                        s = this.x64Add(s, a),
                        s = this.x64Add(this.x64Multiply(s, [0, 5]), [0, 944331445])
                }
                switch (o = [0, 0],
                        u = [0, 0],
                        r) {
                    case 15:
                        u = this.x64Xor(u, this.x64LeftShift([0, t.charCodeAt(d + 14)], 48));
                    case 14:
                        u = this.x64Xor(u, this.x64LeftShift([0, t.charCodeAt(d + 13)], 40));
                    case 13:
                        u = this.x64Xor(u, this.x64LeftShift([0, t.charCodeAt(d + 12)], 32));
                    case 12:
                        u = this.x64Xor(u, this.x64LeftShift([0, t.charCodeAt(d + 11)], 24));
                    case 11:
                        u = this.x64Xor(u, this.x64LeftShift([0, t.charCodeAt(d + 10)], 16));
                    case 10:
                        u = this.x64Xor(u, this.x64LeftShift([0, t.charCodeAt(d + 9)], 8));
                    case 9:
                        u = this.x64Xor(u, [0, t.charCodeAt(d + 8)]),
                            u = this.x64Multiply(u, c),
                            u = this.x64Rotl(u, 33),
                            u = this.x64Multiply(u, l),
                            s = this.x64Xor(s, u);
                    case 8:
                        o = this.x64Xor(o, this.x64LeftShift([0, t.charCodeAt(d + 7)], 56));
                    case 7:
                        o = this.x64Xor(o, this.x64LeftShift([0, t.charCodeAt(d + 6)], 48));
                    case 6:
                        o = this.x64Xor(o, this.x64LeftShift([0, t.charCodeAt(d + 5)], 40));
                    case 5:
                        o = this.x64Xor(o, this.x64LeftShift([0, t.charCodeAt(d + 4)], 32));
                    case 4:
                        o = this.x64Xor(o, this.x64LeftShift([0, t.charCodeAt(d + 3)], 24));
                    case 3:
                        o = this.x64Xor(o, this.x64LeftShift([0, t.charCodeAt(d + 2)], 16));
                    case 2:
                        o = this.x64Xor(o, this.x64LeftShift([0, t.charCodeAt(d + 1)], 8));
                    case 1:
                        o = this.x64Xor(o, [0, t.charCodeAt(d)]),
                            o = this.x64Multiply(o, l),
                            o = this.x64Rotl(o, 31),
                            o = this.x64Multiply(o, c),
                            a = this.x64Xor(a, o)
                }
                return a = this.x64Xor(a, [0, t.length]),
                    s = this.x64Xor(s, [0, t.length]),
                    a = this.x64Add(a, s),
                    s = this.x64Add(s, a),
                    a = this.x64Fmix(a),
                    s = this.x64Fmix(s),
                    a = this.x64Add(a, s),
                    s = this.x64Add(s, a), ("00000000" + (a[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (a[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (s[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (s[1] >>> 0).toString(16)).slice(-8)
            }
        }
        var tz = {
            canvasKey: function e(t) { //获取浏览器实时图像（画布）
                return this.isCanvasSupported() && t.push({
                    key: "canvas",
                    value: this.getCanvasFp()
                }),
                    t
            },
            getCanvasFp: function e() {
                var t = [],
                    n = document.createElement("canvas");
                n.width = 2e3,
                    n.height = 200,
                    n.style.display = "inline";
                var r = n.getContext("2d");
                return r.rect(0, 0, 10, 10),
                    r.rect(2, 2, 6, 6),
                    t.push("canvas winding:" + (r.isPointInPath(5, 5, "evenodd") === !1 ? "yes" : "no")),
                    r.textBaseline = "alphabetic",
                    r.fillStyle = "#f60",
                    r.fillRect(125, 1, 62, 20),
                    r.fillStyle = "#069",
                    r.font = "11pt Arial", r.font = "11pt no-real-font-123",
                    r.fillText("Cwm fjordbank glyphs vext quiz, ??", 2, 15),
                    r.fillStyle = "rgba(102, 204, 0, 0.2)",
                    r.font = "18pt Arial",
                    r.fillText("Cwm fjordbank glyphs vext quiz, ??", 4, 45),
                    r.globalCompositeOperation = "multiply",
                    r.fillStyle = "rgb(255,0,255)",
                    r.beginPath(),
                    r.arc(50, 50, 50, 0, 2 * Math.PI, !0),
                    r.closePath(),
                    r.fill(),
                    r.fillStyle = "rgb(0,255,255)",
                    r.beginPath(),
                    r.arc(100, 50, 50, 0, 2 * Math.PI, !0),
                    r.closePath(),
                    r.fill(),
                    r.fillStyle = "rgb(255,255,0)",
                    r.beginPath(),
                    r.arc(75, 100, 50, 0, 2 * Math.PI, !0),
                    r.closePath(),
                    r.fill(),
                    r.fillStyle = "rgb(255,0,255)",
                    r.arc(75, 75, 75, 0, 2 * Math.PI, !0),
                    r.arc(75, 75, 25, 0, 2 * Math.PI, !0),
                    r.fill("evenodd"),
                    t.push("canvas fp:" + n.toDataURL()),
                    t.join("~")
            },
            isCanvasSupported: function e() {
                var t = document.createElement("canvas");
                return !(!t.getContext || !t.getContext("2d"))
            }
        }
        var t = {
            "data": [{
                "key": "user_agent",
                "value": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36"
            }, {
                "key": "language",
                "value": "zh-CN"
            }, {
                "key": "color_depth",
                "value": 24
            }, {
                "key": "pixel_ratio",
                "value": 1
            }, {
                "key": "hardware_concurrency",
                "value": 4
            }, {
                "key": "resolution",
                "value": [1920, 1080]
            }, {
                "key": "available_resolution",
                "value": [1920, 1040]
            }, {
                "key": "timezone_offset",
                "value": -480
            }, {
                "key": "session_storage",
                "value": 1
            }, {
                "key": "local_storage",
                "value": 1
            }, {
                "key": "indexed_db",
                "value": 1
            }, {
                "key": "open_database",
                "value": 1
            }, {
                "key": "cpu_class",
                "value": "unknown"
            }, {
                "key": "navigator_platform",
                "value": "Win32"
            }, {
                "key": "do_not_track",
                "value": "unknown"
            }, {
                "key": "regular_plugins",
                "value": ["PDF Viewer::Portable Document Format::application/pdf~pdf,text/pdf~pdf", "Chrome PDF Viewer::Portable Document Format::application/pdf~pdf,text/pdf~pdf", "Chromium PDF Viewer::Portable Document Format::application/pdf~pdf,text/pdf~pdf", "Microsoft Edge PDF Viewer::Portable Document Format::application/pdf~pdf,text/pdf~pdf", "WebKit built-in PDF::Portable Document Format::application/pdf~pdf,text/pdf~pdf"]
            }, {
                "key": "canvas",
                "value": "Canvas_Bbk-1106"
            }, {
                "key": "webgl",
                "value": "WebGL_Bbk-1106"
            }, {
                "key": "adblock",
                "value": false
            }, {
                "key": "has_lied_languages",
                "value": false
            }, {
                "key": "has_lied_resolution",
                "value": false
            }, {
                "key": "has_lied_os",
                "value": false
            }, {
                "key": "has_lied_browser",
                "value": false
            }, {
                "key": "touch_support",
                "value": [0, false, false]
            }]
        }
        var us = []; //创建空数组
        us = tz.canvasKey(us); //获取canvasKey值
        t.data[16].value = us[0].value; //替换canvasKey值
        var e = t;
        var n = [];
        i.each(e.data, function (e) {
            t = e.value;
            "undefined" !== typeof e.value.join && (t = e.value.join(";"))
            n.push(t)
        });
        t = i.x64hash128(n.join("~~~"), 31);
        return t;
    }//设备指纹
})();