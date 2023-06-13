/*! For license information please see main.bundle.js.LICENSE.txt */
(() => {
  var e,
    t,
    n,
    r,
    o = {
      9755: function (e, t) {
        var n;
        !(function (t, n) {
          'use strict';
          'object' == typeof e.exports
            ? (e.exports = t.document
                ? n(t, !0)
                : function (e) {
                    if (!e.document)
                      throw new Error(
                        'jQuery requires a window with a document'
                      );
                    return n(e);
                  })
            : n(t);
        })('undefined' != typeof window ? window : this, function (r, o) {
          'use strict';
          var i = [],
            a = Object.getPrototypeOf,
            s = i.slice,
            c = i.flat
              ? function (e) {
                  return i.flat.call(e);
                }
              : function (e) {
                  return i.concat.apply([], e);
                },
            l = i.push,
            u = i.indexOf,
            p = {},
            d = p.toString,
            f = p.hasOwnProperty,
            h = f.toString,
            g = h.call(Object),
            v = {},
            m = function (e) {
              return (
                'function' == typeof e &&
                'number' != typeof e.nodeType &&
                'function' != typeof e.item
              );
            },
            y = function (e) {
              return null != e && e === e.window;
            },
            b = r.document,
            x = { type: !0, src: !0, nonce: !0, noModule: !0 };
          function w(e, t, n) {
            var r,
              o,
              i = (n = n || b).createElement('script');
            if (((i.text = e), t))
              for (r in x)
                (o = t[r] || (t.getAttribute && t.getAttribute(r))) &&
                  i.setAttribute(r, o);
            n.head.appendChild(i).parentNode.removeChild(i);
          }
          function S(e) {
            return null == e
              ? e + ''
              : 'object' == typeof e || 'function' == typeof e
              ? p[d.call(e)] || 'object'
              : typeof e;
          }
          var C = '3.6.4',
            k = function (e, t) {
              return new k.fn.init(e, t);
            };
          function E(e) {
            var t = !!e && 'length' in e && e.length,
              n = S(e);
            return (
              !m(e) &&
              !y(e) &&
              ('array' === n ||
                0 === t ||
                ('number' == typeof t && t > 0 && t - 1 in e))
            );
          }
          (k.fn = k.prototype =
            {
              jquery: C,
              constructor: k,
              length: 0,
              toArray: function () {
                return s.call(this);
              },
              get: function (e) {
                return null == e
                  ? s.call(this)
                  : e < 0
                  ? this[e + this.length]
                  : this[e];
              },
              pushStack: function (e) {
                var t = k.merge(this.constructor(), e);
                return (t.prevObject = this), t;
              },
              each: function (e) {
                return k.each(this, e);
              },
              map: function (e) {
                return this.pushStack(
                  k.map(this, function (t, n) {
                    return e.call(t, n, t);
                  })
                );
              },
              slice: function () {
                return this.pushStack(s.apply(this, arguments));
              },
              first: function () {
                return this.eq(0);
              },
              last: function () {
                return this.eq(-1);
              },
              even: function () {
                return this.pushStack(
                  k.grep(this, function (e, t) {
                    return (t + 1) % 2;
                  })
                );
              },
              odd: function () {
                return this.pushStack(
                  k.grep(this, function (e, t) {
                    return t % 2;
                  })
                );
              },
              eq: function (e) {
                var t = this.length,
                  n = +e + (e < 0 ? t : 0);
                return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
              },
              end: function () {
                return this.prevObject || this.constructor();
              },
              push: l,
              sort: i.sort,
              splice: i.splice,
            }),
            (k.extend = k.fn.extend =
              function () {
                var e,
                  t,
                  n,
                  r,
                  o,
                  i,
                  a = arguments[0] || {},
                  s = 1,
                  c = arguments.length,
                  l = !1;
                for (
                  'boolean' == typeof a &&
                    ((l = a), (a = arguments[s] || {}), s++),
                    'object' == typeof a || m(a) || (a = {}),
                    s === c && ((a = this), s--);
                  s < c;
                  s++
                )
                  if (null != (e = arguments[s]))
                    for (t in e)
                      (r = e[t]),
                        '__proto__' !== t &&
                          a !== r &&
                          (l &&
                          r &&
                          (k.isPlainObject(r) || (o = Array.isArray(r)))
                            ? ((n = a[t]),
                              (i =
                                o && !Array.isArray(n)
                                  ? []
                                  : o || k.isPlainObject(n)
                                  ? n
                                  : {}),
                              (o = !1),
                              (a[t] = k.extend(l, i, r)))
                            : void 0 !== r && (a[t] = r));
                return a;
              }),
            k.extend({
              expando: 'jQuery' + (C + Math.random()).replace(/\D/g, ''),
              isReady: !0,
              error: function (e) {
                throw new Error(e);
              },
              noop: function () {},
              isPlainObject: function (e) {
                var t, n;
                return !(
                  !e ||
                  '[object Object]' !== d.call(e) ||
                  ((t = a(e)) &&
                    ('function' !=
                      typeof (n = f.call(t, 'constructor') && t.constructor) ||
                      h.call(n) !== g))
                );
              },
              isEmptyObject: function (e) {
                var t;
                for (t in e) return !1;
                return !0;
              },
              globalEval: function (e, t, n) {
                w(e, { nonce: t && t.nonce }, n);
              },
              each: function (e, t) {
                var n,
                  r = 0;
                if (E(e))
                  for (
                    n = e.length;
                    r < n && !1 !== t.call(e[r], r, e[r]);
                    r++
                  );
                else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
                return e;
              },
              makeArray: function (e, t) {
                var n = t || [];
                return (
                  null != e &&
                    (E(Object(e))
                      ? k.merge(n, 'string' == typeof e ? [e] : e)
                      : l.call(n, e)),
                  n
                );
              },
              inArray: function (e, t, n) {
                return null == t ? -1 : u.call(t, e, n);
              },
              merge: function (e, t) {
                for (var n = +t.length, r = 0, o = e.length; r < n; r++)
                  e[o++] = t[r];
                return (e.length = o), e;
              },
              grep: function (e, t, n) {
                for (var r = [], o = 0, i = e.length, a = !n; o < i; o++)
                  !t(e[o], o) !== a && r.push(e[o]);
                return r;
              },
              map: function (e, t, n) {
                var r,
                  o,
                  i = 0,
                  a = [];
                if (E(e))
                  for (r = e.length; i < r; i++)
                    null != (o = t(e[i], i, n)) && a.push(o);
                else for (i in e) null != (o = t(e[i], i, n)) && a.push(o);
                return c(a);
              },
              guid: 1,
              support: v,
            }),
            'function' == typeof Symbol &&
              (k.fn[Symbol.iterator] = i[Symbol.iterator]),
            k.each(
              'Boolean Number String Function Array Date RegExp Object Error Symbol'.split(
                ' '
              ),
              function (e, t) {
                p['[object ' + t + ']'] = t.toLowerCase();
              }
            );
          var T = (function (e) {
            var t,
              n,
              r,
              o,
              i,
              a,
              s,
              c,
              l,
              u,
              p,
              d,
              f,
              h,
              g,
              v,
              m,
              y,
              b,
              x = 'sizzle' + 1 * new Date(),
              w = e.document,
              S = 0,
              C = 0,
              k = ce(),
              E = ce(),
              T = ce(),
              A = ce(),
              j = function (e, t) {
                return e === t && (p = !0), 0;
              },
              N = {}.hasOwnProperty,
              P = [],
              O = P.pop,
              L = P.push,
              M = P.push,
              D = P.slice,
              I = function (e, t) {
                for (var n = 0, r = e.length; n < r; n++)
                  if (e[n] === t) return n;
                return -1;
              },
              R =
                'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
              _ = '[\\x20\\t\\r\\n\\f]',
              q =
                '(?:\\\\[\\da-fA-F]{1,6}' +
                _ +
                '?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+',
              B =
                '\\[' +
                _ +
                '*(' +
                q +
                ')(?:' +
                _ +
                '*([*^$|!~]?=)' +
                _ +
                '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' +
                q +
                '))|)' +
                _ +
                '*\\]',
              F =
                ':(' +
                q +
                ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' +
                B +
                ')*)|.*)\\)|)',
              H = new RegExp(_ + '+', 'g'),
              W = new RegExp(
                '^' + _ + '+|((?:^|[^\\\\])(?:\\\\.)*)' + _ + '+$',
                'g'
              ),
              V = new RegExp('^' + _ + '*,' + _ + '*'),
              $ = new RegExp('^' + _ + '*([>+~]|' + _ + ')' + _ + '*'),
              z = new RegExp(_ + '|>'),
              U = new RegExp(F),
              Z = new RegExp('^' + q + '$'),
              X = {
                ID: new RegExp('^#(' + q + ')'),
                CLASS: new RegExp('^\\.(' + q + ')'),
                TAG: new RegExp('^(' + q + '|[*])'),
                ATTR: new RegExp('^' + B),
                PSEUDO: new RegExp('^' + F),
                CHILD: new RegExp(
                  '^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' +
                    _ +
                    '*(even|odd|(([+-]|)(\\d*)n|)' +
                    _ +
                    '*(?:([+-]|)' +
                    _ +
                    '*(\\d+)|))' +
                    _ +
                    '*\\)|)',
                  'i'
                ),
                bool: new RegExp('^(?:' + R + ')$', 'i'),
                needsContext: new RegExp(
                  '^' +
                    _ +
                    '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' +
                    _ +
                    '*((?:-\\d)?\\d*)' +
                    _ +
                    '*\\)|)(?=[^-]|$)',
                  'i'
                ),
              },
              G = /HTML$/i,
              J = /^(?:input|select|textarea|button)$/i,
              Y = /^h\d$/i,
              K = /^[^{]+\{\s*\[native \w/,
              Q = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
              ee = /[+~]/,
              te = new RegExp(
                '\\\\[\\da-fA-F]{1,6}' + _ + '?|\\\\([^\\r\\n\\f])',
                'g'
              ),
              ne = function (e, t) {
                var n = '0x' + e.slice(1) - 65536;
                return (
                  t ||
                  (n < 0
                    ? String.fromCharCode(n + 65536)
                    : String.fromCharCode(
                        (n >> 10) | 55296,
                        (1023 & n) | 56320
                      ))
                );
              },
              re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
              oe = function (e, t) {
                return t
                  ? '\0' === e
                    ? '�'
                    : e.slice(0, -1) +
                      '\\' +
                      e.charCodeAt(e.length - 1).toString(16) +
                      ' '
                  : '\\' + e;
              },
              ie = function () {
                d();
              },
              ae = xe(
                function (e) {
                  return (
                    !0 === e.disabled && 'fieldset' === e.nodeName.toLowerCase()
                  );
                },
                { dir: 'parentNode', next: 'legend' }
              );
            try {
              M.apply((P = D.call(w.childNodes)), w.childNodes),
                P[w.childNodes.length].nodeType;
            } catch (e) {
              M = {
                apply: P.length
                  ? function (e, t) {
                      L.apply(e, D.call(t));
                    }
                  : function (e, t) {
                      for (var n = e.length, r = 0; (e[n++] = t[r++]); );
                      e.length = n - 1;
                    },
              };
            }
            function se(e, t, r, o) {
              var i,
                s,
                l,
                u,
                p,
                h,
                m,
                y = t && t.ownerDocument,
                w = t ? t.nodeType : 9;
              if (
                ((r = r || []),
                'string' != typeof e || !e || (1 !== w && 9 !== w && 11 !== w))
              )
                return r;
              if (!o && (d(t), (t = t || f), g)) {
                if (11 !== w && (p = Q.exec(e)))
                  if ((i = p[1])) {
                    if (9 === w) {
                      if (!(l = t.getElementById(i))) return r;
                      if (l.id === i) return r.push(l), r;
                    } else if (
                      y &&
                      (l = y.getElementById(i)) &&
                      b(t, l) &&
                      l.id === i
                    )
                      return r.push(l), r;
                  } else {
                    if (p[2]) return M.apply(r, t.getElementsByTagName(e)), r;
                    if (
                      (i = p[3]) &&
                      n.getElementsByClassName &&
                      t.getElementsByClassName
                    )
                      return M.apply(r, t.getElementsByClassName(i)), r;
                  }
                if (
                  n.qsa &&
                  !A[e + ' '] &&
                  (!v || !v.test(e)) &&
                  (1 !== w || 'object' !== t.nodeName.toLowerCase())
                ) {
                  if (((m = e), (y = t), 1 === w && (z.test(e) || $.test(e)))) {
                    for (
                      ((y = (ee.test(e) && me(t.parentNode)) || t) === t &&
                        n.scope) ||
                        ((u = t.getAttribute('id'))
                          ? (u = u.replace(re, oe))
                          : t.setAttribute('id', (u = x))),
                        s = (h = a(e)).length;
                      s--;

                    )
                      h[s] = (u ? '#' + u : ':scope') + ' ' + be(h[s]);
                    m = h.join(',');
                  }
                  try {
                    return M.apply(r, y.querySelectorAll(m)), r;
                  } catch (t) {
                    A(e, !0);
                  } finally {
                    u === x && t.removeAttribute('id');
                  }
                }
              }
              return c(e.replace(W, '$1'), t, r, o);
            }
            function ce() {
              var e = [];
              return function t(n, o) {
                return (
                  e.push(n + ' ') > r.cacheLength && delete t[e.shift()],
                  (t[n + ' '] = o)
                );
              };
            }
            function le(e) {
              return (e[x] = !0), e;
            }
            function ue(e) {
              var t = f.createElement('fieldset');
              try {
                return !!e(t);
              } catch (e) {
                return !1;
              } finally {
                t.parentNode && t.parentNode.removeChild(t), (t = null);
              }
            }
            function pe(e, t) {
              for (var n = e.split('|'), o = n.length; o--; )
                r.attrHandle[n[o]] = t;
            }
            function de(e, t) {
              var n = t && e,
                r =
                  n &&
                  1 === e.nodeType &&
                  1 === t.nodeType &&
                  e.sourceIndex - t.sourceIndex;
              if (r) return r;
              if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
              return e ? 1 : -1;
            }
            function fe(e) {
              return function (t) {
                return 'input' === t.nodeName.toLowerCase() && t.type === e;
              };
            }
            function he(e) {
              return function (t) {
                var n = t.nodeName.toLowerCase();
                return ('input' === n || 'button' === n) && t.type === e;
              };
            }
            function ge(e) {
              return function (t) {
                return 'form' in t
                  ? t.parentNode && !1 === t.disabled
                    ? 'label' in t
                      ? 'label' in t.parentNode
                        ? t.parentNode.disabled === e
                        : t.disabled === e
                      : t.isDisabled === e ||
                        (t.isDisabled !== !e && ae(t) === e)
                    : t.disabled === e
                  : 'label' in t && t.disabled === e;
              };
            }
            function ve(e) {
              return le(function (t) {
                return (
                  (t = +t),
                  le(function (n, r) {
                    for (var o, i = e([], n.length, t), a = i.length; a--; )
                      n[(o = i[a])] && (n[o] = !(r[o] = n[o]));
                  })
                );
              });
            }
            function me(e) {
              return e && void 0 !== e.getElementsByTagName && e;
            }
            for (t in ((n = se.support = {}),
            (i = se.isXML =
              function (e) {
                var t = e && e.namespaceURI,
                  n = e && (e.ownerDocument || e).documentElement;
                return !G.test(t || (n && n.nodeName) || 'HTML');
              }),
            (d = se.setDocument =
              function (e) {
                var t,
                  o,
                  a = e ? e.ownerDocument || e : w;
                return a != f && 9 === a.nodeType && a.documentElement
                  ? ((h = (f = a).documentElement),
                    (g = !i(f)),
                    w != f &&
                      (o = f.defaultView) &&
                      o.top !== o &&
                      (o.addEventListener
                        ? o.addEventListener('unload', ie, !1)
                        : o.attachEvent && o.attachEvent('onunload', ie)),
                    (n.scope = ue(function (e) {
                      return (
                        h.appendChild(e).appendChild(f.createElement('div')),
                        void 0 !== e.querySelectorAll &&
                          !e.querySelectorAll(':scope fieldset div').length
                      );
                    })),
                    (n.cssHas = ue(function () {
                      try {
                        return f.querySelector(':has(*,:jqfake)'), !1;
                      } catch (e) {
                        return !0;
                      }
                    })),
                    (n.attributes = ue(function (e) {
                      return (e.className = 'i'), !e.getAttribute('className');
                    })),
                    (n.getElementsByTagName = ue(function (e) {
                      return (
                        e.appendChild(f.createComment('')),
                        !e.getElementsByTagName('*').length
                      );
                    })),
                    (n.getElementsByClassName = K.test(
                      f.getElementsByClassName
                    )),
                    (n.getById = ue(function (e) {
                      return (
                        (h.appendChild(e).id = x),
                        !f.getElementsByName || !f.getElementsByName(x).length
                      );
                    })),
                    n.getById
                      ? ((r.filter.ID = function (e) {
                          var t = e.replace(te, ne);
                          return function (e) {
                            return e.getAttribute('id') === t;
                          };
                        }),
                        (r.find.ID = function (e, t) {
                          if (void 0 !== t.getElementById && g) {
                            var n = t.getElementById(e);
                            return n ? [n] : [];
                          }
                        }))
                      : ((r.filter.ID = function (e) {
                          var t = e.replace(te, ne);
                          return function (e) {
                            var n =
                              void 0 !== e.getAttributeNode &&
                              e.getAttributeNode('id');
                            return n && n.value === t;
                          };
                        }),
                        (r.find.ID = function (e, t) {
                          if (void 0 !== t.getElementById && g) {
                            var n,
                              r,
                              o,
                              i = t.getElementById(e);
                            if (i) {
                              if (
                                (n = i.getAttributeNode('id')) &&
                                n.value === e
                              )
                                return [i];
                              for (
                                o = t.getElementsByName(e), r = 0;
                                (i = o[r++]);

                              )
                                if (
                                  (n = i.getAttributeNode('id')) &&
                                  n.value === e
                                )
                                  return [i];
                            }
                            return [];
                          }
                        })),
                    (r.find.TAG = n.getElementsByTagName
                      ? function (e, t) {
                          return void 0 !== t.getElementsByTagName
                            ? t.getElementsByTagName(e)
                            : n.qsa
                            ? t.querySelectorAll(e)
                            : void 0;
                        }
                      : function (e, t) {
                          var n,
                            r = [],
                            o = 0,
                            i = t.getElementsByTagName(e);
                          if ('*' === e) {
                            for (; (n = i[o++]); )
                              1 === n.nodeType && r.push(n);
                            return r;
                          }
                          return i;
                        }),
                    (r.find.CLASS =
                      n.getElementsByClassName &&
                      function (e, t) {
                        if (void 0 !== t.getElementsByClassName && g)
                          return t.getElementsByClassName(e);
                      }),
                    (m = []),
                    (v = []),
                    (n.qsa = K.test(f.querySelectorAll)) &&
                      (ue(function (e) {
                        var t;
                        (h.appendChild(e).innerHTML =
                          "<a id='" +
                          x +
                          "'></a><select id='" +
                          x +
                          "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                          e.querySelectorAll("[msallowcapture^='']").length &&
                            v.push('[*^$]=' + _ + '*(?:\'\'|"")'),
                          e.querySelectorAll('[selected]').length ||
                            v.push('\\[' + _ + '*(?:value|' + R + ')'),
                          e.querySelectorAll('[id~=' + x + '-]').length ||
                            v.push('~='),
                          (t = f.createElement('input')).setAttribute(
                            'name',
                            ''
                          ),
                          e.appendChild(t),
                          e.querySelectorAll("[name='']").length ||
                            v.push(
                              '\\[' +
                                _ +
                                '*name' +
                                _ +
                                '*=' +
                                _ +
                                '*(?:\'\'|"")'
                            ),
                          e.querySelectorAll(':checked').length ||
                            v.push(':checked'),
                          e.querySelectorAll('a#' + x + '+*').length ||
                            v.push('.#.+[+~]'),
                          e.querySelectorAll('\\\f'),
                          v.push('[\\r\\n\\f]');
                      }),
                      ue(function (e) {
                        e.innerHTML =
                          "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                        var t = f.createElement('input');
                        t.setAttribute('type', 'hidden'),
                          e.appendChild(t).setAttribute('name', 'D'),
                          e.querySelectorAll('[name=d]').length &&
                            v.push('name' + _ + '*[*^$|!~]?='),
                          2 !== e.querySelectorAll(':enabled').length &&
                            v.push(':enabled', ':disabled'),
                          (h.appendChild(e).disabled = !0),
                          2 !== e.querySelectorAll(':disabled').length &&
                            v.push(':enabled', ':disabled'),
                          e.querySelectorAll('*,:x'),
                          v.push(',.*:');
                      })),
                    (n.matchesSelector = K.test(
                      (y =
                        h.matches ||
                        h.webkitMatchesSelector ||
                        h.mozMatchesSelector ||
                        h.oMatchesSelector ||
                        h.msMatchesSelector)
                    )) &&
                      ue(function (e) {
                        (n.disconnectedMatch = y.call(e, '*')),
                          y.call(e, "[s!='']:x"),
                          m.push('!=', F);
                      }),
                    n.cssHas || v.push(':has'),
                    (v = v.length && new RegExp(v.join('|'))),
                    (m = m.length && new RegExp(m.join('|'))),
                    (t = K.test(h.compareDocumentPosition)),
                    (b =
                      t || K.test(h.contains)
                        ? function (e, t) {
                            var n =
                                (9 === e.nodeType && e.documentElement) || e,
                              r = t && t.parentNode;
                            return (
                              e === r ||
                              !(
                                !r ||
                                1 !== r.nodeType ||
                                !(n.contains
                                  ? n.contains(r)
                                  : e.compareDocumentPosition &&
                                    16 & e.compareDocumentPosition(r))
                              )
                            );
                          }
                        : function (e, t) {
                            if (t)
                              for (; (t = t.parentNode); )
                                if (t === e) return !0;
                            return !1;
                          }),
                    (j = t
                      ? function (e, t) {
                          if (e === t) return (p = !0), 0;
                          var r =
                            !e.compareDocumentPosition -
                            !t.compareDocumentPosition;
                          return (
                            r ||
                            (1 &
                              (r =
                                (e.ownerDocument || e) == (t.ownerDocument || t)
                                  ? e.compareDocumentPosition(t)
                                  : 1) ||
                            (!n.sortDetached &&
                              t.compareDocumentPosition(e) === r)
                              ? e == f || (e.ownerDocument == w && b(w, e))
                                ? -1
                                : t == f || (t.ownerDocument == w && b(w, t))
                                ? 1
                                : u
                                ? I(u, e) - I(u, t)
                                : 0
                              : 4 & r
                              ? -1
                              : 1)
                          );
                        }
                      : function (e, t) {
                          if (e === t) return (p = !0), 0;
                          var n,
                            r = 0,
                            o = e.parentNode,
                            i = t.parentNode,
                            a = [e],
                            s = [t];
                          if (!o || !i)
                            return e == f
                              ? -1
                              : t == f
                              ? 1
                              : o
                              ? -1
                              : i
                              ? 1
                              : u
                              ? I(u, e) - I(u, t)
                              : 0;
                          if (o === i) return de(e, t);
                          for (n = e; (n = n.parentNode); ) a.unshift(n);
                          for (n = t; (n = n.parentNode); ) s.unshift(n);
                          for (; a[r] === s[r]; ) r++;
                          return r
                            ? de(a[r], s[r])
                            : a[r] == w
                            ? -1
                            : s[r] == w
                            ? 1
                            : 0;
                        }),
                    f)
                  : f;
              }),
            (se.matches = function (e, t) {
              return se(e, null, null, t);
            }),
            (se.matchesSelector = function (e, t) {
              if (
                (d(e),
                n.matchesSelector &&
                  g &&
                  !A[t + ' '] &&
                  (!m || !m.test(t)) &&
                  (!v || !v.test(t)))
              )
                try {
                  var r = y.call(e, t);
                  if (
                    r ||
                    n.disconnectedMatch ||
                    (e.document && 11 !== e.document.nodeType)
                  )
                    return r;
                } catch (e) {
                  A(t, !0);
                }
              return se(t, f, null, [e]).length > 0;
            }),
            (se.contains = function (e, t) {
              return (e.ownerDocument || e) != f && d(e), b(e, t);
            }),
            (se.attr = function (e, t) {
              (e.ownerDocument || e) != f && d(e);
              var o = r.attrHandle[t.toLowerCase()],
                i =
                  o && N.call(r.attrHandle, t.toLowerCase())
                    ? o(e, t, !g)
                    : void 0;
              return void 0 !== i
                ? i
                : n.attributes || !g
                ? e.getAttribute(t)
                : (i = e.getAttributeNode(t)) && i.specified
                ? i.value
                : null;
            }),
            (se.escape = function (e) {
              return (e + '').replace(re, oe);
            }),
            (se.error = function (e) {
              throw new Error('Syntax error, unrecognized expression: ' + e);
            }),
            (se.uniqueSort = function (e) {
              var t,
                r = [],
                o = 0,
                i = 0;
              if (
                ((p = !n.detectDuplicates),
                (u = !n.sortStable && e.slice(0)),
                e.sort(j),
                p)
              ) {
                for (; (t = e[i++]); ) t === e[i] && (o = r.push(i));
                for (; o--; ) e.splice(r[o], 1);
              }
              return (u = null), e;
            }),
            (o = se.getText =
              function (e) {
                var t,
                  n = '',
                  r = 0,
                  i = e.nodeType;
                if (i) {
                  if (1 === i || 9 === i || 11 === i) {
                    if ('string' == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += o(e);
                  } else if (3 === i || 4 === i) return e.nodeValue;
                } else for (; (t = e[r++]); ) n += o(t);
                return n;
              }),
            (r = se.selectors =
              {
                cacheLength: 50,
                createPseudo: le,
                match: X,
                attrHandle: {},
                find: {},
                relative: {
                  '>': { dir: 'parentNode', first: !0 },
                  ' ': { dir: 'parentNode' },
                  '+': { dir: 'previousSibling', first: !0 },
                  '~': { dir: 'previousSibling' },
                },
                preFilter: {
                  ATTR: function (e) {
                    return (
                      (e[1] = e[1].replace(te, ne)),
                      (e[3] = (e[3] || e[4] || e[5] || '').replace(te, ne)),
                      '~=' === e[2] && (e[3] = ' ' + e[3] + ' '),
                      e.slice(0, 4)
                    );
                  },
                  CHILD: function (e) {
                    return (
                      (e[1] = e[1].toLowerCase()),
                      'nth' === e[1].slice(0, 3)
                        ? (e[3] || se.error(e[0]),
                          (e[4] = +(e[4]
                            ? e[5] + (e[6] || 1)
                            : 2 * ('even' === e[3] || 'odd' === e[3]))),
                          (e[5] = +(e[7] + e[8] || 'odd' === e[3])))
                        : e[3] && se.error(e[0]),
                      e
                    );
                  },
                  PSEUDO: function (e) {
                    var t,
                      n = !e[6] && e[2];
                    return X.CHILD.test(e[0])
                      ? null
                      : (e[3]
                          ? (e[2] = e[4] || e[5] || '')
                          : n &&
                            U.test(n) &&
                            (t = a(n, !0)) &&
                            (t = n.indexOf(')', n.length - t) - n.length) &&
                            ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                        e.slice(0, 3));
                  },
                },
                filter: {
                  TAG: function (e) {
                    var t = e.replace(te, ne).toLowerCase();
                    return '*' === e
                      ? function () {
                          return !0;
                        }
                      : function (e) {
                          return e.nodeName && e.nodeName.toLowerCase() === t;
                        };
                  },
                  CLASS: function (e) {
                    var t = k[e + ' '];
                    return (
                      t ||
                      ((t = new RegExp(
                        '(^|' + _ + ')' + e + '(' + _ + '|$)'
                      )) &&
                        k(e, function (e) {
                          return t.test(
                            ('string' == typeof e.className && e.className) ||
                              (void 0 !== e.getAttribute &&
                                e.getAttribute('class')) ||
                              ''
                          );
                        }))
                    );
                  },
                  ATTR: function (e, t, n) {
                    return function (r) {
                      var o = se.attr(r, e);
                      return null == o
                        ? '!=' === t
                        : !t ||
                            ((o += ''),
                            '=' === t
                              ? o === n
                              : '!=' === t
                              ? o !== n
                              : '^=' === t
                              ? n && 0 === o.indexOf(n)
                              : '*=' === t
                              ? n && o.indexOf(n) > -1
                              : '$=' === t
                              ? n && o.slice(-n.length) === n
                              : '~=' === t
                              ? (' ' + o.replace(H, ' ') + ' ').indexOf(n) > -1
                              : '|=' === t &&
                                (o === n ||
                                  o.slice(0, n.length + 1) === n + '-'));
                    };
                  },
                  CHILD: function (e, t, n, r, o) {
                    var i = 'nth' !== e.slice(0, 3),
                      a = 'last' !== e.slice(-4),
                      s = 'of-type' === t;
                    return 1 === r && 0 === o
                      ? function (e) {
                          return !!e.parentNode;
                        }
                      : function (t, n, c) {
                          var l,
                            u,
                            p,
                            d,
                            f,
                            h,
                            g = i !== a ? 'nextSibling' : 'previousSibling',
                            v = t.parentNode,
                            m = s && t.nodeName.toLowerCase(),
                            y = !c && !s,
                            b = !1;
                          if (v) {
                            if (i) {
                              for (; g; ) {
                                for (d = t; (d = d[g]); )
                                  if (
                                    s
                                      ? d.nodeName.toLowerCase() === m
                                      : 1 === d.nodeType
                                  )
                                    return !1;
                                h = g = 'only' === e && !h && 'nextSibling';
                              }
                              return !0;
                            }
                            if (
                              ((h = [a ? v.firstChild : v.lastChild]), a && y)
                            ) {
                              for (
                                b =
                                  (f =
                                    (l =
                                      (u =
                                        (p = (d = v)[x] || (d[x] = {}))[
                                          d.uniqueID
                                        ] || (p[d.uniqueID] = {}))[e] ||
                                      [])[0] === S && l[1]) && l[2],
                                  d = f && v.childNodes[f];
                                (d =
                                  (++f && d && d[g]) || (b = f = 0) || h.pop());

                              )
                                if (1 === d.nodeType && ++b && d === t) {
                                  u[e] = [S, f, b];
                                  break;
                                }
                            } else if (
                              (y &&
                                (b = f =
                                  (l =
                                    (u =
                                      (p = (d = t)[x] || (d[x] = {}))[
                                        d.uniqueID
                                      ] || (p[d.uniqueID] = {}))[e] ||
                                    [])[0] === S && l[1]),
                              !1 === b)
                            )
                              for (
                                ;
                                (d =
                                  (++f && d && d[g]) ||
                                  (b = f = 0) ||
                                  h.pop()) &&
                                ((s
                                  ? d.nodeName.toLowerCase() !== m
                                  : 1 !== d.nodeType) ||
                                  !++b ||
                                  (y &&
                                    ((u =
                                      (p = d[x] || (d[x] = {}))[d.uniqueID] ||
                                      (p[d.uniqueID] = {}))[e] = [S, b]),
                                  d !== t));

                              );
                            return (b -= o) === r || (b % r == 0 && b / r >= 0);
                          }
                        };
                  },
                  PSEUDO: function (e, t) {
                    var n,
                      o =
                        r.pseudos[e] ||
                        r.setFilters[e.toLowerCase()] ||
                        se.error('unsupported pseudo: ' + e);
                    return o[x]
                      ? o(t)
                      : o.length > 1
                      ? ((n = [e, e, '', t]),
                        r.setFilters.hasOwnProperty(e.toLowerCase())
                          ? le(function (e, n) {
                              for (var r, i = o(e, t), a = i.length; a--; )
                                e[(r = I(e, i[a]))] = !(n[r] = i[a]);
                            })
                          : function (e) {
                              return o(e, 0, n);
                            })
                      : o;
                  },
                },
                pseudos: {
                  not: le(function (e) {
                    var t = [],
                      n = [],
                      r = s(e.replace(W, '$1'));
                    return r[x]
                      ? le(function (e, t, n, o) {
                          for (
                            var i, a = r(e, null, o, []), s = e.length;
                            s--;

                          )
                            (i = a[s]) && (e[s] = !(t[s] = i));
                        })
                      : function (e, o, i) {
                          return (
                            (t[0] = e),
                            r(t, null, i, n),
                            (t[0] = null),
                            !n.pop()
                          );
                        };
                  }),
                  has: le(function (e) {
                    return function (t) {
                      return se(e, t).length > 0;
                    };
                  }),
                  contains: le(function (e) {
                    return (
                      (e = e.replace(te, ne)),
                      function (t) {
                        return (t.textContent || o(t)).indexOf(e) > -1;
                      }
                    );
                  }),
                  lang: le(function (e) {
                    return (
                      Z.test(e || '') || se.error('unsupported lang: ' + e),
                      (e = e.replace(te, ne).toLowerCase()),
                      function (t) {
                        var n;
                        do {
                          if (
                            (n = g
                              ? t.lang
                              : t.getAttribute('xml:lang') ||
                                t.getAttribute('lang'))
                          )
                            return (
                              (n = n.toLowerCase()) === e ||
                              0 === n.indexOf(e + '-')
                            );
                        } while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1;
                      }
                    );
                  }),
                  target: function (t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id;
                  },
                  root: function (e) {
                    return e === h;
                  },
                  focus: function (e) {
                    return (
                      e === f.activeElement &&
                      (!f.hasFocus || f.hasFocus()) &&
                      !!(e.type || e.href || ~e.tabIndex)
                    );
                  },
                  enabled: ge(!1),
                  disabled: ge(!0),
                  checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return (
                      ('input' === t && !!e.checked) ||
                      ('option' === t && !!e.selected)
                    );
                  },
                  selected: function (e) {
                    return (
                      e.parentNode && e.parentNode.selectedIndex,
                      !0 === e.selected
                    );
                  },
                  empty: function (e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                      if (e.nodeType < 6) return !1;
                    return !0;
                  },
                  parent: function (e) {
                    return !r.pseudos.empty(e);
                  },
                  header: function (e) {
                    return Y.test(e.nodeName);
                  },
                  input: function (e) {
                    return J.test(e.nodeName);
                  },
                  button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return (
                      ('input' === t && 'button' === e.type) || 'button' === t
                    );
                  },
                  text: function (e) {
                    var t;
                    return (
                      'input' === e.nodeName.toLowerCase() &&
                      'text' === e.type &&
                      (null == (t = e.getAttribute('type')) ||
                        'text' === t.toLowerCase())
                    );
                  },
                  first: ve(function () {
                    return [0];
                  }),
                  last: ve(function (e, t) {
                    return [t - 1];
                  }),
                  eq: ve(function (e, t, n) {
                    return [n < 0 ? n + t : n];
                  }),
                  even: ve(function (e, t) {
                    for (var n = 0; n < t; n += 2) e.push(n);
                    return e;
                  }),
                  odd: ve(function (e, t) {
                    for (var n = 1; n < t; n += 2) e.push(n);
                    return e;
                  }),
                  lt: ve(function (e, t, n) {
                    for (var r = n < 0 ? n + t : n > t ? t : n; --r >= 0; )
                      e.push(r);
                    return e;
                  }),
                  gt: ve(function (e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
                    return e;
                  }),
                },
              }),
            (r.pseudos.nth = r.pseudos.eq),
            { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
              r.pseudos[t] = fe(t);
            for (t in { submit: !0, reset: !0 }) r.pseudos[t] = he(t);
            function ye() {}
            function be(e) {
              for (var t = 0, n = e.length, r = ''; t < n; t++) r += e[t].value;
              return r;
            }
            function xe(e, t, n) {
              var r = t.dir,
                o = t.next,
                i = o || r,
                a = n && 'parentNode' === i,
                s = C++;
              return t.first
                ? function (t, n, o) {
                    for (; (t = t[r]); )
                      if (1 === t.nodeType || a) return e(t, n, o);
                    return !1;
                  }
                : function (t, n, c) {
                    var l,
                      u,
                      p,
                      d = [S, s];
                    if (c) {
                      for (; (t = t[r]); )
                        if ((1 === t.nodeType || a) && e(t, n, c)) return !0;
                    } else
                      for (; (t = t[r]); )
                        if (1 === t.nodeType || a)
                          if (
                            ((u =
                              (p = t[x] || (t[x] = {}))[t.uniqueID] ||
                              (p[t.uniqueID] = {})),
                            o && o === t.nodeName.toLowerCase())
                          )
                            t = t[r] || t;
                          else {
                            if ((l = u[i]) && l[0] === S && l[1] === s)
                              return (d[2] = l[2]);
                            if (((u[i] = d), (d[2] = e(t, n, c)))) return !0;
                          }
                    return !1;
                  };
            }
            function we(e) {
              return e.length > 1
                ? function (t, n, r) {
                    for (var o = e.length; o--; ) if (!e[o](t, n, r)) return !1;
                    return !0;
                  }
                : e[0];
            }
            function Se(e, t, n, r, o) {
              for (
                var i, a = [], s = 0, c = e.length, l = null != t;
                s < c;
                s++
              )
                (i = e[s]) &&
                  ((n && !n(i, r, o)) || (a.push(i), l && t.push(s)));
              return a;
            }
            function Ce(e, t, n, r, o, i) {
              return (
                r && !r[x] && (r = Ce(r)),
                o && !o[x] && (o = Ce(o, i)),
                le(function (i, a, s, c) {
                  var l,
                    u,
                    p,
                    d = [],
                    f = [],
                    h = a.length,
                    g =
                      i ||
                      (function (e, t, n) {
                        for (var r = 0, o = t.length; r < o; r++)
                          se(e, t[r], n);
                        return n;
                      })(t || '*', s.nodeType ? [s] : s, []),
                    v = !e || (!i && t) ? g : Se(g, d, e, s, c),
                    m = n ? (o || (i ? e : h || r) ? [] : a) : v;
                  if ((n && n(v, m, s, c), r))
                    for (l = Se(m, f), r(l, [], s, c), u = l.length; u--; )
                      (p = l[u]) && (m[f[u]] = !(v[f[u]] = p));
                  if (i) {
                    if (o || e) {
                      if (o) {
                        for (l = [], u = m.length; u--; )
                          (p = m[u]) && l.push((v[u] = p));
                        o(null, (m = []), l, c);
                      }
                      for (u = m.length; u--; )
                        (p = m[u]) &&
                          (l = o ? I(i, p) : d[u]) > -1 &&
                          (i[l] = !(a[l] = p));
                    }
                  } else (m = Se(m === a ? m.splice(h, m.length) : m)), o ? o(null, a, m, c) : M.apply(a, m);
                })
              );
            }
            function ke(e) {
              for (
                var t,
                  n,
                  o,
                  i = e.length,
                  a = r.relative[e[0].type],
                  s = a || r.relative[' '],
                  c = a ? 1 : 0,
                  u = xe(
                    function (e) {
                      return e === t;
                    },
                    s,
                    !0
                  ),
                  p = xe(
                    function (e) {
                      return I(t, e) > -1;
                    },
                    s,
                    !0
                  ),
                  d = [
                    function (e, n, r) {
                      var o =
                        (!a && (r || n !== l)) ||
                        ((t = n).nodeType ? u(e, n, r) : p(e, n, r));
                      return (t = null), o;
                    },
                  ];
                c < i;
                c++
              )
                if ((n = r.relative[e[c].type])) d = [xe(we(d), n)];
                else {
                  if ((n = r.filter[e[c].type].apply(null, e[c].matches))[x]) {
                    for (o = ++c; o < i && !r.relative[e[o].type]; o++);
                    return Ce(
                      c > 1 && we(d),
                      c > 1 &&
                        be(
                          e
                            .slice(0, c - 1)
                            .concat({ value: ' ' === e[c - 2].type ? '*' : '' })
                        ).replace(W, '$1'),
                      n,
                      c < o && ke(e.slice(c, o)),
                      o < i && ke((e = e.slice(o))),
                      o < i && be(e)
                    );
                  }
                  d.push(n);
                }
              return we(d);
            }
            return (
              (ye.prototype = r.filters = r.pseudos),
              (r.setFilters = new ye()),
              (a = se.tokenize =
                function (e, t) {
                  var n,
                    o,
                    i,
                    a,
                    s,
                    c,
                    l,
                    u = E[e + ' '];
                  if (u) return t ? 0 : u.slice(0);
                  for (s = e, c = [], l = r.preFilter; s; ) {
                    for (a in ((n && !(o = V.exec(s))) ||
                      (o && (s = s.slice(o[0].length) || s), c.push((i = []))),
                    (n = !1),
                    (o = $.exec(s)) &&
                      ((n = o.shift()),
                      i.push({ value: n, type: o[0].replace(W, ' ') }),
                      (s = s.slice(n.length))),
                    r.filter))
                      !(o = X[a].exec(s)) ||
                        (l[a] && !(o = l[a](o))) ||
                        ((n = o.shift()),
                        i.push({ value: n, type: a, matches: o }),
                        (s = s.slice(n.length)));
                    if (!n) break;
                  }
                  return t ? s.length : s ? se.error(e) : E(e, c).slice(0);
                }),
              (s = se.compile =
                function (e, t) {
                  var n,
                    o = [],
                    i = [],
                    s = T[e + ' '];
                  if (!s) {
                    for (t || (t = a(e)), n = t.length; n--; )
                      (s = ke(t[n]))[x] ? o.push(s) : i.push(s);
                    (s = T(
                      e,
                      (function (e, t) {
                        var n = t.length > 0,
                          o = e.length > 0,
                          i = function (i, a, s, c, u) {
                            var p,
                              h,
                              v,
                              m = 0,
                              y = '0',
                              b = i && [],
                              x = [],
                              w = l,
                              C = i || (o && r.find.TAG('*', u)),
                              k = (S += null == w ? 1 : Math.random() || 0.1),
                              E = C.length;
                            for (
                              u && (l = a == f || a || u);
                              y !== E && null != (p = C[y]);
                              y++
                            ) {
                              if (o && p) {
                                for (
                                  h = 0,
                                    a ||
                                      p.ownerDocument == f ||
                                      (d(p), (s = !g));
                                  (v = e[h++]);

                                )
                                  if (v(p, a || f, s)) {
                                    c.push(p);
                                    break;
                                  }
                                u && (S = k);
                              }
                              n && ((p = !v && p) && m--, i && b.push(p));
                            }
                            if (((m += y), n && y !== m)) {
                              for (h = 0; (v = t[h++]); ) v(b, x, a, s);
                              if (i) {
                                if (m > 0)
                                  for (; y--; )
                                    b[y] || x[y] || (x[y] = O.call(c));
                                x = Se(x);
                              }
                              M.apply(c, x),
                                u &&
                                  !i &&
                                  x.length > 0 &&
                                  m + t.length > 1 &&
                                  se.uniqueSort(c);
                            }
                            return u && ((S = k), (l = w)), b;
                          };
                        return n ? le(i) : i;
                      })(i, o)
                    )),
                      (s.selector = e);
                  }
                  return s;
                }),
              (c = se.select =
                function (e, t, n, o) {
                  var i,
                    c,
                    l,
                    u,
                    p,
                    d = 'function' == typeof e && e,
                    f = !o && a((e = d.selector || e));
                  if (((n = n || []), 1 === f.length)) {
                    if (
                      (c = f[0] = f[0].slice(0)).length > 2 &&
                      'ID' === (l = c[0]).type &&
                      9 === t.nodeType &&
                      g &&
                      r.relative[c[1].type]
                    ) {
                      if (
                        !(t = (r.find.ID(l.matches[0].replace(te, ne), t) ||
                          [])[0])
                      )
                        return n;
                      d && (t = t.parentNode),
                        (e = e.slice(c.shift().value.length));
                    }
                    for (
                      i = X.needsContext.test(e) ? 0 : c.length;
                      i-- && ((l = c[i]), !r.relative[(u = l.type)]);

                    )
                      if (
                        (p = r.find[u]) &&
                        (o = p(
                          l.matches[0].replace(te, ne),
                          (ee.test(c[0].type) && me(t.parentNode)) || t
                        ))
                      ) {
                        if ((c.splice(i, 1), !(e = o.length && be(c))))
                          return M.apply(n, o), n;
                        break;
                      }
                  }
                  return (
                    (d || s(e, f))(
                      o,
                      t,
                      !g,
                      n,
                      !t || (ee.test(e) && me(t.parentNode)) || t
                    ),
                    n
                  );
                }),
              (n.sortStable = x.split('').sort(j).join('') === x),
              (n.detectDuplicates = !!p),
              d(),
              (n.sortDetached = ue(function (e) {
                return (
                  1 & e.compareDocumentPosition(f.createElement('fieldset'))
                );
              })),
              ue(function (e) {
                return (
                  (e.innerHTML = "<a href='#'></a>"),
                  '#' === e.firstChild.getAttribute('href')
                );
              }) ||
                pe('type|href|height|width', function (e, t, n) {
                  if (!n)
                    return e.getAttribute(
                      t,
                      'type' === t.toLowerCase() ? 1 : 2
                    );
                }),
              (n.attributes &&
                ue(function (e) {
                  return (
                    (e.innerHTML = '<input/>'),
                    e.firstChild.setAttribute('value', ''),
                    '' === e.firstChild.getAttribute('value')
                  );
                })) ||
                pe('value', function (e, t, n) {
                  if (!n && 'input' === e.nodeName.toLowerCase())
                    return e.defaultValue;
                }),
              ue(function (e) {
                return null == e.getAttribute('disabled');
              }) ||
                pe(R, function (e, t, n) {
                  var r;
                  if (!n)
                    return !0 === e[t]
                      ? t.toLowerCase()
                      : (r = e.getAttributeNode(t)) && r.specified
                      ? r.value
                      : null;
                }),
              se
            );
          })(r);
          (k.find = T),
            (k.expr = T.selectors),
            (k.expr[':'] = k.expr.pseudos),
            (k.uniqueSort = k.unique = T.uniqueSort),
            (k.text = T.getText),
            (k.isXMLDoc = T.isXML),
            (k.contains = T.contains),
            (k.escapeSelector = T.escape);
          var A = function (e, t, n) {
              for (
                var r = [], o = void 0 !== n;
                (e = e[t]) && 9 !== e.nodeType;

              )
                if (1 === e.nodeType) {
                  if (o && k(e).is(n)) break;
                  r.push(e);
                }
              return r;
            },
            j = function (e, t) {
              for (var n = []; e; e = e.nextSibling)
                1 === e.nodeType && e !== t && n.push(e);
              return n;
            },
            N = k.expr.match.needsContext;
          function P(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
          }
          var O =
            /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
          function L(e, t, n) {
            return m(t)
              ? k.grep(e, function (e, r) {
                  return !!t.call(e, r, e) !== n;
                })
              : t.nodeType
              ? k.grep(e, function (e) {
                  return (e === t) !== n;
                })
              : 'string' != typeof t
              ? k.grep(e, function (e) {
                  return u.call(t, e) > -1 !== n;
                })
              : k.filter(t, e, n);
          }
          (k.filter = function (e, t, n) {
            var r = t[0];
            return (
              n && (e = ':not(' + e + ')'),
              1 === t.length && 1 === r.nodeType
                ? k.find.matchesSelector(r, e)
                  ? [r]
                  : []
                : k.find.matches(
                    e,
                    k.grep(t, function (e) {
                      return 1 === e.nodeType;
                    })
                  )
            );
          }),
            k.fn.extend({
              find: function (e) {
                var t,
                  n,
                  r = this.length,
                  o = this;
                if ('string' != typeof e)
                  return this.pushStack(
                    k(e).filter(function () {
                      for (t = 0; t < r; t++)
                        if (k.contains(o[t], this)) return !0;
                    })
                  );
                for (n = this.pushStack([]), t = 0; t < r; t++)
                  k.find(e, o[t], n);
                return r > 1 ? k.uniqueSort(n) : n;
              },
              filter: function (e) {
                return this.pushStack(L(this, e || [], !1));
              },
              not: function (e) {
                return this.pushStack(L(this, e || [], !0));
              },
              is: function (e) {
                return !!L(
                  this,
                  'string' == typeof e && N.test(e) ? k(e) : e || [],
                  !1
                ).length;
              },
            });
          var M,
            D = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
          ((k.fn.init = function (e, t, n) {
            var r, o;
            if (!e) return this;
            if (((n = n || M), 'string' == typeof e)) {
              if (
                !(r =
                  '<' === e[0] && '>' === e[e.length - 1] && e.length >= 3
                    ? [null, e, null]
                    : D.exec(e)) ||
                (!r[1] && t)
              )
                return !t || t.jquery
                  ? (t || n).find(e)
                  : this.constructor(t).find(e);
              if (r[1]) {
                if (
                  ((t = t instanceof k ? t[0] : t),
                  k.merge(
                    this,
                    k.parseHTML(
                      r[1],
                      t && t.nodeType ? t.ownerDocument || t : b,
                      !0
                    )
                  ),
                  O.test(r[1]) && k.isPlainObject(t))
                )
                  for (r in t) m(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                return this;
              }
              return (
                (o = b.getElementById(r[2])) &&
                  ((this[0] = o), (this.length = 1)),
                this
              );
            }
            return e.nodeType
              ? ((this[0] = e), (this.length = 1), this)
              : m(e)
              ? void 0 !== n.ready
                ? n.ready(e)
                : e(k)
              : k.makeArray(e, this);
          }).prototype = k.fn),
            (M = k(b));
          var I = /^(?:parents|prev(?:Until|All))/,
            R = { children: !0, contents: !0, next: !0, prev: !0 };
          function _(e, t) {
            for (; (e = e[t]) && 1 !== e.nodeType; );
            return e;
          }
          k.fn.extend({
            has: function (e) {
              var t = k(e, this),
                n = t.length;
              return this.filter(function () {
                for (var e = 0; e < n; e++)
                  if (k.contains(this, t[e])) return !0;
              });
            },
            closest: function (e, t) {
              var n,
                r = 0,
                o = this.length,
                i = [],
                a = 'string' != typeof e && k(e);
              if (!N.test(e))
                for (; r < o; r++)
                  for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (
                      n.nodeType < 11 &&
                      (a
                        ? a.index(n) > -1
                        : 1 === n.nodeType && k.find.matchesSelector(n, e))
                    ) {
                      i.push(n);
                      break;
                    }
              return this.pushStack(i.length > 1 ? k.uniqueSort(i) : i);
            },
            index: function (e) {
              return e
                ? 'string' == typeof e
                  ? u.call(k(e), this[0])
                  : u.call(this, e.jquery ? e[0] : e)
                : this[0] && this[0].parentNode
                ? this.first().prevAll().length
                : -1;
            },
            add: function (e, t) {
              return this.pushStack(k.uniqueSort(k.merge(this.get(), k(e, t))));
            },
            addBack: function (e) {
              return this.add(
                null == e ? this.prevObject : this.prevObject.filter(e)
              );
            },
          }),
            k.each(
              {
                parent: function (e) {
                  var t = e.parentNode;
                  return t && 11 !== t.nodeType ? t : null;
                },
                parents: function (e) {
                  return A(e, 'parentNode');
                },
                parentsUntil: function (e, t, n) {
                  return A(e, 'parentNode', n);
                },
                next: function (e) {
                  return _(e, 'nextSibling');
                },
                prev: function (e) {
                  return _(e, 'previousSibling');
                },
                nextAll: function (e) {
                  return A(e, 'nextSibling');
                },
                prevAll: function (e) {
                  return A(e, 'previousSibling');
                },
                nextUntil: function (e, t, n) {
                  return A(e, 'nextSibling', n);
                },
                prevUntil: function (e, t, n) {
                  return A(e, 'previousSibling', n);
                },
                siblings: function (e) {
                  return j((e.parentNode || {}).firstChild, e);
                },
                children: function (e) {
                  return j(e.firstChild);
                },
                contents: function (e) {
                  return null != e.contentDocument && a(e.contentDocument)
                    ? e.contentDocument
                    : (P(e, 'template') && (e = e.content || e),
                      k.merge([], e.childNodes));
                },
              },
              function (e, t) {
                k.fn[e] = function (n, r) {
                  var o = k.map(this, t, n);
                  return (
                    'Until' !== e.slice(-5) && (r = n),
                    r && 'string' == typeof r && (o = k.filter(r, o)),
                    this.length > 1 &&
                      (R[e] || k.uniqueSort(o), I.test(e) && o.reverse()),
                    this.pushStack(o)
                  );
                };
              }
            );
          var q = /[^\x20\t\r\n\f]+/g;
          function B(e) {
            return e;
          }
          function F(e) {
            throw e;
          }
          function H(e, t, n, r) {
            var o;
            try {
              e && m((o = e.promise))
                ? o.call(e).done(t).fail(n)
                : e && m((o = e.then))
                ? o.call(e, t, n)
                : t.apply(void 0, [e].slice(r));
            } catch (e) {
              n.apply(void 0, [e]);
            }
          }
          (k.Callbacks = function (e) {
            e =
              'string' == typeof e
                ? (function (e) {
                    var t = {};
                    return (
                      k.each(e.match(q) || [], function (e, n) {
                        t[n] = !0;
                      }),
                      t
                    );
                  })(e)
                : k.extend({}, e);
            var t,
              n,
              r,
              o,
              i = [],
              a = [],
              s = -1,
              c = function () {
                for (o = o || e.once, r = t = !0; a.length; s = -1)
                  for (n = a.shift(); ++s < i.length; )
                    !1 === i[s].apply(n[0], n[1]) &&
                      e.stopOnFalse &&
                      ((s = i.length), (n = !1));
                e.memory || (n = !1), (t = !1), o && (i = n ? [] : '');
              },
              l = {
                add: function () {
                  return (
                    i &&
                      (n && !t && ((s = i.length - 1), a.push(n)),
                      (function t(n) {
                        k.each(n, function (n, r) {
                          m(r)
                            ? (e.unique && l.has(r)) || i.push(r)
                            : r && r.length && 'string' !== S(r) && t(r);
                        });
                      })(arguments),
                      n && !t && c()),
                    this
                  );
                },
                remove: function () {
                  return (
                    k.each(arguments, function (e, t) {
                      for (var n; (n = k.inArray(t, i, n)) > -1; )
                        i.splice(n, 1), n <= s && s--;
                    }),
                    this
                  );
                },
                has: function (e) {
                  return e ? k.inArray(e, i) > -1 : i.length > 0;
                },
                empty: function () {
                  return i && (i = []), this;
                },
                disable: function () {
                  return (o = a = []), (i = n = ''), this;
                },
                disabled: function () {
                  return !i;
                },
                lock: function () {
                  return (o = a = []), n || t || (i = n = ''), this;
                },
                locked: function () {
                  return !!o;
                },
                fireWith: function (e, n) {
                  return (
                    o ||
                      ((n = [e, (n = n || []).slice ? n.slice() : n]),
                      a.push(n),
                      t || c()),
                    this
                  );
                },
                fire: function () {
                  return l.fireWith(this, arguments), this;
                },
                fired: function () {
                  return !!r;
                },
              };
            return l;
          }),
            k.extend({
              Deferred: function (e) {
                var t = [
                    [
                      'notify',
                      'progress',
                      k.Callbacks('memory'),
                      k.Callbacks('memory'),
                      2,
                    ],
                    [
                      'resolve',
                      'done',
                      k.Callbacks('once memory'),
                      k.Callbacks('once memory'),
                      0,
                      'resolved',
                    ],
                    [
                      'reject',
                      'fail',
                      k.Callbacks('once memory'),
                      k.Callbacks('once memory'),
                      1,
                      'rejected',
                    ],
                  ],
                  n = 'pending',
                  o = {
                    state: function () {
                      return n;
                    },
                    always: function () {
                      return i.done(arguments).fail(arguments), this;
                    },
                    catch: function (e) {
                      return o.then(null, e);
                    },
                    pipe: function () {
                      var e = arguments;
                      return k
                        .Deferred(function (n) {
                          k.each(t, function (t, r) {
                            var o = m(e[r[4]]) && e[r[4]];
                            i[r[1]](function () {
                              var e = o && o.apply(this, arguments);
                              e && m(e.promise)
                                ? e
                                    .promise()
                                    .progress(n.notify)
                                    .done(n.resolve)
                                    .fail(n.reject)
                                : n[r[0] + 'With'](this, o ? [e] : arguments);
                            });
                          }),
                            (e = null);
                        })
                        .promise();
                    },
                    then: function (e, n, o) {
                      var i = 0;
                      function a(e, t, n, o) {
                        return function () {
                          var s = this,
                            c = arguments,
                            l = function () {
                              var r, l;
                              if (!(e < i)) {
                                if ((r = n.apply(s, c)) === t.promise())
                                  throw new TypeError(
                                    'Thenable self-resolution'
                                  );
                                (l =
                                  r &&
                                  ('object' == typeof r ||
                                    'function' == typeof r) &&
                                  r.then),
                                  m(l)
                                    ? o
                                      ? l.call(r, a(i, t, B, o), a(i, t, F, o))
                                      : (i++,
                                        l.call(
                                          r,
                                          a(i, t, B, o),
                                          a(i, t, F, o),
                                          a(i, t, B, t.notifyWith)
                                        ))
                                    : (n !== B && ((s = void 0), (c = [r])),
                                      (o || t.resolveWith)(s, c));
                              }
                            },
                            u = o
                              ? l
                              : function () {
                                  try {
                                    l();
                                  } catch (r) {
                                    k.Deferred.exceptionHook &&
                                      k.Deferred.exceptionHook(r, u.stackTrace),
                                      e + 1 >= i &&
                                        (n !== F && ((s = void 0), (c = [r])),
                                        t.rejectWith(s, c));
                                  }
                                };
                          e
                            ? u()
                            : (k.Deferred.getStackHook &&
                                (u.stackTrace = k.Deferred.getStackHook()),
                              r.setTimeout(u));
                        };
                      }
                      return k
                        .Deferred(function (r) {
                          t[0][3].add(a(0, r, m(o) ? o : B, r.notifyWith)),
                            t[1][3].add(a(0, r, m(e) ? e : B)),
                            t[2][3].add(a(0, r, m(n) ? n : F));
                        })
                        .promise();
                    },
                    promise: function (e) {
                      return null != e ? k.extend(e, o) : o;
                    },
                  },
                  i = {};
                return (
                  k.each(t, function (e, r) {
                    var a = r[2],
                      s = r[5];
                    (o[r[1]] = a.add),
                      s &&
                        a.add(
                          function () {
                            n = s;
                          },
                          t[3 - e][2].disable,
                          t[3 - e][3].disable,
                          t[0][2].lock,
                          t[0][3].lock
                        ),
                      a.add(r[3].fire),
                      (i[r[0]] = function () {
                        return (
                          i[r[0] + 'With'](
                            this === i ? void 0 : this,
                            arguments
                          ),
                          this
                        );
                      }),
                      (i[r[0] + 'With'] = a.fireWith);
                  }),
                  o.promise(i),
                  e && e.call(i, i),
                  i
                );
              },
              when: function (e) {
                var t = arguments.length,
                  n = t,
                  r = Array(n),
                  o = s.call(arguments),
                  i = k.Deferred(),
                  a = function (e) {
                    return function (n) {
                      (r[e] = this),
                        (o[e] = arguments.length > 1 ? s.call(arguments) : n),
                        --t || i.resolveWith(r, o);
                    };
                  };
                if (
                  t <= 1 &&
                  (H(e, i.done(a(n)).resolve, i.reject, !t),
                  'pending' === i.state() || m(o[n] && o[n].then))
                )
                  return i.then();
                for (; n--; ) H(o[n], a(n), i.reject);
                return i.promise();
              },
            });
          var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
          (k.Deferred.exceptionHook = function (e, t) {
            r.console &&
              r.console.warn &&
              e &&
              W.test(e.name) &&
              r.console.warn(
                'jQuery.Deferred exception: ' + e.message,
                e.stack,
                t
              );
          }),
            (k.readyException = function (e) {
              r.setTimeout(function () {
                throw e;
              });
            });
          var V = k.Deferred();
          function $() {
            b.removeEventListener('DOMContentLoaded', $),
              r.removeEventListener('load', $),
              k.ready();
          }
          (k.fn.ready = function (e) {
            return (
              V.then(e).catch(function (e) {
                k.readyException(e);
              }),
              this
            );
          }),
            k.extend({
              isReady: !1,
              readyWait: 1,
              ready: function (e) {
                (!0 === e ? --k.readyWait : k.isReady) ||
                  ((k.isReady = !0),
                  (!0 !== e && --k.readyWait > 0) || V.resolveWith(b, [k]));
              },
            }),
            (k.ready.then = V.then),
            'complete' === b.readyState ||
            ('loading' !== b.readyState && !b.documentElement.doScroll)
              ? r.setTimeout(k.ready)
              : (b.addEventListener('DOMContentLoaded', $),
                r.addEventListener('load', $));
          var z = function (e, t, n, r, o, i, a) {
              var s = 0,
                c = e.length,
                l = null == n;
              if ('object' === S(n))
                for (s in ((o = !0), n)) z(e, t, s, n[s], !0, i, a);
              else if (
                void 0 !== r &&
                ((o = !0),
                m(r) || (a = !0),
                l &&
                  (a
                    ? (t.call(e, r), (t = null))
                    : ((l = t),
                      (t = function (e, t, n) {
                        return l.call(k(e), n);
                      }))),
                t)
              )
                for (; s < c; s++)
                  t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
              return o ? e : l ? t.call(e) : c ? t(e[0], n) : i;
            },
            U = /^-ms-/,
            Z = /-([a-z])/g;
          function X(e, t) {
            return t.toUpperCase();
          }
          function G(e) {
            return e.replace(U, 'ms-').replace(Z, X);
          }
          var J = function (e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
          };
          function Y() {
            this.expando = k.expando + Y.uid++;
          }
          (Y.uid = 1),
            (Y.prototype = {
              cache: function (e) {
                var t = e[this.expando];
                return (
                  t ||
                    ((t = {}),
                    J(e) &&
                      (e.nodeType
                        ? (e[this.expando] = t)
                        : Object.defineProperty(e, this.expando, {
                            value: t,
                            configurable: !0,
                          }))),
                  t
                );
              },
              set: function (e, t, n) {
                var r,
                  o = this.cache(e);
                if ('string' == typeof t) o[G(t)] = n;
                else for (r in t) o[G(r)] = t[r];
                return o;
              },
              get: function (e, t) {
                return void 0 === t
                  ? this.cache(e)
                  : e[this.expando] && e[this.expando][G(t)];
              },
              access: function (e, t, n) {
                return void 0 === t ||
                  (t && 'string' == typeof t && void 0 === n)
                  ? this.get(e, t)
                  : (this.set(e, t, n), void 0 !== n ? n : t);
              },
              remove: function (e, t) {
                var n,
                  r = e[this.expando];
                if (void 0 !== r) {
                  if (void 0 !== t) {
                    n = (t = Array.isArray(t)
                      ? t.map(G)
                      : (t = G(t)) in r
                      ? [t]
                      : t.match(q) || []).length;
                    for (; n--; ) delete r[t[n]];
                  }
                  (void 0 === t || k.isEmptyObject(r)) &&
                    (e.nodeType
                      ? (e[this.expando] = void 0)
                      : delete e[this.expando]);
                }
              },
              hasData: function (e) {
                var t = e[this.expando];
                return void 0 !== t && !k.isEmptyObject(t);
              },
            });
          var K = new Y(),
            Q = new Y(),
            ee = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            te = /[A-Z]/g;
          function ne(e, t, n) {
            var r;
            if (void 0 === n && 1 === e.nodeType)
              if (
                ((r = 'data-' + t.replace(te, '-$&').toLowerCase()),
                'string' == typeof (n = e.getAttribute(r)))
              ) {
                try {
                  n = (function (e) {
                    return (
                      'true' === e ||
                      ('false' !== e &&
                        ('null' === e
                          ? null
                          : e === +e + ''
                          ? +e
                          : ee.test(e)
                          ? JSON.parse(e)
                          : e))
                    );
                  })(n);
                } catch (e) {}
                Q.set(e, t, n);
              } else n = void 0;
            return n;
          }
          k.extend({
            hasData: function (e) {
              return Q.hasData(e) || K.hasData(e);
            },
            data: function (e, t, n) {
              return Q.access(e, t, n);
            },
            removeData: function (e, t) {
              Q.remove(e, t);
            },
            _data: function (e, t, n) {
              return K.access(e, t, n);
            },
            _removeData: function (e, t) {
              K.remove(e, t);
            },
          }),
            k.fn.extend({
              data: function (e, t) {
                var n,
                  r,
                  o,
                  i = this[0],
                  a = i && i.attributes;
                if (void 0 === e) {
                  if (
                    this.length &&
                    ((o = Q.get(i)),
                    1 === i.nodeType && !K.get(i, 'hasDataAttrs'))
                  ) {
                    for (n = a.length; n--; )
                      a[n] &&
                        0 === (r = a[n].name).indexOf('data-') &&
                        ((r = G(r.slice(5))), ne(i, r, o[r]));
                    K.set(i, 'hasDataAttrs', !0);
                  }
                  return o;
                }
                return 'object' == typeof e
                  ? this.each(function () {
                      Q.set(this, e);
                    })
                  : z(
                      this,
                      function (t) {
                        var n;
                        if (i && void 0 === t)
                          return void 0 !== (n = Q.get(i, e)) ||
                            void 0 !== (n = ne(i, e))
                            ? n
                            : void 0;
                        this.each(function () {
                          Q.set(this, e, t);
                        });
                      },
                      null,
                      t,
                      arguments.length > 1,
                      null,
                      !0
                    );
              },
              removeData: function (e) {
                return this.each(function () {
                  Q.remove(this, e);
                });
              },
            }),
            k.extend({
              queue: function (e, t, n) {
                var r;
                if (e)
                  return (
                    (t = (t || 'fx') + 'queue'),
                    (r = K.get(e, t)),
                    n &&
                      (!r || Array.isArray(n)
                        ? (r = K.access(e, t, k.makeArray(n)))
                        : r.push(n)),
                    r || []
                  );
              },
              dequeue: function (e, t) {
                t = t || 'fx';
                var n = k.queue(e, t),
                  r = n.length,
                  o = n.shift(),
                  i = k._queueHooks(e, t);
                'inprogress' === o && ((o = n.shift()), r--),
                  o &&
                    ('fx' === t && n.unshift('inprogress'),
                    delete i.stop,
                    o.call(
                      e,
                      function () {
                        k.dequeue(e, t);
                      },
                      i
                    )),
                  !r && i && i.empty.fire();
              },
              _queueHooks: function (e, t) {
                var n = t + 'queueHooks';
                return (
                  K.get(e, n) ||
                  K.access(e, n, {
                    empty: k.Callbacks('once memory').add(function () {
                      K.remove(e, [t + 'queue', n]);
                    }),
                  })
                );
              },
            }),
            k.fn.extend({
              queue: function (e, t) {
                var n = 2;
                return (
                  'string' != typeof e && ((t = e), (e = 'fx'), n--),
                  arguments.length < n
                    ? k.queue(this[0], e)
                    : void 0 === t
                    ? this
                    : this.each(function () {
                        var n = k.queue(this, e, t);
                        k._queueHooks(this, e),
                          'fx' === e &&
                            'inprogress' !== n[0] &&
                            k.dequeue(this, e);
                      })
                );
              },
              dequeue: function (e) {
                return this.each(function () {
                  k.dequeue(this, e);
                });
              },
              clearQueue: function (e) {
                return this.queue(e || 'fx', []);
              },
              promise: function (e, t) {
                var n,
                  r = 1,
                  o = k.Deferred(),
                  i = this,
                  a = this.length,
                  s = function () {
                    --r || o.resolveWith(i, [i]);
                  };
                for (
                  'string' != typeof e && ((t = e), (e = void 0)),
                    e = e || 'fx';
                  a--;

                )
                  (n = K.get(i[a], e + 'queueHooks')) &&
                    n.empty &&
                    (r++, n.empty.add(s));
                return s(), o.promise(t);
              },
            });
          var re = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            oe = new RegExp('^(?:([+-])=|)(' + re + ')([a-z%]*)$', 'i'),
            ie = ['Top', 'Right', 'Bottom', 'Left'],
            ae = b.documentElement,
            se = function (e) {
              return k.contains(e.ownerDocument, e);
            },
            ce = { composed: !0 };
          ae.getRootNode &&
            (se = function (e) {
              return (
                k.contains(e.ownerDocument, e) ||
                e.getRootNode(ce) === e.ownerDocument
              );
            });
          var le = function (e, t) {
            return (
              'none' === (e = t || e).style.display ||
              ('' === e.style.display &&
                se(e) &&
                'none' === k.css(e, 'display'))
            );
          };
          function ue(e, t, n, r) {
            var o,
              i,
              a = 20,
              s = r
                ? function () {
                    return r.cur();
                  }
                : function () {
                    return k.css(e, t, '');
                  },
              c = s(),
              l = (n && n[3]) || (k.cssNumber[t] ? '' : 'px'),
              u =
                e.nodeType &&
                (k.cssNumber[t] || ('px' !== l && +c)) &&
                oe.exec(k.css(e, t));
            if (u && u[3] !== l) {
              for (c /= 2, l = l || u[3], u = +c || 1; a--; )
                k.style(e, t, u + l),
                  (1 - i) * (1 - (i = s() / c || 0.5)) <= 0 && (a = 0),
                  (u /= i);
              (u *= 2), k.style(e, t, u + l), (n = n || []);
            }
            return (
              n &&
                ((u = +u || +c || 0),
                (o = n[1] ? u + (n[1] + 1) * n[2] : +n[2]),
                r && ((r.unit = l), (r.start = u), (r.end = o))),
              o
            );
          }
          var pe = {};
          function de(e) {
            var t,
              n = e.ownerDocument,
              r = e.nodeName,
              o = pe[r];
            return (
              o ||
              ((t = n.body.appendChild(n.createElement(r))),
              (o = k.css(t, 'display')),
              t.parentNode.removeChild(t),
              'none' === o && (o = 'block'),
              (pe[r] = o),
              o)
            );
          }
          function fe(e, t) {
            for (var n, r, o = [], i = 0, a = e.length; i < a; i++)
              (r = e[i]).style &&
                ((n = r.style.display),
                t
                  ? ('none' === n &&
                      ((o[i] = K.get(r, 'display') || null),
                      o[i] || (r.style.display = '')),
                    '' === r.style.display && le(r) && (o[i] = de(r)))
                  : 'none' !== n && ((o[i] = 'none'), K.set(r, 'display', n)));
            for (i = 0; i < a; i++) null != o[i] && (e[i].style.display = o[i]);
            return e;
          }
          k.fn.extend({
            show: function () {
              return fe(this, !0);
            },
            hide: function () {
              return fe(this);
            },
            toggle: function (e) {
              return 'boolean' == typeof e
                ? e
                  ? this.show()
                  : this.hide()
                : this.each(function () {
                    le(this) ? k(this).show() : k(this).hide();
                  });
            },
          });
          var he,
            ge,
            ve = /^(?:checkbox|radio)$/i,
            me = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
            ye = /^$|^module$|\/(?:java|ecma)script/i;
          (he = b.createDocumentFragment().appendChild(b.createElement('div'))),
            (ge = b.createElement('input')).setAttribute('type', 'radio'),
            ge.setAttribute('checked', 'checked'),
            ge.setAttribute('name', 't'),
            he.appendChild(ge),
            (v.checkClone = he.cloneNode(!0).cloneNode(!0).lastChild.checked),
            (he.innerHTML = '<textarea>x</textarea>'),
            (v.noCloneChecked = !!he.cloneNode(!0).lastChild.defaultValue),
            (he.innerHTML = '<option></option>'),
            (v.option = !!he.lastChild);
          var be = {
            thead: [1, '<table>', '</table>'],
            col: [2, '<table><colgroup>', '</colgroup></table>'],
            tr: [2, '<table><tbody>', '</tbody></table>'],
            td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
            _default: [0, '', ''],
          };
          function xe(e, t) {
            var n;
            return (
              (n =
                void 0 !== e.getElementsByTagName
                  ? e.getElementsByTagName(t || '*')
                  : void 0 !== e.querySelectorAll
                  ? e.querySelectorAll(t || '*')
                  : []),
              void 0 === t || (t && P(e, t)) ? k.merge([e], n) : n
            );
          }
          function we(e, t) {
            for (var n = 0, r = e.length; n < r; n++)
              K.set(e[n], 'globalEval', !t || K.get(t[n], 'globalEval'));
          }
          (be.tbody = be.tfoot = be.colgroup = be.caption = be.thead),
            (be.th = be.td),
            v.option ||
              (be.optgroup = be.option =
                [1, "<select multiple='multiple'>", '</select>']);
          var Se = /<|&#?\w+;/;
          function Ce(e, t, n, r, o) {
            for (
              var i,
                a,
                s,
                c,
                l,
                u,
                p = t.createDocumentFragment(),
                d = [],
                f = 0,
                h = e.length;
              f < h;
              f++
            )
              if ((i = e[f]) || 0 === i)
                if ('object' === S(i)) k.merge(d, i.nodeType ? [i] : i);
                else if (Se.test(i)) {
                  for (
                    a = a || p.appendChild(t.createElement('div')),
                      s = (me.exec(i) || ['', ''])[1].toLowerCase(),
                      c = be[s] || be._default,
                      a.innerHTML = c[1] + k.htmlPrefilter(i) + c[2],
                      u = c[0];
                    u--;

                  )
                    a = a.lastChild;
                  k.merge(d, a.childNodes),
                    ((a = p.firstChild).textContent = '');
                } else d.push(t.createTextNode(i));
            for (p.textContent = '', f = 0; (i = d[f++]); )
              if (r && k.inArray(i, r) > -1) o && o.push(i);
              else if (
                ((l = se(i)),
                (a = xe(p.appendChild(i), 'script')),
                l && we(a),
                n)
              )
                for (u = 0; (i = a[u++]); ) ye.test(i.type || '') && n.push(i);
            return p;
          }
          var ke = /^([^.]*)(?:\.(.+)|)/;
          function Ee() {
            return !0;
          }
          function Te() {
            return !1;
          }
          function Ae(e, t) {
            return (
              (e ===
                (function () {
                  try {
                    return b.activeElement;
                  } catch (e) {}
                })()) ==
              ('focus' === t)
            );
          }
          function je(e, t, n, r, o, i) {
            var a, s;
            if ('object' == typeof t) {
              for (s in ('string' != typeof n && ((r = r || n), (n = void 0)),
              t))
                je(e, s, n, r, t[s], i);
              return e;
            }
            if (
              (null == r && null == o
                ? ((o = n), (r = n = void 0))
                : null == o &&
                  ('string' == typeof n
                    ? ((o = r), (r = void 0))
                    : ((o = r), (r = n), (n = void 0))),
              !1 === o)
            )
              o = Te;
            else if (!o) return e;
            return (
              1 === i &&
                ((a = o),
                (o = function (e) {
                  return k().off(e), a.apply(this, arguments);
                }),
                (o.guid = a.guid || (a.guid = k.guid++))),
              e.each(function () {
                k.event.add(this, t, o, r, n);
              })
            );
          }
          function Ne(e, t, n) {
            n
              ? (K.set(e, t, !1),
                k.event.add(e, t, {
                  namespace: !1,
                  handler: function (e) {
                    var r,
                      o,
                      i = K.get(this, t);
                    if (1 & e.isTrigger && this[t]) {
                      if (i.length)
                        (k.event.special[t] || {}).delegateType &&
                          e.stopPropagation();
                      else if (
                        ((i = s.call(arguments)),
                        K.set(this, t, i),
                        (r = n(this, t)),
                        this[t](),
                        i !== (o = K.get(this, t)) || r
                          ? K.set(this, t, !1)
                          : (o = {}),
                        i !== o)
                      )
                        return (
                          e.stopImmediatePropagation(),
                          e.preventDefault(),
                          o && o.value
                        );
                    } else
                      i.length &&
                        (K.set(this, t, {
                          value: k.event.trigger(
                            k.extend(i[0], k.Event.prototype),
                            i.slice(1),
                            this
                          ),
                        }),
                        e.stopImmediatePropagation());
                  },
                }))
              : void 0 === K.get(e, t) && k.event.add(e, t, Ee);
          }
          (k.event = {
            global: {},
            add: function (e, t, n, r, o) {
              var i,
                a,
                s,
                c,
                l,
                u,
                p,
                d,
                f,
                h,
                g,
                v = K.get(e);
              if (J(e))
                for (
                  n.handler && ((n = (i = n).handler), (o = i.selector)),
                    o && k.find.matchesSelector(ae, o),
                    n.guid || (n.guid = k.guid++),
                    (c = v.events) || (c = v.events = Object.create(null)),
                    (a = v.handle) ||
                      (a = v.handle =
                        function (t) {
                          return void 0 !== k && k.event.triggered !== t.type
                            ? k.event.dispatch.apply(e, arguments)
                            : void 0;
                        }),
                    l = (t = (t || '').match(q) || ['']).length;
                  l--;

                )
                  (f = g = (s = ke.exec(t[l]) || [])[1]),
                    (h = (s[2] || '').split('.').sort()),
                    f &&
                      ((p = k.event.special[f] || {}),
                      (f = (o ? p.delegateType : p.bindType) || f),
                      (p = k.event.special[f] || {}),
                      (u = k.extend(
                        {
                          type: f,
                          origType: g,
                          data: r,
                          handler: n,
                          guid: n.guid,
                          selector: o,
                          needsContext: o && k.expr.match.needsContext.test(o),
                          namespace: h.join('.'),
                        },
                        i
                      )),
                      (d = c[f]) ||
                        (((d = c[f] = []).delegateCount = 0),
                        (p.setup && !1 !== p.setup.call(e, r, h, a)) ||
                          (e.addEventListener && e.addEventListener(f, a))),
                      p.add &&
                        (p.add.call(e, u),
                        u.handler.guid || (u.handler.guid = n.guid)),
                      o ? d.splice(d.delegateCount++, 0, u) : d.push(u),
                      (k.event.global[f] = !0));
            },
            remove: function (e, t, n, r, o) {
              var i,
                a,
                s,
                c,
                l,
                u,
                p,
                d,
                f,
                h,
                g,
                v = K.hasData(e) && K.get(e);
              if (v && (c = v.events)) {
                for (l = (t = (t || '').match(q) || ['']).length; l--; )
                  if (
                    ((f = g = (s = ke.exec(t[l]) || [])[1]),
                    (h = (s[2] || '').split('.').sort()),
                    f)
                  ) {
                    for (
                      p = k.event.special[f] || {},
                        d =
                          c[(f = (r ? p.delegateType : p.bindType) || f)] || [],
                        s =
                          s[2] &&
                          new RegExp(
                            '(^|\\.)' + h.join('\\.(?:.*\\.|)') + '(\\.|$)'
                          ),
                        a = i = d.length;
                      i--;

                    )
                      (u = d[i]),
                        (!o && g !== u.origType) ||
                          (n && n.guid !== u.guid) ||
                          (s && !s.test(u.namespace)) ||
                          (r &&
                            r !== u.selector &&
                            ('**' !== r || !u.selector)) ||
                          (d.splice(i, 1),
                          u.selector && d.delegateCount--,
                          p.remove && p.remove.call(e, u));
                    a &&
                      !d.length &&
                      ((p.teardown && !1 !== p.teardown.call(e, h, v.handle)) ||
                        k.removeEvent(e, f, v.handle),
                      delete c[f]);
                  } else for (f in c) k.event.remove(e, f + t[l], n, r, !0);
                k.isEmptyObject(c) && K.remove(e, 'handle events');
              }
            },
            dispatch: function (e) {
              var t,
                n,
                r,
                o,
                i,
                a,
                s = new Array(arguments.length),
                c = k.event.fix(e),
                l =
                  (K.get(this, 'events') || Object.create(null))[c.type] || [],
                u = k.event.special[c.type] || {};
              for (s[0] = c, t = 1; t < arguments.length; t++)
                s[t] = arguments[t];
              if (
                ((c.delegateTarget = this),
                !u.preDispatch || !1 !== u.preDispatch.call(this, c))
              ) {
                for (
                  a = k.event.handlers.call(this, c, l), t = 0;
                  (o = a[t++]) && !c.isPropagationStopped();

                )
                  for (
                    c.currentTarget = o.elem, n = 0;
                    (i = o.handlers[n++]) && !c.isImmediatePropagationStopped();

                  )
                    (c.rnamespace &&
                      !1 !== i.namespace &&
                      !c.rnamespace.test(i.namespace)) ||
                      ((c.handleObj = i),
                      (c.data = i.data),
                      void 0 !==
                        (r = (
                          (k.event.special[i.origType] || {}).handle ||
                          i.handler
                        ).apply(o.elem, s)) &&
                        !1 === (c.result = r) &&
                        (c.preventDefault(), c.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, c), c.result;
              }
            },
            handlers: function (e, t) {
              var n,
                r,
                o,
                i,
                a,
                s = [],
                c = t.delegateCount,
                l = e.target;
              if (c && l.nodeType && !('click' === e.type && e.button >= 1))
                for (; l !== this; l = l.parentNode || this)
                  if (
                    1 === l.nodeType &&
                    ('click' !== e.type || !0 !== l.disabled)
                  ) {
                    for (i = [], a = {}, n = 0; n < c; n++)
                      void 0 === a[(o = (r = t[n]).selector + ' ')] &&
                        (a[o] = r.needsContext
                          ? k(o, this).index(l) > -1
                          : k.find(o, this, null, [l]).length),
                        a[o] && i.push(r);
                    i.length && s.push({ elem: l, handlers: i });
                  }
              return (
                (l = this),
                c < t.length && s.push({ elem: l, handlers: t.slice(c) }),
                s
              );
            },
            addProp: function (e, t) {
              Object.defineProperty(k.Event.prototype, e, {
                enumerable: !0,
                configurable: !0,
                get: m(t)
                  ? function () {
                      if (this.originalEvent) return t(this.originalEvent);
                    }
                  : function () {
                      if (this.originalEvent) return this.originalEvent[e];
                    },
                set: function (t) {
                  Object.defineProperty(this, e, {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: t,
                  });
                },
              });
            },
            fix: function (e) {
              return e[k.expando] ? e : new k.Event(e);
            },
            special: {
              load: { noBubble: !0 },
              click: {
                setup: function (e) {
                  var t = this || e;
                  return (
                    ve.test(t.type) &&
                      t.click &&
                      P(t, 'input') &&
                      Ne(t, 'click', Ee),
                    !1
                  );
                },
                trigger: function (e) {
                  var t = this || e;
                  return (
                    ve.test(t.type) &&
                      t.click &&
                      P(t, 'input') &&
                      Ne(t, 'click'),
                    !0
                  );
                },
                _default: function (e) {
                  var t = e.target;
                  return (
                    (ve.test(t.type) &&
                      t.click &&
                      P(t, 'input') &&
                      K.get(t, 'click')) ||
                    P(t, 'a')
                  );
                },
              },
              beforeunload: {
                postDispatch: function (e) {
                  void 0 !== e.result &&
                    e.originalEvent &&
                    (e.originalEvent.returnValue = e.result);
                },
              },
            },
          }),
            (k.removeEvent = function (e, t, n) {
              e.removeEventListener && e.removeEventListener(t, n);
            }),
            (k.Event = function (e, t) {
              if (!(this instanceof k.Event)) return new k.Event(e, t);
              e && e.type
                ? ((this.originalEvent = e),
                  (this.type = e.type),
                  (this.isDefaultPrevented =
                    e.defaultPrevented ||
                    (void 0 === e.defaultPrevented && !1 === e.returnValue)
                      ? Ee
                      : Te),
                  (this.target =
                    e.target && 3 === e.target.nodeType
                      ? e.target.parentNode
                      : e.target),
                  (this.currentTarget = e.currentTarget),
                  (this.relatedTarget = e.relatedTarget))
                : (this.type = e),
                t && k.extend(this, t),
                (this.timeStamp = (e && e.timeStamp) || Date.now()),
                (this[k.expando] = !0);
            }),
            (k.Event.prototype = {
              constructor: k.Event,
              isDefaultPrevented: Te,
              isPropagationStopped: Te,
              isImmediatePropagationStopped: Te,
              isSimulated: !1,
              preventDefault: function () {
                var e = this.originalEvent;
                (this.isDefaultPrevented = Ee),
                  e && !this.isSimulated && e.preventDefault();
              },
              stopPropagation: function () {
                var e = this.originalEvent;
                (this.isPropagationStopped = Ee),
                  e && !this.isSimulated && e.stopPropagation();
              },
              stopImmediatePropagation: function () {
                var e = this.originalEvent;
                (this.isImmediatePropagationStopped = Ee),
                  e && !this.isSimulated && e.stopImmediatePropagation(),
                  this.stopPropagation();
              },
            }),
            k.each(
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
              k.event.addProp
            ),
            k.each({ focus: 'focusin', blur: 'focusout' }, function (e, t) {
              k.event.special[e] = {
                setup: function () {
                  return Ne(this, e, Ae), !1;
                },
                trigger: function () {
                  return Ne(this, e), !0;
                },
                _default: function (t) {
                  return K.get(t.target, e);
                },
                delegateType: t,
              };
            }),
            k.each(
              {
                mouseenter: 'mouseover',
                mouseleave: 'mouseout',
                pointerenter: 'pointerover',
                pointerleave: 'pointerout',
              },
              function (e, t) {
                k.event.special[e] = {
                  delegateType: t,
                  bindType: t,
                  handle: function (e) {
                    var n,
                      r = e.relatedTarget,
                      o = e.handleObj;
                    return (
                      (r && (r === this || k.contains(this, r))) ||
                        ((e.type = o.origType),
                        (n = o.handler.apply(this, arguments)),
                        (e.type = t)),
                      n
                    );
                  },
                };
              }
            ),
            k.fn.extend({
              on: function (e, t, n, r) {
                return je(this, e, t, n, r);
              },
              one: function (e, t, n, r) {
                return je(this, e, t, n, r, 1);
              },
              off: function (e, t, n) {
                var r, o;
                if (e && e.preventDefault && e.handleObj)
                  return (
                    (r = e.handleObj),
                    k(e.delegateTarget).off(
                      r.namespace ? r.origType + '.' + r.namespace : r.origType,
                      r.selector,
                      r.handler
                    ),
                    this
                  );
                if ('object' == typeof e) {
                  for (o in e) this.off(o, t, e[o]);
                  return this;
                }
                return (
                  (!1 !== t && 'function' != typeof t) ||
                    ((n = t), (t = void 0)),
                  !1 === n && (n = Te),
                  this.each(function () {
                    k.event.remove(this, e, n, t);
                  })
                );
              },
            });
          var Pe = /<script|<style|<link/i,
            Oe = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Le = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
          function Me(e, t) {
            return (
              (P(e, 'table') &&
                P(11 !== t.nodeType ? t : t.firstChild, 'tr') &&
                k(e).children('tbody')[0]) ||
              e
            );
          }
          function De(e) {
            return (
              (e.type = (null !== e.getAttribute('type')) + '/' + e.type), e
            );
          }
          function Ie(e) {
            return (
              'true/' === (e.type || '').slice(0, 5)
                ? (e.type = e.type.slice(5))
                : e.removeAttribute('type'),
              e
            );
          }
          function Re(e, t) {
            var n, r, o, i, a, s;
            if (1 === t.nodeType) {
              if (K.hasData(e) && (s = K.get(e).events))
                for (o in (K.remove(t, 'handle events'), s))
                  for (n = 0, r = s[o].length; n < r; n++)
                    k.event.add(t, o, s[o][n]);
              Q.hasData(e) &&
                ((i = Q.access(e)), (a = k.extend({}, i)), Q.set(t, a));
            }
          }
          function _e(e, t) {
            var n = t.nodeName.toLowerCase();
            'input' === n && ve.test(e.type)
              ? (t.checked = e.checked)
              : ('input' !== n && 'textarea' !== n) ||
                (t.defaultValue = e.defaultValue);
          }
          function qe(e, t, n, r) {
            t = c(t);
            var o,
              i,
              a,
              s,
              l,
              u,
              p = 0,
              d = e.length,
              f = d - 1,
              h = t[0],
              g = m(h);
            if (
              g ||
              (d > 1 && 'string' == typeof h && !v.checkClone && Oe.test(h))
            )
              return e.each(function (o) {
                var i = e.eq(o);
                g && (t[0] = h.call(this, o, i.html())), qe(i, t, n, r);
              });
            if (
              d &&
              ((i = (o = Ce(t, e[0].ownerDocument, !1, e, r)).firstChild),
              1 === o.childNodes.length && (o = i),
              i || r)
            ) {
              for (s = (a = k.map(xe(o, 'script'), De)).length; p < d; p++)
                (l = o),
                  p !== f &&
                    ((l = k.clone(l, !0, !0)),
                    s && k.merge(a, xe(l, 'script'))),
                  n.call(e[p], l, p);
              if (s)
                for (
                  u = a[a.length - 1].ownerDocument, k.map(a, Ie), p = 0;
                  p < s;
                  p++
                )
                  (l = a[p]),
                    ye.test(l.type || '') &&
                      !K.access(l, 'globalEval') &&
                      k.contains(u, l) &&
                      (l.src && 'module' !== (l.type || '').toLowerCase()
                        ? k._evalUrl &&
                          !l.noModule &&
                          k._evalUrl(
                            l.src,
                            { nonce: l.nonce || l.getAttribute('nonce') },
                            u
                          )
                        : w(l.textContent.replace(Le, ''), l, u));
            }
            return e;
          }
          function Be(e, t, n) {
            for (
              var r, o = t ? k.filter(t, e) : e, i = 0;
              null != (r = o[i]);
              i++
            )
              n || 1 !== r.nodeType || k.cleanData(xe(r)),
                r.parentNode &&
                  (n && se(r) && we(xe(r, 'script')),
                  r.parentNode.removeChild(r));
            return e;
          }
          k.extend({
            htmlPrefilter: function (e) {
              return e;
            },
            clone: function (e, t, n) {
              var r,
                o,
                i,
                a,
                s = e.cloneNode(!0),
                c = se(e);
              if (
                !(
                  v.noCloneChecked ||
                  (1 !== e.nodeType && 11 !== e.nodeType) ||
                  k.isXMLDoc(e)
                )
              )
                for (a = xe(s), r = 0, o = (i = xe(e)).length; r < o; r++)
                  _e(i[r], a[r]);
              if (t)
                if (n)
                  for (
                    i = i || xe(e), a = a || xe(s), r = 0, o = i.length;
                    r < o;
                    r++
                  )
                    Re(i[r], a[r]);
                else Re(e, s);
              return (
                (a = xe(s, 'script')).length > 0 &&
                  we(a, !c && xe(e, 'script')),
                s
              );
            },
            cleanData: function (e) {
              for (
                var t, n, r, o = k.event.special, i = 0;
                void 0 !== (n = e[i]);
                i++
              )
                if (J(n)) {
                  if ((t = n[K.expando])) {
                    if (t.events)
                      for (r in t.events)
                        o[r]
                          ? k.event.remove(n, r)
                          : k.removeEvent(n, r, t.handle);
                    n[K.expando] = void 0;
                  }
                  n[Q.expando] && (n[Q.expando] = void 0);
                }
            },
          }),
            k.fn.extend({
              detach: function (e) {
                return Be(this, e, !0);
              },
              remove: function (e) {
                return Be(this, e);
              },
              text: function (e) {
                return z(
                  this,
                  function (e) {
                    return void 0 === e
                      ? k.text(this)
                      : this.empty().each(function () {
                          (1 !== this.nodeType &&
                            11 !== this.nodeType &&
                            9 !== this.nodeType) ||
                            (this.textContent = e);
                        });
                  },
                  null,
                  e,
                  arguments.length
                );
              },
              append: function () {
                return qe(this, arguments, function (e) {
                  (1 !== this.nodeType &&
                    11 !== this.nodeType &&
                    9 !== this.nodeType) ||
                    Me(this, e).appendChild(e);
                });
              },
              prepend: function () {
                return qe(this, arguments, function (e) {
                  if (
                    1 === this.nodeType ||
                    11 === this.nodeType ||
                    9 === this.nodeType
                  ) {
                    var t = Me(this, e);
                    t.insertBefore(e, t.firstChild);
                  }
                });
              },
              before: function () {
                return qe(this, arguments, function (e) {
                  this.parentNode && this.parentNode.insertBefore(e, this);
                });
              },
              after: function () {
                return qe(this, arguments, function (e) {
                  this.parentNode &&
                    this.parentNode.insertBefore(e, this.nextSibling);
                });
              },
              empty: function () {
                for (var e, t = 0; null != (e = this[t]); t++)
                  1 === e.nodeType &&
                    (k.cleanData(xe(e, !1)), (e.textContent = ''));
                return this;
              },
              clone: function (e, t) {
                return (
                  (e = null != e && e),
                  (t = null == t ? e : t),
                  this.map(function () {
                    return k.clone(this, e, t);
                  })
                );
              },
              html: function (e) {
                return z(
                  this,
                  function (e) {
                    var t = this[0] || {},
                      n = 0,
                      r = this.length;
                    if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                    if (
                      'string' == typeof e &&
                      !Pe.test(e) &&
                      !be[(me.exec(e) || ['', ''])[1].toLowerCase()]
                    ) {
                      e = k.htmlPrefilter(e);
                      try {
                        for (; n < r; n++)
                          1 === (t = this[n] || {}).nodeType &&
                            (k.cleanData(xe(t, !1)), (t.innerHTML = e));
                        t = 0;
                      } catch (e) {}
                    }
                    t && this.empty().append(e);
                  },
                  null,
                  e,
                  arguments.length
                );
              },
              replaceWith: function () {
                var e = [];
                return qe(
                  this,
                  arguments,
                  function (t) {
                    var n = this.parentNode;
                    k.inArray(this, e) < 0 &&
                      (k.cleanData(xe(this)), n && n.replaceChild(t, this));
                  },
                  e
                );
              },
            }),
            k.each(
              {
                appendTo: 'append',
                prependTo: 'prepend',
                insertBefore: 'before',
                insertAfter: 'after',
                replaceAll: 'replaceWith',
              },
              function (e, t) {
                k.fn[e] = function (e) {
                  for (
                    var n, r = [], o = k(e), i = o.length - 1, a = 0;
                    a <= i;
                    a++
                  )
                    (n = a === i ? this : this.clone(!0)),
                      k(o[a])[t](n),
                      l.apply(r, n.get());
                  return this.pushStack(r);
                };
              }
            );
          var Fe = new RegExp('^(' + re + ')(?!px)[a-z%]+$', 'i'),
            He = /^--/,
            We = function (e) {
              var t = e.ownerDocument.defaultView;
              return (t && t.opener) || (t = r), t.getComputedStyle(e);
            },
            Ve = function (e, t, n) {
              var r,
                o,
                i = {};
              for (o in t) (i[o] = e.style[o]), (e.style[o] = t[o]);
              for (o in ((r = n.call(e)), t)) e.style[o] = i[o];
              return r;
            },
            $e = new RegExp(ie.join('|'), 'i'),
            ze = '[\\x20\\t\\r\\n\\f]',
            Ue = new RegExp(
              '^' + ze + '+|((?:^|[^\\\\])(?:\\\\.)*)' + ze + '+$',
              'g'
            );
          function Ze(e, t, n) {
            var r,
              o,
              i,
              a,
              s = He.test(t),
              c = e.style;
            return (
              (n = n || We(e)) &&
                ((a = n.getPropertyValue(t) || n[t]),
                s && a && (a = a.replace(Ue, '$1') || void 0),
                '' !== a || se(e) || (a = k.style(e, t)),
                !v.pixelBoxStyles() &&
                  Fe.test(a) &&
                  $e.test(t) &&
                  ((r = c.width),
                  (o = c.minWidth),
                  (i = c.maxWidth),
                  (c.minWidth = c.maxWidth = c.width = a),
                  (a = n.width),
                  (c.width = r),
                  (c.minWidth = o),
                  (c.maxWidth = i))),
              void 0 !== a ? a + '' : a
            );
          }
          function Xe(e, t) {
            return {
              get: function () {
                if (!e()) return (this.get = t).apply(this, arguments);
                delete this.get;
              },
            };
          }
          !(function () {
            function e() {
              if (u) {
                (l.style.cssText =
                  'position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0'),
                  (u.style.cssText =
                    'position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%'),
                  ae.appendChild(l).appendChild(u);
                var e = r.getComputedStyle(u);
                (n = '1%' !== e.top),
                  (c = 12 === t(e.marginLeft)),
                  (u.style.right = '60%'),
                  (a = 36 === t(e.right)),
                  (o = 36 === t(e.width)),
                  (u.style.position = 'absolute'),
                  (i = 12 === t(u.offsetWidth / 3)),
                  ae.removeChild(l),
                  (u = null);
              }
            }
            function t(e) {
              return Math.round(parseFloat(e));
            }
            var n,
              o,
              i,
              a,
              s,
              c,
              l = b.createElement('div'),
              u = b.createElement('div');
            u.style &&
              ((u.style.backgroundClip = 'content-box'),
              (u.cloneNode(!0).style.backgroundClip = ''),
              (v.clearCloneStyle = 'content-box' === u.style.backgroundClip),
              k.extend(v, {
                boxSizingReliable: function () {
                  return e(), o;
                },
                pixelBoxStyles: function () {
                  return e(), a;
                },
                pixelPosition: function () {
                  return e(), n;
                },
                reliableMarginLeft: function () {
                  return e(), c;
                },
                scrollboxSize: function () {
                  return e(), i;
                },
                reliableTrDimensions: function () {
                  var e, t, n, o;
                  return (
                    null == s &&
                      ((e = b.createElement('table')),
                      (t = b.createElement('tr')),
                      (n = b.createElement('div')),
                      (e.style.cssText =
                        'position:absolute;left:-11111px;border-collapse:separate'),
                      (t.style.cssText = 'border:1px solid'),
                      (t.style.height = '1px'),
                      (n.style.height = '9px'),
                      (n.style.display = 'block'),
                      ae.appendChild(e).appendChild(t).appendChild(n),
                      (o = r.getComputedStyle(t)),
                      (s =
                        parseInt(o.height, 10) +
                          parseInt(o.borderTopWidth, 10) +
                          parseInt(o.borderBottomWidth, 10) ===
                        t.offsetHeight),
                      ae.removeChild(e)),
                    s
                  );
                },
              }));
          })();
          var Ge = ['Webkit', 'Moz', 'ms'],
            Je = b.createElement('div').style,
            Ye = {};
          function Ke(e) {
            return (
              k.cssProps[e] ||
              Ye[e] ||
              (e in Je
                ? e
                : (Ye[e] =
                    (function (e) {
                      for (
                        var t = e[0].toUpperCase() + e.slice(1), n = Ge.length;
                        n--;

                      )
                        if ((e = Ge[n] + t) in Je) return e;
                    })(e) || e))
            );
          }
          var Qe = /^(none|table(?!-c[ea]).+)/,
            et = {
              position: 'absolute',
              visibility: 'hidden',
              display: 'block',
            },
            tt = { letterSpacing: '0', fontWeight: '400' };
          function nt(e, t, n) {
            var r = oe.exec(t);
            return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || 'px') : t;
          }
          function rt(e, t, n, r, o, i) {
            var a = 'width' === t ? 1 : 0,
              s = 0,
              c = 0;
            if (n === (r ? 'border' : 'content')) return 0;
            for (; a < 4; a += 2)
              'margin' === n && (c += k.css(e, n + ie[a], !0, o)),
                r
                  ? ('content' === n &&
                      (c -= k.css(e, 'padding' + ie[a], !0, o)),
                    'margin' !== n &&
                      (c -= k.css(e, 'border' + ie[a] + 'Width', !0, o)))
                  : ((c += k.css(e, 'padding' + ie[a], !0, o)),
                    'padding' !== n
                      ? (c += k.css(e, 'border' + ie[a] + 'Width', !0, o))
                      : (s += k.css(e, 'border' + ie[a] + 'Width', !0, o)));
            return (
              !r &&
                i >= 0 &&
                (c +=
                  Math.max(
                    0,
                    Math.ceil(
                      e['offset' + t[0].toUpperCase() + t.slice(1)] -
                        i -
                        c -
                        s -
                        0.5
                    )
                  ) || 0),
              c
            );
          }
          function ot(e, t, n) {
            var r = We(e),
              o =
                (!v.boxSizingReliable() || n) &&
                'border-box' === k.css(e, 'boxSizing', !1, r),
              i = o,
              a = Ze(e, t, r),
              s = 'offset' + t[0].toUpperCase() + t.slice(1);
            if (Fe.test(a)) {
              if (!n) return a;
              a = 'auto';
            }
            return (
              ((!v.boxSizingReliable() && o) ||
                (!v.reliableTrDimensions() && P(e, 'tr')) ||
                'auto' === a ||
                (!parseFloat(a) && 'inline' === k.css(e, 'display', !1, r))) &&
                e.getClientRects().length &&
                ((o = 'border-box' === k.css(e, 'boxSizing', !1, r)),
                (i = s in e) && (a = e[s])),
              (a = parseFloat(a) || 0) +
                rt(e, t, n || (o ? 'border' : 'content'), i, r, a) +
                'px'
            );
          }
          function it(e, t, n, r, o) {
            return new it.prototype.init(e, t, n, r, o);
          }
          k.extend({
            cssHooks: {
              opacity: {
                get: function (e, t) {
                  if (t) {
                    var n = Ze(e, 'opacity');
                    return '' === n ? '1' : n;
                  }
                },
              },
            },
            cssNumber: {
              animationIterationCount: !0,
              columnCount: !0,
              fillOpacity: !0,
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
              widows: !0,
              zIndex: !0,
              zoom: !0,
            },
            cssProps: {},
            style: function (e, t, n, r) {
              if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o,
                  i,
                  a,
                  s = G(t),
                  c = He.test(t),
                  l = e.style;
                if (
                  (c || (t = Ke(s)),
                  (a = k.cssHooks[t] || k.cssHooks[s]),
                  void 0 === n)
                )
                  return a && 'get' in a && void 0 !== (o = a.get(e, !1, r))
                    ? o
                    : l[t];
                'string' == (i = typeof n) &&
                  (o = oe.exec(n)) &&
                  o[1] &&
                  ((n = ue(e, t, o)), (i = 'number')),
                  null != n &&
                    n == n &&
                    ('number' !== i ||
                      c ||
                      (n += (o && o[3]) || (k.cssNumber[s] ? '' : 'px')),
                    v.clearCloneStyle ||
                      '' !== n ||
                      0 !== t.indexOf('background') ||
                      (l[t] = 'inherit'),
                    (a && 'set' in a && void 0 === (n = a.set(e, n, r))) ||
                      (c ? l.setProperty(t, n) : (l[t] = n)));
              }
            },
            css: function (e, t, n, r) {
              var o,
                i,
                a,
                s = G(t);
              return (
                He.test(t) || (t = Ke(s)),
                (a = k.cssHooks[t] || k.cssHooks[s]) &&
                  'get' in a &&
                  (o = a.get(e, !0, n)),
                void 0 === o && (o = Ze(e, t, r)),
                'normal' === o && t in tt && (o = tt[t]),
                '' === n || n
                  ? ((i = parseFloat(o)), !0 === n || isFinite(i) ? i || 0 : o)
                  : o
              );
            },
          }),
            k.each(['height', 'width'], function (e, t) {
              k.cssHooks[t] = {
                get: function (e, n, r) {
                  if (n)
                    return !Qe.test(k.css(e, 'display')) ||
                      (e.getClientRects().length &&
                        e.getBoundingClientRect().width)
                      ? ot(e, t, r)
                      : Ve(e, et, function () {
                          return ot(e, t, r);
                        });
                },
                set: function (e, n, r) {
                  var o,
                    i = We(e),
                    a = !v.scrollboxSize() && 'absolute' === i.position,
                    s =
                      (a || r) && 'border-box' === k.css(e, 'boxSizing', !1, i),
                    c = r ? rt(e, t, r, s, i) : 0;
                  return (
                    s &&
                      a &&
                      (c -= Math.ceil(
                        e['offset' + t[0].toUpperCase() + t.slice(1)] -
                          parseFloat(i[t]) -
                          rt(e, t, 'border', !1, i) -
                          0.5
                      )),
                    c &&
                      (o = oe.exec(n)) &&
                      'px' !== (o[3] || 'px') &&
                      ((e.style[t] = n), (n = k.css(e, t))),
                    nt(0, n, c)
                  );
                },
              };
            }),
            (k.cssHooks.marginLeft = Xe(v.reliableMarginLeft, function (e, t) {
              if (t)
                return (
                  (parseFloat(Ze(e, 'marginLeft')) ||
                    e.getBoundingClientRect().left -
                      Ve(e, { marginLeft: 0 }, function () {
                        return e.getBoundingClientRect().left;
                      })) + 'px'
                );
            })),
            k.each(
              { margin: '', padding: '', border: 'Width' },
              function (e, t) {
                (k.cssHooks[e + t] = {
                  expand: function (n) {
                    for (
                      var r = 0,
                        o = {},
                        i = 'string' == typeof n ? n.split(' ') : [n];
                      r < 4;
                      r++
                    )
                      o[e + ie[r] + t] = i[r] || i[r - 2] || i[0];
                    return o;
                  },
                }),
                  'margin' !== e && (k.cssHooks[e + t].set = nt);
              }
            ),
            k.fn.extend({
              css: function (e, t) {
                return z(
                  this,
                  function (e, t, n) {
                    var r,
                      o,
                      i = {},
                      a = 0;
                    if (Array.isArray(t)) {
                      for (r = We(e), o = t.length; a < o; a++)
                        i[t[a]] = k.css(e, t[a], !1, r);
                      return i;
                    }
                    return void 0 !== n ? k.style(e, t, n) : k.css(e, t);
                  },
                  e,
                  t,
                  arguments.length > 1
                );
              },
            }),
            (k.Tween = it),
            (it.prototype = {
              constructor: it,
              init: function (e, t, n, r, o, i) {
                (this.elem = e),
                  (this.prop = n),
                  (this.easing = o || k.easing._default),
                  (this.options = t),
                  (this.start = this.now = this.cur()),
                  (this.end = r),
                  (this.unit = i || (k.cssNumber[n] ? '' : 'px'));
              },
              cur: function () {
                var e = it.propHooks[this.prop];
                return e && e.get
                  ? e.get(this)
                  : it.propHooks._default.get(this);
              },
              run: function (e) {
                var t,
                  n = it.propHooks[this.prop];
                return (
                  this.options.duration
                    ? (this.pos = t =
                        k.easing[this.easing](
                          e,
                          this.options.duration * e,
                          0,
                          1,
                          this.options.duration
                        ))
                    : (this.pos = t = e),
                  (this.now = (this.end - this.start) * t + this.start),
                  this.options.step &&
                    this.options.step.call(this.elem, this.now, this),
                  n && n.set ? n.set(this) : it.propHooks._default.set(this),
                  this
                );
              },
            }),
            (it.prototype.init.prototype = it.prototype),
            (it.propHooks = {
              _default: {
                get: function (e) {
                  var t;
                  return 1 !== e.elem.nodeType ||
                    (null != e.elem[e.prop] && null == e.elem.style[e.prop])
                    ? e.elem[e.prop]
                    : (t = k.css(e.elem, e.prop, '')) && 'auto' !== t
                    ? t
                    : 0;
                },
                set: function (e) {
                  k.fx.step[e.prop]
                    ? k.fx.step[e.prop](e)
                    : 1 !== e.elem.nodeType ||
                      (!k.cssHooks[e.prop] && null == e.elem.style[Ke(e.prop)])
                    ? (e.elem[e.prop] = e.now)
                    : k.style(e.elem, e.prop, e.now + e.unit);
                },
              },
            }),
            (it.propHooks.scrollTop = it.propHooks.scrollLeft =
              {
                set: function (e) {
                  e.elem.nodeType &&
                    e.elem.parentNode &&
                    (e.elem[e.prop] = e.now);
                },
              }),
            (k.easing = {
              linear: function (e) {
                return e;
              },
              swing: function (e) {
                return 0.5 - Math.cos(e * Math.PI) / 2;
              },
              _default: 'swing',
            }),
            (k.fx = it.prototype.init),
            (k.fx.step = {});
          var at,
            st,
            ct = /^(?:toggle|show|hide)$/,
            lt = /queueHooks$/;
          function ut() {
            st &&
              (!1 === b.hidden && r.requestAnimationFrame
                ? r.requestAnimationFrame(ut)
                : r.setTimeout(ut, k.fx.interval),
              k.fx.tick());
          }
          function pt() {
            return (
              r.setTimeout(function () {
                at = void 0;
              }),
              (at = Date.now())
            );
          }
          function dt(e, t) {
            var n,
              r = 0,
              o = { height: e };
            for (t = t ? 1 : 0; r < 4; r += 2 - t)
              o['margin' + (n = ie[r])] = o['padding' + n] = e;
            return t && (o.opacity = o.width = e), o;
          }
          function ft(e, t, n) {
            for (
              var r,
                o = (ht.tweeners[t] || []).concat(ht.tweeners['*']),
                i = 0,
                a = o.length;
              i < a;
              i++
            )
              if ((r = o[i].call(n, t, e))) return r;
          }
          function ht(e, t, n) {
            var r,
              o,
              i = 0,
              a = ht.prefilters.length,
              s = k.Deferred().always(function () {
                delete c.elem;
              }),
              c = function () {
                if (o) return !1;
                for (
                  var t = at || pt(),
                    n = Math.max(0, l.startTime + l.duration - t),
                    r = 1 - (n / l.duration || 0),
                    i = 0,
                    a = l.tweens.length;
                  i < a;
                  i++
                )
                  l.tweens[i].run(r);
                return (
                  s.notifyWith(e, [l, r, n]),
                  r < 1 && a
                    ? n
                    : (a || s.notifyWith(e, [l, 1, 0]),
                      s.resolveWith(e, [l]),
                      !1)
                );
              },
              l = s.promise({
                elem: e,
                props: k.extend({}, t),
                opts: k.extend(
                  !0,
                  { specialEasing: {}, easing: k.easing._default },
                  n
                ),
                originalProperties: t,
                originalOptions: n,
                startTime: at || pt(),
                duration: n.duration,
                tweens: [],
                createTween: function (t, n) {
                  var r = k.Tween(
                    e,
                    l.opts,
                    t,
                    n,
                    l.opts.specialEasing[t] || l.opts.easing
                  );
                  return l.tweens.push(r), r;
                },
                stop: function (t) {
                  var n = 0,
                    r = t ? l.tweens.length : 0;
                  if (o) return this;
                  for (o = !0; n < r; n++) l.tweens[n].run(1);
                  return (
                    t
                      ? (s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t]))
                      : s.rejectWith(e, [l, t]),
                    this
                  );
                },
              }),
              u = l.props;
            for (
              (function (e, t) {
                var n, r, o, i, a;
                for (n in e)
                  if (
                    ((o = t[(r = G(n))]),
                    (i = e[n]),
                    Array.isArray(i) && ((o = i[1]), (i = e[n] = i[0])),
                    n !== r && ((e[r] = i), delete e[n]),
                    (a = k.cssHooks[r]) && ('expand' in a))
                  )
                    for (n in ((i = a.expand(i)), delete e[r], i))
                      (n in e) || ((e[n] = i[n]), (t[n] = o));
                  else t[r] = o;
              })(u, l.opts.specialEasing);
              i < a;
              i++
            )
              if ((r = ht.prefilters[i].call(l, e, u, l.opts)))
                return (
                  m(r.stop) &&
                    (k._queueHooks(l.elem, l.opts.queue).stop = r.stop.bind(r)),
                  r
                );
            return (
              k.map(u, ft, l),
              m(l.opts.start) && l.opts.start.call(e, l),
              l
                .progress(l.opts.progress)
                .done(l.opts.done, l.opts.complete)
                .fail(l.opts.fail)
                .always(l.opts.always),
              k.fx.timer(
                k.extend(c, { elem: e, anim: l, queue: l.opts.queue })
              ),
              l
            );
          }
          (k.Animation = k.extend(ht, {
            tweeners: {
              '*': [
                function (e, t) {
                  var n = this.createTween(e, t);
                  return ue(n.elem, e, oe.exec(t), n), n;
                },
              ],
            },
            tweener: function (e, t) {
              m(e) ? ((t = e), (e = ['*'])) : (e = e.match(q));
              for (var n, r = 0, o = e.length; r < o; r++)
                (n = e[r]),
                  (ht.tweeners[n] = ht.tweeners[n] || []),
                  ht.tweeners[n].unshift(t);
            },
            prefilters: [
              function (e, t, n) {
                var r,
                  o,
                  i,
                  a,
                  s,
                  c,
                  l,
                  u,
                  p = 'width' in t || 'height' in t,
                  d = this,
                  f = {},
                  h = e.style,
                  g = e.nodeType && le(e),
                  v = K.get(e, 'fxshow');
                for (r in (n.queue ||
                  (null == (a = k._queueHooks(e, 'fx')).unqueued &&
                    ((a.unqueued = 0),
                    (s = a.empty.fire),
                    (a.empty.fire = function () {
                      a.unqueued || s();
                    })),
                  a.unqueued++,
                  d.always(function () {
                    d.always(function () {
                      a.unqueued--, k.queue(e, 'fx').length || a.empty.fire();
                    });
                  })),
                t))
                  if (((o = t[r]), ct.test(o))) {
                    if (
                      (delete t[r],
                      (i = i || 'toggle' === o),
                      o === (g ? 'hide' : 'show'))
                    ) {
                      if ('show' !== o || !v || void 0 === v[r]) continue;
                      g = !0;
                    }
                    f[r] = (v && v[r]) || k.style(e, r);
                  }
                if ((c = !k.isEmptyObject(t)) || !k.isEmptyObject(f))
                  for (r in (p &&
                    1 === e.nodeType &&
                    ((n.overflow = [h.overflow, h.overflowX, h.overflowY]),
                    null == (l = v && v.display) && (l = K.get(e, 'display')),
                    'none' === (u = k.css(e, 'display')) &&
                      (l
                        ? (u = l)
                        : (fe([e], !0),
                          (l = e.style.display || l),
                          (u = k.css(e, 'display')),
                          fe([e]))),
                    ('inline' === u || ('inline-block' === u && null != l)) &&
                      'none' === k.css(e, 'float') &&
                      (c ||
                        (d.done(function () {
                          h.display = l;
                        }),
                        null == l &&
                          ((u = h.display), (l = 'none' === u ? '' : u))),
                      (h.display = 'inline-block'))),
                  n.overflow &&
                    ((h.overflow = 'hidden'),
                    d.always(function () {
                      (h.overflow = n.overflow[0]),
                        (h.overflowX = n.overflow[1]),
                        (h.overflowY = n.overflow[2]);
                    })),
                  (c = !1),
                  f))
                    c ||
                      (v
                        ? 'hidden' in v && (g = v.hidden)
                        : (v = K.access(e, 'fxshow', { display: l })),
                      i && (v.hidden = !g),
                      g && fe([e], !0),
                      d.done(function () {
                        for (r in (g || fe([e]), K.remove(e, 'fxshow'), f))
                          k.style(e, r, f[r]);
                      })),
                      (c = ft(g ? v[r] : 0, r, d)),
                      r in v ||
                        ((v[r] = c.start),
                        g && ((c.end = c.start), (c.start = 0)));
              },
            ],
            prefilter: function (e, t) {
              t ? ht.prefilters.unshift(e) : ht.prefilters.push(e);
            },
          })),
            (k.speed = function (e, t, n) {
              var r =
                e && 'object' == typeof e
                  ? k.extend({}, e)
                  : {
                      complete: n || (!n && t) || (m(e) && e),
                      duration: e,
                      easing: (n && t) || (t && !m(t) && t),
                    };
              return (
                k.fx.off
                  ? (r.duration = 0)
                  : 'number' != typeof r.duration &&
                    (r.duration in k.fx.speeds
                      ? (r.duration = k.fx.speeds[r.duration])
                      : (r.duration = k.fx.speeds._default)),
                (null != r.queue && !0 !== r.queue) || (r.queue = 'fx'),
                (r.old = r.complete),
                (r.complete = function () {
                  m(r.old) && r.old.call(this),
                    r.queue && k.dequeue(this, r.queue);
                }),
                r
              );
            }),
            k.fn.extend({
              fadeTo: function (e, t, n, r) {
                return this.filter(le)
                  .css('opacity', 0)
                  .show()
                  .end()
                  .animate({ opacity: t }, e, n, r);
              },
              animate: function (e, t, n, r) {
                var o = k.isEmptyObject(e),
                  i = k.speed(t, n, r),
                  a = function () {
                    var t = ht(this, k.extend({}, e), i);
                    (o || K.get(this, 'finish')) && t.stop(!0);
                  };
                return (
                  (a.finish = a),
                  o || !1 === i.queue ? this.each(a) : this.queue(i.queue, a)
                );
              },
              stop: function (e, t, n) {
                var r = function (e) {
                  var t = e.stop;
                  delete e.stop, t(n);
                };
                return (
                  'string' != typeof e && ((n = t), (t = e), (e = void 0)),
                  t && this.queue(e || 'fx', []),
                  this.each(function () {
                    var t = !0,
                      o = null != e && e + 'queueHooks',
                      i = k.timers,
                      a = K.get(this);
                    if (o) a[o] && a[o].stop && r(a[o]);
                    else
                      for (o in a) a[o] && a[o].stop && lt.test(o) && r(a[o]);
                    for (o = i.length; o--; )
                      i[o].elem !== this ||
                        (null != e && i[o].queue !== e) ||
                        (i[o].anim.stop(n), (t = !1), i.splice(o, 1));
                    (!t && n) || k.dequeue(this, e);
                  })
                );
              },
              finish: function (e) {
                return (
                  !1 !== e && (e = e || 'fx'),
                  this.each(function () {
                    var t,
                      n = K.get(this),
                      r = n[e + 'queue'],
                      o = n[e + 'queueHooks'],
                      i = k.timers,
                      a = r ? r.length : 0;
                    for (
                      n.finish = !0,
                        k.queue(this, e, []),
                        o && o.stop && o.stop.call(this, !0),
                        t = i.length;
                      t--;

                    )
                      i[t].elem === this &&
                        i[t].queue === e &&
                        (i[t].anim.stop(!0), i.splice(t, 1));
                    for (t = 0; t < a; t++)
                      r[t] && r[t].finish && r[t].finish.call(this);
                    delete n.finish;
                  })
                );
              },
            }),
            k.each(['toggle', 'show', 'hide'], function (e, t) {
              var n = k.fn[t];
              k.fn[t] = function (e, r, o) {
                return null == e || 'boolean' == typeof e
                  ? n.apply(this, arguments)
                  : this.animate(dt(t, !0), e, r, o);
              };
            }),
            k.each(
              {
                slideDown: dt('show'),
                slideUp: dt('hide'),
                slideToggle: dt('toggle'),
                fadeIn: { opacity: 'show' },
                fadeOut: { opacity: 'hide' },
                fadeToggle: { opacity: 'toggle' },
              },
              function (e, t) {
                k.fn[e] = function (e, n, r) {
                  return this.animate(t, e, n, r);
                };
              }
            ),
            (k.timers = []),
            (k.fx.tick = function () {
              var e,
                t = 0,
                n = k.timers;
              for (at = Date.now(); t < n.length; t++)
                (e = n[t])() || n[t] !== e || n.splice(t--, 1);
              n.length || k.fx.stop(), (at = void 0);
            }),
            (k.fx.timer = function (e) {
              k.timers.push(e), k.fx.start();
            }),
            (k.fx.interval = 13),
            (k.fx.start = function () {
              st || ((st = !0), ut());
            }),
            (k.fx.stop = function () {
              st = null;
            }),
            (k.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
            (k.fn.delay = function (e, t) {
              return (
                (e = (k.fx && k.fx.speeds[e]) || e),
                (t = t || 'fx'),
                this.queue(t, function (t, n) {
                  var o = r.setTimeout(t, e);
                  n.stop = function () {
                    r.clearTimeout(o);
                  };
                })
              );
            }),
            (function () {
              var e = b.createElement('input'),
                t = b
                  .createElement('select')
                  .appendChild(b.createElement('option'));
              (e.type = 'checkbox'),
                (v.checkOn = '' !== e.value),
                (v.optSelected = t.selected),
                ((e = b.createElement('input')).value = 't'),
                (e.type = 'radio'),
                (v.radioValue = 't' === e.value);
            })();
          var gt,
            vt = k.expr.attrHandle;
          k.fn.extend({
            attr: function (e, t) {
              return z(this, k.attr, e, t, arguments.length > 1);
            },
            removeAttr: function (e) {
              return this.each(function () {
                k.removeAttr(this, e);
              });
            },
          }),
            k.extend({
              attr: function (e, t, n) {
                var r,
                  o,
                  i = e.nodeType;
                if (3 !== i && 8 !== i && 2 !== i)
                  return void 0 === e.getAttribute
                    ? k.prop(e, t, n)
                    : ((1 === i && k.isXMLDoc(e)) ||
                        (o =
                          k.attrHooks[t.toLowerCase()] ||
                          (k.expr.match.bool.test(t) ? gt : void 0)),
                      void 0 !== n
                        ? null === n
                          ? void k.removeAttr(e, t)
                          : o && 'set' in o && void 0 !== (r = o.set(e, n, t))
                          ? r
                          : (e.setAttribute(t, n + ''), n)
                        : o && 'get' in o && null !== (r = o.get(e, t))
                        ? r
                        : null == (r = k.find.attr(e, t))
                        ? void 0
                        : r);
              },
              attrHooks: {
                type: {
                  set: function (e, t) {
                    if (!v.radioValue && 'radio' === t && P(e, 'input')) {
                      var n = e.value;
                      return e.setAttribute('type', t), n && (e.value = n), t;
                    }
                  },
                },
              },
              removeAttr: function (e, t) {
                var n,
                  r = 0,
                  o = t && t.match(q);
                if (o && 1 === e.nodeType)
                  for (; (n = o[r++]); ) e.removeAttribute(n);
              },
            }),
            (gt = {
              set: function (e, t, n) {
                return !1 === t ? k.removeAttr(e, n) : e.setAttribute(n, n), n;
              },
            }),
            k.each(k.expr.match.bool.source.match(/\w+/g), function (e, t) {
              var n = vt[t] || k.find.attr;
              vt[t] = function (e, t, r) {
                var o,
                  i,
                  a = t.toLowerCase();
                return (
                  r ||
                    ((i = vt[a]),
                    (vt[a] = o),
                    (o = null != n(e, t, r) ? a : null),
                    (vt[a] = i)),
                  o
                );
              };
            });
          var mt = /^(?:input|select|textarea|button)$/i,
            yt = /^(?:a|area)$/i;
          function bt(e) {
            return (e.match(q) || []).join(' ');
          }
          function xt(e) {
            return (e.getAttribute && e.getAttribute('class')) || '';
          }
          function wt(e) {
            return Array.isArray(e)
              ? e
              : ('string' == typeof e && e.match(q)) || [];
          }
          k.fn.extend({
            prop: function (e, t) {
              return z(this, k.prop, e, t, arguments.length > 1);
            },
            removeProp: function (e) {
              return this.each(function () {
                delete this[k.propFix[e] || e];
              });
            },
          }),
            k.extend({
              prop: function (e, t, n) {
                var r,
                  o,
                  i = e.nodeType;
                if (3 !== i && 8 !== i && 2 !== i)
                  return (
                    (1 === i && k.isXMLDoc(e)) ||
                      ((t = k.propFix[t] || t), (o = k.propHooks[t])),
                    void 0 !== n
                      ? o && 'set' in o && void 0 !== (r = o.set(e, n, t))
                        ? r
                        : (e[t] = n)
                      : o && 'get' in o && null !== (r = o.get(e, t))
                      ? r
                      : e[t]
                  );
              },
              propHooks: {
                tabIndex: {
                  get: function (e) {
                    var t = k.find.attr(e, 'tabindex');
                    return t
                      ? parseInt(t, 10)
                      : mt.test(e.nodeName) || (yt.test(e.nodeName) && e.href)
                      ? 0
                      : -1;
                  },
                },
              },
              propFix: { for: 'htmlFor', class: 'className' },
            }),
            v.optSelected ||
              (k.propHooks.selected = {
                get: function (e) {
                  var t = e.parentNode;
                  return t && t.parentNode && t.parentNode.selectedIndex, null;
                },
                set: function (e) {
                  var t = e.parentNode;
                  t &&
                    (t.selectedIndex,
                    t.parentNode && t.parentNode.selectedIndex);
                },
              }),
            k.each(
              [
                'tabIndex',
                'readOnly',
                'maxLength',
                'cellSpacing',
                'cellPadding',
                'rowSpan',
                'colSpan',
                'useMap',
                'frameBorder',
                'contentEditable',
              ],
              function () {
                k.propFix[this.toLowerCase()] = this;
              }
            ),
            k.fn.extend({
              addClass: function (e) {
                var t, n, r, o, i, a;
                return m(e)
                  ? this.each(function (t) {
                      k(this).addClass(e.call(this, t, xt(this)));
                    })
                  : (t = wt(e)).length
                  ? this.each(function () {
                      if (
                        ((r = xt(this)),
                        (n = 1 === this.nodeType && ' ' + bt(r) + ' '))
                      ) {
                        for (i = 0; i < t.length; i++)
                          (o = t[i]),
                            n.indexOf(' ' + o + ' ') < 0 && (n += o + ' ');
                        (a = bt(n)), r !== a && this.setAttribute('class', a);
                      }
                    })
                  : this;
              },
              removeClass: function (e) {
                var t, n, r, o, i, a;
                return m(e)
                  ? this.each(function (t) {
                      k(this).removeClass(e.call(this, t, xt(this)));
                    })
                  : arguments.length
                  ? (t = wt(e)).length
                    ? this.each(function () {
                        if (
                          ((r = xt(this)),
                          (n = 1 === this.nodeType && ' ' + bt(r) + ' '))
                        ) {
                          for (i = 0; i < t.length; i++)
                            for (o = t[i]; n.indexOf(' ' + o + ' ') > -1; )
                              n = n.replace(' ' + o + ' ', ' ');
                          (a = bt(n)), r !== a && this.setAttribute('class', a);
                        }
                      })
                    : this
                  : this.attr('class', '');
              },
              toggleClass: function (e, t) {
                var n,
                  r,
                  o,
                  i,
                  a = typeof e,
                  s = 'string' === a || Array.isArray(e);
                return m(e)
                  ? this.each(function (n) {
                      k(this).toggleClass(e.call(this, n, xt(this), t), t);
                    })
                  : 'boolean' == typeof t && s
                  ? t
                    ? this.addClass(e)
                    : this.removeClass(e)
                  : ((n = wt(e)),
                    this.each(function () {
                      if (s)
                        for (i = k(this), o = 0; o < n.length; o++)
                          (r = n[o]),
                            i.hasClass(r) ? i.removeClass(r) : i.addClass(r);
                      else
                        (void 0 !== e && 'boolean' !== a) ||
                          ((r = xt(this)) && K.set(this, '__className__', r),
                          this.setAttribute &&
                            this.setAttribute(
                              'class',
                              r || !1 === e
                                ? ''
                                : K.get(this, '__className__') || ''
                            ));
                    }));
              },
              hasClass: function (e) {
                var t,
                  n,
                  r = 0;
                for (t = ' ' + e + ' '; (n = this[r++]); )
                  if (
                    1 === n.nodeType &&
                    (' ' + bt(xt(n)) + ' ').indexOf(t) > -1
                  )
                    return !0;
                return !1;
              },
            });
          var St = /\r/g;
          k.fn.extend({
            val: function (e) {
              var t,
                n,
                r,
                o = this[0];
              return arguments.length
                ? ((r = m(e)),
                  this.each(function (n) {
                    var o;
                    1 === this.nodeType &&
                      (null == (o = r ? e.call(this, n, k(this).val()) : e)
                        ? (o = '')
                        : 'number' == typeof o
                        ? (o += '')
                        : Array.isArray(o) &&
                          (o = k.map(o, function (e) {
                            return null == e ? '' : e + '';
                          })),
                      ((t =
                        k.valHooks[this.type] ||
                        k.valHooks[this.nodeName.toLowerCase()]) &&
                        'set' in t &&
                        void 0 !== t.set(this, o, 'value')) ||
                        (this.value = o));
                  }))
                : o
                ? (t =
                    k.valHooks[o.type] ||
                    k.valHooks[o.nodeName.toLowerCase()]) &&
                  'get' in t &&
                  void 0 !== (n = t.get(o, 'value'))
                  ? n
                  : 'string' == typeof (n = o.value)
                  ? n.replace(St, '')
                  : null == n
                  ? ''
                  : n
                : void 0;
            },
          }),
            k.extend({
              valHooks: {
                option: {
                  get: function (e) {
                    var t = k.find.attr(e, 'value');
                    return null != t ? t : bt(k.text(e));
                  },
                },
                select: {
                  get: function (e) {
                    var t,
                      n,
                      r,
                      o = e.options,
                      i = e.selectedIndex,
                      a = 'select-one' === e.type,
                      s = a ? null : [],
                      c = a ? i + 1 : o.length;
                    for (r = i < 0 ? c : a ? i : 0; r < c; r++)
                      if (
                        ((n = o[r]).selected || r === i) &&
                        !n.disabled &&
                        (!n.parentNode.disabled || !P(n.parentNode, 'optgroup'))
                      ) {
                        if (((t = k(n).val()), a)) return t;
                        s.push(t);
                      }
                    return s;
                  },
                  set: function (e, t) {
                    for (
                      var n, r, o = e.options, i = k.makeArray(t), a = o.length;
                      a--;

                    )
                      ((r = o[a]).selected =
                        k.inArray(k.valHooks.option.get(r), i) > -1) &&
                        (n = !0);
                    return n || (e.selectedIndex = -1), i;
                  },
                },
              },
            }),
            k.each(['radio', 'checkbox'], function () {
              (k.valHooks[this] = {
                set: function (e, t) {
                  if (Array.isArray(t))
                    return (e.checked = k.inArray(k(e).val(), t) > -1);
                },
              }),
                v.checkOn ||
                  (k.valHooks[this].get = function (e) {
                    return null === e.getAttribute('value') ? 'on' : e.value;
                  });
            }),
            (v.focusin = 'onfocusin' in r);
          var Ct = /^(?:focusinfocus|focusoutblur)$/,
            kt = function (e) {
              e.stopPropagation();
            };
          k.extend(k.event, {
            trigger: function (e, t, n, o) {
              var i,
                a,
                s,
                c,
                l,
                u,
                p,
                d,
                h = [n || b],
                g = f.call(e, 'type') ? e.type : e,
                v = f.call(e, 'namespace') ? e.namespace.split('.') : [];
              if (
                ((a = d = s = n = n || b),
                3 !== n.nodeType &&
                  8 !== n.nodeType &&
                  !Ct.test(g + k.event.triggered) &&
                  (g.indexOf('.') > -1 &&
                    ((v = g.split('.')), (g = v.shift()), v.sort()),
                  (l = g.indexOf(':') < 0 && 'on' + g),
                  ((e = e[k.expando]
                    ? e
                    : new k.Event(g, 'object' == typeof e && e)).isTrigger = o
                    ? 2
                    : 3),
                  (e.namespace = v.join('.')),
                  (e.rnamespace = e.namespace
                    ? new RegExp(
                        '(^|\\.)' + v.join('\\.(?:.*\\.|)') + '(\\.|$)'
                      )
                    : null),
                  (e.result = void 0),
                  e.target || (e.target = n),
                  (t = null == t ? [e] : k.makeArray(t, [e])),
                  (p = k.event.special[g] || {}),
                  o || !p.trigger || !1 !== p.trigger.apply(n, t)))
              ) {
                if (!o && !p.noBubble && !y(n)) {
                  for (
                    c = p.delegateType || g,
                      Ct.test(c + g) || (a = a.parentNode);
                    a;
                    a = a.parentNode
                  )
                    h.push(a), (s = a);
                  s === (n.ownerDocument || b) &&
                    h.push(s.defaultView || s.parentWindow || r);
                }
                for (i = 0; (a = h[i++]) && !e.isPropagationStopped(); )
                  (d = a),
                    (e.type = i > 1 ? c : p.bindType || g),
                    (u =
                      (K.get(a, 'events') || Object.create(null))[e.type] &&
                      K.get(a, 'handle')) && u.apply(a, t),
                    (u = l && a[l]) &&
                      u.apply &&
                      J(a) &&
                      ((e.result = u.apply(a, t)),
                      !1 === e.result && e.preventDefault());
                return (
                  (e.type = g),
                  o ||
                    e.isDefaultPrevented() ||
                    (p._default && !1 !== p._default.apply(h.pop(), t)) ||
                    !J(n) ||
                    (l &&
                      m(n[g]) &&
                      !y(n) &&
                      ((s = n[l]) && (n[l] = null),
                      (k.event.triggered = g),
                      e.isPropagationStopped() && d.addEventListener(g, kt),
                      n[g](),
                      e.isPropagationStopped() && d.removeEventListener(g, kt),
                      (k.event.triggered = void 0),
                      s && (n[l] = s))),
                  e.result
                );
              }
            },
            simulate: function (e, t, n) {
              var r = k.extend(new k.Event(), n, { type: e, isSimulated: !0 });
              k.event.trigger(r, null, t);
            },
          }),
            k.fn.extend({
              trigger: function (e, t) {
                return this.each(function () {
                  k.event.trigger(e, t, this);
                });
              },
              triggerHandler: function (e, t) {
                var n = this[0];
                if (n) return k.event.trigger(e, t, n, !0);
              },
            }),
            v.focusin ||
              k.each({ focus: 'focusin', blur: 'focusout' }, function (e, t) {
                var n = function (e) {
                  k.event.simulate(t, e.target, k.event.fix(e));
                };
                k.event.special[t] = {
                  setup: function () {
                    var r = this.ownerDocument || this.document || this,
                      o = K.access(r, t);
                    o || r.addEventListener(e, n, !0),
                      K.access(r, t, (o || 0) + 1);
                  },
                  teardown: function () {
                    var r = this.ownerDocument || this.document || this,
                      o = K.access(r, t) - 1;
                    o
                      ? K.access(r, t, o)
                      : (r.removeEventListener(e, n, !0), K.remove(r, t));
                  },
                };
              });
          var Et = r.location,
            Tt = { guid: Date.now() },
            At = /\?/;
          k.parseXML = function (e) {
            var t, n;
            if (!e || 'string' != typeof e) return null;
            try {
              t = new r.DOMParser().parseFromString(e, 'text/xml');
            } catch (e) {}
            return (
              (n = t && t.getElementsByTagName('parsererror')[0]),
              (t && !n) ||
                k.error(
                  'Invalid XML: ' +
                    (n
                      ? k
                          .map(n.childNodes, function (e) {
                            return e.textContent;
                          })
                          .join('\n')
                      : e)
                ),
              t
            );
          };
          var jt = /\[\]$/,
            Nt = /\r?\n/g,
            Pt = /^(?:submit|button|image|reset|file)$/i,
            Ot = /^(?:input|select|textarea|keygen)/i;
          function Lt(e, t, n, r) {
            var o;
            if (Array.isArray(t))
              k.each(t, function (t, o) {
                n || jt.test(e)
                  ? r(e, o)
                  : Lt(
                      e +
                        '[' +
                        ('object' == typeof o && null != o ? t : '') +
                        ']',
                      o,
                      n,
                      r
                    );
              });
            else if (n || 'object' !== S(t)) r(e, t);
            else for (o in t) Lt(e + '[' + o + ']', t[o], n, r);
          }
          (k.param = function (e, t) {
            var n,
              r = [],
              o = function (e, t) {
                var n = m(t) ? t() : t;
                r[r.length] =
                  encodeURIComponent(e) +
                  '=' +
                  encodeURIComponent(null == n ? '' : n);
              };
            if (null == e) return '';
            if (Array.isArray(e) || (e.jquery && !k.isPlainObject(e)))
              k.each(e, function () {
                o(this.name, this.value);
              });
            else for (n in e) Lt(n, e[n], t, o);
            return r.join('&');
          }),
            k.fn.extend({
              serialize: function () {
                return k.param(this.serializeArray());
              },
              serializeArray: function () {
                return this.map(function () {
                  var e = k.prop(this, 'elements');
                  return e ? k.makeArray(e) : this;
                })
                  .filter(function () {
                    var e = this.type;
                    return (
                      this.name &&
                      !k(this).is(':disabled') &&
                      Ot.test(this.nodeName) &&
                      !Pt.test(e) &&
                      (this.checked || !ve.test(e))
                    );
                  })
                  .map(function (e, t) {
                    var n = k(this).val();
                    return null == n
                      ? null
                      : Array.isArray(n)
                      ? k.map(n, function (e) {
                          return { name: t.name, value: e.replace(Nt, '\r\n') };
                        })
                      : { name: t.name, value: n.replace(Nt, '\r\n') };
                  })
                  .get();
              },
            });
          var Mt = /%20/g,
            Dt = /#.*$/,
            It = /([?&])_=[^&]*/,
            Rt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            _t = /^(?:GET|HEAD)$/,
            qt = /^\/\//,
            Bt = {},
            Ft = {},
            Ht = '*/'.concat('*'),
            Wt = b.createElement('a');
          function Vt(e) {
            return function (t, n) {
              'string' != typeof t && ((n = t), (t = '*'));
              var r,
                o = 0,
                i = t.toLowerCase().match(q) || [];
              if (m(n))
                for (; (r = i[o++]); )
                  '+' === r[0]
                    ? ((r = r.slice(1) || '*'), (e[r] = e[r] || []).unshift(n))
                    : (e[r] = e[r] || []).push(n);
            };
          }
          function $t(e, t, n, r) {
            var o = {},
              i = e === Ft;
            function a(s) {
              var c;
              return (
                (o[s] = !0),
                k.each(e[s] || [], function (e, s) {
                  var l = s(t, n, r);
                  return 'string' != typeof l || i || o[l]
                    ? i
                      ? !(c = l)
                      : void 0
                    : (t.dataTypes.unshift(l), a(l), !1);
                }),
                c
              );
            }
            return a(t.dataTypes[0]) || (!o['*'] && a('*'));
          }
          function zt(e, t) {
            var n,
              r,
              o = k.ajaxSettings.flatOptions || {};
            for (n in t)
              void 0 !== t[n] && ((o[n] ? e : r || (r = {}))[n] = t[n]);
            return r && k.extend(!0, e, r), e;
          }
          (Wt.href = Et.href),
            k.extend({
              active: 0,
              lastModified: {},
              etag: {},
              ajaxSettings: {
                url: Et.href,
                type: 'GET',
                isLocal:
                  /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
                    Et.protocol
                  ),
                global: !0,
                processData: !0,
                async: !0,
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                accepts: {
                  '*': Ht,
                  text: 'text/plain',
                  html: 'text/html',
                  xml: 'application/xml, text/xml',
                  json: 'application/json, text/javascript',
                },
                contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                responseFields: {
                  xml: 'responseXML',
                  text: 'responseText',
                  json: 'responseJSON',
                },
                converters: {
                  '* text': String,
                  'text html': !0,
                  'text json': JSON.parse,
                  'text xml': k.parseXML,
                },
                flatOptions: { url: !0, context: !0 },
              },
              ajaxSetup: function (e, t) {
                return t ? zt(zt(e, k.ajaxSettings), t) : zt(k.ajaxSettings, e);
              },
              ajaxPrefilter: Vt(Bt),
              ajaxTransport: Vt(Ft),
              ajax: function (e, t) {
                'object' == typeof e && ((t = e), (e = void 0)), (t = t || {});
                var n,
                  o,
                  i,
                  a,
                  s,
                  c,
                  l,
                  u,
                  p,
                  d,
                  f = k.ajaxSetup({}, t),
                  h = f.context || f,
                  g = f.context && (h.nodeType || h.jquery) ? k(h) : k.event,
                  v = k.Deferred(),
                  m = k.Callbacks('once memory'),
                  y = f.statusCode || {},
                  x = {},
                  w = {},
                  S = 'canceled',
                  C = {
                    readyState: 0,
                    getResponseHeader: function (e) {
                      var t;
                      if (l) {
                        if (!a)
                          for (a = {}; (t = Rt.exec(i)); )
                            a[t[1].toLowerCase() + ' '] = (
                              a[t[1].toLowerCase() + ' '] || []
                            ).concat(t[2]);
                        t = a[e.toLowerCase() + ' '];
                      }
                      return null == t ? null : t.join(', ');
                    },
                    getAllResponseHeaders: function () {
                      return l ? i : null;
                    },
                    setRequestHeader: function (e, t) {
                      return (
                        null == l &&
                          ((e = w[e.toLowerCase()] = w[e.toLowerCase()] || e),
                          (x[e] = t)),
                        this
                      );
                    },
                    overrideMimeType: function (e) {
                      return null == l && (f.mimeType = e), this;
                    },
                    statusCode: function (e) {
                      var t;
                      if (e)
                        if (l) C.always(e[C.status]);
                        else for (t in e) y[t] = [y[t], e[t]];
                      return this;
                    },
                    abort: function (e) {
                      var t = e || S;
                      return n && n.abort(t), E(0, t), this;
                    },
                  };
                if (
                  (v.promise(C),
                  (f.url = ((e || f.url || Et.href) + '').replace(
                    qt,
                    Et.protocol + '//'
                  )),
                  (f.type = t.method || t.type || f.method || f.type),
                  (f.dataTypes = (f.dataType || '*').toLowerCase().match(q) || [
                    '',
                  ]),
                  null == f.crossDomain)
                ) {
                  c = b.createElement('a');
                  try {
                    (c.href = f.url),
                      (c.href = c.href),
                      (f.crossDomain =
                        Wt.protocol + '//' + Wt.host !=
                        c.protocol + '//' + c.host);
                  } catch (e) {
                    f.crossDomain = !0;
                  }
                }
                if (
                  (f.data &&
                    f.processData &&
                    'string' != typeof f.data &&
                    (f.data = k.param(f.data, f.traditional)),
                  $t(Bt, f, t, C),
                  l)
                )
                  return C;
                for (p in ((u = k.event && f.global) &&
                  0 == k.active++ &&
                  k.event.trigger('ajaxStart'),
                (f.type = f.type.toUpperCase()),
                (f.hasContent = !_t.test(f.type)),
                (o = f.url.replace(Dt, '')),
                f.hasContent
                  ? f.data &&
                    f.processData &&
                    0 ===
                      (f.contentType || '').indexOf(
                        'application/x-www-form-urlencoded'
                      ) &&
                    (f.data = f.data.replace(Mt, '+'))
                  : ((d = f.url.slice(o.length)),
                    f.data &&
                      (f.processData || 'string' == typeof f.data) &&
                      ((o += (At.test(o) ? '&' : '?') + f.data), delete f.data),
                    !1 === f.cache &&
                      ((o = o.replace(It, '$1')),
                      (d = (At.test(o) ? '&' : '?') + '_=' + Tt.guid++ + d)),
                    (f.url = o + d)),
                f.ifModified &&
                  (k.lastModified[o] &&
                    C.setRequestHeader('If-Modified-Since', k.lastModified[o]),
                  k.etag[o] && C.setRequestHeader('If-None-Match', k.etag[o])),
                ((f.data && f.hasContent && !1 !== f.contentType) ||
                  t.contentType) &&
                  C.setRequestHeader('Content-Type', f.contentType),
                C.setRequestHeader(
                  'Accept',
                  f.dataTypes[0] && f.accepts[f.dataTypes[0]]
                    ? f.accepts[f.dataTypes[0]] +
                        ('*' !== f.dataTypes[0] ? ', ' + Ht + '; q=0.01' : '')
                    : f.accepts['*']
                ),
                f.headers))
                  C.setRequestHeader(p, f.headers[p]);
                if (f.beforeSend && (!1 === f.beforeSend.call(h, C, f) || l))
                  return C.abort();
                if (
                  ((S = 'abort'),
                  m.add(f.complete),
                  C.done(f.success),
                  C.fail(f.error),
                  (n = $t(Ft, f, t, C)))
                ) {
                  if (
                    ((C.readyState = 1), u && g.trigger('ajaxSend', [C, f]), l)
                  )
                    return C;
                  f.async &&
                    f.timeout > 0 &&
                    (s = r.setTimeout(function () {
                      C.abort('timeout');
                    }, f.timeout));
                  try {
                    (l = !1), n.send(x, E);
                  } catch (e) {
                    if (l) throw e;
                    E(-1, e);
                  }
                } else E(-1, 'No Transport');
                function E(e, t, a, c) {
                  var p,
                    d,
                    b,
                    x,
                    w,
                    S = t;
                  l ||
                    ((l = !0),
                    s && r.clearTimeout(s),
                    (n = void 0),
                    (i = c || ''),
                    (C.readyState = e > 0 ? 4 : 0),
                    (p = (e >= 200 && e < 300) || 304 === e),
                    a &&
                      (x = (function (e, t, n) {
                        for (
                          var r, o, i, a, s = e.contents, c = e.dataTypes;
                          '*' === c[0];

                        )
                          c.shift(),
                            void 0 === r &&
                              (r =
                                e.mimeType ||
                                t.getResponseHeader('Content-Type'));
                        if (r)
                          for (o in s)
                            if (s[o] && s[o].test(r)) {
                              c.unshift(o);
                              break;
                            }
                        if (c[0] in n) i = c[0];
                        else {
                          for (o in n) {
                            if (!c[0] || e.converters[o + ' ' + c[0]]) {
                              i = o;
                              break;
                            }
                            a || (a = o);
                          }
                          i = i || a;
                        }
                        if (i) return i !== c[0] && c.unshift(i), n[i];
                      })(f, C, a)),
                    !p &&
                      k.inArray('script', f.dataTypes) > -1 &&
                      k.inArray('json', f.dataTypes) < 0 &&
                      (f.converters['text script'] = function () {}),
                    (x = (function (e, t, n, r) {
                      var o,
                        i,
                        a,
                        s,
                        c,
                        l = {},
                        u = e.dataTypes.slice();
                      if (u[1])
                        for (a in e.converters)
                          l[a.toLowerCase()] = e.converters[a];
                      for (i = u.shift(); i; )
                        if (
                          (e.responseFields[i] && (n[e.responseFields[i]] = t),
                          !c &&
                            r &&
                            e.dataFilter &&
                            (t = e.dataFilter(t, e.dataType)),
                          (c = i),
                          (i = u.shift()))
                        )
                          if ('*' === i) i = c;
                          else if ('*' !== c && c !== i) {
                            if (!(a = l[c + ' ' + i] || l['* ' + i]))
                              for (o in l)
                                if (
                                  (s = o.split(' '))[1] === i &&
                                  (a = l[c + ' ' + s[0]] || l['* ' + s[0]])
                                ) {
                                  !0 === a
                                    ? (a = l[o])
                                    : !0 !== l[o] &&
                                      ((i = s[0]), u.unshift(s[1]));
                                  break;
                                }
                            if (!0 !== a)
                              if (a && e.throws) t = a(t);
                              else
                                try {
                                  t = a(t);
                                } catch (e) {
                                  return {
                                    state: 'parsererror',
                                    error: a
                                      ? e
                                      : 'No conversion from ' + c + ' to ' + i,
                                  };
                                }
                          }
                      return { state: 'success', data: t };
                    })(f, x, C, p)),
                    p
                      ? (f.ifModified &&
                          ((w = C.getResponseHeader('Last-Modified')) &&
                            (k.lastModified[o] = w),
                          (w = C.getResponseHeader('etag')) && (k.etag[o] = w)),
                        204 === e || 'HEAD' === f.type
                          ? (S = 'nocontent')
                          : 304 === e
                          ? (S = 'notmodified')
                          : ((S = x.state), (d = x.data), (p = !(b = x.error))))
                      : ((b = S),
                        (!e && S) || ((S = 'error'), e < 0 && (e = 0))),
                    (C.status = e),
                    (C.statusText = (t || S) + ''),
                    p
                      ? v.resolveWith(h, [d, S, C])
                      : v.rejectWith(h, [C, S, b]),
                    C.statusCode(y),
                    (y = void 0),
                    u &&
                      g.trigger(p ? 'ajaxSuccess' : 'ajaxError', [
                        C,
                        f,
                        p ? d : b,
                      ]),
                    m.fireWith(h, [C, S]),
                    u &&
                      (g.trigger('ajaxComplete', [C, f]),
                      --k.active || k.event.trigger('ajaxStop')));
                }
                return C;
              },
              getJSON: function (e, t, n) {
                return k.get(e, t, n, 'json');
              },
              getScript: function (e, t) {
                return k.get(e, void 0, t, 'script');
              },
            }),
            k.each(['get', 'post'], function (e, t) {
              k[t] = function (e, n, r, o) {
                return (
                  m(n) && ((o = o || r), (r = n), (n = void 0)),
                  k.ajax(
                    k.extend(
                      { url: e, type: t, dataType: o, data: n, success: r },
                      k.isPlainObject(e) && e
                    )
                  )
                );
              };
            }),
            k.ajaxPrefilter(function (e) {
              var t;
              for (t in e.headers)
                'content-type' === t.toLowerCase() &&
                  (e.contentType = e.headers[t] || '');
            }),
            (k._evalUrl = function (e, t, n) {
              return k.ajax({
                url: e,
                type: 'GET',
                dataType: 'script',
                cache: !0,
                async: !1,
                global: !1,
                converters: { 'text script': function () {} },
                dataFilter: function (e) {
                  k.globalEval(e, t, n);
                },
              });
            }),
            k.fn.extend({
              wrapAll: function (e) {
                var t;
                return (
                  this[0] &&
                    (m(e) && (e = e.call(this[0])),
                    (t = k(e, this[0].ownerDocument).eq(0).clone(!0)),
                    this[0].parentNode && t.insertBefore(this[0]),
                    t
                      .map(function () {
                        for (var e = this; e.firstElementChild; )
                          e = e.firstElementChild;
                        return e;
                      })
                      .append(this)),
                  this
                );
              },
              wrapInner: function (e) {
                return m(e)
                  ? this.each(function (t) {
                      k(this).wrapInner(e.call(this, t));
                    })
                  : this.each(function () {
                      var t = k(this),
                        n = t.contents();
                      n.length ? n.wrapAll(e) : t.append(e);
                    });
              },
              wrap: function (e) {
                var t = m(e);
                return this.each(function (n) {
                  k(this).wrapAll(t ? e.call(this, n) : e);
                });
              },
              unwrap: function (e) {
                return (
                  this.parent(e)
                    .not('body')
                    .each(function () {
                      k(this).replaceWith(this.childNodes);
                    }),
                  this
                );
              },
            }),
            (k.expr.pseudos.hidden = function (e) {
              return !k.expr.pseudos.visible(e);
            }),
            (k.expr.pseudos.visible = function (e) {
              return !!(
                e.offsetWidth ||
                e.offsetHeight ||
                e.getClientRects().length
              );
            }),
            (k.ajaxSettings.xhr = function () {
              try {
                return new r.XMLHttpRequest();
              } catch (e) {}
            });
          var Ut = { 0: 200, 1223: 204 },
            Zt = k.ajaxSettings.xhr();
          (v.cors = !!Zt && 'withCredentials' in Zt),
            (v.ajax = Zt = !!Zt),
            k.ajaxTransport(function (e) {
              var t, n;
              if (v.cors || (Zt && !e.crossDomain))
                return {
                  send: function (o, i) {
                    var a,
                      s = e.xhr();
                    if (
                      (s.open(e.type, e.url, e.async, e.username, e.password),
                      e.xhrFields)
                    )
                      for (a in e.xhrFields) s[a] = e.xhrFields[a];
                    for (a in (e.mimeType &&
                      s.overrideMimeType &&
                      s.overrideMimeType(e.mimeType),
                    e.crossDomain ||
                      o['X-Requested-With'] ||
                      (o['X-Requested-With'] = 'XMLHttpRequest'),
                    o))
                      s.setRequestHeader(a, o[a]);
                    (t = function (e) {
                      return function () {
                        t &&
                          ((t =
                            n =
                            s.onload =
                            s.onerror =
                            s.onabort =
                            s.ontimeout =
                            s.onreadystatechange =
                              null),
                          'abort' === e
                            ? s.abort()
                            : 'error' === e
                            ? 'number' != typeof s.status
                              ? i(0, 'error')
                              : i(s.status, s.statusText)
                            : i(
                                Ut[s.status] || s.status,
                                s.statusText,
                                'text' !== (s.responseType || 'text') ||
                                  'string' != typeof s.responseText
                                  ? { binary: s.response }
                                  : { text: s.responseText },
                                s.getAllResponseHeaders()
                              ));
                      };
                    }),
                      (s.onload = t()),
                      (n = s.onerror = s.ontimeout = t('error')),
                      void 0 !== s.onabort
                        ? (s.onabort = n)
                        : (s.onreadystatechange = function () {
                            4 === s.readyState &&
                              r.setTimeout(function () {
                                t && n();
                              });
                          }),
                      (t = t('abort'));
                    try {
                      s.send((e.hasContent && e.data) || null);
                    } catch (e) {
                      if (t) throw e;
                    }
                  },
                  abort: function () {
                    t && t();
                  },
                };
            }),
            k.ajaxPrefilter(function (e) {
              e.crossDomain && (e.contents.script = !1);
            }),
            k.ajaxSetup({
              accepts: {
                script:
                  'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
              },
              contents: { script: /\b(?:java|ecma)script\b/ },
              converters: {
                'text script': function (e) {
                  return k.globalEval(e), e;
                },
              },
            }),
            k.ajaxPrefilter('script', function (e) {
              void 0 === e.cache && (e.cache = !1),
                e.crossDomain && (e.type = 'GET');
            }),
            k.ajaxTransport('script', function (e) {
              var t, n;
              if (e.crossDomain || e.scriptAttrs)
                return {
                  send: function (r, o) {
                    (t = k('<script>')
                      .attr(e.scriptAttrs || {})
                      .prop({ charset: e.scriptCharset, src: e.url })
                      .on(
                        'load error',
                        (n = function (e) {
                          t.remove(),
                            (n = null),
                            e && o('error' === e.type ? 404 : 200, e.type);
                        })
                      )),
                      b.head.appendChild(t[0]);
                  },
                  abort: function () {
                    n && n();
                  },
                };
            });
          var Xt,
            Gt = [],
            Jt = /(=)\?(?=&|$)|\?\?/;
          k.ajaxSetup({
            jsonp: 'callback',
            jsonpCallback: function () {
              var e = Gt.pop() || k.expando + '_' + Tt.guid++;
              return (this[e] = !0), e;
            },
          }),
            k.ajaxPrefilter('json jsonp', function (e, t, n) {
              var o,
                i,
                a,
                s =
                  !1 !== e.jsonp &&
                  (Jt.test(e.url)
                    ? 'url'
                    : 'string' == typeof e.data &&
                      0 ===
                        (e.contentType || '').indexOf(
                          'application/x-www-form-urlencoded'
                        ) &&
                      Jt.test(e.data) &&
                      'data');
              if (s || 'jsonp' === e.dataTypes[0])
                return (
                  (o = e.jsonpCallback =
                    m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback),
                  s
                    ? (e[s] = e[s].replace(Jt, '$1' + o))
                    : !1 !== e.jsonp &&
                      (e.url +=
                        (At.test(e.url) ? '&' : '?') + e.jsonp + '=' + o),
                  (e.converters['script json'] = function () {
                    return a || k.error(o + ' was not called'), a[0];
                  }),
                  (e.dataTypes[0] = 'json'),
                  (i = r[o]),
                  (r[o] = function () {
                    a = arguments;
                  }),
                  n.always(function () {
                    void 0 === i ? k(r).removeProp(o) : (r[o] = i),
                      e[o] && ((e.jsonpCallback = t.jsonpCallback), Gt.push(o)),
                      a && m(i) && i(a[0]),
                      (a = i = void 0);
                  }),
                  'script'
                );
            }),
            (v.createHTMLDocument =
              (((Xt = b.implementation.createHTMLDocument('').body).innerHTML =
                '<form></form><form></form>'),
              2 === Xt.childNodes.length)),
            (k.parseHTML = function (e, t, n) {
              return 'string' != typeof e
                ? []
                : ('boolean' == typeof t && ((n = t), (t = !1)),
                  t ||
                    (v.createHTMLDocument
                      ? (((r = (t =
                          b.implementation.createHTMLDocument(
                            ''
                          )).createElement('base')).href = b.location.href),
                        t.head.appendChild(r))
                      : (t = b)),
                  (i = !n && []),
                  (o = O.exec(e))
                    ? [t.createElement(o[1])]
                    : ((o = Ce([e], t, i)),
                      i && i.length && k(i).remove(),
                      k.merge([], o.childNodes)));
              var r, o, i;
            }),
            (k.fn.load = function (e, t, n) {
              var r,
                o,
                i,
                a = this,
                s = e.indexOf(' ');
              return (
                s > -1 && ((r = bt(e.slice(s))), (e = e.slice(0, s))),
                m(t)
                  ? ((n = t), (t = void 0))
                  : t && 'object' == typeof t && (o = 'POST'),
                a.length > 0 &&
                  k
                    .ajax({
                      url: e,
                      type: o || 'GET',
                      dataType: 'html',
                      data: t,
                    })
                    .done(function (e) {
                      (i = arguments),
                        a.html(
                          r ? k('<div>').append(k.parseHTML(e)).find(r) : e
                        );
                    })
                    .always(
                      n &&
                        function (e, t) {
                          a.each(function () {
                            n.apply(this, i || [e.responseText, t, e]);
                          });
                        }
                    ),
                this
              );
            }),
            (k.expr.pseudos.animated = function (e) {
              return k.grep(k.timers, function (t) {
                return e === t.elem;
              }).length;
            }),
            (k.offset = {
              setOffset: function (e, t, n) {
                var r,
                  o,
                  i,
                  a,
                  s,
                  c,
                  l = k.css(e, 'position'),
                  u = k(e),
                  p = {};
                'static' === l && (e.style.position = 'relative'),
                  (s = u.offset()),
                  (i = k.css(e, 'top')),
                  (c = k.css(e, 'left')),
                  ('absolute' === l || 'fixed' === l) &&
                  (i + c).indexOf('auto') > -1
                    ? ((a = (r = u.position()).top), (o = r.left))
                    : ((a = parseFloat(i) || 0), (o = parseFloat(c) || 0)),
                  m(t) && (t = t.call(e, n, k.extend({}, s))),
                  null != t.top && (p.top = t.top - s.top + a),
                  null != t.left && (p.left = t.left - s.left + o),
                  'using' in t ? t.using.call(e, p) : u.css(p);
              },
            }),
            k.fn.extend({
              offset: function (e) {
                if (arguments.length)
                  return void 0 === e
                    ? this
                    : this.each(function (t) {
                        k.offset.setOffset(this, e, t);
                      });
                var t,
                  n,
                  r = this[0];
                return r
                  ? r.getClientRects().length
                    ? ((t = r.getBoundingClientRect()),
                      (n = r.ownerDocument.defaultView),
                      {
                        top: t.top + n.pageYOffset,
                        left: t.left + n.pageXOffset,
                      })
                    : { top: 0, left: 0 }
                  : void 0;
              },
              position: function () {
                if (this[0]) {
                  var e,
                    t,
                    n,
                    r = this[0],
                    o = { top: 0, left: 0 };
                  if ('fixed' === k.css(r, 'position'))
                    t = r.getBoundingClientRect();
                  else {
                    for (
                      t = this.offset(),
                        n = r.ownerDocument,
                        e = r.offsetParent || n.documentElement;
                      e &&
                      (e === n.body || e === n.documentElement) &&
                      'static' === k.css(e, 'position');

                    )
                      e = e.parentNode;
                    e &&
                      e !== r &&
                      1 === e.nodeType &&
                      (((o = k(e).offset()).top += k.css(
                        e,
                        'borderTopWidth',
                        !0
                      )),
                      (o.left += k.css(e, 'borderLeftWidth', !0)));
                  }
                  return {
                    top: t.top - o.top - k.css(r, 'marginTop', !0),
                    left: t.left - o.left - k.css(r, 'marginLeft', !0),
                  };
                }
              },
              offsetParent: function () {
                return this.map(function () {
                  for (
                    var e = this.offsetParent;
                    e && 'static' === k.css(e, 'position');

                  )
                    e = e.offsetParent;
                  return e || ae;
                });
              },
            }),
            k.each(
              { scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' },
              function (e, t) {
                var n = 'pageYOffset' === t;
                k.fn[e] = function (r) {
                  return z(
                    this,
                    function (e, r, o) {
                      var i;
                      if (
                        (y(e)
                          ? (i = e)
                          : 9 === e.nodeType && (i = e.defaultView),
                        void 0 === o)
                      )
                        return i ? i[t] : e[r];
                      i
                        ? i.scrollTo(
                            n ? i.pageXOffset : o,
                            n ? o : i.pageYOffset
                          )
                        : (e[r] = o);
                    },
                    e,
                    r,
                    arguments.length
                  );
                };
              }
            ),
            k.each(['top', 'left'], function (e, t) {
              k.cssHooks[t] = Xe(v.pixelPosition, function (e, n) {
                if (n)
                  return (
                    (n = Ze(e, t)), Fe.test(n) ? k(e).position()[t] + 'px' : n
                  );
              });
            }),
            k.each({ Height: 'height', Width: 'width' }, function (e, t) {
              k.each(
                { padding: 'inner' + e, content: t, '': 'outer' + e },
                function (n, r) {
                  k.fn[r] = function (o, i) {
                    var a = arguments.length && (n || 'boolean' != typeof o),
                      s = n || (!0 === o || !0 === i ? 'margin' : 'border');
                    return z(
                      this,
                      function (t, n, o) {
                        var i;
                        return y(t)
                          ? 0 === r.indexOf('outer')
                            ? t['inner' + e]
                            : t.document.documentElement['client' + e]
                          : 9 === t.nodeType
                          ? ((i = t.documentElement),
                            Math.max(
                              t.body['scroll' + e],
                              i['scroll' + e],
                              t.body['offset' + e],
                              i['offset' + e],
                              i['client' + e]
                            ))
                          : void 0 === o
                          ? k.css(t, n, s)
                          : k.style(t, n, o, s);
                      },
                      t,
                      a ? o : void 0,
                      a
                    );
                  };
                }
              );
            }),
            k.each(
              [
                'ajaxStart',
                'ajaxStop',
                'ajaxComplete',
                'ajaxError',
                'ajaxSuccess',
                'ajaxSend',
              ],
              function (e, t) {
                k.fn[t] = function (e) {
                  return this.on(t, e);
                };
              }
            ),
            k.fn.extend({
              bind: function (e, t, n) {
                return this.on(e, null, t, n);
              },
              unbind: function (e, t) {
                return this.off(e, null, t);
              },
              delegate: function (e, t, n, r) {
                return this.on(t, e, n, r);
              },
              undelegate: function (e, t, n) {
                return 1 === arguments.length
                  ? this.off(e, '**')
                  : this.off(t, e || '**', n);
              },
              hover: function (e, t) {
                return this.mouseenter(e).mouseleave(t || e);
              },
            }),
            k.each(
              'blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(
                ' '
              ),
              function (e, t) {
                k.fn[t] = function (e, n) {
                  return arguments.length > 0
                    ? this.on(t, null, e, n)
                    : this.trigger(t);
                };
              }
            );
          var Yt = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
          (k.proxy = function (e, t) {
            var n, r, o;
            if (('string' == typeof t && ((n = e[t]), (t = e), (e = n)), m(e)))
              return (
                (r = s.call(arguments, 2)),
                (o = function () {
                  return e.apply(t || this, r.concat(s.call(arguments)));
                }),
                (o.guid = e.guid = e.guid || k.guid++),
                o
              );
          }),
            (k.holdReady = function (e) {
              e ? k.readyWait++ : k.ready(!0);
            }),
            (k.isArray = Array.isArray),
            (k.parseJSON = JSON.parse),
            (k.nodeName = P),
            (k.isFunction = m),
            (k.isWindow = y),
            (k.camelCase = G),
            (k.type = S),
            (k.now = Date.now),
            (k.isNumeric = function (e) {
              var t = k.type(e);
              return (
                ('number' === t || 'string' === t) && !isNaN(e - parseFloat(e))
              );
            }),
            (k.trim = function (e) {
              return null == e ? '' : (e + '').replace(Yt, '$1');
            }),
            void 0 ===
              (n = function () {
                return k;
              }.apply(t, [])) || (e.exports = n);
          var Kt = r.jQuery,
            Qt = r.$;
          return (
            (k.noConflict = function (e) {
              return (
                r.$ === k && (r.$ = Qt),
                e && r.jQuery === k && (r.jQuery = Kt),
                k
              );
            }),
            void 0 === o && (r.jQuery = r.$ = k),
            k
          );
        });
      },
      8552: (e, t, n) => {
        var r = n(852)(n(5639), 'DataView');
        e.exports = r;
      },
      1989: (e, t, n) => {
        var r = n(1789),
          o = n(401),
          i = n(7667),
          a = n(1327),
          s = n(1866);
        function c(e) {
          var t = -1,
            n = null == e ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var r = e[t];
            this.set(r[0], r[1]);
          }
        }
        (c.prototype.clear = r),
          (c.prototype.delete = o),
          (c.prototype.get = i),
          (c.prototype.has = a),
          (c.prototype.set = s),
          (e.exports = c);
      },
      8407: (e, t, n) => {
        var r = n(7040),
          o = n(4125),
          i = n(2117),
          a = n(7518),
          s = n(4705);
        function c(e) {
          var t = -1,
            n = null == e ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var r = e[t];
            this.set(r[0], r[1]);
          }
        }
        (c.prototype.clear = r),
          (c.prototype.delete = o),
          (c.prototype.get = i),
          (c.prototype.has = a),
          (c.prototype.set = s),
          (e.exports = c);
      },
      7071: (e, t, n) => {
        var r = n(852)(n(5639), 'Map');
        e.exports = r;
      },
      3369: (e, t, n) => {
        var r = n(4785),
          o = n(1285),
          i = n(6e3),
          a = n(9916),
          s = n(5265);
        function c(e) {
          var t = -1,
            n = null == e ? 0 : e.length;
          for (this.clear(); ++t < n; ) {
            var r = e[t];
            this.set(r[0], r[1]);
          }
        }
        (c.prototype.clear = r),
          (c.prototype.delete = o),
          (c.prototype.get = i),
          (c.prototype.has = a),
          (c.prototype.set = s),
          (e.exports = c);
      },
      3818: (e, t, n) => {
        var r = n(852)(n(5639), 'Promise');
        e.exports = r;
      },
      8525: (e, t, n) => {
        var r = n(852)(n(5639), 'Set');
        e.exports = r;
      },
      6384: (e, t, n) => {
        var r = n(8407),
          o = n(7465),
          i = n(3779),
          a = n(7599),
          s = n(4758),
          c = n(4309);
        function l(e) {
          var t = (this.__data__ = new r(e));
          this.size = t.size;
        }
        (l.prototype.clear = o),
          (l.prototype.delete = i),
          (l.prototype.get = a),
          (l.prototype.has = s),
          (l.prototype.set = c),
          (e.exports = l);
      },
      2705: (e, t, n) => {
        var r = n(5639).Symbol;
        e.exports = r;
      },
      1149: (e, t, n) => {
        var r = n(5639).Uint8Array;
        e.exports = r;
      },
      577: (e, t, n) => {
        var r = n(852)(n(5639), 'WeakMap');
        e.exports = r;
      },
      7412: (e) => {
        e.exports = function (e, t) {
          for (
            var n = -1, r = null == e ? 0 : e.length;
            ++n < r && !1 !== t(e[n], n, e);

          );
          return e;
        };
      },
      4963: (e) => {
        e.exports = function (e, t) {
          for (
            var n = -1, r = null == e ? 0 : e.length, o = 0, i = [];
            ++n < r;

          ) {
            var a = e[n];
            t(a, n, e) && (i[o++] = a);
          }
          return i;
        };
      },
      4636: (e, t, n) => {
        var r = n(2545),
          o = n(5694),
          i = n(1469),
          a = n(4144),
          s = n(5776),
          c = n(6719),
          l = Object.prototype.hasOwnProperty;
        e.exports = function (e, t) {
          var n = i(e),
            u = !n && o(e),
            p = !n && !u && a(e),
            d = !n && !u && !p && c(e),
            f = n || u || p || d,
            h = f ? r(e.length, String) : [],
            g = h.length;
          for (var v in e)
            (!t && !l.call(e, v)) ||
              (f &&
                ('length' == v ||
                  (p && ('offset' == v || 'parent' == v)) ||
                  (d &&
                    ('buffer' == v ||
                      'byteLength' == v ||
                      'byteOffset' == v)) ||
                  s(v, g))) ||
              h.push(v);
          return h;
        };
      },
      2488: (e) => {
        e.exports = function (e, t) {
          for (var n = -1, r = t.length, o = e.length; ++n < r; )
            e[o + n] = t[n];
          return e;
        };
      },
      4865: (e, t, n) => {
        var r = n(9465),
          o = n(7813),
          i = Object.prototype.hasOwnProperty;
        e.exports = function (e, t, n) {
          var a = e[t];
          (i.call(e, t) && o(a, n) && (void 0 !== n || t in e)) || r(e, t, n);
        };
      },
      8470: (e, t, n) => {
        var r = n(7813);
        e.exports = function (e, t) {
          for (var n = e.length; n--; ) if (r(e[n][0], t)) return n;
          return -1;
        };
      },
      4037: (e, t, n) => {
        var r = n(8363),
          o = n(3674);
        e.exports = function (e, t) {
          return e && r(t, o(t), e);
        };
      },
      3886: (e, t, n) => {
        var r = n(8363),
          o = n(1704);
        e.exports = function (e, t) {
          return e && r(t, o(t), e);
        };
      },
      9465: (e, t, n) => {
        var r = n(8777);
        e.exports = function (e, t, n) {
          '__proto__' == t && r
            ? r(e, t, {
                configurable: !0,
                enumerable: !0,
                value: n,
                writable: !0,
              })
            : (e[t] = n);
        };
      },
      5990: (e, t, n) => {
        var r = n(6384),
          o = n(7412),
          i = n(4865),
          a = n(4037),
          s = n(3886),
          c = n(4626),
          l = n(278),
          u = n(8805),
          p = n(1911),
          d = n(8234),
          f = n(6904),
          h = n(4160),
          g = n(3824),
          v = n(9148),
          m = n(8517),
          y = n(1469),
          b = n(4144),
          x = n(6688),
          w = n(3218),
          S = n(2928),
          C = n(3674),
          k = n(1704),
          E = '[object Arguments]',
          T = '[object Function]',
          A = '[object Object]',
          j = {};
        (j[E] =
          j['[object Array]'] =
          j['[object ArrayBuffer]'] =
          j['[object DataView]'] =
          j['[object Boolean]'] =
          j['[object Date]'] =
          j['[object Float32Array]'] =
          j['[object Float64Array]'] =
          j['[object Int8Array]'] =
          j['[object Int16Array]'] =
          j['[object Int32Array]'] =
          j['[object Map]'] =
          j['[object Number]'] =
          j[A] =
          j['[object RegExp]'] =
          j['[object Set]'] =
          j['[object String]'] =
          j['[object Symbol]'] =
          j['[object Uint8Array]'] =
          j['[object Uint8ClampedArray]'] =
          j['[object Uint16Array]'] =
          j['[object Uint32Array]'] =
            !0),
          (j['[object Error]'] = j[T] = j['[object WeakMap]'] = !1),
          (e.exports = function e(t, n, N, P, O, L) {
            var M,
              D = 1 & n,
              I = 2 & n,
              R = 4 & n;
            if ((N && (M = O ? N(t, P, O, L) : N(t)), void 0 !== M)) return M;
            if (!w(t)) return t;
            var _ = y(t);
            if (_) {
              if (((M = g(t)), !D)) return l(t, M);
            } else {
              var q = h(t),
                B = q == T || '[object GeneratorFunction]' == q;
              if (b(t)) return c(t, D);
              if (q == A || q == E || (B && !O)) {
                if (((M = I || B ? {} : m(t)), !D))
                  return I ? p(t, s(M, t)) : u(t, a(M, t));
              } else {
                if (!j[q]) return O ? t : {};
                M = v(t, q, D);
              }
            }
            L || (L = new r());
            var F = L.get(t);
            if (F) return F;
            L.set(t, M),
              S(t)
                ? t.forEach(function (r) {
                    M.add(e(r, n, N, r, t, L));
                  })
                : x(t) &&
                  t.forEach(function (r, o) {
                    M.set(o, e(r, n, N, o, t, L));
                  });
            var H = _ ? void 0 : (R ? (I ? f : d) : I ? k : C)(t);
            return (
              o(H || t, function (r, o) {
                H && (r = t[(o = r)]), i(M, o, e(r, n, N, o, t, L));
              }),
              M
            );
          });
      },
      3118: (e, t, n) => {
        var r = n(3218),
          o = Object.create,
          i = (function () {
            function e() {}
            return function (t) {
              if (!r(t)) return {};
              if (o) return o(t);
              e.prototype = t;
              var n = new e();
              return (e.prototype = void 0), n;
            };
          })();
        e.exports = i;
      },
      8866: (e, t, n) => {
        var r = n(2488),
          o = n(1469);
        e.exports = function (e, t, n) {
          var i = t(e);
          return o(e) ? i : r(i, n(e));
        };
      },
      4239: (e, t, n) => {
        var r = n(2705),
          o = n(9607),
          i = n(2333),
          a = r ? r.toStringTag : void 0;
        e.exports = function (e) {
          return null == e
            ? void 0 === e
              ? '[object Undefined]'
              : '[object Null]'
            : a && a in Object(e)
            ? o(e)
            : i(e);
        };
      },
      9454: (e, t, n) => {
        var r = n(4239),
          o = n(7005);
        e.exports = function (e) {
          return o(e) && '[object Arguments]' == r(e);
        };
      },
      5588: (e, t, n) => {
        var r = n(4160),
          o = n(7005);
        e.exports = function (e) {
          return o(e) && '[object Map]' == r(e);
        };
      },
      8458: (e, t, n) => {
        var r = n(3560),
          o = n(5346),
          i = n(3218),
          a = n(346),
          s = /^\[object .+?Constructor\]$/,
          c = Function.prototype,
          l = Object.prototype,
          u = c.toString,
          p = l.hasOwnProperty,
          d = RegExp(
            '^' +
              u
                .call(p)
                .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
                .replace(
                  /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                  '$1.*?'
                ) +
              '$'
          );
        e.exports = function (e) {
          return !(!i(e) || o(e)) && (r(e) ? d : s).test(a(e));
        };
      },
      9221: (e, t, n) => {
        var r = n(4160),
          o = n(7005);
        e.exports = function (e) {
          return o(e) && '[object Set]' == r(e);
        };
      },
      8749: (e, t, n) => {
        var r = n(4239),
          o = n(1780),
          i = n(7005),
          a = {};
        (a['[object Float32Array]'] =
          a['[object Float64Array]'] =
          a['[object Int8Array]'] =
          a['[object Int16Array]'] =
          a['[object Int32Array]'] =
          a['[object Uint8Array]'] =
          a['[object Uint8ClampedArray]'] =
          a['[object Uint16Array]'] =
          a['[object Uint32Array]'] =
            !0),
          (a['[object Arguments]'] =
            a['[object Array]'] =
            a['[object ArrayBuffer]'] =
            a['[object Boolean]'] =
            a['[object DataView]'] =
            a['[object Date]'] =
            a['[object Error]'] =
            a['[object Function]'] =
            a['[object Map]'] =
            a['[object Number]'] =
            a['[object Object]'] =
            a['[object RegExp]'] =
            a['[object Set]'] =
            a['[object String]'] =
            a['[object WeakMap]'] =
              !1),
          (e.exports = function (e) {
            return i(e) && o(e.length) && !!a[r(e)];
          });
      },
      280: (e, t, n) => {
        var r = n(5726),
          o = n(6916),
          i = Object.prototype.hasOwnProperty;
        e.exports = function (e) {
          if (!r(e)) return o(e);
          var t = [];
          for (var n in Object(e))
            i.call(e, n) && 'constructor' != n && t.push(n);
          return t;
        };
      },
      313: (e, t, n) => {
        var r = n(3218),
          o = n(5726),
          i = n(3498),
          a = Object.prototype.hasOwnProperty;
        e.exports = function (e) {
          if (!r(e)) return i(e);
          var t = o(e),
            n = [];
          for (var s in e)
            ('constructor' != s || (!t && a.call(e, s))) && n.push(s);
          return n;
        };
      },
      2545: (e) => {
        e.exports = function (e, t) {
          for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
          return r;
        };
      },
      1717: (e) => {
        e.exports = function (e) {
          return function (t) {
            return e(t);
          };
        };
      },
      4318: (e, t, n) => {
        var r = n(1149);
        e.exports = function (e) {
          var t = new e.constructor(e.byteLength);
          return new r(t).set(new r(e)), t;
        };
      },
      4626: (e, t, n) => {
        e = n.nmd(e);
        var r = n(5639),
          o = t && !t.nodeType && t,
          i = o && e && !e.nodeType && e,
          a = i && i.exports === o ? r.Buffer : void 0,
          s = a ? a.allocUnsafe : void 0;
        e.exports = function (e, t) {
          if (t) return e.slice();
          var n = e.length,
            r = s ? s(n) : new e.constructor(n);
          return e.copy(r), r;
        };
      },
      7157: (e, t, n) => {
        var r = n(4318);
        e.exports = function (e, t) {
          var n = t ? r(e.buffer) : e.buffer;
          return new e.constructor(n, e.byteOffset, e.byteLength);
        };
      },
      3147: (e) => {
        var t = /\w*$/;
        e.exports = function (e) {
          var n = new e.constructor(e.source, t.exec(e));
          return (n.lastIndex = e.lastIndex), n;
        };
      },
      419: (e, t, n) => {
        var r = n(2705),
          o = r ? r.prototype : void 0,
          i = o ? o.valueOf : void 0;
        e.exports = function (e) {
          return i ? Object(i.call(e)) : {};
        };
      },
      7133: (e, t, n) => {
        var r = n(4318);
        e.exports = function (e, t) {
          var n = t ? r(e.buffer) : e.buffer;
          return new e.constructor(n, e.byteOffset, e.length);
        };
      },
      278: (e) => {
        e.exports = function (e, t) {
          var n = -1,
            r = e.length;
          for (t || (t = Array(r)); ++n < r; ) t[n] = e[n];
          return t;
        };
      },
      8363: (e, t, n) => {
        var r = n(4865),
          o = n(9465);
        e.exports = function (e, t, n, i) {
          var a = !n;
          n || (n = {});
          for (var s = -1, c = t.length; ++s < c; ) {
            var l = t[s],
              u = i ? i(n[l], e[l], l, n, e) : void 0;
            void 0 === u && (u = e[l]), a ? o(n, l, u) : r(n, l, u);
          }
          return n;
        };
      },
      8805: (e, t, n) => {
        var r = n(8363),
          o = n(9551);
        e.exports = function (e, t) {
          return r(e, o(e), t);
        };
      },
      1911: (e, t, n) => {
        var r = n(8363),
          o = n(1442);
        e.exports = function (e, t) {
          return r(e, o(e), t);
        };
      },
      4429: (e, t, n) => {
        var r = n(5639)['__core-js_shared__'];
        e.exports = r;
      },
      8777: (e, t, n) => {
        var r = n(852),
          o = (function () {
            try {
              var e = r(Object, 'defineProperty');
              return e({}, '', {}), e;
            } catch (e) {}
          })();
        e.exports = o;
      },
      1957: (e, t, n) => {
        var r = 'object' == typeof n.g && n.g && n.g.Object === Object && n.g;
        e.exports = r;
      },
      8234: (e, t, n) => {
        var r = n(8866),
          o = n(9551),
          i = n(3674);
        e.exports = function (e) {
          return r(e, i, o);
        };
      },
      6904: (e, t, n) => {
        var r = n(8866),
          o = n(1442),
          i = n(1704);
        e.exports = function (e) {
          return r(e, i, o);
        };
      },
      5050: (e, t, n) => {
        var r = n(7019);
        e.exports = function (e, t) {
          var n = e.__data__;
          return r(t) ? n['string' == typeof t ? 'string' : 'hash'] : n.map;
        };
      },
      852: (e, t, n) => {
        var r = n(8458),
          o = n(7801);
        e.exports = function (e, t) {
          var n = o(e, t);
          return r(n) ? n : void 0;
        };
      },
      5924: (e, t, n) => {
        var r = n(5569)(Object.getPrototypeOf, Object);
        e.exports = r;
      },
      9607: (e, t, n) => {
        var r = n(2705),
          o = Object.prototype,
          i = o.hasOwnProperty,
          a = o.toString,
          s = r ? r.toStringTag : void 0;
        e.exports = function (e) {
          var t = i.call(e, s),
            n = e[s];
          try {
            e[s] = void 0;
            var r = !0;
          } catch (e) {}
          var o = a.call(e);
          return r && (t ? (e[s] = n) : delete e[s]), o;
        };
      },
      9551: (e, t, n) => {
        var r = n(4963),
          o = n(479),
          i = Object.prototype.propertyIsEnumerable,
          a = Object.getOwnPropertySymbols,
          s = a
            ? function (e) {
                return null == e
                  ? []
                  : ((e = Object(e)),
                    r(a(e), function (t) {
                      return i.call(e, t);
                    }));
              }
            : o;
        e.exports = s;
      },
      1442: (e, t, n) => {
        var r = n(2488),
          o = n(5924),
          i = n(9551),
          a = n(479),
          s = Object.getOwnPropertySymbols
            ? function (e) {
                for (var t = []; e; ) r(t, i(e)), (e = o(e));
                return t;
              }
            : a;
        e.exports = s;
      },
      4160: (e, t, n) => {
        var r = n(8552),
          o = n(7071),
          i = n(3818),
          a = n(8525),
          s = n(577),
          c = n(4239),
          l = n(346),
          u = '[object Map]',
          p = '[object Promise]',
          d = '[object Set]',
          f = '[object WeakMap]',
          h = '[object DataView]',
          g = l(r),
          v = l(o),
          m = l(i),
          y = l(a),
          b = l(s),
          x = c;
        ((r && x(new r(new ArrayBuffer(1))) != h) ||
          (o && x(new o()) != u) ||
          (i && x(i.resolve()) != p) ||
          (a && x(new a()) != d) ||
          (s && x(new s()) != f)) &&
          (x = function (e) {
            var t = c(e),
              n = '[object Object]' == t ? e.constructor : void 0,
              r = n ? l(n) : '';
            if (r)
              switch (r) {
                case g:
                  return h;
                case v:
                  return u;
                case m:
                  return p;
                case y:
                  return d;
                case b:
                  return f;
              }
            return t;
          }),
          (e.exports = x);
      },
      7801: (e) => {
        e.exports = function (e, t) {
          return null == e ? void 0 : e[t];
        };
      },
      1789: (e, t, n) => {
        var r = n(4536);
        e.exports = function () {
          (this.__data__ = r ? r(null) : {}), (this.size = 0);
        };
      },
      401: (e) => {
        e.exports = function (e) {
          var t = this.has(e) && delete this.__data__[e];
          return (this.size -= t ? 1 : 0), t;
        };
      },
      7667: (e, t, n) => {
        var r = n(4536),
          o = Object.prototype.hasOwnProperty;
        e.exports = function (e) {
          var t = this.__data__;
          if (r) {
            var n = t[e];
            return '__lodash_hash_undefined__' === n ? void 0 : n;
          }
          return o.call(t, e) ? t[e] : void 0;
        };
      },
      1327: (e, t, n) => {
        var r = n(4536),
          o = Object.prototype.hasOwnProperty;
        e.exports = function (e) {
          var t = this.__data__;
          return r ? void 0 !== t[e] : o.call(t, e);
        };
      },
      1866: (e, t, n) => {
        var r = n(4536);
        e.exports = function (e, t) {
          var n = this.__data__;
          return (
            (this.size += this.has(e) ? 0 : 1),
            (n[e] = r && void 0 === t ? '__lodash_hash_undefined__' : t),
            this
          );
        };
      },
      3824: (e) => {
        var t = Object.prototype.hasOwnProperty;
        e.exports = function (e) {
          var n = e.length,
            r = new e.constructor(n);
          return (
            n &&
              'string' == typeof e[0] &&
              t.call(e, 'index') &&
              ((r.index = e.index), (r.input = e.input)),
            r
          );
        };
      },
      9148: (e, t, n) => {
        var r = n(4318),
          o = n(7157),
          i = n(3147),
          a = n(419),
          s = n(7133);
        e.exports = function (e, t, n) {
          var c = e.constructor;
          switch (t) {
            case '[object ArrayBuffer]':
              return r(e);
            case '[object Boolean]':
            case '[object Date]':
              return new c(+e);
            case '[object DataView]':
              return o(e, n);
            case '[object Float32Array]':
            case '[object Float64Array]':
            case '[object Int8Array]':
            case '[object Int16Array]':
            case '[object Int32Array]':
            case '[object Uint8Array]':
            case '[object Uint8ClampedArray]':
            case '[object Uint16Array]':
            case '[object Uint32Array]':
              return s(e, n);
            case '[object Map]':
            case '[object Set]':
              return new c();
            case '[object Number]':
            case '[object String]':
              return new c(e);
            case '[object RegExp]':
              return i(e);
            case '[object Symbol]':
              return a(e);
          }
        };
      },
      8517: (e, t, n) => {
        var r = n(3118),
          o = n(5924),
          i = n(5726);
        e.exports = function (e) {
          return 'function' != typeof e.constructor || i(e) ? {} : r(o(e));
        };
      },
      5776: (e) => {
        var t = /^(?:0|[1-9]\d*)$/;
        e.exports = function (e, n) {
          var r = typeof e;
          return (
            !!(n = null == n ? 9007199254740991 : n) &&
            ('number' == r || ('symbol' != r && t.test(e))) &&
            e > -1 &&
            e % 1 == 0 &&
            e < n
          );
        };
      },
      7019: (e) => {
        e.exports = function (e) {
          var t = typeof e;
          return 'string' == t ||
            'number' == t ||
            'symbol' == t ||
            'boolean' == t
            ? '__proto__' !== e
            : null === e;
        };
      },
      5346: (e, t, n) => {
        var r,
          o = n(4429),
          i = (r = /[^.]+$/.exec((o && o.keys && o.keys.IE_PROTO) || ''))
            ? 'Symbol(src)_1.' + r
            : '';
        e.exports = function (e) {
          return !!i && i in e;
        };
      },
      5726: (e) => {
        var t = Object.prototype;
        e.exports = function (e) {
          var n = e && e.constructor;
          return e === (('function' == typeof n && n.prototype) || t);
        };
      },
      7040: (e) => {
        e.exports = function () {
          (this.__data__ = []), (this.size = 0);
        };
      },
      4125: (e, t, n) => {
        var r = n(8470),
          o = Array.prototype.splice;
        e.exports = function (e) {
          var t = this.__data__,
            n = r(t, e);
          return !(
            n < 0 ||
            (n == t.length - 1 ? t.pop() : o.call(t, n, 1), --this.size, 0)
          );
        };
      },
      2117: (e, t, n) => {
        var r = n(8470);
        e.exports = function (e) {
          var t = this.__data__,
            n = r(t, e);
          return n < 0 ? void 0 : t[n][1];
        };
      },
      7518: (e, t, n) => {
        var r = n(8470);
        e.exports = function (e) {
          return r(this.__data__, e) > -1;
        };
      },
      4705: (e, t, n) => {
        var r = n(8470);
        e.exports = function (e, t) {
          var n = this.__data__,
            o = r(n, e);
          return o < 0 ? (++this.size, n.push([e, t])) : (n[o][1] = t), this;
        };
      },
      4785: (e, t, n) => {
        var r = n(1989),
          o = n(8407),
          i = n(7071);
        e.exports = function () {
          (this.size = 0),
            (this.__data__ = {
              hash: new r(),
              map: new (i || o)(),
              string: new r(),
            });
        };
      },
      1285: (e, t, n) => {
        var r = n(5050);
        e.exports = function (e) {
          var t = r(this, e).delete(e);
          return (this.size -= t ? 1 : 0), t;
        };
      },
      6e3: (e, t, n) => {
        var r = n(5050);
        e.exports = function (e) {
          return r(this, e).get(e);
        };
      },
      9916: (e, t, n) => {
        var r = n(5050);
        e.exports = function (e) {
          return r(this, e).has(e);
        };
      },
      5265: (e, t, n) => {
        var r = n(5050);
        e.exports = function (e, t) {
          var n = r(this, e),
            o = n.size;
          return n.set(e, t), (this.size += n.size == o ? 0 : 1), this;
        };
      },
      4536: (e, t, n) => {
        var r = n(852)(Object, 'create');
        e.exports = r;
      },
      6916: (e, t, n) => {
        var r = n(5569)(Object.keys, Object);
        e.exports = r;
      },
      3498: (e) => {
        e.exports = function (e) {
          var t = [];
          if (null != e) for (var n in Object(e)) t.push(n);
          return t;
        };
      },
      1167: (e, t, n) => {
        e = n.nmd(e);
        var r = n(1957),
          o = t && !t.nodeType && t,
          i = o && e && !e.nodeType && e,
          a = i && i.exports === o && r.process,
          s = (function () {
            try {
              return (
                (i && i.require && i.require('util').types) ||
                (a && a.binding && a.binding('util'))
              );
            } catch (e) {}
          })();
        e.exports = s;
      },
      2333: (e) => {
        var t = Object.prototype.toString;
        e.exports = function (e) {
          return t.call(e);
        };
      },
      5569: (e) => {
        e.exports = function (e, t) {
          return function (n) {
            return e(t(n));
          };
        };
      },
      5639: (e, t, n) => {
        var r = n(1957),
          o = 'object' == typeof self && self && self.Object === Object && self,
          i = r || o || Function('return this')();
        e.exports = i;
      },
      7465: (e, t, n) => {
        var r = n(8407);
        e.exports = function () {
          (this.__data__ = new r()), (this.size = 0);
        };
      },
      3779: (e) => {
        e.exports = function (e) {
          var t = this.__data__,
            n = t.delete(e);
          return (this.size = t.size), n;
        };
      },
      7599: (e) => {
        e.exports = function (e) {
          return this.__data__.get(e);
        };
      },
      4758: (e) => {
        e.exports = function (e) {
          return this.__data__.has(e);
        };
      },
      4309: (e, t, n) => {
        var r = n(8407),
          o = n(7071),
          i = n(3369);
        e.exports = function (e, t) {
          var n = this.__data__;
          if (n instanceof r) {
            var a = n.__data__;
            if (!o || a.length < 199)
              return a.push([e, t]), (this.size = ++n.size), this;
            n = this.__data__ = new i(a);
          }
          return n.set(e, t), (this.size = n.size), this;
        };
      },
      346: (e) => {
        var t = Function.prototype.toString;
        e.exports = function (e) {
          if (null != e) {
            try {
              return t.call(e);
            } catch (e) {}
            try {
              return e + '';
            } catch (e) {}
          }
          return '';
        };
      },
      361: (e, t, n) => {
        var r = n(5990);
        e.exports = function (e) {
          return r(e, 5);
        };
      },
      7813: (e) => {
        e.exports = function (e, t) {
          return e === t || (e != e && t != t);
        };
      },
      5694: (e, t, n) => {
        var r = n(9454),
          o = n(7005),
          i = Object.prototype,
          a = i.hasOwnProperty,
          s = i.propertyIsEnumerable,
          c = r(
            (function () {
              return arguments;
            })()
          )
            ? r
            : function (e) {
                return o(e) && a.call(e, 'callee') && !s.call(e, 'callee');
              };
        e.exports = c;
      },
      1469: (e) => {
        var t = Array.isArray;
        e.exports = t;
      },
      8612: (e, t, n) => {
        var r = n(3560),
          o = n(1780);
        e.exports = function (e) {
          return null != e && o(e.length) && !r(e);
        };
      },
      4144: (e, t, n) => {
        e = n.nmd(e);
        var r = n(5639),
          o = n(5062),
          i = t && !t.nodeType && t,
          a = i && e && !e.nodeType && e,
          s = a && a.exports === i ? r.Buffer : void 0,
          c = (s ? s.isBuffer : void 0) || o;
        e.exports = c;
      },
      3560: (e, t, n) => {
        var r = n(4239),
          o = n(3218);
        e.exports = function (e) {
          if (!o(e)) return !1;
          var t = r(e);
          return (
            '[object Function]' == t ||
            '[object GeneratorFunction]' == t ||
            '[object AsyncFunction]' == t ||
            '[object Proxy]' == t
          );
        };
      },
      1780: (e) => {
        e.exports = function (e) {
          return (
            'number' == typeof e &&
            e > -1 &&
            e % 1 == 0 &&
            e <= 9007199254740991
          );
        };
      },
      6688: (e, t, n) => {
        var r = n(5588),
          o = n(1717),
          i = n(1167),
          a = i && i.isMap,
          s = a ? o(a) : r;
        e.exports = s;
      },
      3218: (e) => {
        e.exports = function (e) {
          var t = typeof e;
          return null != e && ('object' == t || 'function' == t);
        };
      },
      7005: (e) => {
        e.exports = function (e) {
          return null != e && 'object' == typeof e;
        };
      },
      2928: (e, t, n) => {
        var r = n(9221),
          o = n(1717),
          i = n(1167),
          a = i && i.isSet,
          s = a ? o(a) : r;
        e.exports = s;
      },
      6719: (e, t, n) => {
        var r = n(8749),
          o = n(1717),
          i = n(1167),
          a = i && i.isTypedArray,
          s = a ? o(a) : r;
        e.exports = s;
      },
      3674: (e, t, n) => {
        var r = n(4636),
          o = n(280),
          i = n(8612);
        e.exports = function (e) {
          return i(e) ? r(e) : o(e);
        };
      },
      1704: (e, t, n) => {
        var r = n(4636),
          o = n(313),
          i = n(8612);
        e.exports = function (e) {
          return i(e) ? r(e, !0) : o(e);
        };
      },
      479: (e) => {
        e.exports = function () {
          return [];
        };
      },
      5062: (e) => {
        e.exports = function () {
          return !1;
        };
      },
      959: function (e, t, n) {
        e.exports = (function (e) {
          'use strict';
          e = e && e.hasOwnProperty('default') ? e.default : e;
          var t =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      'function' == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e;
                  },
            n = function (e, t) {
              if (!(e instanceof t))
                throw new TypeError('Cannot call a class as a function');
            },
            r = (function () {
              function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  (r.enumerable = r.enumerable || !1),
                    (r.configurable = !0),
                    'value' in r && (r.writable = !0),
                    Object.defineProperty(e, r.key, r);
                }
              }
              return function (t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
              };
            })(),
            o =
              Object.assign ||
              function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n = arguments[t];
                  for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
                }
                return e;
              },
            i = (function () {
              function e(t) {
                var r =
                    !(arguments.length > 1 && void 0 !== arguments[1]) ||
                    arguments[1],
                  o =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : [],
                  i =
                    arguments.length > 3 && void 0 !== arguments[3]
                      ? arguments[3]
                      : 5e3;
                n(this, e),
                  (this.ctx = t),
                  (this.iframes = r),
                  (this.exclude = o),
                  (this.iframesTimeout = i);
              }
              return (
                r(
                  e,
                  [
                    {
                      key: 'getContexts',
                      value: function () {
                        var e = [];
                        return (
                          (void 0 !== this.ctx && this.ctx
                            ? NodeList.prototype.isPrototypeOf(this.ctx)
                              ? Array.prototype.slice.call(this.ctx)
                              : Array.isArray(this.ctx)
                              ? this.ctx
                              : 'string' == typeof this.ctx
                              ? Array.prototype.slice.call(
                                  document.querySelectorAll(this.ctx)
                                )
                              : [this.ctx]
                            : []
                          ).forEach(function (t) {
                            var n =
                              e.filter(function (e) {
                                return e.contains(t);
                              }).length > 0;
                            -1 !== e.indexOf(t) || n || e.push(t);
                          }),
                          e
                        );
                      },
                    },
                    {
                      key: 'getIframeContents',
                      value: function (e, t) {
                        var n =
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : function () {},
                          r = void 0;
                        try {
                          var o = e.contentWindow;
                          if (((r = o.document), !o || !r))
                            throw new Error('iframe inaccessible');
                        } catch (e) {
                          n();
                        }
                        r && t(r);
                      },
                    },
                    {
                      key: 'isIframeBlank',
                      value: function (e) {
                        var t = 'about:blank',
                          n = e.getAttribute('src').trim();
                        return (
                          e.contentWindow.location.href === t && n !== t && n
                        );
                      },
                    },
                    {
                      key: 'observeIframeLoad',
                      value: function (e, t, n) {
                        var r = this,
                          o = !1,
                          i = null,
                          a = function a() {
                            if (!o) {
                              (o = !0), clearTimeout(i);
                              try {
                                r.isIframeBlank(e) ||
                                  (e.removeEventListener('load', a),
                                  r.getIframeContents(e, t, n));
                              } catch (e) {
                                n();
                              }
                            }
                          };
                        e.addEventListener('load', a),
                          (i = setTimeout(a, this.iframesTimeout));
                      },
                    },
                    {
                      key: 'onIframeReady',
                      value: function (e, t, n) {
                        try {
                          'complete' === e.contentWindow.document.readyState
                            ? this.isIframeBlank(e)
                              ? this.observeIframeLoad(e, t, n)
                              : this.getIframeContents(e, t, n)
                            : this.observeIframeLoad(e, t, n);
                        } catch (e) {
                          n();
                        }
                      },
                    },
                    {
                      key: 'waitForIframes',
                      value: function (e, t) {
                        var n = this,
                          r = 0;
                        this.forEachIframe(
                          e,
                          function () {
                            return !0;
                          },
                          function (e) {
                            r++,
                              n.waitForIframes(
                                e.querySelector('html'),
                                function () {
                                  --r || t();
                                }
                              );
                          },
                          function (e) {
                            e || t();
                          }
                        );
                      },
                    },
                    {
                      key: 'forEachIframe',
                      value: function (t, n, r) {
                        var o = this,
                          i =
                            arguments.length > 3 && void 0 !== arguments[3]
                              ? arguments[3]
                              : function () {},
                          a = t.querySelectorAll('iframe'),
                          s = a.length,
                          c = 0;
                        a = Array.prototype.slice.call(a);
                        var l = function () {
                          --s <= 0 && i(c);
                        };
                        s || l(),
                          a.forEach(function (t) {
                            e.matches(t, o.exclude)
                              ? l()
                              : o.onIframeReady(
                                  t,
                                  function (e) {
                                    n(t) && (c++, r(e)), l();
                                  },
                                  l
                                );
                          });
                      },
                    },
                    {
                      key: 'createIterator',
                      value: function (e, t, n) {
                        return document.createNodeIterator(e, t, n, !1);
                      },
                    },
                    {
                      key: 'createInstanceOnIframe',
                      value: function (t) {
                        return new e(t.querySelector('html'), this.iframes);
                      },
                    },
                    {
                      key: 'compareNodeIframe',
                      value: function (e, t, n) {
                        if (
                          e.compareDocumentPosition(n) &
                          Node.DOCUMENT_POSITION_PRECEDING
                        ) {
                          if (null === t) return !0;
                          if (
                            t.compareDocumentPosition(n) &
                            Node.DOCUMENT_POSITION_FOLLOWING
                          )
                            return !0;
                        }
                        return !1;
                      },
                    },
                    {
                      key: 'getIteratorNode',
                      value: function (e) {
                        var t = e.previousNode();
                        return {
                          prevNode: t,
                          node: (null === t || e.nextNode()) && e.nextNode(),
                        };
                      },
                    },
                    {
                      key: 'checkIframeFilter',
                      value: function (e, t, n, r) {
                        var o = !1,
                          i = !1;
                        return (
                          r.forEach(function (e, t) {
                            e.val === n && ((o = t), (i = e.handled));
                          }),
                          this.compareNodeIframe(e, t, n)
                            ? (!1 !== o || i
                                ? !1 === o || i || (r[o].handled = !0)
                                : r.push({ val: n, handled: !0 }),
                              !0)
                            : (!1 === o && r.push({ val: n, handled: !1 }), !1)
                        );
                      },
                    },
                    {
                      key: 'handleOpenIframes',
                      value: function (e, t, n, r) {
                        var o = this;
                        e.forEach(function (e) {
                          e.handled ||
                            o.getIframeContents(e.val, function (e) {
                              o.createInstanceOnIframe(e).forEachNode(t, n, r);
                            });
                        });
                      },
                    },
                    {
                      key: 'iterateThroughNodes',
                      value: function (e, t, n, r, o) {
                        for (
                          var i = this,
                            a = this.createIterator(t, e, r),
                            s = [],
                            c = [],
                            l = void 0,
                            u = void 0;
                          (p = void 0),
                            (p = i.getIteratorNode(a)),
                            (u = p.prevNode),
                            (l = p.node);

                        )
                          this.iframes &&
                            this.forEachIframe(
                              t,
                              function (e) {
                                return i.checkIframeFilter(l, u, e, s);
                              },
                              function (t) {
                                i.createInstanceOnIframe(t).forEachNode(
                                  e,
                                  function (e) {
                                    return c.push(e);
                                  },
                                  r
                                );
                              }
                            ),
                            c.push(l);
                        var p;
                        c.forEach(function (e) {
                          n(e);
                        }),
                          this.iframes && this.handleOpenIframes(s, e, n, r),
                          o();
                      },
                    },
                    {
                      key: 'forEachNode',
                      value: function (e, t, n) {
                        var r = this,
                          o =
                            arguments.length > 3 && void 0 !== arguments[3]
                              ? arguments[3]
                              : function () {},
                          i = this.getContexts(),
                          a = i.length;
                        a || o(),
                          i.forEach(function (i) {
                            var s = function () {
                              r.iterateThroughNodes(e, i, t, n, function () {
                                --a <= 0 && o();
                              });
                            };
                            r.iframes ? r.waitForIframes(i, s) : s();
                          });
                      },
                    },
                  ],
                  [
                    {
                      key: 'matches',
                      value: function (e, t) {
                        var n = 'string' == typeof t ? [t] : t,
                          r =
                            e.matches ||
                            e.matchesSelector ||
                            e.msMatchesSelector ||
                            e.mozMatchesSelector ||
                            e.oMatchesSelector ||
                            e.webkitMatchesSelector;
                        if (r) {
                          var o = !1;
                          return (
                            n.every(function (t) {
                              return !r.call(e, t) || ((o = !0), !1);
                            }),
                            o
                          );
                        }
                        return !1;
                      },
                    },
                  ]
                ),
                e
              );
            })(),
            a = (function () {
              function e(t) {
                n(this, e), (this.ctx = t), (this.ie = !1);
                var r = window.navigator.userAgent;
                (r.indexOf('MSIE') > -1 || r.indexOf('Trident') > -1) &&
                  (this.ie = !0);
              }
              return (
                r(e, [
                  {
                    key: 'log',
                    value: function (e) {
                      var n =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : 'debug',
                        r = this.opt.log;
                      this.opt.debug &&
                        'object' === (void 0 === r ? 'undefined' : t(r)) &&
                        'function' == typeof r[n] &&
                        r[n]('mark.js: ' + e);
                    },
                  },
                  {
                    key: 'escapeStr',
                    value: function (e) {
                      return e.replace(
                        /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
                        '\\$&'
                      );
                    },
                  },
                  {
                    key: 'createRegExp',
                    value: function (e) {
                      return (
                        'disabled' !== this.opt.wildcards &&
                          (e = this.setupWildcardsRegExp(e)),
                        (e = this.escapeStr(e)),
                        Object.keys(this.opt.synonyms).length &&
                          (e = this.createSynonymsRegExp(e)),
                        (this.opt.ignoreJoiners ||
                          this.opt.ignorePunctuation.length) &&
                          (e = this.setupIgnoreJoinersRegExp(e)),
                        this.opt.diacritics &&
                          (e = this.createDiacriticsRegExp(e)),
                        (e = this.createMergedBlanksRegExp(e)),
                        (this.opt.ignoreJoiners ||
                          this.opt.ignorePunctuation.length) &&
                          (e = this.createJoinersRegExp(e)),
                        'disabled' !== this.opt.wildcards &&
                          (e = this.createWildcardsRegExp(e)),
                        this.createAccuracyRegExp(e)
                      );
                    },
                  },
                  {
                    key: 'createSynonymsRegExp',
                    value: function (e) {
                      var t = this.opt.synonyms,
                        n = this.opt.caseSensitive ? '' : 'i',
                        r =
                          this.opt.ignoreJoiners ||
                          this.opt.ignorePunctuation.length
                            ? '\0'
                            : '';
                      for (var o in t)
                        if (t.hasOwnProperty(o)) {
                          var i = t[o],
                            a =
                              'disabled' !== this.opt.wildcards
                                ? this.setupWildcardsRegExp(o)
                                : this.escapeStr(o),
                            s =
                              'disabled' !== this.opt.wildcards
                                ? this.setupWildcardsRegExp(i)
                                : this.escapeStr(i);
                          '' !== a &&
                            '' !== s &&
                            (e = e.replace(
                              new RegExp(
                                '(' +
                                  this.escapeStr(a) +
                                  '|' +
                                  this.escapeStr(s) +
                                  ')',
                                'gm' + n
                              ),
                              r +
                                '(' +
                                this.processSynomyms(a) +
                                '|' +
                                this.processSynomyms(s) +
                                ')' +
                                r
                            ));
                        }
                      return e;
                    },
                  },
                  {
                    key: 'processSynomyms',
                    value: function (e) {
                      return (
                        (this.opt.ignoreJoiners ||
                          this.opt.ignorePunctuation.length) &&
                          (e = this.setupIgnoreJoinersRegExp(e)),
                        e
                      );
                    },
                  },
                  {
                    key: 'setupWildcardsRegExp',
                    value: function (e) {
                      return (e = e.replace(/(?:\\)*\?/g, function (e) {
                        return '\\' === e.charAt(0) ? '?' : '';
                      })).replace(/(?:\\)*\*/g, function (e) {
                        return '\\' === e.charAt(0) ? '*' : '';
                      });
                    },
                  },
                  {
                    key: 'createWildcardsRegExp',
                    value: function (e) {
                      var t = 'withSpaces' === this.opt.wildcards;
                      return e
                        .replace(/\u0001/g, t ? '[\\S\\s]?' : '\\S?')
                        .replace(/\u0002/g, t ? '[\\S\\s]*?' : '\\S*');
                    },
                  },
                  {
                    key: 'setupIgnoreJoinersRegExp',
                    value: function (e) {
                      return e.replace(/[^(|)\\]/g, function (e, t, n) {
                        var r = n.charAt(t + 1);
                        return /[(|)\\]/.test(r) || '' === r ? e : e + '\0';
                      });
                    },
                  },
                  {
                    key: 'createJoinersRegExp',
                    value: function (e) {
                      var t = [],
                        n = this.opt.ignorePunctuation;
                      return (
                        Array.isArray(n) &&
                          n.length &&
                          t.push(this.escapeStr(n.join(''))),
                        this.opt.ignoreJoiners &&
                          t.push('\\u00ad\\u200b\\u200c\\u200d'),
                        t.length
                          ? e.split(/\u0000+/).join('[' + t.join('') + ']*')
                          : e
                      );
                    },
                  },
                  {
                    key: 'createDiacriticsRegExp',
                    value: function (e) {
                      var t = this.opt.caseSensitive ? '' : 'i',
                        n = this.opt.caseSensitive
                          ? [
                              'aàáảãạăằắẳẵặâầấẩẫậäåāą',
                              'AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ',
                              'cçćč',
                              'CÇĆČ',
                              'dđď',
                              'DĐĎ',
                              'eèéẻẽẹêềếểễệëěēę',
                              'EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ',
                              'iìíỉĩịîïī',
                              'IÌÍỈĨỊÎÏĪ',
                              'lł',
                              'LŁ',
                              'nñňń',
                              'NÑŇŃ',
                              'oòóỏõọôồốổỗộơởỡớờợöøō',
                              'OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ',
                              'rř',
                              'RŘ',
                              'sšśșş',
                              'SŠŚȘŞ',
                              'tťțţ',
                              'TŤȚŢ',
                              'uùúủũụưừứửữựûüůū',
                              'UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ',
                              'yýỳỷỹỵÿ',
                              'YÝỲỶỸỴŸ',
                              'zžżź',
                              'ZŽŻŹ',
                            ]
                          : [
                              'aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ',
                              'cçćčCÇĆČ',
                              'dđďDĐĎ',
                              'eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ',
                              'iìíỉĩịîïīIÌÍỈĨỊÎÏĪ',
                              'lłLŁ',
                              'nñňńNÑŇŃ',
                              'oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ',
                              'rřRŘ',
                              'sšśșşSŠŚȘŞ',
                              'tťțţTŤȚŢ',
                              'uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ',
                              'yýỳỷỹỵÿYÝỲỶỸỴŸ',
                              'zžżźZŽŻŹ',
                            ],
                        r = [];
                      return (
                        e.split('').forEach(function (o) {
                          n.every(function (n) {
                            if (-1 !== n.indexOf(o)) {
                              if (r.indexOf(n) > -1) return !1;
                              (e = e.replace(
                                new RegExp('[' + n + ']', 'gm' + t),
                                '[' + n + ']'
                              )),
                                r.push(n);
                            }
                            return !0;
                          });
                        }),
                        e
                      );
                    },
                  },
                  {
                    key: 'createMergedBlanksRegExp',
                    value: function (e) {
                      return e.replace(/[\s]+/gim, '[\\s]+');
                    },
                  },
                  {
                    key: 'createAccuracyRegExp',
                    value: function (e) {
                      var t = this,
                        n = this.opt.accuracy,
                        r = 'string' == typeof n ? n : n.value,
                        o = 'string' == typeof n ? [] : n.limiters,
                        i = '';
                      switch (
                        (o.forEach(function (e) {
                          i += '|' + t.escapeStr(e);
                        }),
                        r)
                      ) {
                        case 'partially':
                        default:
                          return '()(' + e + ')';
                        case 'complementary':
                          return (
                            '()([^' +
                            (i =
                              '\\s' +
                              (i ||
                                this.escapeStr(
                                  '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~¡¿'
                                ))) +
                            ']*' +
                            e +
                            '[^' +
                            i +
                            ']*)'
                          );
                        case 'exactly':
                          return (
                            '(^|\\s' + i + ')(' + e + ')(?=$|\\s' + i + ')'
                          );
                      }
                    },
                  },
                  {
                    key: 'getSeparatedKeywords',
                    value: function (e) {
                      var t = this,
                        n = [];
                      return (
                        e.forEach(function (e) {
                          t.opt.separateWordSearch
                            ? e.split(' ').forEach(function (e) {
                                e.trim() && -1 === n.indexOf(e) && n.push(e);
                              })
                            : e.trim() && -1 === n.indexOf(e) && n.push(e);
                        }),
                        {
                          keywords: n.sort(function (e, t) {
                            return t.length - e.length;
                          }),
                          length: n.length,
                        }
                      );
                    },
                  },
                  {
                    key: 'isNumeric',
                    value: function (e) {
                      return Number(parseFloat(e)) == e;
                    },
                  },
                  {
                    key: 'checkRanges',
                    value: function (e) {
                      var t = this;
                      if (
                        !Array.isArray(e) ||
                        '[object Object]' !==
                          Object.prototype.toString.call(e[0])
                      )
                        return (
                          this.log(
                            'markRanges() will only accept an array of objects'
                          ),
                          this.opt.noMatch(e),
                          []
                        );
                      var n = [],
                        r = 0;
                      return (
                        e
                          .sort(function (e, t) {
                            return e.start - t.start;
                          })
                          .forEach(function (e) {
                            var o = t.callNoMatchOnInvalidRanges(e, r),
                              i = o.start,
                              a = o.end;
                            o.valid &&
                              ((e.start = i),
                              (e.length = a - i),
                              n.push(e),
                              (r = a));
                          }),
                        n
                      );
                    },
                  },
                  {
                    key: 'callNoMatchOnInvalidRanges',
                    value: function (e, t) {
                      var n = void 0,
                        r = void 0,
                        o = !1;
                      return (
                        e && void 0 !== e.start
                          ? ((r =
                              (n = parseInt(e.start, 10)) +
                              parseInt(e.length, 10)),
                            this.isNumeric(e.start) &&
                            this.isNumeric(e.length) &&
                            r - t > 0 &&
                            r - n > 0
                              ? (o = !0)
                              : (this.log(
                                  'Ignoring invalid or overlapping range: ' +
                                    JSON.stringify(e)
                                ),
                                this.opt.noMatch(e)))
                          : (this.log(
                              'Ignoring invalid range: ' + JSON.stringify(e)
                            ),
                            this.opt.noMatch(e)),
                        { start: n, end: r, valid: o }
                      );
                    },
                  },
                  {
                    key: 'checkWhitespaceRanges',
                    value: function (e, t, n) {
                      var r = void 0,
                        o = !0,
                        i = n.length,
                        a = t - i,
                        s = parseInt(e.start, 10) - a;
                      return (
                        (r = (s = s > i ? i : s) + parseInt(e.length, 10)) >
                          i &&
                          ((r = i),
                          this.log(
                            'End range automatically set to the max value of ' +
                              i
                          )),
                        s < 0 || r - s < 0 || s > i || r > i
                          ? ((o = !1),
                            this.log('Invalid range: ' + JSON.stringify(e)),
                            this.opt.noMatch(e))
                          : '' === n.substring(s, r).replace(/\s+/g, '') &&
                            ((o = !1),
                            this.log(
                              'Skipping whitespace only range: ' +
                                JSON.stringify(e)
                            ),
                            this.opt.noMatch(e)),
                        { start: s, end: r, valid: o }
                      );
                    },
                  },
                  {
                    key: 'getTextNodes',
                    value: function (e) {
                      var t = this,
                        n = '',
                        r = [];
                      this.iterator.forEachNode(
                        NodeFilter.SHOW_TEXT,
                        function (e) {
                          r.push({
                            start: n.length,
                            end: (n += e.textContent).length,
                            node: e,
                          });
                        },
                        function (e) {
                          return t.matchesExclude(e.parentNode)
                            ? NodeFilter.FILTER_REJECT
                            : NodeFilter.FILTER_ACCEPT;
                        },
                        function () {
                          e({ value: n, nodes: r });
                        }
                      );
                    },
                  },
                  {
                    key: 'matchesExclude',
                    value: function (e) {
                      return i.matches(
                        e,
                        this.opt.exclude.concat([
                          'script',
                          'style',
                          'title',
                          'head',
                          'html',
                        ])
                      );
                    },
                  },
                  {
                    key: 'wrapRangeInTextNode',
                    value: function (e, t, n) {
                      var r = this.opt.element ? this.opt.element : 'mark',
                        o = e.splitText(t),
                        i = o.splitText(n - t),
                        a = document.createElement(r);
                      return (
                        a.setAttribute('data-markjs', 'true'),
                        this.opt.className &&
                          a.setAttribute('class', this.opt.className),
                        (a.textContent = o.textContent),
                        o.parentNode.replaceChild(a, o),
                        i
                      );
                    },
                  },
                  {
                    key: 'wrapRangeInMappedTextNode',
                    value: function (e, t, n, r, o) {
                      var i = this;
                      e.nodes.every(function (a, s) {
                        var c = e.nodes[s + 1];
                        if (void 0 === c || c.start > t) {
                          if (!r(a.node)) return !1;
                          var l = t - a.start,
                            u = (n > a.end ? a.end : n) - a.start,
                            p = e.value.substr(0, a.start),
                            d = e.value.substr(u + a.start);
                          if (
                            ((a.node = i.wrapRangeInTextNode(a.node, l, u)),
                            (e.value = p + d),
                            e.nodes.forEach(function (t, n) {
                              n >= s &&
                                (e.nodes[n].start > 0 &&
                                  n !== s &&
                                  (e.nodes[n].start -= u),
                                (e.nodes[n].end -= u));
                            }),
                            (n -= u),
                            o(a.node.previousSibling, a.start),
                            !(n > a.end))
                          )
                            return !1;
                          t = a.end;
                        }
                        return !0;
                      });
                    },
                  },
                  {
                    key: 'wrapMatches',
                    value: function (e, t, n, r, o) {
                      var i = this,
                        a = 0 === t ? 0 : t + 1;
                      this.getTextNodes(function (t) {
                        t.nodes.forEach(function (t) {
                          t = t.node;
                          for (
                            var o = void 0;
                            null !== (o = e.exec(t.textContent)) && '' !== o[a];

                          )
                            if (n(o[a], t)) {
                              var s = o.index;
                              if (0 !== a)
                                for (var c = 1; c < a; c++) s += o[c].length;
                              (t = i.wrapRangeInTextNode(
                                t,
                                s,
                                s + o[a].length
                              )),
                                r(t.previousSibling),
                                (e.lastIndex = 0);
                            }
                        }),
                          o();
                      });
                    },
                  },
                  {
                    key: 'wrapMatchesAcrossElements',
                    value: function (e, t, n, r, o) {
                      var i = this,
                        a = 0 === t ? 0 : t + 1;
                      this.getTextNodes(function (t) {
                        for (
                          var s = void 0;
                          null !== (s = e.exec(t.value)) && '' !== s[a];

                        ) {
                          var c = s.index;
                          if (0 !== a)
                            for (var l = 1; l < a; l++) c += s[l].length;
                          var u = c + s[a].length;
                          i.wrapRangeInMappedTextNode(
                            t,
                            c,
                            u,
                            function (e) {
                              return n(s[a], e);
                            },
                            function (t, n) {
                              (e.lastIndex = n), r(t);
                            }
                          );
                        }
                        o();
                      });
                    },
                  },
                  {
                    key: 'wrapRangeFromIndex',
                    value: function (e, t, n, r) {
                      var o = this;
                      this.getTextNodes(function (i) {
                        var a = i.value.length;
                        e.forEach(function (e, r) {
                          var s = o.checkWhitespaceRanges(e, a, i.value),
                            c = s.start,
                            l = s.end;
                          s.valid &&
                            o.wrapRangeInMappedTextNode(
                              i,
                              c,
                              l,
                              function (n) {
                                return t(n, e, i.value.substring(c, l), r);
                              },
                              function (t) {
                                n(t, e);
                              }
                            );
                        }),
                          r();
                      });
                    },
                  },
                  {
                    key: 'unwrapMatches',
                    value: function (e) {
                      for (
                        var t = e.parentNode,
                          n = document.createDocumentFragment();
                        e.firstChild;

                      )
                        n.appendChild(e.removeChild(e.firstChild));
                      t.replaceChild(n, e),
                        this.ie ? this.normalizeTextNode(t) : t.normalize();
                    },
                  },
                  {
                    key: 'normalizeTextNode',
                    value: function (e) {
                      if (e) {
                        if (3 === e.nodeType)
                          for (
                            ;
                            e.nextSibling && 3 === e.nextSibling.nodeType;

                          )
                            (e.nodeValue += e.nextSibling.nodeValue),
                              e.parentNode.removeChild(e.nextSibling);
                        else this.normalizeTextNode(e.firstChild);
                        this.normalizeTextNode(e.nextSibling);
                      }
                    },
                  },
                  {
                    key: 'markRegExp',
                    value: function (e, t) {
                      var n = this;
                      (this.opt = t),
                        this.log('Searching with expression "' + e + '"');
                      var r = 0,
                        o = 'wrapMatches';
                      this.opt.acrossElements &&
                        (o = 'wrapMatchesAcrossElements'),
                        this[o](
                          e,
                          this.opt.ignoreGroups,
                          function (e, t) {
                            return n.opt.filter(t, e, r);
                          },
                          function (e) {
                            r++, n.opt.each(e);
                          },
                          function () {
                            0 === r && n.opt.noMatch(e), n.opt.done(r);
                          }
                        );
                    },
                  },
                  {
                    key: 'mark',
                    value: function (e, t) {
                      var n = this;
                      this.opt = t;
                      var r = 0,
                        o = 'wrapMatches',
                        i = this.getSeparatedKeywords(
                          'string' == typeof e ? [e] : e
                        ),
                        a = i.keywords,
                        s = i.length,
                        c = this.opt.caseSensitive ? '' : 'i';
                      this.opt.acrossElements &&
                        (o = 'wrapMatchesAcrossElements'),
                        0 === s
                          ? this.opt.done(r)
                          : (function e(t) {
                              var i = new RegExp(n.createRegExp(t), 'gm' + c),
                                l = 0;
                              n.log('Searching with expression "' + i + '"'),
                                n[o](
                                  i,
                                  1,
                                  function (e, o) {
                                    return n.opt.filter(o, t, r, l);
                                  },
                                  function (e) {
                                    l++, r++, n.opt.each(e);
                                  },
                                  function () {
                                    0 === l && n.opt.noMatch(t),
                                      a[s - 1] === t
                                        ? n.opt.done(r)
                                        : e(a[a.indexOf(t) + 1]);
                                  }
                                );
                            })(a[0]);
                    },
                  },
                  {
                    key: 'markRanges',
                    value: function (e, t) {
                      var n = this;
                      this.opt = t;
                      var r = 0,
                        o = this.checkRanges(e);
                      o && o.length
                        ? (this.log(
                            'Starting to mark with the following ranges: ' +
                              JSON.stringify(o)
                          ),
                          this.wrapRangeFromIndex(
                            o,
                            function (e, t, r, o) {
                              return n.opt.filter(e, t, r, o);
                            },
                            function (e, t) {
                              r++, n.opt.each(e, t);
                            },
                            function () {
                              n.opt.done(r);
                            }
                          ))
                        : this.opt.done(r);
                    },
                  },
                  {
                    key: 'unmark',
                    value: function (e) {
                      var t = this;
                      this.opt = e;
                      var n = this.opt.element ? this.opt.element : '*';
                      (n += '[data-markjs]'),
                        this.opt.className && (n += '.' + this.opt.className),
                        this.log('Removal selector "' + n + '"'),
                        this.iterator.forEachNode(
                          NodeFilter.SHOW_ELEMENT,
                          function (e) {
                            t.unwrapMatches(e);
                          },
                          function (e) {
                            var r = i.matches(e, n),
                              o = t.matchesExclude(e);
                            return !r || o
                              ? NodeFilter.FILTER_REJECT
                              : NodeFilter.FILTER_ACCEPT;
                          },
                          this.opt.done
                        );
                    },
                  },
                  {
                    key: 'opt',
                    set: function (e) {
                      this._opt = o(
                        {},
                        {
                          element: '',
                          className: '',
                          exclude: [],
                          iframes: !1,
                          iframesTimeout: 5e3,
                          separateWordSearch: !0,
                          diacritics: !0,
                          synonyms: {},
                          accuracy: 'partially',
                          acrossElements: !1,
                          caseSensitive: !1,
                          ignoreJoiners: !1,
                          ignoreGroups: 0,
                          ignorePunctuation: [],
                          wildcards: 'disabled',
                          each: function () {},
                          noMatch: function () {},
                          filter: function () {
                            return !0;
                          },
                          done: function () {},
                          debug: !1,
                          log: window.console,
                        },
                        e
                      );
                    },
                    get: function () {
                      return this._opt;
                    },
                  },
                  {
                    key: 'iterator',
                    get: function () {
                      return new i(
                        this.ctx,
                        this.opt.iframes,
                        this.opt.exclude,
                        this.opt.iframesTimeout
                      );
                    },
                  },
                ]),
                e
              );
            })();
          return (
            (e.fn.mark = function (e, t) {
              return new a(this.get()).mark(e, t), this;
            }),
            (e.fn.markRegExp = function (e, t) {
              return new a(this.get()).markRegExp(e, t), this;
            }),
            (e.fn.markRanges = function (e, t) {
              return new a(this.get()).markRanges(e, t), this;
            }),
            (e.fn.unmark = function (e) {
              return new a(this.get()).unmark(e), this;
            }),
            e
          );
        })(n(9755));
      },
      42: (e, t, n) => {
        'use strict';
        n.d(t, { NC: () => Y, f: () => Z, _: () => ee });
        var r = n(361),
          o = n.n(r),
          i = (n(959), n(2531));
        function a(e, t, n, r) {
          if ('Own Ship' == e.type) return;
          var o = e.position,
            a = e.vecEnd,
            c = t.position,
            l = t.vecEnd,
            u = (l.x - c.x) / n,
            p = (l.y - c.y) / n,
            d = (a.x - o.x) / n,
            f = (a.y - o.y) / n;
          const h =
            (-c.y * p +
              o.y * p -
              d * o.x -
              u * c.x -
              f * o.y +
              d * c.x +
              u * o.x +
              f * c.y) /
            (Math.pow(d, 2) +
              Math.pow(u, 2) +
              Math.pow(p, 2) +
              Math.pow(f, 2) -
              2 * d * u -
              2 * f * p);
          e.tcpa = Math.round(10 * h) / 10;
          var g = h * ((l.x - c.x) / n) + c.x,
            v = h * ((l.y - c.y) / n) + c.y,
            m = h * ((a.x - o.x) / n) + o.x,
            y = h * ((a.y - o.y) / n) + o.y;
          (e.posAtCPA = new Point([m, y])),
            (e.ownPosAtCPA = new Point([g, v])),
            (e.vecToCPA = e.ownPosAtCPA.subtract(e.posAtCPA)),
            (e.USNRelAtCPA = s(i.v2(e.vecToCPA.angle), i.v2(t.vector.angle)));
          const b = Math.sqrt(Math.pow(m - g, 2) + Math.pow(y - v, 2));
          (e.cpaMiles = i.KO(b, r)), (e.cpa = b);
        }
        function s(e, t) {
          const n =
            (function (e) {
              return e > 180 ? e - 180 : e + 180;
            })(e) - t;
          return n < 0 ? n + 360 : n;
        }
        function c(e, t, n) {
          const r = (e / 60) * t;
          return i.rV(r, n);
        }
        function l(e, t, n) {
          const r = i.KO(e, n) * (60 / t);
          return Math.round(100 * r) / 100;
        }
        var u = n(9755);
        u.valHooks.number = {
          get: function (e) {
            return 1 * e.value;
          },
        };
        let p = [];
        var d = 0;
        let f = [],
          h = [],
          g = [],
          v = [],
          m = [],
          y = '';
        function b(e) {
          (this.start = Date.now()),
            (this.tgtNo = e),
            (this.relColour = {
              reported: '',
              actual: '',
              mark: { type: 'binary', availableMarks: 1, awardedMarks: '' },
            }),
            (this.relBearing = {
              reported: '',
              actual: '',
              mark: {
                type: 'margin',
                availableMarks: 1,
                moe: 5,
                awardedMarks: '',
              },
            }),
            (this.range = {
              reported: '',
              actual: '',
              mark: {
                type: 'margin',
                availableMarks: 1,
                moe: 1,
                awardedMarks: '',
              },
            }),
            (this.type = {
              reported: '',
              actual: '',
              mark: { type: 'binary', availableMarks: 1, awardedMarks: '' },
            }),
            (this.held = {
              reported: { visual: '', radar: '' },
              actual: { visual: '', radar: '' },
              mark: { type: 'binary', availableMarks: 1, awardedMarks: '' },
              comment: '',
            }),
            (this.aspectBearing = {
              reported: '',
              actual: '',
              mark: {
                type: 'margin',
                availableMarks: 1,
                moe: 5,
                awardedMarks: '',
              },
            }),
            (this.aspectSide = {
              reported: '',
              actual: '',
              mark: { type: 'binary', availableMarks: 1, awardedMarks: '' },
            }),
            (this.bearingDirection = {
              reported: '',
              actual: { direction: '', rate: '', rateUnit: 'deg/Min' },
              mark: { type: 'binary', availableMarks: 1, awardedMarks: '' },
            }),
            (this.cpa = {
              reported: '',
              actual: '',
              mark: {
                type: 'margin',
                availableMarks: 1,
                moe: 0.2,
                awardedMarks: '',
              },
            }),
            (this.cpaSide = {
              reported: '',
              actual: '',
              mark: { type: 'binary', availableMarks: 0.5, awardedMarks: '' },
            }),
            (this.cpaPos = {
              reported: '',
              actual: { relPosition: '', relValue: '' },
              mark: { type: 'binary', availableMarks: 0.5, awardedMarks: '' },
            }),
            (this.tcpa = {
              reported: '',
              actual: '',
              mark: {
                type: 'margin',
                availableMarks: 1,
                moe: 3,
                awardedMarks: '',
              },
            }),
            (this.rules = {
              reported: '',
              actual: '',
              mark: {
                type: 'compare',
                marksPerRule: 1,
                availableMarks: '',
                correctList: '',
                awardedMarks: '',
              },
            }),
            this.completed;
        }
        const x = function (e) {
            let t = u('.tab');
            u(t[d]).hide(),
              (d += e),
              (function () {
                1 == d && p.push(new b(u('#tgtSelector').val()));
                const e = p.length - 1;
                y = o()(window.shipsAfloat);
                let t = y.find((e) => e.name == u('#tgtSelector').val());
                if (
                  ((p[e].relColour.actual = (function (e) {
                    const t = e.USNRelFrmOwnShp;
                    switch (!0) {
                      case t >= 358 || t <= 2:
                        return "ship's head";
                      case t >= 178 && t <= 182:
                        return 'astern';
                      case t < 358 && t > 182:
                        return 'red';
                      case t > 2 && t < 178:
                        return 'green';
                    }
                  })(t)),
                  t.USNRelFrmOwnShp < 180
                    ? (p[e].relBearing.actual = t.USNRelFrmOwnShp)
                    : (p[e].relBearing.actual = 360 - t.USNRelFrmOwnShp),
                  (p[e].range.actual = t.range.toFixed(2)),
                  Z.resVis
                    ? (p[e].type.actual = t.typeSound)
                    : (p[e].type.actual = t.type),
                  Z.resVis || p[e].range.actual > 11
                    ? (p[e].held.actual.visual = !1)
                    : (p[e].held.actual.visual = !0),
                  (p[e].held.actual.radar = !0),
                  t.USNRel < 180
                    ? (p[e].aspectBearing.actual = t.USNRel)
                    : (p[e].aspectBearing.actual = 360 - t.USNRel),
                  (p[e].aspectSide.actual = (function (e) {
                    switch (!0) {
                      case e >= 358 || e <= 2:
                        return "ship's head";
                      case e >= 178 && e <= 182:
                        return 'stern';
                      case e < 358 && e > 182:
                        return 'port';
                      case e > 2 && e < 178:
                        return 'stb';
                    }
                  })(t.USNRel)),
                  (p[e].bearingDirection.actual.direction = (function (e) {
                    let t = e.bearings.map(function (e, t, n) {
                      return n[t + 1] - e;
                    });
                    (t = t.filter((e) => !(Math.abs(e) > 350))),
                      (t = t.filter((e) => !Number.isNaN(e)));
                    const n = (t.reduce((e, t) => e + t, 0) / t.length) * 120,
                      r = p.length - 1;
                    return (
                      (p[r].bearingDirection.actual.rate = Math.abs(
                        n.toFixed(2)
                      )),
                      Math.abs(n) < 0.5
                        ? 'steady'
                        : n < 0
                        ? 'left'
                        : n > 0
                        ? 'right'
                        : void 0
                    );
                  })(t)),
                  (p[e].cpa.actual = t.cpaMiles.toFixed(1)),
                  (p[e].cpaSide.actual = (function (e) {
                    const t = e.USNRelAtCPA;
                    switch (!0) {
                      case t >= 5 && t < 175:
                        return 'stb';
                      case t <= 355 && t > 185:
                        return 'port';
                      case (t > 355 && t < 360) ||
                        (t > 0 && t < 5) ||
                        (t >= 175 && t <= 185):
                        return '-- blank --';
                    }
                  })(t)),
                  (p[e].cpaPos.actual.relPosition = (function (e) {
                    const t = e.USNRelAtCPA;
                    switch (!0) {
                      case (t > 355 && t < 360) || (t > 0 && t < 5):
                        return "ship's head";
                      case (t > 275 && t <= 355) || (t >= 5 && t < 85):
                        return 'bow';
                      case (t > 265 && t <= 275) || (t >= 85 && t < 95):
                        return 'beam';
                      case (t > 185 && t <= 265) || (t >= 95 && t < 175):
                        return 'quarter';
                      case t >= 175 && t <= 185:
                        return 'stern';
                    }
                  })(t)),
                  (p[e].cpaPos.actual.relValue = t.USNRelAtCPA.toFixed(2)),
                  (p[e].tcpa.actual = t.tcpa.toFixed(1)),
                  (p[e].rules.actual = t.rules),
                  2 == d)
                ) {
                  const e = p.length - 1;
                  (p[e].relColour.reported = u('#relColour').val()),
                    (p[e].relBearing.reported = u('#relBearing').val()),
                    (p[e].range.reported = u('#range').val()),
                    Z.resVis
                      ? (p[e].type.reported = u('#type-resvis').val())
                      : (p[e].type.reported = u('#type-vis').val()),
                    (p[e].held.reported.visual = u('#visual').is(':checked')),
                    (p[e].held.reported.radar = u('#radar-box').is(':checked')),
                    (p[e].aspectBearing.reported = u('#aspectBearing').val()),
                    (p[e].aspectSide.reported = u('#aspectSide').val()),
                    (p[e].bearingDirection.reported =
                      u('#bearingDirection').val()),
                    (p[e].cpa.reported = u('#cpa').val()),
                    (p[e].cpaSide.reported = u('#cpaSide').val()),
                    (p[e].cpaPos.reported = u('#cpaPos').val()),
                    (p[e].tcpa.reported = u('#tcpa').val());
                }
              })(),
              E();
          },
          w = function () {
            (f = []),
              u('#regForm')[0].reset(),
              u('.checkbox').prop('checked', !1),
              (document.getElementsByClassName('tab')[d].style.display =
                'none'),
              (d = 0),
              E();
          },
          S = function () {
            u('.checkbox').each(function () {
              u(this).is(':checked') && f.push(u(this).attr('id'));
            });
            const e = p.length - 1;
            if (
              ((p[e].completed = Date.now()),
              h.push(p[e].tgtNo),
              window.shipsAfloat
                .slice(1)
                .map((e) => e.name)
                .filter((e) => !h.includes(e)).length > 0)
            ) {
              u('#regForm')[0].reset(),
                u('.checkbox').prop('checked', !1),
                (p[e].rules.reported = f),
                (f = []);
              var t = u('.tab');
              u(t[d]).hide(), (d = 0), E(), j();
            } else
              window.alert('All contacts have been reported, click intentions');
          },
          C = function () {
            u('.checkbox').each(function () {
              u(this).is(':checked') && f.push(u(this).attr('id'));
            });
            const e = p.length - 1;
            (p[e].completed = Date.now()),
              h.push(p[e].tgtNo),
              (p[e].rules.reported = f),
              (f = []),
              document.getElementsByClassName('tab'),
              h.push(p[e].tgtNo),
              x(1);
          },
          k = function () {
            T(),
              (document.getElementsByClassName('tab')[d].style.display =
                'none'),
              u('#submit-message').fadeIn(),
              u('#form-btns').toggle(),
              u('#form-circles').toggle(),
              N(g);
          };
        function E() {
          let e = d;
          var t = u('.tab');
          t.eq(e).show(),
            u('#nextBtn').show(),
            0 == e || 4 == e ? u('#resetBtn').hide() : u('#resetBtn').show(),
            e == t.length - 2
              ? ((document.getElementById('nextBtn').innerHTML =
                  'Next Contact'),
                u('#nextBtn').hide(),
                u('#nextCnt,#actionBtn').show())
              : (u('#nextBtn').html('Next'), u('#nextCnt,#actionBtn').hide()),
            e == t.length - 1
              ? ((document.getElementById('nextBtn').innerHTML =
                  'Next Contact'),
                u('#nextBtn,#nextCnt,#actionBtn').hide(),
                u('#submitBtn').show())
              : u('#submitBtn').hide(),
            (function (e) {
              u('.step').removeClass('active'),
                u('.step').eq(e).addClass('active');
            })(e);
        }
        const T = function () {
          const e = u('#alterCrse').val(),
            t = u('#crseChange').val(),
            n = u('#alterSpeed').val(),
            r = u('#speedChange').val();
          if (t > 0 && 'maintain' != e) {
            const n = t * (Math.PI / 180);
            'port' == e && (y[0].course -= n),
              'starboard' == e && (y[0].course += n);
            const r = c(y[0].speed, Z.shipVctrLngth, Z.onemile),
              s = Math.cos(y[0].course) * r + y[0].position.x,
              l = Math.sin(y[0].course) * r + y[0].position.y;
            (y[0].vecEnd = new Point(s, l)),
              (y[0].vector = y[0].vecEnd.subtract(y[0].position));
            for (var o = 0; o < y.length; o++)
              'Ship' == (i = y[o]).constructor.name &&
                a(i, y[0], Z.shipVctrLngth, Z.onemile);
          }
          if (r > 0 && 'maintain' != n) {
            'increase' == n && (y[0].speed += r),
              'decrease' == n && (y[0].speed -= r);
            const e = c(y[0].speed, Z.shipVctrLngth, Z.onemile),
              t = Math.cos(y[0].course) * e + y[0].position.x,
              s = Math.sin(y[0].course) * e + y[0].position.y;
            for (
              y[0].vecEnd = new Point(t, s),
                y[0].vector = y[0].vecEnd.subtract(y[0].position),
                o = 0;
              o < y.length;
              o++
            ) {
              var i;
              'Ship' == (i = y[o]).constructor.name &&
                a(i, y[0], Z.shipVctrLngth, Z.onemile);
            }
          }
          const s = {
            created: Date.now(),
            turn: {
              direction: u('#alterCrse').val(),
              amount: u('#crseChange').val(),
            },
            speed: {
              direction: u('#alterSpeed').val(),
              amount: u('#speedChange').val(),
            },
            rereports: A(v),
            pnct: A(m),
            reportShipsAfloat: y,
            notes: { positive: [], warning: [], error: [], reportDetails: [] },
          };
          g.push(s);
        };
        function A(e) {
          const t = [];
          return (
            e.forEach((e) => {
              t.push({
                tgtNo: u(`#${e}`).val(),
                range: u(`#${e}`).next().val(),
              });
            }),
            t
          );
        }
        const j = function () {
          const e = window.shipsAfloat
            .slice(1)
            .map((e) => e.name)
            .filter((e) => !h.includes(e));
          u('#tgtSelector').empty(),
            e.forEach((e) =>
              u('#tgtSelector').append(`<option value="${e}">${e}</option>`)
            );
        };
        u(function () {
          u('.expand').on('click', function () {
            u(this).next().slideToggle(), u(this).toggleClass('active');
          }),
            u('#crseChangeGroup').hide(),
            u('#spdChangeGroup').hide(),
            u('#alterCrse').on('change', function () {
              'port' == u(this).val() || 'starboard' == u(this).val()
                ? u('#crseChangeGroup').show()
                : u('#crseChangeGroup').hide();
            }),
            u('#alterSpeed').on('change', function () {
              'increase' == u(this).val() || 'decrease' == u(this).val()
                ? u('#spdChangeGroup').show()
                : u('#spdChangeGroup').hide();
            }),
            u('#addRereport').on('click', function () {
              let e = '';
              const t = 'reReport-' + Date.now();
              v.push(t),
                h.forEach((t) => (e += `<option value='${t}'>${t}</option>`)),
                u('#Rereports').append(
                  `<div class = "listEl-rr" data="${t}">Contact No. <select id= "${t}">${e}</select> at <input type="number" min = "0" step = "0.1" placeholder = "1.0"> NM <span class="removeEl">x</span> </div>`
                );
            }),
            u('#addAgreement').on('click', function () {
              let e = '';
              const t = 'agreement-' + Date.now();
              m.push(t),
                h.forEach((t) => (e += `<option value='${t}'>${t}</option>`)),
                u('#agreements').append(
                  `<div class = "listEl-ncl" data="${t}">Contact No. <select id= "${t}">${e}</select> no closer than <input type="number" min = "0" step = "0.1" placeholder = "1.0"> NM <span class="removeEl">x</span></div>`
                );
            }),
            u('#relColour').on('change', () => {
              "ship's head" === u('#relColour').val() ||
              'astern' === u('#relColour').val()
                ? u('#relBearingCont').hide()
                : u('#relBearingCont').show();
            }),
            u('#aspectSide').on('change', () => {
              "ship's head" === u('#aspectSide').val() ||
              'stern' === u('#aspectSide').val()
                ? (u('#bow').hide(), u('#aspectBearingCont').hide())
                : (u('#aspectBearingCont').show(), u('#bow').show());
            }),
            u(document).on('click', '.removeEl', function () {
              if (
                (u(this).parent().remove(),
                'listEl-rr' == u(this).parent().attr('class'))
              ) {
                const e = v.findIndex(
                  (e) => e == u(this).parent().attr('data')
                );
                v.splice(e, 1);
              }
              if ('listEl-ncl' == u(this).parent().attr('class')) {
                const e = m.findIndex(
                  (e) => e == u(this).parent().attr('data')
                );
                m.splice(e, 1);
              }
            });
        });
        const N = function () {
          console.log(g), console.log(p), console.log(window.shipsAfloat);
        };
        var P = n(9755);
        P(function () {
          function e(e) {
            P('.activeclicked').removeClass('activeclicked'),
              P(e).addClass('activeclicked');
          }
          P('#radar-button').addClass('activeclicked'),
            P('#lookout-button').on('touchstart mousedown', function () {
              e(this),
                P('#radar').hide(),
                P('#lookOut').show(),
                P('#rules-view').hide(),
                P('#staff-answer').hide();
            }),
            P('#radar-button').on('touchstart mousedown', function () {
              e(this),
                P('#radar').show(),
                P('#lookOut').hide(),
                P('#rules-view').hide(),
                P('#report-view').hide(),
                P('#staff-answer').hide(),
                setTimeout(() => {
                  window.dispatchEvent(new CustomEvent('resize'));
                }, 100);
            }),
            P('#rules-button').on('touchstart mousedown', function () {
              e(this),
                P('#radar').hide(),
                P('#lookOut').hide(),
                P('#rules-view').show(),
                P('#staff-answer').hide();
            }),
            P('#edit-button').on('touchstart mousedown', function () {
              e(this),
                P('#radar').show(),
                P('#lookOut').hide(),
                P('#rules-view').hide(),
                P('#analysis-view').hide(),
                P('#ctrl-bar').show(),
                P('#debrief-view').hide(),
                updateTgtList();
            }),
            P('#report-button').on('touchstart mousedown', function () {
              e(this), P('#myModal').show(), E();
            }),
            P('.close').on('touchstart mousedown', function () {
              P('#myModal').hide();
            }),
            P('#resetBtn').on('mousedown touchstart', w),
            P('#nextBtn').on('mousedown touchstart', function () {
              x(1);
            }),
            P('#nextCnt').on('mousedown touchstart', S),
            P('#actionBtn').on('mousedown touchstart', C),
            P('#submitBtn').on('mousedown touchstart', k);
        });
        const O = function (e, t) {
            (t.trafficLanes.occupied.position = e),
              (t.trafficLanes.occupied.corners = M(
                t.trafficLanes.occupied.position,
                t.length,
                t.trafficLanes.width,
                t.orientation
              ));
            const n = new Point(0, 0);
            (n.angle = t.orientation - 90),
              (n.length = t.trafficLanes.width + t.sepZone.width),
              (t.trafficLanes.other.position = e.add(n)),
              (t.trafficLanes.other.corners = M(
                t.trafficLanes.other.position,
                t.length,
                t.trafficLanes.width,
                t.orientation
              ));
            const r = new Point(0, 0);
            (r.angle = t.orientation - 90),
              (r.length = t.trafficLanes.width / 2 + t.sepZone.width / 2),
              (t.sepZone.position = e.add(r)),
              (t.sepZone.corners = M(
                t.sepZone.position,
                t.length,
                t.sepZone.width,
                t.orientation
              ));
          },
          L = function (e, t, n) {
            const r = e.trafficLanes.occupied.position.subtract(t[0].position);
            'minus' == n
              ? ((r.length = 2 * r.length),
                (e.trafficLanes.width = 2 * e.trafficLanes.width),
                (e.sepZone.width = 2 * e.sepZone.width),
                (e.length = 2 * e.length))
              : 'plus' == n &&
                ((r.length = r.length / 2),
                (e.trafficLanes.width = e.trafficLanes.width / 2),
                (e.sepZone.width = e.sepZone.width / 2),
                (e.length = e.length / 2));
            const o = t[0].position.add(r);
            O(o, e);
          };
        function M(e, t, n, r) {
          const o = n / 2,
            i = new Point({ length: t / 2, angle: r }),
            a = new Point({ length: o, angle: r + 90 });
          return [
            e.add(i).add(a),
            e.subtract(i).add(a),
            e.subtract(i).subtract(a),
            e.add(i).subtract(a),
          ];
        }
        const D = function (e, t) {
            (t.lanes.occupied.position = e),
              (t.lanes.occupied.corners = M(
                t.lanes.occupied.position,
                t.length,
                t.lanes.width,
                t.orientation
              ));
            const n = new Point(0, 0);
            (n.angle = t.orientation - 90),
              (n.length = t.lanes.width + t.sepZone.width),
              (t.lanes.other.position = e.add(n)),
              (t.lanes.other.corners = M(
                t.lanes.other.position,
                t.length,
                t.lanes.width,
                t.orientation
              ));
            const r = new Point(0, 0);
            (r.angle = t.orientation - 90),
              (r.length = t.lanes.width / 2 + t.sepZone.width / 2),
              (t.sepZone.position = e.add(r)),
              (t.sepZone.corners = M(
                t.sepZone.position,
                t.length,
                t.sepZone.width,
                t.orientation
              ));
            const o = t.length / (t.markers.portMarkers.length - 1);
            (t.markers.portMarkers = R(
              t.markers.portMarkers.length,
              o,
              t.orientation,
              'other',
              t.lanes.other.corners
            )),
              (t.markers.starboardMarkers = R(
                t.markers.starboardMarkers.length,
                o,
                t.orientation,
                'occupied',
                t.lanes.occupied.corners
              ));
          },
          I = function (e, t, n, r, o) {
            const i = e.lanes.occupied.position.subtract(t[0].position);
            'minus' == n
              ? ((i.length = 2 * i.length),
                (e.lanes.width = 2 * e.lanes.width),
                (e.sepZone.width = 2 * e.sepZone.width),
                (e.length = 2 * e.length))
              : 'plus' == n &&
                ((i.length = i.length / 2),
                (e.lanes.width = e.lanes.width / 2),
                (e.sepZone.width = e.sepZone.width / 2),
                (e.length = e.length / 2));
            const a = t[0].position.add(i);
            D(a, e);
          };
        function R(e, t, n, r, o) {
          let i;
          switch (r) {
            case 'other':
              i = 2;
              break;
            case 'occupied':
              i = 1;
          }
          const a = [],
            s = o[i];
          let c = new Point(t, 0);
          c.angle = n;
          for (let t = 0; t < e; t++) {
            const e = s.add(c.multiply(t));
            a.push(e);
          }
          return a;
        }
        const _ = function (e, t, n) {
          const r = [];
          return (
            e.forEach((e) => {
              r.push(e.subtract(t)),
                (r[r.length - 1].x = i.KO(r[r.length - 1].x, n)),
                (r[r.length - 1].y = i.KO(r[r.length - 1].y, n));
            }),
            r
          );
        };
        var q = n(9755);
        function B(e, t, n, r) {
          e.activeLayer.removeChildren();
          const o = [t, n],
            i = new Group([
              new Path.Circle(o, 3 * r),
              new Path.Circle(o, 6 * r),
              new Path.Circle(o, 9 * r),
              new Path.Circle(o, 12 * r),
              new Path.Circle(o, 15 * r),
              new Path.Circle(o, 18 * r),
              new Path.Circle(o, 21 * r),
              new Path.Circle(o, 24 * r),
              new Path.Circle(o, 27 * r),
              new Path.Circle(o, 30 * r),
              new Path.Circle(o, 33 * r),
              new Path.Circle(o, 36 * r),
              new Path.Circle(o, 39 * r),
              new Path.Circle(o, 42 * r),
            ]);
          (i.strokeWidth = 1), (i.strokeColor = '#282828');
        }
        function F(e, t) {
          e.paths = new Group();
          let n = new Group();
          const r = t / 4;
          e.markers.portMarkers.forEach((e) => {
            const o = new Point(centX, centY).subtract(e),
              a = i.KO(o.length, t),
              s = r * Math.exp(-a),
              c = Math.min(10 * s, 3),
              l = Math.min(3 * s, 5),
              u = new Size(c, l),
              p = e.subtract([u.width / 2, u.height / 2]);
            let d = new Path.Rectangle(p, u);
            d.rotate(o.angle + 90), (d.fillColor = '#FAC728'), n.addChild(d);
          }),
            e.markers.starboardMarkers.forEach((e) => {
              const o = new Point(centX, centY).subtract(e),
                a = i.KO(o.length, t),
                s = r * Math.exp(-a),
                c = Math.min(10 * s, 3),
                l = Math.min(3 * s, 5),
                u = new Size(c, l),
                p = e.subtract([u.width / 2, u.height / 2]);
              let d = new Path.Rectangle(p, u);
              d.rotate(o.angle + 90), (d.fillColor = '#FAC728'), n.addChild(d);
            }),
            e.paths.addChildren([n]);
        }
        function H(e, t, n) {
          if (
            ((e.vector = e.vecEnd.subtract(e.position)),
            (e.arrowVector = e.vector.normalize(10)),
            e.vectorItem && e.vectorItem.remove(),
            e.data && e.data.remove(),
            e.relVecItem && e.relVecItem.remove(),
            e.targetIndicator && e.targetIndicator.remove(),
            e.editIndicator && e.editIndicator.remove(),
            'Own Ship' != e.type)
          ) {
            const r = e.position.subtract(shipsAfloat[0].position);
            if (
              ((e.range = i.KO(Math.round(r.length), n)),
              (e.bearing = i.UN(i.v2(Math.round(r.angle)), n)),
              Math.abs(r.angle),
              r.angle,
              (e.relVec = e.vector.subtract(shipsAfloat[0].vector)),
              (e.relVecEnd = e.position.add(e.relVec)),
              (e.relArrowVector = e.relVec.normalize(10)),
              (e.relVecItem = new Group([
                new Path({ segments: [[e.position], [e.relVecEnd]] }),
              ])),
              myCanvas.width,
              myCanvas.height,
              e.vector.angle < 0 && e.vector.angle > -180
                ? (e.labelPos = [e.position.x - 10, e.position.y + 20])
                : (e.labelPos = [e.position.x - 10, e.position.y - 10]),
              e.targetSelected & !e.editSelected)
            ) {
              if ('none' != q('#ctrl-bar').css('display'))
                e.targetIndicator = new Group([
                  new Path([
                    e.position.subtract([0, 20]),
                    e.position.subtract([0, 40]),
                  ]),
                  new Path.RegularPolygon(
                    new Point(e.position.subtract([0, 40])),
                    3,
                    5
                  ),
                  new Path([e.position.add([0, 20]), e.position.add([0, 40])]),
                  new Path.RegularPolygon(
                    new Point(e.position.add([0, 40])),
                    3,
                    5
                  ).rotate(180),
                  new Path([e.position.add([20, 0]), e.position.add([40, 0])]),
                  new Path.RegularPolygon(
                    new Point(e.position.add([40, 1])),
                    3,
                    5
                  ).rotate(90),
                  new Path([
                    e.position.subtract([20, 0]),
                    e.position.subtract([40, 0]),
                  ]),
                  new Path.RegularPolygon(
                    new Point(e.position.subtract([40, 0]).add([0, 1])),
                    3,
                    5
                  ).rotate(270),
                  new Path([
                    e.vecEnd.subtract([0, 10]),
                    e.vecEnd.subtract([0, 20]),
                  ]),
                  new Path.RegularPolygon(
                    new Point(e.vecEnd.subtract([0, 20])),
                    3,
                    5
                  ),
                  new Path([e.vecEnd.add([0, 10]), e.vecEnd.add([0, 20])]),
                  new Path.RegularPolygon(
                    new Point(e.vecEnd.add([0, 20])),
                    3,
                    5
                  ).rotate(180),
                  new Path([e.vecEnd.add([10, 0]), e.vecEnd.add([20, 0])]),
                  new Path.RegularPolygon(
                    new Point(e.vecEnd.add([20, 1])),
                    3,
                    5
                  ).rotate(90),
                  new Path([
                    e.vecEnd.subtract([10, 0]),
                    e.vecEnd.subtract([20, 0]),
                  ]),
                  new Path.RegularPolygon(
                    new Point(e.vecEnd.subtract([20, 0]).add([0, 1])),
                    3,
                    5
                  ).rotate(270),
                ]);
              else {
                const t = e.position.subtract([30, 30]),
                  n = e.position.subtract([30, 0]).add([0, 30]),
                  r = e.position.add([30, 0]).subtract([0, 30]),
                  o = e.position.add([30, 30]);
                e.targetIndicator = new Group([
                  new Path([t.subtract([1, 0]), t.add([10, 0])]),
                  new Path([t, t.add([0, 10])]),
                  new Path([n.subtract([1, 0]), n.add([10, 0])]),
                  new Path([n, n.subtract([0, 10])]),
                  new Path([r.add([1, 0]), r.subtract([10, 0])]),
                  new Path([r, r.add([0, 10])]),
                  new Path([o.add([1, 0]), o.subtract([10, 0])]),
                  new Path([o, o.subtract([0, 10])]),
                ]);
              }
              (e.targetIndicator.strokeWidth = 1),
                (e.targetIndicator.strokeColor = 'white'),
                q(document).ready(function () {
                  q('#tgt-name').text('TARGET ' + e.name),
                    q('#ship-cog').text(i.UN(i.v2(Math.round(e.vector.angle)))),
                    q('#ship-sog').text(l(e.vector.length, t, n).toFixed(1)),
                    q('#ship-brg').text(e.bearing),
                    q('#ship-rng, #ship-rng-sec').text(e.range.toFixed(1)),
                    NaN != e.cpa
                      ? q('#ship-cpa, #ship-cpa-sec').text(
                          i.KO(e.cpa, n).toFixed(1)
                        )
                      : q('#ship-cpa, #ship-cpa-sec').text(e.range).toFixed(1),
                    e.tcpa &&
                      q('#ship-tcpa, #ship-tcpa-sec').text(e.tcpa.toFixed(1));
                });
            }
            (e.data = new Group([
              new PointText({
                point: e.labelPos,
                content: e.name,
                fillColor: 'white',
                justification: 'left',
                fontSize: 10,
              }),
            ])),
              (e.relVecItem.strokeColor = 'grey'),
              (e.relVecItem.strokeWidth = 1),
              (e.relVecItem.children[0].dashArray = [3, 2]);
          }
          (e.vectorItem = new Group([
            new Path.Circle(e.position, 6),
            new Path.Circle({
              center: e.position,
              radius: 3,
              fillColor: 'white',
            }),
            new Path({ segments: [[e.position], [e.vecEnd]] }),
          ])),
            e.editSelected &&
              ((e.editIndicator = new Group([
                new Path([
                  e.position.subtract([0, 20]),
                  e.position.subtract([0, 40]),
                ]),
                new Path.RegularPolygon(
                  new Point(e.position.subtract([0, 40])),
                  3,
                  5
                ),
                new Path([e.position.add([0, 20]), e.position.add([0, 40])]),
                new Path.RegularPolygon(
                  new Point(e.position.add([0, 40])),
                  3,
                  5
                ).rotate(180),
                new Path([e.position.add([20, 0]), e.position.add([40, 0])]),
                new Path.RegularPolygon(
                  new Point(e.position.add([40, 1])),
                  3,
                  5
                ).rotate(90),
                new Path([
                  e.position.subtract([20, 0]),
                  e.position.subtract([40, 0]),
                ]),
                new Path.RegularPolygon(
                  new Point(e.position.subtract([40, 0]).add([0, 1])),
                  3,
                  5
                ).rotate(270),
              ])),
              (e.editIndicator.strokeWidth = 1),
              (e.editIndicator.strokeColor = '#bf1a49'),
              (e.editIndicator.fillColor = '#bf1a49')),
            e.vecSelected &&
              ((e.editIndicator = new Group([
                new Path([
                  e.vecEnd.subtract([0, 10]),
                  e.vecEnd.subtract([0, 20]),
                ]),
                new Path.RegularPolygon(
                  new Point(e.vecEnd.subtract([0, 20])),
                  3,
                  5
                ),
                new Path([e.vecEnd.add([0, 10]), e.vecEnd.add([0, 20])]),
                new Path.RegularPolygon(
                  new Point(e.vecEnd.add([0, 20])),
                  3,
                  5
                ).rotate(180),
                new Path([e.vecEnd.add([10, 0]), e.vecEnd.add([20, 0])]),
                new Path.RegularPolygon(
                  new Point(e.vecEnd.add([20, 1])),
                  3,
                  5
                ).rotate(90),
                new Path([
                  e.vecEnd.subtract([10, 0]),
                  e.vecEnd.subtract([20, 0]),
                ]),
                new Path.RegularPolygon(
                  new Point(e.vecEnd.subtract([20, 0]).add([0, 1])),
                  3,
                  5
                ).rotate(270),
              ])),
              (e.editIndicator.strokeWidth = 1),
              (e.editIndicator.strokeColor = '#bf1a49'),
              (e.editIndicator.fillColor = '#bf1a49')),
            (e.vectorItem.strokeWidth = 1),
            'Own Ship' == e.type
              ? ((e.containerPos = [e.position.x - 35, e.position.y - 20]),
                (e.vectorItem.strokeColor = '#1a9cbf'),
                (e.vectorItem.children[1].fillColor = '#1a9cbf'),
                q(document).ready(function () {
                  q('#ownship-cog').text(
                    i.UN(i.v2(Math.round(shipsAfloat[0].vector.angle)))
                  ),
                    q('#ownship-sog').text(
                      l(shipsAfloat[0].vector.length, t, n).toFixed(1)
                    ),
                    q('#height').text(myCanvas.height),
                    q('#width').text(myCanvas.width);
                }))
              : (e.vectorItem.strokeColor = 'white');
        }
        function W(e) {
          e.paths = new Group();
          const t = new Path.Line({
              from: e.trafficLanes.occupied.corners[0],
              to: e.trafficLanes.occupied.corners[1],
            }),
            n = new Path.Line({
              from: e.trafficLanes.other.corners[2],
              to: e.trafficLanes.other.corners[3],
            }),
            r = new Path({
              segments: e.sepZone.corners,
              closed: !0,
              fillColor: '#bf1a80',
              opacity: 0.75,
            });
          e.paths.addChildren([t, n, r]),
            (t.strokeWidth = 1),
            (t.dashArray = [10, 5]),
            (t.strokeColor = '#bf1a80'),
            (n.strokeWidth = 1),
            (n.dashArray = [10, 5]),
            (n.strokeColor = '#bf1a80');
        }
        Math.PI;
        const V = 180 / Math.PI;
        function $(e) {
          return e * V;
        }
        var z = n(9755),
          U = n(9755);
        Promise.all([n.e(267), n.e(162)])
          .then(n.t.bind(n, 3267, 23))
          .then(({ default: e }) => {
            e.install(window),
              (window.onload = function () {
                var t = document.getElementById('myCanvas');
                e.setup(t);
                var r,
                  i = new Tool();
                (Z.resVis = !1),
                  (Z.elevation = null),
                  (Z.play = !0),
                  (Z.scale = 12),
                  (Z.centX = t.getBoundingClientRect().width / 2),
                  (Z.centY = t.getBoundingClientRect().height / 2),
                  z('#range-scale, #range-scale-sec').text(r),
                  z('#minus-range, #minus-range-sec').click(function () {
                    r > 1.5 &&
                      ((r /= 2),
                      z('#range-scale, #range-scale-sec').text(r),
                      upDateScale('minus'));
                  }),
                  z('#plus-range, #plus-range-sec').click(function () {
                    r < 48 &&
                      ((r *= 2),
                      z('#range-scale, #range-scale-sec').text(r),
                      upDateScale('plus'));
                  }),
                  z('#minus-vec, #minus-vec-sec').click(function () {}),
                  z('#plus-vec, #plus-vec-sec').click(function () {}),
                  z('#ship')
                    .parent()
                    .find('.arrow')
                    .toggleClass('arrow-animate'),
                  z('.title').click(function () {
                    z(window).width() > 601 &&
                      (z(this)
                        .parent()
                        .find('.arrow')
                        .toggleClass('arrow-animate'),
                      z(this).parent().find('.accordion').slideToggle(280));
                  }),
                  U('#range-scale, #range-scale-sec').text(Z.scale),
                  U('#minus-range, #minus-range-sec').click(function () {
                    Z.scale > 1.5 &&
                      ((Z.scale = Z.scale / 2),
                      U('#range-scale, #range-scale-sec').text(Z.scale),
                      K('minus'));
                  }),
                  U('#plus-range, #plus-range-sec').click(function () {
                    Z.scale < 48 &&
                      ((Z.scale = 2 * Z.scale),
                      U('#range-scale, #range-scale-sec').text(Z.scale),
                      K('plus'));
                  }),
                  U('#minus-vec, #minus-vec-sec').click(function () {
                    Z.shipVctrLngth > 3 &&
                      (Q('minus'),
                      U('#vec-length, #vec-length-sec').text(Z.shipVctrLngth));
                  }),
                  U('#plus-vec, #plus-vec-sec').click(function () {
                    Z.shipVctrLngth < 48 &&
                      (Q('plus'),
                      U('#vec-length, #vec-length-sec').text(Z.shipVctrLngth));
                  }),
                  U('#ship')
                    .parent()
                    .find('.arrow')
                    .toggleClass('arrow-animate'),
                  U('.title').click(function () {
                    U(window).width() > 601 &&
                      (U(this)
                        .parent()
                        .find('.arrow')
                        .toggleClass('arrow-animate'),
                      U(this).parent().find('.accordion').slideToggle(280));
                  }),
                  (view.onResize = function (e) {
                    console.log('paper JS resizing'),
                      (Z.centX = t.getBoundingClientRect().width / 2),
                      (Z.centY = t.getBoundingClientRect().height / 2),
                      B(project, Z.centX, Z.centY, Z.onemile),
                      J &&
                        (O(
                          J.trafficLanes.occupied.position.add(
                            e.delta.divide(2)
                          ),
                          J
                        ),
                        W(J)),
                      Y &&
                        (D(Y.lanes.occupied.position.add(e.delta.divide(2)), Y),
                        F(Y, Z.onemile));
                    for (var n = 0; n < shipsAfloat.length; n++) {
                      var r = shipsAfloat[n];
                      (r.position = r.position.add(e.delta.divide(2))),
                        (r.vecEnd = r.vecEnd.add(e.delta.divide(2))),
                        H(r, Z.shipVctrLngth, Z.onemile);
                    }
                  }),
                  (i.onMouseDown = function (e) {
                    for (var t = 0; t < shipsAfloat.length; t++) {
                      var n = (o = shipsAfloat[t]).position,
                        r = o.vecEnd;
                      if ((o.containerPos, n && n.getDistance(e.point) < 10)) {
                        (o.posSelected = !0),
                          'Own Ship' != o.type &&
                            (0 == o.targetSelected && (o.selectCount += 1),
                            re(),
                            (o.targetSelected = !0),
                            U('#ship').css('background-color', 'grey')),
                          'none' != U('#ctrl-bar').css('display') &&
                            (oe(), (o.editSelected = !0));
                        break;
                      }
                      if (
                        r &&
                        r.getDistance(e.point) < 10 &&
                        'none' != U('#ctrl-bar').css('display')
                      ) {
                        o.vecSelected = !0;
                        break;
                      }
                    }
                    for (t = 0; t < shipsAfloat.length; t++) {
                      var o;
                      H((o = shipsAfloat[t]), Z.shipVctrLngth, Z.onemile);
                    }
                  }),
                  (i.onMouseDrag = function (e) {
                    if ('none' != U('#ctrl-bar').css('display'))
                      for (var t = 0; t < shipsAfloat.length; t++) {
                        var n = shipsAfloat[t];
                        n.posSelected & ('Own Ship' != n.type)
                          ? ((n.position = n.position.add(e.delta)),
                            (n.vecEnd = n.vecEnd.add(e.delta)))
                          : n.vecSelected && (n.vecEnd = n.vecEnd.add(e.delta)),
                          a(n, shipsAfloat[0], Z.shipVctrLngth, Z.onemile),
                          H(n, Z.shipVctrLngth, Z.onemile);
                      }
                  }),
                  (i.onMouseUp = function () {
                    !(function () {
                      for (var e = 0; e < shipsAfloat.length; e++)
                        (shipsAfloat[e].posSelected = !1),
                          (shipsAfloat[e].vecSelected = !1);
                    })(),
                      oe();
                    for (var e = 0; e < shipsAfloat.length; e++)
                      H(shipsAfloat[e], Z.shipVctrLngth, Z.onemile);
                    U('#ship').css('background-color', 'white');
                  }),
                  (function () {
                    if (
                      t.getBoundingClientRect().height <
                      t.getBoundingClientRect().width
                    )
                      var e = t.getBoundingClientRect().height;
                    else e = t.getBoundingClientRect().width;
                    Z.onemile = e / (2 * Z.scale);
                  })(),
                  B(project, Z.centX, Z.centY, Z.onemile),
                  te(),
                  setInterval(function () {
                    if (shipsAfloat[1].bearings.length < 10)
                      for (var e = 1; e < shipsAfloat.length; e++) {
                        var t = shipsAfloat[e];
                        t.bearings.push(t.OwnShipAngle);
                      }
                  }, 500),
                  (X = o()(shipsAfloat)),
                  j(),
                  Z.resVis
                    ? (U('#type-vis').hide(), U('#type-resvis').show())
                    : (U('#type-vis').show(), U('#type-resvis').hide()),
                  (G = Date.now()),
                  U('.overlay').hide(),
                  Promise.all([n.e(2), n.e(163)])
                    .then(n.bind(n, 3163))
                    .then((e) => {
                      e.buildThreeDRendering();
                    });
              });
          });
        let Z = { shipVctrLngth: 6, onemile: 0 },
          X = null;
        window.shipsAfloat = [];
        let G = '',
          J = null,
          Y = null;
        function K(e) {
          if ('minus' == e) {
            (Z.onemile += Z.onemile),
              B(project, Z.centX, Z.centY, Z.onemile),
              J && (L(J, shipsAfloat, e), W(J)),
              Y &&
                (I(Y, shipsAfloat, e, new Point(Z.centX, Z.centY), Z.onemile),
                F(Y, Z.onemile));
            for (var t = 0; t < shipsAfloat.length; t++) {
              if ('Own Ship' != (n = shipsAfloat[t]).type) {
                const e = n.position.subtract(shipsAfloat[0].position);
                (n.position = n.position.add(e)),
                  (n.vecEnd = n.vecEnd.add(e)),
                  (n.vecEnd = n.vecEnd.add(n.vector));
              }
              'Own Ship' == n.type && (n.vecEnd = n.vecEnd.add(n.vector)),
                a(n, shipsAfloat[0], Z.shipVctrLngth, Z.onemile),
                H(n, Z.shipVctrLngth, Z.onemile);
            }
          } else
            for (
              Z.onemile = Z.onemile / 2,
                B(project, Z.centX, Z.centY, Z.onemile),
                J && (L(J, shipsAfloat, e), W(J)),
                Y &&
                  (I(Y, shipsAfloat, e, new Point(Z.centX, Z.centY), Z.onemile),
                  F(Y, Z.onemile)),
                t = 0;
              t < shipsAfloat.length;
              t++
            ) {
              var n;
              if ('Own Ship' != (n = shipsAfloat[t]).type) {
                const e = n.position.subtract(shipsAfloat[0].position);
                (n.position = n.position.subtract(e.divide(2))),
                  (n.vecEnd = n.vecEnd.subtract(e.divide(2))),
                  (n.vecEnd = n.vecEnd.subtract(n.vector.divide(2)));
              }
              'Own Ship' == n.type &&
                (n.vecEnd = n.vecEnd.subtract(n.vector.divide(2))),
                a(n, shipsAfloat[0], Z.shipVctrLngth, Z.onemile),
                H(n, Z.shipVctrLngth, Z.onemile);
            }
        }
        function Q(e) {
          if ('minus' == e) {
            Z.shipVctrLngth = Z.shipVctrLngth - Z.shipVctrLngth / 2;
            for (var t = 0; t < shipsAfloat.length; t++)
              ((n = shipsAfloat[t]).vecEnd = n.vecEnd.subtract(
                n.vector.divide(2)
              )),
                a(n, shipsAfloat[0], Z.shipVctrLngth, Z.onemile),
                H(n, Z.shipVctrLngth, Z.onemile);
          } else
            for (
              Z.shipVctrLngth = Z.shipVctrLngth + Z.shipVctrLngth, t = 0;
              t < shipsAfloat.length;
              t++
            ) {
              var n;
              ((n = shipsAfloat[t]).vecEnd = n.vecEnd.add(n.vector)),
                a(n, shipsAfloat[0], Z.shipVctrLngth, Z.onemile),
                H(n, Z.shipVctrLngth, Z.onemile);
            }
        }
        const ee = function (e) {
            const t = e / 1e3;
            if (1 == Z.play) {
              if ((B(project, Z.centX, Z.centY, Z.onemile), J)) {
                const e = t / (60 * shipsAfloat[0].vector.length);
                let n = shipsAfloat[0].vector.multiply(e);
                n.angle = shipsAfloat[0].vector.angle - 180;
                const r = J.trafficLanes.occupied.position.add(n);
                O(r, J), W(J);
              }
              if (Y) {
                const e = t / (60 * shipsAfloat[0].vector.length);
                let n = shipsAfloat[0].vector.multiply(e);
                n.angle = shipsAfloat[0].vector.angle - 180;
                const r = Y.lanes.occupied.position.add(n);
                D(r, Y),
                  (Y.markers.relPositionsPort = _(
                    Y.markers.portMarkers,
                    shipsAfloat[0].position,
                    Z.onemile
                  )),
                  (Y.markers.relPositionsStarboard = _(
                    Y.markers.starboardMarkers,
                    shipsAfloat[0].position,
                    Z.onemile
                  )),
                  F(Y, Z.onemile);
              }
              H(shipsAfloat[0], Z.shipVctrLngth, Z.onemile);
              for (var n = 0; n < shipsAfloat.length; n++) {
                var r = shipsAfloat[n];
                if ('Own Ship' != r.type) {
                  let e = t / (60 * Z.shipVctrLngth),
                    n = r.relVec.multiply(e);
                  (r.position = r.position.add(n)),
                    (r.vecEnd = r.vecEnd.add(n)),
                    (r.vecOwnShip = r.position.subtract(
                      shipsAfloat[0].position
                    )),
                    (r.OwnShipAngle = r.vecOwnShip.angle),
                    (r.relposXnm = i.KO(r.vecOwnShip.x, Z.onemile)),
                    (r.relposYnm = i.KO(r.vecOwnShip.y, Z.onemile)),
                    (r.USNRel = ie(r, shipsAfloat[0])),
                    (r.USNRelFrmOwnShp = ae(r, shipsAfloat[0])),
                    a(r, shipsAfloat[0], Z.shipVctrLngth, Z.onemile),
                    U('#radar').is(':visible') &&
                      H(r, Z.shipVctrLngth, Z.onemile);
                }
              }
            }
          },
          te = function () {
            window.importedScenario
              ? ne(window.importedScenario)
              : (console.log("Didn't load"), window.requestAnimationFrame(te));
          },
          ne = function (e) {
            (Z.elevation = -10), (Z.resVis = e.resVis);
            const t = new Point(Z.centX, Z.centY);
            e.center = new Point(e.center[0], e.center[1]);
            const n = t.subtract(e.center);
            if (
              (e.genShipsAfloat.map((r) => {
                (r.position = new Point(r.position.x, r.position.y)),
                  (r.position = r.position.add(n)),
                  'Own Ship' != r.type &&
                    ((r.vecOwnShip = r.position.subtract(
                      e.genShipsAfloat[0].position
                    )),
                    (r.vecOwnShip = r.vecOwnShip.multiply(Z.onemile)),
                    (r.position = t.add(r.vecOwnShip)));
                const o = c(r.speed, Z.shipVctrLngth, Z.onemile),
                  i = Math.cos(r.course) * o + r.position.x,
                  a = Math.sin(r.course) * o + r.position.y;
                (r.vecEnd = new Point(i, a)),
                  '001' == r.name && (r.targetSelected = !0);
              }),
              e.TSS)
            ) {
              if (
                ((e.TSS.trafficLanes.occupied.position = new Point(
                  e.TSS.trafficLanes.occupied.position.x,
                  e.TSS.trafficLanes.occupied.position.y
                )),
                (e.TSS.trafficLanes.other.position = new Point(
                  e.TSS.trafficLanes.other.position.x,
                  e.TSS.trafficLanes.other.position.y
                )),
                (e.TSS.sepZone.position = new Point(
                  e.TSS.sepZone.position.x,
                  e.TSS.sepZone.position.y
                )),
                (e.TSS.sepZone.position = new Point(
                  e.TSS.sepZone.position.x,
                  e.TSS.sepZone.position.y
                )),
                e.TSS.trafficLanes.occupied.corners.forEach((e) => {
                  e = new Point(e.x, e.y);
                }),
                e.TSS.trafficLanes.other.corners.forEach((e) => {
                  e = new Point(e.x, e.y);
                }),
                e.TSS.sepZone.corners.forEach((e) => {
                  e = new Point(e.x, e.y);
                }),
                (e.TSS.orientation = $(e.TSS.orientation)),
                (e.TSS.trafficLanes.width =
                  e.TSS.trafficLanes.width * Z.onemile),
                (e.TSS.sepZone.width = e.TSS.sepZone.width * Z.onemile),
                (e.TSS.length = e.TSS.length * Z.onemile),
                e.TSS.trafficLanes.occupied.position.equals(e.center))
              )
                O(t, e.TSS);
              else {
                const n = e.TSS.trafficLanes.occupied.position
                    .subtract(e.center)
                    .multiply(Z.onemile),
                  r = t.add(n);
                O(r, e.TSS);
              }
              (J = e.TSS), W(J);
            }
            if (e.NC) {
              if (
                ((e.NC.lanes.occupied.position = new Point(
                  e.NC.lanes.occupied.position.x,
                  e.NC.lanes.occupied.position.y
                )),
                (e.NC.lanes.other.position = new Point(
                  e.NC.lanes.other.position.x,
                  e.NC.lanes.other.position.y
                )),
                (e.NC.sepZone.position = new Point(
                  e.NC.sepZone.position.x,
                  e.NC.sepZone.position.y
                )),
                e.NC.markers.portMarkers.forEach((e) => {
                  e = new Point(e.x, e.y);
                }),
                e.NC.markers.starboardMarkers.forEach((e) => {
                  e = new Point(e.x, e.y);
                }),
                e.NC.lanes.occupied.corners.forEach((e) => {
                  e = new Point(e.x, e.y);
                }),
                e.NC.lanes.other.corners.forEach((e) => {
                  e = new Point(e.x, e.y);
                }),
                e.NC.sepZone.corners.forEach((e) => {
                  e = new Point(e.x, e.y);
                }),
                (e.NC.orientation = $(e.NC.orientation)),
                (e.NC.lanes.width = e.NC.lanes.width * Z.onemile),
                (e.NC.sepZone.width = e.NC.sepZone.width * Z.onemile),
                (e.NC.length = e.NC.length * Z.onemile),
                e.NC.lanes.occupied.position.equals(e.center))
              )
                D(t, e.NC);
              else {
                const n = e.NC.lanes.occupied.position
                    .subtract(e.center)
                    .multiply(Z.onemile),
                  r = t.add(n);
                D(r, e.NC);
              }
              (e.NC.markers.relPositionsPort = _(
                e.NC.markers.portMarkers,
                t,
                Z.onemile
              )),
                (e.NC.markers.relPositionsStarboard = _(
                  e.NC.markers.starboardMarkers,
                  t,
                  Z.onemile
                )),
                (Y = e.NC),
                F(Y, Z.onemile);
            }
            (shipsAfloat = e.genShipsAfloat),
              shipsAfloat.forEach((e) => {
                H(e, Z.shipVctrLngth, Z.onemile);
              });
          };
        function re() {
          for (var e = 0; e < shipsAfloat.length; e++)
            shipsAfloat[e].targetSelected = !1;
        }
        function oe() {
          for (var e = 0; e < shipsAfloat.length; e++)
            shipsAfloat[e].editSelected = !1;
        }
        function ie(e, t) {
          const n = e.position.subtract(t.position);
          return s(i.v2(n.angle), i.v2(e.vector.angle));
        }
        function ae(e, t) {
          const n = t.position.subtract(e.position);
          return s(i.v2(n.angle), i.v2(t.vector.angle));
        }
        U(document).ready(function () {
          U(function () {
            var e,
              t = U("input[type='search']"),
              n = U("button[data-search='clear']"),
              r = U("button[data-search='prev']"),
              o = U("button[data-search='next']"),
              i = U('.rules-text'),
              a = 'current',
              s = 0;
            function c() {
              if (e.length) {
                var t,
                  n = e.eq(s);
                e.removeClass(a),
                  n.length &&
                    (n.addClass(a),
                    (t = n.offset().top - 500),
                    window.scrollTo(0, t));
              }
            }
            t.on('input', function () {
              var t = this.value;
              i.unmark({
                done: function () {
                  i.mark(t, {
                    separateWordSearch: !0,
                    done: function () {
                      (e = i.find('mark')), (s = 0), c();
                    },
                  });
                },
              });
            }),
              n.on('click', function () {
                i.unmark(), t.val('').focus();
              }),
              r.on('click', function () {
                e.length &&
                  ((s += U(this).is(r) ? -1 : 1) < 0 && (s = e.length - 1),
                  s > e.length - 1 && (s = 0),
                  c());
              }),
              o.on('click', function () {
                e.length &&
                  ((s += U(this).is(r) ? -1 : 1) < 0 && (s = e.length - 1),
                  s > e.length - 1 && (s = 0),
                  c());
              });
          });
        });
      },
      2531: (e, t, n) => {
        'use strict';
        function r(e, t) {
          return e / t;
        }
        function o(e, t) {
          return Math.round(e * t * 100) / 100;
        }
        function i(e) {
          return e >= -90 && e <= 180 ? e + 90 : e + 450;
        }
        function a(e) {
          return e >= 100 ? e : e > 9 ? '0' + e : '00' + e;
        }
        n.d(t, { KO: () => r, UN: () => a, rV: () => o, v2: () => i });
      },
    },
    i = {};
  function a(e) {
    var t = i[e];
    if (void 0 !== t) return t.exports;
    var n = (i[e] = { id: e, loaded: !1, exports: {} });
    return o[e].call(n.exports, n, n.exports, a), (n.loaded = !0), n.exports;
  }
  (a.m = o),
    (a.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return a.d(t, { a: t }), t;
    }),
    (t = Object.getPrototypeOf
      ? (e) => Object.getPrototypeOf(e)
      : (e) => e.__proto__),
    (a.t = function (n, r) {
      if ((1 & r && (n = this(n)), 8 & r)) return n;
      if ('object' == typeof n && n) {
        if (4 & r && n.__esModule) return n;
        if (16 & r && 'function' == typeof n.then) return n;
      }
      var o = Object.create(null);
      a.r(o);
      var i = {};
      e = e || [null, t({}), t([]), t(t)];
      for (var s = 2 & r && n; 'object' == typeof s && !~e.indexOf(s); s = t(s))
        Object.getOwnPropertyNames(s).forEach((e) => (i[e] = () => n[e]));
      return (i.default = () => n), a.d(o, i), o;
    }),
    (a.d = (e, t) => {
      for (var n in t)
        a.o(t, n) &&
          !a.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (a.f = {}),
    (a.e = (e) =>
      Promise.all(Object.keys(a.f).reduce((t, n) => (a.f[n](e, t), t), []))),
    (a.u = (e) => e + '.bundle.js'),
    (a.g = (function () {
      if ('object' == typeof globalThis) return globalThis;
      try {
        return this || new Function('return this')();
      } catch (e) {
        if ('object' == typeof window) return window;
      }
    })()),
    (a.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n = {}),
    (r = 'martime-web-app:'),
    (a.l = (e, t, o, i) => {
      if (n[e]) n[e].push(t);
      else {
        var s, c;
        if (void 0 !== o)
          for (
            var l = document.getElementsByTagName('script'), u = 0;
            u < l.length;
            u++
          ) {
            var p = l[u];
            if (
              p.getAttribute('src') == e ||
              p.getAttribute('data-webpack') == r + o
            ) {
              s = p;
              break;
            }
          }
        s ||
          ((c = !0),
          ((s = document.createElement('script')).charset = 'utf-8'),
          (s.timeout = 120),
          a.nc && s.setAttribute('nonce', a.nc),
          s.setAttribute('data-webpack', r + o),
          (s.src = e)),
          (n[e] = [t]);
        var d = (t, r) => {
            (s.onerror = s.onload = null), clearTimeout(f);
            var o = n[e];
            if (
              (delete n[e],
              s.parentNode && s.parentNode.removeChild(s),
              o && o.forEach((e) => e(r)),
              t)
            )
              return t(r);
          },
          f = setTimeout(
            d.bind(null, void 0, { type: 'timeout', target: s }),
            12e4
          );
        (s.onerror = d.bind(null, s.onerror)),
          (s.onload = d.bind(null, s.onload)),
          c && document.head.appendChild(s);
      }
    }),
    (a.r = (e) => {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (a.nmd = (e) => ((e.paths = []), e.children || (e.children = []), e)),
    (() => {
      var e;
      a.g.importScripts && (e = a.g.location + '');
      var t = a.g.document;
      if (!e && t && (t.currentScript && (e = t.currentScript.src), !e)) {
        var n = t.getElementsByTagName('script');
        n.length && (e = n[n.length - 1].src);
      }
      if (!e)
        throw new Error(
          'Automatic publicPath is not supported in this browser'
        );
      (e = e
        .replace(/#.*$/, '')
        .replace(/\?.*$/, '')
        .replace(/\/[^\/]+$/, '/')),
        (a.p = e);
    })(),
    (() => {
      var e = { 179: 0 };
      a.f.j = (t, n) => {
        var r = a.o(e, t) ? e[t] : void 0;
        if (0 !== r)
          if (r) n.push(r[2]);
          else {
            var o = new Promise((n, o) => (r = e[t] = [n, o]));
            n.push((r[2] = o));
            var i = a.p + a.u(t),
              s = new Error();
            a.l(
              i,
              (n) => {
                if (a.o(e, t) && (0 !== (r = e[t]) && (e[t] = void 0), r)) {
                  var o = n && ('load' === n.type ? 'missing' : n.type),
                    i = n && n.target && n.target.src;
                  (s.message =
                    'Loading chunk ' + t + ' failed.\n(' + o + ': ' + i + ')'),
                    (s.name = 'ChunkLoadError'),
                    (s.type = o),
                    (s.request = i),
                    r[1](s);
                }
              },
              'chunk-' + t,
              t
            );
          }
      };
      var t = (t, n) => {
          var r,
            o,
            [i, s, c] = n,
            l = 0;
          if (i.some((t) => 0 !== e[t])) {
            for (r in s) a.o(s, r) && (a.m[r] = s[r]);
            c && c(a);
          }
          for (t && t(n); l < i.length; l++)
            (o = i[l]), a.o(e, o) && e[o] && e[o][0](), (e[o] = 0);
        },
        n = (self.webpackChunkmartime_web_app =
          self.webpackChunkmartime_web_app || []);
      n.forEach(t.bind(null, 0)), (n.push = t.bind(null, n.push.bind(n)));
    })(),
    a(42);
})();
//# sourceMappingURL=main.bundle.js.map
