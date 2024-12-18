function magneticButton(t) {
    let e = $.extend({ target: $("[data-magnetic]"), class: "magnetizing", attraction: 0.45, distance: 100, onEnter: function (t) {}, onExit: function (t) {}, onUpdate: function (t) {} }, t),
        n = !1,
        i = function (t, e, n) {
            let i;
            return Math.floor(Math.sqrt(Math.pow(e - (t.offset().left + t.outerWidth() / 2), 2) + Math.pow(n - (t.offset().top + t.outerHeight() / 2), 2)));
        },
        r = function (t, r) {
            let s = r.pageX,
                o = r.pageY;
            t.each(function () {
                let t = $(this),
                    r = t.offset().left + t.outerWidth() / 2,
                    a = t.offset().top + t.outerHeight() / 2,
                    l = -1 * Math.floor(r - s) * e.attraction,
                    c = -1 * Math.floor(a - o) * e.attraction,
                    u = i(t, s, o),
                    h = { target: t, y: c, x: l, distance: u };
                u < e.distance ? (gsap.to(t, { y: c, x: l }), n || ((n = !0), t.addClass(e.class), e.onEnter(h)), e.onUpdate(h)) : (gsap.to(t, { y: 0, x: 0 }), n && ((n = !1), t.removeClass(e.class), e.onExit(h)));
            });
        };
    e.target.length &&
        $(window).on("mousemove", function (t) {
            r(e.target, t);
        });
}
function toggleHiddenNavbar() {
    $(".header-navbar-button_toggle_hidden_navbar").hasClass("open")
        ? ($(".header-navbar ul").animate({ width: "0%" }), $(".header-navbar-button_toggle_hidden_navbar").removeClass("open"))
        : ($(".header-navbar ul").animate({ width: "100%" }), $(".header-navbar-button_toggle_hidden_navbar").addClass("open"));
}
function updateTheme() {
    var t = "dark" === $("html").attr("data-theme") ? "light" : "dark";
    $("html").attr("data-theme", t), Cookies.set("theme", t, { expires: 7 });
}
!(function (t, e) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports
        ? (module.exports = t.document
              ? e(t, !0)
              : function (t) {
                    if (!t.document) throw Error("jQuery requires a window with a document");
                    return e(t);
                })
        : e(t);
})("undefined" != typeof window ? window : this, function (t, e) {
    "use strict";
    var n = [],
        i = Object.getPrototypeOf,
        r = n.slice,
        s = n.flat
            ? function (t) {
                  return n.flat.call(t);
              }
            : function (t) {
                  return n.concat.apply([], t);
              },
        o = n.push,
        a = n.indexOf,
        l = {},
        c = l.toString,
        u = l.hasOwnProperty,
        h = u.toString,
        f = h.call(Object),
        d = {},
        p = function (t) {
            return "function" == typeof t && "number" != typeof t.nodeType && "function" != typeof t.item;
        },
        m = function (t) {
            return null != t && t === t.window;
        },
        g = t.document,
        v = { type: !0, src: !0, nonce: !0, noModule: !0 };
    function y(t, e, n) {
        var i,
            r,
            s = (n = n || g).createElement("script");
        if (((s.text = t), e)) for (i in v) (r = e[i] || (e.getAttribute && e.getAttribute(i))) && s.setAttribute(i, r);
        n.head.appendChild(s).parentNode.removeChild(s);
    }
    function _(t) {
        return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? l[c.call(t)] || "object" : typeof t;
    }
    var b = "3.7.1",
        x = /HTML$/i,
        w = function (t, e) {
            return new w.fn.init(t, e);
        };
    function T(t) {
        var e = !!t && "length" in t && t.length,
            n = _(t);
        return !p(t) && !m(t) && ("array" === n || 0 === e || ("number" == typeof e && 0 < e && e - 1 in t));
    }
    function k(t, e) {
        return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
    }
    (w.fn = w.prototype = {
        jquery: b,
        constructor: w,
        length: 0,
        toArray: function () {
            return r.call(this);
        },
        get: function (t) {
            return null == t ? r.call(this) : t < 0 ? this[t + this.length] : this[t];
        },
        pushStack: function (t) {
            var e = w.merge(this.constructor(), t);
            return (e.prevObject = this), e;
        },
        each: function (t) {
            return w.each(this, t);
        },
        map: function (t) {
            return this.pushStack(
                w.map(this, function (e, n) {
                    return t.call(e, n, e);
                })
            );
        },
        slice: function () {
            return this.pushStack(r.apply(this, arguments));
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        even: function () {
            return this.pushStack(
                w.grep(this, function (t, e) {
                    return (e + 1) % 2;
                })
            );
        },
        odd: function () {
            return this.pushStack(
                w.grep(this, function (t, e) {
                    return e % 2;
                })
            );
        },
        eq: function (t) {
            var e = this.length,
                n = +t + (t < 0 ? e : 0);
            return this.pushStack(0 <= n && n < e ? [this[n]] : []);
        },
        end: function () {
            return this.prevObject || this.constructor();
        },
        push: o,
        sort: n.sort,
        splice: n.splice,
    }),
        (w.extend = w.fn.extend = function () {
            var t,
                e,
                n,
                i,
                r,
                s,
                o = arguments[0] || {},
                a = 1,
                l = arguments.length,
                c = !1;
            for ("boolean" == typeof o && ((c = o), (o = arguments[a] || {}), a++), "object" == typeof o || p(o) || (o = {}), a === l && ((o = this), a--); a < l; a++)
                if (null != (t = arguments[a]))
                    for (e in t)
                        (i = t[e]),
                            "__proto__" !== e &&
                                o !== i &&
                                (c && i && (w.isPlainObject(i) || (r = Array.isArray(i)))
                                    ? ((n = o[e]), (s = r && !Array.isArray(n) ? [] : r || w.isPlainObject(n) ? n : {}), (r = !1), (o[e] = w.extend(c, s, i)))
                                    : void 0 !== i && (o[e] = i));
            return o;
        }),
        w.extend({
            expando: "jQuery" + (b + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function (t) {
                throw Error(t);
            },
            noop: function () {},
            isPlainObject: function (t) {
                var e, n;
                return !(!t || "[object Object]" !== c.call(t)) && (!(e = i(t)) || ("function" == typeof (n = u.call(e, "constructor") && e.constructor) && h.call(n) === f));
            },
            isEmptyObject: function (t) {
                var e;
                for (e in t) return !1;
                return !0;
            },
            globalEval: function (t, e, n) {
                y(t, { nonce: e && e.nonce }, n);
            },
            each: function (t, e) {
                var n,
                    i = 0;
                if (T(t)) for (n = t.length; i < n && !1 !== e.call(t[i], i, t[i]); i++);
                else for (i in t) if (!1 === e.call(t[i], i, t[i])) break;
                return t;
            },
            text: function (t) {
                var e,
                    n = "",
                    i = 0,
                    r = t.nodeType;
                if (!r) for (; (e = t[i++]); ) n += w.text(e);
                return 1 === r || 11 === r ? t.textContent : 9 === r ? t.documentElement.textContent : 3 === r || 4 === r ? t.nodeValue : n;
            },
            makeArray: function (t, e) {
                var n = e || [];
                return null != t && (T(Object(t)) ? w.merge(n, "string" == typeof t ? [t] : t) : o.call(n, t)), n;
            },
            inArray: function (t, e, n) {
                return null == e ? -1 : a.call(e, t, n);
            },
            isXMLDoc: function (t) {
                var e = t && t.namespaceURI,
                    n = t && (t.ownerDocument || t).documentElement;
                return !x.test(e || (n && n.nodeName) || "HTML");
            },
            merge: function (t, e) {
                for (var n = +e.length, i = 0, r = t.length; i < n; i++) t[r++] = e[i];
                return (t.length = r), t;
            },
            grep: function (t, e, n) {
                for (var i = [], r = 0, s = t.length, o = !n; r < s; r++) !e(t[r], r) !== o && i.push(t[r]);
                return i;
            },
            map: function (t, e, n) {
                var i,
                    r,
                    o = 0,
                    a = [];
                if (T(t)) for (i = t.length; o < i; o++) null != (r = e(t[o], o, n)) && a.push(r);
                else for (o in t) null != (r = e(t[o], o, n)) && a.push(r);
                return s(a);
            },
            guid: 1,
            support: d,
        }),
        "function" == typeof Symbol && (w.fn[Symbol.iterator] = n[Symbol.iterator]),
        w.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (t, e) {
            l["[object " + e + "]"] = e.toLowerCase();
        });
    var S = n.pop,
        C = n.sort,
        E = n.splice,
        A = "[\\x20\\t\\r\\n\\f]",
        D = RegExp("^" + A + "+|((?:^|[^\\\\])(?:\\\\.)*)" + A + "+$", "g");
    w.contains = function (t, e) {
        var n = e && e.parentNode;
        return t === n || !(!n || 1 !== n.nodeType || !(t.contains ? t.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)));
    };
    var O = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
    function L(t, e) {
        return e ? ("\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " ") : "\\" + t;
    }
    w.escapeSelector = function (t) {
        return (t + "").replace(O, L);
    };
    var P = g,
        j = o;
    !(function () {
        var e,
            i,
            s,
            o,
            l,
            c,
            h,
            f,
            p,
            m,
            g = j,
            v = w.expando,
            y = 0,
            _ = 0,
            b = tn(),
            x = tn(),
            T = tn(),
            O = tn(),
            L = function (t, e) {
                return t === e && (l = !0), 0;
            },
            R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            H = "(?:\\\\[\\da-fA-F]{1,6}" + A + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
            B = "\\[" + A + "*(" + H + ")(?:" + A + "*([*^$|!~]?=)" + A + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + H + "))|)" + A + "*\\]",
            M = ":(" + H + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + B + ")*)|.*)\\)|)",
            q = RegExp(A + "+", "g"),
            N = RegExp("^" + A + "*," + A + "*"),
            z = RegExp("^" + A + "*([>+~]|" + A + ")" + A + "*"),
            W = RegExp(A + "|>"),
            I = RegExp(M),
            Y = RegExp("^" + H + "$"),
            X = {
                ID: RegExp("^#(" + H + ")"),
                CLASS: RegExp("^\\.(" + H + ")"),
                TAG: RegExp("^(" + H + "|[*])"),
                ATTR: RegExp("^" + B),
                PSEUDO: RegExp("^" + M),
                CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + A + "*(even|odd|(([+-]|)(\\d*)n|)" + A + "*(?:([+-]|)" + A + "*(\\d+)|))" + A + "*\\)|)", "i"),
                bool: RegExp("^(?:" + R + ")$", "i"),
                needsContext: RegExp("^" + A + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + A + "*((?:-\\d)?\\d*)" + A + "*\\)|)(?=[^-]|$)", "i"),
            },
            F = /^(?:input|select|textarea|button)$/i,
            V = /^h\d$/i,
            U = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            K = /[+~]/,
            G = RegExp("\\\\[\\da-fA-F]{1,6}" + A + "?|\\\\([^\\r\\n\\f])", "g"),
            Q = function (t, e) {
                var n = "0x" + t.slice(1) - 65536;
                return e || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode((n >> 10) | 55296, (1023 & n) | 56320));
            },
            Z = function () {
                tu();
            },
            J = tp(
                function (t) {
                    return !0 === t.disabled && k(t, "fieldset");
                },
                { dir: "parentNode", next: "legend" }
            );
        try {
            g.apply((n = r.call(P.childNodes)), P.childNodes), n[P.childNodes.length].nodeType;
        } catch (tt) {
            g = {
                apply: function (t, e) {
                    j.apply(t, r.call(e));
                },
                call: function (t) {
                    j.apply(t, r.call(arguments, 1));
                },
            };
        }
        function te(t, e, n, i) {
            var r,
                s,
                o,
                a,
                l,
                u,
                h,
                m = e && e.ownerDocument,
                y = e ? e.nodeType : 9;
            if (((n = n || []), "string" != typeof t || !t || (1 !== y && 9 !== y && 11 !== y))) return n;
            if (!i && (tu(e), (e = e || c), f)) {
                if (11 !== y && (l = U.exec(t))) {
                    if ((r = l[1])) {
                        if (9 === y) {
                            if (!(o = e.getElementById(r))) return n;
                            if (o.id === r) return g.call(n, o), n;
                        } else if (m && (o = m.getElementById(r)) && te.contains(e, o) && o.id === r) return g.call(n, o), n;
                    } else {
                        if (l[2]) return g.apply(n, e.getElementsByTagName(t)), n;
                        if ((r = l[3]) && e.getElementsByClassName) return g.apply(n, e.getElementsByClassName(r)), n;
                    }
                }
                if (!(O[t + " "] || (p && p.test(t)))) {
                    if (((h = t), (m = e), 1 === y && (W.test(t) || z.test(t)))) {
                        for (((m = (K.test(t) && tc(e.parentNode)) || e) == e && d.scope) || ((a = e.getAttribute("id")) ? (a = w.escapeSelector(a)) : e.setAttribute("id", (a = v))), s = (u = tf(t)).length; s--; )
                            u[s] = (a ? "#" + a : ":scope") + " " + td(u[s]);
                        h = u.join(",");
                    }
                    try {
                        return g.apply(n, m.querySelectorAll(h)), n;
                    } catch (_) {
                        O(t, !0);
                    } finally {
                        a === v && e.removeAttribute("id");
                    }
                }
            }
            return t_(t.replace(D, "$1"), e, n, i);
        }
        function tn() {
            var t = [];
            return function e(n, r) {
                return t.push(n + " ") > i.cacheLength && delete e[t.shift()], (e[n + " "] = r);
            };
        }
        function ti(t) {
            return (t[v] = !0), t;
        }
        function tr(t) {
            var e = c.createElement("fieldset");
            try {
                return !!t(e);
            } catch (n) {
                return !1;
            } finally {
                e.parentNode && e.parentNode.removeChild(e), (e = null);
            }
        }
        function ts(t) {
            return function (e) {
                return k(e, "input") && e.type === t;
            };
        }
        function to(t) {
            return function (e) {
                return (k(e, "input") || k(e, "button")) && e.type === t;
            };
        }
        function ta(t) {
            return function (e) {
                return "form" in e
                    ? e.parentNode && !1 === e.disabled
                        ? "label" in e
                            ? "label" in e.parentNode
                                ? e.parentNode.disabled === t
                                : e.disabled === t
                            : e.isDisabled === t || (!t !== e.isDisabled && J(e) === t)
                        : e.disabled === t
                    : "label" in e && e.disabled === t;
            };
        }
        function tl(t) {
            return ti(function (e) {
                return (
                    (e = +e),
                    ti(function (n, i) {
                        for (var r, s = t([], n.length, e), o = s.length; o--; ) n[(r = s[o])] && (n[r] = !(i[r] = n[r]));
                    })
                );
            });
        }
        function tc(t) {
            return t && void 0 !== t.getElementsByTagName && t;
        }
        function tu(t) {
            var e,
                n = t ? t.ownerDocument || t : P;
            return (
                n != c &&
                    9 === n.nodeType &&
                    n.documentElement &&
                    ((h = (c = n).documentElement),
                    (f = !w.isXMLDoc(c)),
                    (m = h.matches || h.webkitMatchesSelector || h.msMatchesSelector),
                    h.msMatchesSelector && P != c && (e = c.defaultView) && e.top !== e && e.addEventListener("unload", Z),
                    (d.getById = tr(function (t) {
                        return (h.appendChild(t).id = w.expando), !c.getElementsByName || !c.getElementsByName(w.expando).length;
                    })),
                    (d.disconnectedMatch = tr(function (t) {
                        return m.call(t, "*");
                    })),
                    (d.scope = tr(function () {
                        return c.querySelectorAll(":scope");
                    })),
                    (d.cssHas = tr(function () {
                        try {
                            return c.querySelector(":has(*,:jqfake)"), !1;
                        } catch (t) {
                            return !0;
                        }
                    })),
                    d.getById
                        ? ((i.filter.ID = function (t) {
                              var e = t.replace(G, Q);
                              return function (t) {
                                  return t.getAttribute("id") === e;
                              };
                          }),
                          (i.find.ID = function (t, e) {
                              if (void 0 !== e.getElementById && f) {
                                  var n = e.getElementById(t);
                                  return n ? [n] : [];
                              }
                          }))
                        : ((i.filter.ID = function (t) {
                              var e = t.replace(G, Q);
                              return function (t) {
                                  var n = void 0 !== t.getAttributeNode && t.getAttributeNode("id");
                                  return n && n.value === e;
                              };
                          }),
                          (i.find.ID = function (t, e) {
                              if (void 0 !== e.getElementById && f) {
                                  var n,
                                      i,
                                      r,
                                      s = e.getElementById(t);
                                  if (s) {
                                      if ((n = s.getAttributeNode("id")) && n.value === t) return [s];
                                      for (r = e.getElementsByName(t), i = 0; (s = r[i++]); ) if ((n = s.getAttributeNode("id")) && n.value === t) return [s];
                                  }
                                  return [];
                              }
                          })),
                    (i.find.TAG = function (t, e) {
                        return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : e.querySelectorAll(t);
                    }),
                    (i.find.CLASS = function (t, e) {
                        if (void 0 !== e.getElementsByClassName && f) return e.getElementsByClassName(t);
                    }),
                    (p = []),
                    tr(function (t) {
                        var e;
                        (h.appendChild(t).innerHTML = "<a id='" + v + "' href='' disabled='disabled'></a><select id='" + v + "-\r\\' disabled='disabled'><option selected=''></option></select>"),
                            t.querySelectorAll("[selected]").length || p.push("\\[" + A + "*(?:value|" + R + ")"),
                            t.querySelectorAll("[id~=" + v + "-]").length || p.push("~="),
                            t.querySelectorAll("a#" + v + "+*").length || p.push(".#.+[+~]"),
                            t.querySelectorAll(":checked").length || p.push(":checked"),
                            (e = c.createElement("input")).setAttribute("type", "hidden"),
                            t.appendChild(e).setAttribute("name", "D"),
                            (h.appendChild(t).disabled = !0),
                            2 !== t.querySelectorAll(":disabled").length && p.push(":enabled", ":disabled"),
                            (e = c.createElement("input")).setAttribute("name", ""),
                            t.appendChild(e),
                            t.querySelectorAll("[name='']").length || p.push("\\[" + A + "*name" + A + "*=" + A + "*(?:''|\"\")");
                    }),
                    d.cssHas || p.push(":has"),
                    (p = p.length && RegExp(p.join("|"))),
                    (L = function (t, e) {
                        if (t === e) return (l = !0), 0;
                        var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                        return (
                            n ||
                            (1 & (n = (t.ownerDocument || t) == (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || (!d.sortDetached && e.compareDocumentPosition(t) === n)
                                ? t === c || (t.ownerDocument == P && te.contains(P, t))
                                    ? -1
                                    : e === c || (e.ownerDocument == P && te.contains(P, e))
                                    ? 1
                                    : o
                                    ? a.call(o, t) - a.call(o, e)
                                    : 0
                                : 4 & n
                                ? -1
                                : 1)
                        );
                    })),
                c
            );
        }
        for (e in ((te.matches = function (t, e) {
            return te(t, null, null, e);
        }),
        (te.matchesSelector = function (t, e) {
            if ((tu(t), f && !O[e + " "] && (!p || !p.test(e))))
                try {
                    var n = m.call(t, e);
                    if (n || d.disconnectedMatch || (t.document && 11 !== t.document.nodeType)) return n;
                } catch (i) {
                    O(e, !0);
                }
            return 0 < te(e, c, null, [t]).length;
        }),
        (te.contains = function (t, e) {
            return (t.ownerDocument || t) != c && tu(t), w.contains(t, e);
        }),
        (te.attr = function (t, e) {
            (t.ownerDocument || t) != c && tu(t);
            var n = i.attrHandle[e.toLowerCase()],
                r = n && u.call(i.attrHandle, e.toLowerCase()) ? n(t, e, !f) : void 0;
            return void 0 !== r ? r : t.getAttribute(e);
        }),
        (te.error = function (t) {
            throw Error("Syntax error, unrecognized expression: " + t);
        }),
        (w.uniqueSort = function (t) {
            var e,
                n = [],
                i = 0,
                s = 0;
            if (((l = !d.sortStable), (o = !d.sortStable && r.call(t, 0)), C.call(t, L), l)) {
                for (; (e = t[s++]); ) e === t[s] && (i = n.push(s));
                for (; i--; ) E.call(t, n[i], 1);
            }
            return (o = null), t;
        }),
        (w.fn.uniqueSort = function () {
            return this.pushStack(w.uniqueSort(r.apply(this)));
        }),
        ((i = w.expr = {
            cacheLength: 50,
            createPseudo: ti,
            match: X,
            attrHandle: {},
            find: {},
            relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
            preFilter: {
                ATTR: function (t) {
                    return (t[1] = t[1].replace(G, Q)), (t[3] = (t[3] || t[4] || t[5] || "").replace(G, Q)), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4);
                },
                CHILD: function (t) {
                    return (
                        (t[1] = t[1].toLowerCase()),
                        "nth" === t[1].slice(0, 3) ? (t[3] || te.error(t[0]), (t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3]))), (t[5] = +(t[7] + t[8] || "odd" === t[3]))) : t[3] && te.error(t[0]),
                        t
                    );
                },
                PSEUDO: function (t) {
                    var e,
                        n = !t[6] && t[2];
                    return X.CHILD.test(t[0])
                        ? null
                        : (t[3] ? (t[2] = t[4] || t[5] || "") : n && I.test(n) && (e = tf(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && ((t[0] = t[0].slice(0, e)), (t[2] = n.slice(0, e))), t.slice(0, 3));
                },
            },
            filter: {
                TAG: function (t) {
                    var e = t.replace(G, Q).toLowerCase();
                    return "*" === t
                        ? function () {
                              return !0;
                          }
                        : function (t) {
                              return k(t, e);
                          };
                },
                CLASS: function (t) {
                    var e = b[t + " "];
                    return (
                        e ||
                        ((e = RegExp("(^|" + A + ")" + t + "(" + A + "|$)")),
                        b(t, function (t) {
                            return e.test(("string" == typeof t.className && t.className) || (void 0 !== t.getAttribute && t.getAttribute("class")) || "");
                        }))
                    );
                },
                ATTR: function (t, e, n) {
                    return function (i) {
                        var r = te.attr(i, t);
                        return null == r
                            ? "!=" === e
                            : !e ||
                                  ((r += ""),
                                  "=" === e
                                      ? r === n
                                      : "!=" === e
                                      ? r !== n
                                      : "^=" === e
                                      ? n && 0 === r.indexOf(n)
                                      : "*=" === e
                                      ? n && -1 < r.indexOf(n)
                                      : "$=" === e
                                      ? n && r.slice(-n.length) === n
                                      : "~=" === e
                                      ? -1 < (" " + r.replace(q, " ") + " ").indexOf(n)
                                      : "|=" === e && (r === n || r.slice(0, n.length + 1) === n + "-"));
                    };
                },
                CHILD: function (t, e, n, i, r) {
                    var s = "nth" !== t.slice(0, 3),
                        o = "last" !== t.slice(-4),
                        a = "of-type" === e;
                    return 1 === i && 0 === r
                        ? function (t) {
                              return !!t.parentNode;
                          }
                        : function (e, n, l) {
                              var c,
                                  u,
                                  h,
                                  f,
                                  d,
                                  p = s !== o ? "nextSibling" : "previousSibling",
                                  m = e.parentNode,
                                  g = a && e.nodeName.toLowerCase(),
                                  _ = !l && !a,
                                  b = !1;
                              if (m) {
                                  if (s) {
                                      for (; p; ) {
                                          for (h = e; (h = h[p]); ) if (a ? k(h, g) : 1 === h.nodeType) return !1;
                                          d = p = "only" === t && !d && "nextSibling";
                                      }
                                      return !0;
                                  }
                                  if (((d = [o ? m.firstChild : m.lastChild]), o && _)) {
                                      for (b = (f = (c = (u = m[v] || (m[v] = {}))[t] || [])[0] === y && c[1]) && c[2], h = f && m.childNodes[f]; (h = (++f && h && h[p]) || (b = f = 0) || d.pop()); )
                                          if (1 === h.nodeType && ++b && h === e) {
                                              u[t] = [y, f, b];
                                              break;
                                          }
                                  } else if ((_ && (b = f = (c = (u = e[v] || (e[v] = {}))[t] || [])[0] === y && c[1]), !1 === b))
                                      for (; (h = (++f && h && h[p]) || (b = f = 0) || d.pop()) && (!((a ? k(h, g) : 1 === h.nodeType) && ++b) || (_ && ((u = h[v] || (h[v] = {}))[t] = [y, b]), h !== e)); );
                                  return (b -= r) === i || (b % i == 0 && 0 <= b / i);
                              }
                          };
                },
                PSEUDO: function (t, e) {
                    var n,
                        r = i.pseudos[t] || i.setFilters[t.toLowerCase()] || te.error("unsupported pseudo: " + t);
                    return r[v]
                        ? r(e)
                        : 1 < r.length
                        ? ((n = [t, t, "", e]),
                          i.setFilters.hasOwnProperty(t.toLowerCase())
                              ? ti(function (t, n) {
                                    for (var i, s = r(t, e), o = s.length; o--; ) t[(i = a.call(t, s[o]))] = !(n[i] = s[o]);
                                })
                              : function (t) {
                                    return r(t, 0, n);
                                })
                        : r;
                },
            },
            pseudos: {
                not: ti(function (t) {
                    var e = [],
                        n = [],
                        i = ty(t.replace(D, "$1"));
                    return i[v]
                        ? ti(function (t, e, n, r) {
                              for (var s, o = i(t, null, r, []), a = t.length; a--; ) (s = o[a]) && (t[a] = !(e[a] = s));
                          })
                        : function (t, r, s) {
                              return (e[0] = t), i(e, null, s, n), (e[0] = null), !n.pop();
                          };
                }),
                has: ti(function (t) {
                    return function (e) {
                        return 0 < te(t, e).length;
                    };
                }),
                contains: ti(function (t) {
                    return (
                        (t = t.replace(G, Q)),
                        function (e) {
                            return -1 < (e.textContent || w.text(e)).indexOf(t);
                        }
                    );
                }),
                lang: ti(function (t) {
                    return (
                        Y.test(t || "") || te.error("unsupported lang: " + t),
                        (t = t.replace(G, Q).toLowerCase()),
                        function (e) {
                            var n;
                            do if ((n = f ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))) return (n = n.toLowerCase()) === t || 0 === n.indexOf(t + "-");
                            while ((e = e.parentNode) && 1 === e.nodeType);
                            return !1;
                        }
                    );
                }),
                target: function (e) {
                    var n = t.location && t.location.hash;
                    return n && n.slice(1) === e.id;
                },
                root: function (t) {
                    return t === h;
                },
                focus: function (t) {
                    return (
                        t ===
                            (function () {
                                try {
                                    return c.activeElement;
                                } catch (t) {}
                            })() &&
                        c.hasFocus() &&
                        !!(t.type || t.href || ~t.tabIndex)
                    );
                },
                enabled: ta(!1),
                disabled: ta(!0),
                checked: function (t) {
                    return (k(t, "input") && !!t.checked) || (k(t, "option") && !!t.selected);
                },
                selected: function (t) {
                    return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected;
                },
                empty: function (t) {
                    for (t = t.firstChild; t; t = t.nextSibling) if (t.nodeType < 6) return !1;
                    return !0;
                },
                parent: function (t) {
                    return !i.pseudos.empty(t);
                },
                header: function (t) {
                    return V.test(t.nodeName);
                },
                input: function (t) {
                    return F.test(t.nodeName);
                },
                button: function (t) {
                    return (k(t, "input") && "button" === t.type) || k(t, "button");
                },
                text: function (t) {
                    var e;
                    return k(t, "input") && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase());
                },
                first: tl(function () {
                    return [0];
                }),
                last: tl(function (t, e) {
                    return [e - 1];
                }),
                eq: tl(function (t, e, n) {
                    return [n < 0 ? n + e : n];
                }),
                even: tl(function (t, e) {
                    for (var n = 0; n < e; n += 2) t.push(n);
                    return t;
                }),
                odd: tl(function (t, e) {
                    for (var n = 1; n < e; n += 2) t.push(n);
                    return t;
                }),
                lt: tl(function (t, e, n) {
                    var i;
                    for (i = n < 0 ? n + e : e < n ? e : n; 0 <= --i; ) t.push(i);
                    return t;
                }),
                gt: tl(function (t, e, n) {
                    for (var i = n < 0 ? n + e : n; ++i < e; ) t.push(i);
                    return t;
                }),
            },
        }).pseudos.nth = i.pseudos.eq),
        { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
            i.pseudos[e] = ts(e);
        for (e in { submit: !0, reset: !0 }) i.pseudos[e] = to(e);
        function th() {}
        function tf(t, e) {
            var n,
                r,
                s,
                o,
                a,
                l,
                c,
                u = x[t + " "];
            if (u) return e ? 0 : u.slice(0);
            for (a = t, l = [], c = i.preFilter; a; ) {
                for (o in ((!n || (r = N.exec(a))) && (r && (a = a.slice(r[0].length) || a), l.push((s = []))),
                (n = !1),
                (r = z.exec(a)) && ((n = r.shift()), s.push({ value: n, type: r[0].replace(D, " ") }), (a = a.slice(n.length))),
                i.filter))
                    (r = X[o].exec(a)) && (!c[o] || (r = c[o](r))) && ((n = r.shift()), s.push({ value: n, type: o, matches: r }), (a = a.slice(n.length)));
                if (!n) break;
            }
            return e ? a.length : a ? te.error(t) : x(t, l).slice(0);
        }
        function td(t) {
            for (var e = 0, n = t.length, i = ""; e < n; e++) i += t[e].value;
            return i;
        }
        function tp(t, e, n) {
            var i = e.dir,
                r = e.next,
                s = r || i,
                o = n && "parentNode" === s,
                a = _++;
            return e.first
                ? function (e, n, r) {
                      for (; (e = e[i]); ) if (1 === e.nodeType || o) return t(e, n, r);
                      return !1;
                  }
                : function (e, n, l) {
                      var c,
                          u,
                          h = [y, a];
                      if (l) {
                          for (; (e = e[i]); ) if ((1 === e.nodeType || o) && t(e, n, l)) return !0;
                      } else
                          for (; (e = e[i]); )
                              if (1 === e.nodeType || o) {
                                  if (((u = e[v] || (e[v] = {})), r && k(e, r))) e = e[i] || e;
                                  else {
                                      if ((c = u[s]) && c[0] === y && c[1] === a) return (h[2] = c[2]);
                                      if (((u[s] = h)[2] = t(e, n, l))) return !0;
                                  }
                              }
                      return !1;
                  };
        }
        function t$(t) {
            return 1 < t.length
                ? function (e, n, i) {
                      for (var r = t.length; r--; ) if (!t[r](e, n, i)) return !1;
                      return !0;
                  }
                : t[0];
        }
        function tm(t, e, n, i, r) {
            for (var s, o = [], a = 0, l = t.length, c = null != e; a < l; a++) (s = t[a]) && ((n && !n(s, i, r)) || (o.push(s), c && e.push(a)));
            return o;
        }
        function tg(t, e, n, i, r, s) {
            return (
                i && !i[v] && (i = tg(i)),
                r && !r[v] && (r = tg(r, s)),
                ti(function (s, o, l, c) {
                    var u,
                        h,
                        f,
                        d,
                        p = [],
                        m = [],
                        v = o.length,
                        y =
                            s ||
                            (function (t, e, n) {
                                for (var i = 0, r = e.length; i < r; i++) te(t, e[i], n);
                                return n;
                            })(e || "*", l.nodeType ? [l] : l, []),
                        _ = t && (s || !e) ? tm(y, p, t, l, c) : y;
                    if ((n ? n(_, (d = r || (s ? t : v || i) ? [] : o), l, c) : (d = _), i)) for (u = tm(d, m), i(u, [], l, c), h = u.length; h--; ) (f = u[h]) && (d[m[h]] = !(_[m[h]] = f));
                    if (s) {
                        if (r || t) {
                            if (r) {
                                for (u = [], h = d.length; h--; ) (f = d[h]) && u.push((_[h] = f));
                                r(null, (d = []), u, c);
                            }
                            for (h = d.length; h--; ) (f = d[h]) && -1 < (u = r ? a.call(s, f) : p[h]) && (s[u] = !(o[u] = f));
                        }
                    } else (d = tm(d === o ? d.splice(v, d.length) : d)), r ? r(null, o, d, c) : g.apply(o, d);
                })
            );
        }
        function tv(t) {
            for (
                var e,
                    n,
                    r,
                    o = t.length,
                    l = i.relative[t[0].type],
                    c = l || i.relative[" "],
                    u = l ? 1 : 0,
                    h = tp(
                        function (t) {
                            return t === e;
                        },
                        c,
                        !0
                    ),
                    f = tp(
                        function (t) {
                            return -1 < a.call(e, t);
                        },
                        c,
                        !0
                    ),
                    d = [
                        function (t, n, i) {
                            var r = (!l && (i || n != s)) || ((e = n).nodeType ? h(t, n, i) : f(t, n, i));
                            return (e = null), r;
                        },
                    ];
                u < o;
                u++
            )
                if ((n = i.relative[t[u].type])) d = [tp(t$(d), n)];
                else {
                    if ((n = i.filter[t[u].type].apply(null, t[u].matches))[v]) {
                        for (r = ++u; r < o && !i.relative[t[r].type]; r++);
                        return tg(1 < u && t$(d), 1 < u && td(t.slice(0, u - 1).concat({ value: " " === t[u - 2].type ? "*" : "" })).replace(D, "$1"), n, u < r && tv(t.slice(u, r)), r < o && tv((t = t.slice(r))), r < o && td(t));
                    }
                    d.push(n);
                }
            return t$(d);
        }
        function ty(t, e) {
            var n,
                r,
                o,
                a,
                l,
                u,
                h = [],
                d = [],
                p = T[t + " "];
            if (!p) {
                for (e || (e = tf(t)), n = e.length; n--; ) (p = tv(e[n]))[v] ? h.push(p) : d.push(p);
                (p = T(
                    t,
                    ((r = d),
                    (a = 0 < (o = h).length),
                    (l = 0 < r.length),
                    (u = function (t, e, n, u, h) {
                        var d,
                            p,
                            m,
                            v = 0,
                            _ = "0",
                            b = t && [],
                            x = [],
                            T = s,
                            k = t || (l && i.find.TAG("*", h)),
                            C = (y += null == T ? 1 : Math.random() || 0.1),
                            E = k.length;
                        for (h && (s = e == c || e || h); _ !== E && null != (d = k[_]); _++) {
                            if (l && d) {
                                for (p = 0, e || d.ownerDocument == c || (tu(d), (n = !f)); (m = r[p++]); )
                                    if (m(d, e || c, n)) {
                                        g.call(u, d);
                                        break;
                                    }
                                h && (y = C);
                            }
                            a && ((d = !m && d) && v--, t && b.push(d));
                        }
                        if (((v += _), a && _ !== v)) {
                            for (p = 0; (m = o[p++]); ) m(b, x, e, n);
                            if (t) {
                                if (0 < v) for (; _--; ) b[_] || x[_] || (x[_] = S.call(u));
                                x = tm(x);
                            }
                            g.apply(u, x), h && !t && 0 < x.length && 1 < v + o.length && w.uniqueSort(u);
                        }
                        return h && ((y = C), (s = T)), b;
                    }),
                    a ? ti(u) : u)
                )).selector = t;
            }
            return p;
        }
        function t_(t, e, n, r) {
            var s,
                o,
                a,
                l,
                c,
                u = "function" == typeof t && t,
                h = !r && tf((t = u.selector || t));
            if (((n = n || []), 1 === h.length)) {
                if (2 < (o = h[0] = h[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === e.nodeType && f && i.relative[o[1].type]) {
                    if (!(e = (i.find.ID(a.matches[0].replace(G, Q), e) || [])[0])) return n;
                    u && (e = e.parentNode), (t = t.slice(o.shift().value.length));
                }
                for (s = X.needsContext.test(t) ? 0 : o.length; s-- && ((a = o[s]), !i.relative[(l = a.type)]); )
                    if ((c = i.find[l]) && (r = c(a.matches[0].replace(G, Q), (K.test(o[0].type) && tc(e.parentNode)) || e))) {
                        if ((o.splice(s, 1), !(t = r.length && td(o)))) return g.apply(n, r), n;
                        break;
                    }
            }
            return (u || ty(t, h))(r, e, !f, n, !e || (K.test(t) && tc(e.parentNode)) || e), n;
        }
        (th.prototype = i.filters = i.pseudos),
            (i.setFilters = new th()),
            (d.sortStable = v.split("").sort(L).join("") === v),
            tu(),
            (d.sortDetached = tr(function (t) {
                return 1 & t.compareDocumentPosition(c.createElement("fieldset"));
            })),
            (w.find = te),
            (w.expr[":"] = w.expr.pseudos),
            (w.unique = w.uniqueSort),
            (te.compile = ty),
            (te.select = t_),
            (te.setDocument = tu),
            (te.tokenize = tf),
            (te.escape = w.escapeSelector),
            (te.getText = w.text),
            (te.isXML = w.isXMLDoc),
            (te.selectors = w.expr),
            (te.support = w.support),
            (te.uniqueSort = w.uniqueSort);
    })();
    var R = function (t, e, n) {
            for (var i = [], r = void 0 !== n; (t = t[e]) && 9 !== t.nodeType; )
                if (1 === t.nodeType) {
                    if (r && w(t).is(n)) break;
                    i.push(t);
                }
            return i;
        },
        H = function (t, e) {
            for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
            return n;
        },
        B = w.expr.match.needsContext,
        M = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function q(t, e, n) {
        return p(e)
            ? w.grep(t, function (t, i) {
                  return !!e.call(t, i, t) !== n;
              })
            : e.nodeType
            ? w.grep(t, function (t) {
                  return (t === e) !== n;
              })
            : "string" != typeof e
            ? w.grep(t, function (t) {
                  return -1 < a.call(e, t) !== n;
              })
            : w.filter(e, t, n);
    }
    (w.filter = function (t, e, n) {
        var i = e[0];
        return (
            n && (t = ":not(" + t + ")"),
            1 === e.length && 1 === i.nodeType
                ? w.find.matchesSelector(i, t)
                    ? [i]
                    : []
                : w.find.matches(
                      t,
                      w.grep(e, function (t) {
                          return 1 === t.nodeType;
                      })
                  )
        );
    }),
        w.fn.extend({
            find: function (t) {
                var e,
                    n,
                    i = this.length,
                    r = this;
                if ("string" != typeof t)
                    return this.pushStack(
                        w(t).filter(function () {
                            for (e = 0; e < i; e++) if (w.contains(r[e], this)) return !0;
                        })
                    );
                for (n = this.pushStack([]), e = 0; e < i; e++) w.find(t, r[e], n);
                return 1 < i ? w.uniqueSort(n) : n;
            },
            filter: function (t) {
                return this.pushStack(q(this, t || [], !1));
            },
            not: function (t) {
                return this.pushStack(q(this, t || [], !0));
            },
            is: function (t) {
                return !!q(this, "string" == typeof t && B.test(t) ? w(t) : t || [], !1).length;
            },
        });
    var N,
        z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    ((w.fn.init = function (t, e, n) {
        var i, r;
        if (!t) return this;
        if (((n = n || N), "string" == typeof t)) {
            if (!(i = "<" === t[0] && ">" === t[t.length - 1] && 3 <= t.length ? [null, t, null] : z.exec(t)) || (!i[1] && e)) return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);
            if (i[1]) {
                if (((e = e instanceof w ? e[0] : e), w.merge(this, w.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : g, !0)), M.test(i[1]) && w.isPlainObject(e))) for (i in e) p(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                return this;
            }
            return (r = g.getElementById(i[2])) && ((this[0] = r), (this.length = 1)), this;
        }
        return t.nodeType ? ((this[0] = t), (this.length = 1), this) : p(t) ? (void 0 !== n.ready ? n.ready(t) : t(w)) : w.makeArray(t, this);
    }).prototype = w.fn),
        (N = w(g));
    var W = /^(?:parents|prev(?:Until|All))/,
        I = { children: !0, contents: !0, next: !0, prev: !0 };
    function Y(t, e) {
        for (; (t = t[e]) && 1 !== t.nodeType; );
        return t;
    }
    w.fn.extend({
        has: function (t) {
            var e = w(t, this),
                n = e.length;
            return this.filter(function () {
                for (var t = 0; t < n; t++) if (w.contains(this, e[t])) return !0;
            });
        },
        closest: function (t, e) {
            var n,
                i = 0,
                r = this.length,
                s = [],
                o = "string" != typeof t && w(t);
            if (!B.test(t)) {
                for (; i < r; i++)
                    for (n = this[i]; n && n !== e; n = n.parentNode)
                        if (n.nodeType < 11 && (o ? -1 < o.index(n) : 1 === n.nodeType && w.find.matchesSelector(n, t))) {
                            s.push(n);
                            break;
                        }
            }
            return this.pushStack(1 < s.length ? w.uniqueSort(s) : s);
        },
        index: function (t) {
            return t ? ("string" == typeof t ? a.call(w(t), this[0]) : a.call(this, t.jquery ? t[0] : t)) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function (t, e) {
            return this.pushStack(w.uniqueSort(w.merge(this.get(), w(t, e))));
        },
        addBack: function (t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t));
        },
    }),
        w.each(
            {
                parent: function (t) {
                    var e = t.parentNode;
                    return e && 11 !== e.nodeType ? e : null;
                },
                parents: function (t) {
                    return R(t, "parentNode");
                },
                parentsUntil: function (t, e, n) {
                    return R(t, "parentNode", n);
                },
                next: function (t) {
                    return Y(t, "nextSibling");
                },
                prev: function (t) {
                    return Y(t, "previousSibling");
                },
                nextAll: function (t) {
                    return R(t, "nextSibling");
                },
                prevAll: function (t) {
                    return R(t, "previousSibling");
                },
                nextUntil: function (t, e, n) {
                    return R(t, "nextSibling", n);
                },
                prevUntil: function (t, e, n) {
                    return R(t, "previousSibling", n);
                },
                siblings: function (t) {
                    return H((t.parentNode || {}).firstChild, t);
                },
                children: function (t) {
                    return H(t.firstChild);
                },
                contents: function (t) {
                    return null != t.contentDocument && i(t.contentDocument) ? t.contentDocument : (k(t, "template") && (t = t.content || t), w.merge([], t.childNodes));
                },
            },
            function (t, e) {
                w.fn[t] = function (n, i) {
                    var r = w.map(this, e, n);
                    return "Until" !== t.slice(-5) && (i = n), i && "string" == typeof i && (r = w.filter(i, r)), 1 < this.length && (I[t] || w.uniqueSort(r), W.test(t) && r.reverse()), this.pushStack(r);
                };
            }
        );
    var X = /[^\x20\t\r\n\f]+/g;
    function F(t) {
        return t;
    }
    function V(t) {
        throw t;
    }
    function U(t, e, n, i) {
        var r;
        try {
            t && p((r = t.promise)) ? r.call(t).done(e).fail(n) : t && p((r = t.then)) ? r.call(t, e, n) : e.apply(void 0, [t].slice(i));
        } catch (s) {
            n.apply(void 0, [s]);
        }
    }
    (w.Callbacks = function (t) {
        t =
            "string" == typeof t
                ? ((e = t),
                  (n = {}),
                  w.each(e.match(X) || [], function (t, e) {
                      n[e] = !0;
                  }),
                  n)
                : w.extend({}, t);
        var e,
            n,
            i,
            r,
            s,
            o,
            a = [],
            l = [],
            c = -1,
            u = function () {
                for (o = o || t.once, s = i = !0; l.length; c = -1) for (r = l.shift(); ++c < a.length; ) !1 === a[c].apply(r[0], r[1]) && t.stopOnFalse && ((c = a.length), (r = !1));
                t.memory || (r = !1), (i = !1), o && (a = r ? [] : "");
            },
            h = {
                add: function () {
                    return (
                        a &&
                            (r && !i && ((c = a.length - 1), l.push(r)),
                            (function e(n) {
                                w.each(n, function (n, i) {
                                    p(i) ? (t.unique && h.has(i)) || a.push(i) : i && i.length && "string" !== _(i) && e(i);
                                });
                            })(arguments),
                            r && !i && u()),
                        this
                    );
                },
                remove: function () {
                    return (
                        w.each(arguments, function (t, e) {
                            for (var n; -1 < (n = w.inArray(e, a, n)); ) a.splice(n, 1), n <= c && c--;
                        }),
                        this
                    );
                },
                has: function (t) {
                    return t ? -1 < w.inArray(t, a) : 0 < a.length;
                },
                empty: function () {
                    return a && (a = []), this;
                },
                disable: function () {
                    return (o = l = []), (a = r = ""), this;
                },
                disabled: function () {
                    return !a;
                },
                lock: function () {
                    return (o = l = []), r || i || (a = r = ""), this;
                },
                locked: function () {
                    return !!o;
                },
                fireWith: function (t, e) {
                    return o || ((e = [t, (e = e || []).slice ? e.slice() : e]), l.push(e), i || u()), this;
                },
                fire: function () {
                    return h.fireWith(this, arguments), this;
                },
                fired: function () {
                    return !!s;
                },
            };
        return h;
    }),
        w.extend({
            Deferred: function (e) {
                var n = [
                        ["notify", "progress", w.Callbacks("memory"), w.Callbacks("memory"), 2],
                        ["resolve", "done", w.Callbacks("once memory"), w.Callbacks("once memory"), 0, "resolved"],
                        ["reject", "fail", w.Callbacks("once memory"), w.Callbacks("once memory"), 1, "rejected"],
                    ],
                    i = "pending",
                    r = {
                        state: function () {
                            return i;
                        },
                        always: function () {
                            return s.done(arguments).fail(arguments), this;
                        },
                        catch: function (t) {
                            return r.then(null, t);
                        },
                        pipe: function () {
                            var t = arguments;
                            return w
                                .Deferred(function (e) {
                                    w.each(n, function (n, i) {
                                        var r = p(t[i[4]]) && t[i[4]];
                                        s[i[1]](function () {
                                            var t = r && r.apply(this, arguments);
                                            t && p(t.promise) ? t.promise().progress(e.notify).done(e.resolve).fail(e.reject) : e[i[0] + "With"](this, r ? [t] : arguments);
                                        });
                                    }),
                                        (t = null);
                                })
                                .promise();
                        },
                        then: function (e, i, r) {
                            var s = 0;
                            function o(e, n, i, r) {
                                return function () {
                                    var a = this,
                                        l = arguments,
                                        c = function () {
                                            var t, c;
                                            if (!(e < s)) {
                                                if ((t = i.apply(a, l)) === n.promise()) throw TypeError("Thenable self-resolution");
                                                p((c = t && ("object" == typeof t || "function" == typeof t) && t.then))
                                                    ? r
                                                        ? c.call(t, o(s, n, F, r), o(s, n, V, r))
                                                        : (s++, c.call(t, o(s, n, F, r), o(s, n, V, r), o(s, n, F, n.notifyWith)))
                                                    : (i !== F && ((a = void 0), (l = [t])), (r || n.resolveWith)(a, l));
                                            }
                                        },
                                        u = r
                                            ? c
                                            : function () {
                                                  try {
                                                      c();
                                                  } catch (t) {
                                                      w.Deferred.exceptionHook && w.Deferred.exceptionHook(t, u.error), s <= e + 1 && (i !== V && ((a = void 0), (l = [t])), n.rejectWith(a, l));
                                                  }
                                              };
                                    e ? u() : (w.Deferred.getErrorHook ? (u.error = w.Deferred.getErrorHook()) : w.Deferred.getStackHook && (u.error = w.Deferred.getStackHook()), t.setTimeout(u));
                                };
                            }
                            return w
                                .Deferred(function (t) {
                                    n[0][3].add(o(0, t, p(r) ? r : F, t.notifyWith)), n[1][3].add(o(0, t, p(e) ? e : F)), n[2][3].add(o(0, t, p(i) ? i : V));
                                })
                                .promise();
                        },
                        promise: function (t) {
                            return null != t ? w.extend(t, r) : r;
                        },
                    },
                    s = {};
                return (
                    w.each(n, function (t, e) {
                        var o = e[2],
                            a = e[5];
                        (r[e[1]] = o.add),
                            a &&
                                o.add(
                                    function () {
                                        i = a;
                                    },
                                    n[3 - t][2].disable,
                                    n[3 - t][3].disable,
                                    n[0][2].lock,
                                    n[0][3].lock
                                ),
                            o.add(e[3].fire),
                            (s[e[0]] = function () {
                                return s[e[0] + "With"](this === s ? void 0 : this, arguments), this;
                            }),
                            (s[e[0] + "With"] = o.fireWith);
                    }),
                    r.promise(s),
                    e && e.call(s, s),
                    s
                );
            },
            when: function (t) {
                var e = arguments.length,
                    n = e,
                    i = Array(n),
                    s = r.call(arguments),
                    o = w.Deferred(),
                    a = function (t) {
                        return function (n) {
                            (i[t] = this), (s[t] = 1 < arguments.length ? r.call(arguments) : n), --e || o.resolveWith(i, s);
                        };
                    };
                if (e <= 1 && (U(t, o.done(a(n)).resolve, o.reject, !e), "pending" === o.state() || p(s[n] && s[n].then))) return o.then();
                for (; n--; ) U(s[n], a(n), o.reject);
                return o.promise();
            },
        });
    var K = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    (w.Deferred.exceptionHook = function (e, n) {
        t.console && t.console.warn && e && K.test(e.name) && t.console.warn("jQuery.Deferred exception: " + e.message, e.stack, n);
    }),
        (w.readyException = function (e) {
            t.setTimeout(function () {
                throw e;
            });
        });
    var G = w.Deferred();
    function Q() {
        g.removeEventListener("DOMContentLoaded", Q), t.removeEventListener("load", Q), w.ready();
    }
    (w.fn.ready = function (t) {
        return (
            G.then(t).catch(function (t) {
                w.readyException(t);
            }),
            this
        );
    }),
        w.extend({
            isReady: !1,
            readyWait: 1,
            ready: function (t) {
                (!0 === t ? --w.readyWait : w.isReady) || ((w.isReady = !0) !== t && 0 < --w.readyWait) || G.resolveWith(g, [w]);
            },
        }),
        (w.ready.then = G.then),
        "complete" !== g.readyState && ("loading" === g.readyState || g.documentElement.doScroll) ? (g.addEventListener("DOMContentLoaded", Q), t.addEventListener("load", Q)) : t.setTimeout(w.ready);
    var Z = function (t, e, n, i, r, s, o) {
            var a = 0,
                l = t.length,
                c = null == n;
            if ("object" === _(n)) for (a in ((r = !0), n)) Z(t, e, a, n[a], !0, s, o);
            else if (
                void 0 !== i &&
                ((r = !0),
                p(i) || (o = !0),
                c &&
                    (o
                        ? (e.call(t, i), (e = null))
                        : ((c = e),
                          (e = function (t, e, n) {
                              return c.call(w(t), n);
                          }))),
                e)
            )
                for (; a < l; a++) e(t[a], n, o ? i : i.call(t[a], a, e(t[a], n)));
            return r ? t : c ? e.call(t) : l ? e(t[0], n) : s;
        },
        J = /^-ms-/,
        tt = /-([a-z])/g;
    function te(t, e) {
        return e.toUpperCase();
    }
    function tn(t) {
        return t.replace(J, "ms-").replace(tt, te);
    }
    var ti = function (t) {
        return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
    };
    function tr() {
        this.expando = w.expando + tr.uid++;
    }
    (tr.uid = 1),
        (tr.prototype = {
            cache: function (t) {
                var e = t[this.expando];
                return e || ((e = {}), ti(t) && (t.nodeType ? (t[this.expando] = e) : Object.defineProperty(t, this.expando, { value: e, configurable: !0 }))), e;
            },
            set: function (t, e, n) {
                var i,
                    r = this.cache(t);
                if ("string" == typeof e) r[tn(e)] = n;
                else for (i in e) r[tn(i)] = e[i];
                return r;
            },
            get: function (t, e) {
                return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][tn(e)];
            },
            access: function (t, e, n) {
                return void 0 === e || (e && "string" == typeof e && void 0 === n) ? this.get(t, e) : (this.set(t, e, n), void 0 !== n ? n : e);
            },
            remove: function (t, e) {
                var n,
                    i = t[this.expando];
                if (void 0 !== i) {
                    if (void 0 !== e) for (n = (e = Array.isArray(e) ? e.map(tn) : ((e = tn(e)) in i) ? [e] : e.match(X) || []).length; n--; ) delete i[e[n]];
                    (void 0 === e || w.isEmptyObject(i)) && (t.nodeType ? (t[this.expando] = void 0) : delete t[this.expando]);
                }
            },
            hasData: function (t) {
                var e = t[this.expando];
                return void 0 !== e && !w.isEmptyObject(e);
            },
        });
    var ts = new tr(),
        to = new tr(),
        ta = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        tl = /[A-Z]/g;
    function tc(t, e, n) {
        var i, r;
        if (void 0 === n && 1 === t.nodeType) {
            if (((i = "data-" + e.replace(tl, "-$&").toLowerCase()), "string" == typeof (n = t.getAttribute(i)))) {
                try {
                    n = "true" === (r = n) || ("false" !== r && ("null" === r ? null : r === +r + "" ? +r : ta.test(r) ? JSON.parse(r) : r));
                } catch (s) {}
                to.set(t, e, n);
            } else n = void 0;
        }
        return n;
    }
    w.extend({
        hasData: function (t) {
            return to.hasData(t) || ts.hasData(t);
        },
        data: function (t, e, n) {
            return to.access(t, e, n);
        },
        removeData: function (t, e) {
            to.remove(t, e);
        },
        _data: function (t, e, n) {
            return ts.access(t, e, n);
        },
        _removeData: function (t, e) {
            ts.remove(t, e);
        },
    }),
        w.fn.extend({
            data: function (t, e) {
                var n,
                    i,
                    r,
                    s = this[0],
                    o = s && s.attributes;
                if (void 0 === t) {
                    if (this.length && ((r = to.get(s)), 1 === s.nodeType && !ts.get(s, "hasDataAttrs"))) {
                        for (n = o.length; n--; ) o[n] && 0 === (i = o[n].name).indexOf("data-") && tc(s, (i = tn(i.slice(5))), r[i]);
                        ts.set(s, "hasDataAttrs", !0);
                    }
                    return r;
                }
                return "object" == typeof t
                    ? this.each(function () {
                          to.set(this, t);
                      })
                    : Z(
                          this,
                          function (e) {
                              var n;
                              if (s && void 0 === e) return void 0 !== (n = to.get(s, t)) ? n : void 0 !== (n = tc(s, t)) ? n : void 0;
                              this.each(function () {
                                  to.set(this, t, e);
                              });
                          },
                          null,
                          e,
                          1 < arguments.length,
                          null,
                          !0
                      );
            },
            removeData: function (t) {
                return this.each(function () {
                    to.remove(this, t);
                });
            },
        }),
        w.extend({
            queue: function (t, e, n) {
                var i;
                if (t) return (e = (e || "fx") + "queue"), (i = ts.get(t, e)), n && (!i || Array.isArray(n) ? (i = ts.access(t, e, w.makeArray(n))) : i.push(n)), i || [];
            },
            dequeue: function (t, e) {
                e = e || "fx";
                var n = w.queue(t, e),
                    i = n.length,
                    r = n.shift(),
                    s = w._queueHooks(t, e);
                "inprogress" === r && ((r = n.shift()), i--),
                    r &&
                        ("fx" === e && n.unshift("inprogress"),
                        delete s.stop,
                        r.call(
                            t,
                            function () {
                                w.dequeue(t, e);
                            },
                            s
                        )),
                    !i && s && s.empty.fire();
            },
            _queueHooks: function (t, e) {
                var n = e + "queueHooks";
                return (
                    ts.get(t, n) ||
                    ts.access(t, n, {
                        empty: w.Callbacks("once memory").add(function () {
                            ts.remove(t, [e + "queue", n]);
                        }),
                    })
                );
            },
        }),
        w.fn.extend({
            queue: function (t, e) {
                var n = 2;
                return (
                    "string" != typeof t && ((e = t), (t = "fx"), n--),
                    arguments.length < n
                        ? w.queue(this[0], t)
                        : void 0 === e
                        ? this
                        : this.each(function () {
                              var n = w.queue(this, t, e);
                              w._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && w.dequeue(this, t);
                          })
                );
            },
            dequeue: function (t) {
                return this.each(function () {
                    w.dequeue(this, t);
                });
            },
            clearQueue: function (t) {
                return this.queue(t || "fx", []);
            },
            promise: function (t, e) {
                var n,
                    i = 1,
                    r = w.Deferred(),
                    s = this,
                    o = this.length,
                    a = function () {
                        --i || r.resolveWith(s, [s]);
                    };
                for ("string" != typeof t && ((e = t), (t = void 0)), t = t || "fx"; o--; ) (n = ts.get(s[o], t + "queueHooks")) && n.empty && (i++, n.empty.add(a));
                return a(), r.promise(e);
            },
        });
    var tu = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        th = RegExp("^(?:([+-])=|)(" + tu + ")([a-z%]*)$", "i"),
        tf = ["Top", "Right", "Bottom", "Left"],
        td = g.documentElement,
        tp = function (t) {
            return w.contains(t.ownerDocument, t);
        },
        t$ = { composed: !0 };
    td.getRootNode &&
        (tp = function (t) {
            return w.contains(t.ownerDocument, t) || t.getRootNode(t$) === t.ownerDocument;
        });
    var tm = function (t, e) {
        return "none" === (t = e || t).style.display || ("" === t.style.display && tp(t) && "none" === w.css(t, "display"));
    };
    function tg(t, e, n, i) {
        var r,
            s,
            o = 20,
            a = i
                ? function () {
                      return i.cur();
                  }
                : function () {
                      return w.css(t, e, "");
                  },
            l = a(),
            c = (n && n[3]) || (w.cssNumber[e] ? "" : "px"),
            u = t.nodeType && (w.cssNumber[e] || ("px" !== c && +l)) && th.exec(w.css(t, e));
        if (u && u[3] !== c) {
            for (l /= 2, c = c || u[3], u = +l || 1; o--; ) w.style(t, e, u + c), (1 - s) * (1 - (s = a() / l || 0.5)) <= 0 && (o = 0), (u /= s);
            (u *= 2), w.style(t, e, u + c), (n = n || []);
        }
        return n && ((u = +u || +l || 0), (r = n[1] ? u + (n[1] + 1) * n[2] : +n[2]), i && ((i.unit = c), (i.start = u), (i.end = r))), r;
    }
    var tv = {};
    function ty(t, e) {
        for (var n, i, r, s, o, a, l, c = [], u = 0, h = t.length; u < h; u++)
            (i = t[u]).style &&
                ((n = i.style.display),
                e
                    ? ("none" === n && ((c[u] = ts.get(i, "display") || null), c[u] || (i.style.display = "")),
                      "" === i.style.display &&
                          tm(i) &&
                          (c[u] =
                              ((l = o = s = void 0),
                              (o = (r = i).ownerDocument),
                              (l = tv[(a = r.nodeName)]) || ((s = o.body.appendChild(o.createElement(a))), (l = w.css(s, "display")), s.parentNode.removeChild(s), "none" === l && (l = "block"), (tv[a] = l)))))
                    : "none" !== n && ((c[u] = "none"), ts.set(i, "display", n)));
        for (u = 0; u < h; u++) null != c[u] && (t[u].style.display = c[u]);
        return t;
    }
    w.fn.extend({
        show: function () {
            return ty(this, !0);
        },
        hide: function () {
            return ty(this);
        },
        toggle: function (t) {
            return "boolean" == typeof t
                ? t
                    ? this.show()
                    : this.hide()
                : this.each(function () {
                      tm(this) ? w(this).show() : w(this).hide();
                  });
        },
    });
    var t_,
        t8,
        tb = /^(?:checkbox|radio)$/i,
        tx = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
        tw = /^$|^module$|\/(?:java|ecma)script/i;
    (t_ = g.createDocumentFragment().appendChild(g.createElement("div"))),
        (t8 = g.createElement("input")).setAttribute("type", "radio"),
        t8.setAttribute("checked", "checked"),
        t8.setAttribute("name", "t"),
        t_.appendChild(t8),
        (d.checkClone = t_.cloneNode(!0).cloneNode(!0).lastChild.checked),
        (t_.innerHTML = "<textarea>x</textarea>"),
        (d.noCloneChecked = !!t_.cloneNode(!0).lastChild.defaultValue),
        (t_.innerHTML = "<option></option>"),
        (d.option = !!t_.lastChild);
    var tT = { thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };
    function tk(t, e) {
        var n;
        return (n = void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e || "*") : void 0 !== t.querySelectorAll ? t.querySelectorAll(e || "*") : []), void 0 === e || (e && k(t, e)) ? w.merge([t], n) : n;
    }
    function tS(t, e) {
        for (var n = 0, i = t.length; n < i; n++) ts.set(t[n], "globalEval", !e || ts.get(e[n], "globalEval"));
    }
    (tT.tbody = tT.tfoot = tT.colgroup = tT.caption = tT.thead), (tT.th = tT.td), d.option || (tT.optgroup = tT.option = [1, "<select multiple='multiple'>", "</select>"]);
    var tC = /<|&#?\w+;/;
    function tE(t, e, n, i, r) {
        for (var s, o, a, l, c, u, h = e.createDocumentFragment(), f = [], d = 0, p = t.length; d < p; d++)
            if ((s = t[d]) || 0 === s) {
                if ("object" === _(s)) w.merge(f, s.nodeType ? [s] : s);
                else if (tC.test(s)) {
                    for (o = o || h.appendChild(e.createElement("div")), l = tT[(a = (tx.exec(s) || ["", ""])[1].toLowerCase())] || tT._default, o.innerHTML = l[1] + w.htmlPrefilter(s) + l[2], u = l[0]; u--; ) o = o.lastChild;
                    w.merge(f, o.childNodes), ((o = h.firstChild).textContent = "");
                } else f.push(e.createTextNode(s));
            }
        for (h.textContent = "", d = 0; (s = f[d++]); )
            if (i && -1 < w.inArray(s, i)) r && r.push(s);
            else if (((c = tp(s)), (o = tk(h.appendChild(s), "script")), c && tS(o), n)) for (u = 0; (s = o[u++]); ) tw.test(s.type || "") && n.push(s);
        return h;
    }
    var tA = /^([^.]*)(?:\.(.+)|)/;
    function tD() {
        return !0;
    }
    function tO() {
        return !1;
    }
    function t0(t, e, n, i, r, s) {
        var o, a;
        if ("object" == typeof e) {
            for (a in ("string" != typeof n && ((i = i || n), (n = void 0)), e)) t0(t, a, n, i, e[a], s);
            return t;
        }
        if ((null == i && null == r ? ((r = n), (i = n = void 0)) : null == r && ("string" == typeof n ? ((r = i), (i = void 0)) : ((r = i), (i = n), (n = void 0))), !1 === r)) r = tO;
        else if (!r) return t;
        return (
            1 === s &&
                ((o = r),
                ((r = function (t) {
                    return w().off(t), o.apply(this, arguments);
                }).guid = o.guid || (o.guid = w.guid++))),
            t.each(function () {
                w.event.add(this, e, r, i, n);
            })
        );
    }
    function tL(t, e, n) {
        n
            ? (ts.set(t, e, !1),
              w.event.add(t, e, {
                  namespace: !1,
                  handler: function (t) {
                      var n,
                          i = ts.get(this, e);
                      if (1 & t.isTrigger && this[e]) {
                          if (i) (w.event.special[e] || {}).delegateType && t.stopPropagation();
                          else if (((i = r.call(arguments)), ts.set(this, e, i), this[e](), (n = ts.get(this, e)), ts.set(this, e, !1), i !== n)) return t.stopImmediatePropagation(), t.preventDefault(), n;
                      } else i && (ts.set(this, e, w.event.trigger(i[0], i.slice(1), this)), t.stopPropagation(), (t.isImmediatePropagationStopped = tD));
                  },
              }))
            : void 0 === ts.get(t, e) && w.event.add(t, e, tD);
    }
    (w.event = {
        global: {},
        add: function (t, e, n, i, r) {
            var s,
                o,
                a,
                l,
                c,
                u,
                h,
                f,
                d,
                p,
                m,
                g = ts.get(t);
            if (ti(t))
                for (
                    n.handler && ((n = (s = n).handler), (r = s.selector)),
                        r && w.find.matchesSelector(td, r),
                        n.guid || (n.guid = w.guid++),
                        (l = g.events) || (l = g.events = Object.create(null)),
                        (o = g.handle) ||
                            (o = g.handle = function (e) {
                                return w.event.triggered !== e.type ? w.event.dispatch.apply(t, arguments) : void 0;
                            }),
                        c = (e = (e || "").match(X) || [""]).length;
                    c--;

                )
                    (d = m = (a = tA.exec(e[c]) || [])[1]),
                        (p = (a[2] || "").split(".").sort()),
                        d &&
                            ((h = w.event.special[d] || {}),
                            (d = (r ? h.delegateType : h.bindType) || d),
                            (h = w.event.special[d] || {}),
                            (u = w.extend({ type: d, origType: m, data: i, handler: n, guid: n.guid, selector: r, needsContext: r && w.expr.match.needsContext.test(r), namespace: p.join(".") }, s)),
                            (f = l[d]) || (((f = l[d] = []).delegateCount = 0), (h.setup && !1 !== h.setup.call(t, i, p, o)) || (t.addEventListener && t.addEventListener(d, o))),
                            h.add && (h.add.call(t, u), u.handler.guid || (u.handler.guid = n.guid)),
                            r ? f.splice(f.delegateCount++, 0, u) : f.push(u),
                            (w.event.global[d] = !0));
        },
        remove: function (t, e, n, i, r) {
            var s,
                o,
                a,
                l,
                c,
                u,
                h,
                f,
                d,
                p,
                m,
                g = ts.hasData(t) && ts.get(t);
            if (g && (l = g.events)) {
                for (c = (e = (e || "").match(X) || [""]).length; c--; )
                    if (((d = m = (a = tA.exec(e[c]) || [])[1]), (p = (a[2] || "").split(".").sort()), d)) {
                        for (h = w.event.special[d] || {}, f = l[(d = (i ? h.delegateType : h.bindType) || d)] || [], a = a[2] && RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), o = s = f.length; s--; )
                            (u = f[s]),
                                (!r && m !== u.origType) ||
                                    (n && n.guid !== u.guid) ||
                                    (a && !a.test(u.namespace)) ||
                                    (i && i !== u.selector && ("**" !== i || !u.selector)) ||
                                    (f.splice(s, 1), u.selector && f.delegateCount--, h.remove && h.remove.call(t, u));
                        o && !f.length && ((h.teardown && !1 !== h.teardown.call(t, p, g.handle)) || w.removeEvent(t, d, g.handle), delete l[d]);
                    } else for (d in l) w.event.remove(t, d + e[c], n, i, !0);
                w.isEmptyObject(l) && ts.remove(t, "handle events");
            }
        },
        dispatch: function (t) {
            var e,
                n,
                i,
                r,
                s,
                o,
                a = Array(arguments.length),
                l = w.event.fix(t),
                c = (ts.get(this, "events") || Object.create(null))[l.type] || [],
                u = w.event.special[l.type] || {};
            for (a[0] = l, e = 1; e < arguments.length; e++) a[e] = arguments[e];
            if (((l.delegateTarget = this), !u.preDispatch || !1 !== u.preDispatch.call(this, l))) {
                for (o = w.event.handlers.call(this, l, c), e = 0; (r = o[e++]) && !l.isPropagationStopped(); )
                    for (l.currentTarget = r.elem, n = 0; (s = r.handlers[n++]) && !l.isImmediatePropagationStopped(); )
                        (l.rnamespace && !1 !== s.namespace && !l.rnamespace.test(s.namespace)) ||
                            ((l.handleObj = s), (l.data = s.data), void 0 !== (i = ((w.event.special[s.origType] || {}).handle || s.handler).apply(r.elem, a)) && !1 === (l.result = i) && (l.preventDefault(), l.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, l), l.result;
            }
        },
        handlers: function (t, e) {
            var n,
                i,
                r,
                s,
                o,
                a = [],
                l = e.delegateCount,
                c = t.target;
            if (l && c.nodeType && !("click" === t.type && 1 <= t.button)) {
                for (; c !== this; c = c.parentNode || this)
                    if (1 === c.nodeType && ("click" !== t.type || !0 !== c.disabled)) {
                        for (s = [], o = {}, n = 0; n < l; n++) void 0 === o[(r = (i = e[n]).selector + " ")] && (o[r] = i.needsContext ? -1 < w(r, this).index(c) : w.find(r, this, null, [c]).length), o[r] && s.push(i);
                        s.length && a.push({ elem: c, handlers: s });
                    }
            }
            return (c = this), l < e.length && a.push({ elem: c, handlers: e.slice(l) }), a;
        },
        addProp: function (t, e) {
            Object.defineProperty(w.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: p(e)
                    ? function () {
                          if (this.originalEvent) return e(this.originalEvent);
                      }
                    : function () {
                          if (this.originalEvent) return this.originalEvent[t];
                      },
                set: function (e) {
                    Object.defineProperty(this, t, { enumerable: !0, configurable: !0, writable: !0, value: e });
                },
            });
        },
        fix: function (t) {
            return t[w.expando] ? t : new w.Event(t);
        },
        special: {
            load: { noBubble: !0 },
            click: {
                setup: function (t) {
                    var e = this || t;
                    return tb.test(e.type) && e.click && k(e, "input") && tL(e, "click", !0), !1;
                },
                trigger: function (t) {
                    var e = this || t;
                    return tb.test(e.type) && e.click && k(e, "input") && tL(e, "click"), !0;
                },
                _default: function (t) {
                    var e = t.target;
                    return (tb.test(e.type) && e.click && k(e, "input") && ts.get(e, "click")) || k(e, "a");
                },
            },
            beforeunload: {
                postDispatch: function (t) {
                    void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result);
                },
            },
        },
    }),
        (w.removeEvent = function (t, e, n) {
            t.removeEventListener && t.removeEventListener(e, n);
        }),
        (w.Event = function (t, e) {
            if (!(this instanceof w.Event)) return new w.Event(t, e);
            t && t.type
                ? ((this.originalEvent = t),
                  (this.type = t.type),
                  (this.isDefaultPrevented = t.defaultPrevented || (void 0 === t.defaultPrevented && !1 === t.returnValue) ? tD : tO),
                  (this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target),
                  (this.currentTarget = t.currentTarget),
                  (this.relatedTarget = t.relatedTarget))
                : (this.type = t),
                e && w.extend(this, e),
                (this.timeStamp = (t && t.timeStamp) || Date.now()),
                (this[w.expando] = !0);
        }),
        (w.Event.prototype = {
            constructor: w.Event,
            isDefaultPrevented: tO,
            isPropagationStopped: tO,
            isImmediatePropagationStopped: tO,
            isSimulated: !1,
            preventDefault: function () {
                var t = this.originalEvent;
                (this.isDefaultPrevented = tD), t && !this.isSimulated && t.preventDefault();
            },
            stopPropagation: function () {
                var t = this.originalEvent;
                (this.isPropagationStopped = tD), t && !this.isSimulated && t.stopPropagation();
            },
            stopImmediatePropagation: function () {
                var t = this.originalEvent;
                (this.isImmediatePropagationStopped = tD), t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation();
            },
        }),
        w.each(
            {
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                code: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: !0,
            },
            w.event.addProp
        ),
        w.each({ focus: "focusin", blur: "focusout" }, function (t, e) {
            function n(t) {
                if (g.documentMode) {
                    var n = ts.get(this, "handle"),
                        i = w.event.fix(t);
                    (i.type = "focusin" === t.type ? "focus" : "blur"), (i.isSimulated = !0), n(t), i.target === i.currentTarget && n(i);
                } else w.event.simulate(e, t.target, w.event.fix(t));
            }
            (w.event.special[t] = {
                setup: function () {
                    var i;
                    if ((tL(this, t, !0), !g.documentMode)) return !1;
                    (i = ts.get(this, e)) || this.addEventListener(e, n), ts.set(this, e, (i || 0) + 1);
                },
                trigger: function () {
                    return tL(this, t), !0;
                },
                teardown: function () {
                    var t;
                    if (!g.documentMode) return !1;
                    (t = ts.get(this, e) - 1) ? ts.set(this, e, t) : (this.removeEventListener(e, n), ts.remove(this, e));
                },
                _default: function (e) {
                    return ts.get(e.target, t);
                },
                delegateType: e,
            }),
                (w.event.special[e] = {
                    setup: function () {
                        var i = this.ownerDocument || this.document || this,
                            r = g.documentMode ? this : i,
                            s = ts.get(r, e);
                        s || (g.documentMode ? this.addEventListener(e, n) : i.addEventListener(t, n, !0)), ts.set(r, e, (s || 0) + 1);
                    },
                    teardown: function () {
                        var i = this.ownerDocument || this.document || this,
                            r = g.documentMode ? this : i,
                            s = ts.get(r, e) - 1;
                        s ? ts.set(r, e, s) : (g.documentMode ? this.removeEventListener(e, n) : i.removeEventListener(t, n, !0), ts.remove(r, e));
                    },
                });
        }),
        w.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (t, e) {
            w.event.special[t] = {
                delegateType: e,
                bindType: e,
                handle: function (t) {
                    var n,
                        i = t.relatedTarget,
                        r = t.handleObj;
                    return (i && (i === this || w.contains(this, i))) || ((t.type = r.origType), (n = r.handler.apply(this, arguments)), (t.type = e)), n;
                },
            };
        }),
        w.fn.extend({
            on: function (t, e, n, i) {
                return t0(this, t, e, n, i);
            },
            one: function (t, e, n, i) {
                return t0(this, t, e, n, i, 1);
            },
            off: function (t, e, n) {
                var i, r;
                if (t && t.preventDefault && t.handleObj) return (i = t.handleObj), w(t.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                if ("object" == typeof t) {
                    for (r in t) this.off(r, e, t[r]);
                    return this;
                }
                return (
                    (!1 !== e && "function" != typeof e) || ((n = e), (e = void 0)),
                    !1 === n && (n = tO),
                    this.each(function () {
                        w.event.remove(this, t, n, e);
                    })
                );
            },
        });
    var tP = /<script|<style|<link/i,
        tj = /checked\s*(?:[^=]|=\s*.checked.)/i,
        tR = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
    function tH(t, e) {
        return (k(t, "table") && k(11 !== e.nodeType ? e : e.firstChild, "tr") && w(t).children("tbody")[0]) || t;
    }
    function tB(t) {
        return (t.type = (null !== t.getAttribute("type")) + "/" + t.type), t;
    }
    function t1(t) {
        return "true/" === (t.type || "").slice(0, 5) ? (t.type = t.type.slice(5)) : t.removeAttribute("type"), t;
    }
    function tM(t, e) {
        var n, i, r, s, o, a;
        if (1 === e.nodeType) {
            if (ts.hasData(t) && (a = ts.get(t).events)) for (r in (ts.remove(e, "handle events"), a)) for (n = 0, i = a[r].length; n < i; n++) w.event.add(e, r, a[r][n]);
            to.hasData(t) && ((s = to.access(t)), (o = w.extend({}, s)), to.set(e, o));
        }
    }
    function tq(t, e, n, i) {
        e = s(e);
        var r,
            o,
            a,
            l,
            c,
            u,
            h = 0,
            f = t.length,
            m = f - 1,
            g = e[0],
            v = p(g);
        if (v || (1 < f && "string" == typeof g && !d.checkClone && tj.test(g)))
            return t.each(function (r) {
                var s = t.eq(r);
                v && (e[0] = g.call(this, r, s.html())), tq(s, e, n, i);
            });
        if (f && ((o = (r = tE(e, t[0].ownerDocument, !1, t, i)).firstChild), 1 === r.childNodes.length && (r = o), o || i)) {
            for (l = (a = w.map(tk(r, "script"), tB)).length; h < f; h++) (c = r), h !== m && ((c = w.clone(c, !0, !0)), l && w.merge(a, tk(c, "script"))), n.call(t[h], c, h);
            if (l)
                for (u = a[a.length - 1].ownerDocument, w.map(a, t1), h = 0; h < l; h++)
                    (c = a[h]),
                        tw.test(c.type || "") &&
                            !ts.access(c, "globalEval") &&
                            w.contains(u, c) &&
                            (c.src && "module" !== (c.type || "").toLowerCase() ? w._evalUrl && !c.noModule && w._evalUrl(c.src, { nonce: c.nonce || c.getAttribute("nonce") }, u) : y(c.textContent.replace(tR, ""), c, u));
        }
        return t;
    }
    function tN(t, e, n) {
        for (var i, r = e ? w.filter(e, t) : t, s = 0; null != (i = r[s]); s++) n || 1 !== i.nodeType || w.cleanData(tk(i)), i.parentNode && (n && tp(i) && tS(tk(i, "script")), i.parentNode.removeChild(i));
        return t;
    }
    w.extend({
        htmlPrefilter: function (t) {
            return t;
        },
        clone: function (t, e, n) {
            var i,
                r,
                s,
                o,
                a,
                l,
                c,
                u = t.cloneNode(!0),
                h = tp(t);
            if (!(d.noCloneChecked || (1 !== t.nodeType && 11 !== t.nodeType) || w.isXMLDoc(t)))
                for (o = tk(u), i = 0, r = (s = tk(t)).length; i < r; i++)
                    (a = s[i]), "input" === (c = (l = o[i]).nodeName.toLowerCase()) && tb.test(a.type) ? (l.checked = a.checked) : ("input" !== c && "textarea" !== c) || (l.defaultValue = a.defaultValue);
            if (e) {
                if (n) for (s = s || tk(t), o = o || tk(u), i = 0, r = s.length; i < r; i++) tM(s[i], o[i]);
                else tM(t, u);
            }
            return 0 < (o = tk(u, "script")).length && tS(o, !h && tk(t, "script")), u;
        },
        cleanData: function (t) {
            for (var e, n, i, r = w.event.special, s = 0; void 0 !== (n = t[s]); s++)
                if (ti(n)) {
                    if ((e = n[ts.expando])) {
                        if (e.events) for (i in e.events) r[i] ? w.event.remove(n, i) : w.removeEvent(n, i, e.handle);
                        n[ts.expando] = void 0;
                    }
                    n[to.expando] && (n[to.expando] = void 0);
                }
        },
    }),
        w.fn.extend({
            detach: function (t) {
                return tN(this, t, !0);
            },
            remove: function (t) {
                return tN(this, t);
            },
            text: function (t) {
                return Z(
                    this,
                    function (t) {
                        return void 0 === t
                            ? w.text(this)
                            : this.empty().each(function () {
                                  (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || (this.textContent = t);
                              });
                    },
                    null,
                    t,
                    arguments.length
                );
            },
            append: function () {
                return tq(this, arguments, function (t) {
                    (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || tH(this, t).appendChild(t);
                });
            },
            prepend: function () {
                return tq(this, arguments, function (t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = tH(this, t);
                        e.insertBefore(t, e.firstChild);
                    }
                });
            },
            before: function () {
                return tq(this, arguments, function (t) {
                    this.parentNode && this.parentNode.insertBefore(t, this);
                });
            },
            after: function () {
                return tq(this, arguments, function (t) {
                    this.parentNode && this.parentNode.insertBefore(t, this.nextSibling);
                });
            },
            empty: function () {
                for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (w.cleanData(tk(t, !1)), (t.textContent = ""));
                return this;
            },
            clone: function (t, e) {
                return (
                    (t = null != t && t),
                    (e = null == e ? t : e),
                    this.map(function () {
                        return w.clone(this, t, e);
                    })
                );
            },
            html: function (t) {
                return Z(
                    this,
                    function (t) {
                        var e = this[0] || {},
                            n = 0,
                            i = this.length;
                        if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                        if ("string" == typeof t && !tP.test(t) && !tT[(tx.exec(t) || ["", ""])[1].toLowerCase()]) {
                            t = w.htmlPrefilter(t);
                            try {
                                for (; n < i; n++) 1 === (e = this[n] || {}).nodeType && (w.cleanData(tk(e, !1)), (e.innerHTML = t));
                                e = 0;
                            } catch (r) {}
                        }
                        e && this.empty().append(t);
                    },
                    null,
                    t,
                    arguments.length
                );
            },
            replaceWith: function () {
                var t = [];
                return tq(
                    this,
                    arguments,
                    function (e) {
                        var n = this.parentNode;
                        0 > w.inArray(this, t) && (w.cleanData(tk(this)), n && n.replaceChild(e, this));
                    },
                    t
                );
            },
        }),
        w.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (t, e) {
            w.fn[t] = function (t) {
                for (var n, i = [], r = w(t), s = r.length - 1, a = 0; a <= s; a++) (n = a === s ? this : this.clone(!0)), w(r[a])[e](n), o.apply(i, n.get());
                return this.pushStack(i);
            };
        });
    var tz = RegExp("^(" + tu + ")(?!px)[a-z%]+$", "i"),
        tW = /^--/,
        tI = function (e) {
            var n = e.ownerDocument.defaultView;
            return (n && n.opener) || (n = t), n.getComputedStyle(e);
        },
        t3 = function (t, e, n) {
            var i,
                r,
                s = {};
            for (r in e) (s[r] = t.style[r]), (t.style[r] = e[r]);
            for (r in ((i = n.call(t)), e)) t.style[r] = s[r];
            return i;
        },
        tY = RegExp(tf.join("|"), "i");
    function tX(t, e, n) {
        var i,
            r,
            s,
            o,
            a = tW.test(e),
            l = t.style;
        return (
            (n = n || tI(t)) &&
                ((o = n.getPropertyValue(e) || n[e]),
                a && o && (o = o.replace(D, "$1") || void 0),
                "" !== o || tp(t) || (o = w.style(t, e)),
                !d.pixelBoxStyles() && tz.test(o) && tY.test(e) && ((i = l.width), (r = l.minWidth), (s = l.maxWidth), (l.minWidth = l.maxWidth = l.width = o), (o = n.width), (l.width = i), (l.minWidth = r), (l.maxWidth = s))),
            void 0 !== o ? o + "" : o
        );
    }
    function t2(t, e) {
        return {
            get: function () {
                if (!t()) return (this.get = e).apply(this, arguments);
                delete this.get;
            },
        };
    }
    !(function () {
        function e() {
            if (u) {
                (c.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
                    (u.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
                    td.appendChild(c).appendChild(u);
                var e = t.getComputedStyle(u);
                (i = "1%" !== e.top),
                    (l = 12 === n(e.marginLeft)),
                    (u.style.right = "60%"),
                    (o = 36 === n(e.right)),
                    (r = 36 === n(e.width)),
                    (u.style.position = "absolute"),
                    (s = 12 === n(u.offsetWidth / 3)),
                    td.removeChild(c),
                    (u = null);
            }
        }
        function n(t) {
            return Math.round(parseFloat(t));
        }
        var i,
            r,
            s,
            o,
            a,
            l,
            c = g.createElement("div"),
            u = g.createElement("div");
        u.style &&
            ((u.style.backgroundClip = "content-box"),
            (u.cloneNode(!0).style.backgroundClip = ""),
            (d.clearCloneStyle = "content-box" === u.style.backgroundClip),
            w.extend(d, {
                boxSizingReliable: function () {
                    return e(), r;
                },
                pixelBoxStyles: function () {
                    return e(), o;
                },
                pixelPosition: function () {
                    return e(), i;
                },
                reliableMarginLeft: function () {
                    return e(), l;
                },
                scrollboxSize: function () {
                    return e(), s;
                },
                reliableTrDimensions: function () {
                    var e, n, i, r;
                    return (
                        null == a &&
                            ((e = g.createElement("table")),
                            (n = g.createElement("tr")),
                            (i = g.createElement("div")),
                            (e.style.cssText = "position:absolute;left:-11111px;border-collapse:separate"),
                            (n.style.cssText = "box-sizing:content-box;border:1px solid"),
                            (n.style.height = "1px"),
                            (i.style.height = "9px"),
                            (i.style.display = "block"),
                            td.appendChild(e).appendChild(n).appendChild(i),
                            (a = parseInt((r = t.getComputedStyle(n)).height, 10) + parseInt(r.borderTopWidth, 10) + parseInt(r.borderBottomWidth, 10) === n.offsetHeight),
                            td.removeChild(e)),
                        a
                    );
                },
            }));
    })();
    var tF = ["Webkit", "Moz", "ms"],
        t4 = g.createElement("div").style,
        tV = {};
    function t9(t) {
        return (
            w.cssProps[t] ||
            tV[t] ||
            (t in t4
                ? t
                : (tV[t] =
                      (function (t) {
                          for (var e = t[0].toUpperCase() + t.slice(1), n = tF.length; n--; ) if ((t = tF[n] + e) in t4) return t;
                      })(t) || t))
        );
    }
    var t7 = /^(none|table(?!-c[ea]).+)/,
        tU = { position: "absolute", visibility: "hidden", display: "block" },
        t6 = { letterSpacing: "0", fontWeight: "400" };
    function t5(t, e, n) {
        var i = th.exec(e);
        return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : e;
    }
    function tK(t, e, n, i, r, s) {
        var o = "width" === e ? 1 : 0,
            a = 0,
            l = 0,
            c = 0;
        if (n === (i ? "border" : "content")) return 0;
        for (; o < 4; o += 2)
            "margin" === n && (c += w.css(t, n + tf[o], !0, r)),
                i
                    ? ("content" === n && (l -= w.css(t, "padding" + tf[o], !0, r)), "margin" !== n && (l -= w.css(t, "border" + tf[o] + "Width", !0, r)))
                    : ((l += w.css(t, "padding" + tf[o], !0, r)), "padding" !== n ? (l += w.css(t, "border" + tf[o] + "Width", !0, r)) : (a += w.css(t, "border" + tf[o] + "Width", !0, r)));
        return !i && 0 <= s && (l += Math.max(0, Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - s - l - a - 0.5)) || 0), l + c;
    }
    function tG(t, e, n) {
        var i = tI(t),
            r = (!d.boxSizingReliable() || n) && "border-box" === w.css(t, "boxSizing", !1, i),
            s = r,
            o = tX(t, e, i),
            a = "offset" + e[0].toUpperCase() + e.slice(1);
        if (tz.test(o)) {
            if (!n) return o;
            o = "auto";
        }
        return (
            ((!d.boxSizingReliable() && r) || (!d.reliableTrDimensions() && k(t, "tr")) || "auto" === o || (!parseFloat(o) && "inline" === w.css(t, "display", !1, i))) &&
                t.getClientRects().length &&
                ((r = "border-box" === w.css(t, "boxSizing", !1, i)), (s = a in t) && (o = t[a])),
            (o = parseFloat(o) || 0) + tK(t, e, n || (r ? "border" : "content"), s, i, o) + "px"
        );
    }
    function tQ(t, e, n, i, r) {
        return new tQ.prototype.init(t, e, n, i, r);
    }
    w.extend({
        cssHooks: {
            opacity: {
                get: function (t, e) {
                    if (e) {
                        var n = tX(t, "opacity");
                        return "" === n ? "1" : n;
                    }
                },
            },
        },
        cssNumber: {
            animationIterationCount: !0,
            aspectRatio: !0,
            borderImageSlice: !0,
            columnCount: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            scale: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
            fillOpacity: !0,
            floodOpacity: !0,
            stopOpacity: !0,
            strokeMiterlimit: !0,
            strokeOpacity: !0,
        },
        cssProps: {},
        style: function (t, e, n, i) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var r,
                    s,
                    o,
                    a = tn(e),
                    l = tW.test(e),
                    c = t.style;
                if ((l || (e = t9(a)), (o = w.cssHooks[e] || w.cssHooks[a]), void 0 === n)) return o && "get" in o && void 0 !== (r = o.get(t, !1, i)) ? r : c[e];
                "string" == (s = typeof n) && (r = th.exec(n)) && r[1] && ((n = tg(t, e, r)), (s = "number")),
                    null != n &&
                        n == n &&
                        ("number" !== s || l || (n += (r && r[3]) || (w.cssNumber[a] ? "" : "px")),
                        d.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (c[e] = "inherit"),
                        (o && "set" in o && void 0 === (n = o.set(t, n, i))) || (l ? c.setProperty(e, n) : (c[e] = n)));
            }
        },
        css: function (t, e, n, i) {
            var r,
                s,
                o,
                a = tn(e);
            return (
                tW.test(e) || (e = t9(a)),
                (o = w.cssHooks[e] || w.cssHooks[a]) && "get" in o && (r = o.get(t, !0, n)),
                void 0 === r && (r = tX(t, e, i)),
                "normal" === r && e in t6 && (r = t6[e]),
                "" === n || n ? ((s = parseFloat(r)), !0 === n || isFinite(s) ? s || 0 : r) : r
            );
        },
    }),
        w.each(["height", "width"], function (t, e) {
            w.cssHooks[e] = {
                get: function (t, n, i) {
                    if (n)
                        return !t7.test(w.css(t, "display")) || (t.getClientRects().length && t.getBoundingClientRect().width)
                            ? tG(t, e, i)
                            : t3(t, tU, function () {
                                  return tG(t, e, i);
                              });
                },
                set: function (t, n, i) {
                    var r,
                        s = tI(t),
                        o = !d.scrollboxSize() && "absolute" === s.position,
                        a = (o || i) && "border-box" === w.css(t, "boxSizing", !1, s),
                        l = i ? tK(t, e, i, a, s) : 0;
                    return (
                        a && o && (l -= Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - parseFloat(s[e]) - tK(t, e, "border", !1, s) - 0.5)),
                        l && (r = th.exec(n)) && "px" !== (r[3] || "px") && ((t.style[e] = n), (n = w.css(t, e))),
                        t5(0, n, l)
                    );
                },
            };
        }),
        (w.cssHooks.marginLeft = t2(d.reliableMarginLeft, function (t, e) {
            if (e)
                return (
                    (parseFloat(tX(t, "marginLeft")) ||
                        t.getBoundingClientRect().left -
                            t3(t, { marginLeft: 0 }, function () {
                                return t.getBoundingClientRect().left;
                            })) + "px"
                );
        })),
        w.each({ margin: "", padding: "", border: "Width" }, function (t, e) {
            (w.cssHooks[t + e] = {
                expand: function (n) {
                    for (var i = 0, r = {}, s = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) r[t + tf[i] + e] = s[i] || s[i - 2] || s[0];
                    return r;
                },
            }),
                "margin" !== t && (w.cssHooks[t + e].set = t5);
        }),
        w.fn.extend({
            css: function (t, e) {
                return Z(
                    this,
                    function (t, e, n) {
                        var i,
                            r,
                            s = {},
                            o = 0;
                        if (Array.isArray(e)) {
                            for (i = tI(t), r = e.length; o < r; o++) s[e[o]] = w.css(t, e[o], !1, i);
                            return s;
                        }
                        return void 0 !== n ? w.style(t, e, n) : w.css(t, e);
                    },
                    t,
                    e,
                    1 < arguments.length
                );
            },
        }),
        (((w.Tween = tQ).prototype = {
            constructor: tQ,
            init: function (t, e, n, i, r, s) {
                (this.elem = t), (this.prop = n), (this.easing = r || w.easing._default), (this.options = e), (this.start = this.now = this.cur()), (this.end = i), (this.unit = s || (w.cssNumber[n] ? "" : "px"));
            },
            cur: function () {
                var t = tQ.propHooks[this.prop];
                return t && t.get ? t.get(this) : tQ.propHooks._default.get(this);
            },
            run: function (t) {
                var e,
                    n = tQ.propHooks[this.prop];
                return (
                    this.options.duration ? (this.pos = e = w.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration)) : (this.pos = e = t),
                    (this.now = (this.end - this.start) * e + this.start),
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                    n && n.set ? n.set(this) : tQ.propHooks._default.set(this),
                    this
                );
            },
        }).init.prototype = tQ.prototype),
        ((tQ.propHooks = {
            _default: {
                get: function (t) {
                    var e;
                    return 1 !== t.elem.nodeType || (null != t.elem[t.prop] && null == t.elem.style[t.prop]) ? t.elem[t.prop] : (e = w.css(t.elem, t.prop, "")) && "auto" !== e ? e : 0;
                },
                set: function (t) {
                    w.fx.step[t.prop] ? w.fx.step[t.prop](t) : 1 === t.elem.nodeType && (w.cssHooks[t.prop] || null != t.elem.style[t9(t.prop)]) ? w.style(t.elem, t.prop, t.now + t.unit) : (t.elem[t.prop] = t.now);
                },
            },
        }).scrollTop = tQ.propHooks.scrollLeft = {
            set: function (t) {
                t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
            },
        }),
        (w.easing = {
            linear: function (t) {
                return t;
            },
            swing: function (t) {
                return 0.5 - Math.cos(t * Math.PI) / 2;
            },
            _default: "swing",
        }),
        (w.fx = tQ.prototype.init),
        (w.fx.step = {});
    var tZ,
        tJ,
        et,
        ee,
        en = /^(?:toggle|show|hide)$/,
        ei = /queueHooks$/;
    function er() {
        return (
            t.setTimeout(function () {
                tZ = void 0;
            }),
            (tZ = Date.now())
        );
    }
    function es(t, e) {
        var n,
            i = 0,
            r = { height: t };
        for (e = e ? 1 : 0; i < 4; i += 2 - e) r["margin" + (n = tf[i])] = r["padding" + n] = t;
        return e && (r.opacity = r.width = t), r;
    }
    function eo(t, e, n) {
        for (var i, r = (ea.tweeners[e] || []).concat(ea.tweeners["*"]), s = 0, o = r.length; s < o; s++) if ((i = r[s].call(n, e, t))) return i;
    }
    function ea(t, e, n) {
        var i,
            r,
            s = 0,
            o = ea.prefilters.length,
            a = w.Deferred().always(function () {
                delete l.elem;
            }),
            l = function () {
                if (r) return !1;
                for (var e = tZ || er(), n = Math.max(0, c.startTime + c.duration - e), i = 1 - (n / c.duration || 0), s = 0, o = c.tweens.length; s < o; s++) c.tweens[s].run(i);
                return a.notifyWith(t, [c, i, n]), i < 1 && o ? n : (o || a.notifyWith(t, [c, 1, 0]), a.resolveWith(t, [c]), !1);
            },
            c = a.promise({
                elem: t,
                props: w.extend({}, e),
                opts: w.extend(!0, { specialEasing: {}, easing: w.easing._default }, n),
                originalProperties: e,
                originalOptions: n,
                startTime: tZ || er(),
                duration: n.duration,
                tweens: [],
                createTween: function (e, n) {
                    var i = w.Tween(t, c.opts, e, n, c.opts.specialEasing[e] || c.opts.easing);
                    return c.tweens.push(i), i;
                },
                stop: function (e) {
                    var n = 0,
                        i = e ? c.tweens.length : 0;
                    if (r) return this;
                    for (r = !0; n < i; n++) c.tweens[n].run(1);
                    return e ? (a.notifyWith(t, [c, 1, 0]), a.resolveWith(t, [c, e])) : a.rejectWith(t, [c, e]), this;
                },
            }),
            u = c.props;
        for (
            (function (t, e) {
                var n, i, r, s, o;
                for (n in t)
                    if (((r = e[(i = tn(n))]), Array.isArray((s = t[n])) && ((r = s[1]), (s = t[n] = s[0])), n !== i && ((t[i] = s), delete t[n]), (o = w.cssHooks[i]) && ("expand" in o)))
                        for (n in ((s = o.expand(s)), delete t[i], s)) (n in t) || ((t[n] = s[n]), (e[n] = r));
                    else e[i] = r;
            })(u, c.opts.specialEasing);
            s < o;
            s++
        )
            if ((i = ea.prefilters[s].call(c, t, u, c.opts))) return p(i.stop) && (w._queueHooks(c.elem, c.opts.queue).stop = i.stop.bind(i)), i;
        return (
            w.map(u, eo, c),
            p(c.opts.start) && c.opts.start.call(t, c),
            c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always),
            w.fx.timer(w.extend(l, { elem: t, anim: c, queue: c.opts.queue })),
            c
        );
    }
    (w.Animation = w.extend(ea, {
        tweeners: {
            "*": [
                function (t, e) {
                    var n = this.createTween(t, e);
                    return tg(n.elem, t, th.exec(e), n), n;
                },
            ],
        },
        tweener: function (t, e) {
            p(t) ? ((e = t), (t = ["*"])) : (t = t.match(X));
            for (var n, i = 0, r = t.length; i < r; i++) (n = t[i]), (ea.tweeners[n] = ea.tweeners[n] || []), ea.tweeners[n].unshift(e);
        },
        prefilters: [
            function (t, e, n) {
                var i,
                    r,
                    s,
                    o,
                    a,
                    l,
                    c,
                    u,
                    h = "width" in e || "height" in e,
                    f = this,
                    d = {},
                    p = t.style,
                    m = t.nodeType && tm(t),
                    g = ts.get(t, "fxshow");
                for (i in (n.queue ||
                    (null == (o = w._queueHooks(t, "fx")).unqueued &&
                        ((o.unqueued = 0),
                        (a = o.empty.fire),
                        (o.empty.fire = function () {
                            o.unqueued || a();
                        })),
                    o.unqueued++,
                    f.always(function () {
                        f.always(function () {
                            o.unqueued--, w.queue(t, "fx").length || o.empty.fire();
                        });
                    })),
                e))
                    if (((r = e[i]), en.test(r))) {
                        if ((delete e[i], (s = s || "toggle" === r), r === (m ? "hide" : "show"))) {
                            if ("show" !== r || !g || void 0 === g[i]) continue;
                            m = !0;
                        }
                        d[i] = (g && g[i]) || w.style(t, i);
                    }
                if ((l = !w.isEmptyObject(e)) || !w.isEmptyObject(d))
                    for (i in (h &&
                        1 === t.nodeType &&
                        ((n.overflow = [p.overflow, p.overflowX, p.overflowY]),
                        null == (c = g && g.display) && (c = ts.get(t, "display")),
                        "none" === (u = w.css(t, "display")) && (c ? (u = c) : (ty([t], !0), (c = t.style.display || c), (u = w.css(t, "display")), ty([t]))),
                        ("inline" === u || ("inline-block" === u && null != c)) &&
                            "none" === w.css(t, "float") &&
                            (l ||
                                (f.done(function () {
                                    p.display = c;
                                }),
                                null == c && (c = "none" === (u = p.display) ? "" : u)),
                            (p.display = "inline-block"))),
                    n.overflow &&
                        ((p.overflow = "hidden"),
                        f.always(function () {
                            (p.overflow = n.overflow[0]), (p.overflowX = n.overflow[1]), (p.overflowY = n.overflow[2]);
                        })),
                    (l = !1),
                    d))
                        l ||
                            (g ? "hidden" in g && (m = g.hidden) : (g = ts.access(t, "fxshow", { display: c })),
                            s && (g.hidden = !m),
                            m && ty([t], !0),
                            f.done(function () {
                                for (i in (m || ty([t]), ts.remove(t, "fxshow"), d)) w.style(t, i, d[i]);
                            })),
                            (l = eo(m ? g[i] : 0, i, f)),
                            i in g || ((g[i] = l.start), m && ((l.end = l.start), (l.start = 0)));
            },
        ],
        prefilter: function (t, e) {
            e ? ea.prefilters.unshift(t) : ea.prefilters.push(t);
        },
    })),
        (w.speed = function (t, e, n) {
            var i = t && "object" == typeof t ? w.extend({}, t) : { complete: n || (!n && e) || (p(t) && t), duration: t, easing: (n && e) || (e && !p(e) && e) };
            return (
                w.fx.off ? (i.duration = 0) : "number" != typeof i.duration && (i.duration in w.fx.speeds ? (i.duration = w.fx.speeds[i.duration]) : (i.duration = w.fx.speeds._default)),
                (null != i.queue && !0 !== i.queue) || (i.queue = "fx"),
                (i.old = i.complete),
                (i.complete = function () {
                    p(i.old) && i.old.call(this), i.queue && w.dequeue(this, i.queue);
                }),
                i
            );
        }),
        w.fn.extend({
            fadeTo: function (t, e, n, i) {
                return this.filter(tm).css("opacity", 0).show().end().animate({ opacity: e }, t, n, i);
            },
            animate: function (t, e, n, i) {
                var r = w.isEmptyObject(t),
                    s = w.speed(e, n, i),
                    o = function () {
                        var e = ea(this, w.extend({}, t), s);
                        (r || ts.get(this, "finish")) && e.stop(!0);
                    };
                return (o.finish = o), r || !1 === s.queue ? this.each(o) : this.queue(s.queue, o);
            },
            stop: function (t, e, n) {
                var i = function (t) {
                    var e = t.stop;
                    delete t.stop, e(n);
                };
                return (
                    "string" != typeof t && ((n = e), (e = t), (t = void 0)),
                    e && this.queue(t || "fx", []),
                    this.each(function () {
                        var e = !0,
                            r = null != t && t + "queueHooks",
                            s = w.timers,
                            o = ts.get(this);
                        if (r) o[r] && o[r].stop && i(o[r]);
                        else for (r in o) o[r] && o[r].stop && ei.test(r) && i(o[r]);
                        for (r = s.length; r--; ) s[r].elem !== this || (null != t && s[r].queue !== t) || (s[r].anim.stop(n), (e = !1), s.splice(r, 1));
                        (!e && n) || w.dequeue(this, t);
                    })
                );
            },
            finish: function (t) {
                return (
                    !1 !== t && (t = t || "fx"),
                    this.each(function () {
                        var e,
                            n = ts.get(this),
                            i = n[t + "queue"],
                            r = n[t + "queueHooks"],
                            s = w.timers,
                            o = i ? i.length : 0;
                        for (n.finish = !0, w.queue(this, t, []), r && r.stop && r.stop.call(this, !0), e = s.length; e--; ) s[e].elem === this && s[e].queue === t && (s[e].anim.stop(!0), s.splice(e, 1));
                        for (e = 0; e < o; e++) i[e] && i[e].finish && i[e].finish.call(this);
                        delete n.finish;
                    })
                );
            },
        }),
        w.each(["toggle", "show", "hide"], function (t, e) {
            var n = w.fn[e];
            w.fn[e] = function (t, i, r) {
                return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(es(e, !0), t, i, r);
            };
        }),
        w.each({ slideDown: es("show"), slideUp: es("hide"), slideToggle: es("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (t, e) {
            w.fn[t] = function (t, n, i) {
                return this.animate(e, t, n, i);
            };
        }),
        (w.timers = []),
        (w.fx.tick = function () {
            var t,
                e = 0,
                n = w.timers;
            for (tZ = Date.now(); e < n.length; e++) (t = n[e])() || n[e] !== t || n.splice(e--, 1);
            n.length || w.fx.stop(), (tZ = void 0);
        }),
        (w.fx.timer = function (t) {
            w.timers.push(t), w.fx.start();
        }),
        (w.fx.interval = 13),
        (w.fx.start = function () {
            tJ ||
                ((tJ = !0),
                (function e() {
                    tJ && (!1 === g.hidden && t.requestAnimationFrame ? t.requestAnimationFrame(e) : t.setTimeout(e, w.fx.interval), w.fx.tick());
                })());
        }),
        (w.fx.stop = function () {
            tJ = null;
        }),
        (w.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
        (w.fn.delay = function (e, n) {
            return (
                (e = (w.fx && w.fx.speeds[e]) || e),
                (n = n || "fx"),
                this.queue(n, function (n, i) {
                    var r = t.setTimeout(n, e);
                    i.stop = function () {
                        t.clearTimeout(r);
                    };
                })
            );
        }),
        (et = g.createElement("input")),
        (ee = g.createElement("select").appendChild(g.createElement("option"))),
        (et.type = "checkbox"),
        (d.checkOn = "" !== et.value),
        (d.optSelected = ee.selected),
        ((et = g.createElement("input")).value = "t"),
        (et.type = "radio"),
        (d.radioValue = "t" === et.value);
    var el,
        ec = w.expr.attrHandle;
    w.fn.extend({
        attr: function (t, e) {
            return Z(this, w.attr, t, e, 1 < arguments.length);
        },
        removeAttr: function (t) {
            return this.each(function () {
                w.removeAttr(this, t);
            });
        },
    }),
        w.extend({
            attr: function (t, e, n) {
                var i,
                    r,
                    s = t.nodeType;
                if (3 !== s && 8 !== s && 2 !== s)
                    return void 0 === t.getAttribute
                        ? w.prop(t, e, n)
                        : ((1 === s && w.isXMLDoc(t)) || (r = w.attrHooks[e.toLowerCase()] || (w.expr.match.bool.test(e) ? el : void 0)),
                          void 0 !== n
                              ? null === n
                                  ? void w.removeAttr(t, e)
                                  : r && "set" in r && void 0 !== (i = r.set(t, n, e))
                                  ? i
                                  : (t.setAttribute(e, n + ""), n)
                              : r && "get" in r && null !== (i = r.get(t, e))
                              ? i
                              : null == (i = w.find.attr(t, e))
                              ? void 0
                              : i);
            },
            attrHooks: {
                type: {
                    set: function (t, e) {
                        if (!d.radioValue && "radio" === e && k(t, "input")) {
                            var n = t.value;
                            return t.setAttribute("type", e), n && (t.value = n), e;
                        }
                    },
                },
            },
            removeAttr: function (t, e) {
                var n,
                    i = 0,
                    r = e && e.match(X);
                if (r && 1 === t.nodeType) for (; (n = r[i++]); ) t.removeAttribute(n);
            },
        }),
        (el = {
            set: function (t, e, n) {
                return !1 === e ? w.removeAttr(t, n) : t.setAttribute(n, n), n;
            },
        }),
        w.each(w.expr.match.bool.source.match(/\w+/g), function (t, e) {
            var n = ec[e] || w.find.attr;
            ec[e] = function (t, e, i) {
                var r,
                    s,
                    o = e.toLowerCase();
                return i || ((s = ec[o]), (ec[o] = r), (r = null != n(t, e, i) ? o : null), (ec[o] = s)), r;
            };
        });
    var eu = /^(?:input|select|textarea|button)$/i,
        eh = /^(?:a|area)$/i;
    function ef(t) {
        return (t.match(X) || []).join(" ");
    }
    function ed(t) {
        return (t.getAttribute && t.getAttribute("class")) || "";
    }
    function ep(t) {
        return Array.isArray(t) ? t : ("string" == typeof t && t.match(X)) || [];
    }
    w.fn.extend({
        prop: function (t, e) {
            return Z(this, w.prop, t, e, 1 < arguments.length);
        },
        removeProp: function (t) {
            return this.each(function () {
                delete this[w.propFix[t] || t];
            });
        },
    }),
        w.extend({
            prop: function (t, e, n) {
                var i,
                    r,
                    s = t.nodeType;
                if (3 !== s && 8 !== s && 2 !== s)
                    return (
                        (1 === s && w.isXMLDoc(t)) || ((e = w.propFix[e] || e), (r = w.propHooks[e])),
                        void 0 !== n ? (r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i : (t[e] = n)) : r && "get" in r && null !== (i = r.get(t, e)) ? i : t[e]
                    );
            },
            propHooks: {
                tabIndex: {
                    get: function (t) {
                        var e = w.find.attr(t, "tabindex");
                        return e ? parseInt(e, 10) : eu.test(t.nodeName) || (eh.test(t.nodeName) && t.href) ? 0 : -1;
                    },
                },
            },
            propFix: { for: "htmlFor", class: "className" },
        }),
        d.optSelected ||
            (w.propHooks.selected = {
                get: function (t) {
                    var e = t.parentNode;
                    return e && e.parentNode && e.parentNode.selectedIndex, null;
                },
                set: function (t) {
                    var e = t.parentNode;
                    e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex);
                },
            }),
        w.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            w.propFix[this.toLowerCase()] = this;
        }),
        w.fn.extend({
            addClass: function (t) {
                var e, n, i, r, s, o;
                return p(t)
                    ? this.each(function (e) {
                          w(this).addClass(t.call(this, e, ed(this)));
                      })
                    : (e = ep(t)).length
                    ? this.each(function () {
                          if (((i = ed(this)), (n = 1 === this.nodeType && " " + ef(i) + " "))) {
                              for (s = 0; s < e.length; s++) (r = e[s]), 0 > n.indexOf(" " + r + " ") && (n += r + " ");
                              i !== (o = ef(n)) && this.setAttribute("class", o);
                          }
                      })
                    : this;
            },
            removeClass: function (t) {
                var e, n, i, r, s, o;
                return p(t)
                    ? this.each(function (e) {
                          w(this).removeClass(t.call(this, e, ed(this)));
                      })
                    : arguments.length
                    ? (e = ep(t)).length
                        ? this.each(function () {
                              if (((i = ed(this)), (n = 1 === this.nodeType && " " + ef(i) + " "))) {
                                  for (s = 0; s < e.length; s++) for (r = e[s]; -1 < n.indexOf(" " + r + " "); ) n = n.replace(" " + r + " ", " ");
                                  i !== (o = ef(n)) && this.setAttribute("class", o);
                              }
                          })
                        : this
                    : this.attr("class", "");
            },
            toggleClass: function (t, e) {
                var n,
                    i,
                    r,
                    s,
                    o = typeof t,
                    a = "string" === o || Array.isArray(t);
                return p(t)
                    ? this.each(function (n) {
                          w(this).toggleClass(t.call(this, n, ed(this), e), e);
                      })
                    : "boolean" == typeof e && a
                    ? e
                        ? this.addClass(t)
                        : this.removeClass(t)
                    : ((n = ep(t)),
                      this.each(function () {
                          if (a) for (s = w(this), r = 0; r < n.length; r++) (i = n[r]), s.hasClass(i) ? s.removeClass(i) : s.addClass(i);
                          else (void 0 !== t && "boolean" !== o) || ((i = ed(this)) && ts.set(this, "__className__", i), this.setAttribute && this.setAttribute("class", i || !1 === t ? "" : ts.get(this, "__className__") || ""));
                      }));
            },
            hasClass: function (t) {
                var e,
                    n,
                    i = 0;
                for (e = " " + t + " "; (n = this[i++]); ) if (1 === n.nodeType && -1 < (" " + ef(ed(n)) + " ").indexOf(e)) return !0;
                return !1;
            },
        });
    var e$ = /\r/g;
    w.fn.extend({
        val: function (t) {
            var e,
                n,
                i,
                r = this[0];
            return arguments.length
                ? ((i = p(t)),
                  this.each(function (n) {
                      var r;
                      1 === this.nodeType &&
                          (null == (r = i ? t.call(this, n, w(this).val()) : t)
                              ? (r = "")
                              : "number" == typeof r
                              ? (r += "")
                              : Array.isArray(r) &&
                                (r = w.map(r, function (t) {
                                    return null == t ? "" : t + "";
                                })),
                          ((e = w.valHooks[this.type] || w.valHooks[this.nodeName.toLowerCase()]) && "set" in e && void 0 !== e.set(this, r, "value")) || (this.value = r));
                  }))
                : r
                ? (e = w.valHooks[r.type] || w.valHooks[r.nodeName.toLowerCase()]) && "get" in e && void 0 !== (n = e.get(r, "value"))
                    ? n
                    : "string" == typeof (n = r.value)
                    ? n.replace(e$, "")
                    : null == n
                    ? ""
                    : n
                : void 0;
        },
    }),
        w.extend({
            valHooks: {
                option: {
                    get: function (t) {
                        var e = w.find.attr(t, "value");
                        return null != e ? e : ef(w.text(t));
                    },
                },
                select: {
                    get: function (t) {
                        var e,
                            n,
                            i,
                            r = t.options,
                            s = t.selectedIndex,
                            o = "select-one" === t.type,
                            a = o ? null : [],
                            l = o ? s + 1 : r.length;
                        for (i = s < 0 ? l : o ? s : 0; i < l; i++)
                            if (((n = r[i]).selected || i === s) && !n.disabled && (!n.parentNode.disabled || !k(n.parentNode, "optgroup"))) {
                                if (((e = w(n).val()), o)) return e;
                                a.push(e);
                            }
                        return a;
                    },
                    set: function (t, e) {
                        for (var n, i, r = t.options, s = w.makeArray(e), o = r.length; o--; ) ((i = r[o]).selected = -1 < w.inArray(w.valHooks.option.get(i), s)) && (n = !0);
                        return n || (t.selectedIndex = -1), s;
                    },
                },
            },
        }),
        w.each(["radio", "checkbox"], function () {
            (w.valHooks[this] = {
                set: function (t, e) {
                    if (Array.isArray(e)) return (t.checked = -1 < w.inArray(w(t).val(), e));
                },
            }),
                d.checkOn ||
                    (w.valHooks[this].get = function (t) {
                        return null === t.getAttribute("value") ? "on" : t.value;
                    });
        });
    var em = t.location,
        eg = { guid: Date.now() },
        ev = /\?/;
    w.parseXML = function (e) {
        var n, i;
        if (!e || "string" != typeof e) return null;
        try {
            n = new t.DOMParser().parseFromString(e, "text/xml");
        } catch (r) {}
        return (
            (i = n && n.getElementsByTagName("parsererror")[0]),
            (n && !i) ||
                w.error(
                    "Invalid XML: " +
                        (i
                            ? w
                                  .map(i.childNodes, function (t) {
                                      return t.textContent;
                                  })
                                  .join("\n")
                            : e)
                ),
            n
        );
    };
    var ey = /^(?:focusinfocus|focusoutblur)$/,
        e_ = function (t) {
            t.stopPropagation();
        };
    w.extend(w.event, {
        trigger: function (e, n, i, r) {
            var s,
                o,
                a,
                l,
                c,
                h,
                f,
                d,
                v = [i || g],
                y = u.call(e, "type") ? e.type : e,
                _ = u.call(e, "namespace") ? e.namespace.split(".") : [];
            if (
                ((o = d = a = i = i || g),
                3 !== i.nodeType &&
                    8 !== i.nodeType &&
                    !ey.test(y + w.event.triggered) &&
                    (-1 < y.indexOf(".") && ((y = (_ = y.split(".")).shift()), _.sort()),
                    (c = 0 > y.indexOf(":") && "on" + y),
                    ((e = e[w.expando] ? e : new w.Event(y, "object" == typeof e && e)).isTrigger = r ? 2 : 3),
                    (e.namespace = _.join(".")),
                    (e.rnamespace = e.namespace ? RegExp("(^|\\.)" + _.join("\\.(?:.*\\.|)") + "(\\.|$)") : null),
                    (e.result = void 0),
                    e.target || (e.target = i),
                    (n = null == n ? [e] : w.makeArray(n, [e])),
                    (f = w.event.special[y] || {}),
                    r || !f.trigger || !1 !== f.trigger.apply(i, n)))
            ) {
                if (!r && !f.noBubble && !m(i)) {
                    for (l = f.delegateType || y, ey.test(l + y) || (o = o.parentNode); o; o = o.parentNode) v.push(o), (a = o);
                    a === (i.ownerDocument || g) && v.push(a.defaultView || a.parentWindow || t);
                }
                for (s = 0; (o = v[s++]) && !e.isPropagationStopped(); )
                    (d = o),
                        (e.type = 1 < s ? l : f.bindType || y),
                        (h = (ts.get(o, "events") || Object.create(null))[e.type] && ts.get(o, "handle")) && h.apply(o, n),
                        (h = c && o[c]) && h.apply && ti(o) && ((e.result = h.apply(o, n)), !1 === e.result && e.preventDefault());
                return (
                    (e.type = y),
                    r ||
                        e.isDefaultPrevented() ||
                        (f._default && !1 !== f._default.apply(v.pop(), n)) ||
                        !ti(i) ||
                        (c &&
                            p(i[y]) &&
                            !m(i) &&
                            ((a = i[c]) && (i[c] = null),
                            (w.event.triggered = y),
                            e.isPropagationStopped() && d.addEventListener(y, e_),
                            i[y](),
                            e.isPropagationStopped() && d.removeEventListener(y, e_),
                            (w.event.triggered = void 0),
                            a && (i[c] = a))),
                    e.result
                );
            }
        },
        simulate: function (t, e, n) {
            var i = w.extend(new w.Event(), n, { type: t, isSimulated: !0 });
            w.event.trigger(i, null, e);
        },
    }),
        w.fn.extend({
            trigger: function (t, e) {
                return this.each(function () {
                    w.event.trigger(t, e, this);
                });
            },
            triggerHandler: function (t, e) {
                var n = this[0];
                if (n) return w.event.trigger(t, e, n, !0);
            },
        });
    var e8 = /\[\]$/,
        eb = /\r?\n/g,
        ex = /^(?:submit|button|image|reset|file)$/i,
        ew = /^(?:input|select|textarea|keygen)/i;
    function eT(t, e, n, i) {
        var r;
        if (Array.isArray(e))
            w.each(e, function (e, r) {
                n || e8.test(t) ? i(t, r) : eT(t + "[" + ("object" == typeof r && null != r ? e : "") + "]", r, n, i);
            });
        else if (n || "object" !== _(e)) i(t, e);
        else for (r in e) eT(t + "[" + r + "]", e[r], n, i);
    }
    (w.param = function (t, e) {
        var n,
            i = [],
            r = function (t, e) {
                var n = p(e) ? e() : e;
                i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(null == n ? "" : n);
            };
        if (null == t) return "";
        if (Array.isArray(t) || (t.jquery && !w.isPlainObject(t)))
            w.each(t, function () {
                r(this.name, this.value);
            });
        else for (n in t) eT(n, t[n], e, r);
        return i.join("&");
    }),
        w.fn.extend({
            serialize: function () {
                return w.param(this.serializeArray());
            },
            serializeArray: function () {
                return this.map(function () {
                    var t = w.prop(this, "elements");
                    return t ? w.makeArray(t) : this;
                })
                    .filter(function () {
                        var t = this.type;
                        return this.name && !w(this).is(":disabled") && ew.test(this.nodeName) && !ex.test(t) && (this.checked || !tb.test(t));
                    })
                    .map(function (t, e) {
                        var n = w(this).val();
                        return null == n
                            ? null
                            : Array.isArray(n)
                            ? w.map(n, function (t) {
                                  return { name: e.name, value: t.replace(eb, "\r\n") };
                              })
                            : { name: e.name, value: n.replace(eb, "\r\n") };
                    })
                    .get();
            },
        });
    var ek = /%20/g,
        eS = /#.*$/,
        eC = /([?&])_=[^&]*/,
        eE = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        eA = /^(?:GET|HEAD)$/,
        eD = /^\/\//,
        eO = {},
        e0 = {},
        eL = "*/".concat("*"),
        eP = g.createElement("a");
    function ej(t) {
        return function (e, n) {
            "string" != typeof e && ((n = e), (e = "*"));
            var i,
                r = 0,
                s = e.toLowerCase().match(X) || [];
            if (p(n)) for (; (i = s[r++]); ) "+" === i[0] ? (t[(i = i.slice(1) || "*")] = t[i] || []).unshift(n) : (t[i] = t[i] || []).push(n);
        };
    }
    function eR(t, e, n, i) {
        var r = {},
            s = t === e0;
        function o(a) {
            var l;
            return (
                (r[a] = !0),
                w.each(t[a] || [], function (t, a) {
                    var c = a(e, n, i);
                    return "string" != typeof c || s || r[c] ? (s ? !(l = c) : void 0) : (e.dataTypes.unshift(c), o(c), !1);
                }),
                l
            );
        }
        return o(e.dataTypes[0]) || (!r["*"] && o("*"));
    }
    function eH(t, e) {
        var n,
            i,
            r = w.ajaxSettings.flatOptions || {};
        for (n in e) void 0 !== e[n] && ((r[n] ? t : i || (i = {}))[n] = e[n]);
        return i && w.extend(!0, t, i), t;
    }
    (eP.href = em.href),
        w.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: em.href,
                type: "GET",
                isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(em.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: { "*": eL, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" },
                contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" },
                converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": w.parseXML },
                flatOptions: { url: !0, context: !0 },
            },
            ajaxSetup: function (t, e) {
                return e ? eH(eH(t, w.ajaxSettings), e) : eH(w.ajaxSettings, t);
            },
            ajaxPrefilter: ej(eO),
            ajaxTransport: ej(e0),
            ajax: function (e, n) {
                "object" == typeof e && ((n = e), (e = void 0)), (n = n || {});
                var i,
                    r,
                    s,
                    o,
                    a,
                    l,
                    c,
                    u,
                    h,
                    f,
                    d = w.ajaxSetup({}, n),
                    p = d.context || d,
                    m = d.context && (p.nodeType || p.jquery) ? w(p) : w.event,
                    v = w.Deferred(),
                    y = w.Callbacks("once memory"),
                    _ = d.statusCode || {},
                    b = {},
                    x = {},
                    T = "canceled",
                    k = {
                        readyState: 0,
                        getResponseHeader: function (t) {
                            var e;
                            if (c) {
                                if (!o) for (o = {}; (e = eE.exec(s)); ) o[e[1].toLowerCase() + " "] = (o[e[1].toLowerCase() + " "] || []).concat(e[2]);
                                e = o[t.toLowerCase() + " "];
                            }
                            return null == e ? null : e.join(", ");
                        },
                        getAllResponseHeaders: function () {
                            return c ? s : null;
                        },
                        setRequestHeader: function (t, e) {
                            return null == c && (b[(t = x[t.toLowerCase()] = x[t.toLowerCase()] || t)] = e), this;
                        },
                        overrideMimeType: function (t) {
                            return null == c && (d.mimeType = t), this;
                        },
                        statusCode: function (t) {
                            var e;
                            if (t) {
                                if (c) k.always(t[k.status]);
                                else for (e in t) _[e] = [_[e], t[e]];
                            }
                            return this;
                        },
                        abort: function (t) {
                            var e = t || T;
                            return i && i.abort(e), E(0, e), this;
                        },
                    };
                if (
                    (v.promise(k),
                    (d.url = ((e || d.url || em.href) + "").replace(eD, em.protocol + "//")),
                    (d.type = n.method || n.type || d.method || d.type),
                    (d.dataTypes = (d.dataType || "*").toLowerCase().match(X) || [""]),
                    null == d.crossDomain)
                ) {
                    l = g.createElement("a");
                    try {
                        (l.href = d.url), (l.href = l.href), (d.crossDomain = eP.protocol + "//" + eP.host != l.protocol + "//" + l.host);
                    } catch (S) {
                        d.crossDomain = !0;
                    }
                }
                if ((d.data && d.processData && "string" != typeof d.data && (d.data = w.param(d.data, d.traditional)), eR(eO, d, n, k), c)) return k;
                for (h in ((u = w.event && d.global) && 0 == w.active++ && w.event.trigger("ajaxStart"),
                (d.type = d.type.toUpperCase()),
                (d.hasContent = !eA.test(d.type)),
                (r = d.url.replace(eS, "")),
                d.hasContent
                    ? d.data && d.processData && 0 === (d.contentType || "").indexOf("application/x-www-form-urlencoded") && (d.data = d.data.replace(ek, "+"))
                    : ((f = d.url.slice(r.length)),
                      d.data && (d.processData || "string" == typeof d.data) && ((r += (ev.test(r) ? "&" : "?") + d.data), delete d.data),
                      !1 === d.cache && ((r = r.replace(eC, "$1")), (f = (ev.test(r) ? "&" : "?") + "_=" + eg.guid++ + f)),
                      (d.url = r + f)),
                d.ifModified && (w.lastModified[r] && k.setRequestHeader("If-Modified-Since", w.lastModified[r]), w.etag[r] && k.setRequestHeader("If-None-Match", w.etag[r])),
                ((d.data && d.hasContent && !1 !== d.contentType) || n.contentType) && k.setRequestHeader("Content-Type", d.contentType),
                k.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + eL + "; q=0.01" : "") : d.accepts["*"]),
                d.headers))
                    k.setRequestHeader(h, d.headers[h]);
                if (d.beforeSend && (!1 === d.beforeSend.call(p, k, d) || c)) return k.abort();
                if (((T = "abort"), y.add(d.complete), k.done(d.success), k.fail(d.error), (i = eR(e0, d, n, k)))) {
                    if (((k.readyState = 1), u && m.trigger("ajaxSend", [k, d]), c)) return k;
                    d.async &&
                        0 < d.timeout &&
                        (a = t.setTimeout(function () {
                            k.abort("timeout");
                        }, d.timeout));
                    try {
                        (c = !1), i.send(b, E);
                    } catch (C) {
                        if (c) throw C;
                        E(-1, C);
                    }
                } else E(-1, "No Transport");
                function E(e, n, o, l) {
                    var h,
                        f,
                        g,
                        b,
                        x,
                        T = n;
                    c ||
                        ((c = !0),
                        a && t.clearTimeout(a),
                        (i = void 0),
                        (s = l || ""),
                        (k.readyState = 0 < e ? 4 : 0),
                        (h = (200 <= e && e < 300) || 304 === e),
                        o &&
                            (b = (function (t, e, n) {
                                for (var i, r, s, o, a = t.contents, l = t.dataTypes; "*" === l[0]; ) l.shift(), void 0 === i && (i = t.mimeType || e.getResponseHeader("Content-Type"));
                                if (i) {
                                    for (r in a)
                                        if (a[r] && a[r].test(i)) {
                                            l.unshift(r);
                                            break;
                                        }
                                }
                                if (l[0] in n) s = l[0];
                                else {
                                    for (r in n) {
                                        if (!l[0] || t.converters[r + " " + l[0]]) {
                                            s = r;
                                            break;
                                        }
                                        o || (o = r);
                                    }
                                    s = s || o;
                                }
                                if (s) return s !== l[0] && l.unshift(s), n[s];
                            })(d, k, o)),
                        !h && -1 < w.inArray("script", d.dataTypes) && 0 > w.inArray("json", d.dataTypes) && (d.converters["text script"] = function () {}),
                        (b = (function (t, e, n, i) {
                            var r,
                                s,
                                o,
                                a,
                                l,
                                c = {},
                                u = t.dataTypes.slice();
                            if (u[1]) for (o in t.converters) c[o.toLowerCase()] = t.converters[o];
                            for (s = u.shift(); s; )
                                if ((t.responseFields[s] && (n[t.responseFields[s]] = e), !l && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), (l = s), (s = u.shift()))) {
                                    if ("*" === s) s = l;
                                    else if ("*" !== l && l !== s) {
                                        if (!(o = c[l + " " + s] || c["* " + s])) {
                                            for (r in c)
                                                if ((a = r.split(" "))[1] === s && (o = c[l + " " + a[0]] || c["* " + a[0]])) {
                                                    !0 === o ? (o = c[r]) : !0 !== c[r] && ((s = a[0]), u.unshift(a[1]));
                                                    break;
                                                }
                                        }
                                        if (!0 !== o) {
                                            if (o && t.throws) e = o(e);
                                            else
                                                try {
                                                    e = o(e);
                                                } catch (h) {
                                                    return { state: "parsererror", error: o ? h : "No conversion from " + l + " to " + s };
                                                }
                                        }
                                    }
                                }
                            return { state: "success", data: e };
                        })(d, b, k, h)),
                        h
                            ? (d.ifModified && ((x = k.getResponseHeader("Last-Modified")) && (w.lastModified[r] = x), (x = k.getResponseHeader("etag")) && (w.etag[r] = x)),
                              204 === e || "HEAD" === d.type ? (T = "nocontent") : 304 === e ? (T = "notmodified") : ((T = b.state), (f = b.data), (h = !(g = b.error))))
                            : ((g = T), (!e && T) || ((T = "error"), e < 0 && (e = 0))),
                        (k.status = e),
                        (k.statusText = (n || T) + ""),
                        h ? v.resolveWith(p, [f, T, k]) : v.rejectWith(p, [k, T, g]),
                        k.statusCode(_),
                        (_ = void 0),
                        u && m.trigger(h ? "ajaxSuccess" : "ajaxError", [k, d, h ? f : g]),
                        y.fireWith(p, [k, T]),
                        u && (m.trigger("ajaxComplete", [k, d]), --w.active || w.event.trigger("ajaxStop")));
                }
                return k;
            },
            getJSON: function (t, e, n) {
                return w.get(t, e, n, "json");
            },
            getScript: function (t, e) {
                return w.get(t, void 0, e, "script");
            },
        }),
        w.each(["get", "post"], function (t, e) {
            w[e] = function (t, n, i, r) {
                return p(n) && ((r = r || i), (i = n), (n = void 0)), w.ajax(w.extend({ url: t, type: e, dataType: r, data: n, success: i }, w.isPlainObject(t) && t));
            };
        }),
        w.ajaxPrefilter(function (t) {
            var e;
            for (e in t.headers) "content-type" === e.toLowerCase() && (t.contentType = t.headers[e] || "");
        }),
        (w._evalUrl = function (t, e, n) {
            return w.ajax({
                url: t,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                converters: { "text script": function () {} },
                dataFilter: function (t) {
                    w.globalEval(t, e, n);
                },
            });
        }),
        w.fn.extend({
            wrapAll: function (t) {
                var e;
                return (
                    this[0] &&
                        (p(t) && (t = t.call(this[0])),
                        (e = w(t, this[0].ownerDocument).eq(0).clone(!0)),
                        this[0].parentNode && e.insertBefore(this[0]),
                        e
                            .map(function () {
                                for (var t = this; t.firstElementChild; ) t = t.firstElementChild;
                                return t;
                            })
                            .append(this)),
                    this
                );
            },
            wrapInner: function (t) {
                return p(t)
                    ? this.each(function (e) {
                          w(this).wrapInner(t.call(this, e));
                      })
                    : this.each(function () {
                          var e = w(this),
                              n = e.contents();
                          n.length ? n.wrapAll(t) : e.append(t);
                      });
            },
            wrap: function (t) {
                var e = p(t);
                return this.each(function (n) {
                    w(this).wrapAll(e ? t.call(this, n) : t);
                });
            },
            unwrap: function (t) {
                return (
                    this.parent(t)
                        .not("body")
                        .each(function () {
                            w(this).replaceWith(this.childNodes);
                        }),
                    this
                );
            },
        }),
        (w.expr.pseudos.hidden = function (t) {
            return !w.expr.pseudos.visible(t);
        }),
        (w.expr.pseudos.visible = function (t) {
            return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
        }),
        (w.ajaxSettings.xhr = function () {
            try {
                return new t.XMLHttpRequest();
            } catch (e) {}
        });
    var eB = { 0: 200, 1223: 204 },
        e1 = w.ajaxSettings.xhr();
    (d.cors = !!e1 && "withCredentials" in e1),
        (d.ajax = e1 = !!e1),
        w.ajaxTransport(function (e) {
            var n, i;
            if (d.cors || (e1 && !e.crossDomain))
                return {
                    send: function (r, s) {
                        var o,
                            a = e.xhr();
                        if ((a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)) for (o in e.xhrFields) a[o] = e.xhrFields[o];
                        for (o in (e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest"), r)) a.setRequestHeader(o, r[o]);
                        (n = function (t) {
                            return function () {
                                n &&
                                    ((n = i = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null),
                                    "abort" === t
                                        ? a.abort()
                                        : "error" === t
                                        ? "number" != typeof a.status
                                            ? s(0, "error")
                                            : s(a.status, a.statusText)
                                        : s(eB[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? { binary: a.response } : { text: a.responseText }, a.getAllResponseHeaders()));
                            };
                        }),
                            (a.onload = n()),
                            (i = a.onerror = a.ontimeout = n("error")),
                            void 0 !== a.onabort
                                ? (a.onabort = i)
                                : (a.onreadystatechange = function () {
                                      4 === a.readyState &&
                                          t.setTimeout(function () {
                                              n && i();
                                          });
                                  }),
                            (n = n("abort"));
                        try {
                            a.send((e.hasContent && e.data) || null);
                        } catch (l) {
                            if (n) throw l;
                        }
                    },
                    abort: function () {
                        n && n();
                    },
                };
        }),
        w.ajaxPrefilter(function (t) {
            t.crossDomain && (t.contents.script = !1);
        }),
        w.ajaxSetup({
            accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
            contents: { script: /\b(?:java|ecma)script\b/ },
            converters: {
                "text script": function (t) {
                    return w.globalEval(t), t;
                },
            },
        }),
        w.ajaxPrefilter("script", function (t) {
            void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET");
        }),
        w.ajaxTransport("script", function (t) {
            var e, n;
            if (t.crossDomain || t.scriptAttrs)
                return {
                    send: function (i, r) {
                        (e = w("<script>")
                            .attr(t.scriptAttrs || {})
                            .prop({ charset: t.scriptCharset, src: t.url })
                            .on(
                                "load error",
                                (n = function (t) {
                                    e.remove(), (n = null), t && r("error" === t.type ? 404 : 200, t.type);
                                })
                            )),
                            g.head.appendChild(e[0]);
                    },
                    abort: function () {
                        n && n();
                    },
                };
        });
    var eM,
        eq = [],
        eN = /(=)\?(?=&|$)|\?\?/;
    w.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var t = eq.pop() || w.expando + "_" + eg.guid++;
            return (this[t] = !0), t;
        },
    }),
        w.ajaxPrefilter("json jsonp", function (e, n, i) {
            var r,
                s,
                o,
                a = !1 !== e.jsonp && (eN.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && eN.test(e.data) && "data");
            if (a || "jsonp" === e.dataTypes[0])
                return (
                    (r = e.jsonpCallback = p(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
                    a ? (e[a] = e[a].replace(eN, "$1" + r)) : !1 !== e.jsonp && (e.url += (ev.test(e.url) ? "&" : "?") + e.jsonp + "=" + r),
                    (e.converters["script json"] = function () {
                        return o || w.error(r + " was not called"), o[0];
                    }),
                    (e.dataTypes[0] = "json"),
                    (s = t[r]),
                    (t[r] = function () {
                        o = arguments;
                    }),
                    i.always(function () {
                        void 0 === s ? w(t).removeProp(r) : (t[r] = s), e[r] && ((e.jsonpCallback = n.jsonpCallback), eq.push(r)), o && p(s) && s(o[0]), (o = s = void 0);
                    }),
                    "script"
                );
        }),
        (d.createHTMLDocument = (((eM = g.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>"), 2 === eM.childNodes.length)),
        (w.parseHTML = function (t, e, n) {
            var i, r, s;
            return "string" != typeof t
                ? []
                : ("boolean" == typeof e && ((n = e), (e = !1)),
                  e || (d.createHTMLDocument ? (((i = (e = g.implementation.createHTMLDocument("")).createElement("base")).href = g.location.href), e.head.appendChild(i)) : (e = g)),
                  (s = !n && []),
                  (r = M.exec(t)) ? [e.createElement(r[1])] : ((r = tE([t], e, s)), s && s.length && w(s).remove(), w.merge([], r.childNodes)));
        }),
        (w.fn.load = function (t, e, n) {
            var i,
                r,
                s,
                o = this,
                a = t.indexOf(" ");
            return (
                -1 < a && ((i = ef(t.slice(a))), (t = t.slice(0, a))),
                p(e) ? ((n = e), (e = void 0)) : e && "object" == typeof e && (r = "POST"),
                0 < o.length &&
                    w
                        .ajax({ url: t, type: r || "GET", dataType: "html", data: e })
                        .done(function (t) {
                            (s = arguments), o.html(i ? w("<div>").append(w.parseHTML(t)).find(i) : t);
                        })
                        .always(
                            n &&
                                function (t, e) {
                                    o.each(function () {
                                        n.apply(this, s || [t.responseText, e, t]);
                                    });
                                }
                        ),
                this
            );
        }),
        (w.expr.pseudos.animated = function (t) {
            return w.grep(w.timers, function (e) {
                return t === e.elem;
            }).length;
        }),
        (w.offset = {
            setOffset: function (t, e, n) {
                var i,
                    r,
                    s,
                    o,
                    a,
                    l,
                    c = w.css(t, "position"),
                    u = w(t),
                    h = {};
                "static" === c && (t.style.position = "relative"),
                    (a = u.offset()),
                    (s = w.css(t, "top")),
                    (l = w.css(t, "left")),
                    ("absolute" === c || "fixed" === c) && -1 < (s + l).indexOf("auto") ? ((o = (i = u.position()).top), (r = i.left)) : ((o = parseFloat(s) || 0), (r = parseFloat(l) || 0)),
                    p(e) && (e = e.call(t, n, w.extend({}, a))),
                    null != e.top && (h.top = e.top - a.top + o),
                    null != e.left && (h.left = e.left - a.left + r),
                    "using" in e ? e.using.call(t, h) : u.css(h);
            },
        }),
        w.fn.extend({
            offset: function (t) {
                if (arguments.length)
                    return void 0 === t
                        ? this
                        : this.each(function (e) {
                              w.offset.setOffset(this, t, e);
                          });
                var e,
                    n,
                    i = this[0];
                return i ? (i.getClientRects().length ? ((e = i.getBoundingClientRect()), (n = i.ownerDocument.defaultView), { top: e.top + n.pageYOffset, left: e.left + n.pageXOffset }) : { top: 0, left: 0 }) : void 0;
            },
            position: function () {
                if (this[0]) {
                    var t,
                        e,
                        n,
                        i = this[0],
                        r = { top: 0, left: 0 };
                    if ("fixed" === w.css(i, "position")) e = i.getBoundingClientRect();
                    else {
                        for (e = this.offset(), n = i.ownerDocument, t = i.offsetParent || n.documentElement; t && (t === n.body || t === n.documentElement) && "static" === w.css(t, "position"); ) t = t.parentNode;
                        t && t !== i && 1 === t.nodeType && (((r = w(t).offset()).top += w.css(t, "borderTopWidth", !0)), (r.left += w.css(t, "borderLeftWidth", !0)));
                    }
                    return { top: e.top - r.top - w.css(i, "marginTop", !0), left: e.left - r.left - w.css(i, "marginLeft", !0) };
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    for (var t = this.offsetParent; t && "static" === w.css(t, "position"); ) t = t.offsetParent;
                    return t || td;
                });
            },
        }),
        w.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (t, e) {
            var n = "pageYOffset" === e;
            w.fn[t] = function (i) {
                return Z(
                    this,
                    function (t, i, r) {
                        var s;
                        if ((m(t) ? (s = t) : 9 === t.nodeType && (s = t.defaultView), void 0 === r)) return s ? s[e] : t[i];
                        s ? s.scrollTo(n ? s.pageXOffset : r, n ? r : s.pageYOffset) : (t[i] = r);
                    },
                    t,
                    i,
                    arguments.length
                );
            };
        }),
        w.each(["top", "left"], function (t, e) {
            w.cssHooks[e] = t2(d.pixelPosition, function (t, n) {
                if (n) return (n = tX(t, e)), tz.test(n) ? w(t).position()[e] + "px" : n;
            });
        }),
        w.each({ Height: "height", Width: "width" }, function (t, e) {
            w.each({ padding: "inner" + t, content: e, "": "outer" + t }, function (n, i) {
                w.fn[i] = function (r, s) {
                    var o = arguments.length && (n || "boolean" != typeof r),
                        a = n || (!0 === r || !0 === s ? "margin" : "border");
                    return Z(
                        this,
                        function (e, n, r) {
                            var s;
                            return m(e)
                                ? 0 === i.indexOf("outer")
                                    ? e["inner" + t]
                                    : e.document.documentElement["client" + t]
                                : 9 === e.nodeType
                                ? ((s = e.documentElement), Math.max(e.body["scroll" + t], s["scroll" + t], e.body["offset" + t], s["offset" + t], s["client" + t]))
                                : void 0 === r
                                ? w.css(e, n, a)
                                : w.style(e, n, r, a);
                        },
                        e,
                        o ? r : void 0,
                        o
                    );
                };
            });
        }),
        w.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (t, e) {
            w.fn[e] = function (t) {
                return this.on(e, t);
            };
        }),
        w.fn.extend({
            bind: function (t, e, n) {
                return this.on(t, null, e, n);
            },
            unbind: function (t, e) {
                return this.off(t, null, e);
            },
            delegate: function (t, e, n, i) {
                return this.on(e, t, n, i);
            },
            undelegate: function (t, e, n) {
                return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n);
            },
            hover: function (t, e) {
                return this.on("mouseenter", t).on("mouseleave", e || t);
            },
        }),
        w.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (t, e) {
            w.fn[e] = function (t, n) {
                return 0 < arguments.length ? this.on(e, null, t, n) : this.trigger(e);
            };
        });
    var ez = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
    (w.proxy = function (t, e) {
        var n, i, s;
        if (("string" == typeof e && ((n = t[e]), (e = t), (t = n)), p(t)))
            return (
                (i = r.call(arguments, 2)),
                ((s = function () {
                    return t.apply(e || this, i.concat(r.call(arguments)));
                }).guid = t.guid = t.guid || w.guid++),
                s
            );
    }),
        (w.holdReady = function (t) {
            t ? w.readyWait++ : w.ready(!0);
        }),
        (w.isArray = Array.isArray),
        (w.parseJSON = JSON.parse),
        (w.nodeName = k),
        (w.isFunction = p),
        (w.isWindow = m),
        (w.camelCase = tn),
        (w.type = _),
        (w.now = Date.now),
        (w.isNumeric = function (t) {
            var e = w.type(t);
            return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t));
        }),
        (w.trim = function (t) {
            return null == t ? "" : (t + "").replace(ez, "$1");
        }),
        "function" == typeof define &&
            define.amd &&
            define("jquery", [], function () {
                return w;
            });
    var eW = t.jQuery,
        eI = t.$;
    return (
        (w.noConflict = function (e) {
            return t.$ === w && (t.$ = eI), e && t.jQuery === w && (t.jQuery = eW), w;
        }),
        void 0 === e && (t.jQuery = t.$ = w),
        w
    );
}),
    (function (t, e) {
        var n, i;
        "object" == typeof exports && "undefined" != typeof module
            ? (module.exports = e())
            : "function" == typeof define && define.amd
            ? define(e)
            : ((n = (t = "undefined" != typeof globalThis ? globalThis : t || self).Cookies),
              ((i = t.Cookies = e()).noConflict = function () {
                  return (t.Cookies = n), i;
              }));
    })(this, function () {
        "use strict";
        function t(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var i in n) t[i] = n[i];
            }
            return t;
        }
        return (function e(n, i) {
            function r(e, r, s) {
                if ("undefined" != typeof document) {
                    "number" == typeof (s = t({}, i, s)).expires && (s.expires = new Date(Date.now() + 864e5 * s.expires)),
                        s.expires && (s.expires = s.expires.toUTCString()),
                        (e = encodeURIComponent(e)
                            .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
                            .replace(/[()]/g, escape));
                    var o = "";
                    for (var a in s) s[a] && ((o += "; " + a), !0 !== s[a] && (o += "=" + s[a].split(";")[0]));
                    return (document.cookie = e + "=" + n.write(r, e) + o);
                }
            }
            return Object.create(
                {
                    set: r,
                    get: function (t) {
                        if ("undefined" != typeof document && (!arguments.length || t)) {
                            for (var e = document.cookie ? document.cookie.split("; ") : [], i = {}, r = 0; r < e.length; r++) {
                                var s = e[r].split("="),
                                    o = s.slice(1).join("=");
                                try {
                                    var a = decodeURIComponent(s[0]);
                                    if (((i[a] = n.read(o, a)), t === a)) break;
                                } catch (l) {}
                            }
                            return t ? i[t] : i;
                        }
                    },
                    remove: function (e, n) {
                        r(e, "", t({}, n, { expires: -1 }));
                    },
                    withAttributes: function (n) {
                        return e(this.converter, t({}, this.attributes, n));
                    },
                    withConverter: function (n) {
                        return e(t({}, this.converter, n), this.attributes);
                    },
                },
                { attributes: { value: Object.freeze(i) }, converter: { value: Object.freeze(n) } }
            );
        })(
            {
                read: function (t) {
                    return '"' === t[0] && (t = t.slice(1, -1)), t.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
                },
                write: function (t) {
                    return encodeURIComponent(t).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
                },
            },
            { path: "/" }
        );
    }),
    (function (t, e) {
        "object" == typeof exports && "undefined" != typeof module ? (module.exports = e()) : "function" == typeof define && define.amd ? define(e) : ((t = "undefined" != typeof globalThis ? globalThis : t || self).LocomotiveScroll = e());
    })(this, function () {
        "use strict";
        function t(t, e) {
            if (!(t instanceof e)) throw TypeError("Cannot call a class as a function");
        }
        function e(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                (i.enumerable = i.enumerable || !1), (i.configurable = !0), "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
            }
        }
        function n(t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t;
        }
        function i(t, e, n) {
            return e in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (t[e] = n), t;
        }
        function r(t, e) {
            var n = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var i = Object.getOwnPropertySymbols(t);
                e &&
                    (i = i.filter(function (e) {
                        return Object.getOwnPropertyDescriptor(t, e).enumerable;
                    })),
                    n.push.apply(n, i);
            }
            return n;
        }
        function s(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = null != arguments[e] ? arguments[e] : {};
                e % 2
                    ? r(Object(n), !0).forEach(function (e) {
                          i(t, e, n[e]);
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
                    : r(Object(n)).forEach(function (e) {
                          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
                      });
            }
            return t;
        }
        function o(t, e) {
            if ("function" != typeof e && null !== e) throw TypeError("Super expression must either be null or a function");
            (t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } })), e && l(t, e);
        }
        function a(t) {
            return (a = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function (t) {
                      return t.__proto__ || Object.getPrototypeOf(t);
                  })(t);
        }
        function l(t, e) {
            return (l =
                Object.setPrototypeOf ||
                function (t, e) {
                    return (t.__proto__ = e), t;
                })(t, e);
        }
        function c(t) {
            if (void 0 === t) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
        }
        function u(t) {
            var e = (function () {
                if ("undefined" == typeof Reflect || !Reflect.construct || Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
                } catch (t) {
                    return !1;
                }
            })();
            return function () {
                var n,
                    i,
                    r,
                    s = a(t);
                if (e) {
                    var o = a(this).constructor;
                    r = Reflect.construct(s, arguments, o);
                } else r = s.apply(this, arguments);
                return (n = this), (i = r) && ("object" == typeof i || "function" == typeof i) ? i : c(n);
            };
        }
        function h(t, e, n) {
            return (h =
                "undefined" != typeof Reflect && Reflect.get
                    ? Reflect.get
                    : function (t, e, n) {
                          var i = (function (t, e) {
                              for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = a(t)); );
                              return t;
                          })(t, e);
                          if (i) {
                              var r = Object.getOwnPropertyDescriptor(i, e);
                              return r.get ? r.get.call(n) : r.value;
                          }
                      })(t, e, n || t);
        }
        function f(t, e) {
            return (
                (function (t) {
                    if (Array.isArray(t)) return t;
                })(t) ||
                (function (t, e) {
                    if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) {
                        var n = [],
                            i = !0,
                            r = !1,
                            s = void 0;
                        try {
                            for (var o, a = t[Symbol.iterator](); !(i = (o = a.next()).done) && (n.push(o.value), !e || n.length !== e); i = !0);
                        } catch (l) {
                            (r = !0), (s = l);
                        } finally {
                            try {
                                i || null == a.return || a.return();
                            } finally {
                                if (r) throw s;
                            }
                        }
                        return n;
                    }
                })(t, e) ||
                d(t, e) ||
                (function () {
                    throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                })()
            );
        }
        function d(t, e) {
            if (t) {
                if ("string" == typeof t) return p(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? p(t, e) : void 0;
            }
        }
        function p(t, e) {
            (null == e || e > t.length) && (e = t.length);
            for (var n = 0, i = Array(e); n < e; n++) i[n] = t[n];
            return i;
        }
        var m = {
                el: document,
                name: "scroll",
                offset: [0, 0],
                repeat: !1,
                smooth: !1,
                initPosition: { x: 0, y: 0 },
                direction: "vertical",
                gestureDirection: "vertical",
                reloadOnContextChange: !1,
                lerp: 0.1,
                class: "is-inview",
                scrollbarContainer: !1,
                scrollbarClass: "c-scrollbar",
                scrollingClass: "has-scroll-scrolling",
                draggingClass: "has-scroll-dragging",
                smoothClass: "has-scroll-smooth",
                initClass: "has-scroll-init",
                getSpeed: !1,
                getDirection: !1,
                scrollFromAnywhere: !1,
                multiplier: 1,
                firefoxMultiplier: 50,
                touchMultiplier: 2,
                resetNativeScroll: !0,
                tablet: { smooth: !1, direction: "vertical", gestureDirection: "vertical", breakpoint: 1024 },
                smartphone: { smooth: !1, direction: "vertical", gestureDirection: "vertical" },
            },
            g = (function () {
                function e() {
                    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    t(this, e),
                        Object.assign(this, m, n),
                        (this.smartphone = m.smartphone),
                        n.smartphone && Object.assign(this.smartphone, n.smartphone),
                        (this.tablet = m.tablet),
                        n.tablet && Object.assign(this.tablet, n.tablet),
                        (this.namespace = "locomotive"),
                        (this.html = document.documentElement),
                        (this.windowHeight = window.innerHeight),
                        (this.windowWidth = window.innerWidth),
                        (this.windowMiddle = { x: this.windowWidth / 2, y: this.windowHeight / 2 }),
                        (this.els = {}),
                        (this.currentElements = {}),
                        (this.listeners = {}),
                        (this.hasScrollTicking = !1),
                        (this.hasCallEventSet = !1),
                        (this.checkScroll = this.checkScroll.bind(this)),
                        (this.checkResize = this.checkResize.bind(this)),
                        (this.checkEvent = this.checkEvent.bind(this)),
                        (this.instance = { scroll: { x: 0, y: 0 }, limit: { x: this.html.offsetWidth, y: this.html.offsetHeight }, currentElements: this.currentElements }),
                        this.isMobile ? (this.isTablet ? (this.context = "tablet") : (this.context = "smartphone")) : (this.context = "desktop"),
                        this.isMobile && (this.direction = this[this.context].direction),
                        "horizontal" === this.direction ? (this.directionAxis = "x") : (this.directionAxis = "y"),
                        this.getDirection && (this.instance.direction = null),
                        this.getDirection && (this.instance.speed = 0),
                        this.html.classList.add(this.initClass),
                        window.addEventListener("resize", this.checkResize, !1);
                }
                return (
                    n(e, [
                        {
                            key: "init",
                            value: function () {
                                this.initEvents();
                            },
                        },
                        {
                            key: "checkScroll",
                            value: function () {
                                this.dispatchScroll();
                            },
                        },
                        {
                            key: "checkResize",
                            value: function () {
                                var t = this;
                                this.resizeTick ||
                                    ((this.resizeTick = !0),
                                    requestAnimationFrame(function () {
                                        t.resize(), (t.resizeTick = !1);
                                    }));
                            },
                        },
                        { key: "resize", value: function () {} },
                        {
                            key: "checkContext",
                            value: function () {
                                if (this.reloadOnContextChange) {
                                    (this.isMobile =
                                        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                                        ("MacIntel" === navigator.platform && navigator.maxTouchPoints > 1) ||
                                        this.windowWidth < this.tablet.breakpoint),
                                        (this.isTablet = this.isMobile && this.windowWidth >= this.tablet.breakpoint);
                                    var t = this.context;
                                    this.isMobile ? (this.isTablet ? (this.context = "tablet") : (this.context = "smartphone")) : (this.context = "desktop"),
                                        t != this.context && ("desktop" == t ? this.smooth : this[t].smooth) != ("desktop" == this.context ? this.smooth : this[this.context].smooth) && window.location.reload();
                                }
                            },
                        },
                        {
                            key: "initEvents",
                            value: function () {
                                var t = this;
                                (this.scrollToEls = this.el.querySelectorAll("[data-".concat(this.name, "-to]"))),
                                    (this.setScrollTo = this.setScrollTo.bind(this)),
                                    this.scrollToEls.forEach(function (e) {
                                        e.addEventListener("click", t.setScrollTo, !1);
                                    });
                            },
                        },
                        {
                            key: "setScrollTo",
                            value: function (t) {
                                t.preventDefault(),
                                    this.scrollTo(t.currentTarget.getAttribute("data-".concat(this.name, "-href")) || t.currentTarget.getAttribute("href"), { offset: t.currentTarget.getAttribute("data-".concat(this.name, "-offset")) });
                            },
                        },
                        { key: "addElements", value: function () {} },
                        {
                            key: "detectElements",
                            value: function (t) {
                                var e = this,
                                    n = this.instance.scroll.y,
                                    i = n + this.windowHeight,
                                    r = this.instance.scroll.x,
                                    s = r + this.windowWidth;
                                Object.entries(this.els).forEach(function (o) {
                                    var a = f(o, 2),
                                        l = a[0],
                                        c = a[1];
                                    if ((!c || (c.inView && !t) || ("horizontal" === e.direction ? s >= c.left && r < c.right && e.setInView(c, l) : i >= c.top && n < c.bottom && e.setInView(c, l)), c && c.inView)) {
                                        if ("horizontal" === e.direction) {
                                            var u = c.right - c.left;
                                            (c.progress = (e.instance.scroll.x - (c.left - e.windowWidth)) / (u + e.windowWidth)), (s < c.left || r > c.right) && e.setOutOfView(c, l);
                                        } else {
                                            var h = c.bottom - c.top;
                                            (c.progress = (e.instance.scroll.y - (c.top - e.windowHeight)) / (h + e.windowHeight)), (i < c.top || n > c.bottom) && e.setOutOfView(c, l);
                                        }
                                    }
                                }),
                                    (this.hasScrollTicking = !1);
                            },
                        },
                        {
                            key: "setInView",
                            value: function (t, e) {
                                (this.els[e].inView = !0), t.el.classList.add(t.class), (this.currentElements[e] = t), t.call && this.hasCallEventSet && (this.dispatchCall(t, "enter"), t.repeat || (this.els[e].call = !1));
                            },
                        },
                        {
                            key: "setOutOfView",
                            value: function (t, e) {
                                var n = this;
                                (this.els[e].inView = !1),
                                    Object.keys(this.currentElements).forEach(function (t) {
                                        t === e && delete n.currentElements[t];
                                    }),
                                    t.call && this.hasCallEventSet && this.dispatchCall(t, "exit"),
                                    t.repeat && t.el.classList.remove(t.class);
                            },
                        },
                        {
                            key: "dispatchCall",
                            value: function (t, e) {
                                (this.callWay = e),
                                    (this.callValue = t.call.split(",").map(function (t) {
                                        return t.trim();
                                    })),
                                    (this.callObj = t),
                                    1 == this.callValue.length && (this.callValue = this.callValue[0]);
                                var n = new Event(this.namespace + "call");
                                this.el.dispatchEvent(n);
                            },
                        },
                        {
                            key: "dispatchScroll",
                            value: function () {
                                var t = new Event(this.namespace + "scroll");
                                this.el.dispatchEvent(t);
                            },
                        },
                        {
                            key: "setEvents",
                            value: function (t, e) {
                                this.listeners[t] || (this.listeners[t] = []);
                                var n = this.listeners[t];
                                n.push(e), 1 === n.length && this.el.addEventListener(this.namespace + t, this.checkEvent, !1), "call" === t && ((this.hasCallEventSet = !0), this.detectElements(!0));
                            },
                        },
                        {
                            key: "unsetEvents",
                            value: function (t, e) {
                                if (this.listeners[t]) {
                                    var n = this.listeners[t],
                                        i = n.indexOf(e);
                                    i < 0 || (n.splice(i, 1), 0 === n.index && this.el.removeEventListener(this.namespace + t, this.checkEvent, !1));
                                }
                            },
                        },
                        {
                            key: "checkEvent",
                            value: function (t) {
                                var e = this,
                                    n = t.type.replace(this.namespace, ""),
                                    i = this.listeners[n];
                                i &&
                                    0 !== i.length &&
                                    i.forEach(function (t) {
                                        switch (n) {
                                            case "scroll":
                                                return t(e.instance);
                                            case "call":
                                                return t(e.callValue, e.callWay, e.callObj);
                                            default:
                                                return t();
                                        }
                                    });
                            },
                        },
                        { key: "startScroll", value: function () {} },
                        { key: "stopScroll", value: function () {} },
                        {
                            key: "setScroll",
                            value: function (t, e) {
                                this.instance.scroll = { x: 0, y: 0 };
                            },
                        },
                        {
                            key: "destroy",
                            value: function () {
                                var t = this;
                                window.removeEventListener("resize", this.checkResize, !1),
                                    Object.keys(this.listeners).forEach(function (e) {
                                        t.el.removeEventListener(t.namespace + e, t.checkEvent, !1);
                                    }),
                                    (this.listeners = {}),
                                    this.scrollToEls.forEach(function (e) {
                                        e.removeEventListener("click", t.setScrollTo, !1);
                                    }),
                                    this.html.classList.remove(this.initClass);
                            },
                        },
                    ]),
                    e
                );
            })(),
            v = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
        function y(t, e) {
            return t((e = { exports: {} }), e.exports), e.exports;
        }
        var _ = y(function (t, e) {
                t.exports = {
                    polyfill: function () {
                        var t = window,
                            e = document;
                        if (!("scrollBehavior" in e.documentElement.style) || !0 === t.__forceSmoothScrollPolyfill__) {
                            var n,
                                i = t.HTMLElement || t.Element,
                                r = { scroll: t.scroll || t.scrollTo, scrollBy: t.scrollBy, elementScroll: i.prototype.scroll || a, scrollIntoView: i.prototype.scrollIntoView },
                                s = t.performance && t.performance.now ? t.performance.now.bind(t.performance) : Date.now,
                                o = ((n = t.navigator.userAgent), RegExp("MSIE |Trident/|Edge/").test(n) ? 1 : 0);
                            (t.scroll = t.scrollTo = function () {
                                void 0 !== arguments[0] &&
                                    (!0 !== l(arguments[0])
                                        ? f.call(t, e.body, void 0 !== arguments[0].left ? ~~arguments[0].left : t.scrollX || t.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : t.scrollY || t.pageYOffset)
                                        : r.scroll.call(
                                              t,
                                              void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : t.scrollX || t.pageXOffset,
                                              void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : t.scrollY || t.pageYOffset
                                          ));
                            }),
                                (t.scrollBy = function () {
                                    void 0 !== arguments[0] &&
                                        (l(arguments[0])
                                            ? r.scrollBy.call(
                                                  t,
                                                  void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0,
                                                  void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0
                                              )
                                            : f.call(t, e.body, ~~arguments[0].left + (t.scrollX || t.pageXOffset), ~~arguments[0].top + (t.scrollY || t.pageYOffset)));
                                }),
                                (i.prototype.scroll = i.prototype.scrollTo = function () {
                                    if (void 0 !== arguments[0]) {
                                        if (!0 !== l(arguments[0])) {
                                            var t = arguments[0].left,
                                                e = arguments[0].top;
                                            f.call(this, this, void 0 === t ? this.scrollLeft : ~~t, void 0 === e ? this.scrollTop : ~~e);
                                        } else {
                                            if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw SyntaxError("Value could not be converted");
                                            r.elementScroll.call(
                                                this,
                                                void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft,
                                                void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop
                                            );
                                        }
                                    }
                                }),
                                (i.prototype.scrollBy = function () {
                                    void 0 !== arguments[0] &&
                                        (!0 !== l(arguments[0])
                                            ? this.scroll({ left: ~~arguments[0].left + this.scrollLeft, top: ~~arguments[0].top + this.scrollTop, behavior: arguments[0].behavior })
                                            : r.elementScroll.call(
                                                  this,
                                                  void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft,
                                                  void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop
                                              ));
                                }),
                                (i.prototype.scrollIntoView = function () {
                                    if (!0 !== l(arguments[0])) {
                                        var n = (function t(n) {
                                                for (; n !== e.body && !1 === h(n); ) n = n.parentNode || n.host;
                                                return n;
                                            })(this),
                                            i = n.getBoundingClientRect(),
                                            s = this.getBoundingClientRect();
                                        n !== e.body
                                            ? (f.call(this, n, n.scrollLeft + s.left - i.left, n.scrollTop + s.top - i.top), "fixed" !== t.getComputedStyle(n).position && t.scrollBy({ left: i.left, top: i.top, behavior: "smooth" }))
                                            : t.scrollBy({ left: s.left, top: s.top, behavior: "smooth" });
                                    } else r.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]);
                                });
                        }
                        function a(t, e) {
                            (this.scrollLeft = t), (this.scrollTop = e);
                        }
                        function l(t) {
                            if (null === t || "object" != typeof t || void 0 === t.behavior || "auto" === t.behavior || "instant" === t.behavior) return !0;
                            if ("object" == typeof t && "smooth" === t.behavior) return !1;
                            throw TypeError("behavior member of ScrollOptions " + t.behavior + " is not a valid value for enumeration ScrollBehavior.");
                        }
                        function c(t, e) {
                            return "Y" === e ? t.clientHeight + o < t.scrollHeight : "X" === e ? t.clientWidth + o < t.scrollWidth : void 0;
                        }
                        function u(e, n) {
                            var i = t.getComputedStyle(e, null)["overflow" + n];
                            return "auto" === i || "scroll" === i;
                        }
                        function h(t) {
                            var e = c(t, "Y") && u(t, "Y"),
                                n = c(t, "X") && u(t, "X");
                            return e || n;
                        }
                        function f(n, i, o) {
                            var l,
                                c,
                                u,
                                h,
                                f = s();
                            n === e.body ? ((l = t), (c = t.scrollX || t.pageXOffset), (u = t.scrollY || t.pageYOffset), (h = r.scroll)) : ((l = n), (c = n.scrollLeft), (u = n.scrollTop), (h = a)),
                                (function e(n) {
                                    var i,
                                        r,
                                        o,
                                        a,
                                        l = (s() - n.startTime) / 468;
                                    (i = 0.5 * (1 - Math.cos(Math.PI * (a = l = l > 1 ? 1 : l)))),
                                        (r = n.startX + (n.x - n.startX) * i),
                                        (o = n.startY + (n.y - n.startY) * i),
                                        n.method.call(n.scrollable, r, o),
                                        (r === n.x && o === n.y) || t.requestAnimationFrame(e.bind(t, n));
                                })({ scrollable: l, method: h, startTime: f, startX: c, startY: u, x: i, y: o });
                        }
                    },
                };
            }),
            b =
                (_.polyfill,
                (function (e) {
                    o(r, e);
                    var i = u(r);
                    function r() {
                        var e,
                            n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        return (
                            t(this, r),
                            (e = i.call(this, n)).resetNativeScroll && (history.scrollRestoration && (history.scrollRestoration = "manual"), window.scrollTo(0, 0)),
                            window.addEventListener("scroll", e.checkScroll, !1),
                            void 0 === window.smoothscrollPolyfill && ((window.smoothscrollPolyfill = _), window.smoothscrollPolyfill.polyfill()),
                            e
                        );
                    }
                    return (
                        n(r, [
                            {
                                key: "init",
                                value: function () {
                                    (this.instance.scroll.y = window.pageYOffset), this.addElements(), this.detectElements(), h(a(r.prototype), "init", this).call(this);
                                },
                            },
                            {
                                key: "checkScroll",
                                value: function () {
                                    var t = this;
                                    h(a(r.prototype), "checkScroll", this).call(this),
                                        this.getDirection && this.addDirection(),
                                        this.getSpeed && (this.addSpeed(), (this.speedTs = Date.now())),
                                        (this.instance.scroll.y = window.pageYOffset),
                                        Object.entries(this.els).length &&
                                            (this.hasScrollTicking ||
                                                (requestAnimationFrame(function () {
                                                    t.detectElements();
                                                }),
                                                (this.hasScrollTicking = !0)));
                                },
                            },
                            {
                                key: "addDirection",
                                value: function () {
                                    window.pageYOffset > this.instance.scroll.y
                                        ? "down" !== this.instance.direction && (this.instance.direction = "down")
                                        : window.pageYOffset < this.instance.scroll.y && "up" !== this.instance.direction && (this.instance.direction = "up");
                                },
                            },
                            {
                                key: "addSpeed",
                                value: function () {
                                    window.pageYOffset != this.instance.scroll.y ? (this.instance.speed = (window.pageYOffset - this.instance.scroll.y) / Math.max(1, Date.now() - this.speedTs)) : (this.instance.speed = 0);
                                },
                            },
                            {
                                key: "resize",
                                value: function () {
                                    Object.entries(this.els).length && ((this.windowHeight = window.innerHeight), this.updateElements());
                                },
                            },
                            {
                                key: "addElements",
                                value: function () {
                                    var t = this;
                                    (this.els = {}),
                                        this.el.querySelectorAll("[data-" + this.name + "]").forEach(function (e, n) {
                                            e.getBoundingClientRect();
                                            var i,
                                                r,
                                                s,
                                                o = e.dataset[t.name + "Class"] || t.class,
                                                a = "string" == typeof e.dataset[t.name + "Id"] ? e.dataset[t.name + "Id"] : n,
                                                l = "string" == typeof e.dataset[t.name + "Offset"] ? e.dataset[t.name + "Offset"].split(",") : t.offset,
                                                c = e.dataset[t.name + "Repeat"],
                                                u = e.dataset[t.name + "Call"],
                                                h = e.dataset[t.name + "Target"],
                                                f = (s = void 0 !== h ? document.querySelector("".concat(h)) : e).getBoundingClientRect();
                                            (i = f.top + t.instance.scroll.y), (r = f.left + t.instance.scroll.x);
                                            var d = i + s.offsetHeight,
                                                p = r + s.offsetWidth;
                                            c = "false" != c && (null != c || t.repeat);
                                            var m = t.getRelativeOffset(l),
                                                g = { el: e, targetEl: s, id: a, class: o, top: (i += m[0]), bottom: (d -= m[1]), left: r, right: p, offset: l, progress: 0, repeat: c, inView: !1, call: u };
                                            (t.els[a] = g), e.classList.contains(o) && t.setInView(t.els[a], a);
                                        });
                                },
                            },
                            {
                                key: "updateElements",
                                value: function () {
                                    var t = this;
                                    Object.entries(this.els).forEach(function (e) {
                                        var n = f(e, 2),
                                            i = n[0],
                                            r = n[1],
                                            s = r.targetEl.getBoundingClientRect().top + t.instance.scroll.y,
                                            o = s + r.targetEl.offsetHeight,
                                            a = t.getRelativeOffset(r.offset);
                                        (t.els[i].top = s + a[0]), (t.els[i].bottom = o - a[1]);
                                    }),
                                        (this.hasScrollTicking = !1);
                                },
                            },
                            {
                                key: "getRelativeOffset",
                                value: function (t) {
                                    var e = [0, 0];
                                    if (t) for (var n = 0; n < t.length; n++) "string" == typeof t[n] ? (t[n].includes("%") ? (e[n] = parseInt((t[n].replace("%", "") * this.windowHeight) / 100)) : (e[n] = parseInt(t[n]))) : (e[n] = t[n]);
                                    return e;
                                },
                            },
                            {
                                key: "scrollTo",
                                value: function (t) {
                                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                        n = parseInt(e.offset) || 0,
                                        i = !!e.callback && e.callback;
                                    if ("string" == typeof t) {
                                        if ("top" === t) t = this.html;
                                        else if ("bottom" === t) t = this.html.offsetHeight - window.innerHeight;
                                        else if (!(t = document.querySelector(t))) return;
                                    } else if ("number" == typeof t) t = parseInt(t);
                                    else if (!t || !t.tagName) return void console.warn("`target` parameter is not valid");
                                    n = "number" != typeof t ? t.getBoundingClientRect().top + n + this.instance.scroll.y : t + n;
                                    var r = function () {
                                        return parseInt(window.pageYOffset) === parseInt(n);
                                    };
                                    if (i) {
                                        if (r()) return void i();
                                        var s = function t() {
                                            r() && (window.removeEventListener("scroll", t), i());
                                        };
                                        window.addEventListener("scroll", s);
                                    }
                                    window.scrollTo({ top: n, behavior: 0 === e.duration ? "auto" : "smooth" });
                                },
                            },
                            {
                                key: "update",
                                value: function () {
                                    this.addElements(), this.detectElements();
                                },
                            },
                            {
                                key: "destroy",
                                value: function () {
                                    h(a(r.prototype), "destroy", this).call(this), window.removeEventListener("scroll", this.checkScroll, !1);
                                },
                            },
                        ]),
                        r
                    );
                })(g)),
            x = Object.getOwnPropertySymbols,
            w = Object.prototype.hasOwnProperty,
            T = Object.prototype.propertyIsEnumerable,
            k = !(function () {
                try {
                    if (!Object.assign) return !1;
                    var t = new String("abc");
                    if (((t[5] = "de"), "5" === Object.getOwnPropertyNames(t)[0])) return !1;
                    for (var e = {}, n = 0; n < 10; n++) e["_" + String.fromCharCode(n)] = n;
                    if (
                        "0123456789" !==
                        Object.getOwnPropertyNames(e)
                            .map(function (t) {
                                return e[t];
                            })
                            .join("")
                    )
                        return !1;
                    var i = {};
                    return (
                        "abcdefghijklmnopqrst".split("").forEach(function (t) {
                            i[t] = t;
                        }),
                        "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, i)).join("")
                    );
                } catch (r) {
                    return !1;
                }
            })()
                ? function (t, e) {
                      for (
                          var n,
                              i,
                              r = (function t(e) {
                                  if (null == e) throw TypeError("Object.assign cannot be called with null or undefined");
                                  return Object(e);
                              })(t),
                              s = 1;
                          s < arguments.length;
                          s++
                      ) {
                          for (var o in (n = Object(arguments[s]))) w.call(n, o) && (r[o] = n[o]);
                          if (x) {
                              i = x(n);
                              for (var a = 0; a < i.length; a++) T.call(n, i[a]) && (r[i[a]] = n[i[a]]);
                          }
                      }
                      return r;
                  }
                : Object.assign;
        function S() {}
        S.prototype = {
            on: function (t, e, n) {
                var i = this.e || (this.e = {});
                return (i[t] || (i[t] = [])).push({ fn: e, ctx: n }), this;
            },
            once: function (t, e, n) {
                var i = this;
                function r() {
                    i.off(t, r), e.apply(n, arguments);
                }
                return (r._ = e), this.on(t, r, n);
            },
            emit: function (t) {
                for (var e = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[t] || []).slice(), i = 0, r = n.length; i < r; i++) n[i].fn.apply(n[i].ctx, e);
                return this;
            },
            off: function (t, e) {
                var n = this.e || (this.e = {}),
                    i = n[t],
                    r = [];
                if (i && e) for (var s = 0, o = i.length; s < o; s++) i[s].fn !== e && i[s].fn._ !== e && r.push(i[s]);
                return r.length ? (n[t] = r) : delete n[t], this;
            },
        };
        var C = S,
            E = y(function (t, e) {
                (function () {
                    (null !== e ? e : this).Lethargy = (function () {
                        function t(t, e, n, i) {
                            (this.stability = null != t ? Math.abs(t) : 8),
                                (this.sensitivity = null != e ? 1 + Math.abs(e) : 100),
                                (this.tolerance = null != n ? 1 + Math.abs(n) : 1.1),
                                (this.delay = null != i ? i : 150),
                                (this.lastUpDeltas = function () {
                                    var t, e, n;
                                    for (n = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--) n.push(null);
                                    return n;
                                }.call(this)),
                                (this.lastDownDeltas = function () {
                                    var t, e, n;
                                    for (n = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--) n.push(null);
                                    return n;
                                }.call(this)),
                                (this.deltasTimestamp = function () {
                                    var t, e, n;
                                    for (n = [], t = 1, e = 2 * this.stability; 1 <= e ? t <= e : t >= e; 1 <= e ? t++ : t--) n.push(null);
                                    return n;
                                }.call(this));
                        }
                        return (
                            (t.prototype.check = function (t) {
                                var e;
                                return (
                                    null != (t = t.originalEvent || t).wheelDelta ? (e = t.wheelDelta) : null != t.deltaY ? (e = -40 * t.deltaY) : (null == t.detail && 0 !== t.detail) || (e = -40 * t.detail),
                                    this.deltasTimestamp.push(Date.now()),
                                    this.deltasTimestamp.shift(),
                                    e > 0 ? (this.lastUpDeltas.push(e), this.lastUpDeltas.shift(), this.isInertia(1)) : (this.lastDownDeltas.push(e), this.lastDownDeltas.shift(), this.isInertia(-1))
                                );
                            }),
                            (t.prototype.isInertia = function (t) {
                                var e, n, i, r, s, o, a;
                                return null === (e = -1 === t ? this.lastDownDeltas : this.lastUpDeltas)[0]
                                    ? t
                                    : !(this.deltasTimestamp[2 * this.stability - 2] + this.delay > Date.now() && e[0] === e[2 * this.stability - 1]) &&
                                          ((i = e.slice(0, this.stability)),
                                          (n = e.slice(this.stability, 2 * this.stability)),
                                          (a = i.reduce(function (t, e) {
                                              return t + e;
                                          })),
                                          (s = n.reduce(function (t, e) {
                                              return t + e;
                                          })),
                                          Math.abs((o = a / i.length)) < Math.abs((r = s / n.length) * this.tolerance) && this.sensitivity < Math.abs(r) && t);
                            }),
                            (t.prototype.showLastUpDeltas = function () {
                                return this.lastUpDeltas;
                            }),
                            (t.prototype.showLastDownDeltas = function () {
                                return this.lastDownDeltas;
                            }),
                            t
                        );
                    })();
                }.call(v));
            }),
            A = {
                hasWheelEvent: "onwheel" in document,
                hasMouseWheelEvent: "onmousewheel" in document,
                hasTouch: "ontouchstart" in window || window.TouchEvent || (window.DocumentTouch && document instanceof DocumentTouch),
                hasTouchWin: navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1,
                hasPointer: !!window.navigator.msPointerEnabled,
                hasKeyDown: "onkeydown" in document,
                isFirefox: navigator.userAgent.indexOf("Firefox") > -1,
            },
            D = Object.prototype.toString,
            O = Object.prototype.hasOwnProperty;
        function L(t, e) {
            return function () {
                return t.apply(e, arguments);
            };
        }
        var P = E.Lethargy,
            j = "virtualscroll",
            R = H;
        function H(t) {
            (function (t) {
                if (!t) return console.warn("bindAll requires at least one argument.");
                var e = Array.prototype.slice.call(arguments, 1);
                if (0 === e.length) for (var n in t) O.call(t, n) && "function" == typeof t[n] && "[object Function]" == D.call(t[n]) && e.push(n);
                for (var i = 0; i < e.length; i++) {
                    var r = e[i];
                    t[r] = L(t[r], t);
                }
            })(this, "_onWheel", "_onMouseWheel", "_onTouchStart", "_onTouchMove", "_onKeyDown"),
                (this.el = window),
                t && t.el && ((this.el = t.el), delete t.el),
                (this.options = k({ mouseMultiplier: 1, touchMultiplier: 2, firefoxMultiplier: 15, keyStep: 120, preventTouch: !1, unpreventTouchClass: "vs-touchmove-allowed", limitInertia: !1, useKeyboard: !0, useTouch: !0 }, t)),
                this.options.limitInertia && (this._lethargy = new P()),
                (this._emitter = new C()),
                (this._event = { y: 0, x: 0, deltaX: 0, deltaY: 0 }),
                (this.touchStartX = null),
                (this.touchStartY = null),
                (this.bodyTouchAction = null),
                void 0 !== this.options.passive && (this.listenerOptions = { passive: this.options.passive });
        }
        function B(t, e, n) {
            return (1 - n) * t + n * e;
        }
        function M(t) {
            var e = {};
            if (window.getComputedStyle) {
                var n = getComputedStyle(t),
                    i = n.transform || n.webkitTransform || n.mozTransform,
                    r = i.match(/^matrix3d\((.+)\)$/);
                return (
                    r
                        ? ((e.x = r ? parseFloat(r[1].split(", ")[12]) : 0), (e.y = r ? parseFloat(r[1].split(", ")[13]) : 0))
                        : ((r = i.match(/^matrix\((.+)\)$/)), (e.x = r ? parseFloat(r[1].split(", ")[4]) : 0), (e.y = r ? parseFloat(r[1].split(", ")[5]) : 0)),
                    e
                );
            }
        }
        function q(t) {
            for (var e = []; t && t !== document; t = t.parentNode) e.push(t);
            return e;
        }
        (H.prototype._notify = function (t) {
            var e = this._event;
            (e.x += e.deltaX), (e.y += e.deltaY), this._emitter.emit(j, { x: e.x, y: e.y, deltaX: e.deltaX, deltaY: e.deltaY, originalEvent: t });
        }),
            (H.prototype._onWheel = function (t) {
                var e = this.options;
                if (!this._lethargy || !1 !== this._lethargy.check(t)) {
                    var n = this._event;
                    (n.deltaX = t.wheelDeltaX || -1 * t.deltaX),
                        (n.deltaY = t.wheelDeltaY || -1 * t.deltaY),
                        A.isFirefox && 1 == t.deltaMode && ((n.deltaX *= e.firefoxMultiplier), (n.deltaY *= e.firefoxMultiplier)),
                        (n.deltaX *= e.mouseMultiplier),
                        (n.deltaY *= e.mouseMultiplier),
                        this._notify(t);
                }
            }),
            (H.prototype._onMouseWheel = function (t) {
                if (!this.options.limitInertia || !1 !== this._lethargy.check(t)) {
                    var e = this._event;
                    (e.deltaX = t.wheelDeltaX ? t.wheelDeltaX : 0), (e.deltaY = t.wheelDeltaY ? t.wheelDeltaY : t.wheelDelta), this._notify(t);
                }
            }),
            (H.prototype._onTouchStart = function (t) {
                var e = t.targetTouches ? t.targetTouches[0] : t;
                (this.touchStartX = e.pageX), (this.touchStartY = e.pageY);
            }),
            (H.prototype._onTouchMove = function (t) {
                var e = this.options;
                e.preventTouch && !t.target.classList.contains(e.unpreventTouchClass) && t.preventDefault();
                var n = this._event,
                    i = t.targetTouches ? t.targetTouches[0] : t;
                (n.deltaX = (i.pageX - this.touchStartX) * e.touchMultiplier), (n.deltaY = (i.pageY - this.touchStartY) * e.touchMultiplier), (this.touchStartX = i.pageX), (this.touchStartY = i.pageY), this._notify(t);
            }),
            (H.prototype._onKeyDown = function (t) {
                var e = this._event;
                e.deltaX = e.deltaY = 0;
                var n = window.innerHeight - 40;
                switch (t.keyCode) {
                    case 37:
                    case 38:
                        e.deltaY = this.options.keyStep;
                        break;
                    case 39:
                    case 40:
                        e.deltaY = -this.options.keyStep;
                        break;
                    case t.shiftKey:
                        e.deltaY = n;
                        break;
                    case 32:
                        e.deltaY = -n;
                        break;
                    default:
                        return;
                }
                this._notify(t);
            }),
            (H.prototype._bind = function () {
                A.hasWheelEvent && this.el.addEventListener("wheel", this._onWheel, this.listenerOptions),
                    A.hasMouseWheelEvent && this.el.addEventListener("mousewheel", this._onMouseWheel, this.listenerOptions),
                    A.hasTouch && this.options.useTouch && (this.el.addEventListener("touchstart", this._onTouchStart, this.listenerOptions), this.el.addEventListener("touchmove", this._onTouchMove, this.listenerOptions)),
                    A.hasPointer &&
                        A.hasTouchWin &&
                        ((this.bodyTouchAction = document.body.style.msTouchAction),
                        (document.body.style.msTouchAction = "none"),
                        this.el.addEventListener("MSPointerDown", this._onTouchStart, !0),
                        this.el.addEventListener("MSPointerMove", this._onTouchMove, !0)),
                    A.hasKeyDown && this.options.useKeyboard && document.addEventListener("keydown", this._onKeyDown);
            }),
            (H.prototype._unbind = function () {
                A.hasWheelEvent && this.el.removeEventListener("wheel", this._onWheel),
                    A.hasMouseWheelEvent && this.el.removeEventListener("mousewheel", this._onMouseWheel),
                    A.hasTouch && (this.el.removeEventListener("touchstart", this._onTouchStart), this.el.removeEventListener("touchmove", this._onTouchMove)),
                    A.hasPointer &&
                        A.hasTouchWin &&
                        ((document.body.style.msTouchAction = this.bodyTouchAction), this.el.removeEventListener("MSPointerDown", this._onTouchStart, !0), this.el.removeEventListener("MSPointerMove", this._onTouchMove, !0)),
                    A.hasKeyDown && this.options.useKeyboard && document.removeEventListener("keydown", this._onKeyDown);
            }),
            (H.prototype.on = function (t, e) {
                this._emitter.on(j, t, e);
                var n = this._emitter.e;
                n && n[j] && 1 === n[j].length && this._bind();
            }),
            (H.prototype.off = function (t, e) {
                this._emitter.off(j, t, e);
                var n = this._emitter.e;
                (!n[j] || n[j].length <= 0) && this._unbind();
            }),
            (H.prototype.reset = function () {
                var t = this._event;
                (t.x = 0), (t.y = 0);
            }),
            (H.prototype.destroy = function () {
                this._emitter.off(), this._unbind();
            });
        var N = "function" == typeof Float32Array;
        function z(t, e) {
            return 1 - 3 * e + 3 * t;
        }
        function W(t, e) {
            return 3 * e - 6 * t;
        }
        function I(t) {
            return 3 * t;
        }
        function Y(t, e, n) {
            var i;
            return ((z(e, n) * t + W(e, n)) * t + 3 * (i = e)) * t;
        }
        function X(t, e, n) {
            var i;
            return 3 * z(e, n) * t * t + 2 * W(e, n) * t + 3 * (i = e);
        }
        function F(t) {
            return t;
        }
        var V = function (t, e, n, i) {
                if (!(0 <= t && t <= 1 && 0 <= n && n <= 1)) throw Error("bezier x values must be in [0, 1] range");
                if (t === e && n === i) return F;
                for (var r = N ? new Float32Array(11) : Array(11), s = 0; s < 11; ++s) r[s] = Y(0.1 * s, t, n);
                return function (s) {
                    return 0 === s
                        ? 0
                        : 1 === s
                        ? 1
                        : Y(
                              (function e(i) {
                                  for (var s = 0, o = 1; 10 !== o && r[o] <= i; ++o) s += 0.1;
                                  var a = s + 0.1 * ((i - r[--o]) / (r[o + 1] - r[o])),
                                      l = X(a, t, n);
                                  return l >= 0.001
                                      ? (function (t, e, n, i) {
                                            for (var r = 0; r < 4; ++r) {
                                                var s = X(e, n, i);
                                                if (0 === s) break;
                                                e -= (Y(e, n, i) - t) / s;
                                            }
                                            return e;
                                        })(i, a, t, n)
                                      : 0 === l
                                      ? a
                                      : (function (t, e, n, i, r) {
                                            var s,
                                                o,
                                                a = 0;
                                            do (s = Y((o = e + (n - e) / 2), i, r) - t) > 0 ? (n = o) : (e = o);
                                            while (Math.abs(s) > 1e-7 && ++a < 10);
                                            return o;
                                        })(i, s, s + 0.1, t, n);
                              })(s),
                              e,
                              i
                          );
                };
            },
            U = (function (e) {
                o(r, e);
                var i = u(r);
                function r() {
                    var e,
                        n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    return (
                        t(this, r),
                        history.scrollRestoration && (history.scrollRestoration = "manual"),
                        window.scrollTo(0, 0),
                        (e = i.call(this, n)).inertia && (e.lerp = 0.1 * e.inertia),
                        (e.isScrolling = !1),
                        (e.isDraggingScrollbar = !1),
                        (e.isTicking = !1),
                        (e.hasScrollTicking = !1),
                        (e.parallaxElements = {}),
                        (e.stop = !1),
                        (e.scrollbarContainer = n.scrollbarContainer),
                        (e.checkKey = e.checkKey.bind(c(e))),
                        window.addEventListener("keydown", e.checkKey, !1),
                        e
                    );
                }
                return (
                    n(r, [
                        {
                            key: "init",
                            value: function () {
                                var t = this;
                                this.html.classList.add(this.smoothClass),
                                    this.html.setAttribute("data-".concat(this.name, "-direction"), this.direction),
                                    (this.instance = s({ delta: { x: this.initPosition.x, y: this.initPosition.y }, scroll: { x: this.initPosition.x, y: this.initPosition.y } }, this.instance)),
                                    (this.vs = new R({
                                        el: this.scrollFromAnywhere ? document : this.el,
                                        mouseMultiplier: navigator.platform.indexOf("Win") > -1 ? 1 : 0.4,
                                        firefoxMultiplier: this.firefoxMultiplier,
                                        touchMultiplier: this.touchMultiplier,
                                        useKeyboard: !1,
                                        passive: !0,
                                    })),
                                    this.vs.on(function (e) {
                                        t.stop ||
                                            t.isDraggingScrollbar ||
                                            requestAnimationFrame(function () {
                                                t.updateDelta(e), t.isScrolling || t.startScrolling();
                                            });
                                    }),
                                    this.setScrollLimit(),
                                    this.initScrollBar(),
                                    this.addSections(),
                                    this.addElements(),
                                    this.checkScroll(!0),
                                    this.transformElements(!0, !0),
                                    h(a(r.prototype), "init", this).call(this);
                            },
                        },
                        {
                            key: "setScrollLimit",
                            value: function () {
                                if (((this.instance.limit.y = this.el.offsetHeight - this.windowHeight), "horizontal" === this.direction)) {
                                    for (var t = 0, e = this.el.children, n = 0; n < e.length; n++) t += e[n].offsetWidth;
                                    this.instance.limit.x = t - this.windowWidth;
                                }
                            },
                        },
                        {
                            key: "startScrolling",
                            value: function () {
                                (this.startScrollTs = Date.now()), (this.isScrolling = !0), this.checkScroll(), this.html.classList.add(this.scrollingClass);
                            },
                        },
                        {
                            key: "stopScrolling",
                            value: function () {
                                cancelAnimationFrame(this.checkScrollRaf),
                                    (this.startScrollTs = void 0),
                                    this.scrollToRaf && (cancelAnimationFrame(this.scrollToRaf), (this.scrollToRaf = null)),
                                    (this.isScrolling = !1),
                                    (this.instance.scroll.y = Math.round(this.instance.scroll.y)),
                                    this.html.classList.remove(this.scrollingClass);
                            },
                        },
                        {
                            key: "checkKey",
                            value: function (t) {
                                var e = this;
                                if (this.stop)
                                    9 == t.keyCode &&
                                        requestAnimationFrame(function () {
                                            (e.html.scrollTop = 0), (document.body.scrollTop = 0), (e.html.scrollLeft = 0), (document.body.scrollLeft = 0);
                                        });
                                else {
                                    switch (t.keyCode) {
                                        case 9:
                                            requestAnimationFrame(function () {
                                                (e.html.scrollTop = 0), (document.body.scrollTop = 0), (e.html.scrollLeft = 0), (document.body.scrollLeft = 0), e.scrollTo(document.activeElement, { offset: -window.innerHeight / 2 });
                                            });
                                            break;
                                        case 38:
                                            this.isActiveElementScrollSensitive() && (this.instance.delta[this.directionAxis] -= 240);
                                            break;
                                        case 40:
                                            this.isActiveElementScrollSensitive() && (this.instance.delta[this.directionAxis] += 240);
                                            break;
                                        case 33:
                                            this.instance.delta[this.directionAxis] -= window.innerHeight;
                                            break;
                                        case 34:
                                            this.instance.delta[this.directionAxis] += window.innerHeight;
                                            break;
                                        case 36:
                                            this.instance.delta[this.directionAxis] -= this.instance.limit[this.directionAxis];
                                            break;
                                        case 35:
                                            this.instance.delta[this.directionAxis] += this.instance.limit[this.directionAxis];
                                            break;
                                        case 32:
                                            this.isActiveElementScrollSensitive() && (t.shiftKey ? (this.instance.delta[this.directionAxis] -= window.innerHeight) : (this.instance.delta[this.directionAxis] += window.innerHeight));
                                            break;
                                        default:
                                            return;
                                    }
                                    this.instance.delta[this.directionAxis] < 0 && (this.instance.delta[this.directionAxis] = 0),
                                        this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis] && (this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis]),
                                        this.stopScrolling(),
                                        (this.isScrolling = !0),
                                        this.checkScroll(),
                                        this.html.classList.add(this.scrollingClass);
                                }
                            },
                        },
                        {
                            key: "isActiveElementScrollSensitive",
                            value: function () {
                                return !(
                                    document.activeElement instanceof HTMLInputElement ||
                                    document.activeElement instanceof HTMLTextAreaElement ||
                                    document.activeElement instanceof HTMLButtonElement ||
                                    document.activeElement instanceof HTMLSelectElement
                                );
                            },
                        },
                        {
                            key: "checkScroll",
                            value: function () {
                                var t = this,
                                    e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                                if (e || this.isScrolling || this.isDraggingScrollbar) {
                                    this.hasScrollTicking ||
                                        ((this.checkScrollRaf = requestAnimationFrame(function () {
                                            return t.checkScroll();
                                        })),
                                        (this.hasScrollTicking = !0)),
                                        this.updateScroll();
                                    var n = Math.abs(this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]),
                                        i = Date.now() - this.startScrollTs;
                                    if (
                                        (!this.animatingScroll && i > 100 && ((n < 0.5 && 0 != this.instance.delta[this.directionAxis]) || (n < 0.5 && 0 == this.instance.delta[this.directionAxis])) && this.stopScrolling(),
                                        Object.entries(this.sections).forEach(function (n) {
                                            var i = f(n, 2),
                                                r = (i[0], i[1]);
                                            r.persistent || (t.instance.scroll[t.directionAxis] > r.offset[t.directionAxis] && t.instance.scroll[t.directionAxis] < r.limit[t.directionAxis])
                                                ? ("horizontal" === t.direction ? t.transform(r.el, -t.instance.scroll[t.directionAxis], 0) : t.transform(r.el, 0, -t.instance.scroll[t.directionAxis]),
                                                  r.inView || ((r.inView = !0), (r.el.style.opacity = 1), (r.el.style.pointerEvents = "all"), r.el.setAttribute("data-".concat(t.name, "-section-inview"), "")))
                                                : ((r.inView || e) && ((r.inView = !1), (r.el.style.opacity = 0), (r.el.style.pointerEvents = "none"), r.el.removeAttribute("data-".concat(t.name, "-section-inview"))),
                                                  t.transform(r.el, 0, 0));
                                        }),
                                        this.getDirection && this.addDirection(),
                                        this.getSpeed && (this.addSpeed(), (this.speedTs = Date.now())),
                                        this.detectElements(),
                                        this.transformElements(),
                                        this.hasScrollbar)
                                    ) {
                                        var s = (this.instance.scroll[this.directionAxis] / this.instance.limit[this.directionAxis]) * this.scrollBarLimit[this.directionAxis];
                                        "horizontal" === this.direction ? this.transform(this.scrollbarThumb, s, 0) : this.transform(this.scrollbarThumb, 0, s);
                                    }
                                    h(a(r.prototype), "checkScroll", this).call(this), (this.hasScrollTicking = !1);
                                }
                            },
                        },
                        {
                            key: "resize",
                            value: function () {
                                (this.windowHeight = window.innerHeight), (this.windowWidth = window.innerWidth), this.checkContext(), (this.windowMiddle = { x: this.windowWidth / 2, y: this.windowHeight / 2 }), this.update();
                            },
                        },
                        {
                            key: "updateDelta",
                            value: function (t) {
                                var e,
                                    n = this[this.context] && this[this.context].gestureDirection ? this[this.context].gestureDirection : this.gestureDirection;
                                (e = "both" === n ? t.deltaX + t.deltaY : "vertical" === n ? t.deltaY : "horizontal" === n ? t.deltaX : t.deltaY),
                                    (this.instance.delta[this.directionAxis] -= e * this.multiplier),
                                    this.instance.delta[this.directionAxis] < 0 && (this.instance.delta[this.directionAxis] = 0),
                                    this.instance.delta[this.directionAxis] > this.instance.limit[this.directionAxis] && (this.instance.delta[this.directionAxis] = this.instance.limit[this.directionAxis]);
                            },
                        },
                        {
                            key: "updateScroll",
                            value: function (t) {
                                this.isScrolling || this.isDraggingScrollbar
                                    ? (this.instance.scroll[this.directionAxis] = B(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis], this.lerp))
                                    : this.instance.scroll[this.directionAxis] > this.instance.limit[this.directionAxis]
                                    ? this.setScroll(this.instance.scroll[this.directionAxis], this.instance.limit[this.directionAxis])
                                    : this.instance.scroll.y < 0
                                    ? this.setScroll(this.instance.scroll[this.directionAxis], 0)
                                    : this.setScroll(this.instance.scroll[this.directionAxis], this.instance.delta[this.directionAxis]);
                            },
                        },
                        {
                            key: "addDirection",
                            value: function () {
                                this.instance.delta.y > this.instance.scroll.y
                                    ? "down" !== this.instance.direction && (this.instance.direction = "down")
                                    : this.instance.delta.y < this.instance.scroll.y && "up" !== this.instance.direction && (this.instance.direction = "up"),
                                    this.instance.delta.x > this.instance.scroll.x
                                        ? "right" !== this.instance.direction && (this.instance.direction = "right")
                                        : this.instance.delta.x < this.instance.scroll.x && "left" !== this.instance.direction && (this.instance.direction = "left");
                            },
                        },
                        {
                            key: "addSpeed",
                            value: function () {
                                this.instance.delta[this.directionAxis] != this.instance.scroll[this.directionAxis]
                                    ? (this.instance.speed = (this.instance.delta[this.directionAxis] - this.instance.scroll[this.directionAxis]) / Math.max(1, Date.now() - this.speedTs))
                                    : (this.instance.speed = 0);
                            },
                        },
                        {
                            key: "initScrollBar",
                            value: function () {
                                if (
                                    ((this.scrollbar = document.createElement("span")),
                                    (this.scrollbarThumb = document.createElement("span")),
                                    this.scrollbar.classList.add("".concat(this.scrollbarClass)),
                                    this.scrollbarThumb.classList.add("".concat(this.scrollbarClass, "_thumb")),
                                    this.scrollbar.append(this.scrollbarThumb),
                                    this.scrollbarContainer ? this.scrollbarContainer.append(this.scrollbar) : document.body.append(this.scrollbar),
                                    (this.getScrollBar = this.getScrollBar.bind(this)),
                                    (this.releaseScrollBar = this.releaseScrollBar.bind(this)),
                                    (this.moveScrollBar = this.moveScrollBar.bind(this)),
                                    this.scrollbarThumb.addEventListener("mousedown", this.getScrollBar),
                                    window.addEventListener("mouseup", this.releaseScrollBar),
                                    window.addEventListener("mousemove", this.moveScrollBar),
                                    (this.hasScrollbar = !1),
                                    "horizontal" == this.direction)
                                ) {
                                    if (this.instance.limit.x + this.windowWidth <= this.windowWidth) return;
                                } else if (this.instance.limit.y + this.windowHeight <= this.windowHeight) return;
                                (this.hasScrollbar = !0),
                                    (this.scrollbarBCR = this.scrollbar.getBoundingClientRect()),
                                    (this.scrollbarHeight = this.scrollbarBCR.height),
                                    (this.scrollbarWidth = this.scrollbarBCR.width),
                                    "horizontal" === this.direction
                                        ? (this.scrollbarThumb.style.width = "".concat((this.scrollbarWidth * this.scrollbarWidth) / (this.instance.limit.x + this.scrollbarWidth), "px"))
                                        : (this.scrollbarThumb.style.height = "".concat((this.scrollbarHeight * this.scrollbarHeight) / (this.instance.limit.y + this.scrollbarHeight), "px")),
                                    (this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect()),
                                    (this.scrollBarLimit = { x: this.scrollbarWidth - this.scrollbarThumbBCR.width, y: this.scrollbarHeight - this.scrollbarThumbBCR.height });
                            },
                        },
                        {
                            key: "reinitScrollBar",
                            value: function () {
                                if (((this.hasScrollbar = !1), "horizontal" == this.direction)) {
                                    if (this.instance.limit.x + this.windowWidth <= this.windowWidth) return;
                                } else if (this.instance.limit.y + this.windowHeight <= this.windowHeight) return;
                                (this.hasScrollbar = !0),
                                    (this.scrollbarBCR = this.scrollbar.getBoundingClientRect()),
                                    (this.scrollbarHeight = this.scrollbarBCR.height),
                                    (this.scrollbarWidth = this.scrollbarBCR.width),
                                    "horizontal" === this.direction
                                        ? (this.scrollbarThumb.style.width = "".concat((this.scrollbarWidth * this.scrollbarWidth) / (this.instance.limit.x + this.scrollbarWidth), "px"))
                                        : (this.scrollbarThumb.style.height = "".concat((this.scrollbarHeight * this.scrollbarHeight) / (this.instance.limit.y + this.scrollbarHeight), "px")),
                                    (this.scrollbarThumbBCR = this.scrollbarThumb.getBoundingClientRect()),
                                    (this.scrollBarLimit = { x: this.scrollbarWidth - this.scrollbarThumbBCR.width, y: this.scrollbarHeight - this.scrollbarThumbBCR.height });
                            },
                        },
                        {
                            key: "destroyScrollBar",
                            value: function () {
                                this.scrollbarThumb.removeEventListener("mousedown", this.getScrollBar),
                                    window.removeEventListener("mouseup", this.releaseScrollBar),
                                    window.removeEventListener("mousemove", this.moveScrollBar),
                                    this.scrollbar.remove();
                            },
                        },
                        {
                            key: "getScrollBar",
                            value: function (t) {
                                (this.isDraggingScrollbar = !0), this.checkScroll(), this.html.classList.remove(this.scrollingClass), this.html.classList.add(this.draggingClass);
                            },
                        },
                        {
                            key: "releaseScrollBar",
                            value: function (t) {
                                (this.isDraggingScrollbar = !1), this.isScrolling && this.html.classList.add(this.scrollingClass), this.html.classList.remove(this.draggingClass);
                            },
                        },
                        {
                            key: "moveScrollBar",
                            value: function (t) {
                                var e = this;
                                this.isDraggingScrollbar &&
                                    requestAnimationFrame(function () {
                                        var n = (((100 * (t.clientX - e.scrollbarBCR.left)) / e.scrollbarWidth) * e.instance.limit.x) / 100,
                                            i = (((100 * (t.clientY - e.scrollbarBCR.top)) / e.scrollbarHeight) * e.instance.limit.y) / 100;
                                        i > 0 && i < e.instance.limit.y && (e.instance.delta.y = i), n > 0 && n < e.instance.limit.x && (e.instance.delta.x = n);
                                    });
                            },
                        },
                        {
                            key: "addElements",
                            value: function () {
                                var t = this;
                                (this.els = {}),
                                    (this.parallaxElements = {}),
                                    this.el.querySelectorAll("[data-".concat(this.name, "]")).forEach(function (e, n) {
                                        var i,
                                            r,
                                            s,
                                            o = q(e),
                                            a = Object.entries(t.sections)
                                                .map(function (t) {
                                                    var e = f(t, 2);
                                                    return e[0], e[1];
                                                })
                                                .find(function (t) {
                                                    return o.includes(t.el);
                                                }),
                                            l = e.dataset[t.name + "Class"] || t.class,
                                            c = "string" == typeof e.dataset[t.name + "Id"] ? e.dataset[t.name + "Id"] : "el" + n,
                                            u = e.dataset[t.name + "Repeat"],
                                            h = e.dataset[t.name + "Call"],
                                            d = e.dataset[t.name + "Position"],
                                            p = e.dataset[t.name + "Delay"],
                                            m = e.dataset[t.name + "Direction"],
                                            g = "string" == typeof e.dataset[t.name + "Sticky"],
                                            v = !!e.dataset[t.name + "Speed"] && parseFloat(e.dataset[t.name + "Speed"]) / 10,
                                            y = "string" == typeof e.dataset[t.name + "Offset"] ? e.dataset[t.name + "Offset"].split(",") : t.offset,
                                            _ = e.dataset[t.name + "Target"],
                                            b = (s = void 0 !== _ ? document.querySelector("".concat(_)) : e).getBoundingClientRect();
                                        null === a || a.inView ? ((i = b.top + t.instance.scroll.y - M(s).y), (r = b.left + t.instance.scroll.x - M(s).x)) : ((i = b.top - M(a.el).y - M(s).y), (r = b.left - M(a.el).x - M(s).x));
                                        var x = i + s.offsetHeight,
                                            w = r + s.offsetWidth,
                                            T = { x: (w - r) / 2 + r, y: (x - i) / 2 + i };
                                        if (g) {
                                            var k = e.getBoundingClientRect(),
                                                S = k.top,
                                                C = k.left,
                                                E = { x: C - r, y: S - i };
                                            (i += window.innerHeight),
                                                (r += window.innerWidth),
                                                (x = S + s.offsetHeight - e.offsetHeight - E[t.directionAxis]),
                                                (T = { x: ((w = C + s.offsetWidth - e.offsetWidth - E[t.directionAxis]) - r) / 2 + r, y: (x - i) / 2 + i });
                                        }
                                        u = "false" != u && (null != u || t.repeat);
                                        var A = [0, 0];
                                        if (y) {
                                            if ("horizontal" === t.direction) {
                                                for (var D = 0; D < y.length; D++) "string" == typeof y[D] ? (y[D].includes("%") ? (A[D] = parseInt((y[D].replace("%", "") * t.windowWidth) / 100)) : (A[D] = parseInt(y[D]))) : (A[D] = y[D]);
                                                (r += A[0]), (w -= A[1]);
                                            } else {
                                                for (D = 0; D < y.length; D++) "string" == typeof y[D] ? (y[D].includes("%") ? (A[D] = parseInt((y[D].replace("%", "") * t.windowHeight) / 100)) : (A[D] = parseInt(y[D]))) : (A[D] = y[D]);
                                                (i += A[0]), (x -= A[1]);
                                            }
                                        }
                                        var O = {
                                            el: e,
                                            id: c,
                                            class: l,
                                            section: a,
                                            top: i,
                                            middle: T,
                                            bottom: x,
                                            left: r,
                                            right: w,
                                            offset: y,
                                            progress: 0,
                                            repeat: u,
                                            inView: !1,
                                            call: h,
                                            speed: v,
                                            delay: p,
                                            position: d,
                                            target: s,
                                            direction: m,
                                            sticky: g,
                                        };
                                        (t.els[c] = O), e.classList.contains(l) && t.setInView(t.els[c], c), (!1 !== v || g) && (t.parallaxElements[c] = O);
                                    });
                            },
                        },
                        {
                            key: "addSections",
                            value: function () {
                                var t = this;
                                this.sections = {};
                                var e = this.el.querySelectorAll("[data-".concat(this.name, "-section]"));
                                0 === e.length && (e = [this.el]),
                                    e.forEach(function (e, n) {
                                        var i = "string" == typeof e.dataset[t.name + "Id"] ? e.dataset[t.name + "Id"] : "section" + n,
                                            r = e.getBoundingClientRect(),
                                            s = { x: r.left - 1.5 * window.innerWidth - M(e).x, y: r.top - 1.5 * window.innerHeight - M(e).y },
                                            o = { x: s.x + r.width + 2 * window.innerWidth, y: s.y + r.height + 2 * window.innerHeight },
                                            a = "string" == typeof e.dataset[t.name + "Persistent"];
                                        e.setAttribute("data-scroll-section-id", i), (t.sections[i] = { el: e, offset: s, limit: o, inView: !1, persistent: a, id: i });
                                    });
                            },
                        },
                        {
                            key: "transform",
                            value: function (t, e, n, i) {
                                var r;
                                if (i) {
                                    var s = M(t),
                                        o = B(s.x, e, i),
                                        a = B(s.y, n, i);
                                    r = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(o, ",").concat(a, ",0,1)");
                                } else r = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,".concat(e, ",").concat(n, ",0,1)");
                                (t.style.webkitTransform = r), (t.style.msTransform = r), (t.style.transform = r);
                            },
                        },
                        {
                            key: "transformElements",
                            value: function (t) {
                                var e = this,
                                    n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                                    i = this.instance.scroll.x + this.windowWidth,
                                    r = this.instance.scroll.y + this.windowHeight,
                                    s = { x: this.instance.scroll.x + this.windowMiddle.x, y: this.instance.scroll.y + this.windowMiddle.y };
                                Object.entries(this.parallaxElements).forEach(function (o) {
                                    var a = f(o, 2),
                                        l = (a[0], a[1]),
                                        c = !1;
                                    if ((t && (c = 0), l.inView || n))
                                        switch (l.position) {
                                            case "top":
                                            case "left":
                                                c = -(e.instance.scroll[e.directionAxis] * l.speed);
                                                break;
                                            case "elementTop":
                                                c = -((r - l.top) * l.speed);
                                                break;
                                            case "bottom":
                                                c = (e.instance.limit[e.directionAxis] - r + e.windowHeight) * l.speed;
                                                break;
                                            case "elementLeft":
                                                c = -((i - l.left) * l.speed);
                                                break;
                                            case "right":
                                                c = (e.instance.limit[e.directionAxis] - i + e.windowHeight) * l.speed;
                                                break;
                                            default:
                                                c = -((s[e.directionAxis] - l.middle[e.directionAxis]) * l.speed);
                                        }
                                    l.sticky &&
                                        (c = l.inView
                                            ? "horizontal" === e.direction
                                                ? e.instance.scroll.x - l.left + window.innerWidth
                                                : e.instance.scroll.y - l.top + window.innerHeight
                                            : "horizontal" === e.direction
                                            ? e.instance.scroll.x < l.left - window.innerWidth && e.instance.scroll.x < l.left - window.innerWidth / 2
                                                ? 0
                                                : e.instance.scroll.x > l.right && e.instance.scroll.x > l.right + 100 && l.right - l.left + window.innerWidth
                                            : e.instance.scroll.y < l.top - window.innerHeight && e.instance.scroll.y < l.top - window.innerHeight / 2
                                            ? 0
                                            : e.instance.scroll.y > l.bottom && e.instance.scroll.y > l.bottom + 100 && l.bottom - l.top + window.innerHeight),
                                        !1 !== c && ("horizontal" === l.direction || ("horizontal" === e.direction && "vertical" !== l.direction) ? e.transform(l.el, c, 0, !t && l.delay) : e.transform(l.el, 0, c, !t && l.delay));
                                });
                            },
                        },
                        {
                            key: "scrollTo",
                            value: function (t) {
                                var e,
                                    n = this,
                                    i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                    r = parseInt(i.offset) || 0,
                                    s = isNaN(parseInt(i.duration)) ? 1e3 : parseInt(i.duration),
                                    o = i.easing || [0.25, 0, 0.35, 1],
                                    a = !!i.disableLerp,
                                    l = !!i.callback && i.callback;
                                if (
                                    ((o = V.apply(
                                        void 0,
                                        (function (t) {
                                            if (Array.isArray(t)) return p(t);
                                        })((e = o)) ||
                                            (function (t) {
                                                if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
                                            })(e) ||
                                            d(e) ||
                                            (function () {
                                                throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                                            })()
                                    )),
                                    "string" == typeof t)
                                ) {
                                    if ("top" === t) t = 0;
                                    else if ("bottom" === t) t = this.instance.limit.y;
                                    else if ("left" === t) t = 0;
                                    else if ("right" === t) t = this.instance.limit.x;
                                    else if (!(t = document.querySelector(t))) return;
                                } else if ("number" == typeof t) t = parseInt(t);
                                else if (!t || !t.tagName) return void console.warn("`target` parameter is not valid");
                                if ("number" != typeof t) {
                                    if (!q(t).includes(this.el)) return;
                                    var c = t.getBoundingClientRect(),
                                        u = c.top,
                                        h = c.left,
                                        m = q(t).find(function (t) {
                                            return Object.entries(n.sections)
                                                .map(function (t) {
                                                    var e = f(t, 2);
                                                    return e[0], e[1];
                                                })
                                                .find(function (e) {
                                                    return e.el == t;
                                                });
                                        }),
                                        g = 0;
                                    (g = m ? M(m)[this.directionAxis] : -this.instance.scroll[this.directionAxis]), (r = "horizontal" === this.direction ? h + r - g : u + r - g);
                                } else r = t + r;
                                var v = parseFloat(this.instance.delta[this.directionAxis]),
                                    y = Math.max(0, Math.min(r, this.instance.limit[this.directionAxis])) - v,
                                    _ = function (t) {
                                        a ? ("horizontal" === n.direction ? n.setScroll(v + y * t, n.instance.delta.y) : n.setScroll(n.instance.delta.x, v + y * t)) : (n.instance.delta[n.directionAxis] = v + y * t);
                                    };
                                (this.animatingScroll = !0), this.stopScrolling(), this.startScrolling();
                                var b = Date.now();
                                (function t() {
                                    var e = (Date.now() - b) / s;
                                    e > 1 ? (_(1), (n.animatingScroll = !1), 0 == s && n.update(), l && l()) : ((n.scrollToRaf = requestAnimationFrame(t)), _(o(e)));
                                })();
                            },
                        },
                        {
                            key: "update",
                            value: function () {
                                this.setScrollLimit(), this.addSections(), this.addElements(), this.detectElements(), this.updateScroll(), this.transformElements(!0), this.reinitScrollBar(), this.checkScroll(!0);
                            },
                        },
                        {
                            key: "startScroll",
                            value: function () {
                                this.stop = !1;
                            },
                        },
                        {
                            key: "stopScroll",
                            value: function () {
                                this.stop = !0;
                            },
                        },
                        {
                            key: "setScroll",
                            value: function (t, e) {
                                this.instance = s(s({}, this.instance), {}, { scroll: { x: t, y: e }, delta: { x: t, y: e }, speed: 0 });
                            },
                        },
                        {
                            key: "destroy",
                            value: function () {
                                h(a(r.prototype), "destroy", this).call(this),
                                    this.stopScrolling(),
                                    this.html.classList.remove(this.smoothClass),
                                    this.vs.destroy(),
                                    this.destroyScrollBar(),
                                    window.removeEventListener("keydown", this.checkKey, !1);
                            },
                        },
                    ]),
                    r
                );
            })(g);
        return (function () {
            function e() {
                var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                t(this, e),
                    (this.options = n),
                    Object.assign(this, m, n),
                    (this.smartphone = m.smartphone),
                    n.smartphone && Object.assign(this.smartphone, n.smartphone),
                    (this.tablet = m.tablet),
                    n.tablet && Object.assign(this.tablet, n.tablet),
                    this.smooth || "horizontal" != this.direction || console.warn("\uD83D\uDEA8 `smooth:false` & `horizontal` direction are not yet compatible"),
                    this.tablet.smooth || "horizontal" != this.tablet.direction || console.warn("\uD83D\uDEA8 `smooth:false` & `horizontal` direction are not yet compatible (tablet)"),
                    this.smartphone.smooth || "horizontal" != this.smartphone.direction || console.warn("\uD83D\uDEA8 `smooth:false` & `horizontal` direction are not yet compatible (smartphone)"),
                    this.init();
            }
            return (
                n(e, [
                    {
                        key: "init",
                        value: function () {
                            if (
                                ((this.options.isMobile =
                                    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || ("MacIntel" === navigator.platform && navigator.maxTouchPoints > 1) || window.innerWidth < this.tablet.breakpoint),
                                (this.options.isTablet = this.options.isMobile && window.innerWidth >= this.tablet.breakpoint),
                                (this.smooth && !this.options.isMobile) || (this.tablet.smooth && this.options.isTablet) || (this.smartphone.smooth && this.options.isMobile && !this.options.isTablet)
                                    ? (this.scroll = new U(this.options))
                                    : (this.scroll = new b(this.options)),
                                this.scroll.init(),
                                window.location.hash)
                            ) {
                                var t = window.location.hash.slice(1, window.location.hash.length),
                                    e = document.getElementById(t);
                                e && this.scroll.scrollTo(e);
                            }
                        },
                    },
                    {
                        key: "update",
                        value: function () {
                            this.scroll.update();
                        },
                    },
                    {
                        key: "start",
                        value: function () {
                            this.scroll.startScroll();
                        },
                    },
                    {
                        key: "stop",
                        value: function () {
                            this.scroll.stopScroll();
                        },
                    },
                    {
                        key: "scrollTo",
                        value: function (t, e) {
                            this.scroll.scrollTo(t, e);
                        },
                    },
                    {
                        key: "setScroll",
                        value: function (t, e) {
                            this.scroll.setScroll(t, e);
                        },
                    },
                    {
                        key: "on",
                        value: function (t, e) {
                            this.scroll.setEvents(t, e);
                        },
                    },
                    {
                        key: "off",
                        value: function (t, e) {
                            this.scroll.unsetEvents(t, e);
                        },
                    },
                    {
                        key: "destroy",
                        value: function () {
                            this.scroll.destroy();
                        },
                    },
                ]),
                e
            );
        })();
    }),
    (function (t, e) {
        "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(((t = t || self).window = t.window || {}));
    })(this, function (t) {
        "use strict";
        function e(t, e) {
            (t.prototype = Object.create(e.prototype)), ((t.prototype.constructor = t).__proto__ = e);
        }
        function n(t) {
            if (void 0 === t) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
        }
        function i(t) {
            return "string" == typeof t;
        }
        function r(t) {
            return "function" == typeof t;
        }
        function s(t) {
            return "number" == typeof t;
        }
        function o(t) {
            return void 0 === t;
        }
        function a(t) {
            return "object" == typeof t;
        }
        function l(t) {
            return !1 !== t;
        }
        function c() {
            return "undefined" != typeof window;
        }
        function u(t) {
            return r(t) || i(t);
        }
        function h(t) {
            return (tk = ep(t, en)) && n_;
        }
        function f(t, e) {
            return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()");
        }
        function d(t, e) {
            return !e && console.warn(t);
        }
        function p(t, e) {
            return (t && (en[t] = e) && tk && (tk[t] = e)) || en;
        }
        function m() {
            return 0;
        }
        function g(t) {
            var e,
                n,
                i = t[0];
            if ((a(i) || r(i) || (t = [t]), !(e = (i._gsap || {}).harness))) {
                for (n = ef.length; n-- && !ef[n].targetTest(i); );
                e = ef[n];
            }
            for (n = t.length; n--; ) (t[n] && (t[n]._gsap || (t[n]._gsap = new eB(t[n], e)))) || t.splice(n, 1);
            return t;
        }
        function v(t) {
            return t._gsap || g(e8(t))[0]._gsap;
        }
        function y(t, e, n) {
            return (n = t[e]) && r(n) ? t[e]() : (o(n) && t.getAttribute && t.getAttribute(e)) || n;
        }
        function _(t, e) {
            return (t = t.split(",")).forEach(e) || t;
        }
        function b(t) {
            return Math.round(1e5 * t) / 1e5 || 0;
        }
        function x(t) {
            return Math.round(1e7 * t) / 1e7 || 0;
        }
        function w(t, e) {
            var n = e.charAt(0),
                i = parseFloat(e.substr(2));
            return (t = parseFloat(t)), "+" === n ? t + i : "-" === n ? t - i : "*" === n ? t * i : t / i;
        }
        function T(t, e) {
            for (var n = e.length, i = 0; 0 > t.indexOf(e[i]) && ++i < n; );
            return i < n;
        }
        function k() {
            var t,
                e,
                n = ea.length,
                i = ea.slice(0);
            for (el = {}, t = ea.length = 0; t < n; t++) (e = i[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
        }
        function S(t, e, n, i) {
            ea.length && !t_ && k(), t.render(e, n, i || (t_ && e < 0 && (t._initted || t._startAt))), ea.length && !t_ && k();
        }
        function C(t) {
            var e = parseFloat(t);
            return (e || 0 === e) && (t + "").match(et).length < 2 ? e : i(t) ? t.trim() : t;
        }
        function E(t) {
            return t;
        }
        function A(t, e) {
            for (var n in e) n in t || (t[n] = e[n]);
            return t;
        }
        function D(t, e) {
            for (var n in e) "__proto__" !== n && "constructor" !== n && "prototype" !== n && (t[n] = a(e[n]) ? D(t[n] || (t[n] = {}), e[n]) : e[n]);
            return t;
        }
        function O(t, e) {
            var n,
                i = {};
            for (n in t) n in e || (i[n] = t[n]);
            return i;
        }
        function L(t) {
            var e,
                n = t.parent || tb,
                i = t.keyframes
                    ? ((e = t5(t.keyframes)),
                      function (t, n) {
                          for (var i in n) i in t || ("duration" === i && e) || "ease" === i || (t[i] = n[i]);
                      })
                    : A;
            if (l(t.inherit)) for (; n; ) i(t, n.vars.defaults), (n = n.parent || n._dp);
            return t;
        }
        function P(t, e, n, i, r) {
            void 0 === n && (n = "_first"), void 0 === i && (i = "_last");
            var s,
                o = t[i];
            if (r) for (s = e[r]; o && o[r] > s; ) o = o._prev;
            return o ? ((e._next = o._next), (o._next = e)) : ((e._next = t[n]), (t[n] = e)), e._next ? (e._next._prev = e) : (t[i] = e), (e._prev = o), (e.parent = e._dp = t), e;
        }
        function j(t, e, n, i) {
            void 0 === n && (n = "_first"), void 0 === i && (i = "_last");
            var r = e._prev,
                s = e._next;
            r ? (r._next = s) : t[n] === e && (t[n] = s), s ? (s._prev = r) : t[i] === e && (t[i] = r), (e._next = e._prev = e.parent = null);
        }
        function R(t, e) {
            t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), (t._act = 0);
        }
        function H(t, e) {
            if (t && (!e || e._end > t._dur || e._start < 0)) for (var n = t; n; ) (n._dirty = 1), (n = n.parent);
            return t;
        }
        function B(t, e, n, i) {
            return t._startAt && (t_ ? t._startAt.revert(er) : (t.vars.immediateRender && !t.vars.autoRevert) || t._startAt.render(e, !0, i));
        }
        function M(t) {
            return t._repeat ? e$(t._tTime, (t = t.duration() + t._rDelay)) * t : 0;
        }
        function q(t, e) {
            return (t - e._start) * e._ts + (0 <= e._ts ? 0 : e._dirty ? e.totalDuration() : e._tDur);
        }
        function N(t) {
            return (t._end = x(t._start + (t._tDur / Math.abs(t._ts || t._rts || t2) || 0)));
        }
        function z(t, e) {
            var n = t._dp;
            return n && n.smoothChildTiming && t._ts && ((t._start = x(n._time - (0 < t._ts ? e / t._ts : -(((t._dirty ? t.totalDuration() : t._tDur) - e) / t._ts)))), N(t), n._dirty || H(n, t)), t;
        }
        function W(t, e) {
            var n;
            if (
                ((e._time || (!e._dur && e._initted) || (e._start < t._time && (e._dur || !e.add))) && ((n = q(t.rawTime(), e)), (!e._dur || ey(0, e.totalDuration(), n) - e._tTime > t2) && e.render(n, !0)),
                H(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
            ) {
                if (t._dur < t.duration()) for (n = t; n._dp; ) 0 <= n.rawTime() && n.totalTime(n._tTime), (n = n._dp);
                t._zTime = -t2;
            }
        }
        function I(t, e, n, i) {
            return (
                e.parent && R(e),
                (e._start = x((s(n) ? n : n || t !== tb ? ev(t, n, e) : t._time) + e._delay)),
                (e._end = x(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0))),
                P(t, e, "_first", "_last", t._sort ? "_start" : 0),
                em(e) || (t._recent = e),
                i || W(t, e),
                t._ts < 0 && z(t, t._tTime),
                t
            );
        }
        function Y(t, e) {
            return (en.ScrollTrigger || f("scrollTrigger", e)) && en.ScrollTrigger.create(e, t);
        }
        function X(t, e, n, i, r) {
            return eY(t, e, r), t._initted ? (!n && t._pt && !t_ && ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) && tC !== eE.frame ? (ea.push(t), (t._lazy = [r, i]), 1) : void 0) : 1;
        }
        function F(t, e, n, i) {
            var r = t._repeat,
                s = x(e) || 0,
                o = t._tTime / t._tDur;
            return o && !i && (t._time *= s / t._dur), (t._dur = s), (t._tDur = r ? (r < 0 ? 1e10 : x(s * (r + 1) + t._rDelay * r)) : s), 0 < o && !i && z(t, (t._tTime = t._tDur * o)), t.parent && N(t), n || H(t.parent, t), t;
        }
        function V(t) {
            return t instanceof eq ? H(t) : F(t, t._dur);
        }
        function U(t, e, n) {
            var i,
                r,
                o = s(e[1]),
                a = (o ? 2 : 1) + (t < 2 ? 0 : 1),
                c = e[a];
            if ((o && (c.duration = e[1]), (c.parent = n), t)) {
                for (i = c, r = n; r && !("immediateRender" in i); ) (i = r.vars.defaults || {}), (r = l(r.vars.inherit) && r.parent);
                (c.immediateRender = l(i.immediateRender)), t < 2 ? (c.runBackwards = 1) : (c.startAt = e[a - 1]);
            }
            return new e4(e[0], c, e[1 + a]);
        }
        function K(t, e) {
            return t || 0 === t ? e(t) : e;
        }
        function G(t, e) {
            return i(t) && (e = ee.exec(t)) ? e[1] : "";
        }
        function Q(t, e) {
            return t && a(t) && "length" in t && ((!e && !t.length) || (t.length - 1 in t && a(t[0]))) && !t.nodeType && t !== tx;
        }
        function Z(t) {
            return (
                (t = e8(t)[0] || d("Invalid scope") || {}),
                function (e) {
                    var n = t.current || t.nativeElement || t;
                    return e8(e, n.querySelectorAll ? n : n === t ? d("Invalid scope") || tT.createElement("div") : t);
                }
            );
        }
        function J(t) {
            return t.sort(function () {
                return 0.5 - Math.random();
            });
        }
        function tt(t) {
            if (r(t)) return t;
            var e = a(t) ? t : { each: t },
                n = eP(e.ease),
                s = e.from || 0,
                o = parseFloat(e.base) || 0,
                l = {},
                c = 0 < s && s < 1,
                u = isNaN(s) || c,
                h = e.axis,
                f = s,
                d = s;
            return (
                i(s) ? (f = d = { center: 0.5, edges: 0.5, end: 1 }[s] || 0) : !c && u && ((f = s[0]), (d = s[1])),
                function (t, i, r) {
                    var a,
                        c,
                        p,
                        m,
                        g,
                        v,
                        y,
                        _,
                        b,
                        w = (r || e).length,
                        T = l[w];
                    if (!T) {
                        if (!(b = "auto" === e.grid ? 0 : (e.grid || [1, tX])[1])) {
                            for (y = -tX; y < (y = r[b++].getBoundingClientRect().left) && b < w; );
                            b < w && b--;
                        }
                        for (T = l[w] = [], a = u ? Math.min(b, w) * f - 0.5 : s % b, c = b === tX ? 0 : u ? (w * d) / b - 0.5 : (s / b) | 0, _ = tX, v = y = 0; v < w; v++)
                            (p = (v % b) - a), (m = c - ((v / b) | 0)), (T[v] = g = h ? Math.abs("y" === h ? m : p) : t9(p * p + m * m)), y < g && (y = g), g < _ && (_ = g);
                        "random" === s && J(T),
                            (T.max = y - _),
                            (T.min = _),
                            (T.v = w = (parseFloat(e.amount) || parseFloat(e.each) * (w < b ? w - 1 : h ? ("y" === h ? w / b : b) : Math.max(b, w / b)) || 0) * ("edges" === s ? -1 : 1)),
                            (T.b = w < 0 ? o - w : o),
                            (T.u = G(e.amount || e.each) || 0),
                            (n = n && w < 0 ? eL(n) : n);
                    }
                    return (w = (T[t] - T.min) / T.max || 0), x(T.b + (n ? n(w) : w) * T.v) + T.u;
                }
            );
        }
        function te(t) {
            var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
            return function (n) {
                var i = x(Math.round(parseFloat(n) / t) * t * e);
                return (i - (i % 1)) / e + (s(n) ? 0 : G(n));
            };
        }
        function tn(t, e) {
            var n,
                i,
                o = t5(t);
            return (
                !o && a(t) && ((n = o = t.radius || tX), t.values ? ((t = e8(t.values)), (i = !s(t[0])) && (n *= n)) : (t = te(t.increment))),
                K(
                    e,
                    o
                        ? r(t)
                            ? function (e) {
                                  return Math.abs((i = t(e)) - e) <= n ? i : e;
                              }
                            : function (e) {
                                  for (var r, o, a = parseFloat(i ? e.x : e), l = parseFloat(i ? e.y : 0), c = tX, u = 0, h = t.length; h--; )
                                      (r = i ? (r = t[h].x - a) * r + (o = t[h].y - l) * o : Math.abs(t[h] - a)) < c && ((c = r), (u = h));
                                  return (u = !n || c <= n ? t[u] : e), i || u === e || s(e) ? u : u + G(e);
                              }
                        : te(t)
                )
            );
        }
        function ti(t, e, n, i) {
            return K(t5(t) ? !e : !0 === n ? ((n = 0), !1) : !i, function () {
                return t5(t) ? t[~~(Math.random() * t.length)] : (i = (n = n || 1e-5) < 1 ? Math.pow(10, (n + "").length - 2) : 1) && Math.floor(Math.round((t - n / 2 + Math.random() * (e - t + 0.99 * n)) / n) * n * i) / i;
            });
        }
        function tr(t, e, n) {
            return K(n, function (n) {
                return t[~~e(n)];
            });
        }
        function ts(t) {
            for (var e, n, i, r, s = 0, o = ""; ~(e = t.indexOf("random(", s)); )
                (i = t.indexOf(")", e)), (r = "[" === t.charAt(e + 7)), (n = t.substr(e + 7, i - e - 7).match(r ? et : tK)), (o += t.substr(s, e - s) + ti(r ? n : +n[0], r ? 0 : +n[1], +n[2] || 1e-5)), (s = i + 1);
            return o + t.substr(s, t.length - s);
        }
        function to(t, e, n) {
            var i,
                r,
                s,
                o = t.labels,
                a = tX;
            for (i in o) (r = o[i] - e) < 0 == !!n && r && a > (r = Math.abs(r)) && ((s = i), (a = r));
            return s;
        }
        function ta(t) {
            return R(t), t.scrollTrigger && t.scrollTrigger.kill(!!t_), 1 > t.progress() && ex(t, "onInterrupt"), t;
        }
        function tl(t) {
            if (t) {
                if (((t = (!t.name && t.default) || t), c() || t.headless)) {
                    var e = t.name,
                        n = r(t),
                        i =
                            e && !n && t.init
                                ? function () {
                                      this._props = [];
                                  }
                                : t,
                        s = { init: m, render: eZ, add: e3, kill: nt, modifier: eJ, rawVars: 0 },
                        o = { targetTest: 0, get: 0, getSetter: e5, aliases: {}, register: 0 };
                    if ((eA(), t !== i)) {
                        if (ec[e]) return;
                        A(i, A(O(t, s), o)), ep(i.prototype, ep(s, O(t, o))), (ec[(i.prop = e)] = i), t.targetTest && (ef.push(i), (eo[e] = 1)), (e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin");
                    }
                    p(e, i), t.register && t.register(n_, i, nn);
                } else ew.push(t);
            }
        }
        function tc(t, e, n) {
            return ((6 * (t += t < 0 ? 1 : 1 < t ? -1 : 0) < 1 ? e + (n - e) * t * 6 : t < 0.5 ? n : 3 * t < 2 ? e + (n - e) * (2 / 3 - t) * 6 : e) * eT + 0.5) | 0;
        }
        function tu(t, e, n) {
            var i,
                r,
                o,
                a,
                l,
                c,
                u,
                h,
                f,
                d,
                p = t ? (s(t) ? [t >> 16, (t >> 8) & eT, t & eT] : 0) : ek.black;
            if (!p) {
                if (("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), ek[t])) p = ek[t];
                else if ("#" === t.charAt(0)) {
                    if ((t.length < 6 && (t = "#" + (i = t.charAt(1)) + i + (r = t.charAt(2)) + r + (o = t.charAt(3)) + o + (5 === t.length ? t.charAt(4) + t.charAt(4) : "")), 9 === t.length))
                        return [(p = parseInt(t.substr(1, 6), 16)) >> 16, (p >> 8) & eT, p & eT, parseInt(t.substr(7), 16) / 255];
                    p = [(t = parseInt(t.substr(1), 16)) >> 16, (t >> 8) & eT, t & eT];
                } else if ("hsl" === t.substr(0, 3)) {
                    if (((p = d = t.match(tK)), e)) {
                        if (~t.indexOf("=")) return (p = t.match(tG)), n && p.length < 4 && (p[3] = 1), p;
                    } else
                        (a = (+p[0] % 360) / 360),
                            (l = p[1] / 100),
                            (i = 2 * (c = p[2] / 100) - (r = c <= 0.5 ? c * (l + 1) : c + l - c * l)),
                            3 < p.length && (p[3] *= 1),
                            (p[0] = tc(a + 1 / 3, i, r)),
                            (p[1] = tc(a, i, r)),
                            (p[2] = tc(a - 1 / 3, i, r));
                } else p = t.match(tK) || ek.transparent;
                p = p.map(Number);
            }
            return (
                e &&
                    !d &&
                    ((i = p[0] / eT),
                    (c = ((u = Math.max(i, (r = p[1] / eT), (o = p[2] / eT))) + (h = Math.min(i, r, o))) / 2),
                    u === h ? (a = l = 0) : ((f = u - h), (l = 0.5 < c ? f / (2 - u - h) : f / (u + h)), (a = u === i ? (r - o) / f + (r < o ? 6 : 0) : u === r ? (o - i) / f + 2 : (i - r) / f + 4), (a *= 60)),
                    (p[0] = ~~(a + 0.5)),
                    (p[1] = ~~(100 * l + 0.5)),
                    (p[2] = ~~(100 * c + 0.5))),
                n && p.length < 4 && (p[3] = 1),
                p
            );
        }
        function th(t) {
            var e = [],
                n = [],
                i = -1;
            return (
                t.split(eS).forEach(function (t) {
                    var r = t.match(tQ) || [];
                    e.push.apply(e, r), n.push((i += r.length + 1));
                }),
                (e.c = n),
                e
            );
        }
        function tf(t, e, n) {
            var i,
                r,
                s,
                o,
                a = "",
                l = (t + a).match(eS),
                c = e ? "hsla(" : "rgba(",
                u = 0;
            if (!l) return t;
            if (
                ((l = l.map(function (t) {
                    return (t = tu(t, e, 1)) && c + (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) + ")";
                })),
                n && ((s = th(t)), (i = n.c).join(a) !== s.c.join(a)))
            )
                for (o = (r = t.replace(eS, "1").split(tQ)).length - 1; u < o; u++) a += r[u] + (~i.indexOf(u) ? l.shift() || c + "0,0,0,0)" : (s.length ? s : l.length ? l : n).shift());
            if (!r) for (o = (r = t.split(eS)).length - 1; u < o; u++) a += r[u] + l[u];
            return a + r[o];
        }
        function td(t) {
            var e,
                n = t.join(" ");
            if (((eS.lastIndex = 0), eS.test(n))) return (e = eC.test(n)), (t[1] = tf(t[1], e)), (t[0] = tf(t[0], e, th(t[1]))), !0;
        }
        function tp(t, e) {
            for (var n, i = t._first; i; )
                i instanceof eq ? tp(i, e) : !i.vars.yoyoEase || (i._yoyo && i._repeat) || i._yoyo === e || (i.timeline ? tp(i.timeline, e) : ((n = i._ease), (i._ease = i._yEase), (i._yEase = n), (i._yoyo = e))), (i = i._next);
        }
        function t$(t, e, n, i) {
            void 0 === n &&
                (n = function t(n) {
                    return 1 - e(1 - n);
                }),
                void 0 === i &&
                    (i = function t(n) {
                        return n < 0.5 ? e(2 * n) / 2 : 1 - e(2 * (1 - n)) / 2;
                    });
            var r,
                s = { easeIn: e, easeOut: n, easeInOut: i };
            return (
                _(t, function (t) {
                    for (var e in ((eD[t] = en[t] = s), (eD[(r = t.toLowerCase())] = n), s)) eD[r + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = eD[t + "." + e] = s[e];
                }),
                s
            );
        }
        function tm(t) {
            return function (e) {
                return e < 0.5 ? (1 - t(1 - 2 * e)) / 2 : 0.5 + t(2 * (e - 0.5)) / 2;
            };
        }
        function tg(t, e, n) {
            function i(t) {
                return 1 === t ? 1 : r * Math.pow(2, -10 * t) * tU((t - o) * s) + 1;
            }
            var r = 1 <= e ? e : 1,
                s = (n || (t ? 0.3 : 0.45)) / (e < 1 ? e : 1),
                o = (s / tF) * (Math.asin(1 / r) || 0),
                a =
                    "out" === t
                        ? i
                        : "in" === t
                        ? function (t) {
                              return 1 - i(1 - t);
                          }
                        : tm(i);
            return (
                (s = tF / s),
                (a.config = function (e, n) {
                    return tg(t, e, n);
                }),
                a
            );
        }
        function tv(t, e) {
            function n(t) {
                return t ? --t * t * ((e + 1) * t + e) + 1 : 0;
            }
            void 0 === e && (e = 1.70158);
            var i =
                "out" === t
                    ? n
                    : "in" === t
                    ? function (t) {
                          return 1 - n(1 - t);
                      }
                    : tm(n);
            return (
                (i.config = function (e) {
                    return tv(t, e);
                }),
                i
            );
        }
        var ty,
            t_,
            t8,
            tb,
            tx,
            tw,
            tT,
            tk,
            tS,
            tC,
            tE,
            tA,
            tD,
            tO,
            t0,
            tL,
            tP,
            tj,
            tR,
            tH,
            tB,
            t1,
            tM,
            tq,
            tN,
            tz,
            tW,
            tI,
            t3 = { autoSleep: 120, force3D: "auto", nullTargetWarn: 1, units: { lineHeight: "" } },
            tY = { duration: 0.5, overwrite: !1, delay: 0 },
            tX = 1e8,
            t2 = 1 / tX,
            tF = 2 * Math.PI,
            t4 = tF / 4,
            tV = 0,
            t9 = Math.sqrt,
            t7 = Math.cos,
            tU = Math.sin,
            t6 = ("function" == typeof ArrayBuffer && ArrayBuffer.isView) || function () {},
            t5 = Array.isArray,
            tK = /(?:-?\.?\d|\.)+/gi,
            tG = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
            tQ = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
            tZ = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
            tJ = /[+-]=-?[.\d]+/,
            et = /[^,'"\[\]\s]+/gi,
            ee = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
            en = {},
            ei = { suppressEvents: !0, isStart: !0, kill: !1 },
            er = { suppressEvents: !0, kill: !1 },
            es = { suppressEvents: !0 },
            eo = {},
            ea = [],
            el = {},
            ec = {},
            eu = {},
            eh = 30,
            ef = [],
            ed = "",
            ep = function t(e, n) {
                for (var i in n) e[i] = n[i];
                return e;
            },
            e$ = function t(e, n) {
                var i = Math.floor((e /= n));
                return e && i === e ? i - 1 : i;
            },
            em = function t(e) {
                var n = e.data;
                return "isFromStart" === n || "isStart" === n;
            },
            eg = { _start: 0, endTime: m, totalDuration: m },
            ev = function t(e, n, r) {
                var s,
                    o,
                    a,
                    l = e.labels,
                    c = e._recent || eg,
                    u = e.duration() >= tX ? c.endTime(!1) : e._dur;
                return i(n) && (isNaN(n) || n in l)
                    ? ((o = n.charAt(0)),
                      (a = "%" === n.substr(-1)),
                      (s = n.indexOf("=")),
                      "<" === o || ">" === o
                          ? (0 <= s && (n = n.replace(/=/, "")), ("<" === o ? c._start : c.endTime(0 <= c._repeat)) + (parseFloat(n.substr(1)) || 0) * (a ? (s < 0 ? c : r).totalDuration() / 100 : 1))
                          : s < 0
                          ? (n in l || (l[n] = u), l[n])
                          : ((o = parseFloat(n.charAt(s - 1) + n.substr(s + 1))), a && r && (o = (o / 100) * (t5(r) ? r[0] : r).totalDuration()), 1 < s ? t(e, n.substr(0, s - 1), r) + o : u + o))
                    : null == n
                    ? u
                    : +n;
            },
            ey = function t(e, n, i) {
                return i < e ? e : n < i ? n : i;
            },
            e_ = [].slice,
            e8 = function t(e, n, r) {
                var s, o, a;
                return t8 && !n && t8.selector
                    ? t8.selector(e)
                    : !i(e) || r || (!tw && eA())
                    ? t5(e)
                        ? ((s = e),
                          (o = r),
                          void 0 === a && (a = []),
                          s.forEach(function (t) {
                              return (i(t) && !o) || Q(t, 1) ? a.push.apply(a, e8(t)) : a.push(t);
                          }) || a)
                        : Q(e)
                        ? e_.call(e, 0)
                        : e
                        ? [e]
                        : []
                    : e_.call((n || tT).querySelectorAll(e), 0);
            },
            eb = function t(e, n, i, r, s) {
                var o = n - e,
                    a = r - i;
                return K(s, function (t) {
                    return i + (((t - e) / o) * a || 0);
                });
            },
            ex = function t(e, n, i) {
                var r,
                    s,
                    o,
                    a = e.vars,
                    l = a[n],
                    c = t8,
                    u = e._ctx;
                if (l) return (r = a[n + "Params"]), (s = a.callbackScope || e), i && ea.length && k(), u && (t8 = u), (o = r ? l.apply(s, r) : l.call(s)), (t8 = c), o;
            },
            ew = [],
            eT = 255,
            ek = {
                aqua: [0, eT, eT],
                lime: [0, eT, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, eT],
                navy: [0, 0, 128],
                white: [eT, eT, eT],
                olive: [128, 128, 0],
                yellow: [eT, eT, 0],
                orange: [eT, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [eT, 0, 0],
                pink: [eT, 192, 203],
                cyan: [0, eT, eT],
                transparent: [eT, eT, eT, 0],
            },
            eS = (function () {
                var t,
                    e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
                for (t in ek) e += "|" + t + "\\b";
                return RegExp(e + ")", "gi");
            })(),
            eC = /hsl[a]?\(/,
            eE =
                ((tH = 500),
                (tB = 33),
                (tM = t1 = (tR = Date.now)()),
                (tN = tq = 1e3 / 240),
                (tL = {
                    time: 0,
                    frame: 0,
                    tick: function t() {
                        ej(!0);
                    },
                    deltaRatio: function t(e) {
                        return tP / (1e3 / (e || 60));
                    },
                    wake: function t() {
                        tS &&
                            (!tw && c() && ((tT = (tx = tw = window).document || {}), (en.gsap = n_), (tx.gsapVersions || (tx.gsapVersions = [])).push(n_.version), h(tk || tx.GreenSockGlobals || (!tx.gsap && tx) || {}), ew.forEach(tl)),
                            (t0 = "undefined" != typeof requestAnimationFrame && requestAnimationFrame),
                            tD && tL.sleep(),
                            (tO =
                                t0 ||
                                function (t) {
                                    return setTimeout(t, (tN - 1e3 * tL.time + 1) | 0);
                                }),
                            (tA = 1),
                            ej(2));
                    },
                    sleep: function t() {
                        (t0 ? cancelAnimationFrame : clearTimeout)(tD), (tA = 0), (tO = m);
                    },
                    lagSmoothing: function t(e, n) {
                        tB = Math.min(n || 33, (tH = e || 1 / 0));
                    },
                    fps: function t(e) {
                        (tq = 1e3 / (e || 240)), (tN = 1e3 * tL.time + tq);
                    },
                    add: function t(e, n, i) {
                        var r = n
                            ? function (t, n, i, s) {
                                  e(t, n, i, s), tL.remove(r);
                              }
                            : e;
                        return tL.remove(e), tz[i ? "unshift" : "push"](r), eA(), r;
                    },
                    remove: function t(e, n) {
                        ~(n = tz.indexOf(e)) && tz.splice(n, 1) && n <= tj && tj--;
                    },
                    _listeners: (tz = []),
                })),
            eA = function t() {
                return !tA && eE.wake();
            },
            eD = {},
            eO = /^[\d.\-M][\d.\-,\s]/,
            e0 = /["']/g,
            eL = function t(e) {
                return function (t) {
                    return 1 - e(1 - t);
                };
            },
            eP = function t(e, n) {
                var i, s, o, a, l, c, u;
                return (
                    (e &&
                        (r(e)
                            ? e
                            : eD[e] ||
                              ((o = eD[(s = ((i = e) + "").split("("))[0]]) && 1 < s.length && o.config
                                  ? o.config.apply(
                                        null,
                                        ~i.indexOf("{")
                                            ? [
                                                  (function t(e) {
                                                      for (var n, i, r, s = {}, o = e.substr(1, e.length - 3).split(":"), a = o[0], l = 1, c = o.length; l < c; l++)
                                                          (i = o[l]), (n = l !== c - 1 ? i.lastIndexOf(",") : i.length), (r = i.substr(0, n)), (s[a] = isNaN(r) ? r.replace(e0, "").trim() : +r), (a = i.substr(n + 1).trim());
                                                      return s;
                                                  })(s[1]),
                                              ]
                                            : ((l = (a = i).indexOf("(") + 1), (c = a.indexOf(")")), (u = a.indexOf("(", l)), a.substring(l, ~u && u < c ? a.indexOf(")", c + 1) : c)).split(",").map(C)
                                    )
                                  : eD._CE && eO.test(i)
                                  ? eD._CE("", i)
                                  : o))) ||
                    n
                );
            };
        function ej(t) {
            var e,
                n,
                i,
                r,
                s = tR() - tM,
                o = !0 === t;
            if (((tH < s || s < 0) && (t1 += s - tB), (0 < (e = (i = (tM += s) - t1) - tN) || o) && ((r = ++tL.frame), (tP = i - 1e3 * tL.time), (tL.time = i /= 1e3), (tN += e + (tq <= e ? 4 : tq - e)), (n = 1)), o || (tD = tO(ej)), n))
                for (tj = 0; tj < tz.length; tj++) tz[tj](i, tP, r, t);
        }
        function eR(t) {
            return t < tI ? tW * t * t : t < 0.7272727272727273 ? tW * Math.pow(t - 1.5 / 2.75, 2) + 0.75 : t < 0.9090909090909092 ? tW * (t -= 2.25 / 2.75) * t + 0.9375 : tW * Math.pow(t - 2.625 / 2.75, 2) + 0.984375;
        }
        _("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
            var n = e < 5 ? e + 1 : e;
            t$(
                t + ",Power" + (n - 1),
                e
                    ? function (t) {
                          return Math.pow(t, n);
                      }
                    : function (t) {
                          return t;
                      },
                function (t) {
                    return 1 - Math.pow(1 - t, n);
                },
                function (t) {
                    return t < 0.5 ? Math.pow(2 * t, n) / 2 : 1 - Math.pow(2 * (1 - t), n) / 2;
                }
            );
        }),
            (eD.Linear.easeNone = eD.none = eD.Linear.easeIn),
            t$("Elastic", tg("in"), tg("out"), tg()),
            (tW = 7.5625),
            (tI = 1 / 2.75),
            t$(
                "Bounce",
                function (t) {
                    return 1 - eR(1 - t);
                },
                eR
            ),
            t$("Expo", function (t) {
                return t ? Math.pow(2, 10 * (t - 1)) : 0;
            }),
            t$("Circ", function (t) {
                return -(t9(1 - t * t) - 1);
            }),
            t$("Sine", function (t) {
                return 1 === t ? 1 : 1 - t7(t * t4);
            }),
            t$("Back", tv("in"), tv("out"), tv()),
            (eD.SteppedEase = eD.steps = en.SteppedEase = {
                config: function t(e, n) {
                    void 0 === e && (e = 1);
                    var i = 1 / e,
                        r = e + (n ? 0 : 1),
                        s = n ? 1 : 0;
                    return function (t) {
                        return (((r * ey(0, 0.99999999, t)) | 0) + s) * i;
                    };
                },
            }),
            (tY.ease = eD["quad.out"]),
            _("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (t) {
                return (ed += t + "," + t + "Params,");
            });
        var eH,
            eB = function t(e, n) {
                (this.id = tV++), ((e._gsap = this).target = e), (this.harness = n), (this.get = n ? n.get : y), (this.set = n ? n.getSetter : e5);
            },
            e1 =
                (((eH = eM.prototype).delay = function t(e) {
                    return e || 0 === e ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + e - this._delay), (this._delay = e), this) : this._delay;
                }),
                (eH.duration = function t(e) {
                    return arguments.length ? this.totalDuration(0 < this._repeat ? e + (e + this._rDelay) * this._repeat : e) : this.totalDuration() && this._dur;
                }),
                (eH.totalDuration = function t(e) {
                    return arguments.length ? ((this._dirty = 0), F(this, this._repeat < 0 ? e : (e - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
                }),
                (eH.totalTime = function t(e, n) {
                    if ((eA(), !arguments.length)) return this._tTime;
                    var i = this._dp;
                    if (i && i.smoothChildTiming && this._ts) {
                        for (z(this, e), !i._dp || i.parent || W(i, this); i && i.parent; )
                            i.parent._time !== i._start + (0 <= i._ts ? i._tTime / i._ts : -((i.totalDuration() - i._tTime) / i._ts)) && i.totalTime(i._tTime, !0), (i = i.parent);
                        !this.parent && this._dp.autoRemoveChildren && ((0 < this._ts && e < this._tDur) || (this._ts < 0 && 0 < e) || (!this._tDur && !e)) && I(this._dp, this, this._start - this._delay);
                    }
                    return (this._tTime === e && (this._dur || n) && (!this._initted || Math.abs(this._zTime) !== t2) && (e || this._initted || (!this.add && !this._ptLookup))) || (this._ts || (this._pTime = e), S(this, e, n)), this;
                }),
                (eH.time = function t(e, n) {
                    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), e + M(this)) % (this._dur + this._rDelay) || (e ? this._dur : 0), n) : this._time;
                }),
                (eH.totalProgress = function t(e, n) {
                    return arguments.length ? this.totalTime(this.totalDuration() * e, n) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : 0 < this.rawTime() ? 1 : 0;
                }),
                (eH.progress = function t(e, n) {
                    return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? e : 1 - e) + M(this), n) : this.duration() ? Math.min(1, this._time / this._dur) : 0 < this.rawTime() ? 1 : 0;
                }),
                (eH.iteration = function t(e, n) {
                    var i = this.duration() + this._rDelay;
                    return arguments.length ? this.totalTime(this._time + (e - 1) * i, n) : this._repeat ? e$(this._tTime, i) + 1 : 1;
                }),
                (eH.timeScale = function t(e, n) {
                    if (!arguments.length) return this._rts === -t2 ? 0 : this._rts;
                    if (this._rts === e) return this;
                    var i = this.parent && this._ts ? q(this.parent._time, this) : this._tTime;
                    return (
                        (this._rts = +e || 0),
                        (this._ts = this._ps || e === -t2 ? 0 : this._rts),
                        this.totalTime(ey(-Math.abs(this._delay), this._tDur, i), !1 !== n),
                        N(this),
                        (function t(e) {
                            for (var n = e.parent; n && n.parent; ) (n._dirty = 1), n.totalDuration(), (n = n.parent);
                            return e;
                        })(this)
                    );
                }),
                (eH.paused = function t(e) {
                    return arguments.length
                        ? (this._ps !== e &&
                              ((this._ps = e)
                                  ? ((this._pTime = this._tTime || Math.max(-this._delay, this.rawTime())), (this._ts = this._act = 0))
                                  : (eA(),
                                    (this._ts = this._rts),
                                    this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && Math.abs(this._zTime) !== t2 && (this._tTime -= t2)))),
                          this)
                        : this._ps;
                }),
                (eH.startTime = function t(e) {
                    if (arguments.length) {
                        this._start = e;
                        var n = this.parent || this._dp;
                        return n && (n._sort || !this.parent) && I(n, this, e - this._delay), this;
                    }
                    return this._start;
                }),
                (eH.endTime = function t(e) {
                    return this._start + (l(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
                }),
                (eH.rawTime = function t(e) {
                    var n = this.parent || this._dp;
                    return n ? (e && (!this._ts || (this._repeat && this._time && 1 > this.totalProgress())) ? this._tTime % (this._dur + this._rDelay) : this._ts ? q(n.rawTime(e), this) : this._tTime) : this._tTime;
                }),
                (eH.revert = function t(e) {
                    void 0 === e && (e = es);
                    var n = t_;
                    return (t_ = e), (this._initted || this._startAt) && (this.timeline && this.timeline.revert(e), this.totalTime(-0.01, e.suppressEvents)), "nested" !== this.data && !1 !== e.kill && this.kill(), (t_ = n), this;
                }),
                (eH.globalTime = function t(e) {
                    for (var n = this, i = arguments.length ? e : n.rawTime(); n; ) (i = n._start + i / (Math.abs(n._ts) || 1)), (n = n._dp);
                    return !this.parent && this._sat ? this._sat.globalTime(e) : i;
                }),
                (eH.repeat = function t(e) {
                    return arguments.length ? ((this._repeat = e === 1 / 0 ? -2 : e), V(this)) : -2 === this._repeat ? 1 / 0 : this._repeat;
                }),
                (eH.repeatDelay = function t(e) {
                    if (arguments.length) {
                        var n = this._time;
                        return (this._rDelay = e), V(this), n ? this.time(n) : this;
                    }
                    return this._rDelay;
                }),
                (eH.yoyo = function t(e) {
                    return arguments.length ? ((this._yoyo = e), this) : this._yoyo;
                }),
                (eH.seek = function t(e, n) {
                    return this.totalTime(ev(this, e), l(n));
                }),
                (eH.restart = function t(e, n) {
                    return this.play().totalTime(e ? -this._delay : 0, l(n));
                }),
                (eH.play = function t(e, n) {
                    return null != e && this.seek(e, n), this.reversed(!1).paused(!1);
                }),
                (eH.reverse = function t(e, n) {
                    return null != e && this.seek(e || this.totalDuration(), n), this.reversed(!0).paused(!1);
                }),
                (eH.pause = function t(e, n) {
                    return null != e && this.seek(e, n), this.paused(!0);
                }),
                (eH.resume = function t() {
                    return this.paused(!1);
                }),
                (eH.reversed = function t(e) {
                    return arguments.length ? (!!e !== this.reversed() && this.timeScale(-this._rts || (e ? -t2 : 0)), this) : this._rts < 0;
                }),
                (eH.invalidate = function t() {
                    return (this._initted = this._act = 0), (this._zTime = -t2), this;
                }),
                (eH.isActive = function t() {
                    var e,
                        n = this.parent || this._dp,
                        i = this._start;
                    return !(n && !(this._ts && this._initted && n.isActive() && (e = n.rawTime(!0)) >= i && e < this.endTime(!0) - t2));
                }),
                (eH.eventCallback = function t(e, n, i) {
                    var r = this.vars;
                    return 1 < arguments.length ? (n ? ((r[e] = n), i && (r[e + "Params"] = i), "onUpdate" === e && (this._onUpdate = n)) : delete r[e], this) : r[e];
                }),
                (eH.then = function t(e) {
                    var n = this;
                    return new Promise(function (t) {
                        function i() {
                            var e = n.then;
                            (n.then = null), r(s) && (s = s(n)) && (s.then || s === n) && (n.then = e), t(s), (n.then = e);
                        }
                        var s = r(e) ? e : E;
                        (n._initted && 1 === n.totalProgress() && 0 <= n._ts) || (!n._tTime && n._ts < 0) ? i() : (n._prom = i);
                    });
                }),
                (eH.kill = function t() {
                    ta(this);
                }),
                eM);
        function eM(t) {
            (this.vars = t),
                (this._delay = +t.delay || 0),
                (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && ((this._rDelay = t.repeatDelay || 0), (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
                (this._ts = 1),
                F(this, +t.duration, 1, 1),
                (this.data = t.data),
                t8 && (this._ctx = t8).data.push(this),
                tA || eE.wake();
        }
        A(e1.prototype, { _time: 0, _start: 0, _end: 0, _tTime: 0, _tDur: 0, _dirty: 0, _repeat: 0, _yoyo: !1, parent: null, _initted: !1, _rDelay: 0, _ts: 1, _dp: 0, ratio: 0, _zTime: -t2, _prom: 0, _ps: !1, _rts: 1 });
        var eq = (function (t) {
            function o(e, i) {
                var r;
                return (
                    void 0 === e && (e = {}),
                    ((r = t.call(this, e) || this).labels = {}),
                    (r.smoothChildTiming = !!e.smoothChildTiming),
                    (r.autoRemoveChildren = !!e.autoRemoveChildren),
                    (r._sort = l(e.sortChildren)),
                    tb && I(e.parent || tb, n(r), i),
                    e.reversed && r.reverse(),
                    e.paused && r.paused(!0),
                    e.scrollTrigger && Y(n(r), e.scrollTrigger),
                    r
                );
            }
            e(o, t);
            var a = o.prototype;
            return (
                (a.to = function t(e, n, i) {
                    return U(0, arguments, this), this;
                }),
                (a.from = function t(e, n, i) {
                    return U(1, arguments, this), this;
                }),
                (a.fromTo = function t(e, n, i, r) {
                    return U(2, arguments, this), this;
                }),
                (a.set = function t(e, n, i) {
                    return (n.duration = 0), (n.parent = this), L(n).repeatDelay || (n.repeat = 0), (n.immediateRender = !!n.immediateRender), new e4(e, n, ev(this, i), 1), this;
                }),
                (a.call = function t(e, n, i) {
                    return I(this, e4.delayedCall(0, e, n), i);
                }),
                (a.staggerTo = function t(e, n, i, r, s, o, a) {
                    return (i.duration = n), (i.stagger = i.stagger || r), (i.onComplete = o), (i.onCompleteParams = a), (i.parent = this), new e4(e, i, ev(this, s)), this;
                }),
                (a.staggerFrom = function t(e, n, i, r, s, o, a) {
                    return (i.runBackwards = 1), (L(i).immediateRender = l(i.immediateRender)), this.staggerTo(e, n, i, r, s, o, a);
                }),
                (a.staggerFromTo = function t(e, n, i, r, s, o, a, c) {
                    return (r.startAt = i), (L(r).immediateRender = l(r.immediateRender)), this.staggerTo(e, n, r, s, o, a, c);
                }),
                (a.render = function t(e, n, i) {
                    var r,
                        s,
                        o,
                        a,
                        l,
                        c,
                        u,
                        h,
                        f,
                        d,
                        p,
                        m,
                        g = this._time,
                        v = this._dirty ? this.totalDuration() : this._tDur,
                        y = this._dur,
                        _ = e <= 0 ? 0 : x(e),
                        b = this._zTime < 0 != e < 0 && (this._initted || !y);
                    if ((this !== tb && v < _ && 0 <= e && (_ = v), _ !== this._tTime || i || b)) {
                        if ((g !== this._time && y && ((_ += this._time - g), (e += this._time - g)), (r = _), (f = this._start), (c = !(h = this._ts)), b && (y || (g = this._zTime), (!e && n) || (this._zTime = e)), this._repeat)) {
                            if (((p = this._yoyo), (l = y + this._rDelay), this._repeat < -1 && e < 0)) return this.totalTime(100 * l + e, n, i);
                            if (
                                ((r = x(_ % l)),
                                _ === v ? ((a = this._repeat), (r = y)) : ((a = ~~(_ / l)) && a === _ / l && ((r = y), a--), y < r && (r = y)),
                                (d = e$(this._tTime, l)),
                                !g && this._tTime && d !== a && this._tTime - d * l - this._dur <= 0 && (d = a),
                                p && 1 & a && ((r = y - r), (m = 1)),
                                a !== d && !this._lock)
                            ) {
                                var w = p && 1 & d,
                                    T = w === (p && 1 & a);
                                if (
                                    (a < d && (w = !w),
                                    (g = w ? 0 : _ % y ? y : _),
                                    (this._lock = 1),
                                    (this.render(g || (m ? 0 : x(a * l)), n, !y)._lock = 0),
                                    (this._tTime = _),
                                    !n && this.parent && ex(this, "onRepeat"),
                                    this.vars.repeatRefresh && !m && (this.invalidate()._lock = 1),
                                    (g && g !== this._time) ||
                                        !this._ts != c ||
                                        (this.vars.onRepeat && !this.parent && !this._act) ||
                                        ((y = this._dur), (v = this._tDur), T && ((this._lock = 2), (g = w ? y : -0.0001), this.render(g, !0), this.vars.repeatRefresh && !m && this.invalidate()), (this._lock = 0), !this._ts && !c))
                                )
                                    return this;
                                tp(this, m);
                            }
                        }
                        if (
                            (this._hasPause &&
                                !this._forcing &&
                                this._lock < 2 &&
                                (u = (function t(e, n, i) {
                                    var r;
                                    if (n < i)
                                        for (r = e._first; r && r._start <= i; ) {
                                            if ("isPause" === r.data && r._start > n) return r;
                                            r = r._next;
                                        }
                                    else
                                        for (r = e._last; r && r._start >= i; ) {
                                            if ("isPause" === r.data && r._start < n) return r;
                                            r = r._prev;
                                        }
                                })(this, x(g), x(r))) &&
                                (_ -= r - (r = u._start)),
                            (this._tTime = _),
                            (this._time = r),
                            (this._act = !h),
                            this._initted || ((this._onUpdate = this.vars.onUpdate), (this._initted = 1), (this._zTime = e), (g = 0)),
                            !g && r && !n && !a && (ex(this, "onStart"), this._tTime !== _))
                        )
                            return this;
                        if (g <= r && 0 <= e)
                            for (s = this._first; s; ) {
                                if (((o = s._next), (s._act || r >= s._start) && s._ts && u !== s)) {
                                    if (s.parent !== this) return this.render(e, n, i);
                                    if ((s.render(0 < s._ts ? (r - s._start) * s._ts : (s._dirty ? s.totalDuration() : s._tDur) + (r - s._start) * s._ts, n, i), r !== this._time || (!this._ts && !c))) {
                                        (u = 0), o && (_ += this._zTime = -t2);
                                        break;
                                    }
                                }
                                s = o;
                            }
                        else {
                            s = this._last;
                            for (var k = e < 0 ? e : r; s; ) {
                                if (((o = s._prev), (s._act || k <= s._end) && s._ts && u !== s)) {
                                    if (s.parent !== this) return this.render(e, n, i);
                                    if ((s.render(0 < s._ts ? (k - s._start) * s._ts : (s._dirty ? s.totalDuration() : s._tDur) + (k - s._start) * s._ts, n, i || (t_ && (s._initted || s._startAt))), r !== this._time || (!this._ts && !c))) {
                                        (u = 0), o && (_ += this._zTime = k ? -t2 : t2);
                                        break;
                                    }
                                }
                                s = o;
                            }
                        }
                        if (u && !n && (this.pause(), (u.render(g <= r ? 0 : -t2)._zTime = g <= r ? 1 : -1), this._ts)) return (this._start = f), N(this), this.render(e, n, i);
                        this._onUpdate && !n && ex(this, "onUpdate", !0),
                            ((_ === v && this._tTime >= this.totalDuration()) || (!_ && g)) &&
                                ((f !== this._start && Math.abs(h) === Math.abs(this._ts)) ||
                                    this._lock ||
                                    ((e || !y) && ((_ === v && 0 < this._ts) || (!_ && this._ts < 0)) && R(this, 1),
                                    n || (e < 0 && !g) || (!_ && !g && v) || (ex(this, _ === v && 0 <= e ? "onComplete" : "onReverseComplete", !0), !this._prom || (_ < v && 0 < this.timeScale()) || this._prom())));
                    }
                    return this;
                }),
                (a.add = function t(e, n) {
                    var o = this;
                    if ((s(n) || (n = ev(this, n, e)), !(e instanceof e1))) {
                        if (t5(e))
                            return (
                                e.forEach(function (t) {
                                    return o.add(t, n);
                                }),
                                this
                            );
                        if (i(e)) return this.addLabel(e, n);
                        if (!r(e)) return this;
                        e = e4.delayedCall(0, e);
                    }
                    return this !== e ? I(this, e, n) : this;
                }),
                (a.getChildren = function t(e, n, i, r) {
                    void 0 === e && (e = !0), void 0 === n && (n = !0), void 0 === i && (i = !0), void 0 === r && (r = -tX);
                    for (var s = [], o = this._first; o; ) o._start >= r && (o instanceof e4 ? n && s.push(o) : (i && s.push(o), e && s.push.apply(s, o.getChildren(!0, n, i)))), (o = o._next);
                    return s;
                }),
                (a.getById = function t(e) {
                    for (var n = this.getChildren(1, 1, 1), i = n.length; i--; ) if (n[i].vars.id === e) return n[i];
                }),
                (a.remove = function t(e) {
                    return i(e) ? this.removeLabel(e) : r(e) ? this.killTweensOf(e) : (j(this, e), e === this._recent && (this._recent = this._last), H(this));
                }),
                (a.totalTime = function e(n, i) {
                    return arguments.length
                        ? ((this._forcing = 1),
                          !this._dp && this._ts && (this._start = x(eE.time - (0 < this._ts ? n / this._ts : -((this.totalDuration() - n) / this._ts)))),
                          t.prototype.totalTime.call(this, n, i),
                          (this._forcing = 0),
                          this)
                        : this._tTime;
                }),
                (a.addLabel = function t(e, n) {
                    return (this.labels[e] = ev(this, n)), this;
                }),
                (a.removeLabel = function t(e) {
                    return delete this.labels[e], this;
                }),
                (a.addPause = function t(e, n, i) {
                    var r = e4.delayedCall(0, n || m, i);
                    return (r.data = "isPause"), (this._hasPause = 1), I(this, r, ev(this, e));
                }),
                (a.removePause = function t(e) {
                    var n = this._first;
                    for (e = ev(this, e); n; ) n._start === e && "isPause" === n.data && R(n), (n = n._next);
                }),
                (a.killTweensOf = function t(e, n, i) {
                    for (var r = this.getTweensOf(e, i), s = r.length; s--; ) eW !== r[s] && r[s].kill(e, n);
                    return this;
                }),
                (a.getTweensOf = function t(e, n) {
                    for (var i, r = [], o = e8(e), a = this._first, l = s(n); a; )
                        a instanceof e4
                            ? T(a._targets, o) && (l ? (!eW || (a._initted && a._ts)) && a.globalTime(0) <= n && a.globalTime(a.totalDuration()) > n : !n || a.isActive()) && r.push(a)
                            : (i = a.getTweensOf(o, n)).length && r.push.apply(r, i),
                            (a = a._next);
                    return r;
                }),
                (a.tweenTo = function t(e, n) {
                    n = n || {};
                    var i,
                        r = this,
                        s = ev(r, e),
                        o = n.startAt,
                        a = n.onStart,
                        l = n.onStartParams,
                        c = n.immediateRender,
                        u = e4.to(
                            r,
                            A(
                                {
                                    ease: n.ease || "none",
                                    lazy: !1,
                                    immediateRender: !1,
                                    time: s,
                                    overwrite: "auto",
                                    duration: n.duration || Math.abs((s - (o && "time" in o ? o.time : r._time)) / r.timeScale()) || t2,
                                    onStart: function t() {
                                        if ((r.pause(), !i)) {
                                            var e = n.duration || Math.abs((s - (o && "time" in o ? o.time : r._time)) / r.timeScale());
                                            u._dur !== e && F(u, e, 0, 1).render(u._time, !0, !0), (i = 1);
                                        }
                                        a && a.apply(u, l || []);
                                    },
                                },
                                n
                            )
                        );
                    return c ? u.render(0) : u;
                }),
                (a.tweenFromTo = function t(e, n, i) {
                    return this.tweenTo(n, A({ startAt: { time: ev(this, e) } }, i));
                }),
                (a.recent = function t() {
                    return this._recent;
                }),
                (a.nextLabel = function t(e) {
                    return void 0 === e && (e = this._time), to(this, ev(this, e));
                }),
                (a.previousLabel = function t(e) {
                    return void 0 === e && (e = this._time), to(this, ev(this, e), 1);
                }),
                (a.currentLabel = function t(e) {
                    return arguments.length ? this.seek(e, !0) : this.previousLabel(this._time + t2);
                }),
                (a.shiftChildren = function t(e, n, i) {
                    void 0 === i && (i = 0);
                    for (var r, s = this._first, o = this.labels; s; ) s._start >= i && ((s._start += e), (s._end += e)), (s = s._next);
                    if (n) for (r in o) o[r] >= i && (o[r] += e);
                    return H(this);
                }),
                (a.invalidate = function e(n) {
                    var i = this._first;
                    for (this._lock = 0; i; ) i.invalidate(n), (i = i._next);
                    return t.prototype.invalidate.call(this, n);
                }),
                (a.clear = function t(e) {
                    void 0 === e && (e = !0);
                    for (var n, i = this._first; i; ) (n = i._next), this.remove(i), (i = n);
                    return this._dp && (this._time = this._tTime = this._pTime = 0), e && (this.labels = {}), H(this);
                }),
                (a.totalDuration = function t(e) {
                    var n,
                        i,
                        r,
                        s = 0,
                        o = this,
                        a = o._last,
                        l = tX;
                    if (arguments.length) return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -e : e));
                    if (o._dirty) {
                        for (r = o.parent; a; )
                            (n = a._prev),
                                a._dirty && a.totalDuration(),
                                l < (i = a._start) && o._sort && a._ts && !o._lock ? ((o._lock = 1), (I(o, a, i - a._delay, 1)._lock = 0)) : (l = i),
                                i < 0 && a._ts && ((s -= i), ((!r && !o._dp) || (r && r.smoothChildTiming)) && ((o._start += i / o._ts), (o._time -= i), (o._tTime -= i)), o.shiftChildren(-i, !1, -1 / 0), (l = 0)),
                                a._end > s && a._ts && (s = a._end),
                                (a = n);
                        F(o, o === tb && o._time > s ? o._time : s, 1, 1), (o._dirty = 0);
                    }
                    return o._tDur;
                }),
                (o.updateRoot = function t(e) {
                    if ((tb._ts && (S(tb, q(e, tb)), (tC = eE.frame)), eE.frame >= eh)) {
                        eh += t3.autoSleep || 120;
                        var n = tb._first;
                        if ((!n || !n._ts) && t3.autoSleep && eE._listeners.length < 2) {
                            for (; n && !n._ts; ) n = n._next;
                            n || eE.sleep();
                        }
                    }
                }),
                o
            );
        })(e1);
        function eN(t, e, n, s, o, l) {
            var c, u, h, f;
            if (
                ec[t] &&
                !1 !==
                    (c = new ec[t]()).init(
                        o,
                        c.rawVars
                            ? e[t]
                            : (function t(e, n, s, o, l) {
                                  if ((r(e) && (e = eX(e, l, n, s, o)), !a(e) || (e.style && e.nodeType) || t5(e) || t6(e))) return i(e) ? eX(e, l, n, s, o) : e;
                                  var c,
                                      u = {};
                                  for (c in e) u[c] = eX(e[c], l, n, s, o);
                                  return u;
                              })(e[t], s, o, l, n),
                        n,
                        s,
                        l
                    ) &&
                ((n._pt = u = new nn(n._pt, o, t, 0, 1, c.render, c, 0, c.priority)), n !== tE)
            )
                for (h = n._ptLookup[n._targets.indexOf(o)], f = c._props.length; f--; ) h[c._props[f]] = u;
            return c;
        }
        function ez(t, e, n, i) {
            var r,
                s,
                o = e.ease || i || "power1.inOut";
            if (t5(e))
                (s = n[t] || (n[t] = [])),
                    e.forEach(function (t, n) {
                        return s.push({ t: (n / (e.length - 1)) * 100, v: t, e: o });
                    });
            else for (r in e) (s = n[r] || (n[r] = [])), "ease" === r || s.push({ t: parseFloat(t), v: e[r], e: o });
        }
        A(eq.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
        var eW,
            eI,
            e3 = function t(e, n, s, o, a, l, c, u, h, d) {
                r(o) && (o = o(a || 0, e, l));
                var p,
                    m = e[n],
                    g = "get" !== s ? s : r(m) ? (h ? e[n.indexOf("set") || !r(e["get" + n.substr(3)]) ? n : "get" + n.substr(3)](h) : e[n]()) : m,
                    v = r(m) ? (h ? e6 : eU) : e7;
                if ((!i(o) || (~o.indexOf("random(") && (o = ts(o)), "=" !== o.charAt(1) || (((p = w(g, o) + (G(g) || 0)) || 0 === p) && (o = p))), !d || g !== o || eI))
                    return isNaN(g * o) || "" === o
                        ? (m || n in e || f(n, o),
                          function t(e, n, i, r, s, o, a) {
                              var l,
                                  c,
                                  u,
                                  h,
                                  f,
                                  d,
                                  p,
                                  m,
                                  g = new nn(this._pt, e, n, 0, 1, eQ, null, s),
                                  v = 0,
                                  y = 0;
                              for (g.b = i, g.e = r, i += "", (p = ~(r += "").indexOf("random(")) && (r = ts(r)), o && (o((m = [i, r]), e, n), (i = m[0]), (r = m[1])), c = i.match(tZ) || []; (l = tZ.exec(r)); )
                                  (h = l[0]),
                                      (f = r.substring(v, l.index)),
                                      u ? (u = (u + 1) % 5) : "rgba(" === f.substr(-5) && (u = 1),
                                      h !== c[y++] &&
                                          ((d = parseFloat(c[y - 1]) || 0),
                                          (g._pt = { _next: g._pt, p: f || 1 === y ? f : ",", s: d, c: "=" === h.charAt(1) ? w(d, h) - d : parseFloat(h) - d, m: u && u < 4 ? Math.round : 0 }),
                                          (v = tZ.lastIndex));
                              return (g.c = v < r.length ? r.substring(v, r.length) : ""), (g.fp = a), (tJ.test(r) || p) && (g.e = 0), (this._pt = g);
                          }.call(this, e, n, g, o, v, u || t3.stringFilter, h))
                        : ((p = new nn(this._pt, e, n, +g || 0, o - (g || 0), "boolean" == typeof m ? eG : eK, 0, v)), h && (p.fp = h), c && p.modifier(c, this, e), (this._pt = p));
            },
            eY = function t(e, n, i) {
                var r,
                    s,
                    o,
                    a,
                    c,
                    u,
                    h,
                    f,
                    d,
                    p,
                    m,
                    y,
                    _,
                    b = e.vars,
                    x = b.ease,
                    w = b.startAt,
                    T = b.immediateRender,
                    S = b.lazy,
                    C = b.onUpdate,
                    E = b.runBackwards,
                    D = b.yoyoEase,
                    L = b.keyframes,
                    P = b.autoRevert,
                    j = e._dur,
                    H = e._startAt,
                    B = e._targets,
                    M = e.parent,
                    q = M && "nested" === M.data ? M.vars.targets : B,
                    N = "auto" === e._overwrite && !ty,
                    z = e.timeline;
                if (
                    (!z || (L && x) || (x = "none"),
                    (e._ease = eP(x, tY.ease)),
                    (e._yEase = D ? eL(eP(!0 === D ? x : D, tY.ease)) : 0),
                    D && e._yoyo && !e._repeat && ((D = e._yEase), (e._yEase = e._ease), (e._ease = D)),
                    (e._from = !z && !!b.runBackwards),
                    !z || (L && !b.stagger))
                ) {
                    if (((y = (f = B[0] ? v(B[0]).harness : 0) && b[f.prop]), (r = O(b, eo)), H && (H._zTime < 0 && H.progress(1), n < 0 && E && T && !P ? H.render(-1, !0) : H.revert(E && j ? er : ei), (H._lazy = 0)), w)) {
                        if (
                            (R(
                                (e._startAt = e4.set(
                                    B,
                                    A(
                                        {
                                            data: "isStart",
                                            overwrite: !1,
                                            parent: M,
                                            immediateRender: !0,
                                            lazy: !H && l(S),
                                            startAt: null,
                                            delay: 0,
                                            onUpdate:
                                                C &&
                                                function () {
                                                    return ex(e, "onUpdate");
                                                },
                                            stagger: 0,
                                        },
                                        w
                                    )
                                ))
                            ),
                            (e._startAt._dp = 0),
                            (e._startAt._sat = e),
                            n < 0 && (t_ || (!T && !P)) && e._startAt.revert(er),
                            T && j && n <= 0 && i <= 0)
                        )
                            return void (n && (e._zTime = n));
                    } else if (E && j && !H) {
                        if (
                            (n && (T = !1),
                            (o = A({ overwrite: !1, data: "isFromStart", lazy: T && !H && l(S), immediateRender: T, stagger: 0, parent: M }, r)),
                            y && (o[f.prop] = y),
                            R((e._startAt = e4.set(B, o))),
                            (e._startAt._dp = 0),
                            (e._startAt._sat = e),
                            n < 0 && (t_ ? e._startAt.revert(er) : e._startAt.render(-1, !0)),
                            (e._zTime = n),
                            T)
                        ) {
                            if (!n) return;
                        } else t(e._startAt, t2, t2);
                    }
                    for (e._pt = e._ptCache = 0, S = (j && l(S)) || (S && !j), s = 0; s < B.length; s++) {
                        if (
                            ((h = (c = B[s])._gsap || g(B)[s]._gsap),
                            (e._ptLookup[s] = p = {}),
                            el[h.id] && ea.length && k(),
                            (m = q === B ? s : q.indexOf(c)),
                            f &&
                                !1 !== (d = new f()).init(c, y || r, e, m, q) &&
                                ((e._pt = a = new nn(e._pt, c, d.name, 0, 1, d.render, d, 0, d.priority)),
                                d._props.forEach(function (t) {
                                    p[t] = a;
                                }),
                                d.priority && (u = 1)),
                            !f || y)
                        )
                            for (o in r) ec[o] && (d = eN(o, r, e, m, c, q)) ? d.priority && (u = 1) : (p[o] = a = e3.call(e, c, o, "get", r[o], m, q, 0, b.stringFilter));
                        e._op && e._op[s] && e.kill(c, e._op[s]), N && e._pt && ((eW = e), tb.killTweensOf(c, p, e.globalTime(n)), (_ = !e.parent), (eW = 0)), e._pt && S && (el[h.id] = 1);
                    }
                    u && ne(e), e._onInit && e._onInit(e);
                }
                (e._onUpdate = C), (e._initted = (!e._op || e._pt) && !_), L && n <= 0 && z.render(tX, !0, !0);
            },
            eX = function t(e, n, s, o, a) {
                return r(e) ? e.call(n, s, o, a) : i(e) && ~e.indexOf("random(") ? ts(e) : e;
            },
            e2 = ed + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
            eF = {};
        _(e2 + ",id,stagger,delay,duration,paused,scrollTrigger", function (t) {
            return (eF[t] = 1);
        });
        var e4 = (function (t) {
            function r(e, i, r, o) {
                "number" == typeof i && ((r.duration = i), (i = r), (r = null));
                var c,
                    h,
                    f,
                    p,
                    m,
                    v,
                    y,
                    _,
                    b,
                    w = (c = t.call(this, o ? i : L(i)) || this).vars,
                    T = w.duration,
                    k = w.delay,
                    S = w.immediateRender,
                    C = w.stagger,
                    E = w.overwrite,
                    D = w.keyframes,
                    P = w.defaults,
                    j = w.scrollTrigger,
                    R = w.yoyoEase,
                    H = i.parent || tb,
                    B = (t5(e) || t6(e) ? s(e[0]) : "length" in i) ? [e] : e8(e);
                if (((c._targets = B.length ? g(B) : d("GSAP target " + e + " not found. https://gsap.com", !t3.nullTargetWarn) || []), (c._ptLookup = []), (c._overwrite = E), D || C || u(T) || u(k))) {
                    if (((i = c.vars), (h = c.timeline = new eq({ data: "nested", defaults: P || {}, targets: H && "nested" === H.data ? H.vars.targets : B })).kill(), (h.parent = h._dp = n(c)), (h._start = 0), C || u(T) || u(k))) {
                        if (((m = B.length), (_ = C && tt(C)), a(C))) for (v in C) ~e2.indexOf(v) && ((b = b || {})[v] = C[v]);
                        for (f = 0; f < m; f++)
                            ((p = O(i, eF)).stagger = 0),
                                R && (p.yoyoEase = R),
                                b && ep(p, b),
                                (y = B[f]),
                                (p.duration = +eX(T, n(c), f, y, B)),
                                (p.delay = (+eX(k, n(c), f, y, B) || 0) - c._delay),
                                !C && 1 === m && p.delay && ((c._delay = k = p.delay), (c._start += k), (p.delay = 0)),
                                h.to(y, p, _ ? _(f, y, B) : 0),
                                (h._ease = eD.none);
                        h.duration() ? (T = k = 0) : (c.timeline = 0);
                    } else if (D) {
                        L(A(h.vars.defaults, { ease: "none" })), (h._ease = eP(D.ease || i.ease || "none"));
                        var M,
                            q,
                            N,
                            z = 0;
                        if (t5(D))
                            D.forEach(function (t) {
                                return h.to(B, t, ">");
                            }),
                                h.duration();
                        else {
                            for (v in ((p = {}), D)) "ease" === v || "easeEach" === v || ez(v, D[v], p, D.easeEach);
                            for (v in p)
                                for (
                                    M = p[v].sort(function (t, e) {
                                        return t.t - e.t;
                                    }),
                                        f = z = 0;
                                    f < M.length;
                                    f++
                                )
                                    ((N = { ease: (q = M[f]).e, duration: ((q.t - (f ? M[f - 1].t : 0)) / 100) * T })[v] = q.v), h.to(B, N, z), (z += N.duration);
                            h.duration() < T && h.to({}, { duration: T - h.duration() });
                        }
                    }
                    T || c.duration((T = h.duration()));
                } else c.timeline = 0;
                return (
                    !0 !== E || ty || ((eW = n(c)), tb.killTweensOf(B), (eW = 0)),
                    I(H, n(c), r),
                    i.reversed && c.reverse(),
                    i.paused && c.paused(!0),
                    (S ||
                        (!T &&
                            !D &&
                            c._start === x(H._time) &&
                            l(S) &&
                            (function t(e) {
                                return !e || (e._ts && t(e.parent));
                            })(n(c)) &&
                            "nested" !== H.data)) &&
                        ((c._tTime = -t2), c.render(Math.max(0, -k) || 0)),
                    j && Y(n(c), j),
                    c
                );
            }
            e(r, t);
            var o = r.prototype;
            return (
                (o.render = function t(e, n, i) {
                    var r,
                        s,
                        o,
                        a,
                        l,
                        c,
                        u,
                        h,
                        f,
                        d = this._time,
                        p = this._tDur,
                        m = this._dur,
                        g = e < 0,
                        v = p - t2 < e && !g ? p : e < t2 ? 0 : e;
                    if (m) {
                        if (v !== this._tTime || !e || i || (!this._initted && this._tTime) || (this._startAt && this._zTime < 0 != g)) {
                            if (((r = v), (h = this.timeline), this._repeat)) {
                                if (((a = m + this._rDelay), this._repeat < -1 && g)) return this.totalTime(100 * a + e, n, i);
                                if (
                                    ((r = x(v % a)),
                                    v === p ? ((o = this._repeat), (r = m)) : ((o = ~~(v / a)) && o === x(v / a) && ((r = m), o--), m < r && (r = m)),
                                    (c = this._yoyo && 1 & o) && ((f = this._yEase), (r = m - r)),
                                    (l = e$(this._tTime, a)),
                                    r === d && !i && this._initted && o === l)
                                )
                                    return (this._tTime = v), this;
                                o !== l && (h && this._yEase && tp(h, c), this.vars.repeatRefresh && !c && !this._lock && this._time !== a && this._initted && ((this._lock = i = 1), (this.render(x(a * o), !0).invalidate()._lock = 0)));
                            }
                            if (!this._initted) {
                                if (X(this, g ? e : r, i, n, v)) return (this._tTime = 0), this;
                                if (!(d === this._time || (i && this.vars.repeatRefresh && o !== l))) return this;
                                if (m !== this._dur) return this.render(e, n, i);
                            }
                            if (
                                ((this._tTime = v),
                                (this._time = r),
                                !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
                                (this.ratio = u = (f || this._ease)(r / m)),
                                this._from && (this.ratio = u = 1 - u),
                                r && !d && !n && !o && (ex(this, "onStart"), this._tTime !== v))
                            )
                                return this;
                            for (s = this._pt; s; ) s.r(u, s.d), (s = s._next);
                            (h && h.render(e < 0 ? e : h._dur * h._ease(r / this._dur), n, i)) || (this._startAt && (this._zTime = e)),
                                this._onUpdate && !n && (g && B(this, e, 0, i), ex(this, "onUpdate")),
                                this._repeat && o !== l && this.vars.onRepeat && !n && this.parent && ex(this, "onRepeat"),
                                (v !== this._tDur && v) ||
                                    this._tTime !== v ||
                                    (g && !this._onUpdate && B(this, e, 0, !0),
                                    (e || !m) && ((v === this._tDur && 0 < this._ts) || (!v && this._ts < 0)) && R(this, 1),
                                    n || (g && !d) || !(v || d || c) || (ex(this, v === p ? "onComplete" : "onReverseComplete", !0), !this._prom || (v < p && 0 < this.timeScale()) || this._prom()));
                        }
                    } else
                        !(function t(e, n, i, r) {
                            var s,
                                o,
                                a,
                                l = e.ratio,
                                c =
                                    n < 0 ||
                                    (!n &&
                                        ((!e._start &&
                                            (function t(e) {
                                                var n = e.parent;
                                                return n && n._ts && n._initted && !n._lock && (0 > n.rawTime() || t(n));
                                            })(e) &&
                                            (e._initted || !em(e))) ||
                                            ((e._ts < 0 || e._dp._ts < 0) && !em(e))))
                                        ? 0
                                        : 1,
                                u = e._rDelay,
                                h = 0;
                            if (
                                (u && e._repeat && ((h = ey(0, e._tDur, n)), (o = e$(h, u)), e._yoyo && 1 & o && (c = 1 - c), o !== e$(e._tTime, u) && ((l = 1 - c), e.vars.repeatRefresh && e._initted && e.invalidate())),
                                c !== l || t_ || r || e._zTime === t2 || (!n && e._zTime))
                            ) {
                                if (!e._initted && X(e, n, r, i, h)) return;
                                for (a = e._zTime, e._zTime = n || (i ? t2 : 0), i = i || (n && !a), e.ratio = c, e._from && (c = 1 - c), e._time = 0, e._tTime = h, s = e._pt; s; ) s.r(c, s.d), (s = s._next);
                                n < 0 && B(e, n, 0, !0),
                                    e._onUpdate && !i && ex(e, "onUpdate"),
                                    h && e._repeat && !i && e.parent && ex(e, "onRepeat"),
                                    (n >= e._tDur || n < 0) && e.ratio === c && (c && R(e, 1), i || t_ || (ex(e, c ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom()));
                            } else e._zTime || (e._zTime = n);
                        })(this, e, n, i);
                    return this;
                }),
                (o.targets = function t() {
                    return this._targets;
                }),
                (o.invalidate = function e(n) {
                    return (
                        (n && this.vars.runBackwards) || (this._startAt = 0),
                        (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
                        (this._ptLookup = []),
                        this.timeline && this.timeline.invalidate(n),
                        t.prototype.invalidate.call(this, n)
                    );
                }),
                (o.resetTo = function t(e, n, i, r, s) {
                    tA || eE.wake(), this._ts || this.play();
                    var o,
                        a = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
                    return (
                        this._initted || eY(this, a),
                        !(function t(e, n, i, r, s, o, a, l) {
                            var c,
                                u,
                                h,
                                f,
                                p = ((e._pt && e._ptCache) || (e._ptCache = {}))[n];
                            if (!p)
                                for (p = e._ptCache[n] = [], h = e._ptLookup, f = e._targets.length; f--; ) {
                                    if ((c = h[f][n]) && c.d && c.d._pt) for (c = c.d._pt; c && c.p !== n && c.fp !== n; ) c = c._next;
                                    if (!c) return (eI = 1), (e.vars[n] = "+=0"), eY(e, a), (eI = 0), l ? d(n + " not eligible for reset") : 1;
                                    p.push(c);
                                }
                            for (f = p.length; f--; ) ((c = (u = p[f])._pt || u).s = (!r && 0 !== r) || s ? c.s + (r || 0) + o * c.c : r), (c.c = i - c.s), u.e && (u.e = b(i) + G(u.e)), u.b && (u.b = c.s + G(u.b));
                        })(this, e, n, i, r, (o = this._ease(a / this._dur)), a, s)
                            ? (z(this, 0), this.parent || P(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0))
                            : this.resetTo(e, n, i, r, 1)
                    );
                }),
                (o.kill = function t(e, n) {
                    if ((void 0 === n && (n = "all"), !(e || (n && "all" !== n)))) return (this._lazy = this._pt = 0), this.parent ? ta(this) : this;
                    if (this.timeline) {
                        var r = this.timeline.totalDuration();
                        return this.timeline.killTweensOf(e, n, eW && !0 !== eW.vars.overwrite)._first || ta(this), this.parent && r !== this.timeline.totalDuration() && F(this, (this._dur * this.timeline._tDur) / r, 0, 1), this;
                    }
                    var s,
                        o,
                        a,
                        l,
                        c,
                        u,
                        h,
                        f = this._targets,
                        d = e ? e8(e) : f,
                        p = this._ptLookup,
                        m = this._pt;
                    if (
                        (!n || "all" === n) &&
                        (function t(e, n) {
                            for (var i = e.length, r = i === n.length; r && i-- && e[i] === n[i]; );
                            return i < 0;
                        })(f, d)
                    )
                        return "all" === n && (this._pt = 0), ta(this);
                    for (
                        s = this._op = this._op || [],
                            "all" !== n &&
                                (i(n) &&
                                    ((c = {}),
                                    _(n, function (t) {
                                        return (c[t] = 1);
                                    }),
                                    (n = c)),
                                (n = (function t(e, n) {
                                    var i,
                                        r,
                                        s,
                                        o,
                                        a = e[0] ? v(e[0]).harness : 0,
                                        l = a && a.aliases;
                                    if (!l) return n;
                                    for (r in ((i = ep({}, n)), l)) if ((r in i)) for (s = (o = l[r].split(",")).length; s--; ) i[o[s]] = i[r];
                                    return i;
                                })(f, n))),
                            h = f.length;
                        h--;

                    )
                        if (~d.indexOf(f[h]))
                            for (c in ((o = p[h]), "all" === n ? ((s[h] = n), (l = o), (a = {})) : ((a = s[h] = s[h] || {}), (l = n)), l))
                                (u = o && o[c]) && (("kill" in u.d && !0 !== u.d.kill(c)) || j(this, u, "_pt"), delete o[c]), "all" !== a && (a[c] = 1);
                    return this._initted && !this._pt && m && ta(this), this;
                }),
                (r.to = function t(e, n, i) {
                    return new r(e, n, i);
                }),
                (r.from = function t(e, n) {
                    return U(1, arguments);
                }),
                (r.delayedCall = function t(e, n, i, s) {
                    return new r(n, 0, { immediateRender: !1, lazy: !1, overwrite: !1, delay: e, onComplete: n, onReverseComplete: n, onCompleteParams: i, onReverseCompleteParams: i, callbackScope: s });
                }),
                (r.fromTo = function t(e, n, i) {
                    return U(2, arguments);
                }),
                (r.set = function t(e, n) {
                    return (n.duration = 0), n.repeatDelay || (n.repeat = 0), new r(e, n);
                }),
                (r.killTweensOf = function t(e, n, i) {
                    return tb.killTweensOf(e, n, i);
                }),
                r
            );
        })(e1);
        function eV(t, e, n) {
            return t.setAttribute(e, n);
        }
        function e9(t, e, n, i) {
            i.mSet(t, e, i.m.call(i.tween, n, i.mt), i);
        }
        A(e4.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }),
            _("staggerTo,staggerFrom,staggerFromTo", function (t) {
                e4[t] = function () {
                    var e = new eq(),
                        n = e_.call(arguments, 0);
                    return n.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, n);
                };
            });
        var e7 = function t(e, n, i) {
                return (e[n] = i);
            },
            eU = function t(e, n, i) {
                return e[n](i);
            },
            e6 = function t(e, n, i, r) {
                return e[n](r.fp, i);
            },
            e5 = function t(e, n) {
                return r(e[n]) ? eU : o(e[n]) && e.setAttribute ? eV : e7;
            },
            eK = function t(e, n) {
                return n.set(n.t, n.p, Math.round(1e6 * (n.s + n.c * e)) / 1e6, n);
            },
            eG = function t(e, n) {
                return n.set(n.t, n.p, !!(n.s + n.c * e), n);
            },
            eQ = function t(e, n) {
                var i = n._pt,
                    r = "";
                if (!e && n.b) r = n.b;
                else if (1 === e && n.e) r = n.e;
                else {
                    for (; i; ) (r = i.p + (i.m ? i.m(i.s + i.c * e) : Math.round(1e4 * (i.s + i.c * e)) / 1e4) + r), (i = i._next);
                    r += n.c;
                }
                n.set(n.t, n.p, r, n);
            },
            eZ = function t(e, n) {
                for (var i = n._pt; i; ) i.r(e, i.d), (i = i._next);
            },
            eJ = function t(e, n, i, r) {
                for (var s, o = this._pt; o; ) (s = o._next), o.p === r && o.modifier(e, n, i), (o = s);
            },
            nt = function t(e) {
                for (var n, i, r = this._pt; r; ) (i = r._next), (r.p !== e || r.op) && r.op !== e ? r.dep || (n = 1) : j(this, r, "_pt"), (r = i);
                return !n;
            },
            ne = function t(e) {
                for (var n, i, r, s, o = e._pt; o; ) {
                    for (n = o._next, i = r; i && i.pr > o.pr; ) i = i._next;
                    (o._prev = i ? i._prev : s) ? (o._prev._next = o) : (r = o), (o._next = i) ? (i._prev = o) : (s = o), (o = n);
                }
                e._pt = r;
            },
            nn =
                ((ni.prototype.modifier = function t(e, n, i) {
                    (this.mSet = this.mSet || this.set), (this.set = e9), (this.m = e), (this.mt = i), (this.tween = n);
                }),
                ni);
        function ni(t, e, n, i, r, s, o, a, l) {
            (this.t = e), (this.s = i), (this.c = r), (this.p = n), (this.r = s || eK), (this.d = o || this), (this.set = a || e7), (this.pr = l || 0), (this._next = t) && (t._prev = this);
        }
        function nr(t) {
            return (nl[t] || nc).map(function (t) {
                return t();
            });
        }
        function ns() {
            var t = Date.now(),
                e = [];
            2 < t - nu &&
                (nr("matchMediaInit"),
                na.forEach(function (t) {
                    var n,
                        i,
                        r,
                        s,
                        o = t.queries,
                        a = t.conditions;
                    for (i in o) (n = tx.matchMedia(o[i]).matches) && (r = 1), n !== a[i] && ((a[i] = n), (s = 1));
                    s && (t.revert(), r && e.push(t));
                }),
                nr("matchMediaRevert"),
                e.forEach(function (t) {
                    return t.onMatch(t, function (e) {
                        return t.add(null, e);
                    });
                }),
                (nu = t),
                nr("matchMedia"));
        }
        _(
            ed +
                "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
            function (t) {
                return (eo[t] = 1);
            }
        ),
            (en.TweenMax = en.TweenLite = e4),
            (en.TimelineLite = en.TimelineMax = eq),
            (tb = new eq({ sortChildren: !1, defaults: tY, autoRemoveChildren: !0, id: "root", smoothChildTiming: !0 })),
            (t3.stringFilter = td);
        var no,
            na = [],
            nl = {},
            nc = [],
            nu = 0,
            nh = 0,
            nf =
                (((no = nd.prototype).add = function t(e, n, i) {
                    function s() {
                        var t,
                            e = t8,
                            s = o.selector;
                        return e && e !== o && e.data.push(o), i && (o.selector = Z(i)), (t8 = o), (t = n.apply(o, arguments)), r(t) && o._r.push(t), (t8 = e), (o.selector = s), (o.isReverted = !1), t;
                    }
                    r(e) && ((i = n), (n = e), (e = r));
                    var o = this;
                    return (
                        (o.last = s),
                        e === r
                            ? s(o, function (t) {
                                  return o.add(null, t);
                              })
                            : e
                            ? (o[e] = s)
                            : s
                    );
                }),
                (no.ignore = function t(e) {
                    var n = t8;
                    (t8 = null), e(this), (t8 = n);
                }),
                (no.getTweens = function t() {
                    var e = [];
                    return (
                        this.data.forEach(function (t) {
                            return t instanceof nd ? e.push.apply(e, t.getTweens()) : t instanceof e4 && !(t.parent && "nested" === t.parent.data) && e.push(t);
                        }),
                        e
                    );
                }),
                (no.clear = function t() {
                    this._r.length = this.data.length = 0;
                }),
                (no.kill = function t(e, n) {
                    var i = this;
                    if (
                        (e
                            ? (function () {
                                  for (var t, n = i.getTweens(), r = i.data.length; r--; )
                                      "isFlip" === (t = i.data[r]).data &&
                                          (t.revert(),
                                          t.getChildren(!0, !0, !1).forEach(function (t) {
                                              return n.splice(n.indexOf(t), 1);
                                          }));
                                  for (
                                      n
                                          .map(function (t) {
                                              return { g: t._dur || t._delay || (t._sat && !t._sat.vars.immediateRender) ? t.globalTime(0) : -1 / 0, t: t };
                                          })
                                          .sort(function (t, e) {
                                              return e.g - t.g || -1 / 0;
                                          })
                                          .forEach(function (t) {
                                              return t.t.revert(e);
                                          }),
                                          r = i.data.length;
                                      r--;

                                  )
                                      (t = i.data[r]) instanceof eq ? "nested" !== t.data && (t.scrollTrigger && t.scrollTrigger.revert(), t.kill()) : t instanceof e4 || !t.revert || t.revert(e);
                                  i._r.forEach(function (t) {
                                      return t(e, i);
                                  }),
                                      (i.isReverted = !0);
                              })()
                            : this.data.forEach(function (t) {
                                  return t.kill && t.kill();
                              }),
                        this.clear(),
                        n)
                    )
                        for (var r = na.length; r--; ) na[r].id === this.id && na.splice(r, 1);
                }),
                (no.revert = function t(e) {
                    this.kill(e || {});
                }),
                nd);
        function nd(t, e) {
            (this.selector = e && Z(e)), (this.data = []), (this._r = []), (this.isReverted = !1), (this.id = nh++), t && this.add(t);
        }
        var np,
            n$ =
                (((np = nm.prototype).add = function t(e, n, i) {
                    a(e) || (e = { matches: e });
                    var r,
                        s,
                        o,
                        l = new nf(0, i || this.scope),
                        c = (l.conditions = {});
                    for (s in (t8 && !l.selector && (l.selector = t8.selector), this.contexts.push(l), (n = l.add("onMatch", n)), (l.queries = e)))
                        "all" === s ? (o = 1) : (r = tx.matchMedia(e[s])) && (0 > na.indexOf(l) && na.push(l), (c[s] = r.matches) && (o = 1), r.addListener ? r.addListener(ns) : r.addEventListener("change", ns));
                    return (
                        o &&
                            n(l, function (t) {
                                return l.add(null, t);
                            }),
                        this
                    );
                }),
                (np.revert = function t(e) {
                    this.kill(e || {});
                }),
                (np.kill = function t(e) {
                    this.contexts.forEach(function (t) {
                        return t.kill(e, !0);
                    });
                }),
                nm);
        function nm(t) {
            (this.contexts = []), (this.scope = t), t8 && t8.data.push(this);
        }
        var ng = {
            registerPlugin: function t() {
                for (var e = arguments.length, n = Array(e), i = 0; i < e; i++) n[i] = arguments[i];
                n.forEach(function (t) {
                    return tl(t);
                });
            },
            timeline: function t(e) {
                return new eq(e);
            },
            getTweensOf: function t(e, n) {
                return tb.getTweensOf(e, n);
            },
            getProperty: function t(e, n, r, s) {
                i(e) && (e = e8(e)[0]);
                var o = v(e || {}).get,
                    a = r ? E : C;
                return (
                    "native" === r && (r = ""),
                    e
                        ? n
                            ? a(((ec[n] && ec[n].get) || o)(e, n, r, s))
                            : function (t, n, i) {
                                  return a(((ec[t] && ec[t].get) || o)(e, t, n, i));
                              }
                        : e
                );
            },
            quickSetter: function t(e, n, i) {
                if (1 < (e = e8(e)).length) {
                    var r = e.map(function (t) {
                            return n_.quickSetter(t, n, i);
                        }),
                        s = r.length;
                    return function (t) {
                        for (var e = s; e--; ) r[e](t);
                    };
                }
                e = e[0] || {};
                var o = ec[n],
                    a = v(e),
                    l = (a.harness && (a.harness.aliases || {})[n]) || n,
                    c = o
                        ? function (t) {
                              var n = new o();
                              (tE._pt = 0), n.init(e, i ? t + i : t, tE, 0, [e]), n.render(1, n), tE._pt && eZ(1, tE);
                          }
                        : a.set(e, l);
                return o
                    ? c
                    : function (t) {
                          return c(e, l, i ? t + i : t, a, 1);
                      };
            },
            quickTo: function t(e, n, i) {
                function r(t, e, i) {
                    return o.resetTo(n, t, e, i);
                }
                var s,
                    o = n_.to(e, ep((((s = {})[n] = "+=0.1"), (s.paused = !0), s), i || {}));
                return (r.tween = o), r;
            },
            isTweening: function t(e) {
                return 0 < tb.getTweensOf(e, !0).length;
            },
            defaults: function t(e) {
                return e && e.ease && (e.ease = eP(e.ease, tY.ease)), D(tY, e || {});
            },
            config: function t(e) {
                return D(t3, e || {});
            },
            registerEffect: function t(e) {
                var n = e.name,
                    i = e.effect,
                    r = e.plugins,
                    s = e.defaults,
                    o = e.extendTimeline;
                (r || "").split(",").forEach(function (t) {
                    return t && !ec[t] && !en[t] && d(n + " effect requires " + t + " plugin.");
                }),
                    (eu[n] = function (t, e, n) {
                        return i(e8(t), A(e || {}, s), n);
                    }),
                    o &&
                        (eq.prototype[n] = function (t, e, i) {
                            return this.add(eu[n](t, a(e) ? e : (i = e) && {}, this), i);
                        });
            },
            registerEase: function t(e, n) {
                eD[e] = eP(n);
            },
            parseEase: function t(e, n) {
                return arguments.length ? eP(e, n) : eD;
            },
            getById: function t(e) {
                return tb.getById(e);
            },
            exportRoot: function t(e, n) {
                void 0 === e && (e = {});
                var i,
                    r,
                    s = new eq(e);
                for (s.smoothChildTiming = l(e.smoothChildTiming), tb.remove(s), s._dp = 0, s._time = s._tTime = tb._time, i = tb._first; i; )
                    (r = i._next), (!n && !i._dur && i instanceof e4 && i.vars.onComplete === i._targets[0]) || I(s, i, i._start - i._delay), (i = r);
                return I(tb, s, 0), s;
            },
            context: function t(e, n) {
                return e ? new nf(e, n) : t8;
            },
            matchMedia: function t(e) {
                return new n$(e);
            },
            matchMediaRefresh: function t() {
                return (
                    na.forEach(function (t) {
                        var e,
                            n,
                            i = t.conditions;
                        for (n in i) i[n] && ((i[n] = !1), (e = 1));
                        e && t.revert();
                    }) || ns()
                );
            },
            addEventListener: function t(e, n) {
                var i = nl[e] || (nl[e] = []);
                ~i.indexOf(n) || i.push(n);
            },
            removeEventListener: function t(e, n) {
                var i = nl[e],
                    r = i && i.indexOf(n);
                0 <= r && i.splice(r, 1);
            },
            utils: {
                wrap: function t(e, n, i) {
                    var r = n - e;
                    return t5(e)
                        ? tr(e, t(0, e.length), n)
                        : K(i, function (t) {
                              return ((r + ((t - e) % r)) % r) + e;
                          });
                },
                wrapYoyo: function t(e, n, i) {
                    var r = n - e,
                        s = 2 * r;
                    return t5(e)
                        ? tr(e, t(0, e.length - 1), n)
                        : K(i, function (t) {
                              return e + (r < (t = (s + ((t - e) % s)) % s || 0) ? s - t : t);
                          });
                },
                distribute: tt,
                random: ti,
                snap: tn,
                normalize: function t(e, n, i) {
                    return eb(e, n, 0, 1, i);
                },
                getUnit: G,
                clamp: function t(e, n, i) {
                    return K(i, function (t) {
                        return ey(e, n, t);
                    });
                },
                splitColor: tu,
                toArray: e8,
                selector: Z,
                mapRange: eb,
                pipe: function t() {
                    for (var e = arguments.length, n = Array(e), i = 0; i < e; i++) n[i] = arguments[i];
                    return function (t) {
                        return n.reduce(function (t, e) {
                            return e(t);
                        }, t);
                    };
                },
                unitize: function t(e, n) {
                    return function (t) {
                        return e(parseFloat(t)) + (n || G(t));
                    };
                },
                interpolate: function t(e, n, r, s) {
                    var o = isNaN(e + n)
                        ? 0
                        : function (t) {
                              return (1 - t) * e + t * n;
                          };
                    if (!o) {
                        var a,
                            l,
                            c,
                            u,
                            h,
                            f = i(e),
                            d = {};
                        if ((!0 === r && (s = 1) && (r = null), f)) (e = { p: e }), (n = { p: n });
                        else if (t5(e) && !t5(n)) {
                            for (c = [], h = (u = e.length) - 2, l = 1; l < u; l++) c.push(t(e[l - 1], e[l]));
                            u--,
                                (o = function t(e) {
                                    var n = Math.min(h, ~~(e *= u));
                                    return c[n](e - n);
                                }),
                                (r = n);
                        } else s || (e = ep(t5(e) ? [] : {}, e));
                        if (!c) {
                            for (a in n) e3.call(d, e, a, "get", n[a]);
                            o = function t(n) {
                                return eZ(n, d) || (f ? e.p : e);
                            };
                        }
                    }
                    return K(r, o);
                },
                shuffle: J,
            },
            install: h,
            effects: eu,
            ticker: eE,
            updateRoot: eq.updateRoot,
            plugins: ec,
            globalTimeline: tb,
            core: {
                PropTween: nn,
                globals: p,
                Tween: e4,
                Timeline: eq,
                Animation: e1,
                getCache: v,
                _removeLinkedListItem: j,
                reverting: function t() {
                    return t_;
                },
                context: function t(e) {
                    return e && t8 && (t8.data.push(e), (e._ctx = t8)), t8;
                },
                suppressOverwrites: function t(e) {
                    return (ty = e);
                },
            },
        };
        function nv(t, e) {
            for (var n = t._pt; n && n.p !== e && n.op !== e && n.fp !== e; ) n = n._next;
            return n;
        }
        function ny(t, e) {
            return {
                name: t,
                rawVars: 1,
                init: function t(n, r, s) {
                    s._onInit = function (t) {
                        var n, s;
                        if (
                            (i(r) &&
                                ((n = {}),
                                _(r, function (t) {
                                    return (n[t] = 1);
                                }),
                                (r = n)),
                            e)
                        ) {
                            for (s in ((n = {}), r)) n[s] = e(r[s]);
                            r = n;
                        }
                        !(function t(e, n) {
                            var i,
                                r,
                                s,
                                o = e._targets;
                            for (i in n) for (r = o.length; r--; ) (s = (s = e._ptLookup[r][i]) && s.d) && (s._pt && (s = nv(s, i)), s && s.modifier && s.modifier(n[i], e, o[r], i));
                        })(t, r);
                    };
                },
            };
        }
        _("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
            return (ng[t] = e4[t]);
        }),
            eE.add(eq.updateRoot),
            (tE = ng.to({}, { duration: 0 }));
        var n_ =
            ng.registerPlugin(
                {
                    name: "attr",
                    init: function t(e, n, i, r, s) {
                        var o, a, l;
                        for (o in ((this.tween = i), n)) (l = e.getAttribute(o) || ""), ((a = this.add(e, "setAttribute", (l || 0) + "", n[o], r, s, 0, 0, o)).op = o), (a.b = l), this._props.push(o);
                    },
                    render: function t(e, n) {
                        for (var i = n._pt; i; ) t_ ? i.set(i.t, i.p, i.b, i) : i.r(e, i.d), (i = i._next);
                    },
                },
                {
                    name: "endArray",
                    init: function t(e, n) {
                        for (var i = n.length; i--; ) this.add(e, i, e[i] || 0, n[i], 0, 0, 0, 0, 0, 1);
                    },
                },
                ny("roundProps", te),
                ny("modifiers"),
                ny("snap", tn)
            ) || ng;
        function n8(t, e) {
            return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e);
        }
        function nb(t, e) {
            return e.set(e.t, e.p, 1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e);
        }
        function nx(t, e) {
            return e.set(e.t, e.p, t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b, e);
        }
        function nw(t, e) {
            var n = e.s + e.c * t;
            e.set(e.t, e.p, ~~(n + (n < 0 ? -0.5 : 0.5)) + e.u, e);
        }
        function nT(t, e) {
            return e.set(e.t, e.p, t ? e.e : e.b, e);
        }
        function nk(t, e) {
            return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
        }
        function nS(t, e, n) {
            return (t.style[e] = n);
        }
        function nC(t, e, n) {
            return t.style.setProperty(e, n);
        }
        function nE(t, e, n) {
            return (t._gsap[e] = n);
        }
        function nA(t, e, n) {
            return (t._gsap.scaleX = t._gsap.scaleY = n);
        }
        function nD(t, e, n, i, r) {
            var s = t._gsap;
            (s.scaleX = s.scaleY = n), s.renderTransform(r, s);
        }
        function nO(t, e, n, i, r) {
            var s = t._gsap;
            (s[e] = n), s.renderTransform(r, s);
        }
        function n0(t, e) {
            var n = this,
                i = this.target,
                r = i.style,
                s = i._gsap;
            if (t in ib && r) {
                if (((this.tfm = this.tfm || {}), "transform" === t))
                    return iE.transform.split(",").forEach(function (t) {
                        return n0.call(n, t, e);
                    });
                if (
                    (~(t = iE[t] || t).indexOf(",")
                        ? t.split(",").forEach(function (t) {
                              return (n.tfm[t] = ij(i, t));
                          })
                        : (this.tfm[t] = s.x ? s[t] : ij(i, t)),
                    t === iD && (this.tfm.zOrigin = s.zOrigin),
                    0 <= this.props.indexOf(iA))
                )
                    return;
                s.svg && ((this.svgo = i.getAttribute("data-svg-origin")), this.props.push(iD, e, "")), (t = iA);
            }
            (r || e) && this.props.push(t, e, r[t]);
        }
        function nL(t) {
            t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"));
        }
        function nP() {
            var t,
                e,
                n = this.props,
                i = this.target,
                r = i.style,
                s = i._gsap;
            for (t = 0; t < n.length; t += 3) n[t + 1] ? (i[n[t]] = n[t + 2]) : n[t + 2] ? (r[n[t]] = n[t + 2]) : r.removeProperty("--" === n[t].substr(0, 2) ? n[t] : n[t].replace(ik, "-$1").toLowerCase());
            if (this.tfm) {
                for (e in this.tfm) s[e] = this.tfm[e];
                s.svg && (s.renderTransform(), i.setAttribute("data-svg-origin", this.svgo || "")),
                    ((t = it()) && t.isStart) || r[iA] || (nL(r), s.zOrigin && r[iD] && ((r[iD] += " " + s.zOrigin + "px"), (s.zOrigin = 0), s.renderTransform()), (s.uncache = 1));
            }
        }
        function nj(t, e) {
            var n = { target: t, props: [], revert: nP, save: n0 };
            return (
                t._gsap || n_.core.getCache(t),
                e &&
                    e.split(",").forEach(function (t) {
                        return n.save(t);
                    }),
                n
            );
        }
        function nR(t, e) {
            var n = nK.createElementNS ? nK.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : nK.createElement(t);
            return n && n.style ? n : nK.createElement(t);
        }
        function nH(t, e, n) {
            var i = getComputedStyle(t);
            return i[e] || i.getPropertyValue(e.replace(ik, "-$1").toLowerCase()) || i.getPropertyValue(e) || (!n && nH(t, i0(e) || e, 1)) || "";
        }
        function nB() {
            "undefined" != typeof window &&
                window.document &&
                ((nG = (nK = (n5 = window).document).documentElement),
                (nZ = nR("div") || { style: {} }),
                nR("div"),
                (iD = (iA = i0(iA)) + "Origin"),
                (nZ.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0"),
                (ie = !!i0("perspective")),
                (it = n_.core.reverting),
                (nQ = 1));
        }
        function n1(t) {
            var e,
                n = nR("svg", (this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns")) || "http://www.w3.org/2000/svg"),
                i = this.parentNode,
                r = this.nextSibling,
                s = this.style.cssText;
            if ((nG.appendChild(n), n.appendChild(this), (this.style.display = "block"), t))
                try {
                    (e = this.getBBox()), (this._gsapBBox = this.getBBox), (this.getBBox = n1);
                } catch (o) {}
            else this._gsapBBox && (e = this._gsapBBox());
            return i && (r ? i.insertBefore(this, r) : i.appendChild(this)), nG.removeChild(n), (this.style.cssText = s), e;
        }
        function nM(t, e) {
            for (var n = e.length; n--; ) if (t.hasAttribute(e[n])) return t.getAttribute(e[n]);
        }
        function nq(t) {
            var e;
            try {
                e = t.getBBox();
            } catch (n) {
                e = n1.call(t, !0);
            }
            return (e && (e.width || e.height)) || t.getBBox === n1 || (e = n1.call(t, !0)), !e || e.width || e.x || e.y ? e : { x: +nM(t, ["x", "cx", "x1"]) || 0, y: +nM(t, ["y", "cy", "y1"]) || 0, width: 0, height: 0 };
        }
        function nN(t) {
            return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !nq(t));
        }
        function nz(t, e) {
            if (e) {
                var n,
                    i = t.style;
                e in ib && e !== iD && (e = iA),
                    i.removeProperty ? (("ms" !== (n = e.substr(0, 2)) && "webkit" !== e.substr(0, 6)) || (e = "-" + e), i.removeProperty("--" === n ? e : e.replace(ik, "-$1").toLowerCase())) : i.removeAttribute(e);
            }
        }
        function nW(t, e, n, i, r, s) {
            var o = new nn(t._pt, e, n, 0, 1, s ? nk : nT);
            return ((t._pt = o).b = i), (o.e = r), t._props.push(n), o;
        }
        function nI(t, e, n, i) {
            var r,
                s,
                o,
                a,
                l = parseFloat(n) || 0,
                c = (n + "").trim().substr((l + "").length) || "px",
                u = nZ.style,
                h = iS.test(e),
                f = "svg" === t.tagName.toLowerCase(),
                d = (f ? "client" : "offset") + (h ? "Width" : "Height"),
                p = "px" === i,
                m = "%" === i;
            if (i === c || !l || iL[i] || iL[c]) return l;
            if (("px" === c || p || (l = nI(t, e, n, "px")), (a = t.getCTM && nN(t)), (m || "%" === c) && (ib[e] || ~e.indexOf("adius")))) return (r = a ? t.getBBox()[h ? "width" : "height"] : t[d]), b(m ? (l / r) * 100 : (l / 100) * r);
            if (
                ((u[h ? "width" : "height"] = 100 + (p ? c : i)),
                (s = ~e.indexOf("adius") || ("em" === i && t.appendChild && !f) ? t : t.parentNode),
                a && (s = (t.ownerSVGElement || {}).parentNode),
                (s && s !== nK && s.appendChild) || (s = nK.body),
                (o = s._gsap) && m && o.width && h && o.time === eE.time && !o.uncache)
            )
                return b((l / o.width) * 100);
            if (m && ("height" === e || "width" === e)) {
                var g = t.style[e];
                (t.style[e] = 100 + i), (r = t[d]), g ? (t.style[e] = g) : nz(t, e);
            } else (!m && "%" !== c) || iP[nH(s, "display")] || (u.position = nH(t, "position")), s === t && (u.position = "static"), s.appendChild(nZ), (r = nZ[d]), s.removeChild(nZ), (u.position = "absolute");
            return h && m && (((o = v(s)).time = eE.time), (o.width = s[d])), b(p ? (r * l) / 100 : r && l ? (100 / r) * l : 0);
        }
        function n3(t, e, n, i) {
            if (!n || "none" === n) {
                var r = i0(e, t, 1),
                    s = r && nH(t, r, 1);
                s && s !== n ? ((e = r), (n = s)) : "borderColor" === e && (n = nH(t, "borderTopColor"));
            }
            var o,
                a,
                l,
                c,
                u,
                h,
                f,
                d,
                p,
                m,
                g,
                v = new nn(this._pt, t.style, e, 0, 1, eQ),
                y = 0,
                _ = 0;
            if (
                ((v.b = n),
                (v.e = i),
                (n += ""),
                "auto" == (i += "") && ((h = t.style[e]), (t.style[e] = i), (i = nH(t, e) || i), h ? (t.style[e] = h) : nz(t, e)),
                td((o = [n, i])),
                (i = o[1]),
                (l = (n = o[0]).match(tQ) || []),
                (i.match(tQ) || []).length)
            ) {
                for (; (a = tQ.exec(i)); )
                    (f = a[0]),
                        (p = i.substring(y, a.index)),
                        u ? (u = (u + 1) % 5) : ("rgba(" !== p.substr(-5) && "hsla(" !== p.substr(-5)) || (u = 1),
                        f !== (h = l[_++] || "") &&
                            ((c = parseFloat(h) || 0),
                            (g = h.substr((c + "").length)),
                            "=" === f.charAt(1) && (f = w(c, f) + g),
                            (d = parseFloat(f)),
                            (m = f.substr((d + "").length)),
                            (y = tQ.lastIndex - m.length),
                            m || ((m = m || t3.units[e] || g), y === i.length && ((i += m), (v.e += m))),
                            g !== m && (c = nI(t, e, h, m) || 0),
                            (v._pt = { _next: v._pt, p: p || 1 === _ ? p : ",", s: c, c: d - c, m: (u && u < 4) || "zIndex" === e ? Math.round : 0 }));
                v.c = y < i.length ? i.substring(y, i.length) : "";
            } else v.r = "display" === e && "none" === i ? nk : nT;
            return tJ.test(i) && (v.e = 0), (this._pt = v);
        }
        function nY(t) {
            var e = t.split(" "),
                n = e[0],
                i = e[1] || "50%";
            return ("top" !== n && "bottom" !== n && "left" !== i && "right" !== i) || ((t = n), (n = i), (i = t)), (e[0] = iR[n] || n), (e[1] = iR[i] || i), e.join(" ");
        }
        function nX(t, e) {
            if (e.tween && e.tween._time === e.tween._dur) {
                var n,
                    i,
                    r,
                    s = e.t,
                    o = s.style,
                    a = e.u,
                    l = s._gsap;
                if ("all" === a || !0 === a) (o.cssText = ""), (i = 1);
                else for (r = (a = a.split(",")).length; -1 < --r; ) ib[(n = a[r])] && ((i = 1), (n = "transformOrigin" === n ? iD : iA)), nz(s, n);
                i && (nz(s, iA), l && (l.svg && s.removeAttribute("transform"), iM(s, 1), (l.uncache = 1), nL(o)));
            }
        }
        function n2(t) {
            return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
        }
        function nF(t) {
            var e = nH(t, iA);
            return n2(e) ? iB : e.substr(7).match(tG).map(b);
        }
        function n4(t, e) {
            var n,
                i,
                r,
                s,
                o = t._gsap || v(t),
                a = t.style,
                l = nF(t);
            return o.svg && t.getAttribute("transform")
                ? "1,0,0,1,0,0" === (l = [(r = t.transform.baseVal.consolidate().matrix).a, r.b, r.c, r.d, r.e, r.f]).join(",")
                    ? iB
                    : l
                : (l !== iB ||
                      t.offsetParent ||
                      t === nG ||
                      o.svg ||
                      ((r = a.display),
                      (a.display = "block"),
                      ((n = t.parentNode) && t.offsetParent) || ((s = 1), (i = t.nextElementSibling), nG.appendChild(t)),
                      (l = nF(t)),
                      r ? (a.display = r) : nz(t, "display"),
                      s && (i ? n.insertBefore(t, i) : n ? n.appendChild(t) : nG.removeChild(t))),
                  e && 6 < l.length ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l);
        }
        function nV(t, e, n, i, r, s) {
            var o,
                a,
                l,
                c = t._gsap,
                u = r || n4(t, !0),
                h = c.xOrigin || 0,
                f = c.yOrigin || 0,
                d = c.xOffset || 0,
                p = c.yOffset || 0,
                m = u[0],
                g = u[1],
                v = u[2],
                y = u[3],
                _ = u[4],
                b = u[5],
                x = e.split(" "),
                w = parseFloat(x[0]) || 0,
                T = parseFloat(x[1]) || 0;
            n
                ? u !== iB && (a = m * y - g * v) && ((l = w * (-g / a) + T * (m / a) - (m * b - g * _) / a), (w = w * (y / a) + T * (-v / a) + (v * b - y * _) / a), (T = l))
                : ((w = (o = nq(t)).x + (~x[0].indexOf("%") ? (w / 100) * o.width : w)), (T = o.y + (~(x[1] || x[0]).indexOf("%") ? (T / 100) * o.height : T))),
                i || (!1 !== i && c.smooth) ? ((_ = w - h), (b = T - f), (c.xOffset = d + (_ * m + b * v) - _), (c.yOffset = p + (_ * g + b * y) - b)) : (c.xOffset = c.yOffset = 0),
                (c.xOrigin = w),
                (c.yOrigin = T),
                (c.smooth = !!i),
                (c.origin = e),
                (c.originIsAbsolute = !!n),
                (t.style[iD] = "0px 0px"),
                s && (nW(s, c, "xOrigin", h, w), nW(s, c, "yOrigin", f, T), nW(s, c, "xOffset", d, c.xOffset), nW(s, c, "yOffset", p, c.yOffset)),
                t.setAttribute("data-svg-origin", w + " " + T);
        }
        function n9(t, e, n) {
            var i = G(e);
            return b(parseFloat(e) + parseFloat(nI(t, "x", n + "px", i))) + i;
        }
        function n7(t, e, n, r, s) {
            var o,
                a,
                l = i(s),
                c = parseFloat(s) * (l && ~s.indexOf("rad") ? ix : 1) - r,
                u = r + c + "deg";
            return (
                l &&
                    ("short" === (o = s.split("_")[1]) && (c %= 360) != c % 180 && (c += c < 0 ? 360 : -360),
                    "cw" === o && c < 0 ? (c = ((c + 36e9) % 360) - 360 * ~~(c / 360)) : "ccw" === o && 0 < c && (c = ((c - 36e9) % 360) - 360 * ~~(c / 360))),
                (t._pt = a = new nn(t._pt, e, n, r, c, nb)),
                (a.e = u),
                (a.u = "deg"),
                t._props.push(n),
                a
            );
        }
        function nU(t, e) {
            for (var n in e) t[n] = e[n];
            return t;
        }
        function n6(t, e, n) {
            var i,
                r,
                s,
                o,
                a,
                l,
                c,
                u = nU({}, n._gsap),
                h = n.style;
            for (r in (u.svg
                ? ((s = n.getAttribute("transform")), n.setAttribute("transform", ""), (h[iA] = e), (i = iM(n, 1)), nz(n, iA), n.setAttribute("transform", s))
                : ((s = getComputedStyle(n)[iA]), (h[iA] = e), (i = iM(n, 1)), (h[iA] = s)),
            ib))
                (s = u[r]) !== (o = i[r]) &&
                    0 > "perspective,force3D,transformOrigin,svgOrigin".indexOf(r) &&
                    ((a = G(s) !== (c = G(o)) ? nI(n, r, s, c) : parseFloat(s)), (l = parseFloat(o)), (t._pt = new nn(t._pt, i, r, a, l - a, n8)), (t._pt.u = c || 0), t._props.push(r));
            nU(i, u);
        }
        (e4.version = eq.version = n_.version = "3.12.5"), (tS = 1), c() && eA();
        var n5,
            nK,
            nG,
            nQ,
            nZ,
            nJ,
            it,
            ie,
            ii = eD.Power0,
            ir = eD.Power1,
            is = eD.Power2,
            io = eD.Power3,
            ia = eD.Power4,
            il = eD.Linear,
            ic = eD.Quad,
            iu = eD.Cubic,
            ih = eD.Quart,
            id = eD.Quint,
            ip = eD.Strong,
            i$ = eD.Elastic,
            im = eD.Back,
            ig = eD.SteppedEase,
            iv = eD.Bounce,
            iy = eD.Sine,
            i_ = eD.Expo,
            i8 = eD.Circ,
            ib = {},
            ix = 180 / Math.PI,
            iw = Math.PI / 180,
            iT = Math.atan2,
            ik = /([A-Z])/g,
            iS = /(left|right|width|margin|padding|x)/i,
            iC = /[\s,\(]\S/,
            iE = { autoAlpha: "opacity,visibility", scale: "scaleX,scaleY", alpha: "opacity" },
            iA = "transform",
            iD = iA + "Origin",
            iO = "O,Moz,ms,Ms,Webkit".split(","),
            i0 = function t(e, n, i) {
                var r = (n || nZ).style,
                    s = 5;
                if (e in r && !i) return e;
                for (e = e.charAt(0).toUpperCase() + e.substr(1); s-- && !(iO[s] + e in r); );
                return s < 0 ? null : (3 === s ? "ms" : 0 <= s ? iO[s] : "") + e;
            },
            iL = { deg: 1, rad: 1, turn: 1 },
            iP = { grid: 1, flex: 1 },
            ij = function t(e, n, i, r) {
                var s;
                return (
                    nQ || nB(),
                    n in iE && "transform" !== n && ~(n = iE[n]).indexOf(",") && (n = n.split(",")[0]),
                    ib[n] && "transform" !== n
                        ? ((s = iM(e, r)), (s = "transformOrigin" !== n ? s[n] : s.svg ? s.origin : iq(nH(e, iD)) + " " + s.zOrigin + "px"))
                        : ((s = e.style[n]) && "auto" !== s && !r && !~(s + "").indexOf("calc(")) || (s = (iH[n] && iH[n](e, n, i)) || nH(e, n) || y(e, n) || ("opacity" === n ? 1 : 0)),
                    i && !~(s + "").trim().indexOf(" ") ? nI(e, n, s, i) + i : s
                );
            },
            iR = { top: "0%", bottom: "100%", left: "0%", right: "100%", center: "50%" },
            iH = {
                clearProps: function t(e, n, i, r, s) {
                    if ("isFromStart" !== s.data) {
                        var o = (e._pt = new nn(e._pt, n, i, 0, 0, nX));
                        return (o.u = r), (o.pr = -10), (o.tween = s), e._props.push(i), 1;
                    }
                },
            },
            iB = [1, 0, 0, 1, 0, 0],
            i1 = {},
            iM = function t(e, n) {
                var i = e._gsap || new eB(e);
                if ("x" in i && !n && !i.uncache) return i;
                var r,
                    s,
                    o,
                    a,
                    l,
                    c,
                    u,
                    h,
                    f,
                    d,
                    p,
                    m,
                    g,
                    v,
                    y,
                    _,
                    x,
                    w,
                    T,
                    k,
                    S,
                    C,
                    E,
                    A,
                    D,
                    O,
                    L,
                    P,
                    j,
                    R,
                    H,
                    B,
                    M = e.style,
                    q = i.scaleX < 0,
                    N = getComputedStyle(e),
                    z = nH(e, iD) || "0";
                return (
                    (r = s = o = c = u = h = f = d = p = 0),
                    (a = l = 1),
                    (i.svg = !(!e.getCTM || !nN(e))),
                    N.translate &&
                        (("none" === N.translate && "none" === N.scale && "none" === N.rotate) ||
                            (M[iA] =
                                ("none" !== N.translate ? "translate3d(" + (N.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") +
                                ("none" !== N.rotate ? "rotate(" + N.rotate + ") " : "") +
                                ("none" !== N.scale ? "scale(" + N.scale.split(" ").join(",") + ") " : "") +
                                ("none" !== N[iA] ? N[iA] : "")),
                        (M.scale = M.rotate = M.translate = "none")),
                    (v = n4(e, i.svg)),
                    i.svg && ((A = i.uncache ? ((D = e.getBBox()), (z = i.xOrigin - D.x + "px " + (i.yOrigin - D.y) + "px"), "") : !n && e.getAttribute("data-svg-origin")), nV(e, A || z, !!A || i.originIsAbsolute, !1 !== i.smooth, v)),
                    (m = i.xOrigin || 0),
                    (g = i.yOrigin || 0),
                    v !== iB &&
                        ((w = v[0]),
                        (T = v[1]),
                        (k = v[2]),
                        (S = v[3]),
                        (r = C = v[4]),
                        (s = E = v[5]),
                        6 === v.length
                            ? ((a = Math.sqrt(w * w + T * T)),
                              (l = Math.sqrt(S * S + k * k)),
                              (c = w || T ? iT(T, w) * ix : 0),
                              (f = k || S ? iT(k, S) * ix + c : 0) && (l *= Math.abs(Math.cos(f * iw))),
                              i.svg && ((r -= m - (m * w + g * k)), (s -= g - (m * T + g * S))))
                            : ((B = v[6]),
                              (R = v[7]),
                              (L = v[8]),
                              (P = v[9]),
                              (j = v[10]),
                              (H = v[11]),
                              (r = v[12]),
                              (s = v[13]),
                              (o = v[14]),
                              (u = (y = iT(B, j)) * ix),
                              y &&
                                  ((A = C * (_ = Math.cos(-y)) + L * (x = Math.sin(-y))),
                                  (D = E * _ + P * x),
                                  (O = B * _ + j * x),
                                  (L = -(C * x) + L * _),
                                  (P = -(E * x) + P * _),
                                  (j = -(B * x) + j * _),
                                  (H = -(R * x) + H * _),
                                  (C = A),
                                  (E = D),
                                  (B = O)),
                              (h = (y = iT(-k, j)) * ix),
                              y && ((_ = Math.cos(-y)), (H = S * (x = Math.sin(-y)) + H * _), (w = A = w * _ - L * x), (T = D = T * _ - P * x), (k = O = k * _ - j * x)),
                              (c = (y = iT(T, w)) * ix),
                              y && ((A = w * (_ = Math.cos(y)) + T * (x = Math.sin(y))), (D = C * _ + E * x), (T = T * _ - w * x), (E = E * _ - C * x), (w = A), (C = D)),
                              u && 359.9 < Math.abs(u) + Math.abs(c) && ((u = c = 0), (h = 180 - h)),
                              (a = b(Math.sqrt(w * w + T * T + k * k))),
                              (l = b(Math.sqrt(E * E + B * B))),
                              (f = 2e-4 < Math.abs((y = iT(C, E))) ? y * ix : 0),
                              (p = H ? 1 / (H < 0 ? -H : H) : 0)),
                        i.svg && ((A = e.getAttribute("transform")), (i.forceCSS = e.setAttribute("transform", "") || !n2(nH(e, iA))), A && e.setAttribute("transform", A))),
                    90 < Math.abs(f) && 270 > Math.abs(f) && (q ? ((a *= -1), (f += c <= 0 ? 180 : -180), (c += c <= 0 ? 180 : -180)) : ((l *= -1), (f += f <= 0 ? 180 : -180))),
                    (n = n || i.uncache),
                    (i.x = r - ((i.xPercent = r && ((!n && i.xPercent) || (Math.round(e.offsetWidth / 2) === Math.round(-r) ? -50 : 0))) ? (e.offsetWidth * i.xPercent) / 100 : 0) + "px"),
                    (i.y = s - ((i.yPercent = s && ((!n && i.yPercent) || (Math.round(e.offsetHeight / 2) === Math.round(-s) ? -50 : 0))) ? (e.offsetHeight * i.yPercent) / 100 : 0) + "px"),
                    (i.z = o + "px"),
                    (i.scaleX = b(a)),
                    (i.scaleY = b(l)),
                    (i.rotation = b(c) + "deg"),
                    (i.rotationX = b(u) + "deg"),
                    (i.rotationY = b(h) + "deg"),
                    (i.skewX = f + "deg"),
                    (i.skewY = d + "deg"),
                    (i.transformPerspective = p + "px"),
                    (i.zOrigin = parseFloat(z.split(" ")[2]) || (!n && i.zOrigin) || 0) && (M[iD] = iq(z)),
                    (i.xOffset = i.yOffset = 0),
                    (i.force3D = t3.force3D),
                    (i.renderTransform = i.svg ? iI : ie ? iW : iN),
                    (i.uncache = 0),
                    i
                );
            },
            iq = function t(e) {
                return (e = e.split(" "))[0] + " " + e[1];
            },
            iN = function t(e, n) {
                (n.z = "0px"), (n.rotationY = n.rotationX = "0deg"), (n.force3D = 0), iW(e, n);
            },
            iz = "0deg",
            iW = function t(e, n) {
                var i = n || this,
                    r = i.xPercent,
                    s = i.yPercent,
                    o = i.x,
                    a = i.y,
                    l = i.z,
                    c = i.rotation,
                    u = i.rotationY,
                    h = i.rotationX,
                    f = i.skewX,
                    d = i.skewY,
                    p = i.scaleX,
                    m = i.scaleY,
                    g = i.transformPerspective,
                    v = i.force3D,
                    y = i.target,
                    _ = i.zOrigin,
                    b = "",
                    x = ("auto" === v && e && 1 !== e) || !0 === v;
                if (_ && (h !== iz || u !== iz)) {
                    var w,
                        T = parseFloat(u) * iw,
                        k = Math.sin(T),
                        S = Math.cos(T);
                    (w = Math.cos((T = parseFloat(h) * iw))), (o = n9(y, o, -(k * w * _))), (a = n9(y, a, -(-Math.sin(T) * _))), (l = n9(y, l, -(S * w * _) + _));
                }
                "0px" !== g && (b += "perspective(" + g + ") "),
                    (r || s) && (b += "translate(" + r + "%, " + s + "%) "),
                    (x || "0px" !== o || "0px" !== a || "0px" !== l) && (b += "0px" !== l || x ? "translate3d(" + o + ", " + a + ", " + l + ") " : "translate(" + o + ", " + a + ") "),
                    c !== iz && (b += "rotate(" + c + ") "),
                    u !== iz && (b += "rotateY(" + u + ") "),
                    h !== iz && (b += "rotateX(" + h + ") "),
                    (f === iz && d === iz) || (b += "skew(" + f + ", " + d + ") "),
                    (1 === p && 1 === m) || (b += "scale(" + p + ", " + m + ") "),
                    (y.style[iA] = b || "translate(0, 0)");
            },
            iI = function t(e, n) {
                var i,
                    r,
                    s,
                    o,
                    a,
                    l = n || this,
                    c = l.xPercent,
                    u = l.yPercent,
                    h = l.x,
                    f = l.y,
                    d = l.rotation,
                    p = l.skewX,
                    m = l.skewY,
                    g = l.scaleX,
                    v = l.scaleY,
                    y = l.target,
                    _ = l.xOrigin,
                    x = l.yOrigin,
                    w = l.xOffset,
                    T = l.yOffset,
                    k = l.forceCSS,
                    S = parseFloat(h),
                    C = parseFloat(f);
                (d = parseFloat(d)),
                    (p = parseFloat(p)),
                    (m = parseFloat(m)) && ((p += m = parseFloat(m)), (d += m)),
                    d || p
                        ? ((d *= iw),
                          (p *= iw),
                          (i = Math.cos(d) * g),
                          (r = Math.sin(d) * g),
                          (s = -(Math.sin(d - p) * v)),
                          (o = Math.cos(d - p) * v),
                          p && ((m *= iw), (s *= a = Math.sqrt(1 + (a = Math.tan(p - m)) * a)), (o *= a), m && ((i *= a = Math.sqrt(1 + (a = Math.tan(m)) * a)), (r *= a))),
                          (i = b(i)),
                          (r = b(r)),
                          (s = b(s)),
                          (o = b(o)))
                        : ((i = g), (o = v), (r = s = 0)),
                    ((S && !~(h + "").indexOf("px")) || (C && !~(f + "").indexOf("px"))) && ((S = nI(y, "x", h, "px")), (C = nI(y, "y", f, "px"))),
                    (_ || x || w || T) && ((S = b(S + _ - (_ * i + x * s) + w)), (C = b(C + x - (_ * r + x * o) + T))),
                    (c || u) && ((S = b(S + (c / 100) * (a = y.getBBox()).width)), (C = b(C + (u / 100) * a.height))),
                    (a = "matrix(" + i + "," + r + "," + s + "," + o + "," + S + "," + C + ")"),
                    y.setAttribute("transform", a),
                    k && (y.style[iA] = a);
            };
        _("padding,margin,Width,Radius", function (t, e) {
            var n = "Right",
                i = "Bottom",
                r = "Left",
                s = (e < 3 ? ["Top", n, i, r] : ["Top" + r, "Top" + n, i + n, i + r]).map(function (n) {
                    return e < 2 ? t + n : "border" + n + t;
                });
            iH[1 < e ? "border" + t : t] = function (t, e, n, i, r) {
                var o, a;
                if (arguments.length < 4)
                    return 5 ===
                        (a = (o = s.map(function (e) {
                            return ij(t, e, n);
                        })).join(" ")).split(o[0]).length
                        ? o[0]
                        : a;
                (o = (i + "").split(" ")),
                    (a = {}),
                    s.forEach(function (t, e) {
                        return (a[t] = o[e] = o[e] || o[((e - 1) / 2) | 0]);
                    }),
                    t.init(e, a, r);
            };
        });
        var i3,
            iY,
            iX,
            i2 = {
                name: "css",
                register: nB,
                targetTest: function t(e) {
                    return e.style && e.nodeType;
                },
                init: function t(e, n, r, s, o) {
                    var a,
                        l,
                        c,
                        u,
                        h,
                        d,
                        p,
                        m,
                        g,
                        v,
                        y,
                        _,
                        b,
                        x,
                        T,
                        k,
                        S = this._props,
                        C = e.style,
                        E = r.vars.startAt;
                    for (p in (nQ || nB(), (this.styles = this.styles || nj(e)), (k = this.styles.props), (this.tween = r), n))
                        if ("autoRound" !== p && ((l = n[p]), !ec[p] || !eN(p, n, r, s, e, o))) {
                            if (((h = typeof l), (d = iH[p]), "function" === h && (h = typeof (l = l.call(r, s, e, o))), "string" === h && ~l.indexOf("random(") && (l = ts(l)), d)) d(this, e, p, l, r) && (T = 1);
                            else if ("--" === p.substr(0, 2))
                                (a = (getComputedStyle(e).getPropertyValue(p) + "").trim()),
                                    (l += ""),
                                    (eS.lastIndex = 0),
                                    eS.test(a) || ((m = G(a)), (g = G(l))),
                                    g ? m !== g && (a = nI(e, p, a, g) + g) : m && (l += m),
                                    this.add(C, "setProperty", a, l, s, o, 0, 0, p),
                                    S.push(p),
                                    k.push(p, 0, C[p]);
                            else if ("undefined" !== h) {
                                if (
                                    (E && p in E
                                        ? (i((a = "function" == typeof E[p] ? E[p].call(r, s, e, o) : E[p])) && ~a.indexOf("random(") && (a = ts(a)),
                                          G(a + "") || "auto" === a || (a += t3.units[p] || G(ij(e, p)) || ""),
                                          "=" === (a + "").charAt(1) && (a = ij(e, p)))
                                        : (a = ij(e, p)),
                                    (u = parseFloat(a)),
                                    (v = "string" === h && "=" === l.charAt(1) && l.substr(0, 2)) && (l = l.substr(2)),
                                    (c = parseFloat(l)),
                                    p in iE &&
                                        ("autoAlpha" === p &&
                                            (1 === u && "hidden" === ij(e, "visibility") && c && (u = 0), k.push("visibility", 0, C.visibility), nW(this, C, "visibility", u ? "inherit" : "hidden", c ? "inherit" : "hidden", !c)),
                                        "scale" !== p && "transform" !== p && ~(p = iE[p]).indexOf(",") && (p = p.split(",")[0])),
                                    (y = p in ib))
                                ) {
                                    if (
                                        (this.styles.save(p),
                                        _ ||
                                            (((b = e._gsap).renderTransform && !n.parseTransform) || iM(e, n.parseTransform),
                                            (x = !1 !== n.smoothOrigin && b.smooth),
                                            ((_ = this._pt = new nn(this._pt, C, iA, 0, 1, b.renderTransform, b, 0, -1)).dep = 1)),
                                        "scale" === p)
                                    )
                                        (this._pt = new nn(this._pt, b, "scaleY", b.scaleY, (v ? w(b.scaleY, v + c) : c) - b.scaleY || 0, n8)), (this._pt.u = 0), S.push("scaleY", p), (p += "X");
                                    else {
                                        if ("transformOrigin" === p) {
                                            k.push(iD, 0, C[iD]), (l = nY(l)), b.svg ? nV(e, l, 0, x, 0, this) : ((g = parseFloat(l.split(" ")[2]) || 0) !== b.zOrigin && nW(this, b, "zOrigin", b.zOrigin, g), nW(this, C, p, iq(a), iq(l)));
                                            continue;
                                        }
                                        if ("svgOrigin" === p) {
                                            nV(e, l, 1, x, 0, this);
                                            continue;
                                        }
                                        if (p in i1) {
                                            n7(this, b, p, u, v ? w(u, v + l) : l);
                                            continue;
                                        }
                                        if ("smoothOrigin" === p) {
                                            nW(this, b, "smooth", b.smooth, l);
                                            continue;
                                        }
                                        if ("force3D" === p) {
                                            b[p] = l;
                                            continue;
                                        }
                                        if ("transform" === p) {
                                            n6(this, l, e);
                                            continue;
                                        }
                                    }
                                } else p in C || (p = i0(p) || p);
                                if (y || ((c || 0 === c) && (u || 0 === u) && !iC.test(l) && p in C))
                                    (c = c || 0),
                                        (m = (a + "").substr((u + "").length)) !== (g = G(l) || (p in t3.units ? t3.units[p] : m)) && (u = nI(e, p, a, g)),
                                        (this._pt = new nn(this._pt, y ? b : C, p, u, (v ? w(u, v + c) : c) - u, y || ("px" !== g && "zIndex" !== p) || !1 === n.autoRound ? n8 : nw)),
                                        (this._pt.u = g || 0),
                                        m !== g && "%" !== g && ((this._pt.b = a), (this._pt.r = nx));
                                else if (p in C) n3.call(this, e, p, a, v ? v + l : l);
                                else if (p in e) this.add(e, p, a || e[p], v ? v + l : l, s, o);
                                else if ("parseTransform" !== p) {
                                    f(p, l);
                                    continue;
                                }
                                y || (p in C ? k.push(p, 0, C[p]) : k.push(p, 1, a || e[p])), S.push(p);
                            }
                        }
                    T && ne(this);
                },
                render: function t(e, n) {
                    if (n.tween._time || !it()) for (var i = n._pt; i; ) i.r(e, i.d), (i = i._next);
                    else n.styles.revert();
                },
                get: ij,
                aliases: iE,
                getSetter: function t(e, n, i) {
                    var r = iE[n];
                    return (
                        r && 0 > r.indexOf(",") && (n = r),
                        n in ib && n !== iD && (e._gsap.x || ij(e, "x")) ? (i && nJ === i ? ("scale" === n ? nA : nE) : ((nJ = i || {}), "scale" === n ? nD : nO)) : e.style && !o(e.style[n]) ? nS : ~n.indexOf("-") ? nC : e5(e, n)
                    );
                },
                core: { _removeProperty: nz, _getMatrix: n4 },
            };
        (n_.utils.checkPrefix = i0),
            (n_.core.getStyleSaver = nj),
            (iX = _((i3 = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") + "," + (iY = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", function (t) {
                ib[t] = 1;
            })),
            _(iY, function (t) {
                (t3.units[t] = "deg"), (i1[t] = 1);
            }),
            (iE[iX[13]] = i3 + "," + iY),
            _("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", function (t) {
                var e = t.split(":");
                iE[e[1]] = iX[e[0]];
            }),
            _("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (t) {
                t3.units[t] = "px";
            }),
            n_.registerPlugin(i2);
        var iF = n_.registerPlugin(i2) || n_,
            i4 = iF.core.Tween;
        (t.Back = im),
            (t.Bounce = iv),
            (t.CSSPlugin = i2),
            (t.Circ = i8),
            (t.Cubic = iu),
            (t.Elastic = i$),
            (t.Expo = i_),
            (t.Linear = il),
            (t.Power0 = ii),
            (t.Power1 = ir),
            (t.Power2 = is),
            (t.Power3 = io),
            (t.Power4 = ia),
            (t.Quad = ic),
            (t.Quart = ih),
            (t.Quint = id),
            (t.Sine = iy),
            (t.SteppedEase = ig),
            (t.Strong = ip),
            (t.TimelineLite = eq),
            (t.TimelineMax = eq),
            (t.TweenLite = e4),
            (t.TweenMax = i4),
            (t.default = iF),
            (t.gsap = iF),
            "undefined" == typeof window || window !== t ? Object.defineProperty(t, "__esModule", { value: !0 }) : delete t.default;
    }),
    $(window).on("load", function () {
        $(window).width() > 550
            ? setTimeout(function () {
                  $(".loading").addClass("hide");
              }, 500)
            : setTimeout(function () {
                  $(".loader").animate({ opacity: 0 }),
                      setTimeout(function () {
                          $(".loader").css({ display: "none" }),
                              $(".loading-mobile").css({ display: "block" }),
                              $(".loading-mobile").animate({ opacity: 1 }),
                              setTimeout(function () {
                                  $(document).click(function () {
                                      $(".loading").addClass("hide");
                                  });
                              }, 100);
                      }, 500);
              }, 500);
    }),
    $(document).ready(function () {
        var t = $(".cursor"),
            e = $("a, button");
        $(document).on("mousemove", function (e) {
            var n = e.clientX,
                i = e.clientY;
            t.css({ transform: `translate3d(calc(${n}px - 50%), calc(${i}px - 50%), 0)` });
        }),
            e.on("mouseover", function () {
                t.addClass("hover");
            }),
            e.on("mouseleave", function () {
                t.removeClass("hover");
            }),
            magneticButton({ distance: 75 });
    }),
    $(document).ready(function () {
        $("#theme-toggler").on("click", function () {
            updateTheme();
        });
        var t = Cookies.get("theme");
        t && $("html").attr("data-theme", t);
    }),
    document.addEventListener("DOMContentLoaded", () => {
        new LocomotiveScroll({ el: document.querySelector("[data-scroll-container]"), smooth: !0, smartphone: { smooth: !1 }, tablet: { smooth: !1 } });
    });
