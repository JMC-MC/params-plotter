"use strict";(self.webpackChunkmartime_web_app=self.webpackChunkmartime_web_app||[]).push([[163],{3163:(e,n,t)=>{t.r(n),t.d(n,{buildThreeDRendering:()=>L});var i=t(9477),o=t(3867),s=t(4458),a=t(5786),r=t(5484),l=t(7531),c=t(3660),d=t(2644),h=t(2531),u=t(2171),m=t(9755);let w,f,v,g,p,b,P,C,y;const S={elevation:-10,azimuth:90};let M,x=Date.now();const k=1e3/30;let D,N,z=new i.ZAu;z.name="buoys";const T=1e3;let W=!1,I=0;const H=new i.vBJ({color:"black"}),R={};f=new i.xsS,w=new i.cPb(55,window.innerWidth/window.innerHeight,1,2e4),w.position.set(30,30,100);const E=new i.mTL,_=new i.SJI;w.add(_);var O=new o.E;const j={PDV:"assets/pdv-fog-signal.mp3",SV:"assets/lame-duck-fog-signal.mp3",VEIF:"assets/lame-duck-fog-signal.mp3",NUC:"assets/lame-duck-fog-signal.mp3",RAM:"assets/lame-duck-fog-signal.mp3",anchorless100m:"assets/at-anchor-less-than-100m.mp3"},B=(e,n,t,o,s,a)=>new Promise(((r,l)=>{O.load(e,(function(e){let l=e.scene;l.position.set(Y(n),0,Y(t)),l.rotation.y=-o,l.name=s,u.f.resVis?E.load(Z(a),(function(e){const n=new i.VYz(_);n.setBuffer(e),n.setRefDistance(10),n.setLoop(!0),"PDV"==a&&(n.offset=Math.random()),l.add(n),f.add(l)})):f.add(l),r("success")}),void 0,(function(e){l(e)}))})),F=(e,n,t,i,o)=>new Promise(((s,a)=>{O.load(e,(function(e){let a=e.scene;a.position.set(Y(n),0,Y(t)),a.name=i,a.number=o,a.flashInterval=1e3,a.flashLength=T,a.lightOn=!0,z.add(a),s("success")}),void 0,(function(e){a(e)}))}));function L(){w.rotation.y=-u.a6[0].course-Math.PI/2,m("#base-wrapper").css("transform","rotate("+Math.round(180*u.a6[0].course/Math.PI+90)+"deg)"),S.elevation=u.f.elevation;const e=new Promise(((e,n)=>{(async()=>{try{const n=[];u.a6.slice(1).forEach((e=>{n.push(B("assets/"+e.type+".glb",e.relposXnm,e.relposYnm,e.course,e.name,e.type))})),u.NC&&(u.NC.markers.relPositionsPort.forEach(((e,t)=>{n.push(F("assets/portMarker.glb",e.x,e.y,`port_marker_${t}`,t))})),u.NC.markers.relPositionsStarboard.forEach(((e,t)=>{n.push(F("assets/stbMarker.glb",e.x,e.y,`starboard_marker_${t}`,t))})));const t=await Promise.all(n);u.NC&&f.add(z),e(t)}catch(e){n(e)}})()})),n=new Promise(((e,n)=>{v=new i.CP7({canvas:ThreeDcanvas}),v.setPixelRatio(window.devicePixelRatio),v.setSize(window.innerWidth,window.innerHeight),v.toneMapping=i.LY2,f=new i.xsS;const t=new s.C(f,w);p=new i.Pa4;const o=new i._12(1e5,1e5);g=new c.B(o,{textureWidth:512,textureHeight:512,waterNormals:(new i.dpR).load("assets/waternormals.jpg",(function(e){e.wrapS=e.wrapT=i.rpg})),sunDirection:new i.Pa4,sunColor:16777215,waterColor:7695,distortionScale:3.7,fog:void 0!==f.fog}),g.rotation.x=-Math.PI/2,f.add(g);const M=new d.q;M.scale.setScalar(1e4),f.add(M);const x=M.material.uniforms;x.turbidity.value=10,x.rayleigh.value=2,x.mieCoefficient.value=.005,x.mieDirectionalG.value=.8;const k=new i.anP(v);let D;u.f.resVis&&(x.mieCoefficient.value=.8,x.mieDirectionalG.value=.5,f.fog=new i.ybr(4737097,1e3,1100),S.elevation=55.23),function(){const e=i.M8C.degToRad(90-S.elevation),n=i.M8C.degToRad(S.azimuth);p.setFromSphericalCoords(1,e,n),M.material.uniforms.sunPosition.value.copy(p),g.material.uniforms.sunDirection.value.copy(p).normalize(),g.material.blendDst=2,void 0!==D&&D.dispose(),D=k.fromScene(M),f.environment=D.texture}(),b=new r.m(new i.FM8(window.innerWidth,window.innerHeight),1.5,.4,.85),b.threshold=0,b.strength=5,b.radius=1,P=new a.x(v),P.renderToScreen=!1,P.addPass(t),P.addPass(b),y=new l.T(new i.jyz({uniforms:{baseTexture:{value:null},bloomTexture:{value:P.renderTarget2.texture}},vertexShader:document.getElementById("vertexshader").textContent,fragmentShader:document.getElementById("fragmentshader").textContent,defines:{}}),"baseTexture"),y.needsSwap=!0,C=new a.x(v),C.addPass(t),C.addPass(y),window.addEventListener("resize",(()=>{v.setSize(window.innerWidth,window.innerHeight),w.aspect=window.innerWidth/window.innerHeight,w.updateProjectionMatrix(),P.setSize(window.innerWidth,window.innerHeight),C.setSize(window.innerWidth,window.innerHeight)})),window.addEventListener("orientationchange",(()=>{v.setSize(window.innerWidth,window.innerHeight),w.aspect=window.innerWidth/window.innerHeight,w.updateProjectionMatrix(),P.setSize(window.innerWidth,window.innerHeight),C.setSize(window.innerWidth,window.innerHeight)})),m("#course-display").append(`<p>${h.UN(h.v2(u.a6[0].vector.angle).toFixed(1))}&deg;</p>`),m("#speed-display").append(`<p>${u.a6[0].speed.toFixed(1)} Kts</p>`),e("success"),n("Error during intialization"),console.log(f)}));(async()=>{try{await Promise.all([e,n]),S.elevation>2&&S.elevation<178?N=!1:(N=!0,function(e){e||f.traverse((e=>{e.name.includes("light")&&(e.visible=!1)}))}(N)),V(),m(".threeOverlay").hide()}catch(e){console.log(e)}})()}function V(){if(requestAnimationFrame(V),!0===u.f.play&&(M=Date.now(),D=M-x,D>k&&(x=M-D%k,(0,u._l)(k),m("#lookOut").is(":visible")))){N&&J(),performance.now(),g.material.uniforms&&(g.material.uniforms.time.value+=1/60),v.render(f,w),J(),C.render(),W?(w.fov=20,w.updateProjectionMatrix()):(w.fov=45,w.updateProjectionMatrix()),w.rotation.y+=I,function(){let e=new i.Pa4;w.getWorldDirection(e);let n=Math.atan2(e.z,e.x)+Math.PI/2;n<0&&(n+=2*Math.PI),U=Math.round(180*n/Math.PI);let t=[n-.035,n-.0175,n,n+.0175,n+.035];t.forEach((function(e,n){e<0&&(e+=2*Math.PI);let i=Math.round(180*e/Math.PI);t[n]=h.UN(i)})),m("#orientator").css("transform","rotate("+t[2]+"deg)"),m("#vis-bearing").text(""),t[2]="<span id=fcsBrng>"+t[2]+"</span>",m("#vis-bearing").append(t.join("  "))}();for(let e=2;e<f.children.length;e++){if(f.children[e].name.startsWith("00")){let n=f.children[e].name,t=A(n);if(f.children[e].position.set(Y(u.a6[t].relposXnm),0,Y(u.a6[t].relposYnm)),N&&q(t,f.children[e]),$(t,f.children[e]),n="003"){const n=f.children[e].children[f.children[e].children.length-1];0==n.isPlaying&&n.play()}}if(u.NC&&"buoys"==f.children[e].name)for(let n=0;n<f.children[e].children.length;n++){const t=f.children[e].children[n].number;f.children[e].children[n].name.startsWith("port")?Math.sqrt(Math.pow(u.NC.markers.relPositionsPort[t].x,2)+Math.pow(u.NC.markers.relPositionsPort[t].y,2))>11?f.children[e].children[n].visible=!1:(f.children[e].children[n].visible=!0,f.children[e].children[n].position.set(Y(u.NC.markers.relPositionsPort[t].x),0,Y(u.NC.markers.relPositionsPort[t].y))):f.children[e].children[n].name.startsWith("starboard")&&(Math.sqrt(Math.pow(u.NC.markers.relPositionsStarboard[t].x,2)+Math.pow(u.NC.markers.relPositionsStarboard[t].y,2))>11?f.children[e].children[n].visible=!1:(f.children[e].children[n].visible=!0,f.children[e].children[n].position.set(Y(u.NC.markers.relPositionsStarboard[t].x),0,Y(u.NC.markers.relPositionsStarboard[t].y)))),1==f.children[e].children[n].visible&&N&&G(f.children[e].children[n])}}}}function $(e,n){u.a6[e].range>11?n.visible=!1:n.visible=!0}function q(e,n){const t=u.a6[e].USNRel;n.traverse((e=>{e.name.includes("SG")&&(t>0&&t<112.5||t>354&&t<360)&&(e.visible=!0),e.name.includes("SG")&&t>112.5&&t<354&&(e.visible=!1),e.name.includes("SR")&&(t>247.5&&t<360||t>0&&t<4)&&(e.visible=!0),e.name.includes("SR")&&t>4&&t<247.5&&(e.visible=!1),e.name.includes("MH")&&(t>247.5&&t<360||t>0&&t<112.5)&&(e.visible=!0),e.name.includes("MH")&&t>112.5&&t<247.5&&(e.visible=!1),e.name.includes("STRN")&&t>112.5&&t<247.5&&(e.visible=!0),e.name.includes("STRN")&&t>0&&t<112.5&&(e.visible=!1),e.name.includes("STRN")&&t>247.5&&t<360&&(e.visible=!1)}))}function A(e){return u.a6.findIndex((function(n){return n.name==e}))}function G(e){e.lastSwitch||function(e){const n=Math.random()*T;e.lastSwitch=Date.now()-n}(e);const n=Date.now()-e.lastSwitch;e.lightOn&&n>e.flashLength?e.traverse((n=>{n.name.includes("light")&&(n.visible=!1),e.lightOn=!1,e.lastSwitch=Date.now()})):!e.lightOn&&n>e.flashInterval&&e.traverse((n=>{n.name.includes("light")&&(n.visible=!0),e.lightOn=!0,e.lastSwitch=Date.now()}))}let U="";function Y(e){return 1e3*e}function J(e){f.traverse(X),P.render(),f.traverse(K)}function X(e){e.isMesh&&!e.name.includes("light")&&(R[e.uuid]=e.material,e.material=H)}function K(e){R[e.uuid]&&(e.material=R[e.uuid],delete R[e.uuid])}const Z=function(e){return j[e]};m((function(){m("#zoom-view").on("touchstart mousedown",(function(){W=!0,m("#zoom-view").addClass("view-selected"),m("#eye-view").removeClass("view-selected"),m("#compass-view").removeClass("view-selected"),m("#compass-cont").is(":visible")&&m("#compass-cont").toggle(),m("#instrument-panel").is(":visible")||m("#instrument-panel").toggle(),m("#left-arrow i").addClass("fa-duotone fa-chevrons-left").removeClass("fa-regular fa-chevron-left"),m("#right-arrow i").addClass("fa-duotone fa-chevrons-right").removeClass("fa-regular fa-chevron-right")})),m("#eye-view").on("touchstart mousedown",(function(){W=!1,m("#eye-view").addClass("view-selected"),m("#zoom-view").removeClass("view-selected"),m("#compass-view").removeClass("view-selected"),m("#compass-cont").is(":visible")&&m("#compass-cont").toggle(),m("#instrument-panel").is(":visible")||m("#instrument-panel").toggle(),m("#left-arrow i").addClass("fa-duotone fa-chevrons-left").removeClass("fa-regular fa-chevron-left"),m("#right-arrow i").addClass("fa-duotone fa-chevrons-right").removeClass("fa-regular fa-chevron-right")})),m("#compass-view").on("touchstart mousedown",(function(){W=!1,m("#eye-view").removeClass("view-selected"),m("#zoom-view").removeClass("view-selected"),m("#compass-view").addClass("view-selected"),m("#compass-cont").is(":visible")||m("#compass-cont").toggle(),m("#instrument-panel").is(":visible")&&m("#instrument-panel").toggle(),ee(!0),m("#left-arrow i").addClass("fa-regular fa-chevron-left").removeClass("fa-duotone fa-chevrons-left"),m("#right-arrow i").addClass("fa-regular fa-chevron-right").removeClass("fa-duotone fa-chevrons-right")})),m("#left-arrow").on("hover",(function(e){m(this).css("color","rgba(255, 255, 255, 1)")}),(function(){m(this).css("color","rgba(255, 255, 255, 0.75)")})),m("#left-arrow").on("touchstart mousedown",(function(e){e.preventDefault(),m("#compass-cont").is(":visible")?(I=9e-4,ee()):I=.01,m(this).css("color","rgba(255, 255, 255, 1)")})),m("#left-arrow").on("touchend mouseup",(function(e){e.preventDefault(),I=0,m(this).css("color","rgba(255, 255, 255, 0.75)")})),m(document).on("keydown",(function(e){37==e.which&&(m("#compass-cont").is(":visible")?(I=9e-4,ee()):I=.01)})),m(document).on("keyup",(function(e){37==e.which&&(I=0)})),m("#right-arrow").on("hover",(function(e){m(this).css("color","rgba(255, 255, 255, 1)")}),(function(){m(this).css("color","rgba(255, 255, 255, 0.75)")})),m("#right-arrow").on("touchstart mousedown",(function(e){e.preventDefault(),m("#compass-cont").is(":visible")?(I=-9e-4,ee()):I=-.01,m(this).css("color","rgba(255, 255, 255, 1)")})),m("#right-arrow").on("touchend mouseup",(function(e){e.preventDefault(),I=0,m(this).css("color","rgba(255, 255, 255, 0.75)")})),m(document).on("keydown",(function(e){39==e.which&&(m("#compass-cont").is(":visible")?(I=-9e-4,ee()):I=-.01)})),m(document).on("keyup",(function(e){39==e.which&&(I=0)})),m("#lookout-button").on("touchstart mousedown",(function(){ee(),console.log("Fired play audio"),f.traverse((e=>{"Audio"==e.type&&(console.log(e),e.context.resume())}))}))}));let Q="";const ee=function(e){const n=Q;Q=Date.now();const t=Q-n;u.a6.slice(1).forEach((i=>{const o=Math.abs(h.v2(Math.round(i.vecOwnShip.angle))-U);t>1e3&&o<3&&(console.log(`bearingDiff = ${o} | dwellTime = ${t} |  actualBearing = ${i.bearing}`),i.bearingsTaken.push(n)),e&&o<4&&i.bearingsTaken.push(Q)}))}}}]);
//# sourceMappingURL=163.bundle.js.map