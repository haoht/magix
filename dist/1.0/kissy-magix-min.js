KISSY.add("magix/body",function(g,f,a,b){var c=a.has,g=a.mix,d=a.listToMap("submit,focusin,focusout,mouseenter,mouseleave,mousewheel,change"),o=document.body,i={},n={},p=65536,k=function(a,b,c){c?a.setAttribute(b,c):c=a.getAttribute(b);return c},b=g({processEvent:function(a){for(var b=a.target||a.srcElement;b&&1!=b.nodeType;)b=b.parentNode;var i=b,d=a.type,h=n[d]||(n[d]=RegExp("(?:^|,)"+d+"(?:,|$)"));if(!h.test(k(b,"mx-ie"))){for(var u="mx-"+d,m,t,e=[];i&&i!=o&&!(m=k(i,u),t=k(i,"mx-ie"),m||h.test(t));)e.push(i),
i=i.parentNode;if(m){d=k(i,"mx-owner");if(!d){h=i;for(t=this.VOM.all();h&&h!=o;)if(c(t,h.id)){k(i,"mx-owner",d=h.id);break}else h=h.parentNode}if(d)this.fire("event",{info:m,se:a,tId:b.id||(b.id="mx-e-"+p--),cId:i.id||(i.id="mx-e-"+p--),hld:d});else throw Error("miss mx-owner:"+m);}else for(;e.length;)a=e.shift(),t=k(a,"mx-ie"),h.test(t)||(t=t?t+","+d:d,k(a,"mx-ie",t))}},attachEvent:function(a){var b=this;if(i[a])i[a]++;else if(i[a]=1,d[a])b.onUnbubble(o,a);else o["on"+a]=function(a){(a=a||window.event)&&
b.processEvent(a)}},detachEvent:function(a){var b=i[a];0<b&&(b--,b||(d[a]?this.offUnbubble(o,a):o["on"+a]=null),i[a]=b)}},b);return a.mix(b,f)},{requires:["magix/impl/body","magix/magix","magix/event"]});
KISSY.add("magix/event",function(g,f){var a=f.safeExec;return{fire:function(b,c,d,g){var i="~"+b,n=this[i];if(n){c||(c={});if(!c.type)c.type=b;for(var b=n.length,f=b-1,k,q;b--;)k=g?b:f-b,q=n[k],q.d&&(n.splice(k,1),f--),a(q,c,this)}d&&delete this[i]},on:function(a,c,d){a="~"+a;this[a]||(this[a]=[]);f.isNumeric(d)?this[a].splice(d,0,c):(c.d=d,this[a].push(c))},un:function(a,c){f.isArray(a)||(a=[a]);for(var d=0,g=a.length;d<g;d++){var i="~"+a[d],n=this[i];if(n)if(c)for(var i=0,p=n.length;i<p;i++){if(n[i]==
c){n.splice(i,1);break}}else delete this[i]}}}},{requires:["magix/magix"]});KISSY.add("magix/impl/body",function(g,f){var a={};return{onUnbubble:function(b,c){var d=this;f.delegate(b,c,"*[mx-"+c+"]",a[c]=function(a){d.processEvent(a)})},offUnbubble:function(b,c){f.undelegate(b,c,"*[mx-"+c+"]",a[c]);delete a[c]}}},{requires:["event"]});
KISSY.add("magix/impl/magix",function(g,f){f=[].slice;return{libRequire:function(a,b){if(a){var c=this.isFunction(b),d=this.isArray(a);g.use(d?a.join(","):a,c?function(a){b.apply(a,f.call(arguments,1))}:this.noop)}else b()},libEnv:function(a){var b=a.appHome,c=location,d=c.protocol,f=a.appName;~b.indexOf(d)||(b=this.path(c.href,b));g.endsWith(b,"/")||(b+="/");a.appHome=b;var i=a.debug;i&&(i=0==b.indexOf(d+"//"+c.host));"~"==f.charAt(0)&&g.config({map:[[RegExp("/"+f+"/"),"/"]]});c="";(c=i?g.now():
a.appTag)&&(c+=".js");d=a.appCombine;g.isUndefined(d)&&(d=g.config("combine"));g.config({packages:[{name:f,path:b,debug:a.debug=i,combine:d,tag:c}]})},isArray:g.isArray,isFunction:g.isFunction,isObject:g.isObject,isRegExp:g.isRegExp,isString:g.isString,isNumber:g.isNumber}});
KISSY.add("magix/impl/router",function(g,f){var a=window;return{useState:function(){var b=this,c=location.href;f.on(a,"popstate",function(){var a=location.href==c;if(b.$firedPop||!a)b.$firedPop=!0,b.route()})},useHash:function(){var b=this;f.on(a,"hashchange",function(){b.route()})}}},{requires:["event"]});
KISSY.add("magix/impl/view",function(g,f,a){var b=function(){},c=g.Env.mods,d={wrapAsyn:1,extend:1},o=function(b,c,d){for(var k in c)g.isObject(c[k])?(a.has(b,k)||(b[k]={}),o(b[k],c[k],!0)):d&&(b[k]=c[k])};b.extend=function(c,d){var f=function(){f.superclass.constructor.apply(this,arguments);d&&a.safeExec(d,arguments,this)};f.extend=b.extend;return g.extend(f,this,c)};b.prepare=function(b,f){if(!b.wrapAsyn){for(var g in this)a.has(d,g)&&(b[g]=this[g]);g=b.prototype;for(var k=b;k.superclass;)k=k.superclass.constructor,
o(g,k.prototype);f.home=c[f.path].packageInfo.getBase();a.mix(g,f)}b.wrapAsyn()};a.mix(b.prototype,{fetchTmpl:function(a,b,c){f({url:a+(c?"?_="+g.now():""),success:b,error:function(a,c){b(c)}})}});return b},{requires:["ajax","magix/magix"]});
KISSY.add("magix/magix",function(g,f){var a=/\/\.\/|\/[^\/]+?\/\.{2}\/|([^:\/])\/\/+/,b=/[^\/]*$/,c=/[#?].*$/,d=/([^=&?\/#]+)=([^&=#?]*)/g,o=/^https?:\/\//i,i={},n=0,p={},k={debug:false,iniFile:"~/ini",appName:"app",appHome:"./",tagName:"vframe",rootId:"magix_vf_root"},q=p.hasOwnProperty,l=function(a){return function(e,b,c){switch(arguments.length){case 0:c=a;break;case 1:c=v.isObject(e)?u(a,e):h(a,e)?a[e]:null;break;case 2:null===b?(delete a[e],c=b):a[e]=c=b}return c}},r=function(a){this.c=[];
this.x=a||20;this.b=this.x+5},s=function(a){return new r(a)},h=function(a,e){return a?q.call(a,e):0},u=function(a,e,b){for(var c in e)if(!0===b)a[c]=e[c];else if(h(e,c)&&(!b||!h(b,c)))a[c]=e[c];return a};u(r.prototype,{get:function(a){var e=this.c,b,a="pathname"+a;if(h(e,a)&&(b=e[a],1<=b.f))b.f++,b.t=n++,b=b.v;return b},set:function(a,e){var b=this.c,a="pathname"+a,c=b[a];if(!h(b,a)){if(b.length>=this.b){b.sort(function(a,e){return e.f==a.f?e.t-a.t:e.f-a.f});for(var d=this.b-this.x;d--;)c=b.pop(),
delete b[c.k]}c={};b.push(c);b[a]=c}c.k=a;c.v=e;c.f=1;c.t=n++;return c},del:function(a){var a="pathname"+a,e=this.c,b=e[a];if(b)b.f=-1E5,delete e[a]}});var m=s(60),t=s(),e=function(a,e,b,c,h,d){v.isArray(a)||(a=[a]);if(!e||!v.isArray(e)&&!e.callee)e=[e];for(c=0;c<a.length;c++)try{d=a[c],h=v.isFunction(d)&&d.apply(b,e)}catch(j){}return h},j=function(){},v={isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},mix:u,has:h,safeExec:e,noop:j,config:l(k),start:function(a){var b=this,a=u(k,a);
b.libEnv(a);var c=a.iniFile.replace("~",a.appName);b.libRequire(c,function(e){k=u(a,e,a);var c=a.progress;b.libRequire(["magix/router","magix/vom"],function(e,h){e.on("changed",function(a){a.loc?h.locationUpdated(a.loc):a.changed.isView()?h.remountRoot(a):h.locationChanged(a)});h.on("progress",c||j);b.libRequire(a.extensions,function(){e.start()})})});a.ready&&(e(a.ready),delete a.ready)},keys:Object.keys||function(a){var e=[],b;for(b in a)h(a,b)&&e.push(b);return e},local:l(p),path:function(e,h){var d=
e+"\n"+h,j=t.get(d);if(!j){e=e.replace(c,"").replace(b,"");"/"==h.charAt(0)?(j=e.indexOf("://"),-1==j?j=h:(j=e.indexOf("/",j+3),j=-1==j?e+h:e.substring(0,j)+h)):j=e+h;for(;a.test(j);)j=j.replace(a,"$1/");t.set(d,j)}return j},pathToObject:function(a,e){var b=m.get(a);if(!b){var b={},h={},j="";c.test(a)?j=a.replace(c,""):~a.indexOf("=")||(j=a);if(j&&o.test(j))var f=j.indexOf("/",8),j=-1==f?"/":j.substring(f);a.replace(d,function(a,b,c){if(e)try{c=decodeURIComponent(c)}catch(j){}h[b]=c});b.pathname=
j;b.params=h;m.set(a,b)}return b},objectToPath:function(a,e){var b=a.pathname,c=[],h=a.params,j,d;for(d in h)j=h[d],e&&encodeURIComponent(j),c.push(d+"="+j);return b+(b&&c.length?"?":"")+c.join("&")},tmpl:function(a,e){return 1==arguments.length?i[a]:i[a]=e},listToMap:function(a,e){var b,c,h={},j;this.isString(a)&&(a=a.split(","));if(a&&(j=a.length))for(b=0;b<j;b++)c=a[b],h[e?c[e]:c]=e?c:1;return h},createCache:s};return v.mix(v,f)},{requires:["magix/impl/magix"]});
KISSY.add("magix/router",function(g,f,a,b){var c=window,d=a.has,o=a.mix,i=document,n=/^UTF-8$/i.test(i.charset||i.characterSet||"UTF-8"),p=a.config(),k=a.createCache(),q=a.createCache(),l,r,s,h=65536,u=/#.*$/,m=/^[^#]*#?!?/,t=p.nativeHistory,e,j,v=function(e,b,c){if(e){c=this.params;a.isArray(e)||(e=e.split(","));for(var h=0;h<e.length&&!(b=d(c,e[h]));h++);}return b},w=function(){return d(this,"pathname")},x=function(){return d(this,"view")},y=function(){return this.hash.pathname!=this.query.pathname},
z=function(a){return this.hash.params[a]!=this.query.params[a]},C=function(a){return d(this.hash.params,a)},A=function(a){return d(this.query.params,a)},B=function(a){return this.params[a]},g=o({getView:function(e){if(!s){s={routes:p.routes||{},e404:p.notFoundView};var b=p.defaultView;if(!b)throw Error("unset defaultView");s.home=b;var c=p.defaultPathname||"";s.routes[c]=b;s.pathname=c}e||(e=s.pathname);b=s.routes;b=a.isFunction(b)?b.call(p,e):b[e];return{view:b?b:s.e404||s.home,pathname:b?e:s.e404?
e:s.pathname}},start:function(){var a=c.history;e=t&&a.pushState;j=t&&!e;e?this.useState():this.useHash();this.route()},parsePath:function(e){var e=a.pathToObject(e,n),b=e.pathname;b&&"/"!=b.charAt(0)&&j&&(e.pathname=a.path(c.location.pathname,b));return e},parseQH:function(a){var a=a||c.location.href,e=k.get(a);if(!e){var e=a.replace(u,""),b=a.replace(m,""),h=this.parsePath(e),j=this.parsePath(b),d={};o(d,h.params);o(d,j.params);e={pathnameDiff:y,paramDiff:z,hashOwn:C,queryOwn:A,get:B,href:a,srcQuery:e,
srcHash:b,query:h,hash:j,params:d};k.set(a,e)}return e},parseLoc:function(a){a=this.parseQH(a);if(!a.view){var e=this.getView(t?a.hash.pathname||a.query.pathname:a.hash.pathname);o(a,e)}return a},getChged:function(a,e){var b=e.href,c=a.href+"\n"+b,h=q.get(c);h||(c=b+"\n"+c,h=q.get(c));if(!h){var j,h={params:{}};if(a.pathname!=e.pathname)j=h.pathname=1;if(a.view!=e.view)j=h.view=1;var b=a.params,d=e.params,m;for(m in b)b[m]!=d[m]&&(j=1,h.params[m]=1);for(m in d)b[m]!=d[m]&&(j=1,h.params[m]=1);h.occur=
j;h.isParam=v;h.isPathname=w;h.isView=x;q.set(c,h)}return h},route:function(){var a=this.parseLoc(),e=r||{params:{},href:"~"},b=!r;r=a;e=this.getChged(e,a);e.occur&&(l=a,this.fire("changed",{location:a,changed:e,firstFire:b}))},navigate2:function(b){if(b&&a.isString(b)){var c=this.parsePath(b),b={};b.params=o({},c.params);b.pathname=c.pathname;if(b.pathname){if(j&&(c=l.query)&&(c=c.params))for(var m in c)d(c,m)&&!d(b.params,m)&&(b.params[m]="")}else m=o({},l.params),b.params=o(m,b.params),b.pathname=
l.pathname;m=a.objectToPath(b);if(e?m!=l.srcQuery:m!=l.srcHash)e?(this.$firedPop=1,history.pushState(h--,i.title,m),this.route()):(o(b,l,b),b.srcHash=m,b.hash={params:b.params,pathname:b.pathname},this.fire("changed",{loc:l=b}),location.hash="#!"+m)}},navigate:function(e,b){!b&&a.isObject(e)&&(b=e,e="");b&&(e=a.objectToPath({params:b,pathname:e},n));this.navigate2(e)}},b);return a.mix(g,f)},{requires:["magix/impl/router","magix/magix","magix/event"]});
KISSY.add("magix/vframe",function(g,f,a,b){var c=document,d=65536,o=window.CollectGarbage||f.noop,i=f.mix,g=f.config(),n=g.tagName,p=g.rootId,k=f.has,q,l=function(a){return"object"==typeof a?a:c.getElementById(a)};c.createElement(n);var r=/<script[^>]*>[\s\S]*?<\/script>/ig,s=function(a){this.id=a;this.vId=a+"_v";this.cS={};this.rC=this.cC=0;this.sign=-2147483648;this.rM={}};i(s,{root:function(a){if(!q){var b=l(p);if(!b)b=c.createElement(n),b.id=p,c.body.insertBefore(b,c.body.firstChild);q=new s(p);
a.add(q)}return q}});i(i(s.prototype,a),{useAnimUpdate:f.noop,oldViewDestroy:f.noop,prepareNextView:f.noop,newViewCreated:f.noop,mountView:function(a,c){var d=this,g=l(d.id);g._bak?g._chgd=1:(g._bak=1,g._tmpl=g.innerHTML.replace(r,""));var e=d.vN&&d.useAnimUpdate();d.unmountView(e,1);if(a){var j=f.pathToObject(a),v=j.pathname,k=--d.sign;f.libRequire(v,function(a){if(k==d.sign){var h=d.owner;b.prepare(a,{$:l,path:v,vom:h});var f;e?(f=d.vId,d.prepareNextView()):f=d.id;var r=new a({owner:d,id:f,vId:d.vId,
vfId:d.id,location:h.getLocation()});d.view=r;r.on("interact",function(a){d.fire("viewInteract",{view:r});d.viewUsable=1;e&&d.newViewCreated(1);if(!a.tmpl){if(!e&&g._chgd)g.innerHTML=g._tmpl;d.mountZoneVframes(0,0,1)}r.on("rendered",function(){d.mountZoneVframes(0,0,1)});r.on("prerender",function(a){d.unmountZoneVframes(0,a.anim)})},0);r.load(i(j.params,c,!0))}})}},unmountView:function(a,b){if(this.view){this.childrenAlter();this.unmountZoneVframes(0,a);this.fire("viewUnmount");this.view.destroy();
var c=l(this.id);if(!a&&c._bak)c.innerHTML=c._tmpl;a&&b&&this.oldViewDestroy();delete this.view;delete this.viewUsable;o()}this.un("viewInteract");this.sign--},mountVframe:function(a,b,c,d){var e=this.owner,j=e.get(a);if(!j)j=new s(a),j.pId=this.id,k(this.cS,a)||this.cC++,this.cS[a]=d,e.add(j);j.mountView(b,c);return j},mountZoneVframes:function(a,b,c){this.unmountZoneVframes(a);var a=a?a:l(this.vId)||l(this.id),a=l(a).getElementsByTagName(n),g=a.length,e={};if(g)for(var j=0,f,i;j<g;j++){f=a[j];i=
f.id||(f.id="magix_vf_"+d--);k(e,i)||this.mountVframe(i,f.getAttribute("mx-view"),b,c);f=l(f).getElementsByTagName(n);i=0;for(var r=f.length;i<r;i++)e[f[i].id||(f[i].id="magix_vf_"+d--)]=1}else this.childrenCreated()},unmountVframe:function(a,b){var c=this.owner,d=c.get(a);d&&(d.unmountView(b),c.remove(a),delete this.cS[a],this.cC--)},unmountZoneVframes:function(a){var b;if(a){b=l(a).getElementsByTagName(n);for(var c={},d=this.cS,e=b.length-1,j;0<=e;e--)j=b[e].id,k(d,j)&&(c[j]=1);b=c}else b=this.cS;
for(var f in b)this.unmountVframe(f);if(!a)this.cS={},this.cC=0},childrenCreated:function(){var a=this.view;if(a&&!this.fcc)this.fcc=1,delete this.fca,a.fire("created"),this.fire("created");a=this.owner;a.childCreated();if(a=a.get(this.pId)){var b=this.id,c=a.rM;k(c,b)||(c[b]=a.cS[b],a.rC++,a.rC==a.cC&&a.childrenCreated())}},childrenAlter:function(){delete this.fcc;var a=this.view,b=this.id;if(a&&!this.fca)this.fca=1,a.fire("alter"),this.fire("alter");if(a=this.owner.get(this.pId)){var b=this.id,
c=a.rM,d=c[b];k(c,b)&&(a.rC--,delete c[b],d&&a.childrenAlter())}},locationChanged:function(a,b){var c=this.view;if(c&&c.sign&&(c.location=a,c.rendered)){var d=c.olChanged(b),e={location:a,changed:b,prevent:function(){this.cs=[]},toChildren:function(a){a=a||[];f.isString(a)&&(a=a.split(","));this.cs=a}};d&&f.safeExec(c.locationChange,e,c);for(var c=e.cs||f.keys(this.cS),d=0,e=c.length,j=this.owner,g;d<e;d++)(g=j.get(c[d]))&&g.locationChanged(a,b)}},locationUpdated:function(a){var b=this.view;if(b&&
b.sign){b.location=a;var b=this.cS,c,d=this.owner,e;for(e in b)(c=d.get(e))&&c.locationUpdated(a)}}});return s},{requires:["magix/magix","magix/event","magix/view"]});
KISSY.add("magix/view",function(g,f,a,b,c){var d=a.safeExec,o=a.has,i=[],n=a.config(),p=/^~[^\/]*/,k=a.mix,q=a.listToMap("render,renderUI"),l=function(a){return function(){var b;this.sign&&(this.sign++,this.fire("rendercall"),b=a.apply(this,arguments));return b}},g=function(a){k(this,a);this.sign=1};k(g,{wrapAsyn:function(){if(!this["~~"]){this["~~"]=1;var b=this.prototype,c,d;for(d in b){c=b[d];var f=null;a.isFunction(c)&&c!=a.noop&&!c["~~"]&&o(q,d)&&(f=l(c),f["~~"]=c,b[d]=f)}}}});var r=g.prototype,
s=window.CollectGarbage||a.noop,h=/\smx-[^ohv][a-z]+\s*=/g,u={prevent:function(a){a=a||this.domEvent;a.preventDefault?a.preventDefault():a.returnValue=!1},stop:function(a){a=a||this.domEvent;a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},halt:function(a){this.prevent(a);this.stop(a)}},m=/(\w+)(?:<(\w+)>)?(?:{([\s\S]*)})?/,t=/(\w+):([^,]+)/g;k(r,b);k(r,{render:a.noop,locationChange:a.noop,init:a.noop,hasTmpl:!0,enableEvent:!0,enableAnim:!1,load:function(){var a=this,b=a.hasTmpl,c=arguments,
f=function(){a.delegateEvents();a.fire("interact",{tmpl:b},1);d(a.init,c,a);d(a.render,i,a);if(!b&&!a.rendered)a.rendered=!0,a.fire("primed",null,1)};if(b&&!a.template){var g=a.sign;a.planTmpl(function(){g==a.sign&&f()})}else f()},updateViewId:function(){this.id=this.$(this.vId)?this.vId:this.vfId},beginUpdateHTML:function(){if(this.sign&&this.rendered){var a=this.enableAnim;this.fire("refresh",0,1);this.fire("prerender",{anim:a});var b=this.owner;a&&(d(b.oldViewDestroy,i,b),d(b.prepareNextView,i,
b),this.updateViewId())}},endUpdateHTML:function(){if(this.sign)this.rendered&&this.enableAnim&&d(owner.newViewCreated,i,owner),this.rendered||this.fire("primed",null,1),this.rendered=!0,this.fire("rendered"),s()},wrapMxEvent:function(a){return a?(""+a).replace(h,' mx-owner="'+this.vfId+'"$&'):a},setViewHTML:function(a){this.beginUpdateHTML();if(this.sign)this.$(this.id).innerHTML=this.wrapMxEvent(a);this.endUpdateHTML()},observeLocation:function(b){var c;if(!this.$ol)this.$ol={keys:[]};c=this.$ol;
var d=c.keys;if(a.isObject(b))c.pn=b.pathname,b=b.keys;if(b)c.keys=d.concat(a.isString(b)?b.split(","):b)},olChanged:function(a){var b=this.$ol;if(b){var c=0;b.pn&&(c=a.isPathname());c||(c=a.isParam(b.keys));return c}return 1},destroy:function(){this.fire("refresh",0,1);this.fire("destroy",0,1,1);this.delegateEvents(1);this.sign=0},parentView:function(){var a=this.vom.get(this.owner.pId),b=null;if(a&&a.viewUsable)b=a.view;return b},planTmpl:function(b){var c=this,d=a.tmpl(c.path);if(void 0===d){var d=
n.debug,f=c.home+c.path.replace(p,"")+".html";c.fetchTmpl(f,function(d){c.template=a.tmpl(c.path,d);b()},d)}else c.template=d,b()},processEvent:function(a){if(this.enableEvent&&this.sign){var b=a.se,c=a.info.match(m),f=c[1],g=c[2],c=c[3],h=this.events;if(h){var i=h[b.type];if(u[g])u[g](b);if(i&&i[f]){var r={};c&&c.replace(t,function(a,b,c){r[b]=c});d(i[f],k({view:this,currentId:a.cId,targetId:a.tId,domEvent:b,events:h,params:r},u),i)}}}},delegateEvents:function(a){var b=this.events,a=a?c.detachEvent:
c.attachEvent,d;for(d in b)a.call(c,d)}});a.mix(g,f,{prototype:!0});a.mix(g.prototype,f.prototype);return g},{requires:["magix/impl/view","magix/magix","magix/event","magix/body"]});
KISSY.add("magix/vom",function(g,f,a,b,c){var d=a.has,o=0,i=0,n=0,p=0,k={},q,l=a.mix({all:function(){return k},add:function(a){if(!d(k,a.id))o++,k[a.id]=a,a.owner=l,l.fire("add",{vframe:a})},get:function(a){return k[a]},remove:function(a){var b=k[a];b&&(o--,b.fcc&&i--,delete k[a],l.fire("remove",{vframe:b}))},childCreated:function(){if(!p){i++;var a=i/o;n<a&&(l.fire("progress",{percent:n=a}),1==a&&(p=1,l.un("progress")))}},root:function(){return f.root(l)},remountRoot:function(a){var b=l.root();q=
a.location;b.mountView(q.view)},locationChanged:function(a){q=a.location;l.root().locationChanged(q,a.changed)},locationUpdated:function(a){q=a;l.root().locationUpdated(a)},getLocation:function(){return q}},b);c.VOM=l;c.on("event",function(a){var b=l.get(a.hld);(b=b&&b.view)&&b.processEvent(a)});return l},{requires:["magix/vframe","magix/magix","magix/event","magix/body"]});
(function(g){var f=function(){};if(!g.console)g.console={log:f,info:f,error:f};var a,b={};if(!g.Magix)g.Magix={config:function(a){for(var d in a)b[d]=a[d]},start:function(b){a=b}},KISSY.use("magix/magix",function(c,d){g.Magix=d;d.config(b);a&&d.start(a)})})(this);