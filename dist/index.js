import * as e from "react";
import t, { cloneElement as n, createContext as r, forwardRef as i, useCallback as a, useContext as o, useEffect as s, useId as c, useImperativeHandle as l, useLayoutEffect as u, useMemo as d, useRef as f, useState as p } from "react";
import { Fragment as m, jsx as h, jsxs as g } from "react/jsx-runtime";
import _ from "react-dom";
//#region \0rolldown/runtime.js
var v = Object.create, y = Object.defineProperty, b = Object.getOwnPropertyDescriptor, x = Object.getOwnPropertyNames, S = Object.getPrototypeOf, C = Object.prototype.hasOwnProperty, w = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), T = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = x(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !C.call(e, s) && s !== n && y(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = b(t, s)) || r.enumerable
	});
	return e;
}, E = (e, t, n) => (n = e == null ? {} : v(S(e)), T(t || !e || !e.__esModule ? y(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), D;
(function(e) {
	e.Unimplemented = "UNIMPLEMENTED", e.Unavailable = "UNAVAILABLE";
})(D ||= {});
var O = class extends Error {
	constructor(e, t, n) {
		super(e), this.message = e, this.code = t, this.data = n;
	}
}, k = (e) => e?.androidBridge ? "android" : e?.webkit?.messageHandlers?.bridge ? "ios" : "web", A = (e) => {
	let t = e.CapacitorCustomPlatform || null, n = e.Capacitor || {}, r = n.Plugins = n.Plugins || {}, i = () => t === null ? k(e) : t.name, a = () => i() !== "web", o = (e) => !!(l.get(e)?.platforms.has(i()) || s(e)), s = (e) => n.PluginHeaders?.find((t) => t.name === e), c = (t) => e.console.error(t), l = /* @__PURE__ */ new Map();
	return n.convertFileSrc ||= (e) => e, n.getPlatform = i, n.handleError = c, n.isNativePlatform = a, n.isPluginAvailable = o, n.registerPlugin = (e, a = {}) => {
		let o = l.get(e);
		if (o) return console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`), o.proxy;
		let c = i(), u = s(e), d, f = async () => (!d && c in a ? d = d = typeof a[c] == "function" ? await a[c]() : a[c] : t !== null && !d && "web" in a && (d = d = typeof a.web == "function" ? await a.web() : a.web), d), p = (t, r) => {
			if (u) {
				let i = u?.methods.find((e) => r === e.name);
				if (i) return i.rtype === "promise" ? (t) => n.nativePromise(e, r.toString(), t) : (t, i) => n.nativeCallback(e, r.toString(), t, i);
				if (t) return t[r]?.bind(t);
			} else if (t) return t[r]?.bind(t);
			else throw new O(`"${e}" plugin is not implemented on ${c}`, D.Unimplemented);
		}, m = (t) => {
			let n, r = (...r) => {
				let i = f().then((i) => {
					let a = p(i, t);
					if (a) {
						let e = a(...r);
						return n = e?.remove, e;
					} else throw new O(`"${e}.${t}()" is not implemented on ${c}`, D.Unimplemented);
				});
				return t === "addListener" && (i.remove = async () => n()), i;
			};
			return r.toString = () => `${t.toString()}() { [capacitor code] }`, Object.defineProperty(r, "name", {
				value: t,
				writable: !1,
				configurable: !1
			}), r;
		}, h = m("addListener"), g = m("removeListener"), _ = (e, t) => {
			let n = h({ eventName: e }, t), r = async () => {
				let r = await n;
				g({
					eventName: e,
					callbackId: r
				}, t);
			}, i = new Promise((e) => n.then(() => e({ remove: r })));
			return i.remove = async () => {
				console.warn("Using addListener() without 'await' is deprecated."), await r();
			}, i;
		}, v = new Proxy({}, { get(e, t) {
			switch (t) {
				case "$$typeof": return;
				case "toJSON": return () => ({});
				case "addListener": return u ? _ : h;
				case "removeListener": return g;
				default: return m(t);
			}
		} });
		return r[e] = v, l.set(e, {
			name: e,
			proxy: v,
			platforms: /* @__PURE__ */ new Set([...Object.keys(a), ...u ? [c] : []])
		}), v;
	}, n.Exception = O, n.DEBUG = !!n.DEBUG, n.isLoggingEnabled = !!n.isLoggingEnabled, n;
}, j = /*#__PURE__*/ ((e) => e.Capacitor = A(e))(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {}), M = j.registerPlugin, N = class {
	constructor() {
		this.listeners = {}, this.retainedEventArguments = {}, this.windowListeners = {};
	}
	addListener(e, t) {
		let n = !1;
		this.listeners[e] || (this.listeners[e] = [], n = !0), this.listeners[e].push(t);
		let r = this.windowListeners[e];
		return r && !r.registered && this.addWindowListener(r), n && this.sendRetainedArgumentsForEvent(e), Promise.resolve({ remove: async () => this.removeListener(e, t) });
	}
	async removeAllListeners() {
		this.listeners = {};
		for (let e in this.windowListeners) this.removeWindowListener(this.windowListeners[e]);
		this.windowListeners = {};
	}
	notifyListeners(e, t, n) {
		let r = this.listeners[e];
		if (!r) {
			if (n) {
				let n = this.retainedEventArguments[e];
				n ||= [], n.push(t), this.retainedEventArguments[e] = n;
			}
			return;
		}
		r.forEach((e) => e(t));
	}
	hasListeners(e) {
		return !!this.listeners[e]?.length;
	}
	registerWindowListener(e, t) {
		this.windowListeners[t] = {
			registered: !1,
			windowEventName: e,
			pluginEventName: t,
			handler: (e) => {
				this.notifyListeners(t, e);
			}
		};
	}
	unimplemented(e = "not implemented") {
		return new j.Exception(e, D.Unimplemented);
	}
	unavailable(e = "not available") {
		return new j.Exception(e, D.Unavailable);
	}
	async removeListener(e, t) {
		let n = this.listeners[e];
		if (!n) return;
		let r = n.indexOf(t);
		r !== -1 && this.listeners[e].splice(r, 1), this.listeners[e].length || this.removeWindowListener(this.windowListeners[e]);
	}
	addWindowListener(e) {
		window.addEventListener(e.windowEventName, e.handler), e.registered = !0;
	}
	removeWindowListener(e) {
		e && (window.removeEventListener(e.windowEventName, e.handler), e.registered = !1);
	}
	sendRetainedArgumentsForEvent(e) {
		let t = this.retainedEventArguments[e];
		t && (delete this.retainedEventArguments[e], t.forEach((t) => {
			this.notifyListeners(e, t);
		}));
	}
}, P = (e) => encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape), F = (e) => e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent), I = class extends N {
	async getCookies() {
		let e = document.cookie, t = {};
		return e.split(";").forEach((e) => {
			if (e.length <= 0) return;
			let [n, r] = e.replace(/=/, "CAP_COOKIE").split("CAP_COOKIE");
			n = F(n).trim(), r = F(r).trim(), t[n] = r;
		}), t;
	}
	async setCookie(e) {
		try {
			let t = P(e.key), n = P(e.value), r = e.expires ? `; expires=${e.expires.replace("expires=", "")}` : "", i = (e.path || "/").replace("path=", ""), a = e.url != null && e.url.length > 0 ? `domain=${e.url}` : "";
			document.cookie = `${t}=${n || ""}${r}; path=${i}; ${a};`;
		} catch (e) {
			return Promise.reject(e);
		}
	}
	async deleteCookie(e) {
		try {
			document.cookie = `${e.key}=; Max-Age=0`;
		} catch (e) {
			return Promise.reject(e);
		}
	}
	async clearCookies() {
		try {
			let e = document.cookie.split(";") || [];
			for (let t of e) document.cookie = t.replace(/^ +/, "").replace(/=.*/, `=;expires=${(/* @__PURE__ */ new Date()).toUTCString()};path=/`);
		} catch (e) {
			return Promise.reject(e);
		}
	}
	async clearAllCookies() {
		try {
			await this.clearCookies();
		} catch (e) {
			return Promise.reject(e);
		}
	}
};
M("CapacitorCookies", { web: () => new I() });
var ee = async (e) => new Promise((t, n) => {
	let r = new FileReader();
	r.onload = () => {
		let e = r.result;
		t(e.indexOf(",") >= 0 ? e.split(",")[1] : e);
	}, r.onerror = (e) => n(e), r.readAsDataURL(e);
}), te = (e = {}) => {
	let t = Object.keys(e);
	return Object.keys(e).map((e) => e.toLocaleLowerCase()).reduce((n, r, i) => (n[r] = e[t[i]], n), {});
}, ne = (e, t = !0) => e ? Object.entries(e).reduce((e, n) => {
	let [r, i] = n, a, o;
	return Array.isArray(i) ? (o = "", i.forEach((e) => {
		a = t ? encodeURIComponent(e) : e, o += `${r}=${a}&`;
	}), o.slice(0, -1)) : (a = t ? encodeURIComponent(i) : i, o = `${r}=${a}`), `${e}&${o}`;
}, "").substr(1) : null, re = (e, t = {}) => {
	let n = Object.assign({
		method: e.method || "GET",
		headers: e.headers
	}, t), r = te(e.headers)["content-type"] || "";
	if (typeof e.data == "string") n.body = e.data;
	else if (r.includes("application/x-www-form-urlencoded")) {
		let t = new URLSearchParams();
		for (let [n, r] of Object.entries(e.data || {})) t.set(n, r);
		n.body = t.toString();
	} else if (r.includes("multipart/form-data") || e.data instanceof FormData) {
		let t = new FormData();
		if (e.data instanceof FormData) e.data.forEach((e, n) => {
			t.append(n, e);
		});
		else for (let n of Object.keys(e.data)) t.append(n, e.data[n]);
		n.body = t;
		let r = new Headers(n.headers);
		r.delete("content-type"), n.headers = r;
	} else (r.includes("application/json") || typeof e.data == "object") && (n.body = JSON.stringify(e.data));
	return n;
}, L = class extends N {
	async request(e) {
		let t = re(e, e.webFetchExtra), n = ne(e.params, e.shouldEncodeUrlParams), r = n ? `${e.url}?${n}` : e.url, i = await fetch(r, t), a = i.headers.get("content-type") || "", { responseType: o = "text" } = i.ok ? e : {};
		a.includes("application/json") && (o = "json");
		let s, c;
		switch (o) {
			case "arraybuffer":
			case "blob":
				c = await i.blob(), s = await ee(c);
				break;
			case "json":
				s = await i.json();
				break;
			default: s = await i.text();
		}
		let l = {};
		return i.headers.forEach((e, t) => {
			l[t] = e;
		}), {
			data: s,
			headers: l,
			status: i.status,
			url: i.url
		};
	}
	async get(e) {
		return this.request(Object.assign(Object.assign({}, e), { method: "GET" }));
	}
	async post(e) {
		return this.request(Object.assign(Object.assign({}, e), { method: "POST" }));
	}
	async put(e) {
		return this.request(Object.assign(Object.assign({}, e), { method: "PUT" }));
	}
	async patch(e) {
		return this.request(Object.assign(Object.assign({}, e), { method: "PATCH" }));
	}
	async delete(e) {
		return this.request(Object.assign(Object.assign({}, e), { method: "DELETE" }));
	}
};
M("CapacitorHttp", { web: () => new L() });
var R;
(function(e) {
	e.Dark = "DARK", e.Light = "LIGHT", e.Default = "DEFAULT";
})(R ||= {});
var z;
(function(e) {
	e.StatusBar = "StatusBar", e.NavigationBar = "NavigationBar";
})(z ||= {});
var B = class extends N {
	async setStyle() {
		this.unavailable("not available for web");
	}
	async setAnimation() {
		this.unavailable("not available for web");
	}
	async show() {
		this.unavailable("not available for web");
	}
	async hide() {
		this.unavailable("not available for web");
	}
};
M("SystemBars", { web: () => new B() });
//#endregion
//#region src/types/PlatformTypes.tsx
var V = {
	WEB: "web",
	ANDROID: "android",
	IOS: "ios",
	DESKTOP: "desktop"
}, H = r(void 0), U = ({ children: e, defaultPlatform: t }) => {
	let [n, r] = p(() => {
		let e = V.WEB;
		if (t) e = t;
		else {
			let t = j.getPlatform();
			(t === V.IOS || t === V.ANDROID) && (e = t);
		}
		return {
			platform: e,
			loading: !1,
			reload: !1,
			booting: !1,
			sidebar: !1,
			version: null,
			modal: null,
			logo: null,
			background: null
		};
	});
	return s(() => {
		if (!t) {
			let e = j.getPlatform(), t = e === V.IOS || e === V.ANDROID ? e : V.WEB;
			t !== n.platform && r((e) => ({
				...e,
				platform: t
			}));
		}
	}, [t, n.platform]), /* @__PURE__ */ h(H.Provider, {
		value: {
			state: n,
			updateState: (e) => {
				r((t) => ({
					...t,
					...e
				}));
			}
		},
		children: e
	});
}, W = () => {
	let e = o(H);
	if (!e) throw Error("useLionUI debe ser utilizado dentro de un LionUIComponentsProvider");
	return e;
}, G = {
	SECONDARY: "secondary",
	PRIMARY: "primary",
	SUCCESS: "success",
	DANGER: "danger",
	WARNING: "warning",
	INFO: "info",
	LIGHT: "light",
	LINK: "link",
	DARK: "dark",
	MODAL: "modal",
	LION_PACKAGES: "lion-packages",
	LION_PARKING: "lion-parking",
	LION_TECH: "lion-tech",
	LION_GLAM: "lion-glam"
}, K = {
	SX: "sx",
	SM: "sm",
	MD: "md",
	LG: "lg",
	XL: "lg",
	XXL: "lg"
}, q = {
	SUBMIT: "submit",
	BUTTON: "button",
	RESET: "reset",
	UNDEFINED: void 0
}, ie = {
	FILLED: "filled",
	ELEVATED: "elevated",
	TONAL: "tonal",
	OUTLINED: "outlined",
	TEXT: "text"
}, ae = {
	PILL: "pill",
	ROUNDED: "rounded"
};
//#endregion
//#region src/components/buttons/AndroidButton.tsx
function oe({ children: e, variant: t = G.PRIMARY, styleType: n = ie.FILLED, shape: r = ae.PILL, size: i = K.MD, type: a = q.BUTTON, className: o = "", ...s }) {
	return /* @__PURE__ */ g("button", {
		type: a,
		className: `android-btn android-btn-${i} ${`android-btn-${n}`} ${`android-btn-${r}`} ${t ? `btn-${t}` : ""} ${o}`.trim(),
		...s,
		children: [e, /* @__PURE__ */ h("span", { className: "ripple" })]
	});
}
//#endregion
//#region src/types/Web/BootstrapStyleTypes.tsx
var se = {
	FILLED: "filled",
	OUTLINED: "outlined"
}, ce = {
	STANDARD: "standard",
	PILL: "pill",
	SQUARE: "square"
};
//#endregion
//#region src/components/buttons/BootstrapButton.tsx
function le({ children: e, variant: t = "primary", styleType: n = se.FILLED, shape: r = ce.STANDARD, size: i = "md", type: a = "button", className: o = "", ...s }) {
	let c = n === se.OUTLINED ? "btn-outline-" : "btn-";
	return /* @__PURE__ */ h("button", {
		type: a,
		className: `btn ${t ? `${c}${t}` : ""} ${i && i !== "md" ? `btn-${i}` : ""} ${r === ce.PILL ? "rounded-pill" : r === ce.SQUARE ? "rounded-0" : ""} ${o}`.trim(),
		...s,
		children: e
	});
}
//#endregion
//#region src/types/IOS/IOSStyleTypes.tsx
var ue = {
	FILLED: "filled",
	TINTED: "tinted",
	GRAY: "gray",
	PLAIN: "plain"
}, de = {
	ROUNDED: "rounded",
	CAPSULE: "capsule"
};
//#endregion
//#region src/components/buttons/IOSButton.tsx
function fe({ children: e, variant: t = G.PRIMARY, styleType: n = ue.FILLED, shape: r = de.ROUNDED, size: i = K.MD, type: a = q.BUTTON, className: o = "", ...s }) {
	return /* @__PURE__ */ h("button", {
		type: a,
		className: `ios-btn ios-btn-${i} ${`ios-btn-${n}`} ${`ios-btn-${r}`} ${t ? `btn-${t}` : ""} ${o}`.trim(),
		...s,
		children: /* @__PURE__ */ h("span", {
			className: "ios-btn-content",
			children: e
		})
	});
}
//#endregion
//#region src/components/buttons/LionButton.tsx
function pe({ children: e, shape: t, styleType: n, platform: r = null, ...i }) {
	let { state: a } = W(), o = r ?? a.platform, s = (e) => {
		if (typeof e == "object" && e) {
			let t = e;
			return t[o] ?? t[o.toLowerCase()];
		}
		return e;
	}, c = s(t), l = s(n), u = {
		...i,
		...c !== void 0 && { shape: c },
		...l !== void 0 && { styleType: l }
	};
	switch (o) {
		case V.ANDROID: return /* @__PURE__ */ h(oe, {
			...u,
			children: e
		});
		case V.IOS: return /* @__PURE__ */ h(fe, {
			...u,
			children: e
		});
		case V.WEB:
		case V.DESKTOP:
		default: return /* @__PURE__ */ h(le, {
			...u,
			children: e
		});
	}
}
//#endregion
//#region src/types/InputTypes.tsx
var me = {
	TEXT: "text",
	PASSWORD: "password",
	EMAIL: "email",
	NUMBER: "number",
	TEL: "tel",
	URL: "url",
	DATE: "date",
	DATETIME: "datetime"
}, he = {
	FILLED: "filled",
	OUTLINED: "outlined"
}, ge = {
	SMALL: "small",
	NORMAL: "normal"
};
//#endregion
//#region src/components/inputs/AndroidInput.tsx
function _e({ type: e = me.TEXT, styleType: t = he.OUTLINED, shape: n = ge.NORMAL, variant: r = "primary", label: i, required: a = !1, helperText: o, error: s, startIcon: l, endIcon: u, prefixText: d, suffixText: f, counter: m, disabled: _ = !1, readOnly: v = !1, value: y, defaultValue: b, onChange: x, onFocus: S, onBlur: C, id: w, className: T = "", maxLength: E, placeholder: D = " ", ...O }) {
	let k = c(), A = w || k, [j, M] = p(!1), [N, P] = p(y ?? b ?? ""), F = !!s, I = typeof s == "string" ? s : void 0, ee = String(t).toLowerCase().replace(/_/g, "-"), te = String(n).toLowerCase(), ne = [
		"android-input-container",
		`android-variant-${r}`,
		T
	].filter(Boolean).join(" "), re = [
		"android-input-field-wrapper",
		`android-style-${ee}`,
		`android-size-${te}`,
		j ? "is-focused" : "",
		F ? "has-error" : "",
		_ ? "is-disabled" : "",
		v ? "is-readonly" : ""
	].filter(Boolean).join(" "), L = ["android-input-element", F ? "is-invalid" : ""].filter(Boolean).join(" "), R = (e) => {
		P(e.target.value), x && x(e);
	}, z = (e) => {
		M(!0), S && S(e);
	}, B = (e) => {
		M(!1), C && C(e);
	}, V = y === void 0 ? N : y, H = String(V || "").length, U = typeof m == "number" ? m : E;
	return /* @__PURE__ */ g("div", {
		className: ne,
		children: [/* @__PURE__ */ g("div", {
			className: re,
			children: [
				l && /* @__PURE__ */ h("div", {
					className: "android-input-start-icon",
					children: l
				}),
				d && /* @__PURE__ */ h("span", {
					className: "android-input-prefix",
					children: d
				}),
				/* @__PURE__ */ h("input", {
					id: A,
					type: e,
					value: V,
					required: a,
					disabled: _,
					readOnly: v,
					maxLength: U,
					placeholder: D,
					onChange: R,
					onFocus: z,
					onBlur: B,
					className: L,
					...O
				}),
				i && /* @__PURE__ */ g("label", {
					htmlFor: A,
					className: "android-input-label",
					children: [i, a && /* @__PURE__ */ h("span", {
						className: "text-danger ms-1",
						children: "*"
					})]
				}),
				f && /* @__PURE__ */ h("span", {
					className: "android-input-suffix",
					children: f
				}),
				u && /* @__PURE__ */ h("div", {
					className: "android-input-end-icon",
					children: u
				})
			]
		}), (o || I || m) && /* @__PURE__ */ g("div", {
			className: "android-input-subtext-container",
			children: [F ? /* @__PURE__ */ h("div", {
				className: "android-input-error-text",
				children: I
			}) : o ? /* @__PURE__ */ h("div", {
				className: "android-input-helper-text",
				children: o
			}) : /* @__PURE__ */ h("div", {}), m && /* @__PURE__ */ g("span", {
				className: "android-input-counter",
				children: [H, U ? `/${U}` : ""]
			})]
		})]
	});
}
//#endregion
//#region src/types/Web/BootstrapInputShapeTypes.tsx
var ve = {
	ROUNDED: "rounded",
	PILL: "rounded-pill",
	SQUARE: "rounded-0"
}, ye = {
	FLOATING: "floating",
	STANDARD: "standard"
};
//#endregion
//#region src/components/inputs/BootstrapInput.tsx
function be({ type: e = me.TEXT, styleType: t = ye.FLOATING, shape: n = ve.ROUNDED, variant: r = "primary", sizeType: i = "md", label: a, required: o = !1, helperText: s, error: l, disabled: u = !1, readOnly: d = !1, id: f, className: p = "", placeholder: m = " ", ..._ }) {
	let v = c(), y = f || v, b = !!l, x = typeof l == "string" ? l : void 0, S = [
		"form-control",
		n,
		i === "sm" ? "form-control-sm" : i === "lg" ? "form-control-lg" : "",
		`bootstrap-variant-${r}`,
		b ? "is-invalid" : "",
		p
	].filter(Boolean).join(" "), C = t === ye.FLOATING;
	return /* @__PURE__ */ g("div", {
		className: "mb-3 w-100",
		children: [
			!C && a && /* @__PURE__ */ g("label", {
				htmlFor: y,
				className: "form-label",
				children: [a, o && /* @__PURE__ */ h("span", {
					className: "text-danger ms-1",
					children: "*"
				})]
			}),
			C ? /* @__PURE__ */ g("div", {
				className: "form-floating",
				children: [/* @__PURE__ */ h("input", {
					id: y,
					type: e,
					className: S,
					placeholder: m,
					disabled: u,
					readOnly: d,
					required: o,
					..._
				}), a && /* @__PURE__ */ g("label", {
					htmlFor: y,
					children: [a, o && /* @__PURE__ */ h("span", {
						className: "text-danger ms-1",
						children: "*"
					})]
				})]
			}) : /* @__PURE__ */ h("input", {
				id: y,
				type: e,
				className: S,
				placeholder: m,
				disabled: u,
				readOnly: d,
				required: o,
				..._
			}),
			b ? /* @__PURE__ */ h("div", {
				className: "invalid-feedback d-block",
				children: x
			}) : s ? /* @__PURE__ */ h("div", {
				className: "form-text",
				children: s
			}) : null
		]
	});
}
//#endregion
//#region src/types/IOS/IOSInputStyleTypes.tsx
var xe = {
	FORM: "form",
	ROUNDED_BORDER: "rounded-border",
	FILLED: "filled",
	OUTLINED: "outlined",
	PLAIN: "plain"
}, Se = {
	ROUNDED: "rounded",
	PILL: "pill",
	SQUARE: "square"
};
//#endregion
//#region src/components/inputs/IOSInput.tsx
function Ce({ type: e = me.TEXT, styleType: t = xe.ROUNDED_BORDER, shape: n = Se.ROUNDED, variant: r = "primary", sizeType: i = "md", label: a, required: o = !1, helperText: s, error: l, startIcon: u, endIcon: d, prefixText: f, suffixText: m, clearable: _ = !1, disabled: v = !1, readOnly: y = !1, value: b, defaultValue: x, onChange: S, onFocus: C, onBlur: w, id: T, className: E = "", maxLength: D, placeholder: O, ...k }) {
	let A = c(), j = T || A, [M, N] = p(!1), [P, F] = p(b ?? x ?? ""), I = !!l, ee = typeof l == "string" ? l : void 0, te = String(t).toLowerCase().replace(/_/g, "-"), ne = String(n).toLowerCase(), re = [
		"ios-input-container",
		`ios-variant-${r}`,
		E
	].filter(Boolean).join(" "), L = [
		"ios-input-wrapper",
		`ios-style-${te}`,
		`ios-shape-${ne}`,
		`ios-size-${i}`,
		M ? "is-focused" : "",
		I ? "has-error" : "",
		v ? "is-disabled" : "",
		y ? "is-readonly" : ""
	].filter(Boolean).join(" "), R = (e) => {
		N(!0), C && C(e);
	}, z = (e) => {
		N(!1), w && w(e);
	}, B = (e) => {
		F(e.target.value), S && S(e);
	}, V = () => {
		F(""), S && S({ target: { value: "" } });
	}, H = b === void 0 ? P : b;
	return /* @__PURE__ */ g("div", {
		className: re,
		children: [
			a && /* @__PURE__ */ g("label", {
				htmlFor: j,
				className: "ios-input-label",
				children: [a, o && /* @__PURE__ */ h("span", {
					className: "text-danger ms-1",
					children: "*"
				})]
			}),
			/* @__PURE__ */ g("div", {
				className: L,
				children: [
					u && /* @__PURE__ */ h("div", {
						className: "ios-input-icon-left",
						children: u
					}),
					f && /* @__PURE__ */ h("span", {
						className: "input-prefix",
						children: f
					}),
					/* @__PURE__ */ h("input", {
						id: j,
						type: e,
						value: H,
						required: o,
						disabled: v,
						readOnly: y,
						maxLength: D,
						placeholder: O,
						onChange: B,
						onFocus: R,
						onBlur: z,
						className: "ios-input-element",
						...k
					}),
					_ && !!H && !v && !y && /* @__PURE__ */ h("button", {
						type: "button",
						className: "ios-clear-button",
						onClick: V,
						tabIndex: -1,
						children: /* @__PURE__ */ h("i", { className: "bi bi-x" })
					}),
					m && /* @__PURE__ */ h("span", {
						className: "input-suffix",
						children: m
					}),
					d && /* @__PURE__ */ h("div", {
						className: "ios-input-icon-right",
						children: d
					})
				]
			}),
			I ? /* @__PURE__ */ h("div", {
				className: "ios-input-error-text",
				children: ee
			}) : s ? /* @__PURE__ */ h("div", {
				className: "ios-input-helper-text",
				children: s
			}) : null
		]
	});
}
//#endregion
//#region src/components/inputs/LionInput.tsx
function we({ shape: e, styleType: t, platform: n = null, ...r }) {
	let { state: i } = W(), a = n ?? i.platform, o = (e) => {
		if (typeof e == "object" && e) {
			let t = e;
			return t[a] ?? t[a.toLowerCase()];
		}
		return e;
	}, s = o(e), c = o(t), l = {
		...r,
		...s !== void 0 && { shape: s },
		...c !== void 0 && { styleType: c }
	};
	switch (a) {
		case V.ANDROID: return /* @__PURE__ */ h(_e, { ...l });
		case V.IOS: return /* @__PURE__ */ h(Ce, { ...l });
		case V.WEB:
		case V.DESKTOP:
		default: return /* @__PURE__ */ h(be, { ...l });
	}
}
//#endregion
//#region src/components/loadings/LoadingBar.tsx
function Te({ variant: e = G.PRIMARY }) {
	let { state: t } = W(), n = String(e).toLowerCase().replace(/_/g, "-"), r = e ? `loading-variant-${n}` : "";
	return t.loading ? /* @__PURE__ */ h("div", {
		className: "sticky-top",
		children: /* @__PURE__ */ h("div", {
			className: `custom-progress-bar ${r}`,
			children: /* @__PURE__ */ h("div", { className: "indeterminate" })
		})
	}) : null;
}
//#endregion
//#region node_modules/classnames/index.js
var Ee = /* @__PURE__ */ w(((e, t) => {
	(function() {
		var e = {}.hasOwnProperty;
		function n() {
			for (var e = "", t = 0; t < arguments.length; t++) {
				var n = arguments[t];
				n && (e = i(e, r(n)));
			}
			return e;
		}
		function r(t) {
			if (typeof t == "string" || typeof t == "number") return t;
			if (typeof t != "object") return "";
			if (Array.isArray(t)) return n.apply(null, t);
			if (t.toString !== Object.prototype.toString && !t.toString.toString().includes("[native code]")) return t.toString();
			var r = "";
			for (var a in t) e.call(t, a) && t[a] && (r = i(r, a));
			return r;
		}
		function i(e, t) {
			return t ? e ? e + " " + t : e + t : e;
		}
		t !== void 0 && t.exports ? (n.default = n, t.exports = n) : typeof define == "function" && typeof define.amd == "object" && define.amd ? define("classnames", [], function() {
			return n;
		}) : window.classNames = n;
	})();
}));
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function De(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function Oe(e, t) {
	return Oe = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
		return e.__proto__ = t, e;
	}, Oe(e, t);
}
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function ke(e, t) {
	e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Oe(e, t);
}
var Ae = /*#__PURE__*/ e.createContext({
	prefixes: {},
	breakpoints: [
		"xxl",
		"xl",
		"lg",
		"md",
		"sm",
		"xs"
	],
	minBreakpoint: "xs"
}), { Consumer: je, Provider: Me } = Ae;
function J(e, t) {
	let { prefixes: n } = o(Ae);
	return e || n[t] || t;
}
function Ne() {
	let { dir: e } = o(Ae);
	return e === "rtl";
}
//#endregion
//#region node_modules/dom-helpers/esm/ownerDocument.js
function Pe(e) {
	return e && e.ownerDocument || document;
}
//#endregion
//#region node_modules/dom-helpers/esm/ownerWindow.js
function Fe(e) {
	var t = Pe(e);
	return t && t.defaultView || window;
}
//#endregion
//#region node_modules/dom-helpers/esm/getComputedStyle.js
function Ie(e, t) {
	return Fe(e).getComputedStyle(e, t);
}
//#endregion
//#region node_modules/dom-helpers/esm/hyphenate.js
var Le = /([A-Z])/g;
function Re(e) {
	return e.replace(Le, "-$1").toLowerCase();
}
//#endregion
//#region node_modules/dom-helpers/esm/hyphenateStyle.js
var ze = /^ms-/;
function Be(e) {
	return Re(e).replace(ze, "-ms-");
}
//#endregion
//#region node_modules/dom-helpers/esm/isTransform.js
var Ve = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
function He(e) {
	return !!(e && Ve.test(e));
}
//#endregion
//#region node_modules/dom-helpers/esm/css.js
function Y(e, t) {
	var n = "", r = "";
	if (typeof t == "string") return e.style.getPropertyValue(Be(t)) || Ie(e).getPropertyValue(Be(t));
	Object.keys(t).forEach(function(i) {
		var a = t[i];
		!a && a !== 0 ? e.style.removeProperty(Be(i)) : He(i) ? r += i + "(" + a + ") " : n += Be(i) + ": " + a + ";";
	}), r && (n += "transform: " + r + ";"), e.style.cssText += ";" + n;
}
//#endregion
//#region node_modules/react-is/cjs/react-is.production.min.js
var Ue = /* @__PURE__ */ w(((e) => {
	var t = typeof Symbol == "function" && Symbol.for, n = t ? Symbol.for("react.element") : 60103, r = t ? Symbol.for("react.portal") : 60106, i = t ? Symbol.for("react.fragment") : 60107, a = t ? Symbol.for("react.strict_mode") : 60108, o = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, c = t ? Symbol.for("react.context") : 60110, l = t ? Symbol.for("react.async_mode") : 60111, u = t ? Symbol.for("react.concurrent_mode") : 60111, d = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, p = t ? Symbol.for("react.suspense_list") : 60120, m = t ? Symbol.for("react.memo") : 60115, h = t ? Symbol.for("react.lazy") : 60116, g = t ? Symbol.for("react.block") : 60121, _ = t ? Symbol.for("react.fundamental") : 60117, v = t ? Symbol.for("react.responder") : 60118, y = t ? Symbol.for("react.scope") : 60119;
	function b(e) {
		if (typeof e == "object" && e) {
			var t = e.$$typeof;
			switch (t) {
				case n: switch (e = e.type, e) {
					case l:
					case u:
					case i:
					case o:
					case a:
					case f: return e;
					default: switch (e &&= e.$$typeof, e) {
						case c:
						case d:
						case h:
						case m:
						case s: return e;
						default: return t;
					}
				}
				case r: return t;
			}
		}
	}
	function x(e) {
		return b(e) === u;
	}
	e.AsyncMode = l, e.ConcurrentMode = u, e.ContextConsumer = c, e.ContextProvider = s, e.Element = n, e.ForwardRef = d, e.Fragment = i, e.Lazy = h, e.Memo = m, e.Portal = r, e.Profiler = o, e.StrictMode = a, e.Suspense = f, e.isAsyncMode = function(e) {
		return x(e) || b(e) === l;
	}, e.isConcurrentMode = x, e.isContextConsumer = function(e) {
		return b(e) === c;
	}, e.isContextProvider = function(e) {
		return b(e) === s;
	}, e.isElement = function(e) {
		return typeof e == "object" && !!e && e.$$typeof === n;
	}, e.isForwardRef = function(e) {
		return b(e) === d;
	}, e.isFragment = function(e) {
		return b(e) === i;
	}, e.isLazy = function(e) {
		return b(e) === h;
	}, e.isMemo = function(e) {
		return b(e) === m;
	}, e.isPortal = function(e) {
		return b(e) === r;
	}, e.isProfiler = function(e) {
		return b(e) === o;
	}, e.isStrictMode = function(e) {
		return b(e) === a;
	}, e.isSuspense = function(e) {
		return b(e) === f;
	}, e.isValidElementType = function(e) {
		return typeof e == "string" || typeof e == "function" || e === i || e === u || e === o || e === a || e === f || e === p || typeof e == "object" && !!e && (e.$$typeof === h || e.$$typeof === m || e.$$typeof === s || e.$$typeof === c || e.$$typeof === d || e.$$typeof === _ || e.$$typeof === v || e.$$typeof === y || e.$$typeof === g);
	}, e.typeOf = b;
})), We = /* @__PURE__ */ w(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		var t = typeof Symbol == "function" && Symbol.for, n = t ? Symbol.for("react.element") : 60103, r = t ? Symbol.for("react.portal") : 60106, i = t ? Symbol.for("react.fragment") : 60107, a = t ? Symbol.for("react.strict_mode") : 60108, o = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, c = t ? Symbol.for("react.context") : 60110, l = t ? Symbol.for("react.async_mode") : 60111, u = t ? Symbol.for("react.concurrent_mode") : 60111, d = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, p = t ? Symbol.for("react.suspense_list") : 60120, m = t ? Symbol.for("react.memo") : 60115, h = t ? Symbol.for("react.lazy") : 60116, g = t ? Symbol.for("react.block") : 60121, _ = t ? Symbol.for("react.fundamental") : 60117, v = t ? Symbol.for("react.responder") : 60118, y = t ? Symbol.for("react.scope") : 60119;
		function b(e) {
			return typeof e == "string" || typeof e == "function" || e === i || e === u || e === o || e === a || e === f || e === p || typeof e == "object" && !!e && (e.$$typeof === h || e.$$typeof === m || e.$$typeof === s || e.$$typeof === c || e.$$typeof === d || e.$$typeof === _ || e.$$typeof === v || e.$$typeof === y || e.$$typeof === g);
		}
		function x(e) {
			if (typeof e == "object" && e) {
				var t = e.$$typeof;
				switch (t) {
					case n:
						var p = e.type;
						switch (p) {
							case l:
							case u:
							case i:
							case o:
							case a:
							case f: return p;
							default:
								var g = p && p.$$typeof;
								switch (g) {
									case c:
									case d:
									case h:
									case m:
									case s: return g;
									default: return t;
								}
						}
					case r: return t;
				}
			}
		}
		var S = l, C = u, w = c, T = s, E = n, D = d, O = i, k = h, A = m, j = r, M = o, N = a, P = f, F = !1;
		function I(e) {
			return F || (F = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), ee(e) || x(e) === l;
		}
		function ee(e) {
			return x(e) === u;
		}
		function te(e) {
			return x(e) === c;
		}
		function ne(e) {
			return x(e) === s;
		}
		function re(e) {
			return typeof e == "object" && !!e && e.$$typeof === n;
		}
		function L(e) {
			return x(e) === d;
		}
		function R(e) {
			return x(e) === i;
		}
		function z(e) {
			return x(e) === h;
		}
		function B(e) {
			return x(e) === m;
		}
		function V(e) {
			return x(e) === r;
		}
		function H(e) {
			return x(e) === o;
		}
		function U(e) {
			return x(e) === a;
		}
		function W(e) {
			return x(e) === f;
		}
		e.AsyncMode = S, e.ConcurrentMode = C, e.ContextConsumer = w, e.ContextProvider = T, e.Element = E, e.ForwardRef = D, e.Fragment = O, e.Lazy = k, e.Memo = A, e.Portal = j, e.Profiler = M, e.StrictMode = N, e.Suspense = P, e.isAsyncMode = I, e.isConcurrentMode = ee, e.isContextConsumer = te, e.isContextProvider = ne, e.isElement = re, e.isForwardRef = L, e.isFragment = R, e.isLazy = z, e.isMemo = B, e.isPortal = V, e.isProfiler = H, e.isStrictMode = U, e.isSuspense = W, e.isValidElementType = b, e.typeOf = x;
	})();
})), Ge = /* @__PURE__ */ w(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = Ue() : t.exports = We();
})), Ke = /* @__PURE__ */ w(((e, t) => {
	var n = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty, i = Object.prototype.propertyIsEnumerable;
	function a(e) {
		if (e == null) throw TypeError("Object.assign cannot be called with null or undefined");
		return Object(e);
	}
	function o() {
		try {
			if (!Object.assign) return !1;
			var e = /* @__PURE__ */ new String("abc");
			if (e[5] = "de", Object.getOwnPropertyNames(e)[0] === "5") return !1;
			for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
			if (Object.getOwnPropertyNames(t).map(function(e) {
				return t[e];
			}).join("") !== "0123456789") return !1;
			var r = {};
			return "abcdefghijklmnopqrst".split("").forEach(function(e) {
				r[e] = e;
			}), Object.keys(Object.assign({}, r)).join("") === "abcdefghijklmnopqrst";
		} catch {
			return !1;
		}
	}
	t.exports = o() ? Object.assign : function(e, t) {
		for (var o, s = a(e), c, l = 1; l < arguments.length; l++) {
			for (var u in o = Object(arguments[l]), o) r.call(o, u) && (s[u] = o[u]);
			if (n) {
				c = n(o);
				for (var d = 0; d < c.length; d++) i.call(o, c[d]) && (s[c[d]] = o[c[d]]);
			}
		}
		return s;
	};
})), qe = /* @__PURE__ */ w(((e, t) => {
	t.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
})), Je = /* @__PURE__ */ w(((e, t) => {
	t.exports = Function.call.bind(Object.prototype.hasOwnProperty);
})), Ye = /* @__PURE__ */ w(((e, t) => {
	var n = function() {};
	if (process.env.NODE_ENV !== "production") {
		var r = qe(), i = {}, a = Je();
		n = function(e) {
			var t = "Warning: " + e;
			typeof console < "u" && console.error(t);
			try {
				throw Error(t);
			} catch {}
		};
	}
	function o(e, t, o, s, c) {
		if (process.env.NODE_ENV !== "production") {
			for (var l in e) if (a(e, l)) {
				var u;
				try {
					if (typeof e[l] != "function") {
						var d = Error((s || "React class") + ": " + o + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
						throw d.name = "Invariant Violation", d;
					}
					u = e[l](t, l, s, o, null, r);
				} catch (e) {
					u = e;
				}
				if (u && !(u instanceof Error) && n((s || "React class") + ": type specification of " + o + " `" + l + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof u + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."), u instanceof Error && !(u.message in i)) {
					i[u.message] = !0;
					var f = c ? c() : "";
					n("Failed " + o + " type: " + u.message + (f ?? ""));
				}
			}
		}
	}
	o.resetWarningCache = function() {
		process.env.NODE_ENV !== "production" && (i = {});
	}, t.exports = o;
})), Xe = /* @__PURE__ */ w(((e, t) => {
	var n = Ge(), r = Ke(), i = qe(), a = Je(), o = Ye(), s = function() {};
	process.env.NODE_ENV !== "production" && (s = function(e) {
		var t = "Warning: " + e;
		typeof console < "u" && console.error(t);
		try {
			throw Error(t);
		} catch {}
	});
	function c() {
		return null;
	}
	t.exports = function(e, t) {
		var l = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
		function d(e) {
			var t = e && (l && e[l] || e[u]);
			if (typeof t == "function") return t;
		}
		var f = "<<anonymous>>", p = {
			array: _("array"),
			bigint: _("bigint"),
			bool: _("boolean"),
			func: _("function"),
			number: _("number"),
			object: _("object"),
			string: _("string"),
			symbol: _("symbol"),
			any: v(),
			arrayOf: y,
			element: b(),
			elementType: x(),
			instanceOf: S,
			node: E(),
			objectOf: w,
			oneOf: C,
			oneOfType: T,
			shape: O,
			exact: k
		};
		function m(e, t) {
			return e === t ? e !== 0 || 1 / e == 1 / t : e !== e && t !== t;
		}
		function h(e, t) {
			this.message = e, this.data = t && typeof t == "object" ? t : {}, this.stack = "";
		}
		h.prototype = Error.prototype;
		function g(e) {
			if (process.env.NODE_ENV !== "production") var n = {}, r = 0;
			function a(a, o, c, l, u, d, p) {
				if (l ||= f, d ||= c, p !== i) {
					if (t) {
						var m = /* @__PURE__ */ Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");
						throw m.name = "Invariant Violation", m;
					} else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
						var g = l + ":" + c;
						!n[g] && r < 3 && (s("You are manually calling a React.PropTypes validation function for the `" + d + "` prop on `" + l + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."), n[g] = !0, r++);
					}
				}
				return o[c] == null ? a ? o[c] === null ? new h("The " + u + " `" + d + "` is marked as required " + ("in `" + l + "`, but its value is `null`.")) : new h("The " + u + " `" + d + "` is marked as required in " + ("`" + l + "`, but its value is `undefined`.")) : null : e(o, c, l, u, d);
			}
			var o = a.bind(null, !1);
			return o.isRequired = a.bind(null, !0), o;
		}
		function _(e) {
			function t(t, n, r, i, a, o) {
				var s = t[n];
				if (M(s) !== e) {
					var c = N(s);
					return new h("Invalid " + i + " `" + a + "` of type " + ("`" + c + "` supplied to `" + r + "`, expected ") + ("`" + e + "`."), { expectedType: e });
				}
				return null;
			}
			return g(t);
		}
		function v() {
			return g(c);
		}
		function y(e) {
			function t(t, n, r, a, o) {
				if (typeof e != "function") return new h("Property `" + o + "` of component `" + r + "` has invalid PropType notation inside arrayOf.");
				var s = t[n];
				if (!Array.isArray(s)) {
					var c = M(s);
					return new h("Invalid " + a + " `" + o + "` of type " + ("`" + c + "` supplied to `" + r + "`, expected an array."));
				}
				for (var l = 0; l < s.length; l++) {
					var u = e(s, l, r, a, o + "[" + l + "]", i);
					if (u instanceof Error) return u;
				}
				return null;
			}
			return g(t);
		}
		function b() {
			function t(t, n, r, i, a) {
				var o = t[n];
				if (!e(o)) {
					var s = M(o);
					return new h("Invalid " + i + " `" + a + "` of type " + ("`" + s + "` supplied to `" + r + "`, expected a single ReactElement."));
				}
				return null;
			}
			return g(t);
		}
		function x() {
			function e(e, t, r, i, a) {
				var o = e[t];
				if (!n.isValidElementType(o)) {
					var s = M(o);
					return new h("Invalid " + i + " `" + a + "` of type " + ("`" + s + "` supplied to `" + r + "`, expected a single ReactElement type."));
				}
				return null;
			}
			return g(e);
		}
		function S(e) {
			function t(t, n, r, i, a) {
				if (!(t[n] instanceof e)) {
					var o = e.name || f, s = F(t[n]);
					return new h("Invalid " + i + " `" + a + "` of type " + ("`" + s + "` supplied to `" + r + "`, expected ") + ("instance of `" + o + "`."));
				}
				return null;
			}
			return g(t);
		}
		function C(e) {
			if (!Array.isArray(e)) return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? s("Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).") : s("Invalid argument supplied to oneOf, expected an array.")), c;
			function t(t, n, r, i, a) {
				for (var o = t[n], s = 0; s < e.length; s++) if (m(o, e[s])) return null;
				var c = JSON.stringify(e, function(e, t) {
					return N(t) === "symbol" ? String(t) : t;
				});
				return new h("Invalid " + i + " `" + a + "` of value `" + String(o) + "` " + ("supplied to `" + r + "`, expected one of " + c + "."));
			}
			return g(t);
		}
		function w(e) {
			function t(t, n, r, o, s) {
				if (typeof e != "function") return new h("Property `" + s + "` of component `" + r + "` has invalid PropType notation inside objectOf.");
				var c = t[n], l = M(c);
				if (l !== "object") return new h("Invalid " + o + " `" + s + "` of type " + ("`" + l + "` supplied to `" + r + "`, expected an object."));
				for (var u in c) if (a(c, u)) {
					var d = e(c, u, r, o, s + "." + u, i);
					if (d instanceof Error) return d;
				}
				return null;
			}
			return g(t);
		}
		function T(e) {
			if (!Array.isArray(e)) return process.env.NODE_ENV !== "production" && s("Invalid argument supplied to oneOfType, expected an instance of array."), c;
			for (var t = 0; t < e.length; t++) {
				var n = e[t];
				if (typeof n != "function") return s("Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + P(n) + " at index " + t + "."), c;
			}
			function r(t, n, r, o, s) {
				for (var c = [], l = 0; l < e.length; l++) {
					var u = e[l], d = u(t, n, r, o, s, i);
					if (d == null) return null;
					d.data && a(d.data, "expectedType") && c.push(d.data.expectedType);
				}
				var f = c.length > 0 ? ", expected one of type [" + c.join(", ") + "]" : "";
				return new h("Invalid " + o + " `" + s + "` supplied to " + ("`" + r + "`" + f + "."));
			}
			return g(r);
		}
		function E() {
			function e(e, t, n, r, i) {
				return A(e[t]) ? null : new h("Invalid " + r + " `" + i + "` supplied to " + ("`" + n + "`, expected a ReactNode."));
			}
			return g(e);
		}
		function D(e, t, n, r, i) {
			return new h((e || "React class") + ": " + t + " type `" + n + "." + r + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + i + "`.");
		}
		function O(e) {
			function t(t, n, r, a, o) {
				var s = t[n], c = M(s);
				if (c !== "object") return new h("Invalid " + a + " `" + o + "` of type `" + c + "` " + ("supplied to `" + r + "`, expected `object`."));
				for (var l in e) {
					var u = e[l];
					if (typeof u != "function") return D(r, a, o, l, N(u));
					var d = u(s, l, r, a, o + "." + l, i);
					if (d) return d;
				}
				return null;
			}
			return g(t);
		}
		function k(e) {
			function t(t, n, o, s, c) {
				var l = t[n], u = M(l);
				if (u !== "object") return new h("Invalid " + s + " `" + c + "` of type `" + u + "` " + ("supplied to `" + o + "`, expected `object`."));
				for (var d in r({}, t[n], e)) {
					var f = e[d];
					if (a(e, d) && typeof f != "function") return D(o, s, c, d, N(f));
					if (!f) return new h("Invalid " + s + " `" + c + "` key `" + d + "` supplied to `" + o + "`.\nBad object: " + JSON.stringify(t[n], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(e), null, "  "));
					var p = f(l, d, o, s, c + "." + d, i);
					if (p) return p;
				}
				return null;
			}
			return g(t);
		}
		function A(t) {
			switch (typeof t) {
				case "number":
				case "string":
				case "undefined": return !0;
				case "boolean": return !t;
				case "object":
					if (Array.isArray(t)) return t.every(A);
					if (t === null || e(t)) return !0;
					var n = d(t);
					if (n) {
						var r = n.call(t), i;
						if (n !== t.entries) {
							for (; !(i = r.next()).done;) if (!A(i.value)) return !1;
						} else for (; !(i = r.next()).done;) {
							var a = i.value;
							if (a && !A(a[1])) return !1;
						}
					} else return !1;
					return !0;
				default: return !1;
			}
		}
		function j(e, t) {
			return e === "symbol" ? !0 : t ? t["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && t instanceof Symbol : !1;
		}
		function M(e) {
			var t = typeof e;
			return Array.isArray(e) ? "array" : e instanceof RegExp ? "object" : j(t, e) ? "symbol" : t;
		}
		function N(e) {
			if (e == null) return "" + e;
			var t = M(e);
			if (t === "object") {
				if (e instanceof Date) return "date";
				if (e instanceof RegExp) return "regexp";
			}
			return t;
		}
		function P(e) {
			var t = N(e);
			switch (t) {
				case "array":
				case "object": return "an " + t;
				case "boolean":
				case "date":
				case "regexp": return "a " + t;
				default: return t;
			}
		}
		function F(e) {
			return !e.constructor || !e.constructor.name ? f : e.constructor.name;
		}
		return p.checkPropTypes = o, p.resetWarningCache = o.resetWarningCache, p.PropTypes = p, p;
	};
})), Ze = /* @__PURE__ */ w(((e, t) => {
	var n = qe();
	function r() {}
	function i() {}
	i.resetWarningCache = r, t.exports = function() {
		function e(e, t, r, i, a, o) {
			if (o !== n) {
				var s = /* @__PURE__ */ Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
				throw s.name = "Invariant Violation", s;
			}
		}
		e.isRequired = e;
		function t() {
			return e;
		}
		var a = {
			array: e,
			bigint: e,
			bool: e,
			func: e,
			number: e,
			object: e,
			string: e,
			symbol: e,
			any: e,
			arrayOf: t,
			element: e,
			elementType: e,
			instanceOf: t,
			node: e,
			objectOf: t,
			oneOf: t,
			oneOfType: t,
			shape: t,
			exact: t,
			checkPropTypes: i,
			resetWarningCache: r
		};
		return a.PropTypes = a, a;
	};
})), Qe = /* @__PURE__ */ w(((e, t) => {
	if (process.env.NODE_ENV !== "production") {
		var n = Ge();
		t.exports = Xe()(n.isElement, !0);
	} else t.exports = Ze()();
})), $e = { disabled: !1 }, X = /* @__PURE__ */ E(Qe()), et = process.env.NODE_ENV === "production" ? null : X.default.oneOfType([X.default.number, X.default.shape({
	enter: X.default.number,
	exit: X.default.number,
	appear: X.default.number
}).isRequired]);
process.env.NODE_ENV === "production" || X.default.oneOfType([
	X.default.string,
	X.default.shape({
		enter: X.default.string,
		exit: X.default.string,
		active: X.default.string
	}),
	X.default.shape({
		enter: X.default.string,
		enterDone: X.default.string,
		enterActive: X.default.string,
		exit: X.default.string,
		exitDone: X.default.string,
		exitActive: X.default.string
	})
]);
//#endregion
//#region node_modules/react-transition-group/esm/TransitionGroupContext.js
var tt = t.createContext(null), nt = function(e) {
	return e.scrollTop;
}, rt = "unmounted", it = "exited", at = "entering", ot = "entered", st = "exiting", Z = /*#__PURE__*/ function(e) {
	ke(n, e);
	function n(t, n) {
		var r = e.call(this, t, n) || this, i = n, a = i && !i.isMounting ? t.enter : t.appear, o;
		return r.appearStatus = null, t.in ? a ? (o = it, r.appearStatus = at) : o = ot : o = t.unmountOnExit || t.mountOnEnter ? rt : it, r.state = { status: o }, r.nextCallback = null, r;
	}
	n.getDerivedStateFromProps = function(e, t) {
		return e.in && t.status === "unmounted" ? { status: it } : null;
	};
	var r = n.prototype;
	return r.componentDidMount = function() {
		this.updateStatus(!0, this.appearStatus);
	}, r.componentDidUpdate = function(e) {
		var t = null;
		if (e !== this.props) {
			var n = this.state.status;
			this.props.in ? n !== "entering" && n !== "entered" && (t = at) : (n === "entering" || n === "entered") && (t = st);
		}
		this.updateStatus(!1, t);
	}, r.componentWillUnmount = function() {
		this.cancelNextCallback();
	}, r.getTimeouts = function() {
		var e = this.props.timeout, t = n = r = e, n, r;
		return e != null && typeof e != "number" && (t = e.exit, n = e.enter, r = e.appear === void 0 ? n : e.appear), {
			exit: t,
			enter: n,
			appear: r
		};
	}, r.updateStatus = function(e, t) {
		if (e === void 0 && (e = !1), t !== null) if (this.cancelNextCallback(), t === "entering") {
			if (this.props.unmountOnExit || this.props.mountOnEnter) {
				var n = this.props.nodeRef ? this.props.nodeRef.current : _.findDOMNode(this);
				n && nt(n);
			}
			this.performEnter(e);
		} else this.performExit();
		else this.props.unmountOnExit && this.state.status === "exited" && this.setState({ status: rt });
	}, r.performEnter = function(e) {
		var t = this, n = this.props.enter, r = this.context ? this.context.isMounting : e, i = this.props.nodeRef ? [r] : [_.findDOMNode(this), r], a = i[0], o = i[1], s = this.getTimeouts(), c = r ? s.appear : s.enter;
		if (!e && !n || $e.disabled) {
			this.safeSetState({ status: ot }, function() {
				t.props.onEntered(a);
			});
			return;
		}
		this.props.onEnter(a, o), this.safeSetState({ status: at }, function() {
			t.props.onEntering(a, o), t.onTransitionEnd(c, function() {
				t.safeSetState({ status: ot }, function() {
					t.props.onEntered(a, o);
				});
			});
		});
	}, r.performExit = function() {
		var e = this, t = this.props.exit, n = this.getTimeouts(), r = this.props.nodeRef ? void 0 : _.findDOMNode(this);
		if (!t || $e.disabled) {
			this.safeSetState({ status: it }, function() {
				e.props.onExited(r);
			});
			return;
		}
		this.props.onExit(r), this.safeSetState({ status: st }, function() {
			e.props.onExiting(r), e.onTransitionEnd(n.exit, function() {
				e.safeSetState({ status: it }, function() {
					e.props.onExited(r);
				});
			});
		});
	}, r.cancelNextCallback = function() {
		this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
	}, r.safeSetState = function(e, t) {
		t = this.setNextCallback(t), this.setState(e, t);
	}, r.setNextCallback = function(e) {
		var t = this, n = !0;
		return this.nextCallback = function(r) {
			n && (n = !1, t.nextCallback = null, e(r));
		}, this.nextCallback.cancel = function() {
			n = !1;
		}, this.nextCallback;
	}, r.onTransitionEnd = function(e, t) {
		this.setNextCallback(t);
		var n = this.props.nodeRef ? this.props.nodeRef.current : _.findDOMNode(this), r = e == null && !this.props.addEndListener;
		if (!n || r) {
			setTimeout(this.nextCallback, 0);
			return;
		}
		if (this.props.addEndListener) {
			var i = this.props.nodeRef ? [this.nextCallback] : [n, this.nextCallback], a = i[0], o = i[1];
			this.props.addEndListener(a, o);
		}
		e != null && setTimeout(this.nextCallback, e);
	}, r.render = function() {
		var e = this.state.status;
		if (e === "unmounted") return null;
		var n = this.props, r = n.children;
		n.in, n.mountOnEnter, n.unmountOnExit, n.appear, n.enter, n.exit, n.timeout, n.addEndListener, n.onEnter, n.onEntering, n.onEntered, n.onExit, n.onExiting, n.onExited, n.nodeRef;
		var i = De(n, [
			"children",
			"in",
			"mountOnEnter",
			"unmountOnExit",
			"appear",
			"enter",
			"exit",
			"timeout",
			"addEndListener",
			"onEnter",
			"onEntering",
			"onEntered",
			"onExit",
			"onExiting",
			"onExited",
			"nodeRef"
		]);
		return /*#__PURE__*/ t.createElement(tt.Provider, { value: null }, typeof r == "function" ? r(e, i) : t.cloneElement(t.Children.only(r), i));
	}, n;
}(t.Component);
Z.contextType = tt, Z.propTypes = process.env.NODE_ENV === "production" ? {} : {
	nodeRef: X.default.shape({ current: typeof Element > "u" ? X.default.any : function(e, t, n, r, i, a) {
		var o = e[t];
		return X.default.instanceOf(o && "ownerDocument" in o ? o.ownerDocument.defaultView.Element : Element)(e, t, n, r, i, a);
	} }),
	children: X.default.oneOfType([X.default.func.isRequired, X.default.element.isRequired]).isRequired,
	in: X.default.bool,
	mountOnEnter: X.default.bool,
	unmountOnExit: X.default.bool,
	appear: X.default.bool,
	enter: X.default.bool,
	exit: X.default.bool,
	timeout: function(e) {
		var t = et;
		e.addEndListener || (t = t.isRequired);
		var n = [...arguments].slice(1);
		return t.apply(void 0, [e].concat(n));
	},
	addEndListener: X.default.func,
	onEnter: X.default.func,
	onEntering: X.default.func,
	onEntered: X.default.func,
	onExit: X.default.func,
	onExiting: X.default.func,
	onExited: X.default.func
};
function ct() {}
Z.defaultProps = {
	in: !1,
	mountOnEnter: !1,
	unmountOnExit: !1,
	appear: !1,
	enter: !0,
	exit: !0,
	onEnter: ct,
	onEntering: ct,
	onEntered: ct,
	onExit: ct,
	onExiting: ct,
	onExited: ct
}, Z.UNMOUNTED = rt, Z.EXITED = it, Z.ENTERING = at, Z.ENTERED = ot, Z.EXITING = st;
//#endregion
//#region node_modules/@restart/ui/esm/utils.js
function lt(e) {
	return e.code === "Escape" || e.keyCode === 27;
}
function ut() {
	let t = e.version.split(".");
	return {
		major: +t[0],
		minor: +t[1],
		patch: +t[2]
	};
}
function dt(e) {
	if (!e || typeof e == "function") return null;
	let { major: t } = ut();
	return t >= 19 ? e.props.ref : e.ref;
}
//#endregion
//#region node_modules/dom-helpers/esm/canUseDOM.js
var ft = !!(typeof window < "u" && window.document && window.document.createElement), pt = !1, mt = !1;
try {
	var ht = {
		get passive() {
			return pt = !0;
		},
		get once() {
			return mt = pt = !0;
		}
	};
	ft && (window.addEventListener("test", ht, ht), window.removeEventListener("test", ht, !0));
} catch {}
function gt(e, t, n, r) {
	if (r && typeof r != "boolean" && !mt) {
		var i = r.once, a = r.capture, o = n;
		!mt && i && (o = n.__once || function e(r) {
			this.removeEventListener(t, e, a), n.call(this, r);
		}, n.__once = o), e.addEventListener(t, o, pt ? r : a);
	}
	e.addEventListener(t, n, r);
}
//#endregion
//#region node_modules/dom-helpers/esm/removeEventListener.js
function _t(e, t, n, r) {
	var i = r && typeof r != "boolean" ? r.capture : r;
	e.removeEventListener(t, n, i), n.__once && e.removeEventListener(t, n.__once, i);
}
//#endregion
//#region node_modules/dom-helpers/esm/listen.js
function vt(e, t, n, r) {
	return gt(e, t, n, r), function() {
		_t(e, t, n, r);
	};
}
//#endregion
//#region node_modules/dom-helpers/esm/triggerEvent.js
function yt(e, t, n, r) {
	if (n === void 0 && (n = !1), r === void 0 && (r = !0), e) {
		var i = document.createEvent("HTMLEvents");
		i.initEvent(t, n, r), e.dispatchEvent(i);
	}
}
//#endregion
//#region node_modules/dom-helpers/esm/transitionEnd.js
function bt(e) {
	var t = Y(e, "transitionDuration") || "", n = t.indexOf("ms") === -1 ? 1e3 : 1;
	return parseFloat(t) * n;
}
function xt(e, t, n) {
	n === void 0 && (n = 5);
	var r = !1, i = setTimeout(function() {
		r || yt(e, "transitionend", !0);
	}, t + n), a = vt(e, "transitionend", function() {
		r = !0;
	}, { once: !0 });
	return function() {
		clearTimeout(i), a();
	};
}
function St(e, t, n, r) {
	n ??= bt(e) || 0;
	var i = xt(e, n, r), a = vt(e, "transitionend", t);
	return function() {
		i(), a();
	};
}
//#endregion
//#region node_modules/react-bootstrap/esm/transitionEndListener.js
function Ct(e, t) {
	let n = Y(e, t) || "", r = n.indexOf("ms") === -1 ? 1e3 : 1;
	return parseFloat(n) * r;
}
function wt(e, t) {
	let n = St(e, (r) => {
		r.target === e && (n(), t(r));
	}, Ct(e, "transitionDuration") + Ct(e, "transitionDelay"));
}
//#endregion
//#region node_modules/react-bootstrap/esm/triggerBrowserReflow.js
function Tt(e) {
	e.offsetHeight;
}
//#endregion
//#region node_modules/@restart/hooks/esm/useMergedRefs.js
var Et = (e) => !e || typeof e == "function" ? e : (t) => {
	e.current = t;
};
function Dt(e, t) {
	let n = Et(e), r = Et(t);
	return (e) => {
		n && n(e), r && r(e);
	};
}
function Ot(e, t) {
	return d(() => Dt(e, t), [e, t]);
}
//#endregion
//#region node_modules/react-bootstrap/esm/safeFindDOMNode.js
function kt(e) {
	return e && "setState" in e ? _.findDOMNode(e) : e ?? null;
}
//#endregion
//#region node_modules/react-bootstrap/esm/TransitionWrapper.js
var At = /*#__PURE__*/ t.forwardRef(({ onEnter: e, onEntering: n, onEntered: r, onExit: i, onExiting: o, onExited: s, addEndListener: c, children: l, childRef: u, ...d }, p) => {
	let m = f(null), g = Ot(m, u), _ = (e) => {
		g(kt(e));
	}, v = (e) => (t) => {
		e && m.current && e(m.current, t);
	}, y = a(v(e), [e]), b = a(v(n), [n]), x = a(v(r), [r]), S = a(v(i), [i]), C = a(v(o), [o]), w = a(v(s), [s]), T = a(v(c), [c]);
	return /*#__PURE__*/ h(Z, {
		ref: p,
		...d,
		onEnter: y,
		onEntered: x,
		onEntering: b,
		onExit: S,
		onExited: w,
		onExiting: C,
		addEndListener: T,
		nodeRef: m,
		children: typeof l == "function" ? (e, t) => l(e, {
			...t,
			ref: _
		}) : /*#__PURE__*/ t.cloneElement(l, { ref: _ })
	});
});
At.displayName = "TransitionWrapper";
//#endregion
//#region node_modules/@restart/hooks/esm/useCommittedRef.js
function jt(e) {
	let t = f(e);
	return s(() => {
		t.current = e;
	}, [e]), t;
}
//#endregion
//#region node_modules/@restart/hooks/esm/useEventCallback.js
function Mt(e) {
	let t = jt(e);
	return a(function(...e) {
		return t.current && t.current(...e);
	}, [t]);
}
//#endregion
//#region node_modules/react-bootstrap/esm/divWithClassName.js
var Q = /* @__PURE__ */ E(Ee()), Nt = ((t) => /*#__PURE__*/ e.forwardRef((e, n) => /*#__PURE__*/ h("div", {
	...e,
	ref: n,
	className: (0, Q.default)(e.className, t)
})));
//#endregion
//#region node_modules/@restart/ui/node_modules/@restart/hooks/esm/useCommittedRef.js
function Pt(e) {
	let t = f(e);
	return s(() => {
		t.current = e;
	}, [e]), t;
}
//#endregion
//#region node_modules/@restart/ui/node_modules/@restart/hooks/esm/useEventCallback.js
function $(e) {
	let t = Pt(e);
	return a(function(...e) {
		return t.current && t.current(...e);
	}, [t]);
}
//#endregion
//#region node_modules/@restart/ui/node_modules/@restart/hooks/esm/useMounted.js
function Ft() {
	let e = f(!0), t = f(() => e.current);
	return s(() => (e.current = !0, () => {
		e.current = !1;
	}), []), t.current;
}
//#endregion
//#region node_modules/@restart/ui/node_modules/@restart/hooks/esm/usePrevious.js
function It(e) {
	let t = f(null);
	return s(() => {
		t.current = e;
	}), t.current;
}
//#endregion
//#region node_modules/@restart/ui/node_modules/@restart/hooks/esm/useIsomorphicEffect.js
var Lt = typeof global < "u" && global.navigator && global.navigator.product === "ReactNative", Rt = typeof document < "u" || Lt ? u : s, zt = ["as", "disabled"];
function Bt(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) >= 0) continue;
		n[r] = e[r];
	}
	return n;
}
function Vt(e) {
	return !e || e.trim() === "#";
}
function Ht({ tagName: e, disabled: t, href: n, target: r, rel: i, role: a, onClick: o, tabIndex: s = 0, type: c }) {
	e ||= n != null || r != null || i != null ? "a" : "button";
	let l = { tagName: e };
	if (e === "button") return [{
		type: c || "button",
		disabled: t
	}, l];
	let u = (r) => {
		if ((t || e === "a" && Vt(n)) && r.preventDefault(), t) {
			r.stopPropagation();
			return;
		}
		o?.(r);
	};
	return e === "a" && (n ||= "#", t && (n = void 0)), [{
		role: a ?? "button",
		disabled: void 0,
		tabIndex: t ? void 0 : s,
		href: n,
		target: e === "a" ? r : void 0,
		"aria-disabled": t || void 0,
		rel: e === "a" ? i : void 0,
		onClick: u,
		onKeyDown: (e) => {
			e.key === " " && (e.preventDefault(), u(e));
		}
	}, l];
}
var Ut = /*#__PURE__*/ e.forwardRef((e, t) => {
	let { as: n, disabled: r } = e, i = Bt(e, zt), [a, { tagName: o }] = Ht(Object.assign({
		tagName: n,
		disabled: r
	}, i));
	return /*#__PURE__*/ h(o, Object.assign({}, i, a, { ref: t }));
});
Ut.displayName = "Button";
//#endregion
//#region node_modules/react-bootstrap/esm/Fade.js
var Wt = {
	[at]: "show",
	[ot]: "show"
}, Gt = /*#__PURE__*/ e.forwardRef(({ className: t, children: n, transitionClasses: r = {}, onEnter: i, ...o }, s) => {
	let c = {
		in: !1,
		timeout: 300,
		mountOnEnter: !1,
		unmountOnExit: !1,
		appear: !1,
		...o
	}, l = a((e, t) => {
		Tt(e), i?.(e, t);
	}, [i]);
	return /*#__PURE__*/ h(At, {
		ref: s,
		addEndListener: wt,
		...c,
		onEnter: l,
		childRef: dt(n),
		children: (i, a) => /*#__PURE__*/ e.cloneElement(n, {
			...a,
			className: (0, Q.default)("fade", t, n.props.className, Wt[i], r[i])
		})
	});
});
Gt.displayName = "Fade";
//#endregion
//#region node_modules/react-bootstrap/esm/CloseButton.js
var Kt = {
	"aria-label": X.default.string,
	onClick: X.default.func,
	variant: X.default.oneOf(["white"])
}, qt = /*#__PURE__*/ e.forwardRef(({ className: e, variant: t, "aria-label": n = "Close", ...r }, i) => /*#__PURE__*/ h("button", {
	ref: i,
	type: "button",
	className: (0, Q.default)("btn-close", t && `btn-close-${t}`, e),
	"aria-label": n,
	...r
}));
qt.displayName = "CloseButton", qt.propTypes = Kt;
//#endregion
//#region node_modules/react-bootstrap/esm/Button.js
var Jt = /*#__PURE__*/ e.forwardRef(({ as: e, bsPrefix: t, variant: n = "primary", size: r, active: i = !1, disabled: a = !1, className: o, ...s }, c) => {
	let l = J(t, "btn"), [u, { tagName: d }] = Ht({
		tagName: e,
		disabled: a,
		...s
	});
	return /*#__PURE__*/ h(d, {
		...u,
		...s,
		ref: c,
		disabled: a,
		className: (0, Q.default)(o, l, i && "active", n && `${l}-${n}`, r && `${l}-${r}`, s.href && a && "disabled")
	});
});
Jt.displayName = "Button";
//#endregion
//#region node_modules/@restart/hooks/esm/useUpdatedRef.js
function Yt(e) {
	let t = f(e);
	return t.current = e, t;
}
//#endregion
//#region node_modules/@restart/hooks/esm/useWillUnmount.js
function Xt(e) {
	let t = Yt(e);
	s(() => () => t.current(), []);
}
//#endregion
//#region node_modules/dom-helpers/esm/querySelectorAll.js
var Zt = Function.prototype.bind.call(Function.prototype.call, [].slice);
function Qt(e, t) {
	return Zt(e.querySelectorAll(t));
}
//#endregion
//#region node_modules/dom-helpers/esm/contains.js
function $t(e, t) {
	if (e.contains) return e.contains(t);
	if (e.compareDocumentPosition) return e === t || !!(e.compareDocumentPosition(t) & 16);
}
//#endregion
//#region node_modules/@restart/ui/esm/DataKey.js
var en = "data-rr-ui-";
function tn(e) {
	return `${en}${e}`;
}
//#endregion
//#region node_modules/@restart/ui/esm/useWindow.js
var nn = /*#__PURE__*/ r(ft ? window : void 0);
nn.Provider;
function rn() {
	return o(nn);
}
//#endregion
//#region node_modules/@restart/ui/node_modules/@restart/hooks/esm/useMergedRefs.js
var an = (e) => !e || typeof e == "function" ? e : (t) => {
	e.current = t;
};
function on(e, t) {
	let n = an(e), r = an(t);
	return (e) => {
		n && n(e), r && r(e);
	};
}
function sn(e, t) {
	return d(() => on(e, t), [e, t]);
}
//#endregion
//#region node_modules/dom-helpers/esm/scrollbarSize.js
var cn;
function ln(e) {
	if ((!cn && cn !== 0 || e) && ft) {
		var t = document.createElement("div");
		t.style.position = "absolute", t.style.top = "-9999px", t.style.width = "50px", t.style.height = "50px", t.style.overflow = "scroll", document.body.appendChild(t), cn = t.offsetWidth - t.clientWidth, document.body.removeChild(t);
	}
	return cn;
}
//#endregion
//#region node_modules/@restart/hooks/esm/useCallbackRef.js
function un() {
	return p(null);
}
//#endregion
//#region node_modules/dom-helpers/esm/activeElement.js
function dn(e) {
	e === void 0 && (e = Pe());
	try {
		var t = e.activeElement;
		return !t || !t.nodeName ? null : t;
	} catch {
		return e.body;
	}
}
//#endregion
//#region node_modules/@restart/ui/node_modules/@restart/hooks/esm/useUpdatedRef.js
function fn(e) {
	let t = f(e);
	return t.current = e, t;
}
//#endregion
//#region node_modules/@restart/ui/node_modules/@restart/hooks/esm/useWillUnmount.js
function pn(e) {
	let t = fn(e);
	s(() => () => t.current(), []);
}
//#endregion
//#region node_modules/@restart/ui/esm/getScrollbarWidth.js
function mn(e = document) {
	let t = e.defaultView;
	return Math.abs(t.innerWidth - e.documentElement.clientWidth);
}
//#endregion
//#region node_modules/@restart/ui/esm/ModalManager.js
var hn = tn("modal-open"), gn = class {
	constructor({ ownerDocument: e, handleContainerOverflow: t = !0, isRTL: n = !1 } = {}) {
		this.handleContainerOverflow = t, this.isRTL = n, this.modals = [], this.ownerDocument = e;
	}
	getScrollbarWidth() {
		return mn(this.ownerDocument);
	}
	getElement() {
		return (this.ownerDocument || document).body;
	}
	setModalAttributes(e) {}
	removeModalAttributes(e) {}
	setContainerStyle(e) {
		let t = { overflow: "hidden" }, n = this.isRTL ? "paddingLeft" : "paddingRight", r = this.getElement();
		e.style = {
			overflow: r.style.overflow,
			[n]: r.style[n]
		}, e.scrollBarWidth && (t[n] = `${parseInt(Y(r, n) || "0", 10) + e.scrollBarWidth}px`), r.setAttribute(hn, ""), Y(r, t);
	}
	reset() {
		[...this.modals].forEach((e) => this.remove(e));
	}
	removeContainerStyle(e) {
		let t = this.getElement();
		t.removeAttribute(hn), Object.assign(t.style, e.style);
	}
	add(e) {
		let t = this.modals.indexOf(e);
		return t !== -1 || (t = this.modals.length, this.modals.push(e), this.setModalAttributes(e), t !== 0) ? t : (this.state = {
			scrollBarWidth: this.getScrollbarWidth(),
			style: {}
		}, this.handleContainerOverflow && this.setContainerStyle(this.state), t);
	}
	remove(e) {
		let t = this.modals.indexOf(e);
		t !== -1 && (this.modals.splice(t, 1), !this.modals.length && this.handleContainerOverflow && this.removeContainerStyle(this.state), this.removeModalAttributes(e));
	}
	isTopModal(e) {
		return !!this.modals.length && this.modals[this.modals.length - 1] === e;
	}
}, _n = (e, t) => ft ? e == null ? (t || Pe()).body : (typeof e == "function" && (e = e()), e && "current" in e && (e = e.current), e && ("nodeType" in e || e.getBoundingClientRect) ? e : null) : null;
function vn(e, t) {
	let n = rn(), [r, i] = p(() => _n(e, n?.document));
	if (!r) {
		let t = _n(e);
		t && i(t);
	}
	return s(() => {
		t && r && t(r);
	}, [t, r]), s(() => {
		let t = _n(e);
		t !== r && i(t);
	}, [e, r]), r;
}
//#endregion
//#region node_modules/@restart/ui/esm/NoopTransition.js
function yn({ children: e, in: t, onExited: r, mountOnEnter: i, unmountOnExit: a }) {
	let o = f(null), c = f(t), l = $(r);
	s(() => {
		t ? c.current = !0 : l(o.current);
	}, [t, l]);
	let u = /*#__PURE__*/ n(e, { ref: sn(o, dt(e)) });
	return t ? u : a || !c.current && i ? null : u;
}
//#endregion
//#region node_modules/@restart/ui/esm/useRTGTransitionProps.js
var bn = [
	"onEnter",
	"onEntering",
	"onEntered",
	"onExit",
	"onExiting",
	"onExited",
	"addEndListener",
	"children"
];
function xn(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) >= 0) continue;
		n[r] = e[r];
	}
	return n;
}
function Sn(e) {
	let { onEnter: t, onEntering: r, onEntered: i, onExit: o, onExiting: s, onExited: c, addEndListener: l, children: u } = e, d = xn(e, bn), p = f(null), m = sn(p, dt(u)), h = (e) => (t) => {
		e && p.current && e(p.current, t);
	}, g = a(h(t), [t]), _ = a(h(r), [r]), v = a(h(i), [i]), y = a(h(o), [o]), b = a(h(s), [s]), x = a(h(c), [c]), S = a(h(l), [l]);
	return Object.assign({}, d, { nodeRef: p }, t && { onEnter: g }, r && { onEntering: _ }, i && { onEntered: v }, o && { onExit: y }, s && { onExiting: b }, c && { onExited: x }, l && { addEndListener: S }, { children: typeof u == "function" ? (e, t) => u(e, Object.assign({}, t, { ref: m })) : /*#__PURE__*/ n(u, { ref: m }) });
}
//#endregion
//#region node_modules/@restart/ui/esm/RTGTransition.js
var Cn = ["component"];
function wn(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) >= 0) continue;
		n[r] = e[r];
	}
	return n;
}
var Tn = /*#__PURE__*/ e.forwardRef((e, t) => {
	let { component: n } = e, r = Sn(wn(e, Cn));
	return /*#__PURE__*/ h(n, Object.assign({ ref: t }, r));
});
//#endregion
//#region node_modules/@restart/ui/esm/ImperativeTransition.js
function En({ in: e, onTransition: t }) {
	let n = f(null), r = f(!0), i = $(t);
	return Rt(() => {
		if (!n.current) return;
		let t = !1;
		return i({
			in: e,
			element: n.current,
			initial: r.current,
			isStale: () => t
		}), () => {
			t = !0;
		};
	}, [e, i]), Rt(() => (r.current = !1, () => {
		r.current = !0;
	}), []), n;
}
function Dn({ children: e, in: t, onExited: r, onEntered: i, transition: a }) {
	let [o, s] = p(!t);
	t && o && s(!1);
	let c = sn(En({
		in: !!t,
		onTransition: (e) => {
			Promise.resolve(a(e)).then(() => {
				e.isStale() || (e.in ? i?.(e.element, e.initial) : (s(!0), r?.(e.element)));
			}, (t) => {
				throw e.in || s(!0), t;
			});
		}
	}), dt(e));
	return o && !t ? null : /*#__PURE__*/ n(e, { ref: c });
}
function On(e, t, n) {
	return e ? /*#__PURE__*/ h(Tn, Object.assign({}, n, { component: e })) : t ? /*#__PURE__*/ h(Dn, Object.assign({}, n, { transition: t })) : /*#__PURE__*/ h(yn, Object.assign({}, n));
}
//#endregion
//#region node_modules/@restart/ui/esm/Modal.js
var kn = /* @__PURE__ */ "show.role.className.style.children.backdrop.keyboard.onBackdropClick.onEscapeKeyDown.transition.runTransition.backdropTransition.runBackdropTransition.autoFocus.enforceFocus.restoreFocus.restoreFocusOptions.renderDialog.renderBackdrop.manager.container.onShow.onHide.onExit.onExited.onExiting.onEnter.onEntering.onEntered".split(".");
function An(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) >= 0) continue;
		n[r] = e[r];
	}
	return n;
}
var jn;
function Mn(e) {
	return jn ||= new gn({ ownerDocument: e?.document }), jn;
}
function Nn(e) {
	let t = rn(), n = e || Mn(t), r = f({
		dialog: null,
		backdrop: null
	});
	return Object.assign(r.current, {
		add: () => n.add(r.current),
		remove: () => n.remove(r.current),
		isTopModal: () => n.isTopModal(r.current),
		setDialogRef: a((e) => {
			r.current.dialog = e;
		}, []),
		setBackdropRef: a((e) => {
			r.current.backdrop = e;
		}, [])
	});
}
var Pn = /*#__PURE__*/ i((t, n) => {
	let { show: r = !1, role: i = "dialog", className: a, style: o, children: c, backdrop: u = !0, keyboard: d = !0, onBackdropClick: v, onEscapeKeyDown: y, transition: b, runTransition: x, backdropTransition: S, runBackdropTransition: C, autoFocus: w = !0, enforceFocus: T = !0, restoreFocus: E = !0, restoreFocusOptions: D, renderDialog: O, renderBackdrop: k = (e) => /*#__PURE__*/ h("div", Object.assign({}, e)), manager: A, container: j, onShow: M, onHide: N = () => {}, onExit: P, onExited: F, onExiting: I, onEnter: ee, onEntering: te, onEntered: ne } = t, re = An(t, kn), L = rn(), R = vn(j), z = Nn(A), B = Ft(), V = It(r), [H, U] = p(!r), W = f(null);
	l(n, () => z, [z]), ft && !V && r && (W.current = dn(L?.document)), r && H && U(!1);
	let G = $(() => {
		if (z.add(), se.current = vt(document, "keydown", ae), oe.current = vt(document, "focus", () => setTimeout(q), !0), M && M(), w) {
			let e = dn(z.dialog?.ownerDocument ?? L?.document);
			z.dialog && e && !$t(z.dialog, e) && (W.current = e, z.dialog.focus());
		}
	}), K = $(() => {
		if (z.remove(), se.current == null || se.current(), oe.current == null || oe.current(), E) {
			var e;
			(e = W.current) == null || e.focus == null || e.focus(D), W.current = null;
		}
	});
	s(() => {
		!r || !R || G();
	}, [
		r,
		R,
		G
	]), s(() => {
		H && K();
	}, [H, K]), pn(() => {
		K();
	});
	let q = $(() => {
		if (!T || !B() || !z.isTopModal()) return;
		let e = dn(L?.document);
		z.dialog && e && !$t(z.dialog, e) && z.dialog.focus();
	}), ie = $((e) => {
		e.target === e.currentTarget && (v?.(e), u === !0 && N());
	}), ae = $((e) => {
		d && lt(e) && z.isTopModal() && (y?.(e), e.defaultPrevented || N());
	}), oe = f(), se = f(), ce = (...e) => {
		U(!0), F?.(...e);
	};
	if (!R) return null;
	let le = Object.assign({
		role: i,
		ref: z.setDialogRef,
		"aria-modal": i === "dialog" || void 0
	}, re, {
		style: o,
		className: a,
		tabIndex: -1
	}), ue = O ? O(le) : /*#__PURE__*/ h("div", Object.assign({}, le, { children: /*#__PURE__*/ e.cloneElement(c, { role: "document" }) }));
	ue = On(b, x, {
		unmountOnExit: !0,
		mountOnEnter: !0,
		appear: !0,
		in: !!r,
		onExit: P,
		onExiting: I,
		onExited: ce,
		onEnter: ee,
		onEntering: te,
		onEntered: ne,
		children: ue
	});
	let de = null;
	return u && (de = k({
		ref: z.setBackdropRef,
		onClick: ie
	}), de = On(S, C, {
		in: !!r,
		appear: !0,
		mountOnEnter: !0,
		unmountOnExit: !0,
		children: de
	})), /*#__PURE__*/ h(m, { children: /*#__PURE__*/ _.createPortal(/*#__PURE__*/ g(m, { children: [de, ue] }), R) });
});
Pn.displayName = "Modal";
var Fn = Object.assign(Pn, { Manager: gn });
//#endregion
//#region node_modules/dom-helpers/esm/hasClass.js
function In(e, t) {
	return e.classList ? !!t && e.classList.contains(t) : (" " + (e.className.baseVal || e.className) + " ").indexOf(" " + t + " ") !== -1;
}
//#endregion
//#region node_modules/dom-helpers/esm/addClass.js
function Ln(e, t) {
	e.classList ? e.classList.add(t) : In(e, t) || (typeof e.className == "string" ? e.className = e.className + " " + t : e.setAttribute("class", (e.className && e.className.baseVal || "") + " " + t));
}
//#endregion
//#region node_modules/dom-helpers/esm/removeClass.js
function Rn(e, t) {
	return e.replace(RegExp("(^|\\s)" + t + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "");
}
function zn(e, t) {
	e.classList ? e.classList.remove(t) : typeof e.className == "string" ? e.className = Rn(e.className, t) : e.setAttribute("class", Rn(e.className && e.className.baseVal || "", t));
}
//#endregion
//#region node_modules/react-bootstrap/esm/BootstrapModalManager.js
var Bn = {
	FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
	STICKY_CONTENT: ".sticky-top",
	NAVBAR_TOGGLER: ".navbar-toggler"
}, Vn = class extends gn {
	adjustAndStore(e, t, n) {
		let r = t.style[e];
		t.dataset[e] = r, Y(t, { [e]: `${parseFloat(Y(t, e)) + n}px` });
	}
	restore(e, t) {
		let n = t.dataset[e];
		n !== void 0 && (delete t.dataset[e], Y(t, { [e]: n }));
	}
	setContainerStyle(e) {
		super.setContainerStyle(e);
		let t = this.getElement();
		if (Ln(t, "modal-open"), !e.scrollBarWidth) return;
		let n = this.isRTL ? "paddingLeft" : "paddingRight", r = this.isRTL ? "marginLeft" : "marginRight";
		Qt(t, Bn.FIXED_CONTENT).forEach((t) => this.adjustAndStore(n, t, e.scrollBarWidth)), Qt(t, Bn.STICKY_CONTENT).forEach((t) => this.adjustAndStore(r, t, -e.scrollBarWidth)), Qt(t, Bn.NAVBAR_TOGGLER).forEach((t) => this.adjustAndStore(r, t, e.scrollBarWidth));
	}
	removeContainerStyle(e) {
		super.removeContainerStyle(e);
		let t = this.getElement();
		zn(t, "modal-open");
		let n = this.isRTL ? "paddingLeft" : "paddingRight", r = this.isRTL ? "marginLeft" : "marginRight";
		Qt(t, Bn.FIXED_CONTENT).forEach((e) => this.restore(n, e)), Qt(t, Bn.STICKY_CONTENT).forEach((e) => this.restore(r, e)), Qt(t, Bn.NAVBAR_TOGGLER).forEach((e) => this.restore(r, e));
	}
}, Hn;
function Un(e) {
	return Hn ||= new Vn(e), Hn;
}
//#endregion
//#region node_modules/react-bootstrap/esm/ModalBody.js
var Wn = /*#__PURE__*/ e.forwardRef(({ className: e, bsPrefix: t, as: n = "div", ...r }, i) => (t = J(t, "modal-body"), /*#__PURE__*/ h(n, {
	ref: i,
	className: (0, Q.default)(e, t),
	...r
})));
Wn.displayName = "ModalBody";
//#endregion
//#region node_modules/react-bootstrap/esm/ModalContext.js
var Gn = /*#__PURE__*/ e.createContext({ onHide() {} }), Kn = /*#__PURE__*/ e.forwardRef(({ bsPrefix: e, className: t, contentClassName: n, centered: r, size: i, fullscreen: a, children: o, scrollable: s, ...c }, l) => {
	e = J(e, "modal");
	let u = `${e}-dialog`, d = typeof a == "string" ? `${e}-fullscreen-${a}` : `${e}-fullscreen`;
	return /*#__PURE__*/ h("div", {
		...c,
		ref: l,
		className: (0, Q.default)(u, t, i && `${e}-${i}`, r && `${u}-centered`, s && `${u}-scrollable`, a && d),
		children: /*#__PURE__*/ h("div", {
			className: (0, Q.default)(`${e}-content`, n),
			children: o
		})
	});
});
Kn.displayName = "ModalDialog";
//#endregion
//#region node_modules/react-bootstrap/esm/ModalFooter.js
var qn = /*#__PURE__*/ e.forwardRef(({ className: e, bsPrefix: t, as: n = "div", ...r }, i) => (t = J(t, "modal-footer"), /*#__PURE__*/ h(n, {
	ref: i,
	className: (0, Q.default)(e, t),
	...r
})));
qn.displayName = "ModalFooter";
//#endregion
//#region node_modules/react-bootstrap/esm/AbstractModalHeader.js
var Jn = /*#__PURE__*/ e.forwardRef(({ closeLabel: e = "Close", closeVariant: t, closeButton: n = !1, onHide: r, children: i, ...a }, s) => {
	let c = o(Gn), l = Mt(() => {
		c?.onHide(), r?.();
	});
	return /*#__PURE__*/ g("div", {
		ref: s,
		...a,
		children: [i, n && /*#__PURE__*/ h(qt, {
			"aria-label": e,
			variant: t,
			onClick: l
		})]
	});
});
Jn.displayName = "AbstractModalHeader";
//#endregion
//#region node_modules/react-bootstrap/esm/ModalHeader.js
var Yn = /*#__PURE__*/ e.forwardRef(({ bsPrefix: e, className: t, closeLabel: n = "Close", closeButton: r = !1, ...i }, a) => (e = J(e, "modal-header"), /*#__PURE__*/ h(Jn, {
	ref: a,
	...i,
	className: (0, Q.default)(t, e),
	closeLabel: n,
	closeButton: r
})));
Yn.displayName = "ModalHeader";
//#endregion
//#region node_modules/react-bootstrap/esm/ModalTitle.js
var Xn = Nt("h4"), Zn = /*#__PURE__*/ e.forwardRef(({ className: e, bsPrefix: t, as: n = Xn, ...r }, i) => (t = J(t, "modal-title"), /*#__PURE__*/ h(n, {
	ref: i,
	className: (0, Q.default)(e, t),
	...r
})));
Zn.displayName = "ModalTitle";
//#endregion
//#region node_modules/react-bootstrap/esm/Modal.js
function Qn(e) {
	return /*#__PURE__*/ h(Gt, {
		...e,
		timeout: null
	});
}
function $n(e) {
	return /*#__PURE__*/ h(Gt, {
		...e,
		timeout: null
	});
}
var er = /*#__PURE__*/ e.forwardRef(({ bsPrefix: e, className: t, style: n, dialogClassName: r, contentClassName: i, children: o, dialogAs: s = Kn, "data-bs-theme": c, "aria-labelledby": l, "aria-describedby": u, "aria-label": m, show: g = !1, animation: _ = !0, backdrop: v = !0, keyboard: y = !0, onEscapeKeyDown: b, onShow: x, onHide: S, container: C, autoFocus: w = !0, enforceFocus: T = !0, restoreFocus: E = !0, restoreFocusOptions: D, onEntered: O, onExit: k, onExiting: A, onEnter: j, onEntering: M, onExited: N, backdropClassName: P, manager: F, ...I }, ee) => {
	let [te, ne] = p({}), [re, L] = p(!1), R = f(!1), z = f(!1), B = f(null), [V, H] = un(), U = Ot(ee, H), W = Mt(S), G = Ne();
	e = J(e, "modal");
	let K = d(() => ({ onHide: W }), [W]);
	function q() {
		return F || Un({ isRTL: G });
	}
	function ie(e) {
		if (!ft) return;
		let t = q().getScrollbarWidth() > 0, n = e.scrollHeight > Pe(e).documentElement.clientHeight;
		ne({
			paddingRight: t && !n ? ln() : void 0,
			paddingLeft: !t && n ? ln() : void 0
		});
	}
	let ae = Mt(() => {
		V && ie(V.dialog);
	});
	Xt(() => {
		_t(window, "resize", ae), B.current == null || B.current();
	});
	let oe = () => {
		R.current = !0;
	}, se = (e) => {
		R.current && V && e.target === V.dialog && (z.current = !0), R.current = !1;
	}, ce = () => {
		L(!0), B.current = St(V.dialog, () => {
			L(!1);
		});
	}, le = (e) => {
		e.target === e.currentTarget && ce();
	}, ue = (e) => {
		if (v === "static") {
			le(e);
			return;
		}
		if (z.current || e.target !== e.currentTarget) {
			z.current = !1;
			return;
		}
		S?.();
	}, de = (e) => {
		y ? b?.(e) : (e.preventDefault(), v === "static" && ce());
	}, fe = (e, t) => {
		e && ie(e), j?.(e, t);
	}, pe = (e) => {
		B.current == null || B.current(), k?.(e);
	}, me = (e, t) => {
		M?.(e, t), gt(window, "resize", ae);
	}, he = (e) => {
		e && (e.style.display = ""), N?.(e), _t(window, "resize", ae);
	}, ge = a((t) => /*#__PURE__*/ h("div", {
		...t,
		className: (0, Q.default)(`${e}-backdrop`, P, !_ && "show")
	}), [
		_,
		P,
		e
	]), _e = {
		...n,
		...te
	};
	return _e.display = "block", /*#__PURE__*/ h(Gn.Provider, {
		value: K,
		children: /*#__PURE__*/ h(Fn, {
			show: g,
			ref: U,
			backdrop: v,
			container: C,
			keyboard: !0,
			autoFocus: w,
			enforceFocus: T,
			restoreFocus: E,
			restoreFocusOptions: D,
			onEscapeKeyDown: de,
			onShow: x,
			onHide: S,
			onEnter: fe,
			onEntering: me,
			onEntered: O,
			onExit: pe,
			onExiting: A,
			onExited: he,
			manager: q(),
			transition: _ ? Qn : void 0,
			backdropTransition: _ ? $n : void 0,
			renderBackdrop: ge,
			renderDialog: (n) => /*#__PURE__*/ h("div", {
				role: "dialog",
				...n,
				style: _e,
				className: (0, Q.default)(t, e, re && `${e}-static`, !_ && "show"),
				onClick: v ? ue : void 0,
				onMouseUp: se,
				"data-bs-theme": c,
				"aria-label": m,
				"aria-labelledby": l,
				"aria-describedby": u,
				children: /*#__PURE__*/ h(s, {
					...I,
					onMouseDown: oe,
					className: r,
					contentClassName: i,
					children: o
				})
			})
		})
	});
});
er.displayName = "Modal";
var tr = Object.assign(er, {
	Body: Wn,
	Header: Yn,
	Title: Zn,
	Footer: qn,
	Dialog: Kn,
	TRANSITION_DURATION: 300,
	BACKDROP_TRANSITION_DURATION: 150
});
//#endregion
//#region src/components/modals/LionModal.tsx
function nr({ modalId: e, title: t, body: n, buttons: r, backdrop: i = "static", fullscreen: a = "sm-down", size: o = K.LG, variant: s = G.LIGHT, platform: c = void 0, cancelButtonIcon: l = null, cancelButtonText: u = "Cancel" }) {
	let { state: d, updateState: f } = W(), p = c || d.platform, m = p === V.IOS, _ = p === V.ANDROID, v = m ? "ios-modal" : _ ? "android-modal" : "web-modal", y = (e) => {
		switch (e) {
			case G.LIGHT:
			case G.LINK:
			case G.WARNING:
			case G.INFO: return "text-dark";
			case G.PRIMARY:
			case G.SECONDARY:
			case G.SUCCESS:
			case G.DANGER:
			case G.DARK:
			case G.LION_GLAM:
			case G.LION_TECH:
			case G.LION_PACKAGES:
			case G.LION_PARKING:
			default: return "text-white";
		}
	}, b = (e) => {
		switch (e) {
			case G.LIGHT:
			case G.LINK:
			case G.DARK:
			case G.MODAL: return "text-dark";
			case G.WARNING: return "text-warning";
			case G.PRIMARY: return "text-primary";
			case G.INFO: return "text-info";
			case G.SECONDARY: return "text-secondary";
			case G.DANGER: return "text-danger";
			case G.SUCCESS: return "text-success";
			case G.LION_PARKING:
			case G.LION_PACKAGES: return "text-lion-packages";
			case G.LION_TECH: return "text-lion-tech";
			case G.LION_GLAM: return "text-lion-glam";
			default: return "text-white";
		}
	}, x = y(s), S = b(s);
	return /* @__PURE__ */ g(tr, {
		backdrop: i,
		id: e,
		show: e === d.modal,
		fullscreen: a,
		onHide: () => f({ modal: null }),
		size: o,
		scrollable: !0,
		centered: !0,
		className: v,
		children: [
			/* @__PURE__ */ h(tr.Header, {
				closeButton: !d.reload || !d.loading,
				className: `custom-modal-header py-3 px-4 bg-${s} ${x}`,
				children: /* @__PURE__ */ h(tr.Title, {
					className: `custom-modal-title w-100 ${x} ${m ? "text-center fw-semibold" : "text-start fw-bold"}`,
					children: t
				})
			}),
			/* @__PURE__ */ h(tr.Body, {
				className: "custom-modal-body px-4 py-3",
				children: e === d.modal ? n : null
			}),
			/* @__PURE__ */ h(tr.Footer, {
				className: "custom-modal-footer p-0",
				children: /* @__PURE__ */ g("div", {
					className: "custom-btn-group w-100 d-flex align-items-stretch",
					children: [/* @__PURE__ */ h(() => /* @__PURE__ */ h(Jt, {
						type: q.BUTTON,
						variant: G.MODAL,
						id: "modal-cancel-button",
						className: `btn-modal btn-modal-cancel ${S}`,
						onClick: () => f({ modal: null }),
						disabled: d.reload || d.loading,
						children: l ?? u
					}), {}), r]
				})
			})
		]
	});
}
//#endregion
export { oe as AndroidButton, _e as AndroidInput, le as BootstrapButton, be as BootstrapInput, q as ButtonTypes, fe as IOSButton, Ce as IOSInput, me as InputTypes, pe as LionButton, we as LionInput, nr as LionModal, U as LionUIComponentsProvider, Te as LoadingBar, V as PlatformTypes, K as SizeTypes, G as VariantTypes };
