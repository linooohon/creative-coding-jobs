(function(e){function t(t){for(var o,c,i=t[0],u=t[1],s=t[2],d=0,f=[];d<i.length;d++)c=i[d],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&f.push(r[c][0]),r[c]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);l&&l(t);while(f.length)f.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,c=1;c<n.length;c++){var u=n[c];0!==r[u]&&(o=!1)}o&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},r={app:0},a=[];function c(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-0c48f460":"900d942a","chunk-2c1bedf8":"04aad299","chunk-2d0bd977":"2c89de42","chunk-35cd53b2":"5794774a","chunk-45f0ea15":"d609c0a8"}[e]+".js"}function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise((function(t,o){n=r[e]=[t,o]}));t.push(n[2]=o);var a,u=document.createElement("script");u.charset="utf-8",u.timeout=120,i.nc&&u.setAttribute("nonce",i.nc),u.src=c(e);var s=new Error;a=function(t){u.onerror=u.onload=null,clearTimeout(d);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+o+": "+a+")",s.name="ChunkLoadError",s.type=o,s.request=a,n[1](s)}r[e]=void 0}};var d=setTimeout((function(){a({type:"timeout",target:u})}),12e4);u.onerror=u.onload=a,document.head.appendChild(u)}return Promise.all(t)},i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/creative-coding-jobs-update/",i.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],s=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var l=s;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"3bd9":function(e,t,n){"use strict";n("45b0")},"45b0":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("7a23"),r={id:"nav"},a=Object(o["h"])("Dashboard"),c=Object(o["h"])(" | "),i=Object(o["h"])("Keyword"),u=Object(o["h"])(" | "),s=Object(o["h"])("Search");function d(e,t,n,d,l,f){var p=Object(o["x"])("router-link"),b=Object(o["x"])("router-view");return Object(o["s"])(),Object(o["f"])(o["a"],null,[Object(o["g"])("div",r,[Object(o["i"])(p,{to:"/"},{default:Object(o["D"])((function(){return[a]})),_:1}),c,Object(o["i"])(p,{to:"/keyword"},{default:Object(o["D"])((function(){return[i]})),_:1}),u,Object(o["i"])(p,{to:"/search"},{default:Object(o["D"])((function(){return[s]})),_:1}),Object(o["g"])("p",null,"Update at: "+Object(o["z"])(e.updateTime),1)]),Object(o["i"])(b,{chunkData:f.chunkJobData,jobData:l.totalJobData,loadData:f.loadData},null,8,["chunkData","jobData","loadData"])],64)}var l=n("5530"),f=(n("fb6a"),n("bc3a")),p=n.n(f),b=n("5502"),h={data:function(){return{totalJobData:[],keywordChunk:0}},mounted:function(){this.getTotalJobData(),this.getUpdateTime()},computed:Object(l["a"])({chunkJobData:function(){return this.totalJobData.slice(0,this.keywordChunk+3)}},Object(b["b"])(["updateTime"])),methods:{getTotalJobData:function(){var e=this;p.a.get("https://raw.githubusercontent.com/linooohon/creative-coding-jobs-update/main/data/final.json").then((function(t){e.totalJobData=t.data}))},getUpdateTime:function(){this.$store.dispatch("getUpdateTime")},loadData:function(){this.keywordChunk+=1}}},m=(n("3bd9"),n("6b0d")),g=n.n(m);const j=g()(h,[["render",d]]);var v=j,w=n("9483");Object(w["a"])("".concat("/creative-coding-jobs-update/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});n("d3b7"),n("3ca3"),n("ddb0");var O=n("6c02"),k=[{path:"/",name:"Dashboard",component:function(){return n.e("chunk-35cd53b2").then(n.bind(null,"7277"))}},{path:"/keyword",name:"Keyword",component:function(){return n.e("chunk-2c1bedf8").then(n.bind(null,"3518"))}},{path:"/search",name:"Search",component:function(){return n.e("chunk-2d0bd977").then(n.bind(null,"2d3b"))}},{path:"/keyword/:targetKeyword",name:"KeywordDashboard",component:function(){return n.e("chunk-0c48f460").then(n.bind(null,"b477"))},props:!0},{path:"/search",name:"SearchDashboard",component:function(){return n.e("chunk-45f0ea15").then(n.bind(null,"017c"))},props:function(e){return e.params}}],y=Object(O["a"])({history:Object(O["b"])("/creative-coding-jobs-update/"),routes:k}),D=y,T=n("1da1"),x=(n("96cf"),Object(b["a"])({state:{dataArray:[],updateTime:""},mutations:{assignToData:function(e,t){e.dataArray=t},assignUpdateTime:function(e,t){e.updateTime=t}},actions:{getTotalJobData:function(e){return Object(T["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p.a.get("https://raw.githubusercontent.com/linooohon/creative-coding-jobs-update/main/data/final.json");case 2:n=t.sent,e.commit("assignToData",n.data);case 4:case"end":return t.stop()}}),t)})))()},getUpdateTime:function(e){return Object(T["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p.a.get("https://raw.githubusercontent.com/linooohon/creative-coding-jobs-update/main/data/update_time.log");case 2:n=t.sent,e.commit("assignUpdateTime",n.data),console.log(n.data);case 5:case"end":return t.stop()}}),t)})))()}},modules:{}})),J=(n("713f"),n("eef3"),Object(o["c"])(v));J.use(x),J.use(D),J.mount("#app")},"713f":function(e,t,n){},eef3:function(e,t,n){}});
//# sourceMappingURL=app.70109b16.js.map