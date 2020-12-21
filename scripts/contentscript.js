!function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){return o(e[i][1][r]||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}({1:[function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_ContentScriptService2=_interopRequireDefault(require("../transport/ContentScriptService")),_JsInjector2=_interopRequireDefault(require("../utils/JsInjector"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ContentPageIdentifier=function(){function ContentPageIdentifier(){!function(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,ContentPageIdentifier)}return _createClass(ContentPageIdentifier,[{key:"saveUserData",value:function(userdetails){this.user=userdetails}},{key:"reset",value:function(){this.user=null}},{key:"setUpMessageListener",value:function(){var _this=this;_ContentScriptService2.default.register(function(res){res&&"client-details"==res.action&&_this.saveUserData(res.data)})}},{key:"injectClient",value:function(){_JsInjector2.default.addUrl("scripts/UserIdentifierClient.js")}},{key:"getUserData",value:function(){this.setUpMessageListener(),this.injectClient()}},{key:"canShow",value:function(sendResponse){var canShow=window.location.toString().includes("https://app.clickfunnels.com/funnels");canShow&&this.getUserData(),sendResponse({canShow:canShow})}}]),ContentPageIdentifier}();module.exports=new ContentPageIdentifier},{"../transport/ContentScriptService":6,"../utils/JsInjector":8}],2:[function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_ContentScriptService2=_interopRequireDefault(require("../transport/ContentScriptService")),_ext2=_interopRequireDefault(require("../utils/ext"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var PageCopy=function(){function PageCopy(){!function(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,PageCopy),this.user={}}return _createClass(PageCopy,[{key:"setUpMessageListener",value:function(){var _this=this;_ContentScriptService2.default.register(function(res){res&&"page-data"==res.action&&(_this.sendCopiedData(res.data),console.log("received pageData",_this.user))})}},{key:"showloading",value:function(){}},{key:"hideloading",value:function(){}},{key:"sendAllFunnelUrls",value:function(funnelUrls,user){var _this2=this,data={action:"generate-share-urls-and-copy",urls:funnelUrls,user:user};this.showloading(),_ext2.default.runtime.sendMessage(data,function(res){_this2.hideloading()})}},{key:"getShareableLink",value:function(href){return"https://app.clickfunnels.com"+href+"/share"}},{key:"getAllFunnelUrls",value:function(){for(var funnelUrls=[],funnelLinks=document.querySelectorAll(".pageListingTitle a"),i=0;i<funnelLinks.length;i++)funnelUrls.push(this.getShareableLink(funnelLinks[i].getAttribute("href")));return funnelUrls}},{key:"init",value:function(userData){var urls=this.getAllFunnelUrls();console.log("funnelurl   s",urls),this.sendAllFunnelUrls(urls,userData)}},{key:"highlightErrors",value:function(funnelIds){for(var funnelLinks=document.querySelectorAll(".pageListingItem"),i=0;i<funnelLinks.length;i++){var currentFunnelId=funnelLinks[i].getAttribute("data-funnel-id");funnelIds.includes(currentFunnelId)?funnelLinks[i].style.backgroundColor="#f96767":funnelLinks[i].style.backgroundColor="#a8ffa8"}}}]),PageCopy}();module.exports=new PageCopy},{"../transport/ContentScriptService":6,"../utils/ext":9}],3:[function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_JsInjector2=_interopRequireDefault(require("../utils/JsInjector")),_ContentScriptService2=_interopRequireDefault(require("../transport/ContentScriptService")),_ClientScriptService2=_interopRequireDefault(require("../transport/ClientScriptService")),_Messenger2=_interopRequireDefault(require("../transport/Messenger"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var PagePaste=function(){function PagePaste(){!function(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,PagePaste),this.pasteData=null}return _createClass(PagePaste,[{key:"injectClient",value:function(){_JsInjector2.default.addUrl("scripts/PagePasteClient.js")}},{key:"sendPasteResponseToGlobal",value:function(res){null!=res.error?_Messenger2.default.sendToBackground({action:"showerror",error:res.error}):_Messenger2.default.sendToBackground({action:"save-paste-complete",msg:res.msg})}},{key:"sendPasteDataToClient",value:function(){var _this=this;_Messenger2.default.sendToBackground({action:"update-credit",pastedurl:window.location.toString()},function(response){response&&response.message&&_ClientScriptService2.default.send({action:"receive-paste-data",data:_this.pasteData})})}},{key:"setUpMessageListener",value:function(){var _this2=this;_ContentScriptService2.default.register(function(res){console.log("page paste",res),null!=res&&null!=res&&null!=res.action&&null!=res.action&&("paste-client-initialized"==res.action&&_this2.sendPasteDataToClient(),"paste-client-completed"==res.action&&_this2.sendPasteResponseToGlobal(res))})}},{key:"init",value:function(currentPageData,pasteData){this.pasteData=pasteData,this.setUpMessageListener(),this.injectClient()}}]),PagePaste}();module.exports=new PagePaste},{"../transport/ClientScriptService":5,"../transport/ContentScriptService":6,"../transport/Messenger":7,"../utils/JsInjector":8}],4:[function(require,module,exports){"use strict";var _PageCopy2=_interopRequireDefault(require("./contentpages/PageCopy")),_ContentPageIdentifier2=_interopRequireDefault(require("./contentpages/ContentPageIdentifier"));_interopRequireDefault(require("./contentpages/PagePaste"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}_interopRequireDefault(require("./transport/Messenger")).default.waitForBackgroundMessage(function(request,sender,response){return console.log("received request",request),"check-page-valid"===request.action?(_ContentPageIdentifier2.default.reset(),_ContentPageIdentifier2.default.canShow(response),!0):"getPageData"===request.action?(response({user:_ContentPageIdentifier2.default.user}),!0):void("copy-all-funnels"===request.action?(_ContentPageIdentifier2.default.user&&console.log(_ContentPageIdentifier2.default.user),_PageCopy2.default.init(_ContentPageIdentifier2.default.user)):"highlight-errors"===request.action&&_PageCopy2.default.highlightErrors(request.errorFunnelIds))})},{"./contentpages/ContentPageIdentifier":1,"./contentpages/PageCopy":2,"./contentpages/PagePaste":3,"./transport/Messenger":7}],5:[function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();var ClientScriptService=function(){function ClientScriptService(){!function(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,ClientScriptService)}return _createClass(ClientScriptService,[{key:"register",value:function(cb){window.addEventListener("send-to-client-script",function(evt){cb(evt.detail)})}},{key:"send",value:function(data){var evt=document.createEvent("CustomEvent");evt.initCustomEvent("send-to-client-script",!0,!0,data),window.dispatchEvent(evt)}}]),ClientScriptService}();module.exports=new ClientScriptService},{}],6:[function(require,module,exports){"use strict";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();var ContentScriptService=function(){function ContentScriptService(){!function(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,ContentScriptService)}return _createClass(ContentScriptService,[{key:"register",value:function(cb){window.addEventListener("send-to-content-script",function(evt){cb(evt.detail)})}},{key:"send",value:function(data){var evt=document.createEvent("CustomEvent");evt.initCustomEvent("send-to-content-script",!0,!0,data),window.dispatchEvent(evt)}}]),ContentScriptService}();module.exports=new ContentScriptService},{}],7:[function(require,module,exports){"use strict";var obj,_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_ext=require("../utils/ext"),_ext2=(obj=_ext)&&obj.__esModule?obj:{default:obj};var Messenger=function(){function Messenger(){!function(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,Messenger)}return _createClass(Messenger,[{key:"sendToActiveTab",value:function(request,cb){_ext2.default.tabs.query({active:!0,currentWindow:!0},function(tabs){_ext2.default.tabs.sendMessage(tabs[0].id,request,function(evt){null!=cb&&null!=cb&&cb(evt)})})}},{key:"openInActiveTab",value:function(url,cb){_ext2.default.tabs.query({active:!0,currentWindow:!0},function(tabs){_ext2.default.tabs.update(tabs[0].id,{url:url,highlighted:!0},function(evt){null!=cb&&null!=cb&&cb(evt)})})}},{key:"reloadActiveTab",value:function(cb){_ext2.default.tabs.query({active:!0,currentWindow:!0},function(tabs){_ext2.default.tabs.executeScript(tabs[0].id,{code:"window.location.reload();"},function(evt){null!=cb&&null!=cb&&cb(evt)})})}},{key:"sendToBackground",value:function(request,cb){_ext2.default.runtime.sendMessage(request,function(response){null!=cb&&null!=cb&&cb(response)})}},{key:"sendToPopup",value:function(request,cb){_ext2.default.runtime.sendMessage(request,function(response){null!=cb&&null!=cb&&cb(response)})}},{key:"waitForBackgroundMessage",value:function(cb){_ext2.default.runtime.onMessage.addListener(function(request,sender,response){null!=cb&&null!=cb&&cb(request,sender,response)})}}]),Messenger}();module.exports=new Messenger},{"../utils/ext":9}],8:[function(require,module,exports){"use strict";var obj,_ext=require("./ext"),_ext2=(obj=_ext)&&obj.__esModule?obj:{default:obj};function JsInjector(){}JsInjector.prototype.hasAlreadyAdded=function(str){return 0<[].slice.call(document.getElementsByTagName("script")).filter(function($script){return $script.innerHTML==str}).length},JsInjector.prototype.hasUrlAlreadyAdded=function(src){return 0<[].slice.call(document.getElementsByTagName("script")).filter(function($script){return $script.src==src}).length},JsInjector.prototype.addUrl=function(src){var modifiedUrl=_ext2.default.extension.getURL(src);if(!this.hasUrlAlreadyAdded(modifiedUrl)){var script=document.createElement("script");script.type="text/javascript",script.src=modifiedUrl,(document.body||document.head||document.documentElement).appendChild(script)}},JsInjector.prototype.addCode=function(code){var script=document.createElement("script");script.type="text/javascript",script.text=code,(document.body||document.head||document.documentElement).appendChild(script)},JsInjector.prototype.add=function(str){if(!this.hasAlreadyAdded(str)){var newScript=document.createElement("script"),inlineScript=document.createTextNode(str);newScript.appendChild(inlineScript),document.body.appendChild(newScript)}},module.exports=new JsInjector},{"./ext":9}],9:[function(require,module,exports){"use strict";var apis=["alarms","bookmarks","browserAction","commands","contextMenus","cookies","downloads","events","extension","extensionTypes","history","i18n","idle","notifications","pageAction","runtime","storage","tabs","webNavigation","webRequest","windows"];module.exports=new function(){var _this=this;apis.forEach(function(api){_this[api]=null;try{chrome[api]&&(_this[api]=chrome[api])}catch(e){}try{window[api]&&(_this[api]=window[api])}catch(e){}try{browser[api]&&(_this[api]=browser[api])}catch(e){}try{_this.api=browser.extension[api]}catch(e){}});try{browser&&browser.runtime&&(this.runtime=browser.runtime)}catch(e){}try{browser&&browser.browserAction&&(this.browserAction=browser.browserAction)}catch(e){}}},{}]},{},[4]);