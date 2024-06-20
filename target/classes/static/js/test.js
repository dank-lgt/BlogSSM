(window.webpackJsonp = window.webpackJsonp || []).push([[16], {
    186: function (t, i, e) {
        "use strict";
        (function (t) {
            function n(t) {
                return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                }
                    : function (t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    }
                )(t)
            }
            e.d(i, "k", (function () {
                return s
            }
            )),
                e.d(i, "g", (function () {
                    return o
                }
                )),
                e.d(i, "f", (function () {
                    return r
                }
                )),
                e.d(i, "i", (function () {
                    return a
                }
                )),
                e.d(i, "j", (function () {
                    return c
                }
                )),
                e.d(i, "d", (function () {
                    return l
                }
                )),
                e.d(i, "h", (function () {
                    return h
                }
                )),
                e.d(i, "a", (function () {
                    return u
                }
                )),
                e.d(i, "c", (function () {
                    return f
                }
                )),
                e.d(i, "b", (function () {
                    return p
                }
                )),
                e.d(i, "e", (function () {
                    return d
                }
                ));
            var s = function (t, i) {
                t && ("string" != typeof i && (i = JSON.stringify(i)),
                    window.localStorage.setItem(t, i))
            }
                , o = function (t) {
                    if (t)
                        return JSON.parse(window.localStorage.getItem(t))
                }
                , r = function (t, i) {
                    var e = ""
                        , n = (e = null == t ? new Date : new Date(parseInt(t))).getFullYear()
                        , s = e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1
                        , o = e.getDate() < 10 ? "0" + e.getDate() : e.getDate()
                        , r = e.getHours() < 10 ? "0" + e.getHours() : e.getHours()
                        , a = e.getMinutes() < 10 ? "0" + e.getMinutes() : e.getMinutes()
                        , c = e.getSeconds() < 10 ? "0" + e.getSeconds() : e.getSeconds();
                    return 0 === i || void 0 === i ? n + "-" + s + "-" + o : 1 === i ? n + "/" + s + "/" + o : 2 === i ? n + "-" + s + "-" + o + " " + r + ":" + a + ":" + c : 3 === i ? r + ":" + a : 4 === i ? s + "月" + o + "日" : 5 === i ? s + "-" + o + "  " + r + ":" + a : 6 == i ? n + "年" + s + "月" : 7 == i ? n + "." + s + "." + o : 8 == i ? n + "-" + s + "-" + o + " " + r + ":" + a : 9 == i ? n + "年" + s + "月" + o + "日" : void 0
                };
            var a = function (t) {
                if (t) {
                    if (t.match(/^https:\/\//))
                        return t;
                    var i = t.replace(/^http:\/\/|:\/\/|\/\/|\//, "https://");
                    return i.match(/^https:\/\//) ? i : "https://" + i
                }
            };
            function c(t) {
                var i = -window.scrollY / (t / 15)
                    , e = setInterval((function () {
                        0 != window.scrollY ? window.scrollBy(0, i) : clearInterval(e)
                    }
                    ), 15)
            }
            function l(t, i) {
                var e;
                return e = i - t,
                    e = Math.abs(e),
                    Math.ceil(e / 864e5)
            }
            function h(t) {
                /AppleWebKit.*Mobile.*/i.test(navigator.userAgent) && (location.href = t)
            }
            function u(t) {
                var i = parseInt(t);
                return i >= 1e8 ? i = (i / 1e8).toFixed(1) + "亿" : i >= 1e4 ? i = (i / 1e4).toFixed(1) + "万" : i
            }
            var f = {
                get: function (t) {
                    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(t).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
                },
                set: function (t, i, e) {
                    e = void 0 !== e ? e : 365;
                    var n = new Date;
                    n.setTime(n.getTime() + 24 * e * 60 * 60 * 1e3),
                        document.cookie = t + "=" + escape(i) + ";expires=" + n.toGMTString() + "; path=/; domain=.bilibili.com"
                },
                delete: function (t) {
                    this.set(t, "", -1)
                }
            }
                , p = function (t, i) {
                    var e = {
                        result: !0
                    };
                    for (var n in t) {
                        var s = i[n];
                        if (s) {
                            if ("" === t[n].replace(/\s+/g, "")) {
                                var o = Array.isArray(s.errormsg) ? s.errormsg[0] : s.errormsg;
                                e.msg = o,
                                    e.result = !1;
                                break
                            }
                            if (s.ruleNum && t[n].replace(/\s+/g, "").length !== s.ruleNum) {
                                e.msg = s.errormsg[1],
                                    e.result = !1;
                                break
                            }
                        }
                    }
                    return e
                }
                , d = function (t, i, e) {
                    var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                    return function (t) {
                        if (!t)
                            return t;
                        var s = (t = a(t)).match(/(.*\.(jpg|jpeg|gif|png|JPG|JPEG|GIF|PNG|webp|WEBP))(\?.*)?/)
                            , o = -1 != t.indexOf("/bfs/");
                        try {
                            if (!s || "gif" === s[2] || !o || !s)
                                return t
                        } catch (i) {
                            return t
                        }
                        var r = i && e ? "@" + Math.round(+i * v) + "w_" + Math.round(+e * v) + "h" : "@";
                        n && (r += "_1c");
                        var c = s[3] ? s[3] : "";
                        return m ? s[1] + r + ".webp" + c : s[1] + r + "." + s[2] + c
                    }(t)
                }
                , m = function () {
                    try {
                        return g.document && 0 == g.document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")
                    } catch (t) {
                        return !1
                    }
                }
                , g = "object" == ("undefined" == typeof self ? "undefined" : n(self)) && self.self === self && self || "object" == (void 0 === t ? "undefined" : n(t)) && t.global === t && t || void 0
                , v = g.devicePixelRatio && 3 === g.devicePixelRatio ? 3 : 2
        }
        ).call(this, e(5))
    },
    187: function (t, i, e) { },
    188: function (t, i, e) { },
    189: function (t, i, e) {
        "use strict";
        var n = {
            name: "top-header"
        }
            , s = (e(190),
                e(2))
            , o = Object(s.a)(n, (function () {
                this._self._c;
                return this._m(0)
            }
            ), [function () {
                var t = this._self._c;
                return t("div", {
                    staticClass: "top-header"
                }, [t("div", {
                    staticClass: "top-img"
                })])
            }
            ], !1, null, "244bdf4e", null);
        i.a = o.exports
    },
    190: function (t, i, e) {
        "use strict";
        e(187)
    },
    191: function (t, i, e) {
        "use strict";
        var n = {
            name: "security-nav",
            data: function () {
                return {
                    navData: [{
                        to: "home",
                        name: '首<b style="width:28px; display:inline-block"></b>页',
                        isOutLink: !1
                    }, {
                        to: "big",
                        name: '<span style="letter-spacing: 7px;">大会员</span>',
                        isOutLink: !0,
                        outLink: "https://account.bilibili.com/big?spm_id_from=333.33"
                    }, {
                        to: "points",
                        name: "会员积分",
                        isOutLink: !1
                    }, {
                        to: "setting",
                        name: "我的信息",
                        isOutLink: !1
                    }, {
                        to: "face",
                        name: "我的头像",
                        isOutLink: !1
                    }, {
                        to: "fansmedal",
                        name: "粉丝勋章",
                        isOutLink: !0,
                        outLink: "https://live.bilibili.com/p/html/live-fansmedal-wall/#/view-medal"
                    }, {
                        to: "nameplate",
                        name: "成就勋章",
                        isOutLink: !0,
                        outLink: "https://account.bilibili.com/site/nameplate.html"
                    }, {
                        to: "site",
                        name: "账号安全",
                        isOutLink: !0,
                        outLink: "https://passport.bilibili.com/account/security",
                        isopen: !0
                    }, {
                        to: "blacklist",
                        name: "黑名单管理",
                        isOutLink: !1
                    }, {
                        to: "coin",
                        name: "我的硬币",
                        isOutLink: !1
                    }, {
                        to: "record",
                        name: "我的记录",
                        isOutLink: !1
                    }, {
                        to: "identification",
                        name: "实名认证",
                        isOutLink: !0,
                        outLink: "//account.bilibili.com/account/realname/identify",
                        isopen: !0
                    }, {
                        to: "invitation",
                        name: "邀请注册",
                        isOutLink: !1
                    }, {
                        to: "notice",
                        name: "通知设置",
                        isOutLink: !1,
                        icon: "setting"
                    }],
                    navLink: [{
                        name: "个人空间",
                        to: "//space.bilibili.com"
                    }, {
                        name: "我的钱包",
                        to: "https://pay.bilibili.com/pay-v2-web/bcoin_index"
                    }, {
                        name: "创作中心",
                        to: "https://member.bilibili.com/v2#/home"
                    }, {
                        name: "直播中心",
                        to: "//link.bilibili.com/p/center/index"
                    }]
                }
            },
            computed: {
                pathName: function () {
                    return this.$route.path.split("/")[1]
                }
            },
            methods: {
                getCls: function (t, i) {
                    return "icon-".concat(i)
                },
                handleisOutLink: function (t, i) {
                    if (t.isOutLink) {
                        var e = this.navData[i].outLink;
                        t.isopen ? window.open(e) : location.href = e
                    } else
                        this.$router.push({
                            name: t.to
                        })
                }
            }
        }
            , s = (e(192),
                e(2))
            , o = Object(s.a)(n, (function () {
                var t = this
                    , i = t._self._c;
                return i("div", {
                    staticClass: "security-left"
                }, [i("span", {
                    staticClass: "security-title"
                }, [t._v("个人中心")]), t._v(" "), i("ul", {
                    staticClass: "security-ul",
                    attrs: {
                        id: "ser-ul"
                    }
                }, t._l(t.navData, (function (e, n) {
                    return i("li", {
                        key: n,
                        staticClass: "security-list",
                        class: {
                            on: e.to === t.pathName
                        },
                        on: {
                            click: function (i) {
                                return t.handleisOutLink(e, n)
                            }
                        }
                    }, [i("i", {
                        staticClass: "security-icon",
                        class: t.getCls(e, e.icon || n)
                    }), t._v(" "), i("span", {
                        staticClass: "security-nav-name",
                        domProps: {
                            innerHTML: t._s(e.name)
                        }
                    })])
                }
                )), 0), t._v(" "), i("ul", {
                    staticClass: "security-ul report-wrap-module",
                    attrs: {
                        id: "securityOutLink"
                    }
                }, t._l(t.navLink, (function (e, n) {
                    return i("li", {
                        key: n,
                        staticClass: "security-list-jump"
                    }, [i("a", {
                        staticClass: "security-list-link-jump",
                        attrs: {
                            href: e.to,
                            target: "_blank"
                        }
                    }, [t._v("\n        " + t._s(e.name) + "\n        "), i("i", {
                        staticClass: "security-list-jump-icon"
                    })])])
                }
                )), 0)])
            }
            ), [], !1, null, "42a60642", null);
        i.a = o.exports
    },
    192: function (t, i, e) {
        "use strict";
        e(188)
    },
    289: function (t, i, e) { },
    290: function (t, i, e) { },
    297: function (t, i, e) { },
    298: function (t, i, e) { },
    436: function (t, i, e) {
        "use strict";
        e(289)
    },
    437: function (t, i, e) {
        "use strict";
        e(290)
    },
    456: function (t, i, e) {
        t.exports = e.p + "assets/local_icon.png"
    },
    457: function (t, i, e) {
        t.exports = e.p + "assets/nft_icon.png"
    },
    458: function (t, i, e) {
        "use strict";
        e(297)
    },
    459: function (t, i, e) {
        "use strict";
        e(298)
    },
    569: function (t, i, e) {
        "use strict";
        e.r(i);
        var n, s = e(189), o = e(191), r = {
            props: {
                ratio: {},
                img: {},
                srcSize: {}
            },
            data: function () {
                return {
                    rec: {
                        w: 0,
                        h: 0,
                        l: 0,
                        t: 0
                    },
                    pl: 0,
                    pt: 0,
                    action: "",
                    actionPoint: {
                        x: 0,
                        y: 0
                    },
                    referPoint: {
                        x: 0,
                        y: 0
                    },
                    $rec: null
                }
            },
            computed: {
                showBox: function () {
                    return this.rec.w && this.rec.h
                },
                imgStyle: function () {
                    return "width:".concat(this.srcSize.w, "px;height:").concat(this.srcSize.h, "px;top:").concat(-this.rec.t, "px;left:").concat(-this.rec.l, "px;")
                },
                recStyle: function () {
                    return "width:".concat(this.rec.w, "px;height:").concat(this.rec.h, "px;left:").concat(this.rec.l, "px;top:").concat(this.rec.t, "px;")
                }
            },
            mounted: function () {
                window.addEventListener("mouseup", this.disableDrag),
                    window.addEventListener("mousemove", this.updateRec)
            },
            beforeDestroy: function () {
                window.removeEventListener("mouseup", this.disableDrag),
                    window.removeEventListener("mousemove", this.updateRec)
            },
            methods: {
                getLeft: function (t) {
                    for (var i = t.offsetLeft, e = t.offsetParent; e;)
                        i += e.offsetLeft,
                            e = e.offsetParent;
                    return i
                },
                getTop: function (t) {
                    for (var i = t.offsetTop, e = t.offsetParent; e;)
                        i += e.offsetTop,
                            e = e.offsetParent;
                    return i
                },
                initAction: function (t, i, e) {
                    this.action = t,
                        this.pl = this.getLeft(this.$el),
                        this.pt = this.getTop(this.$el),
                        this.actionPoint = {
                            x: i,
                            y: e
                        },
                        this.referPoint = {
                            x: this.rec.l,
                            y: this.rec.t
                        },
                        "drag-lt" === t ? this.referPoint = {
                            x: this.rec.l + this.rec.w,
                            y: this.rec.t + this.rec.h
                        } : "drag-lb" === t ? this.referPoint = {
                            x: this.rec.l + this.rec.w,
                            y: this.rec.t
                        } : "drag-rt" === t ? this.referPoint = {
                            x: this.rec.l,
                            y: this.rec.t + this.rec.h
                        } : "drag-rb" === t && (this.referPoint = {
                            x: this.rec.l,
                            y: this.rec.t
                        })
                },
                pointMouseDown: function (t, i) {
                    this.initAction(t, i.pageX, i.pageY),
                        i.stopPropagation()
                },
                boxMouseDown: function (t) {
                    this.initAction("move", t.pageX, t.pageY),
                        t.stopPropagation()
                },
                wrapMouseDown: function (t) {
                    this.rec.w && this.rec.h || (this.initAction("cross", t.pageX, t.pageY),
                        this.rec = {
                            w: 0,
                            h: 0,
                            l: t.pageX - this.pl,
                            t: t.pageY - this.pt
                        },
                        t.stopPropagation())
                },
                disableDrag: function () {
                    this.action && (this.action = "",
                        this.$emit("selectEnd"))
                },
                clearRec: function () {
                    this.action = "",
                        this.rec = {
                            w: 0,
                            h: 0,
                            l: 0,
                            t: 0
                        }
                },
                updateRec: function (t) {
                    if (this.action) {
                        var i = this.$el.offsetWidth
                            , e = this.$el.offsetHeight
                            , n = t.pageX - this.actionPoint.x
                            , s = t.pageY - this.actionPoint.y
                            , o = t.pageX
                            , r = t.pageY
                            , a = 0
                            , c = 0
                            , l = 0
                            , h = 0;
                        0 === n && 0 === s || ("move" === this.action ? (l = s + this.referPoint.y,
                            h = n + this.referPoint.x,
                            l <= 0 ? l = 0 : l + this.rec.h >= e && (l = e - this.rec.h),
                            h <= 0 ? h = 0 : h + this.rec.w >= i && (h = i - this.rec.w),
                            this.rec.l = h,
                            this.rec.t = l) : "cross" === this.action ? n > 0 && s > 0 ? ((c = (a = n + this.rec.l >= i ? i - this.rec.l : n) / this.ratio) + this.rec.t > e && (a = (c = e - this.rec.t) * this.ratio),
                                this.rec.w = a,
                                this.rec.h = c) : n > 0 && s < 0 ? ((c = (a = n + this.referPoint.x >= i ? i - this.referPoint.x : n) / this.ratio) >= this.referPoint.y && (a = (c = this.referPoint.y) * this.ratio),
                                    this.rec.t = this.referPoint.y - c,
                                    this.rec.w = a,
                                    this.rec.h = c) : n < 0 && s < 0 ? ((c = (a = n + this.referPoint.x <= 0 ? this.referPoint.x : -n) / this.ratio) >= this.referPoint.y && (a = (c = this.referPoint.y) * this.ratio),
                                        this.rec.t = this.referPoint.y - c,
                                        this.rec.l = this.referPoint.x - a,
                                        this.rec.w = a,
                                        this.rec.h = c) : n < 0 && s > 0 && ((c = (a = n + this.referPoint.x <= 0 ? this.referPoint.x : -n) / this.ratio) + this.referPoint.y >= e && (a = (c = e - this.referPoint.y) * this.ratio),
                                            this.rec.l = this.referPoint.x - a,
                                            this.rec.w = a,
                                            this.rec.h = c) : "drag-lt" !== this.action && "drag-rt" !== this.action && "drag-lb" !== this.action && "drag-rb" !== this.action || (a = o - (this.referPoint.x + this.pl),
                                                c = r - (this.referPoint.y + this.pt),
                                                a < 0 && c < 0 ? ((c = (a = -1 * a >= this.referPoint.x ? this.referPoint.x : -1 * a) / this.ratio) >= this.referPoint.y && (a = (c = this.referPoint.y) * this.ratio),
                                                    this.rec.l = this.referPoint.x - a,
                                                    this.rec.t = this.referPoint.y - c) : a < 0 && c > 0 ? ((c = (a = -1 * a >= this.referPoint.x ? this.referPoint.x : -1 * a) / this.ratio) >= e - this.referPoint.y && (a = (c = e - this.referPoint.y) * this.ratio),
                                                        this.rec.l = this.referPoint.x - a,
                                                        this.rec.t = this.referPoint.y) : a > 0 && c < 0 ? ((c = (a = a >= i - this.referPoint.x ? i - this.referPoint.x : a) / this.ratio) >= this.referPoint.y && (a = (c = this.referPoint.y) * this.ratio),
                                                            this.rec.l = this.referPoint.x,
                                                            this.rec.t = this.referPoint.y - c) : a > 0 && c > 0 && ((c = (a = a >= i - this.referPoint.x ? i - this.referPoint.x : a) / this.ratio) >= e - this.referPoint.y && (a = (c = e - this.referPoint.y) * this.ratio),
                                                                this.rec.l = this.referPoint.x,
                                                                this.rec.t = this.referPoint.y),
                                                this.rec.w = a,
                                                this.rec.h = c),
                            this.$emit("selectChange"),
                            t.preventDefault())
                    }
                }
            }
        }, a = (e(436),
            e(2)), c = Object(a.a)(r, (function () {
                var t = this
                    , i = t._self._c;
                return i("div", {
                    staticClass: "crop-wrap",
                    on: {
                        mousedown: function (i) {
                            return i.preventDefault(),
                                t.wrapMouseDown.apply(null, arguments)
                        }
                    }
                }, [i("div", {
                    staticClass: "shadow-box",
                    style: t.recStyle
                }, [i("img", {
                    staticClass: "shadow-img",
                    style: t.imgStyle,
                    attrs: {
                        src: t.img
                    }
                })]), t._v(" "), i("div", {
                    staticClass: "crop-box",
                    class: t.showBox ? "show" : "",
                    style: t.recStyle,
                    on: {
                        mousedown: t.boxMouseDown
                    }
                }, [i("span", {
                    staticClass: "drag-point point-lt",
                    on: {
                        mousedown: function (i) {
                            return t.pointMouseDown("drag-lt", i)
                        }
                    }
                }), t._v(" "), i("span", {
                    staticClass: "drag-point point-lb",
                    on: {
                        mousedown: function (i) {
                            return t.pointMouseDown("drag-lb", i)
                        }
                    }
                }), t._v(" "), i("span", {
                    staticClass: "drag-point point-rt",
                    on: {
                        mousedown: function (i) {
                            return t.pointMouseDown("drag-rt", i)
                        }
                    }
                }), t._v(" "), i("span", {
                    staticClass: "drag-point point-rb",
                    on: {
                        mousedown: function (i) {
                            return t.pointMouseDown("drag-rb", i)
                        }
                    }
                })])])
            }
            ), [], !1, null, "ff0061fa", null).exports, l = {
                name: "toast",
                props: ["text", "show"],
                watch: {
                    show: function (t) {
                        var i = this;
                        !0 === t && setTimeout((function () {
                            i.$emit("close-toast", {
                                show: !1
                            })
                        }
                        ), 3e3)
                    }
                }
            }, h = (e(437),
                Object(a.a)(l, (function () {
                    var t = this._self._c;
                    return t("transition", {
                        attrs: {
                            name: "fade"
                        }
                    }, [this.show ? t("div", {
                        staticClass: "toast-box"
                    }, [this._v("\n    " + this._s(this.text) + "\n  ")]) : this._e()])
                }
                ), [], !1, null, "777cfc84", null).exports), u = e(60), f = e(291), p = e.n(f), d = e(186), m = {
                    components: {
                        SelectBox: c,
                        Toast: h
                    },
                    data: function () {
                        return {
                            img: null,
                            $srcImg: null,
                            $resImg: null,
                            $input: null,
                            $imgContainer: null,
                            $preContainer: null,
                            nw: 0,
                            nh: 0,
                            clipData: null,
                            ratio: 1,
                            imgSize: {
                                w: 0,
                                h: 0
                            },
                            containerTop: 0,
                            blobObj: null,
                            oldFace: "",
                            responseMsg: "",
                            toastFlag: !1,
                            IdentityDialogFlag: !1,
                            uploadFlag: !0,
                            localIcon: e(456),
                            nftIcon: e(457),
                            isShowIframe: !1
                        }
                    },
                    computed: {
                        autoHeight: function () {
                            return {
                                height: this.img ? "180px" : "84px"
                            }
                        }
                    },
                    mounted: function () {
                        var t = this;
                        this.$input = this.$el.querySelectorAll("#file_input")[0],
                            this.$srcImg = this.$el.querySelectorAll("#clip_src_img")[0],
                            this.$resImg = this.$el.querySelectorAll("#clip_res_img")[0],
                            this.$imgContainer = this.$el.querySelectorAll(".img-container")[0],
                            this.$preContainer = this.$el.querySelectorAll(".pre-container")[0],
                            this.$containerBox = this.$el.querySelectorAll(".container-bg")[0];
                        var i = this;
                        window.addEventListener("message", (function (t) {
                            t.data && "selectbtn" === t.data.key && (t.data && t.data.data && t.data.data.errMsg ? (i.toastFlag = !0,
                                i.responseMsg = t.data.data.errMsg) : (i.isShowIframe = !1,
                                    window.location.reload())),
                                t.data && "closebtn" === t.data.key && (i.isShowIframe = !1)
                        }
                        )),
                            u.sb().then((function (i) {
                                t.oldFace = Object(d.i)(i.data.face) + "@150w_150h.jpg"
                            }
                            ))
                    },
                    methods: {
                        selectChange: function () {
                            var t = this.$refs.box.rec;
                            t.w > 0 && t.h > 0 && this.updatePreview()
                        },
                        selectEnd: function () {
                            var t = this.$refs.box.rec;
                            t.w > 0 && t.h > 0 && this.clip()
                        },
                        fileChange: function () {
                            var t = this
                                , i = new FileReader;
                            i.onloadend = function () {
                                t.img = i.result
                            }
                                ,
                                this.$input.files && this.$input.files[0] && i.readAsDataURL(this.$input.files[0])
                        },
                        srcImgLoaded: function () {
                            this.nw = this.$srcImg.naturalWidth,
                                this.nh = this.$srcImg.naturalHeight,
                                this.clearSelect(),
                                this.setImgSize(),
                                this.updatePreview(),
                                this.clip()
                        },
                        clearSelect: function () {
                            this.$refs.box.clearRec(),
                                this.clipData = null
                        },
                        setImgSize: function () {
                            var t = this.nw / this.nh
                                , i = this.$containerBox.clientWidth
                                , e = this.$containerBox.clientHeight
                                , n = 0
                                , s = 0;
                            t >= this.ratio ? (this.imgSize.w = i,
                                this.imgSize.h = i / t,
                                this.containerTop = (e - this.imgSize.h) / 2,
                                n = (s = this.imgSize.h) * this.ratio) : (this.imgSize.h = e,
                                    this.imgSize.w = e * t,
                                    this.containerTop = 0,
                                    s = (n = this.imgSize.w) / this.ratio),
                                this.$srcImg.setAttribute("style", "width:".concat(this.imgSize.w, "px;height:").concat(this.imgSize.h, "px;")),
                                this.$imgContainer.setAttribute("style", "width:".concat(this.imgSize.w, "px;height:").concat(this.imgSize.h, "px;top:").concat(this.containerTop, "px;")),
                                this.$refs.box.rec = {
                                    w: n,
                                    h: s,
                                    l: 0,
                                    t: 0
                                }
                        },
                        getComputedRec: function (t) {
                            var i = this.$imgContainer.offsetWidth
                                , e = this.$imgContainer.offsetHeight
                                , n = i / this.nw
                                , s = e / this.nh;
                            return {
                                l: t.l / n,
                                t: t.t / s,
                                w: t.w / n,
                                h: t.h / s
                            }
                        },
                        updatePreview: function () {
                            var t = this.$refs.box.rec
                                , i = this.$preContainer.offsetWidth
                                , e = this.$preContainer.offsetHeight
                                , n = i / t.w
                                , s = e / t.h
                                , o = n * this.$imgContainer.offsetWidth
                                , r = s * this.$imgContainer.offsetHeight
                                , a = -t.l * n
                                , c = -t.t * s;
                            this.$resImg.setAttribute("style", "width:".concat(o, "px;height:").concat(r, "px;top:").concat(c, "px;left:").concat(a, "px;"))
                        },
                        clip: function () {
                            var t = this.$refs.box.rec;
                            if (t.w && t.h) {
                                var i = document.createElement("canvas")
                                    , e = i.getContext("2d")
                                    , n = this.getComputedRec(t);
                                i.width = n.w,
                                    i.height = n.h,
                                    e.fillStyle = "#fff",
                                    e.fillRect(-n.l, -n.t, this.nw, this.nh),
                                    e.drawImage(this.$srcImg, -n.l, -n.t, this.nw, this.nh),
                                    this.clipData = i.toDataURL("image/jpeg", .9),
                                    this.blobObj = this.dataURLtoBlob(this.clipData)
                            }
                        },
                        dataURLtoBlob: function (t) {
                            for (var i = t.split(","), e = i[0].match(/:(.*?);/)[1], n = atob(i[1]), s = n.length, o = new Uint8Array(s); s--;)
                                o[s] = n.charCodeAt(s);
                            return new Blob([o], {
                                type: e
                            })
                        },
                        uploadFn: function () {
                            if (null !== this.blobObj && this.uploadFlag) {
                                this.uploadFlag = !1;
                                var t = this
                                    , i = new FormData;
                                i.append("dopost", "save"),
                                    i.append("DisplayRank", "10000"),
                                    i.append("face", this.blobObj),
                                    p.a.post("//api.bilibili.com/x/member/web/face/update?csrf=" + d.c.get("bili_jct"), i, {
                                        withCredentials: !0,
                                        headers: {
                                            "Content-Type": "multipart/form-data, boundary=AaB03x"
                                        }
                                    }).then((function (i) {
                                        var e = i.data;
                                        t.uploadFlag = !0,
                                            0 === e.code ? (t.uploadFlag = !1,
                                                t.toastFlag = !0,
                                                t.responseMsg = "更新成功",
                                                setTimeout((function () {
                                                    window.location.href = "//account.bilibili.com/account/face/mall"
                                                }
                                                ), 1e3)) : 40012 === e.code ? (t.toastFlag = !0,
                                                    t.responseMsg = "头像格式错误") : 40013 === e.code ? (t.toastFlag = !0,
                                                        t.responseMsg = "头像大小不能超过2M") : 61001 === e.code || 61002 === e.code ? t.IdentityDialogFlag ? IdentityDialog(e.code) : (t.IdentityDialogFlag = !0,
                                                            new IdentityDialog(e.code)) : (t.toastFlag = !0,
                                                                t.responseMsg = e.message)
                                    }
                                    )).catch((function () {
                                        t.uploadFlag = !0
                                    }
                                    ))
                            }
                        },
                        closeToast: function (t) {
                            this.toastFlag = t.show,
                                this.responseMsg = ""
                        },
                        handleNftFace: function () {
                            this.isShowIframe = !0
                        }
                    }
                };
        e(458);
        function g(t) {
            return (g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            }
                : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                }
            )(t)
        }
        function v(t, i, e) {
            return (i = function (t) {
                var i = function (t, i) {
                    if ("object" !== g(t) || null === t)
                        return t;
                    var e = t[Symbol.toPrimitive];
                    if (void 0 !== e) {
                        var n = e.call(t, i || "default");
                        if ("object" !== g(n))
                            return n;
                        throw new TypeError("@@toPrimitive must return a primitive value.")
                    }
                    return ("string" === i ? String : Number)(t)
                }(t, "string");
                return "symbol" === g(i) ? i : String(i)
            }(i)) in t ? Object.defineProperty(t, i, {
                value: e,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[i] = e,
                t
        }
        var w = {
            components: (n = {
                CustomCropper: Object(a.a)(m, (function () {
                    var t = this
                        , i = t._self._c;
                    return i("div", {
                        staticClass: "cropper-modal"
                    }, [i("div", {
                        staticClass: "overlay"
                    }), t._v(" "), i("div", {
                        staticClass: "modal"
                    }, [t._m(0), t._v(" "), i("div", {
                        staticClass: "modal-content clearfix"
                    }, [i("div", {
                        staticClass: "img-clip-wrap"
                    }, [i("div", {
                        staticClass: "container-bg",
                        style: t.autoHeight
                    }, [i("div", {
                        staticClass: "img-container"
                    }, [i("img", {
                        attrs: {
                            id: "clip_src_img",
                            src: t.img
                        },
                        on: {
                            load: t.srcImgLoaded
                        }
                    }), t._v(" "), i("div", {
                        staticClass: "shadow-box"
                    }), t._v(" "), i("Select-Box", {
                        ref: "box",
                        attrs: {
                            srcSize: t.imgSize,
                            ratio: t.ratio,
                            img: t.img
                        },
                        on: {
                            selectEnd: t.selectEnd,
                            selectChange: t.selectChange
                        }
                    })], 1)]), t._v(" "), i("label", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !t.img,
                            expression: "!img"
                        }],
                        staticClass: "first-change-lb",
                        attrs: {
                            for: "file_input"
                        }
                    }, [i("img", {
                        staticClass: "first-change-lb_img",
                        attrs: {
                            src: t.localIcon
                        }
                    }), t._v(" "), i("span", [t._v("选择本地图片")])]), t._v(" "), i("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: t.img,
                            expression: "img"
                        }],
                        staticClass: "reset-img"
                    }, [t._m(1)]), t._v(" "), i("input", {
                        attrs: {
                            type: "file",
                            id: "file_input",
                            accept: "image/png,image/jpg,image/jpeg"
                        },
                        on: {
                            change: t.fileChange
                        }
                    }), t._v(" "), i("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !t.img,
                            expression: "!img"
                        }],
                        staticClass: "nft-wrapper",
                        on: {
                            click: t.handleNftFace
                        }
                    }, [i("img", {
                        staticClass: "nft-wrapper_img",
                        attrs: {
                            src: t.nftIcon
                        }
                    }), t._v(" "), i("span", {
                        staticClass: "nft-wrapper_text"
                    }, [t._v("选择数字艺术头像")])])]), t._v(" "), i("div", {
                        staticClass: "border-line"
                    }), t._v(" "), i("div", {
                        staticClass: "img-preview-wrap"
                    }, [i("div", {
                        staticClass: "pre-container",
                        style: {
                            "background-image": "url(".concat(t.img || t.oldFace, ")")
                        }
                    }, [i("img", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: t.img,
                            expression: "img"
                        }],
                        attrs: {
                            id: "clip_res_img",
                            src: t.img
                        }
                    })]), t._v(" "), i("div", {
                        staticClass: "pre-info"
                    }, [t._v(t._s(t.img ? "预览头像" : "当前头像"))])])]), t._v(" "), i("p", {
                        staticClass: "descript"
                    }, [t._v("请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M")]), t._v(" "), i("div", {
                        staticClass: "modal-footer"
                    }, [i("input", {
                        class: {
                            "modal-btn": !0,
                            "btn-confirm": !0,
                            disabled: !t.img
                        },
                        attrs: {
                            type: "button",
                            value: "更新"
                        },
                        on: {
                            click: t.uploadFn
                        }
                    })])]), t._v(" "), i("toast", {
                        attrs: {
                            text: t.responseMsg,
                            show: t.toastFlag
                        },
                        on: {
                            "close-toast": t.closeToast
                        }
                    }), t._v(" "), t.isShowIframe ? i("div", {
                        staticClass: "iframe-wrapper"
                    }, [i("iframe", {
                        staticClass: "iframecss",
                        attrs: {
                            id: "iframecss",
                            width: "400",
                            height: "468",
                            src: "https://www.bilibili.com/blackboard/nft_avatar_choose.html",
                            frameborder: "0",
                            scrolling: "no "
                        }
                    })]) : t._e()], 1)
                }
                ), [function () {
                    var t = this._self._c;
                    return t("div", {
                        staticClass: "modal-head"
                    }, [t("div", {
                        staticClass: "head-wrap"
                    }, [t("a", {
                        attrs: {
                            href: "//account.bilibili.com/site/face.html"
                        }
                    }, [this._v("我的头像")]), this._v(" > 更换头像")])])
                }
                    , function () {
                        var t = this._self._c;
                        return t("label", {
                            attrs: {
                                for: "file_input"
                            }
                        }, [t("i"), this._v(" 重新选择")])
                    }
                ], !1, null, "745dcbf6", null).exports
            },
                v(n, s.a.name, s.a),
                v(n, o.a.name, o.a),
                n)
        }
            , b = (e(459),
                Object(a.a)(w, (function () {
                    var t = this._self._c;
                    return t("div", [t("top-header"), this._v(" "), t("div", {
                        staticClass: "security_content"
                    }, [t("security-nav"), this._v(" "), t("div", {
                        staticClass: "container"
                    }, [t("div", {
                        staticClass: "upload-box"
                    }, [t("custom-cropper")], 1)])], 1)], 1)
                }
                ), [], !1, null, "621b55c5", null));
        i.default = b.exports
    }
}]);
