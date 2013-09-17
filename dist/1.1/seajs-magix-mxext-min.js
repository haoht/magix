define("magix/magix",function(){var e=/\/\.\/|\/[^\/]+?\/\.{2}\/|([^:\/])\/\/+/,t=/\/[^\/]*$/,r=/[#?].*$/,n="",i=/([^=&?\/#]+)=?([^&=#?]*)/g,a="pathname",o=/^https?:\/\//i,s=0,c="/",f="vframe",u=function(){},m={tagName:f,rootId:"magix_vf_root",execError:u},v={}.hasOwnProperty,h=function(e){return function(t,r,n){switch(arguments.length){case 0:n=e;break;case 1:n=w.isObject(t)?g(e,t):d(e,t)?e[t]:null;break;case 2:null===r?(delete e[t],n=r):e[t]=n=r}return n}},l=function(e,t){var r=this;return r.get?(r.c=[],r.x=e||20,r.b=r.x+(isNaN(t)?5:t),void 0):new l(e,t)},d=function(e,t){return e?v.call(e,t):e},g=function(e,t,r){for(var n in t)r&&d(r,n)||(e[n]=t[n]);return e};g(l.prototype,{get:function(e){var t,r=this,n=r.c;return e=a+e,d(n,e)&&(t=n[e],t.f>=1&&(t.f++,t.t=s++,t=t.v)),t},set:function(e,t,r){var n=this,i=n.c,o=a+e,c=i[o];if(!d(i,o)){if(i.length>=n.b){i.sort(function(e,t){return t.f==e.f?t.t-e.t:t.f-e.f});for(var f=n.b-n.x;f--;)c=i.pop(),delete i[c.k],c.m&&y(c.m,c.o,c)}c={},i.push(c),i[o]=c}return c.o=e,c.k=o,c.v=t,c.f=1,c.t=s++,c.m=r,c},del:function(e){e=a+e;var t=this.c,r=t[e];r&&(r.f=-1e5,r.v=n,delete t[e],r.m&&(y(r.m,r.o,r),r.m=0))},has:function(e){return e=a+e,d(this.c,e)}});var p=l(60),x=l(),y=function(e,t,r,n,i,a){for(w.isArray(e)||(e=[e]),t&&(w.isArray(t)||t.callee)||(t=[t]),n=0;e.length>n;n++)try{a=e[n],i=a&&a.apply(r,t)}catch(o){m.execError(o)}return i},w={isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},mix:g,has:d,safeExec:y,noop:u,config:h(m),start:function(e){var t=this;g(m,e),t.libRequire(m.iniFile,function(r){m=g(m,r,e),m.tagNameChanged=m.tagName!=f;var n=m.progress;t.libRequire(["magix/router","magix/vom"],function(e,r){e.on("!ul",r.locChged),e.on("changed",r.locChged),n&&r.on("progress",n),t.libRequire(m.extensions,e.start)})})},keys:Object.keys||function(e){var t=[];for(var r in e)d(e,r)&&t.push(r);return t},local:h({}),path:function(i,a){var s=i+"\n"+a,f=x.get(s);if(!f){if(o.test(a))f=a;else if(i=i.replace(r,n).replace(t,n)+c,a.charAt(0)==c){var u=o.test(i)?8:0,m=i.indexOf(c,u);f=i.substring(0,m)+a}else f=i+a;for(;e.test(f);)f=f.replace(e,"$1/");x.set(s,f)}return f},pathToObject:function(e,t){var s=p.get(e);if(!s){s={};var f={},u=n;r.test(e)?u=e.replace(r,n):~e.indexOf("=")||(u=e);var m=e.replace(u,n);if(u&&o.test(u)){var v=u.indexOf(c,8);u=-1==v?c:u.substring(v)}m.replace(i,function(e,r,n){if(t)try{n=decodeURIComponent(n)}catch(i){}f[r]=n}),s[a]=u,s.params=f,p.set(e,s)}return s},objectToPath:function(e,t){var r,n=e[a],i=[],o=e.params;for(var s in o)r=o[s],t&&encodeURIComponent(r),i.push(s+"="+r);return i.length&&(n=n+"?"+i.join("&")),n},listToMap:function(e,t){var r,n,i,a={};if(w.isString(e)&&(e=e.split(",")),e&&(i=e.length))for(r=0;i>r;r++)n=e[r],a[t?n[t]:n]=t?n:1;return a},cache:l},b=Object.prototype.toString;return g(w,{libRequire:function(e,t){e?seajs.use(e,t):t&&t()},isArray:$.isArray,isFunction:$.isFunction,isObject:function(e){return"[object Object]"==b.call(e)},isString:function(e){return"[object String]"==b.call(e)},isNumber:function(e){return"[object Number]"==b.call(e)},isRegExp:function(e){return"[object RegExp]"==b.call(e)},extend:function(e,t,r,n){e.superclass=t.prototype,t.prototype.constructor=t;var i=function(){};return i.prototype=t.prototype,e.prototype=new i,w.mix(e.prototype,r),w.mix(e,n),e.prototype.constructor=e,e}})}),define("magix/router",["magix/magix","magix/event"],function(e){var t,r,n,i,a,o=e("magix/magix"),s=e("magix/event"),c=window,f="",u="pathname",m=o.has,v=o.mix,h=document,l=/^UTF-8$/i.test(h.charset||h.characterSet||"UTF-8"),d=o.config(),g=o.cache(),p=o.cache(40),x=/#.*$/,y=/^[^#]*#?!?/,w="params",b=d.nativeHistory,$=function(e,t,r){if(e){r=this[w],o.isString(e)&&(e=e.split(","));for(var n=0;e.length>n&&!(t=m(r,e[n]));n++);}return t},C=function(){return m(this,u)},E=function(){return m(this,"view")},M=function(e,t,r){return t=this,r=t[w],r[e]},T=function(e){var t=o.pathToObject(e,l),r=t[u];return r&&a&&(t[u]=o.path(c.location[u],r)),t},O=v({getView:function(e,t){if(!n){n={rs:d.routes||{},nf:d.notFoundView};var r=d.defaultView;if(!r)throw Error("unset defaultView");n.home=r;var i=d.defaultPathname||f;n.rs[i]=r,n[u]=i}var a;e||(e=n[u]);var s=n.rs;return a=o.isFunction(s)?s.call(d,e,t):s[e],{view:a?a:n.nf||n.home,pathname:a||b?e:n.nf?e:n[u]}},start:function(){var e=O,t=c.history;i=b&&t.pushState,a=b&&!i,i?e.useState():e.useHash(),e.route()},parseQH:function(e,t){e=e||c.location.href;var r=O,n=g.get(e);if(!n){var i=e.replace(x,f),a=e.replace(y,f),o=T(i),s=T(a),m={};v(m,o[w]),v(m,s[w]),n={get:M,href:e,srcQuery:i,srcHash:a,query:o,hash:s,params:m},g.set(e,n)}if(t&&!n.view){var h;h=b?n.hash[u]||n.query[u]:n.hash[u];var l=r.getView(h,n);v(n,l)}return n},getChged:function(e,t){var r=e.href,n=t.href,i=r+"\n"+n,a=p.get(i);if(a||(i=n+"\n"+i,a=p.get(i)),!a){var o,s,c;a={params:{}},s=e[u],c=t[u],s!=c&&(a[u]={from:s,to:c},o=1),s=e.view,c=t.view,s!=c&&(a.view={from:s,to:c},o=1);var f,m=e[w],v=t[w];for(f in m)s=m[f],c=v[f],m[f]!=v[f]&&(o=1,a[w][f]={from:s,to:c});for(f in v)s=m[f],c=v[f],m[f]!=v[f]&&(o=1,a[w][f]={from:s,to:c});a.occur=o,a.isParam=$,a.isPathname=C,a.isView=E,p.set(i,a)}return a},route:function(){var e=O,n=e.parseQH(0,1),i=r||{params:{},href:"~"},a=!r;r=n;var o=e.getChged(i,n);o.occur&&(t=n,e.fire("changed",{location:n,changed:o,force:a}))},navigate:function(e,r,n){var s=O;if(!r&&o.isObject(e)&&(r=e,e=f),r&&(e=o.objectToPath({params:r,pathname:e},l)),e){var c=T(e),h={};if(h[w]=v({},c[w]),h[u]=c[u],h[u]){if(a){var d=t.query;if(d&&(d=d[w]))for(var g in d)m(d,g)&&!m(h[w],g)&&(h[w][g]=f)}}else{var p=v({},t[w]);h[w]=v(p,h[w]),h[u]=t[u]}var x,y=o.objectToPath(h);x=i?y!=t.srcQuery:y!=t.srcHash,x&&(i?(s.poped=1,history[n?"replaceState":"pushState"](null,null,y),s.route()):(v(h,t,h),h.srcHash=y,h.hash={params:h[w],pathname:h[u]},s.fire("!ul",{loc:t=h}),y="#!"+y,n?location.replace(y):location.hash=y))}}},s);return O.useState=function(){var e=O,t=location.href;c.addEventListener("popstate",function(){var r=location.href==t;(e.poped||!r)&&(e.poped=1,e.route())},!1)},O.useHash=function(){c.addEventListener("hashchange",O.route,!1)},O}),define("magix/body",["magix/magix"],function(e){var t,r=e("magix/magix"),n=r.has,i=r.listToMap("submit,focusin,focusout,mouseenter,mouseleave,mousewheel,change"),a=document.body,o={},s=String.fromCharCode(26),c="mx-owner",f="mx-ie",u={},m=65536,v=function(e){return e.id||(e.id="mx-e-"+m--)},h=function(e,t,r){return r?e.setAttribute(t,r):r=e.getAttribute(t),r},l={process:function(e){for(var r=e.target||e.srcElement;r&&1!=r.nodeType;)r=r.parentNode;var i=r,o=e.type,m=u[o]||(u[o]=RegExp("(?:^|,)"+o+"(?:,|$)"));if(!m.test(h(r,f))){for(var l,d,g="mx-"+o,p=[];i&&i!=a&&(l=h(i,g),d=h(i,f),!l&&!m.test(d));)p.push(i),i=i.parentNode;if(l){var x,y=l.indexOf(s);y>-1&&(x=l.slice(0,y),l=l.slice(y));var w=h(i,c)||x;if(!w)for(var b=i,$=t.all();b&&b!=a;){if(n($,b.id)){h(i,c,w=b.id);break}b=b.parentNode}if(!w)throw Error("miss "+c+":"+l);var C=t.get(w),E=C&&C.view;E&&E.processEvent({info:l,se:e,st:o,tId:v(r),cId:v(i)})}else for(var M;p.length;)M=p.shift(),d=h(M,f),m.test(d)||(d=d?d+","+o:o,h(M,f,d))}},on:function(e,r){var n=this;if(o[e])o[e]++;else{t=r,o[e]=1;var s=i[e];s?n.unbubble(0,a,e):a["on"+e]=function(e){e=e||window.event,e&&n.process(e)}}},un:function(e){var t=this,r=o[e];if(r>0){if(r--,!r){var n=i[e];n?t.unbubble(1,a,e):a["on"+e]=null}o[e]=r}}};return l.unbubble=function(e,t,r){var n=e?"undelegate":"delegate";$(t)[n]("[mx-"+r+"]",r,l.process)},l}),define("magix/event",["magix/magix"],function(e){var t=e("magix/magix"),r=function(e){return"~"+e},n=t.safeExec,i={fire:function(e,t,i,a){var o=r(e),s=this,c=s[o];if(c){t||(t={}),t.type||(t.type=e);for(var f,u,m=c.length,v=m-1;m--;)f=a?m:v-m,u=c[f],(u.d||u.r)&&(c.splice(f,1),v--),u.d||n(u.f,t,s)}i&&delete s[o]},on:function(e,n,i){var a=r(e),o=this[a]||(this[a]=[]);t.isNumeric(i)?o.splice(i,0,{f:n}):o.push({f:n,r:i})},un:function(e,t){var n=r(e),i=this[n];if(i)if(t){for(var a,o=i.length-1;o>=0;o--)if(a=i[o],a.f==t&&!a.d){a.d=1;break}}else delete this[n]}};return i}),define("magix/vframe",["magix/magix","magix/event","magix/view"],function(e){var t,r,n,i=e("magix/magix"),a=e("magix/event"),o=e("magix/view"),s=document,c=65536,f=i.safeExec,u=[].slice,m=i.mix,v=i.config("tagName"),h=i.config("rootId"),l=!i.config("tagNameChanged"),d=i.has,g="mx-view",p=l?"mx-defer":"mx-vframe",x="alter",y="created",w=function(e){return"object"==typeof e?e:s.getElementById(e)},b=function(e,t,r){return r=w(e),r?r.getElementsByTagName(t):[]},$=function(e){return s.createElement(e)},C=function(e){return e.id||(e.id="magix_vf_"+c--)},E=function(e,t,r){if(e=w(e),t=w(t),e&&t)if(e!==t)try{r=t.contains?t.contains(e):16&t.compareDocumentPosition(e)}catch(n){r=0}else r=1;return r},M=/<script[^>]*>[\s\S]*?<\/script>/gi,T=function(e){var t=this;t.id=e,t.cM={},t.cC=0,t.rC=0,t.sign=1<<30,t.rM={}};return m(T,{root:function(e,r){if(!t){n=r;var i=w(h);i||(i=$(v),i.id=h,s.body.insertBefore(i,s.body.firstChild)),t=new T(h),e.add(t)}return t}}),m(m(T.prototype,a),{mountView:function(e,t,r){var a=this,s=w(a.id);if(s._bak?s._chgd=1:(s._bak=1,s._tmpl=s.innerHTML.replace(M,"")),a.unmountView(),e){var c=i.pathToObject(e),u=c.pathname,v=--a.sign;i.libRequire(u,function(e){if(v==a.sign){var i=a.owner;o.prepare(e);var h=new e({owner:a,id:a.id,$:w,path:u,vom:i,location:n});a.view=h,h.on("interact",function(e){e.tmpl||(s._chgd&&(s.innerHTML=s._tmpl),a.mountZoneVframes(0,0,1)),h.on("rendered",function(){a.mountZoneVframes(0,0,1)}),h.on("prerender",function(){a.unmountZoneVframes(0,1)||a.cAlter()}),h.on("inited",function(){a.viewInited=1,a.fire("viewInited",{view:h}),r&&f(r,h,a)})},0),t=t||{},h.load(m(t,c.params,t))}})}},unmountView:function(){var e=this;if(e.view){r||(r={}),e.unmountZoneVframes(0,1),e.cAlter(r),e.view.destroy();var t=w(e.id);t&&t._bak&&(t.innerHTML=t._tmpl),delete e.view,delete e.viewInited,r=0,e.fire("viewUnmounted")}e.sign--},mountVframe:function(e,t,r){var n=this,i=n.owner,a=i.get(e);return a||(a=new T(e),a.pId=n.id,d(n.cM,e)||n.cC++,n.cM[e]=1,i.add(a)),a.mountView(t,r),a},mountZoneVframes:function(e,t){var r=this,n=e||r.id;r.unmountZoneVframes(n,1);var i=b(n,v),a=i.length,o={};if(a)for(var s,c,f,u,m=0;a>m;m++)if(s=i[m],c=C(s),!d(o,c)&&(f=s.getAttribute(g),u=!s.getAttribute(p),u=u==l,u||f)){r.mountVframe(c,f,t);for(var h,x=b(s,v),y=0,w=x.length;w>y;y++)h=x[y],f=h.getAttribute(g),u=!h.getAttribute(p),u=u==l,u||f||(o[C(h)]=1)}r.cCreated()},unmountVframe:function(e,t){var r=this;e=e||r.id;var n=r.owner,i=n.get(e);if(i){i.unmountView(),n.remove(e),r.fire("destroy");var a=n.get(i.pId);a&&d(a.cM,e)&&(delete a.cM[e],a.cC--,t||a.cCreated())}},unmountZoneVframes:function(e,t){var r,n,i,a=this;if(e){var o=a.cM,s={};for(i in o)E(i,e)&&(s[i]=1);r=s}else r=a.cM;for(i in r)n=1,a.unmountVframe(i,1);return t||a.cCreated(),n},invokeView:function(e){var t,r=this,n=r.view,i=u.call(arguments,1);return r.viewInited&&n[e]&&(t=f(n[e],i,n)),t},cCreated:function(e){var t=this;if(t.cC==t.rC){var r=t.view;r&&!t.fcc&&(t.fcc=1,delete t.fca,r.fire(y,e),t.fire(y,e));var n=t.owner;n.vfCreated();var i=t.id,a=n.get(t.pId);a&&!d(a.rM,i)&&(a.rM[i]=a.cM[i],a.rC++,a.cCreated(e))}},cAlter:function(e){var t=this;if(e||(e={}),delete t.fcc,!t.fca){var r=t.view,n=t.id;r&&(t.fca=1,r.fire(x,e),t.fire(x,e));var i=t.owner,a=i.get(t.pId);a&&d(a.rM,n)&&(a.rC--,delete a.rM[n],a.cAlter(e))}},locChged:function(e,t){var r=this,n=r.view;if(n&&n.sign>0&&n.rendered){var a=n.olChanged(t),o={location:e,changed:t,prevent:function(){this.cs=[]},toChildren:function(e){e=e||[],i.isString(e)&&(e=e.split(",")),this.cs=e}};a&&f(n.locationChange,o,n);for(var s,c=o.cs||i.keys(r.cM),u=0,m=c.length,v=r.owner;m>u;u++)s=v.get(c[u]),s&&s.locChged(e,t)}}}),T}),define("magix/view",function(e){var t=e("magix/magix"),r=e("magix/event"),n=e("magix/body"),i=t.safeExec,a=t.has,o=",",s=[],c=t.noop,f=t.mix,u={render:1,renderUI:1},m="~",v=function(e){return function(){var t,r=this,n=r.notifyUpdate();return n&&(t=e.apply(r,arguments)),t}},h=t.cache(40),l=/\smx-(?!view|defer|owner)[a-z]+\s*=\s*['"]/g,d=String.fromCharCode(26),g=function(){this.render()},p={prevent:function(e){e=e||this.domEvent,e.preventDefault?e.preventDefault():e.returnValue=!1},stop:function(e){e=e||this.domEvent,e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},halt:function(e){this.prevent(e),this.stop(e)}},x=/(\w+)(?:<(\w+)>)?(?:{([\s\S]*)})?/,y=/(\w+):([^,]+)/g,w=/([$\w]+)<([\w,]+)>/,b=function(e){var t=this;f(t,e),t.sign=1,i(b.ms,[e],t)};b.ms=[],b.prepare=function(e){var t=this,r=e.superclass;if(r&&t.prepare(r.constructor),!e[m]){e[m]=1,e.extend=t.extend;var n,i,s,f,h,l=e.prototype,g={};for(var p in l)if(a(l,p))if(n=l[p],i=p.match(w))for(s=i[1],f=i[2],f=f.split(o),h=f.length-1;h>-1;h--)i=f[h],g[i]=1,l[s+d+i]=n;else a(u,p)&&n!=c&&(l[p]=v(n));f&&(l.$evts=g)}},b.mixin=function(e,t){b.ms.push(t),f(b.prototype,e)},f(f(b.prototype,r),{render:c,locationChange:c,init:c,hasTmpl:!0,enableEvent:!0,load:function(){var e=this,t=e.hasTmpl,r=arguments,n=e.sign,o=a(e,"template"),c=function(a){if(n==e.sign){o||(e.template=e.wrapMxEvent(a)),e.delegateEvents(),e.fire("interact",{tmpl:t},1),i(e.init,r,e),e.fire("inited",0,1),i(e.render,s,e);var c=!t&&!e.rendered;c&&(e.rendered=!0,e.fire("primed",null,1))}};t&&!o?e.fetchTmpl(c):c()},beginUpdate:function(){var e=this;e.sign&&e.rendered&&(e.fire("refresh",0,1),e.fire("prerender"))},endUpdate:function(){var e=this;e.sign&&(e.rendered||e.fire("primed",0,1),e.rendered=!0,e.fire("rendered"))},notifyUpdate:function(){var e=this;return e.sign&&(e.sign++,e.fire("rendercall")),e.sign},wrapMxEvent:function(e){return(e+"").replace(l,"$&"+this.id+d)},setViewHTML:function(e){var t,r=this;r.beginUpdate(),r.sign&&(t=r.$(r.id),t&&(t.innerHTML=e)),r.endUpdate()},observeLocation:function(e){var r,n=this;n.$ol||(n.$ol={keys:[]}),r=n.$ol;var i=r.keys;t.isObject(e)&&(r.pn=e.pathname,e=e.keys),e&&(r.keys=i.concat((e+"").split(o))),n.locationChange==c&&(n.locationChange=g)},olChanged:function(e){var t=this,r=t.$ol;if(r){var n=0;if(r.pn&&(n=e.isPathname()),!n){var i=r.keys;n=e.isParam(i)}return n}return 1},destroy:function(){var e=this;e.sign>0&&(e.sign=0),e.sign--,e.fire("refresh",0,1),e.fire("destroy",0,1,1),e.delegateEvents(1)},processEvent:function(e){var t=this;if(t.enableEvent&&t.sign){var r=e.info,n=e.se,a=h.get(r);a||(a=r.match(x),a={n:a[1],f:a[2],i:a[3],p:{}},a.i&&a.i.replace(y,function(e,t,r){a.p[t]=r}),h.set(r,a));var o=a.n+d+n.type,s=t[o];if(s){var c=p[a.f];c&&c.call(p,n),i(s,f({currentId:e.cId,targetId:e.tId,type:e.st,domEvent:n,params:a.p},p),t)}}},delegateEvents:function(e){var t=this,r=t.$evts,i=e?n.un:n.on,a=t.vom;for(var o in r)i.call(n,o,a)}});var C,E="?t="+Date.now(),M={},T={};return b.prototype.fetchTmpl=function(e){var t=this,r="template"in t;if(r)e(t.template);else if(a(M,t.path))e(M[t.path]);else{var n=t.path.indexOf("/");if(!C){var o=t.path.substring(0,n);C=seajs.data.paths[o]}var s=t.path.substring(n+1),c=C+s+".html",f=T[c],u=function(r){e(M[t.path]=r)};f?f.push(u):(f=T[c]=[u],$.ajax({url:c+E,success:function(e){i(f,e),delete T[c]},error:function(e,t){i(f,t),delete T[c]}}))}},b.extend=function(e,r,n){var a=this,o=function(){o.superclass.constructor.apply(this,arguments),r&&i(r,arguments,this)};return o.extend=a.extend,t.extend(o,a,e,n)},b}),define("magix/vom",["magix/vframe","magix/magix","magix/event"],function(e){var t=e("magix/vframe"),r=e("magix/magix"),n=e("magix/event"),i=r.has,a=r.mix,o=0,s=0,c=0,f=0,u={},m={},v=r.mix({all:function(){return u},add:function(e){i(u,e.id)||(o++,u[e.id]=e,e.owner=v,v.fire("add",{vframe:e}))},get:function(e){return u[e]},remove:function(e){var t=u[e];t&&(o--,t.fcc&&s--,delete u[e],v.fire("remove",{vframe:t}))},vfCreated:function(){if(!f){s++;var e=s/o;e>c&&v.fire("progress",{percent:c=e},f=1==e)}},root:function(){return t.root(v,m)},locChged:function(e){var t,r=e.loc;if(r?t=1:r=e.location,a(m,r),!t){var n=v.root(),i=e.changed;i.isView()?n.mountView(r.view):n.locChged(r,i)}}},n);return v}),define("mxext/mmanager",["magix/magix"],function(e){var t=e("magix/magix"),r=t.has,n=t.safeExec,i=t.mix,a=t.isFunction,o=function(e){var r=this;r.$mClass=e,r.$mCache=t.cache(),r.$mCacheKeys={},r.$mMetas={}},s=[].slice,c={urlParams:1,postParams:1,cacheKey:1,cacheTime:1,before:1,after:1},f=function(e,t,r){return function(){return e.apply(t,[t,r].concat(s.call(arguments)))}},u=function(e){return e&&e.mxViewCtor&&e.manage},m=function(e,t,r){var i=r.key,a=r.cKeys,o=a[i];if(o){var s=o.q;delete a[i],n(s,e)}},v=function(e){return function(){var t=new p(this),r=arguments,n=r[r.length-1];return u(n)&&(n.manage(t),r=s.call(r,0,-1)),t[e].apply(t,r)}},h=function(e,t){return function(r,n){var i=s.call(arguments,1);return this.send(r,i.length>1?i:n,e,t)}};i(o,{create:function(e){if(!e)throw Error("ungiven modelClass");return new o(e)}});var l={ALL:1,ONE:2,ORDER:4},d=Date.now||function(){return+new Date},g=d(),p=function(e){this.$host=e,this.$doTask=!1,this.$reqModels={},this.id="mr"+g--};return i(p.prototype,{send:function(e,i,a,o){var s=this;if(s.$doTask)return s.next(function(){this.send(e,i,a,o)}),s;s.$doTask=!0;var c=s.$host,u=c.$mCache,v=c.$mCacheKeys,h=s.$reqModels;t.isArray(e)||(e=[e]);var g,p,x,y=e.length,w=0,b=Array(y),$=[],C={},E=[],M=t.isArray(i);M&&($=Array(i.length));for(var T,O=function(e,t,r){if(!s.$destroy){w++,delete h[e.id];var o=e.$mm,c=o.cacheKey;if(b[t]=e,r)g=!0,x=!0,p=r,C.msg=r,C[t]=r;else{if(x=!1,!c||c&&!u.has(c)){c&&u.set(c,e),o.doneAt=d();var f=o.after,m=o.meta;f&&n(f,[e,m])}!e.fromCache&&o.used>0&&(e.fromCache=!0),o.used++}if(a==l.ONE){var v=M?i[t]:i;v&&($[t]=n(v,[x?C:null,e,C],s))}else if(a==l.ORDER){E[t]={m:e,e:x,s:r};for(var T,O,P=E.i||0;T=E[P];P++)O=M?i[P]:i,T.e&&(C.msg=T.s,C[P]=T.s),$[P]=n(O,[T.e?C:null,T.m,C].concat($),s);E.i=P}w>=y&&(g||(C=null),a==l.ALL?(b.unshift(C),$[0]=C,$[1]=n(i,b,s)):$.unshift(C),s.$ntId=setTimeout(function(){s.doNext($)},30))}},P=0;e.length>P;P++){if(T=e[P],!T)throw Error("miss attrs:"+e);var V=c.getModel(T,o),k=V.cKey,A=V.entity,j=f(O,A,P);j.id=s.id,k&&r(v,k)?v[k].q.push(j):V.update?(h[A.id]=A,k&&(v[k]={q:[j],e:A},j=m),A.request(j,{key:k,cKeys:v})):j()}return s},fetchAll:function(e,t){return this.send(e,t,l.ALL)},saveAll:function(e,t){return this.send(e,t,l.ALL,1)},fetchOrder:h(l.ORDER),saveOrder:h(l.ORDER,1),saveOne:h(l.ONE,1),fetchOne:h(l.ONE),abort:function(){var e=this;clearTimeout(e.$ntId);var t=e.$host,i=e.$reqModels,a=t.$mCacheKeys;for(var o in i){var s=i[o],c=s.$mm.cacheKey;if(c&&r(a,c)){for(var f,u=a[c],m=u.q,v=[],h=[],l=0;m.length>l;l++)f=m[l],f.id!=e.id?v.push(f):e.$destroy||h.push(f);n(h,["abort"],e),v.length?u.q=v:s.abort()}else s.abort()}e.$reqModels={},e.$queue=[],e.$doTask=!1},next:function(e){var t=this;if(t.$queue||(t.$queue=[]),t.$queue.push(e),!t.$doTask){var r=t.$latest;t.doNext(r)}return t},doNext:function(e){var t=this;t.$doTask=!1;var r=t.$queue;if(r){var i=r.shift();i&&n(i,e,t)}t.$latest=e},destroy:function(){var e=this;e.$destroy=!0,e.abort()}}),i(o.prototype,{registerModels:function(e){var r=this,n=r.$mMetas;t.isArray(e)||(e=[e]);for(var i,a,o=0;e.length>o;o++){if(i=e[o],a=i.name,i&&!a)throw Error("miss name attribute");if(n[a])throw Error("already exist:"+a);n[a]=i}},registerMethods:function(e){var t=this;i(t,e)},createModel:function(e){var t=this,r=t.getModelMeta(e),i=new t.$mClass;i.set(r,c),i.$mm={used:0};var o=e.before||r.before;a(o)&&n(o,[i,r,e]);var s=e.after||r.after;i.$mm.after=s;var f=e.cacheKey||r.cacheKey;return a(f)&&(f=n(f,[r,e])),i.$mm.cacheKey=f,i.$mm.meta=r,i.set(e,c),i.setUrlParams(r.urlParams),i.setPostParams(r.postParams),i.setUrlParams(e.urlParams),i.setPostParams(e.postParams),i},getModelMeta:function(e){var r,n=this,i=n.$mMetas;r=t.isString(e)?e:e.name;var a=i[r];if(!a)throw Error("Unfound:"+r);return a},getModel:function(e,t){var r,n,i=this;return t||(r=i.getCachedModel(e)),r||(n=!0,r=i.createModel(e)),{entity:r,cKey:r.$mm.cacheKey,update:n}},saveAll:v("saveAll"),fetchAll:v("fetchAll"),saveOrder:v("saveOrder"),fetchOrder:v("fetchOrder"),saveOne:v("saveOne"),fetchOne:v("fetchOne"),createMRequest:function(e){var t=new p(this);return u(e)&&e.manage(t),t},clearCacheByKey:function(e){var t=this,r=t.$mCache;r.del(e)},clearCacheByName:function(e){for(var t=this,r=t.$mCache,n=r.c,i=0;n.length>i;i++){var a=n[i],o=a.v,s=o&&o.$mm;if(s){var c=s.meta.name;c==e&&r.del(s.cacheKey)}}},getCachedModel:function(e){var r,i,o=this,s=o.$mCache,c=null;if(t.isString(e)?r=e:(i=o.getModelMeta(e),r=e.cacheKey||i.cacheKey,a(r)&&(r=n(r,[i,e]))),r){var f=o.$mCacheKeys,u=f[r];if(u)c=u.e;else if(c=s.get(r)){i||(i=c.$mm.meta);var m=e.cacheTime||i.cacheTime||0;a(m)&&(m=n(m,[i,e])),m>0&&d()-c.$mm.doneAt>m&&(o.clearCacheByKey(r),c=null)}}return c}}),o}),define("mxext/model",["magix/magix"],function(e){var t=e("magix/magix"),r=function(e,r){var n=this,i=function(){i.superclass.constructor.apply(this,arguments),r&&t.safeExec(r,arguments,this)};return t.mix(i,n,{prototype:!0}),t.extend(i,n,e)},n=+new Date,i=function(e){e&&this.set(e),this.id="m"+n--},a=encodeURIComponent;return t.mix(i,{GET:"GET",POST:"POST",extend:r}),t.mix(i.prototype,{sync:t.noop,parse:function(e){return e},getPostParams:function(){return this.getParams(i.POST)},getUrlParams:function(){return this.getParams(i.GET)},getParams:function(e){var r=this;e=e?e.toUpperCase():i.GET;var n,o="$"+e,s=r[o],c=[];if(s)for(var f in s)if(n=s[f],t.isArray(n))for(var u=0;n.length>u;u++)c.push(f+"="+a(n[u]));else c.push(f+"="+a(n));return c.join("&")},setUrlParamsIf:function(e,t){this.setParams(e,t,i.GET,!0)},setPostParamsIf:function(e,t){var r=this;r.setParams(e,t,i.POST,!0)},setParams:function(e,r,n,a){n=n?n.toUpperCase():i.GET;var o=this;o.$types||(o.$types={}),o.$types[n]=!0;var s="$"+n;if(o[s]||(o[s]={}),t.isObject(e))for(var c in e)a&&o[s][c]||(o[s][c]=e[c]);else e&&(a&&o[s][e]||(o[s][e]=r))},setPostParams:function(e,t){var r=this;r.setParams(e,t,i.POST)},setUrlParams:function(e,t){this.setParams(e,t,i.GET)},reset:function(){var e=this,r=e.$types;if(r){for(var n in r)t.has(r,n)&&delete e["$"+n];delete e.$types}var i=e.$keys,a=e.$attrs;if(i){for(var o=0;i.length>o;o++)delete a[i[o]];delete e.$keys}},get:function(e){var t=this,r=!arguments.length,n=t.$attrs;return n?r?n:n[e]:null},set:function(e,r,n){var i=this;if(i.$attrs||(i.$attrs={}),n&&!i.$keys&&(i.$keys=[]),t.isObject(e)){t.isObject(r)||(r={});for(var a in e)n&&i.$keys.push(a),t.has(r,a)||(i.$attrs[a]=e[a])}else e&&(n&&i.$keys.push(e),i.$attrs[e]=r)},request:function(e,r){e||(e=function(){});var n=this;n.$abort=!1;var i=function(i,a){if(n.$abort)e("abort",null,r);else if(i)e(i,a,r);else{if(a){var o=n.parse(a);t.isObject(o)||(o={data:o}),n.set(o,null,!0)}e(i,a,r)}};n.$trans=n.sync(i,r)},abort:function(){var e=this,t=e.$trans;t&&t.abort&&t.abort(),delete e.$trans,e.$abort=!0},isAborted:function(){return this.$abort}}),i}),define("mxext/view",["magix/magix","magix/view","magix/router"],function(e){var t=e("magix/magix"),r=e("magix/view"),n=e("magix/router"),i=window,a=t.mix,o=function(e){i.clearTimeout(e),i.clearInterval(e)},s=function(e){f(e.destroy,[],e)},c=0,f=t.safeExec,u=t.has,m=r.extend({navigate:function(){n.navigate.apply(n,arguments)},manage:function(e,r){var n=this,i=arguments,a=!0;1==i.length&&(r=e,e="res_"+c++,a=!1),n.$res||(n.$res={});var f;t.isNumber(r)?f=o:r&&r.destroy&&(f=s);var u={hasKey:a,res:r,sign:n.sign,destroy:f};return n.$res[e]=u,r},getManaged:function(e){var t=this,r=t.$res;if(r&&u(r,e)){var n=r[e],i=n.res;return i}return null},removeManaged:function(e){var t=this,r=null,n=t.$res;return n&&u(n,e)&&(r=n[e].res,delete n[e]),r},destroyManaged:function(){var e=this,t=e.$res;if(t)for(var r in t){var n=t[r];if(n.sign!=e.sign){var i=n.res,a=n.destroy,o=!1;a&&(a(i),o=!0),n.hasKey||delete t[r],e.fire("destroyManaged",{resource:i,processed:o})}}},destroyMRequest:function(){var e=this,t=e.$res;if(t)for(var r in t){var n=t[r],i=n.res;i&&i.fetchOne&&i.fetchAll&&(i.destroy(),delete t[r])}}},function(){var e=this;e.on("interact",function(){e.on("rendercall",e.destroyMRequest),e.on("prerender",e.destroyManaged),e.on("destroy",e.destroyManaged)}),f(m.ms,arguments,e)},{ms:[],mixin:function(e,t){m.ms.push(t),a(m.prototype,e)}});return m}),document.createElement("vframe");