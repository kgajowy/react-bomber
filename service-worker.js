"use strict";var precacheConfig=[["/react-bomber/index.html","4149efab3462d6693c3457559439d79d"],["/react-bomber/static/css/main.65027555.css","41e5e45b9b5d9ecaa09b72c11eed3386"],["/react-bomber/static/js/main.f278fc4b.js","e9adbbc552253a54d89b4b9c2a88c36b"],["/react-bomber/static/media/bomb-fire.9c15b4b2.svg","9c15b4b25b907caac95756b193f334b2"],["/react-bomber/static/media/bomb.a125cf3f.svg","a125cf3fe6a3791bd74a4b0fbe8e5b48"],["/react-bomber/static/media/bucket_fill.097c8463.svg","097c84635e14651e40bdf543663374f4"],["/react-bomber/static/media/cloud.28605668.svg","286056681b8e082acf152c378ed1afc9"],["/react-bomber/static/media/coin.695dee71.svg","695dee715496a1e2bb23d04eeb05158f"],["/react-bomber/static/media/cross.6a91493d.svg","6a91493dd857c6f661d0a8331ecfab19"],["/react-bomber/static/media/heart.f57745dc.svg","f57745dc5f91ff16d8508327f6174235"],["/react-bomber/static/media/hills.38d7f086.png","38d7f08673065f31fa16a20ee45329cd"],["/react-bomber/static/media/raindrop.e364bbaa.svg","e364bbaa365ef839e2a50bf4fdd1bb69"],["/react-bomber/static/media/respect.41f87860.svg","41f8786077f31c9e372382a5164d02d8"],["/react-bomber/static/media/star.db6b4396.svg","db6b43968657bb19bbfca7c0c3b56e91"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var r=new URL(e);return"/"===r.pathname.slice(-1)&&(r.pathname+=t),r.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,r,a){var n=new URL(e);return a&&n.pathname.match(a)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(r)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var r=new URL(t).pathname;return e.some(function(e){return r.match(e)})},stripIgnoredUrlParameters=function(e,r){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return r.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],r=e[1],a=new URL(t,self.location),n=createCacheKey(a,hashParamName,r,/\.\w{8}\./);return[a.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(r){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!r.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return a.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var r=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!r.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,r=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),a="index.html";(e=urlsToCacheKeys.has(r))||(r=addDirectoryIndex(r,a),e=urlsToCacheKeys.has(r));var n="/react-bomber/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(r=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(r)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(r)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});