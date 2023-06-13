'use strict';
(self.webpackChunkmartime_web_app =
  self.webpackChunkmartime_web_app || []).push([
  [163],
  {
    3163: (e, n, i) => {
      i.r(n), i.d(n, { buildThreeDRendering: () => F });
      var t = i(9477),
        o = i(3867),
        s = i(4458),
        a = i(5786),
        r = i(5484),
        l = i(7531),
        c = i(3660),
        d = i(2644),
        h = i(2531),
        u = i(9042),
        w = i(9755);
      let m, f, v, p, g, b, P, C, y;
      const S = { elevation: -10, azimuth: 90 };
      let M,
        x = Date.now();
      const k = 1e3 / 30;
      let D,
        N,
        z = new t.ZAu();
      z.name = 'buoys';
      const T = 1e3;
      let W = !1,
        A = 0;
      const I = new t.vBJ({ color: 'black' }),
        H = {};
      (f = new t.xsS()),
        (m = new t.cPb(55, window.innerWidth / window.innerHeight, 1, 2e4)),
        m.position.set(30, 30, 100);
      const R = new t.mTL(),
        E = new t.SJI();
      m.add(E);
      var _ = new o.E();
      const O = {
          PDV: 'assets/pdv-fog-signal.mp3',
          SV: 'assets/lame-duck-fog-signal.mp3',
          VEIF: 'assets/lame-duck-fog-signal.mp3',
          NUC: 'assets/lame-duck-fog-signal.mp3',
          RAM: 'assets/lame-duck-fog-signal.mp3',
          anchorless100m: 'assets/at-anchor-less-than-100m.mp3',
        },
        j = (e, n, i, o, s, a) =>
          new Promise((r, l) => {
            _.load(
              e,
              function (e) {
                let l = e.scene;
                l.position.set(Y(n), 0, Y(i)),
                  (l.rotation.y = -o),
                  (l.name = s),
                  u.f.resVis
                    ? R.load(Z(a), function (e) {
                        const n = new t.VYz(E);
                        n.setBuffer(e),
                          n.setRefDistance(10),
                          n.setLoop(!0),
                          'PDV' == a && (n.offset = Math.random()),
                          l.add(n),
                          f.add(l);
                      })
                    : f.add(l),
                  r('success');
              },
              void 0,
              function (e) {
                l(e);
              }
            );
          }),
        B = (e, n, i, t, o) =>
          new Promise((s, a) => {
            _.load(
              e,
              function (e) {
                let a = e.scene;
                a.position.set(Y(n), 0, Y(i)),
                  (a.name = t),
                  (a.number = o),
                  (a.flashInterval = 1e3),
                  (a.flashLength = T),
                  (a.lightOn = !0),
                  z.add(a),
                  s('success');
              },
              void 0,
              function (e) {
                a(e);
              }
            );
          });
      function F() {
        (m.rotation.y = -window.shipsAfloat[0].course - Math.PI / 2),
          w('#base-wrapper').css(
            'transform',
            'rotate(' +
              Math.round((180 * shipsAfloat[0].course) / Math.PI + 90) +
              'deg)'
          ),
          (S.elevation = u.f.elevation);
        const e = new Promise((e, n) => {
            (async () => {
              try {
                const n = [];
                window.shipsAfloat.slice(1).forEach((e) => {
                  n.push(
                    j(
                      'assets/' + e.type + '.glb',
                      e.relposXnm,
                      e.relposYnm,
                      e.course,
                      e.name,
                      e.type
                    )
                  );
                }),
                  u.NC &&
                    (u.NC.markers.relPositionsPort.forEach((e, i) => {
                      n.push(
                        B(
                          'assets/portMarker.glb',
                          e.x,
                          e.y,
                          `port_marker_${i}`,
                          i
                        )
                      );
                    }),
                    u.NC.markers.relPositionsStarboard.forEach((e, i) => {
                      n.push(
                        B(
                          'assets/stbMarker.glb',
                          e.x,
                          e.y,
                          `starboard_marker_${i}`,
                          i
                        )
                      );
                    }));
                const i = await Promise.all(n);
                u.NC && f.add(z), e(i);
              } catch (e) {
                n(e);
              }
            })();
          }),
          n = new Promise((e, n) => {
            (v = new t.CP7({ canvas: ThreeDcanvas })),
              v.setPixelRatio(window.devicePixelRatio),
              v.setSize(window.innerWidth, window.innerHeight),
              (v.toneMapping = t.LY2),
              (f = new t.xsS());
            const i = new s.C(f, m);
            g = new t.Pa4();
            const o = new t._12(1e5, 1e5);
            (p = new c.B(o, {
              textureWidth: 512,
              textureHeight: 512,
              waterNormals: new t.dpR().load(
                'assets/waternormals.jpg',
                function (e) {
                  e.wrapS = e.wrapT = t.rpg;
                }
              ),
              sunDirection: new t.Pa4(),
              sunColor: 16777215,
              waterColor: 7695,
              distortionScale: 3.7,
              fog: void 0 !== f.fog,
            })),
              (p.rotation.x = -Math.PI / 2),
              f.add(p);
            const M = new d.q();
            M.scale.setScalar(1e4), f.add(M);
            const x = M.material.uniforms;
            (x.turbidity.value = 10),
              (x.rayleigh.value = 2),
              (x.mieCoefficient.value = 0.005),
              (x.mieDirectionalG.value = 0.8);
            const k = new t.anP(v);
            let D;
            u.f.resVis &&
              ((x.mieCoefficient.value = 0.8),
              (x.mieDirectionalG.value = 0.5),
              (f.fog = new t.ybr(4737097, 1e3, 1100)),
              (S.elevation = 55.23)),
              (function () {
                const e = t.M8C.degToRad(90 - S.elevation),
                  n = t.M8C.degToRad(S.azimuth);
                g.setFromSphericalCoords(1, e, n),
                  M.material.uniforms.sunPosition.value.copy(g),
                  p.material.uniforms.sunDirection.value.copy(g).normalize(),
                  (p.material.blendDst = 2),
                  void 0 !== D && D.dispose(),
                  (D = k.fromScene(M)),
                  (f.environment = D.texture);
              })(),
              (b = new r.m(
                new t.FM8(window.innerWidth, window.innerHeight),
                1.5,
                0.4,
                0.85
              )),
              (b.threshold = 0),
              (b.strength = 5),
              (b.radius = 1),
              (P = new a.x(v)),
              (P.renderToScreen = !1),
              P.addPass(i),
              P.addPass(b),
              (y = new l.T(
                new t.jyz({
                  uniforms: {
                    baseTexture: { value: null },
                    bloomTexture: { value: P.renderTarget2.texture },
                  },
                  vertexShader:
                    document.getElementById('vertexshader').textContent,
                  fragmentShader:
                    document.getElementById('fragmentshader').textContent,
                  defines: {},
                }),
                'baseTexture'
              )),
              (y.needsSwap = !0),
              (C = new a.x(v)),
              C.addPass(i),
              C.addPass(y),
              window.addEventListener('resize', () => {
                v.setSize(window.innerWidth, window.innerHeight),
                  (m.aspect = window.innerWidth / window.innerHeight),
                  m.updateProjectionMatrix(),
                  P.setSize(window.innerWidth, window.innerHeight),
                  C.setSize(window.innerWidth, window.innerHeight);
              }),
              window.addEventListener('orientationchange', () => {
                v.setSize(window.innerWidth, window.innerHeight),
                  (m.aspect = window.innerWidth / window.innerHeight),
                  m.updateProjectionMatrix(),
                  P.setSize(window.innerWidth, window.innerHeight),
                  C.setSize(window.innerWidth, window.innerHeight);
              }),
              w('#course-display').append(
                `<p>${h.UN(
                  h.v2(window.shipsAfloat[0].vector.angle).toFixed(1)
                )}&deg;</p>`
              ),
              w('#speed-display').append(
                `<p>${window.shipsAfloat[0].speed.toFixed(1)} Kts</p>`
              ),
              e('success'),
              n('Error during intialization'),
              console.log(f);
          });
        (async () => {
          try {
            await Promise.all([e, n]),
              S.elevation > 2 && S.elevation < 178
                ? (N = !1)
                : ((N = !0),
                  (function (e) {
                    e ||
                      f.traverse((e) => {
                        e.name.includes('light') && (e.visible = !1);
                      });
                  })(N)),
              L(),
              w('.threeOverlay').hide();
          } catch (e) {
            console.log(e);
          }
        })();
      }
      function L() {
        if (
          (requestAnimationFrame(L),
          !0 === u.f.play &&
            ((M = Date.now()),
            (D = M - x),
            D > k &&
              ((x = M - (D % k)), (0, u._)(k), w('#lookOut').is(':visible'))))
        ) {
          N && J(),
            performance.now(),
            p.material.uniforms && (p.material.uniforms.time.value += 1 / 60),
            v.render(f, m),
            J(),
            C.render(),
            W
              ? ((m.fov = 20), m.updateProjectionMatrix())
              : ((m.fov = 45), m.updateProjectionMatrix()),
            (m.rotation.y += A),
            (function () {
              let e = new t.Pa4();
              m.getWorldDirection(e);
              let n = Math.atan2(e.z, e.x) + Math.PI / 2;
              n < 0 && (n += 2 * Math.PI),
                (U = Math.round((180 * n) / Math.PI));
              let i = [n - 0.035, n - 0.0175, n, n + 0.0175, n + 0.035];
              i.forEach(function (e, n) {
                e < 0 && (e += 2 * Math.PI);
                let t = Math.round((180 * e) / Math.PI);
                i[n] = h.UN(t);
              }),
                w('#orientator').css('transform', 'rotate(' + i[2] + 'deg)'),
                w('#vis-bearing').text(''),
                (i[2] = '<span id=fcsBrng>' + i[2] + '</span>'),
                w('#vis-bearing').append(i.join('  '));
            })();
          for (let e = 2; e < f.children.length; e++) {
            if (f.children[e].name.startsWith('00')) {
              let n = f.children[e].name,
                i = q(n);
              if (
                (f.children[e].position.set(
                  Y(window.shipsAfloat[i].relposXnm),
                  0,
                  Y(window.shipsAfloat[i].relposYnm)
                ),
                N && $(i, f.children[e]),
                V(i, f.children[e]),
                (n = '003'))
              ) {
                const n =
                  f.children[e].children[f.children[e].children.length - 1];
                0 == n.isPlaying && n.play();
              }
            }
            if (u.NC && 'buoys' == f.children[e].name)
              for (let n = 0; n < f.children[e].children.length; n++) {
                const i = f.children[e].children[n].number;
                f.children[e].children[n].name.startsWith('port')
                  ? Math.sqrt(
                      Math.pow(u.NC.markers.relPositionsPort[i].x, 2) +
                        Math.pow(u.NC.markers.relPositionsPort[i].y, 2)
                    ) > 11
                    ? (f.children[e].children[n].visible = !1)
                    : ((f.children[e].children[n].visible = !0),
                      f.children[e].children[n].position.set(
                        Y(u.NC.markers.relPositionsPort[i].x),
                        0,
                        Y(u.NC.markers.relPositionsPort[i].y)
                      ))
                  : f.children[e].children[n].name.startsWith('starboard') &&
                    (Math.sqrt(
                      Math.pow(u.NC.markers.relPositionsStarboard[i].x, 2) +
                        Math.pow(u.NC.markers.relPositionsStarboard[i].y, 2)
                    ) > 11
                      ? (f.children[e].children[n].visible = !1)
                      : ((f.children[e].children[n].visible = !0),
                        f.children[e].children[n].position.set(
                          Y(u.NC.markers.relPositionsStarboard[i].x),
                          0,
                          Y(u.NC.markers.relPositionsStarboard[i].y)
                        ))),
                  1 == f.children[e].children[n].visible &&
                    N &&
                    G(f.children[e].children[n]);
              }
          }
        }
      }
      function V(e, n) {
        window.shipsAfloat[e].range > 11 ? (n.visible = !1) : (n.visible = !0);
      }
      function $(e, n) {
        const i = window.shipsAfloat[e].USNRel;
        n.traverse((e) => {
          e.name.includes('SG') &&
            ((i > 0 && i < 112.5) || (i > 354 && i < 360)) &&
            (e.visible = !0),
            e.name.includes('SG') && i > 112.5 && i < 354 && (e.visible = !1),
            e.name.includes('SR') &&
              ((i > 247.5 && i < 360) || (i > 0 && i < 4)) &&
              (e.visible = !0),
            e.name.includes('SR') && i > 4 && i < 247.5 && (e.visible = !1),
            e.name.includes('MH') &&
              ((i > 247.5 && i < 360) || (i > 0 && i < 112.5)) &&
              (e.visible = !0),
            e.name.includes('MH') && i > 112.5 && i < 247.5 && (e.visible = !1),
            e.name.includes('STRN') &&
              i > 112.5 &&
              i < 247.5 &&
              (e.visible = !0),
            e.name.includes('STRN') && i > 0 && i < 112.5 && (e.visible = !1),
            e.name.includes('STRN') && i > 247.5 && i < 360 && (e.visible = !1);
        });
      }
      function q(e) {
        return window.shipsAfloat.findIndex(function (n) {
          return n.name == e;
        });
      }
      function G(e) {
        e.lastSwitch ||
          (function (e) {
            const n = Math.random() * T;
            e.lastSwitch = Date.now() - n;
          })(e);
        const n = Date.now() - e.lastSwitch;
        e.lightOn && n > e.flashLength
          ? e.traverse((n) => {
              n.name.includes('light') && (n.visible = !1),
                (e.lightOn = !1),
                (e.lastSwitch = Date.now());
            })
          : !e.lightOn &&
            n > e.flashInterval &&
            e.traverse((n) => {
              n.name.includes('light') && (n.visible = !0),
                (e.lightOn = !0),
                (e.lastSwitch = Date.now());
            });
      }
      let U = '';
      function Y(e) {
        return 1e3 * e;
      }
      function J(e) {
        f.traverse(X), P.render(), f.traverse(K);
      }
      function X(e) {
        e.isMesh &&
          !e.name.includes('light') &&
          ((H[e.uuid] = e.material), (e.material = I));
      }
      function K(e) {
        H[e.uuid] && ((e.material = H[e.uuid]), delete H[e.uuid]);
      }
      const Z = function (e) {
        return O[e];
      };
      w(function () {
        w('#zoom-view').on('touchstart mousedown', function () {
          (W = !0),
            w('#zoom-view').addClass('view-selected'),
            w('#eye-view').removeClass('view-selected'),
            w('#compass-view').removeClass('view-selected'),
            w('#compass-cont').is(':visible') && w('#compass-cont').toggle(),
            w('#instrument-panel').is(':visible') ||
              w('#instrument-panel').toggle(),
            w('#left-arrow i')
              .addClass('fa-duotone fa-chevrons-left')
              .removeClass('fa-regular fa-chevron-left'),
            w('#right-arrow i')
              .addClass('fa-duotone fa-chevrons-right')
              .removeClass('fa-regular fa-chevron-right');
        }),
          w('#eye-view').on('touchstart mousedown', function () {
            (W = !1),
              w('#eye-view').addClass('view-selected'),
              w('#zoom-view').removeClass('view-selected'),
              w('#compass-view').removeClass('view-selected'),
              w('#compass-cont').is(':visible') && w('#compass-cont').toggle(),
              w('#instrument-panel').is(':visible') ||
                w('#instrument-panel').toggle(),
              w('#left-arrow i')
                .addClass('fa-duotone fa-chevrons-left')
                .removeClass('fa-regular fa-chevron-left'),
              w('#right-arrow i')
                .addClass('fa-duotone fa-chevrons-right')
                .removeClass('fa-regular fa-chevron-right');
          }),
          w('#compass-view').on('touchstart mousedown', function () {
            (W = !1),
              w('#eye-view').removeClass('view-selected'),
              w('#zoom-view').removeClass('view-selected'),
              w('#compass-view').addClass('view-selected'),
              w('#compass-cont').is(':visible') || w('#compass-cont').toggle(),
              w('#instrument-panel').is(':visible') &&
                w('#instrument-panel').toggle(),
              ee(!0),
              w('#left-arrow i')
                .addClass('fa-regular fa-chevron-left')
                .removeClass('fa-duotone fa-chevrons-left'),
              w('#right-arrow i')
                .addClass('fa-regular fa-chevron-right')
                .removeClass('fa-duotone fa-chevrons-right');
          }),
          w('#left-arrow').on(
            'hover',
            function (e) {
              w(this).css('color', 'rgba(255, 255, 255, 1)');
            },
            function () {
              w(this).css('color', 'rgba(255, 255, 255, 0.75)');
            }
          ),
          w('#left-arrow').on('touchstart mousedown', function (e) {
            e.preventDefault(),
              w('#compass-cont').is(':visible')
                ? ((A = 9e-4), ee())
                : (A = 0.01),
              w(this).css('color', 'rgba(255, 255, 255, 1)');
          }),
          w('#left-arrow').on('touchend mouseup', function (e) {
            e.preventDefault(),
              (A = 0),
              w(this).css('color', 'rgba(255, 255, 255, 0.75)');
          }),
          w(document).on('keydown', function (e) {
            37 == e.which &&
              (w('#compass-cont').is(':visible')
                ? ((A = 9e-4), ee())
                : (A = 0.01));
          }),
          w(document).on('keyup', function (e) {
            37 == e.which && (A = 0);
          }),
          w('#right-arrow').on(
            'hover',
            function (e) {
              w(this).css('color', 'rgba(255, 255, 255, 1)');
            },
            function () {
              w(this).css('color', 'rgba(255, 255, 255, 0.75)');
            }
          ),
          w('#right-arrow').on('touchstart mousedown', function (e) {
            e.preventDefault(),
              w('#compass-cont').is(':visible')
                ? ((A = -9e-4), ee())
                : (A = -0.01),
              w(this).css('color', 'rgba(255, 255, 255, 1)');
          }),
          w('#right-arrow').on('touchend mouseup', function (e) {
            e.preventDefault(),
              (A = 0),
              w(this).css('color', 'rgba(255, 255, 255, 0.75)');
          }),
          w(document).on('keydown', function (e) {
            39 == e.which &&
              (w('#compass-cont').is(':visible')
                ? ((A = -9e-4), ee())
                : (A = -0.01));
          }),
          w(document).on('keyup', function (e) {
            39 == e.which && (A = 0);
          }),
          w('#lookout-button').on('touchstart mousedown', function () {
            ee(),
              console.log('Fired play audio'),
              f.traverse((e) => {
                'Audio' == e.type && (console.log(e), e.context.resume());
              });
          });
      });
      let Q = '';
      const ee = function (e) {
        const n = Q;
        Q = Date.now();
        const i = Q - n;
        window.shipsAfloat.slice(1).forEach((t) => {
          const o = Math.abs(h.v2(Math.round(t.vecOwnShip.angle)) - U);
          i > 1e3 &&
            o < 3 &&
            (console.log(
              `bearingDiff = ${o} | dwellTime = ${i} |  actualBearing = ${t.bearing}`
            ),
            t.bearingsTaken.push(n)),
            e && o < 4 && t.bearingsTaken.push(Q);
        });
      };
    },
  },
]);
//# sourceMappingURL=163.bundle.js.map
