!function(){var SNAPP_VERSION_LABEL="1.0.2",require,define;!function(){function e(e){var n=e.factory,t=function(n){var t=n;return"."===n.charAt(0)&&(t=e.id.slice(0,e.id.lastIndexOf(o))+o+n.slice(2)),require(t)};return e.exports={},delete e.factory,n(t,e.exports,e),e.exports}var n={},t=[],r={},o=".";require=function(o){if(!n[o])throw"module "+o+" not found";if(o in r){var i=t.slice(r[o]).join("->")+"->"+o;throw"Cycle in require graph: "+i}if(n[o].factory)try{return r[o]=t.length,t.push(o),e(n[o])}finally{delete r[o],t.pop()}return n[o].exports},define=function(e,t){if(n[e])throw"module "+e+" already defined";n[e]={id:e,factory:t}},define.remove=function(e){delete n[e]},define.moduleMap=n}(),"object"==typeof module&&"function"==typeof require&&(module.exports.require=require,module.exports.define=define),define("snapp",function(e,n,t){function r(e,n){var t=document.createEvent("Events");if(t.initEvent(e,!1,!1),n)for(var r in n)n.hasOwnProperty(r)&&(t[r]=n[r]);return t}var o=e("snapp/channel"),i=e("snapp/platform"),a=document.addEventListener,s=document.removeEventListener,c=window.addEventListener,d=window.removeEventListener,l={},u={};document.addEventListener=function(e,n,t){var r=e.toLowerCase();"undefined"!=typeof l[r]?l[r].subscribe(n):a.call(document,e,n,t)},window.addEventListener=function(e,n,t){var r=e.toLowerCase();"undefined"!=typeof u[r]?u[r].subscribe(n):c.call(window,e,n,t)},document.removeEventListener=function(e,n,t){var r=e.toLowerCase();"undefined"!=typeof l[r]?l[r].unsubscribe(n):s.call(document,e,n,t)},window.removeEventListener=function(e,n,t){var r=e.toLowerCase();"undefined"!=typeof u[r]?u[r].unsubscribe(n):d.call(window,e,n,t)};var p={define:define,require:e,version:SNAPP_VERSION_LABEL,platformVersion:SNAPP_VERSION_LABEL,platformId:i.id,addWindowEventHandler:function(e){return u[e]=o.create(e)},addStickyDocumentEventHandler:function(e){return l[e]=o.createSticky(e)},addDocumentEventHandler:function(e){return l[e]=o.create(e)},removeWindowEventHandler:function(e){delete u[e]},removeDocumentEventHandler:function(e){delete l[e]},getOriginalHandlers:function(){return{document:{addEventListener:a,removeEventListener:s},window:{addEventListener:c,removeEventListener:d}}},fireDocumentEvent:function(e,n,t){var o=r(e,n);"undefined"!=typeof l[e]?t?l[e].fire(o):setTimeout(function(){"deviceready"==e&&document.dispatchEvent(o),l[e].fire(o)},0):document.dispatchEvent(o)},fireWindowEvent:function(e,n){var t=r(e,n);"undefined"!=typeof u[e]?setTimeout(function(){u[e].fire(t)},0):window.dispatchEvent(t)},callbackId:Math.floor(2e9*Math.random()),callbacks:{},callbackStatus:{NO_RESULT:0,OK:1,CLASS_NOT_FOUND_EXCEPTION:2,ILLEGAL_ACCESS_EXCEPTION:3,INSTANTIATION_EXCEPTION:4,MALFORMED_URL_EXCEPTION:5,IO_EXCEPTION:6,INVALID_ACTION:7,JSON_EXCEPTION:8,ERROR:9},callbackSuccess:function(e,n){try{p.callbackFromNative(e,!0,n.status,[n.message],n.keepCallback)}catch(t){console.log("Error in success callback: "+e+" = "+t)}},callbackError:function(e,n){try{p.callbackFromNative(e,!1,n.status,[n.message],n.keepCallback)}catch(t){console.log("Error in error callback: "+e+" = "+t)}},callbackFromNative:function(e,n,t,r,o){var i=p.callbacks[e];i&&(n&&t==p.callbackStatus.OK?(console.log(r),i.success&&i.success.apply(null,r)):n||i.fail&&i.fail.apply(null,r),o||delete p.callbacks[e])},addConstructor:function(e){o.onSnappReady.subscribe(function(){try{e()}catch(n){console.log("Failed to run constructor: "+n)}})}};t.exports=p}),define("snapp/android/nativeapiprovider",function(e,n,t){var r=this._snegappNative||e("snapp/android/promptbasednativeapi"),o=r;t.exports={get:function(){return o},setPreferPrompt:function(n){o=n?e("snapp/android/promptbasednativeapi"):r},set:function(e){o=e}}}),define("snapp/android/promptbasednativeapi",function(e,n,t){var r=e("snapp/utils");t.exports={exec:function(e,n,t,o,i){var a=r.prompt(i,"snapp:"+JSON.stringify([e,n,t,o]));return console.log(i),console.log(a),a},setNativeToJsBridgeMode:function(e,n){r.prompt(n,"snapp_bridge_mode:"+e)},retrieveJsMessages:function(e,n){return console.log("snapp_poll:"+e),r.prompt(+n,"snapp_poll:"+e)}}}),define("snapp/argscheck",function(e,n,t){function r(e,n){return/.*?\((.*?)\)/.exec(e)[1].split(", ")[n]}function o(e,n,t,o){if(s.enableChecks){for(var i,d=null,l=0;l<e.length;++l){var u=e.charAt(l),p=u.toUpperCase(),f=t[l];if("*"!=u&&(i=a.typeName(f),(null!==f&&void 0!==f||u!=p)&&i!=c[p])){d="Expected "+c[p];break}}if(d)throw d+=", but got "+i+".",d='Wrong type for parameter "'+r(o||t.callee,l)+'" of '+n+": "+d,"undefined"==typeof jasmine&&console.error(d),TypeError(d)}}function i(e,n){return void 0===e?n:e}var a=(e("snapp/exec"),e("snapp/utils")),s=t.exports,c={A:"Array",D:"Date",N:"Number",S:"String",F:"Function",O:"Object"};s.checkArgs=o,s.getValue=i,s.enableChecks=!0}),define("snapp/base64",function(e,n,t){function r(e){for(var n,t=e.byteLength,r="",o=s(),i=0;t-2>i;i+=3)n=(e[i]<<16)+(e[i+1]<<8)+e[i+2],r+=o[n>>12],r+=o[4095&n];return t-i==2?(n=(e[i]<<16)+(e[i+1]<<8),r+=o[n>>12],r+=a[(4095&n)>>6],r+="="):t-i==1&&(n=e[i]<<16,r+=o[n>>12],r+="=="),r}var o=n;o.fromArrayBuffer=function(e){var n=new Uint8Array(e);return r(n)},o.toArrayBuffer=function(e){for(var n="undefined"!=typeof atob?atob(e):new Buffer(e,"base64").toString("binary"),t=new ArrayBuffer(n.length),r=new Uint8Array(t),o=0,i=n.length;i>o;o++)r[o]=n.charCodeAt(o);return t};var i,a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=function(){i=[];for(var e=0;64>e;e++)for(var n=0;64>n;n++)i[64*e+n]=a[e]+a[n];return s=function(){return i},i}}),define("snapp/builder",function(e,n,t){function r(e,n,t){for(var r in e)e.hasOwnProperty(r)&&n.apply(t,[e[r],r])}function o(e,t,r){n.replaceHookForTesting(e,t),e[t]=r,e[t]!==r&&c.defineGetter(e,t,function(){return r})}function i(e,n,t,r){r?c.defineGetter(e,n,function(){return console.log(r),delete e[n],o(e,n,t),t}):o(e,n,t)}function a(n,t,o,d){r(t,function(t,r){try{var l=t.path?e(t.path):{};o?("undefined"==typeof n[r]?i(n,r,l,t.deprecated):"undefined"!=typeof t.path&&(d?s(n[r],l):i(n,r,l,t.deprecated)),l=n[r]):"undefined"==typeof n[r]?i(n,r,l,t.deprecated):l=n[r],t.children&&a(l,t.children,o,d)}catch(u){c.alert("Exception building Snapp JS globals: "+u+' for key "'+r+'"')}})}function s(e,n){for(var t in n)n.hasOwnProperty(t)&&(e.prototype&&e.prototype.constructor===e?o(e.prototype,t,n[t]):"object"==typeof n[t]&&"object"==typeof e[t]?s(e[t],n[t]):o(e,t,n[t]))}var c=e("snapp/utils");n.buildIntoButDoNotClobber=function(e,n){a(n,e,!1,!1)},n.buildIntoAndClobber=function(e,n){a(n,e,!0,!1)},n.buildIntoAndMerge=function(e,n){a(n,e,!0,!0)},n.recursiveMerge=s,n.assignOrWrapInDeprecateGetter=i,n.replaceHookForTesting=function(){}}),define("snapp/channel",function(e,n,t){function r(e){if("function"!=typeof e)throw"Function required as first argument!"}var o=e("snapp/utils"),i=1,a=function(e,n){this.type=e,this.handlers={},this.state=n?1:0,this.fireArgs=null,this.numHandlers=0,this.onHasSubscribersChange=null},s={join:function(e,n){for(var t=n.length,r=t,o=function(){--r||e()},i=0;t>i;i++){if(0===n[i].state)throw Error("Can only use join with sticky channels.");n[i].subscribe(o)}t||e()},create:function(e){return s[e]=new a(e,!1)},createSticky:function(e){return s[e]=new a(e,!0)},deviceReadyChannelsArray:[],deviceReadyChannelsMap:{},waitForInitialization:function(e){if(e){var n=s[e]||this.createSticky(e);this.deviceReadyChannelsMap[e]=n,this.deviceReadyChannelsArray.push(n)}},initializationComplete:function(e){var n=this.deviceReadyChannelsMap[e];n&&n.fire()}};a.prototype.subscribe=function(e,n){if(r(e),2==this.state)return void e.apply(n||this,this.fireArgs);var t=e,a=e.observer_guid;"object"==typeof n&&(t=o.close(n,e)),a||(a=""+i++),t.observer_guid=a,e.observer_guid=a,this.handlers[a]||(this.handlers[a]=t,this.numHandlers++,1==this.numHandlers&&this.onHasSubscribersChange&&this.onHasSubscribersChange())},a.prototype.unsubscribe=function(e){r(e);var n=e.observer_guid,t=this.handlers[n];t&&(delete this.handlers[n],this.numHandlers--,0===this.numHandlers&&this.onHasSubscribersChange&&this.onHasSubscribersChange())},a.prototype.fire=function(e){var n=Array.prototype.slice.call(arguments);if(1==this.state&&(this.state=2,this.fireArgs=n),this.numHandlers){var t=[];for(var r in this.handlers)t.push(this.handlers[r]);for(var o=0;o<t.length;++o)t[o].apply(this,n);2==this.state&&this.numHandlers&&(this.numHandlers=0,this.handlers={},this.onHasSubscribersChange&&this.onHasSubscribersChange())}},s.createSticky("onDOMContentLoaded"),s.createSticky("onNativeReady"),s.createSticky("onSnappReady"),s.createSticky("onPluginsReady"),s.createSticky("onDeviceReady"),s.create("onResume"),s.create("onPause"),s.createSticky("onDestroy"),s.waitForInitialization("onSnappReady"),s.waitForInitialization("onDOMContentLoaded"),t.exports=s}),define("snapp/exec",function(require,exports,module){function androidExec(e,n,t,r,o){if(0>bridgeSecret)throw new Error("exec() called without bridgeSecret");void 0===jsToNativeBridgeMode&&androidExec.setJsToNativeBridgeMode(jsToNativeModes.JS_OBJECT);for(var i=0;i<o.length;i++)"ArrayBuffer"==utils.typeName(o[i])&&(o[i]=base64.fromArrayBuffer(o[i]));var a=t+snapp.callbackId++,s=JSON.stringify(o);(e||n)&&(snapp.callbacks[a]={success:e,fail:n});var c=nativeApiProvider.get().exec(bridgeSecret,t,r,a,s);return jsToNativeBridgeMode==jsToNativeModes.JS_OBJECT&&"@Null arguments."===c?(androidExec.setJsToNativeBridgeMode(jsToNativeModes.PROMPT),androidExec(e,n,t,r,o),void androidExec.setJsToNativeBridgeMode(jsToNativeModes.JS_OBJECT)):void androidExec.processMessages(c,!0)}function pollOnceFromOnlineEvent(){pollOnce(!0)}function pollOnce(e){if(!(0>bridgeSecret)){var n=nativeApiProvider.get().retrieveJsMessages(bridgeSecret,!!e);androidExec.processMessages(n)}}function pollingTimerFunc(){pollEnabled&&(pollOnce(),setTimeout(pollingTimerFunc,50))}function hookOnlineApis(){function e(e){snapp.fireWindowEvent(e.type)}window.addEventListener("online",pollOnceFromOnlineEvent,!1),window.addEventListener("offline",pollOnceFromOnlineEvent,!1),snapp.addWindowEventHandler("online"),snapp.addWindowEventHandler("offline"),document.addEventListener("online",e,!1),document.addEventListener("offline",e,!1)}function processMessage(message){try{var firstChar=message.charAt(0);if("J"==firstChar)eval(message.slice(1));else if("S"==firstChar||"F"==firstChar){var success="S"==firstChar,keepCallback="1"==message.charAt(1),spaceIdx=message.indexOf(" ",2),status=+message.slice(2,spaceIdx),nextSpaceIdx=message.indexOf(" ",spaceIdx+1),callbackId=message.slice(spaceIdx+1,nextSpaceIdx),payloadKind=message.charAt(nextSpaceIdx+1),payload;if("s"==payloadKind)payload=message.slice(nextSpaceIdx+2);else if("t"==payloadKind)payload=!0;else if("f"==payloadKind)payload=!1;else if("N"==payloadKind)payload=null;else if("n"==payloadKind)payload=+message.slice(nextSpaceIdx+2);else if("A"==payloadKind){for(var data=message.slice(nextSpaceIdx+2),bytes=window.atob(data),arraybuffer=new Uint8Array(bytes.length),i=0;i<bytes.length;i++)arraybuffer[i]=bytes.charCodeAt(i);payload=arraybuffer.buffer}else payload="S"==payloadKind?window.atob(message.slice(nextSpaceIdx+2)):JSON.parse(message.slice(nextSpaceIdx+1));snapp.callbackFromNative(callbackId,success,status,[payload],keepCallback)}else console.log("processMessage failed: invalid message: "+JSON.stringify(message))}catch(e){console.log("processMessage failed: Error: "+e),console.log("processMessage failed: Stack: "+e.stack),console.log("processMessage failed: Message: "+message)}}function popMessageFromQueue(){var e=messagesFromNative.shift();if("*"==e)return"*";var n=e.indexOf(" "),t=+e.slice(0,n),r=e.substr(n+1,t);return e=e.slice(n+t+1),console.log(r),r}var snapp=require("snapp"),nativeApiProvider=require("snapp/android/nativeapiprovider"),utils=require("snapp/utils"),base64=require("snapp/base64"),channel=require("snapp/channel"),jsToNativeModes={PROMPT:0,JS_OBJECT:1},nativeToJsModes={POLLING:0,LOAD_URL:1,ONLINE_EVENT:2,PRIVATE_API:3},jsToNativeBridgeMode,nativeToJsBridgeMode=nativeToJsModes.LOAD_URL,pollEnabled=!1,messagesFromNative=[],bridgeSecret=-1;androidExec.init=function(){var e=require("snapp/utils");bridgeSecret=+e.prompt("","snapp_init:"+nativeToJsBridgeMode),channel.onNativeReady.fire()},hookOnlineApis(),androidExec.jsToNativeModes=jsToNativeModes,androidExec.nativeToJsModes=nativeToJsModes,androidExec.setJsToNativeBridgeMode=function(e){e!=jsToNativeModes.JS_OBJECT||window._snappNative||(e=jsToNativeModes.PROMPT),nativeApiProvider.setPreferPrompt(e==jsToNativeModes.PROMPT),jsToNativeBridgeMode=e},androidExec.setNativeToJsBridgeMode=function(e){e!=nativeToJsBridgeMode&&(nativeToJsBridgeMode==nativeToJsModes.POLLING&&(pollEnabled=!1),nativeToJsBridgeMode=e,bridgeSecret>=0&&nativeApiProvider.get().setNativeToJsBridgeMode(bridgeSecret,e),e==nativeToJsModes.POLLING&&(pollEnabled=!0,setTimeout(pollingTimerFunc,1)))};var isProcessing=!1;androidExec.processMessages=function(e,n){if(e&&messagesFromNative.push(e),!isProcessing){if(n)return void window.setTimeout(androidExec.processMessages,0);isProcessing=!0;try{for(;messagesFromNative.length;){var t=popMessageFromQueue();if(console.log(t),"*"==t&&0===messagesFromNative.length)return void setTimeout(pollOnce,0);processMessage(t)}}finally{isProcessing=!1}}},module.exports=androidExec}),define("snapp/exec/proxy",function(e,n,t){var r={};t.exports={add:function(e,n){return console.log("adding proxy for "+e),r[e]=n,n},remove:function(e){var n=r[e];return delete r[e],r[e]=null,n},get:function(e,n){return r[e]?r[e][n]:null}}}),define("snapp/init",function(e,n,t){function r(e){for(var n=0;n<e.length;++n)2!=e[n].state&&console.log("Channel not fired: "+e[n].type)}function o(e){var n=function(){};n.prototype=e;var t=new n;if(n.bind)for(var r in e)"function"==typeof e[r]?t[r]=e[r].bind(e):!function(n){Object.defineProperty(t,n,{get:function(){return e[n]},configurable:!0,enumerable:!0})}(r);return t}var i=e("snapp/channel"),a=e("snapp"),s=e("snapp/modulemapper"),c=e("snapp/platform"),d=e("snapp/pluginloader"),l=[i.onNativeReady,i.onPluginsReady];window.setTimeout(function(){2!=i.onDeviceReady.state&&(console.log("deviceready has not fired after 5 seconds."),r(l),r(i.deviceReadyChannelsArray))},5e3),window.navigator&&(window.navigator=o(window.navigator)),window.console||(window.console={log:function(){}}),window.console.warn||(window.console.warn=function(e){this.log("warn: "+e)}),i.onPause=a.addDocumentEventHandler("pause"),i.onResume=a.addDocumentEventHandler("resume"),i.onDeviceReady=a.addStickyDocumentEventHandler("deviceready"),"complete"==document.readyState||"interactive"==document.readyState?i.onDOMContentLoaded.fire():document.addEventListener("DOMContentLoaded",function(){i.onDOMContentLoaded.fire()},!1),window._nativeReady&&i.onNativeReady.fire(),s.clobbers("snapp","snapp"),s.clobbers("snapp/exec","snapp.exec"),s.clobbers("snapp/exec","Snapp.exec"),c.bootstrap&&c.bootstrap(),setTimeout(function(){d.load(function(){i.onPluginsReady.fire()})},0),i.join(function(){s.mapModules(window),c.initialize&&c.initialize(),i.onSnappReady.fire(),i.join(function(){e("snapp").fireDocumentEvent("deviceready")},i.deviceReadyChannelsArray)},l)}),define("snapp/modulemapper",function(e,n,t){function r(e,n,t,r){if(!(n in c))throw new Error("Module "+n+" does not exist.");i.push(e,n,t),r&&(a[t]=r)}function o(e,n){if(!e)return n;for(var t,r=e.split("."),o=n,i=0;t=r[i];++i)o=o[t]=o[t]||{};return o}var i,a,s=e("snapp/builder"),c=define.moduleMap;n.reset=function(){i=[],a={}},n.clobbers=function(e,n,t){r("c",e,n,t)},n.merges=function(e,n,t){r("m",e,n,t)},n.defaults=function(e,n,t){r("d",e,n,t)},n.runs=function(e){r("r",e,null)},n.mapModules=function(n){var t={};n.CDV_origSymbols=t;for(var r=0,c=i.length;c>r;r+=3){var d=i[r],l=i[r+1],u=e(l);if("r"!=d){var p=i[r+2],f=p.lastIndexOf("."),v=p.substr(0,f),g=p.substr(f+1),m=p in a?"Access made to deprecated symbol: "+p+". "+m:null,y=o(v,n),b=y[g];"m"==d&&b?s.recursiveMerge(b,u):("d"==d&&!b||"d"!=d)&&(p in t||(t[p]=b),s.assignOrWrapInDeprecateGetter(y,g,u,m))}}},n.getOriginalSymbol=function(e,n){var t=e.CDV_origSymbols;if(t&&n in t)return t[n];for(var r=n.split("."),o=e,i=0;i<r.length;++i)o=o&&o[r[i]];return o},n.reset()}),define("snapp/platform",function(e,n,t){function r(){var e=document.getElementById("ebuyNavigation");if(null!=e){var n,t=e.getAttribute("title"),r=e.getAttribute("fontSize"),o=e.getAttribute("fontColor"),i=e.getAttribute("image"),a=e.getAttribute("background");t&&(n='"txt":{"text":"'+t+'"',r&&(n=n+',"fontSize":'+r),o&&(n=n+',"fontColor":"'+o+'"'),n+="}");var s;i&&(s='"img":"'+i+'"');var c;a&&(c='"background":"'+a+'"');var d="{";n&&(d+=n),s&&(d&&(d+=","),d+=s),c&&(d&&(d+=","),d+=c),d+="}",baseApi.setTitle(d)}}t.exports={id:"android",bootstrap:function(){function n(e){var n=o.addDocumentEventHandler(e+"button");n.onHasSubscribersChange=function(){i(null,null,"App","overrideButton",[e,1==this.numHandlers])}}var t=e("snapp/channel"),o=e("snapp"),i=e("snapp/exec"),a=e("snapp/modulemapper");i.init(),a.clobbers("snapp/plugin/android/app","app"),o.addDocumentEventHandler("menubutton"),o.addDocumentEventHandler("searchbutton"),n("volumeup"),n("volumedown"),t.onSnappReady.subscribe(function(){r()})}}}),define("snapp/plugin/android/app",function(e,n,t){var r=e("snapp/exec");t.exports={clearCache:function(){r(null,null,"App","clearCache",[])},clearHistory:function(){r(null,null,"App","clearHistory",[])},backHistory:function(){r(null,null,"App","backHistory",[])},overrideBackbutton:function(e){r(null,null,"App","overrideBackbutton",[e])},overrideButton:function(e,n){r(null,null,"App","overrideButton",[e,n])},close:function(){return r(null,null,"App","close",[])}}}),define("snapp/pluginloader",function(e,n,t){function r(e,t,r,o){o=o||r,e in define.moduleMap?r():n.injectScript(t,function(){e in define.moduleMap?r():o()},o)}function o(e,n){for(var t,r=0;t=e[r];r++)for(var o,i=t.module,a=0;o=i[a];a++){if(o.clobbers&&o.clobbers.length)for(var c=0;c<o.clobbers.length;c++)s.clobbers(o.id,o.clobbers[c]);if(o.merges&&o.merges.length)for(var d=0;d<o.merges.length;d++)s.merges(o.id,o.merges[d]);o.runs&&s.runs(o.id)}n()}function i(e,n,t){function i(){--a||o(n,t)}var a=n.length;if(!a)return void t();for(var s=0;s<n.length;s++){var c=n[s];c.file?r(c.id,e+c.file+"?v="+c.version,i):i()}}function a(){for(var e=null,n=document.getElementsByTagName("script"),t="/sneapp.js",r=n.length-1;r>-1;r--){var o=n[r].src.replace(/\?.*$/,"");if(o.indexOf(t)==o.length-t.length){e=o.substring(0,o.length-t.length)+"/";break}}return e}{var s=e("snapp/modulemapper");e("snapp/urlutil")}n.injectScript=function(e,n,t){var r=document.createElement("script");r.onload=n,r.onerror=t,r.src=e,document.head.appendChild(r)},n.load=function(n){var t=a();null===t&&(console.log("Could not find sneapp.js script tag. Plugin loading may fail."),t=""),r("snapp/plugin_list",t+"snapp_plugins.js?v="+snapp.version,function(){var r=e("snapp/plugin_list");i(t,r,n)},n)}}),define("snapp/urlutil",function(e,n,t){n.makeAbsolute=function(e){var n=document.createElement("a");return n.href=e,n.href}}),define("snapp/utils",function(e,n,t){function r(e){for(var n="",t=0;e>t;t++){var r=parseInt(256*Math.random(),10).toString(16);1==r.length&&(r="0"+r),n+=r}return n}var o=n;o.defineGetterSetter=function(e,n,t,r){if(Object.defineProperty){var o={get:t,configurable:!0};r&&(o.set=r),Object.defineProperty(e,n,o)}else e.__defineGetter__(n,t),r&&e.__defineSetter__(n,r)},o.defineGetter=o.defineGetterSetter,o.arrayIndexOf=function(e,n){if(e.indexOf)return e.indexOf(n);for(var t=e.length,r=0;t>r;++r)if(e[r]==n)return r;return-1},o.arrayRemove=function(e,n){var t=o.arrayIndexOf(e,n);return-1!=t&&e.splice(t,1),-1!=t},o.typeName=function(e){return Object.prototype.toString.call(e).slice(8,-1)},o.isArray=function(e){return"Array"==o.typeName(e)},o.isDate=function(e){return"Date"==o.typeName(e)},o.clone=function(e){if(!e||"function"==typeof e||o.isDate(e)||"object"!=typeof e)return e;var n,t;if(o.isArray(e)){for(n=[],t=0;t<e.length;++t)n.push(o.clone(e[t]));return n}n={};for(t in e)t in n&&n[t]==e[t]||(n[t]=o.clone(e[t]));return n},o.close=function(e,n,t){return"undefined"==typeof t?function(){return n.apply(e,arguments)}:function(){return n.apply(e,t)}},o.createUUID=function(){return r(4)+"-"+r(2)+"-"+r(2)+"-"+r(2)+"-"+r(6)},o.extend=function(){var e=function(){};return function(n,t){e.prototype=t.prototype,n.prototype=new e,n.__super__=t.prototype,n.prototype.constructor=n}}(),o.alert=function(e){window.alert?window.alert(e):console&&console.log&&console.log(e)},o.prompt=function(e,n){var t=window.navigator.userAgent;if(t.match(/SNEBUY-APP?/i)){var r=o.getVersion(t);return r>81?window.prompt(e,n):0}return 0},o.getVersion=function(e){var n=new RegExp("SNEBUY-APP \\d+"),t=e.match(n);t+="";var r=new RegExp("\\d+");return t=t.match(r)},o.getDate=function(){var e=(new Date).toLocaleDateString();return e=e.replace(/-/g,"")}}),define("snapp/version",function(e,n,t){var r={version_32:84,version_33:90,version_34:92,version_35:96,version_36:100};t.exports=r}),window.snapp=require("snapp"),require("snapp/init")}();