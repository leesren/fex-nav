(function() {
	function g(b) {
			this.url = [];
			this.init(b)
	}
	var l, m, t, f, y, z, p, E, q, v, u, B, C = 0,
	D = 0;
	_ver = "tcss.3.2.3";
	window.Tcss = {};
	var w = "function" == typeof tracert && "function" == typeof pgvGetColumn && "function" == typeof pgvGetTopic && "function" == typeof pgvGetDomainInfo && "function" == typeof pgvGetRefInfo;
	if ("undefined" == typeof r) var r = 1;
	btnBuffer = [];
	window.PTTSendClick = function() {
			if (0 < arguments.length) {
					var b = [].slice.call(arguments);
					btnBuffer.push(b);
					console.warn("\u7ec4\u4ef6\u76d1\u6d4b\u5230\u60a8\u5728pgvMain\u6267\u884c\u524d\u5df2\u7ecf\u5c1d\u8bd5\u89e6\u53d1PTTsendClick\uff0c\u8bf7\u786e\u4fdd\u4f60\u7684\u4ee3\u7801\u4e2d\u6709\u6267\u884cpgvMain\uff0c\u5426\u5219\u5c06\u4e0d\u4f1a\u6709\u4efb\u4f55\u7684\u6570\u636e\u4e0a\u62a5")
			}
	};
	g.prototype = {
			init: function(b) {
					b ? f = b: f = {};
					l = document;
					if (!f.statIframe && window != top) try {
							l = top.document
					} catch(a) {}
					"undefined" == typeof l && (l = document);
					m = l.location;
					t = l.body;
					w && (Tcss.d = l, Tcss.l = m);
					v = [];
					u = [];
					B = []
			},
			PTTInfo: function() {
					window.PTTRun = new PTT;
					PTTRun.virtualURL = this.getDomainInfo().replace(/dm=|&url=/g, "");
					var b = [];
					b.push("pttplat=" + PTTRun.plat);
					b.push("pttsitetype=" + (PTTRun.project ? PTTRun.project: "") + PTTRun.siteType);
					b.push("pttpagetype=" + PTTRun.pageType);
					b.push("pttpagename=" + encodeURIComponent(PTTRun.pageName));
					b.push("pttrefer=" + encodeURIComponent(PTTRun.from));
					var a = b.join("&").trimAll();
					console.log(decodeURI(b.join(";\n")));
					return a
			},
			run: function() {
					var b = (new Date).getTime();
					var a = escape(this.PTTInfo());
					h.init();
					this.url.push(this.getDomainInfo());
					this.coverCookie();
					h.setCookie("ssid");
					h.save();
					this.url.unshift("https://pingfore." + this.getCookieSetDomain(y) + "/pingd?");
					this.url.push(this.getRefInfo(f));
					try {
							navigator.cookieEnabled ? this.url.push("&pvid=" + h.setCookie("pgv_pvid", !0)) : this.url.push("&pvid=NoCookie")
					} catch(c) {
							this.url.push("&pvid=NoCookie")
					}
					this.url.push(this.getMainEnvInfo());
					this.url.push(this.getExtendEnvInfo());
					Tcss.pgUserType = "";
					if (f.pgUserType || f.reserved2) {
							var d = f.pgUserType || f.reserved2;
							d = escape(d.substring(0, 256));
							Tcss.pgUserType = d;
							B.push("pu=" + Tcss.pgUserType)
					}
					w && (pgvGetColumn(), pgvGetTopic(), this.url.push("&column=" + Tcss.column + "&subject=" + Tcss.subject), tracert());
					this.url.push("&vs=" + _ver);
					h.setCookie("ts_uid", !0);
					d = (new Date).getTime();
					v.push("tm=" + (d - b));
					C && v.push("ch=" + C);
					this.url.push("&ext=" + a);
					this.url.push("&hurlcn=" + escape(u.join(";")));
					this.url.push("&rand=" + Math.round(1E5 * Math.random()));
					"undefined" == typeof _speedMark ? this.url.push("&reserved1=-1") : this.url.push("&reserved1=" + (new Date - _speedMark)); (b = this.getSud()) && B.push("su=" + escape(b.substring(0, 256)));
					this.url.push("&tt=" + escape(B.join(";")));
					this.sendInfo(this.url.join(""));
					1 == D && (b = this.getParameter("tcss_rp_dm", l.URL), b != Tcss.dm && (b = this.url.join("").replace(/\?dm=(.*?)&/, "?dm=" + b + "&"), this.sendInfo(b)));
					f.hot && (document.attachEvent ? document.attachEvent("onclick",
					function(a) {
							pgvWatchClick(a)
					}) : document.addEventListener("click",
					function(a) {
							pgvWatchClick(a)
					},
					!1));
					f.repeatApplay && "true" == f.repeatApplay && "undefined" != typeof r && (r = 1)
			},
			getSud: function() {
					return f.sessionUserType ? f.sessionUserType: this.getParameter(f.sudParamName || "sessionUserType", l.URL)
			},
			coverCookie: function() {
					if (f.crossDomain && "on" == f.crossDomain) {
							var b = this.getParameter("tcss_uid", l.URL),
							a = this.getParameter("tcss_sid", l.URL),
							d = this.getParameter("tcss_refer", l.URL),
							c = this.getParameter("tcss_last", l.URL);
							a && b && (D = 1, h.setCookie("ssid", !1, a), h.save(), h.setCookie("ts_refer", !0, d), h.setCookie("ts_last", !0, c), h.setCookie("pgv_pvid", !0, b))
					}
			},
			getDomainInfo: function(b) {
					var a = m.hostname.toLowerCase();
					f.virtualDomain && (u.push("ad=" + a), a = f.virtualDomain);
					this.getCurrentUrl();
					Tcss.dm = a;
					w && pgvGetDomainInfo();
					y = Tcss.dm;
					z || (z = this.getCookieSetDomain(m.hostname.toLowerCase()), w && (Tcss.domainToSet = z));
					b && (Tcss.dm += ".hot");
					return "dm=" + Tcss.dm + "&url=" + Tcss.url
			},
			getCurrentUrl: function() {
					var b = "-";
					var a = escape(m.pathname);
					"" != m.search && (b = escape(m.search.substr(1)));
					if (f.senseParam) {
							var d = this.getParameter(f.senseParam, l.URL);
							d && (a += "_" + d)
					}
					f.virtualURL && (u.push("au=" + a), a = f.virtualURL);
					Tcss.url = a;
					Tcss.arg = b
			},
			getRefInfo: function(b) {
					var a = "-",
					d = "-",
					c = "-",
					e = l.referrer;
					b = this.getParameter(b.tagParamName || "ADTAG", l.URL);
					var k = e.indexOf("://"); - 1 < k && (k = e.match(/(\w+):\/\/([^:|\/]+)(:\d*)?(.*\/)([^#|\?|\n]+)?(#.*)?(\?.*)?/i)) && (a = k[2], d = k[4] + (k[5] ? k[5] : "")); - 1 != e.indexOf("?") && (k = e.indexOf("?") + 1, c = e.substr(k));
					e = a;
					f.virtualRefDomain && ("-" != a && u.push("ard=" + a), a = f.virtualRefDomain);
					f.virtualRefURL && ("-" != d && u.push("aru=" + escape(d)), d = f.virtualRefURL);
					var x;
					b && (x = a + d, a = "ADTAG", d = b);
					p = a;
					E = escape(d);
					if ("-" == p || "ADTAG" == p && "-" == e) a = h.get("ts_last=", !0),
					"-" != a && v.push("ls=" + a);
					h.setCookie("ts_last", !0, escape((m.hostname + m.pathname).substring(0, 128)));
					a = h.get("ts_refer=", !0);
					"-" != a && v.push("rf=" + a);
					e = m.hostname;
					f.inner && (e = "," + e + "," + f.inner + ",");
					"-" == p || -1 < ("," + e + ",").indexOf(p) || 1 == D || (d = escape((p + d).substring(0, 128)), d != a && (C = 2), h.setCookie("ts_refer", !0, d));
					Tcss.rdm = p;
					Tcss.rurl = E;
					Tcss.rarg = escape(c);
					w && pgvGetRefInfo();
					return x ? "&rdm=" + Tcss.rdm + "&rurl=" + Tcss.rurl + "&rarg=" + Tcss.rarg + "&or=" + x: "&rdm=" + Tcss.rdm + "&rurl=" + Tcss.rurl + "&rarg=" + Tcss.rarg
			},
			getMainEnvInfo: function() {
					var b = "";
					try {
							var a = "-",
							d = "-",
							c = "-",
							e = "-",
							k = "-",
							x = 0,
							f = navigator;
							self.screen && (a = screen.width + "x" + screen.height, d = screen.colorDepth + "-bit");
							f.language ? c = f.language.toLowerCase() : f.browserLanguage && (c = f.browserLanguage.toLowerCase());
							x = f.javaEnabled() ? 1 : 0;
							e = f.platform;
							k = (new Date).getTimezoneOffset() / 60;
							b = "&scr=" + a + "&scl=" + d + "&lang=" + c + "&java=" + x + "&pf=" + e + "&tz=" + k
					} catch(G) {} finally {
							return b
					}
			},
			getExtendEnvInfo: function() {
					var b = "";
					try {
							var a = m.href,
							d = "-";
							b += "&flash=" + this.getFlashInfo();
							t.addBehavior && (t.addBehavior("#default#homePage"), t.isHomePage(a) && (b += "&hp=Y"));
							t.addBehavior && (t.addBehavior("#default#clientCaps"), d = t.connectionType);
							b += "&ct=" + d
					} catch(c) {} finally {
							return b
					}
			},
			getFlashInfo: function() {
					var b = "-",
					a = navigator;
					try {
							if (a.plugins && a.plugins.length) for (var d = 0; d < a.plugins.length; d++) {
									if ( - 1 < a.plugins[d].name.indexOf("Shockwave Flash")) {
											b = a.plugins[d].description.split("Shockwave Flash ")[1];
											break
									}
							} else if (window.ActiveXObject) for (d = 12; 5 <= d; d--) try {
									if (eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + d + "');")) {
											b = d + ".0";
											break
									}
							} catch(c) {}
					} catch(c) {}
					return b
			},
			getParameter: function(b, a) {
					return b && a ? (b = a.match(new RegExp("(\\?|#|&)" + b + "=([^&^#]*)(#|&|$)"))) ? b[2] : "": ""
			},
			getCookieSetDomain: function(b) {
					var a, d, c = [];
					for (d = a = 0; d < b.length; d++)"." == b.charAt(d) && (c[a] = d, a++);
					a = c.length; - 1 < b.indexOf(".cn") && a--;
					d = "qq.com";
					1 == a ? d = b: 1 < a && (d = b.substring(c[a - 2] + 1));
					return d
			},
			watchClick: function(b) {
					try {
							var a = !0,
							d = "";
							var c = window.event ? window.event.srcElement: b.target;
							switch (c.tagName) {
							case "A":
									d = "<A href=" + c.href + ">" + c.innerHTML + "</a>";
									break;
							case "IMG":
									d = "<IMG src=" + c.src + ">";
									break;
							case "INPUT":
									d = "<INPUT type=" + c.type + " value=" + c.value + ">";
									break;
							case "BUTTON":
									d = "<BUTTON>" + c.innerText + "</BUTTON>";
									break;
							case "SELECT":
									d = "SELECT";
									break;
							default:
									a = !1
							}
							if (a) {
									var e = new g(f),
									k = e.getElementPos(c);
									if (f.coordinateId) {
											var x = e.getElementPos(document.getElementById(f.coordinateId));
											k.x -= x.x
									}
									e.url.push(e.getDomainInfo(!0));
									e.url.push("&hottag=" + escape(d));
									e.url.push("&hotx=" + k.x);
									e.url.push("&hoty=" + k.y);
									e.url.push("&rand=" + Math.round(1E5 * Math.random()));
									e.url.unshift("https://pingfore." + this.getCookieSetDomain(y) + "/pingd?");
									e.sendInfo(e.url.join(""))
							}
					} catch(F) {}
			},
			getElementPos: function(b) {
					if (null === b.parentNode || "none" == b.style.display) return ! 1;
					var a = navigator.userAgent.toLowerCase(),
					d = null;
					if (b.getBoundingClientRect) return a = b.getBoundingClientRect(),
					b = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
					d = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
					{
							x: a.left + d - document.body.clientLeft,
							y: a.top + b - document.body.clientTop
					};
					if (document.getBoxObjectFor) {
							a = document.getBoxObjectFor(b);
							var c = [a.x - (b.style.borderLeftWidth ? Math.floor(b.style.borderLeftWidth) : 0), a.y - (b.style.borderTopWidth ? Math.floor(b.style.borderTopWidth) : 0)]
					} else {
							c = [b.offsetLeft, b.offsetTop];
							d = b.offsetParent;
							if (d != b) for (; d;) c[0] += d.offsetLeft,
							c[1] += d.offsetTop,
							d = d.offsetParent;
							if ( - 1 < a.indexOf("opera") || -1 < a.indexOf("safari") && "absolute" == b.style.position) c[0] -= document.body.offsetLeft,
							c[1] -= document.body.offsetTop
					}
					for (d = b.parentNode ? b.parentNode: null; d && "BODY" != d.tagName && "HTML" != d.tagName;) c[0] -= d.scrollLeft,
					c[1] -= d.scrollTop,
					d = d.parentNode ? d.parentNode: null;
					return {
							x: c[0],
							y: c[1]
					}
			},
			pgvGetArgs: function() {
					this.getDomainInfo();
					var b = [];
					b.push("tcss_rp_dm=" + Tcss.dm);
					b.push("tcss_uid=" + h.get("pgv_pvid=", !0));
					b.push("tcss_sid=" + h.get("ssid=", !0));
					b.push("tcss_refer=" + h.get("ts_refer=", !0));
					b.push("tcss_last=" + h.get("ts_last=", !0));
					return b.join("&")
			},
			sendClickForPTT: function() {
					f.hottag && (this.url.push(this.getDomainInfo(!0)), this.url.push("&hottag=" + f.hottag), this.url.push("&hotx=9999&hoty=9999"), this.url.push("&rand=" + Math.round(1E5 * Math.random())), this.url.unshift("https://pingfore." + this.getCookieSetDomain(y) + "/pingd?"), this.sendInfo(this.url.join("")))
			},
			tgideasCount: function(b) {
					this.sendInfo("https://pingfore." + this.getCookieSetDomain(y) + "/pingd?dm=tgideas.qq.com.hot&url=/&hottag=" + encodeURIComponent(b) + "&hotx=9999&hoty=9999&rand=" + Math.round(1E5 * Math.random()))
			},
			sendInfo: function(b) {
					window.navigator.sendBeacon ? window.navigator.sendBeacon(b) : (q = new Image(1, 1), Tcss.img = q, q.onload = q.onerror = q.onabort = function() {
							q.onload = q.onerror = q.onabort = null;
							Tcss.img = null
					},
					q.src = b)
			}
	};
	var h = {
			sck: [],
			sco: {},
			init: function() {
					var b = this.get("pgv_info=", !0);
					if ("-" != b) {
							b = b.split("&");
							for (var a = 0; a < b.length; a++) {
									var d = b[a].split("=");
									this.set(d[0], unescape(d[1]))
							}
					}
			},
			get: function(b, a) {
					var d = a ? l.cookie: this.get("pgv_info=", !0),
					c = "-";
					var e = d.indexOf(b); - 1 < e && (e += b.length, c = d.indexOf(";", e), -1 == c && (c = d.length), a || (b = d.indexOf("&", e), -1 < b && (c = Math.min(c, b))), c = d.substring(e, c));
					return c
			},
			set: function(b, a) {
					this.sco[b] = a;
					a = !1;
					for (var d = this.sck.length,
					c = 0; c < d; c++) if (b == this.sck[c]) {
							a = !0;
							break
					}
					a || this.sck.push(b)
			},
			setCookie: function(b, a, d) {
					var c = m.hostname,
					e = h.get(b + "=", a);
					if ("-" != e || d) e = d ? d: e;
					else {
							switch (b) {
							case "ts_uid":
									v.push("nw=1");
									break;
							case "ssid":
									C = 1
							}
							a ? e = "": e = "s";
							d = (new Date).getUTCMilliseconds();
							e += Math.round(2147483647 * Math.abs(Math.random() - 1)) * d % 1E10
					}
					if (a) switch (b) {
					case "ts_uid":
							this.saveCookie(b + "=" + e, c, this.getExpires(1051200));
							break;
					case "ts_refer":
							this.saveCookie(b + "=" + e, c, this.getExpires(259200));
							break;
					case "ts_last":
							this.saveCookie(b + "=" + e, c, this.getExpires(30));
							break;
					default:
							this.saveCookie(b + "=" + e, z, "expires=Sun, 18 Jan 2038 00:00:00 GMT;")
					} else this.set(b, e);
					return e
			},
			getExpires: function(b) {
					var a = new Date;
					a.setTime(a.getTime() + 6E4 * b);
					return "expires=" + a.toGMTString()
			},
			save: function() {
					if (f.sessionSpan) {
							var b = new Date;
							b.setTime(b.getTime() + 6E4 * f.sessionSpan)
					}
					for (var a = "",
					d = this.sck.length,
					c = 0; c < d; c++) a += this.sck[c] + "=" + this.sco[this.sck[c]] + "&";
					a = "pgv_info=" + a.substr(0, a.length - 1);
					d = "";
					b && (d = "expires=" + b.toGMTString());
					this.saveCookie(a, z, d)
			},
			saveCookie: function(b, a, d) {
					l.cookie = b + ";path=/;domain=" + a + ";" + d
			}
	};
	window.pgvMain = function(b, a) {
			var d = "";
			a ? (d = a, _ver = "tcsso.3.2.1") : (d = b, _ver = "tcss.3.2.3");
			try {
					w && ("undefined" != typeof pvRepeatCount && 1 == pvRepeatCount ? (r = 1, pvRepeatCount = 2) : r = 2);
					if (1 == r) {
							r = 2;
							"undefined" != typeof PTTDate && (PTTRun.newStayTime(Math.round((new Date - PTTDate) / 1E3)), PTTDate = new Date); (new g(d)).run();
							b = 0;
							for (var c = btnBuffer.length; b < c; b++) PTTSendClick.apply(this, btnBuffer[b]);
							btnBuffer.length = 0
					}
					"undefined" == typeof PTTDate && (window.PTTDate = new Date, PTTRun.addEvent(window, "onpagehide" in window ? "pagehide": "unload",
					function() {
							PTTRun.newStayTime(Math.round((new Date - PTTDate) / 1E3))
					}));
					PTTRun.autoSend();
					"function" == typeof PTTCallback && PTTCallback();
					window.onerror = function(a, b, c) {
							MossoSendClick("ptterror", a + "|||" + b.split("?")[0] + "|||" + c, PTTRun.PTTSystem + PTTRun.PTTSystemVer + "|||" + PTTRun.PTTBrowser + PTTRun.PTTBrowserVer + "|||" + PTTRun.PTTNetType, PTTRun.virtualURL)
					};
					PTTPerformanceTiming = function() {
							var a = window.performance,
							b = this;
							if (a) {
									var c = a.timing,
									d, f, g;
									b.detectPage = function() {
											window.setTimeout(function() {
													0 < c.loadEventEnd ? b.reportData() : b.detectPage()
											},
											50)
									};
									b.reportData = function() {
											var a = PTTRun.PTTSystem + PTTRun.PTTSystemVer + "|||" + PTTRun.PTTBrowser + PTTRun.PTTBrowserVer + "|||" + PTTRun.PTTNetType;
											d = (c.loadEventEnd - c.navigationStart) / 1E3;
											MossoSendClick("pttloadpage", 5 < d ? "C": 3 < d ? "B": 1 < d ? "A": "S", a, PTTRun.virtualURL);
											f = (c.domComplete - c.responseEnd) / 1E3;
											MossoSendClick("pttdomready", 1 > f ? "S": "A", a, PTTRun.virtualURL);
											g = (c.domInteractive - c.navigationStart) / 1E3;
											MossoSendClick("pttblank", 1.5 < g ? "C": 1 < g ? "B": .5 < g ? "A": "S", a, PTTRun.virtualURL)
									};
									b.detectPage()
							} else console.log("\u4f60\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301 performance \u63a5\u53e3")
					};
					PTTPerformanceTiming()
			} catch(e) {}
	};
	window.pgvSendClickForPTT = function(b) { (new g(b)).sendClickForPTT()
	};
	window.pgvSendClick = function(b) {
			if ("undefined" != typeof setSite && "undefined" != typeof PTTSendClick) {
					var a = b.hottag ? b.hottag.split(".") : 0;
					if (b.hottag && 2 <= a.length) {
							var d = a[a.length - 2].trimAll(),
							c = a[a.length - 1].trimAll();
							console.log(decodeURI(d + ":" + c))
					} else console.error("PTT\u7ec4\u4ef6\u63d0\u793a\uff1a\u60a8\u7684\u6309\u94ae\u53c2\u6570\u6709\u8bef");
					PTTSendClick(d, c, "\u65e7\u57cb\u70b9")
			} else pgvSendClickForPTT(b)
	};
	window.pgvWatchClick = function(b) { (new g(b)).watchClick(b)
	};
	window.pgvGetArgs = function(b) {
			return (new g(b)).pgvGetArgs()
	};
	window.PTT = function() {
			console.log("\u60a8\u6b63\u5728\u4f7f\u7528PTT\u6570\u636e\u4e0a\u62a5\u7ec4\u4ef6\uff0c\u5e2e\u52a9\u6587\u6863\u53c2\u9605:http://tgideas.qq.com/ptt/");
			var b = this;
			b.PTTDomain = document.referrer;
			b.addEvent = function(a, b, c) {
					a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener(b, c, !1)
			};
			b.getParameterByName = function(a) {
					a = a.toLowerCase().replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
					a = (new RegExp("[\\?&]" + a + "=([^&#]*)")).exec(window.location.search.toLowerCase());
					return null == a ? "": decodeURIComponent(a[1].replace(/\+/g, " "))
			};
			b.getData = function(a) {
					a += "=";
					for (var b = document.cookie.split(";"), c = 0, e = b.length; c < e; c++) {
							for (var k = b[c];
							" " == k.charAt(0);) k = k.substring(1, k.length);
							if (0 == k.indexOf(a)) return unescape(k.substring(a.length, k.length))
					}
					return ! 1
			};
			b.setData = function(a, b, c, e) {
					c = c || 0;
					e = e || "/";
					var d = "";
					0 != c && (d = new Date, d.setTime(d.getTime() + 864E5 * c), d = "; expires=" + d.toGMTString());
					document.cookie = a + "=" + escape(b) + d + "; path=" + e + ";domain=." + location.hostname
			};
			b.setdetailData = function(a, b, c, e) {
					c = c || 0;
					e = e || "/";
					var d = "";
					0 != c && (d = "; expires=" + c.toGMTString());
					document.cookie = a + "=" + escape(b) + d + "; path=" + e + ";domain=." + location.hostname
			};
			b.getSession = function(a) {
					if (window.sessionStorage) return sessionStorage.getItem(a);
					a += "=";
					for (var b = document.cookie.split(";"), c = 0, e = b.length; c < e; c++) {
							for (var k = b[c];
							" " == k.charAt(0);) k = k.substring(1, k.length);
							if (0 == k.indexOf(a)) return unescape(k.substring(a.length, k.length))
					}
					return ! 1
			};
			String.prototype.trimAll = function() {
					return this.replace(/\s/g, "")
			};
			Number.prototype.replace = function() {
					return this + ""
			};
			Array.prototype.indexOf || (Array.prototype.indexOf = function(a) {
					for (var b = this.length; 0 < b;) return this[0] == a ? 0 : -1
			});
			b.splitVirtualStr = function(a) {
					var b = ["", ""];
					a && (a = a && -1 == a.indexOf("//") ? a: a.split("//")[1], /^\//.test(a) ? b[1] = a: -1 == a.indexOf("/") ? b[0] = a: (b[0] = a.substring(0, a.indexOf("/")), b[1] = a.substring(a.indexOf("/"), a.length)));
					return b
			};
			window.MossoSendClick = function(a, d, c, e) {
					if ("undefined" == typeof setSite) return console.error("PTT\u7ec4\u4ef6\u63d0\u793a\uff1a\u60a8\u9700\u8981\u5728\u9875\u9762\u91cc\u914d\u7f6esetSite,\u5426\u5219\u5c06\u65e0\u6cd5\u91c7\u96c6\u7edf\u8ba1\u6570\u636e,\u6587\u6863\u53c2\u9605:http://tgideas.qq.com/ptt/"),
					!1;
					a = "" == a || "undefined" == typeof a ? "": "_" + a.replace(/_|\./g, "*-*");
					d = "" == d || "undefined" == typeof d ? "": "_" + d.replace(/_|\./g, "*-*");
					c = "undefined" == typeof c ? "": c.replace(/_|\./g, "*-*");
					a = (b.plat + "." + b.project + b.siteType + "." + b.pageType + a + d + "_" + c + "." + b.from).trimAll();
					a = encodeURIComponent(a);
					"1" == b.getData("PTTdebug") && console.log(decodeURI("a:" + a));
					e = b.splitVirtualStr(e);
					pgvSendClickForPTT({
							hottag: a,
							virtualDomain: e[0],
							virtualURL: e[1]
					})
			};
			window.PTTSendClick = function(a, d, c, e) {
					if ("undefined" == typeof setSite) return console.error("PTT\u7ec4\u4ef6\u63d0\u793a\uff1a\u60a8\u9700\u8981\u5728\u9875\u9762\u91cc\u914d\u7f6esetSite,\u5426\u5219\u5c06\u65e0\u6cd5\u91c7\u96c6\u7edf\u8ba1\u6570\u636e,\u6587\u6863\u53c2\u9605:http://tgideas.qq.com/ptt/"),
					!1; - 1 != "weekloop reach route osav actav browserinfo devicesize viewsize mc systeminfo nettype user osuser ossysuser actuser hotspot exposure newstaytime ptterror pttloadpage pttdomready pttblank".split(" ").indexOf(a.toLowerCase().trimAll()) && (console.warn('\u7531\u4e8e\u60a8\u7684\u6309\u94ae\u540d\u79f0\u4e0eMOSSO\u7cfb\u7edf\u4fdd\u7559\u540d\u79f0\u96f7\u540c\uff0c\u7ec4\u4ef6\u5c06\u628a\u540d\u79f0\u4e3a\uff1a"' + a + '"\u7684\u6309\u94ae\u91cd\u65b0\u547d\u540d\u4e3a\uff1a"' + a + 'clash"'), a += "clash");
					e = e ? e: PTTRun.virtualURL;
					MossoSendClick(a, d, c, e);
					a = b.project + b.oldSiteType + "." + b.pageType + ("" == a || "undefined" == typeof a ? "": "." + a) + ("" == d || "undefined" == typeof d ? "." + b.from: "." + d);
					a = a.trimAll();
					b.getData("PTTdebug") && "0" == b.getData("PTTdebug") || console.log(decodeURI("b:" + a));
					e = b.splitVirtualStr(e);
					pgvSendClickForPTT({
							hottag: a,
							virtualDomain: e[0],
							virtualURL: e[1]
					})
			};
			window.PTTDebug = function(a) {
					b.setData("PTTdebug", a)
			};
			b.unitParams = function() {
					var a = navigator.userAgent.toLowerCase();
					b.osact = function() {
							if ("undefined" == typeof setSite) return ! 1;
							var a = 0,
							e = ["0", "1", "m", "pc", "ingame"];
							if (setSite.osact || "" != b.getParameterByName("osact")) a = (setSite.osact + "").trimAll() || b.getParameterByName("osact").trimAll(),
							-1 == e.indexOf(a) && (console.warn("\u60a8\u8bbe\u7f6e\u7684osact\u503c\u8d85\u51fa\u8303\u56f4\uff0c\u8bf7\u5728" + e.join(",") + "\u4e2d\u9009\u62e9\u4e00\u4e2a,\u5426\u5219\u5c06\u4ee50\u4ee3\u66ff"), a = 0);
							return a
					} ();
					b.project = function() {
							var a = "base ingame doujin match story history fans coming bbs mct skin other hero commerce version brand ip community netbar important app".split(" ");
							if (/\/zlkdatasys\/mct\/proj_[1-9]\d*\/index.shtml/.test(location.pathname)) return "mct_";
							if ("undefined" != typeof setSite && "undefined" == typeof setSite.project) return "undefined" != typeof setSite.siteType && "os" == setSite.siteType.toLowerCase() ? "base_": "other_";
							if (setSite.project && -1 != a.indexOf(setSite.project.trimAll())) return setSite.project.trimAll() + "_";
							console.error("PTT\u7ec4\u4ef6\u63d0\u793a\uff1a\u60a8\u8bbe\u7f6e\u7684project\u53c2\u6570\u503c\u6709\u8bef\uff0c\u76ee\u524d\u53ea\u5141\u8bb8\u8bbe\u7f6e\u503c\u4e3a:" + a.join(",") + "\u8bf7\u68c0\u67e5");
							return "other_"
					} ();
					b.siteType = function() {
							if ("undefined" == typeof setSite || "undefined" == typeof setSite.siteType) console.error("PTT\u7ec4\u4ef6\u63d0\u793a\uff1a\u60a8\u8fd8\u672a\u914d\u7f6esetSite.siteType\u7684\u503c,\u5c06\u65e0\u6cd5\u91c7\u96c6\u7edf\u8ba1\u6570\u636e,\u6587\u6863\u53c2\u9605:http://tgideas.qq.com/ptt/");
							else {
									if ("/m/" != location.pathname && "/" != location.pathname || "0" == b.osact) {
											if (/\/zlkdatasys\/mct\/proj_[1-9]\d*\/index.shtml/.test(location.pathname)) return "proj" + location.pathname.replace(/[^0-9]/g, "");
											var a = setSite.siteType.toLowerCase().replace(/_|\./g, "*-*");
											return "0" != b.osact ? "1" == b.osact ? a + "_osact": a + "_" + b.osact: a + "_0"
									}
									return "os_" + b.osact
							}
					} ();
					b.pageType = function() {
							if ("undefined" == typeof setSite || "undefined" == typeof setSite.pageType) console.error("PTT\u7ec4\u4ef6\u63d0\u793a\uff1a\u60a8\u9700\u8981\u914d\u7f6esetSite.pageType\u7684\u503c,\u5426\u5219\u5c06\u65e0\u6cd5\u91c7\u96c6\u7edf\u8ba1\u6570\u636e,\u6587\u6863\u53c2\u9605:http://tgideas.qq.com/ptt/");
							else {
									if (/\/zlkdatasys\/mct\/proj_[1-9]\d*\/index.shtml/.test(location.pathname)) {
											var a = b.getParameterByName("media");
											return "index" + ("" == a ? "": "-" + a)
									}
									return setSite.pageType.replace(/_|\./g, "*-*")
							}
					} ();
					b.pageName = function() {
							if ("undefined" != typeof setSite && "undefined" != typeof setSite.pageName) {
									if (/\/zlkdatasys\/mct\/proj_[1-9]\d*\/index.shtml/.test(location.pathname)) {
											var a = b.getParameterByName("media");
											return "\u6e20\u9053\u843d\u5730\u9875" + ("" == a ? "": "-" + a)
									}
									return setSite.pageName.replace(/_|\./g, "*-*")
							}
					} ();
					var d = -1 == a.indexOf("msdk") && -1 == a.indexOf("15d60") && -1 == a.indexOf("16A366") && -1 == a.indexOf("tiem") && -1 == a.indexOf("ingame") && "undefined" == typeof pandora || -1 != a.indexOf("gamehelper") ? 0 : 1;
					b.ingame = d;
					b.plat = b.ingame ? -1 != a.indexOf("tiem") ? "dcv_tiem": "dcv_ingame": -1 != a.indexOf("qq/") ? "dcv_qq": -1 != a.indexOf("micromessenge") ? "dcv_wx": -1 != a.indexOf("gamehelper") || -1 != a.indexOf("lolapp") ? "dcv_helper": -1 != a.indexOf("weibo") ? "dcv_weibo": -1 != a.indexOf("qqlivebrowser") ? "dcv_qqvideo": -1 != a.indexOf("qzone") ? "dcv_qzone": -1 != a.indexOf("yyb_version") ? "dcv_yyb": -1 != a.indexOf("qqnews") ? "dcv_qqnews": -1 != a.indexOf("qnreading") ? "dcv_ttkb": -1 < a.indexOf("iphone") || -1 < a.indexOf("ipad") || -1 < a.indexOf("ipod") || -1 < a.indexOf("android") ? "dcv_other": "dcv_pc";
					b.from = function() {
							var a = "other",
							e = b.getSession("channel");
							"undefined" != typeof b.PTTDomain && (a = "" == b.PTTDomain ? "direct": -1 != b.PTTDomain.indexOf(location.hostname) ? "internal": -1 < b.PTTDomain.indexOf("baidu.com") ? "seo_baidu": -1 < b.PTTDomain.indexOf("sogou.com") ? "seo_sogou": -1 < b.PTTDomain.indexOf("sm.cn") ? "seo_sm": -1 < b.PTTDomain.indexOf("so.com") ? "seo_360": -1 < b.PTTDomain.indexOf("bing.com") ? "seo_bing": -1 < b.PTTDomain.indexOf("google.com") ? "seo_google": "other_" + b.PTTDomain.match(/([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})/, "")[0].replace(/\./g, "_"));
							if (b.getParameterByName("adtag")) {
									a = [];
									for (var d = b.getParameterByName("adtag").split("."), f = 0, g = d.length; f < g; f++) 4 > f && a.push(d[f]);
									a = "adtag_" + a.join("_")
							}
							e && ( - 1 != e.indexOf("seo") && (a = e), "wx" == e && (a = "wx_nemu"));
							return a
					} ();
					b.oldSiteType = "os" == b.siteType.split("_")[0] ? "dcv_pc" == b.plat ? "gwpc": "1" == b.ingame ? "ingame": "gwm": b.siteType;
					b.weekloop = function() {
							var a = new Date,
							e = a.getFullYear(),
							d = a.getMonth();
							a = a.getDate();
							var f = (new Date(e, 0, 1)).getDay();
							d = Math.ceil(Math.ceil((new Date(e, d, a) - new Date(e, 0, 1) + 864E5 * (f + 1)) / 1E3 / 60 / 60 / 24) / 7);
							a = b.getData("weekloop");
							if (!a || a.split("-")[3] != d) {
									a = a ? a.split("-") : ["0", "0", "0", "0"];
									d > a[3] ? e = d - a[3] - 1 : (f = 53, 29 == (new Date(e - 1, 1, 29)).getDate() && 6 == (new Date(e - 1, 0, 1)).getDay() && (f = 54), e = f - a[3] + d - 1);
									for (f = 0; f < e; f++) a.push("0");
									a.push(d + "");
									a.splice(0, a.length - 4);
									b.setData("weekloop", a.join("-"), 365);
									MossoSendClick("weekloop", a.join("-"), "\u5468\u7559\u5b58", PTTRun.virtualURL)
							}
					};
					b.classifyUser = function(a) {
							var b = [];
							if (6 < a && 14 > a) b.push("is8-14daysUser", "8-14\u7559");
							else if (14 < a && 29 > a) b.push("is16-29daysUser", "16-29\u7559");
							else switch (a) {
							case 0:
									b.push("is1daysUser", "\u5f53\u65e5\u56de\u8bbf2");
									break;
							case 1:
									b.push("is2daysUser", "\u6b21\u7559");
									break;
							case 2:
									b.push("is3daysUser", "3\u7559");
									break;
							case 3:
									b.push("is4daysUser", "4\u7559");
									break;
							case 4:
									b.push("is5daysUser", "5\u7559");
									break;
							case 5:
									b.push("is6daysUser", "6\u7559");
									break;
							case 6:
									b.push("is1weekUser", "\u5468\u7559");
									break;
							case 14:
									b.push("is15daysUser", "15\u7559");
									break;
							case 29:
									b.push("is1MonthUser", "\u6708\u7559");
									break;
							default:
									b.push("more1Month", "\u8001\u7528\u6237")
							}
							return b
					};
					b.inOneHostDate = function() {
							var a = b.getData("isHostDate"),
							e = Math.floor(((new Date).getTime() - 6E4 * (new Date).getTimezoneOffset()) / 1E3 / 60 / 60 / 24);
							return ! a || 1 <= e - a ? (b.setData("isHostDate", e, 365), 1) : !1
					} ();
					b.inOneOsSysDate = function() {
							var a = b.getData("isOsSysDate"),
							e = Math.floor(((new Date).getTime() - 6E4 * (new Date).getTimezoneOffset()) / 1E3 / 60 / 60 / 24);
							return ! a || 1 <= e - a ? (b.setData("isOsSysDate", e, 365), 1) : !1
					} ();
					b.inOneDate = function() {
							var a = "os" == b.siteType.split("_")[0] || "/m/" == location.pathname || "/" == location.pathname ? "isOsDate": "isActDate",
							e = "os" == b.siteType.split("_")[0] || "/m/" == location.pathname || "/" == location.pathname ? "": location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1),
							d = b.getData(a),
							f = Math.floor(((new Date).getTime() - 6E4 * (new Date).getTimezoneOffset()) / 1E3 / 60 / 60 / 24);
							return ! d || 1 <= f - d ? (b.setData(a, f, 365, e), 1) : !1
					} ();
					b.oldUser = function() {
							if (b.inOneHostDate) {
									var a = [],
									e = b.getData("PTTuserFirstTime");
									e ? (a = (new Date).getTime() - 6E4 * (new Date).getTimezoneOffset() - e, a = parseInt(a / 864E5), a = b.classifyUser(a)) : (e = 864E5 * Math.floor(((new Date).getTime() - 6E4 * (new Date).getTimezoneOffset()) / 1E3 / 60 / 60 / 24), b.setData("PTTuserFirstTime", e, 365), a.push("newUsers", "\u65b0\u7528\u6237"));
									return a
							}
							return ! 1
					} ();
					b.osSysUser = function() {
							if (("os" == b.siteType.split("_")[0] || "0" != b.osact && "mct_" != b.project || "/m/" == location.pathname || "/" == location.pathname) && b.inOneOsSysDate) {
									var a = [],
									e = b.getData("PTTosSysFirstTime");
									e ? (a = (new Date).getTime() - 6E4 * (new Date).getTimezoneOffset() - e, a = parseInt(a / 864E5), a = b.classifyUser(a)) : (e = 864E5 * Math.floor(((new Date).getTime() - 6E4 * (new Date).getTimezoneOffset()) / 1E3 / 60 / 60 / 24), b.setData("PTTosSysFirstTime", e, 365), a.push("newUsers", "\u65b0\u7528\u6237"));
									return a
							}
							return ! 1
					} ();
					b.actOldUser = function() {
							if (b.inOneDate) {
									var a = [];
									if ("os" == b.siteType.split("_")[0] || "/m/" == location.pathname || "/" == location.pathname) {
											var e = "PTTosFirstTime";
											var d = "osUser";
											var f = ""
									} else e = "PTTactFirstTime",
									d = "actUser",
									f = location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1);
									var g = b.getData(e);
									g ? (a = (new Date).getTime() - 6E4 * (new Date).getTimezoneOffset() - g, a = parseInt(a / 864E5), a = b.classifyUser(a)) : (g = 864E5 * Math.floor(((new Date).getTime() - 6E4 * (new Date).getTimezoneOffset()) / 1E3 / 60 / 60 / 24), b.setData(e, g, 365, f), a.push("newUsers", "\u65b0\u7528\u6237"));
									a.push(d);
									return a
							}
							return ! 1
					} ();
					b.routeLine = function() {
							if ("undefined" == typeof setSite || "undefined" == typeof setSite.siteType) return ! 1;
							var a = b.getData("PTTrouteLine") ? b.getData("PTTrouteLine") + "_": "";
							if (7 >= a.split("_").length) {
									var e = /^os_/.test(b.siteType) ? b.pageType: b.siteType.split("_")[0];
									a += e;
									b.setData("PTTrouteLine", a);
									MossoSendClick("route", a, "\u8def\u5f84", PTTRun.virtualURL)
							} else return ""
					};
					b.PTTSystem = function() {
							var b = navigator.platform.toLowerCase();
							return - 1 != a.indexOf("android") ? "android": -1 != a.indexOf("iphone") ? "iphone": -1 != a.indexOf("ipad") ? "ipad": -1 != a.indexOf("ipod") ? "ipod": "win32" == b || "windows" == b ? "windows": "mac68k" == b || "macppc" == b || "macintosh" == b || "macintel" == b ? "mac": "x11" == b ? "unix": "other"
					} ();
					b.PTTSystemVer = function() {
							switch (b.PTTSystem) {
							case "android":
									var c = -1 != a.indexOf("android/") ? a.substr(a.indexOf("android") + 8, a.indexOf(" ", a.indexOf("android")) - a.indexOf("android") - 8).split(" ")[0] : a.substr(a.indexOf("android") + 8, a.indexOf(";", a.indexOf("android")) - a.indexOf("android") - 8).split(" ")[0];
									break;
							case "iphone":
									c = "iphone os";
									c = a.substr(a.indexOf(c) + 10, a.indexOf(" like ", a.indexOf(c)) - a.indexOf(c) - 10);
									break;
							case "windows":
									c = -1 < a.indexOf("windows nt 5.0") || -1 < a.indexOf("windows 2000") ? "win2000": -1 < a.indexOf("windows nt 5.1") || -1 < a.indexOf("windows xp") ? "winXP": -1 < a.indexOf("windows nt 5.2") || -1 < a.indexOf("windows 2003") ? "win2003": -1 < a.indexOf("windows nt 6.0") || -1 < a.indexOf("windows vista") ? "winVista": -1 < a.indexOf("windows nt 6.1") || -1 < a.indexOf("windows 7") ? "win7": -1 < a.indexOf("windows nt 6.2") || -1 < a.indexOf("windows 8") ? "win8": -1 < a.indexOf("windows nt 10") || -1 < a.indexOf("windows 10") ? "win10": "other";
									break;
							case "ipad":
									c = a.substr(a.indexOf("cpu os") + 7, a.indexOf(" like ", a.indexOf("cpu os")) - a.indexOf("cpu os") - 7);
									break;
							case "mac":
									c = a.substr(a.indexOf("intel mac os x") + 15, a.indexOf(")", a.indexOf("intel mac os x")) - a.indexOf("intel mac os x") - 15);
									break;
							case "ipod":
									c = a.substr(a.indexOf(c) + 10, a.indexOf(" like ", a.indexOf(c)) - a.indexOf(c) - 10);
									break;
							default:
									c = "unknown"
							}
							return c
					} ();
					b.detectBrowser = function() {
							var c = "";
							var e = b.PTTSystem;
							switch ("android" == e || "iphone" == e || "ipad" == e || "ipod" == e ? "mobile": "pc") {
							case "mobile":
									-1 != a.indexOf("msdk") ? (e = "msdk", c = a.split("msdk/")[1]) : -1 != a.indexOf("tiem") ? (e = "tiem", c = a.split("tiem ingame browser/")[1].split(" ")[0]) : -1 != a.indexOf("micromessenger") ? (e = "weixin", c = a.split("micromessenger/")[1].split(" ")[0]) : -1 != a.indexOf("qq/") ? (e = "qq", c = a.split("qq/")[1].split(" ")[0]) : -1 != a.indexOf("mqqbrowser") ? (e = "mqqbrowser", c = a.split("mqqbrowser/")[1].split(" ")[0]) : -1 != a.indexOf("weibo") ? (e = "sina", c = a.split("applewebkit/")[1].split(" ")[0]) : -1 != a.indexOf("ucbrowser") ? (e = "uc", c = a.split("ucbrowser/")[1].split(" ")[0]) : -1 != a.indexOf("baiduboxapp") ? (e = "baidubrowser", c = a.split("baiduboxapp/")[1].split(" ")[0]) : -1 != a.indexOf("chrome") || -1 != a.indexOf("crios") ? (e = "chrome", -1 != a.indexOf("chrome") && (c = a.split("chrome/")[1].split(" ")[0]), -1 != a.indexOf("crios") && (c = a.split("crios/")[1].split(" ")[0])) : -1 != a.indexOf("android") ? (e = "original", c = -1 != a.indexOf("applewebkit/") ? a.split("applewebkit/")[1].split(" ")[0] : "0") : -1 != a.indexOf("mac os x") ? (e = "safari", c = a.split("applewebkit/")[1].split(" ")[0]) : (e = a.trimAll(), c = "unmobile");
									break;
							case "pc":
									/qqbrowser\/\d+/.test(a) ? (c = /(qqbrowser)\/(\d+)/.exec(a), e = c[1], /qbcore\/\d+/.test(a) && (e = "inqq"), /micromessenger\/\d+/.test(a) && (e = "inweixin"), c = c[2]) : /ubrowser\/\d+/.test(a) ? (c = /(ubrowser)\/(\d+)/.exec(a), e = c[1], c = c[2]) : /maxthon\/\d+/.test(a) ? (c = /(maxthon)\/(\d+)/.exec(a), e = c[1], c = c[2]) : /2345explorer\/\d+/.test(a) ? (c = /(2345explorer)\/(\d+)/.exec(a), e = c[1], c = c[2]) : /chrome\/\d+/.test(a) ? (c = /(chrome)\/(\d+)/.exec(a), e = c[1], -1 != a.indexOf("metasr") && (e = "sogou"), c = c[2]) : /msie \d+\.\d+/.test(a) ? (c = /ms(ie) (\d+\.\d+)/.exec(a), e = c[1], c = c[2]) : -1 != a.indexOf("trident/7.0") ? (e = "IE", c = /(rv):(\d+)/.exec(navigator.userAgent.toLowerCase())[2]) : /firefox(\/\d+\.\d+)/.test(a) ? (c = /(firefox)\/(\d+\.\d+)/.exec(a), e = c[1], c = c[2]) : /version\/(\d+\.\d) (safari)/.test(a) ? (c = /version\/(\d+\.\d) (safari)/.exec(a), e = c[2], c = c[1]) : /opera.+version\/\d+\.\d+/.test(a) ? (c = /(opera).+version\/(\d+)\.\d+/.exec(a), e = c[1], c = c[2]) : (e = "unknown", c = "unwindow");
									break;
							default:
									e = "unknown",
									c = "unpc"
							}
							b.PTTBrowser = e;
							b.PTTBrowserVer = parseFloat(c.split(".")[0] + "." + c.split(".")[1]);
							MossoSendClick("browserInfo", b.PTTBrowser + b.PTTBrowserVer, "\u6d4f\u89c8\u5668\u4fe1\u606f", PTTRun.virtualURL)
					};
					b.PTTNetType = function() {
							if ( - 1 != a.indexOf("nettype/")) {
									var b = -1 == a.indexOf(" ", a.indexOf("nettype/")) ? 20 : a.indexOf(" ", a.indexOf("nettype/")) - a.indexOf("nettype/") - 8;
									b = a.substr(a.indexOf("nettype/") + 8, b)
							} else b = "undefined" != typeof navigator.connection && "undefined" != typeof navigator.connection.type ? navigator.connection.type: -1 != a.indexOf("iphone") || -1 != a.indexOf("ipad") || -1 != a.indexOf("ipod") || -1 != a.indexOf("android") ? "mobileUnknown": "PCNetwork";
							return b
					} ();
					b.getPixel = function() {
							var c = document.documentElement.clientWidth,
							e = document.documentElement.clientHeight,
							d = window.devicePixelRatio ? window.devicePixelRatio: 1;
							if ( - 1 != a.indexOf("iphone") || -1 != a.indexOf("ipad") || -1 != a.indexOf("ipod") || -1 != a.indexOf("android")) {
									var f = window.screen.width,
									g = c,
									h = window.screen.height;
									Math.max(f, h) == g ? g = f: h *= c / f;
									g > h && (f = h, h = g, g = f);
									c > e && (f = e, e = c, c = f)
							} else g = window.screen.width,
							h = window.screen.height;
							b.PTTPixelWidth = parseInt(g * d);
							b.PTTPixelHeight = parseInt(h * d);
							b.PTTViewPixelWidth = parseInt(c * d);
							b.PTTViewPixelHeight = parseInt(e * d);
							MossoSendClick("devicesize", b.PTTPixelWidth + "x" + b.PTTPixelHeight, "\u8bbe\u5907\u5c3a\u5bf8", PTTRun.virtualURL);
							MossoSendClick("viewsize", b.PTTViewPixelWidth + "x" + b.PTTViewPixelHeight, "\u53ef\u89c6\u5c3a\u5bf8", PTTRun.virtualURL)
					}
			};
			b.unitParams();
			b.autoSend = function() {
					b.routeLine();
					b.weekloop();
					MossoSendClick("systemInfo", b.PTTSystem + b.PTTSystemVer, "\u7cfb\u7edf\u4fe1\u606f", PTTRun.virtualURL);
					b.detectBrowser();
					b.getPixel();
					MossoSendClick("netType", b.PTTNetType, "\u7f51\u7edc\u7c7b\u578b", PTTRun.virtualURL);
					b.oldUser && MossoSendClick("user", b.oldUser[0], b.oldUser[1], PTTRun.virtualURL);
					b.osSysUser && MossoSendClick("osSysUser", b.osSysUser[0], b.osSysUser[1], PTTRun.virtualURL);
					b.actOldUser && MossoSendClick(b.actOldUser[2], b.actOldUser[0], b.actOldUser[1], PTTRun.virtualURL);
					b.exposure(window)
			};
			b.exposure = function(a) {
					function d(b, c, d) {
							var f = a.document.body;
							if (void 0 === c || "function" === typeof c) d = c,
							c = {};
							f = c.container || f;
							c = c.offset || 0;
							for (var n = 0; n < m.length; n++) if (m[n].container === f) return m[n].isInViewport(b, c, d);
							return m[m.push(e(f)) - 1].isInViewport(b, c, d)
					}
					function c(a, b, c) {
							var d;
							return function() {
									var e = this,
									f = arguments,
									n = c && !d;
									clearTimeout(d);
									d = setTimeout(function() {
											d = null;
											c || a.apply(e, f)
									},
									b);
									n && a.apply(e, f)
							}
					}
					function e(d) {
							function e(a, b, c) {
									return {
											watch: function() {
													A.add(a, b, c)
											},
											dispose: function() {
													A.remove(a)
											}
									}
							}
							function n(b, c) {
									if (! (t(a.document.documentElement, b) && t(a.document.documentElement, d) && b.offsetWidth && b.offsetHeight)) return ! 1;
									var e = b.getBoundingClientRect();
									if (d === a.document.body) {
											b = -c;
											var f = -c;
											var g = a.document.documentElement.clientWidth + c;
											c = a.document.documentElement.clientHeight + c
									} else {
											var n = d.getBoundingClientRect();
											b = n.top - c;
											f = n.left - c;
											g = n.right + c;
											c = n.bottom + c
									}
									return e.right >= f && e.left <= g && e.bottom >= b && e.top <= c
							}
							var A = f(),
							k = d === a.document.body ? a: d,
							h = c(A.checkAll(function(a, b, c) {
									n(a, b) && (A.remove(a), c(a))
							}), 15);
							b.addEvent(k, "scroll", h);
							k === a && b.addEvent(a, "resize", h);
							q && g(A, d, h);
							setInterval(h, 150);
							return {
									container: d,
									isInViewport: function(a, b, c) {
											if (!c) return n(a, b);
											a = e(a, b, c);
											a.watch();
											return a
									}
							}
					}
					function f() {
							function a(a) {
									for (var b = c.length - 1; 0 <= b; b--) if (c[b][0] === a) return b;
									return - 1
							}
							function b(b) {
									return - 1 !== a(b)
							}
							var c = [];
							return {
									add: function(a, d, e) {
											b(a) || c.push([a, d, e])
									},
									remove: function(b) {
											b = a(b); - 1 !== b && c.splice(b, 1)
									},
									isWatched: b,
									checkAll: function(a) {
											return function() {
													for (var b = c.length - 1; 0 <= b; b--) a.apply(this, c[b])
											}
									}
							}
					}
					function g(a, b, c) {
							function d(b) {
									b = g.call([], Array.prototype.slice.call(b.addedNodes), b.target);
									return 0 < f.call(b, a.isWatched).length
							}
							var e = new MutationObserver(function(a) { ! 0 === a.some(d) && setTimeout(c, 0)
							}),
							f = Array.prototype.filter,
							g = Array.prototype.concat;
							e.observe(b, {
									childList: !0,
									subtree: !0,
									attributes: !0
							})
					}
					function h(b) {
							var c = [];
							if ("function" == typeof a.document.querySelectorAll) c = Array.prototype.slice.call(a.document.querySelectorAll("[" + b + "]"));
							else for (var d = document.getElementsByTagName("*"), e = 0; e < d.length; e++) {
									var f = d[e];
									f.getAttribute(b) && c.push(f)
							}
							return c
					}
					function l(a, b) {
							b || (b = location.href);
							a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
							a = (new RegExp("[\\?&]" + a + "=([^&#]*)")).exec(b);
							return null == a ? null: a[1]
					}
					var m = [],
					q = "function" === typeof a.MutationObserver,
					t = a.document.documentElement.compareDocumentPosition ?
					function(a, b) {
							return !! (a.compareDocumentPosition(b) & 16)
					}: a.document.documentElement.contains ?
					function(a, b) {
							return a !== b && (a.contains ? a.contains(b) : !1)
					}: function(a, b) {
							for (; b = b.parentNode;) if (b === a) return ! 0;
							return ! 1
					},
					p = document.currentScript ||
					function() {
							var a = document.getElementsByTagName("script");
							return a[a.length - 1]
					} (),
					r = l("prefix", p.src) || "";
					p = parseInt(l("autorun", p.src) || 1);
					var v = function() {
							u(r)
					},
					u = function(a) {
							r = a || r;
							for (var c = h("exposure-tag"), e = 0; e < c.length; e++)(function() {
									var a = e,
									d = c[a].getAttribute("exposure-tag").split(",");
									b.addEvent(c[a], "click",
									function() {
											MossoSendClick && MossoSendClick("hotspot", d[0], d[1], PTTRun.virtualURL)
									})
							})(),
							d(c[e],
							function(a) {
									a = a.getAttribute("exposure-tag").split(",");
									MossoSendClick && MossoSendClick("exposure", a[0], a[1], PTTRun.virtualURL)
							})
					},
					w = function() {
							var a = [],
							c,
							d = document,
							e = (d.documentElement.doScroll ? /^loaded|^c/: /^loaded|^i|^c/).test(d.readyState);
							e || b.addEvent(d, "DOMContentLoaded", c = function() {
									d.removeEventListener("DOMContentLoaded", c);
									for (e = 1; c = a.shift();) c()
							});
							return function(b) {
									e ? setTimeout(b, 0) : a.push(b)
							}
					} ();
					p ? w(v) : function() {
							window.exposure = {};
							exposure.run = function(a) {
									u(a)
							}
					} ()
			};
			b.newStayTime = function(a) {
					for (var b = [0, 3, 7, 10, 15, 30, 60, 90, 120, 180, 300, 600, 900, 1800, 3600], c = "infinite", e = 1, f = b.length; e < f; e++) if (a < b[e]) {
							c = b[e - 1];
							break
					}
					MossoSendClick("newStayTime", "" + c, "\u505c\u7559\u65f6\u957f", PTTRun.virtualURL)
			}
	}
})();
window.console = window.console ||
function() {
	var g = {};
	g.log = g.warn = g.debug = g.info = g.error = g.time = g.dir = g.profile = g.clear = g.exception = g.trace = g.assert = function() {};
	return g
} ();