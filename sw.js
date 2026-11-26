// Service Worker — Kalkulator HPP (offline cache)
// Naikkan CACHE_VERSION setiap rilis agar user dapat update (network-first untuk navigasi).
var CACHE_VERSION = "kalkulator-hpp-v4";
var CORE_ASSETS = [
  "./",
  "./index.html",
  "./favicon.svg",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./qris.jpg"
  // og-image.png & apple-touch-icon.png TIDAK di-precache: hanya dipakai crawler/iOS
];
// URL font Google (css + woff2) di-cache saat pertama kali diakses agar offline tetap pakai Nunito
var FONT_ASSETS = [
  "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
];

// fetch dengan batas waktu (ms) agar di sinyal lemah cepat fallback ke cache
function fetchTimeout(req, ms){
  return new Promise(function(resolve, reject){
    var t = setTimeout(function(){ reject(new Error("timeout")); }, ms);
    fetch(req).then(function(r){ clearTimeout(t); resolve(r); }, function(e){ clearTimeout(t); reject(e); });
  });
}

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE_VERSION).then(function(cache){
      return Promise.all(
        CORE_ASSETS.map(function(url){ return cache.add(url).catch(function(){}); })
          .concat(FONT_ASSETS.map(function(url){ return cache.add(url).catch(function(){}); }))
      );
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){return k!==CACHE_VERSION}).map(function(k){return caches.delete(k)}));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method!=="GET") return;
  var url = new URL(req.url);

  // Navigasi (HTML): NETWORK-FIRST dengan batas 3 detik, fallback cache saat offline/timeout.
  if(req.mode === "navigate"){
    e.respondWith(
      fetchTimeout(req, 3000).then(function(res){
        if(res && res.ok){
          var clone = res.clone();
          caches.open(CACHE_VERSION).then(function(c){ c.put(req, clone); });
        }
        return res;
      }).catch(function(){
        return caches.match(req, {ignoreSearch:true})
          .then(function(r){ return r || caches.match("./index.html"); })
          .then(function(r){ return r || fetchTimeout(req, 3000); });
      })
    );
    return;
  }

  // Font Google (cross-origin css & woff2): cache hanya yang ok, fallback cache saat offline.
  if(url.hostname.indexOf("fonts.googleapis.com")>=0 || url.hostname.indexOf("fonts.gstatic.com")>=0){
    e.respondWith(
      fetchTimeout(req, 3000).then(function(res){
        if(res && res.ok && res.status===200){
          var clone = res.clone();
          caches.open(CACHE_VERSION).then(function(c){ c.put(req, clone); });
        }
        return res;
      }).catch(function(){ return caches.match(req); })
    );
    return;
  }

  // Aset same-origin lain: cache-first, fallback network.
  e.respondWith(
    caches.match(req).then(function(cached){
      if(cached) return cached;
      return fetchTimeout(req, 3000).then(function(res){
        if(res && res.ok && res.status===200 && url.origin===self.location.origin){
          var clone = res.clone();
          caches.open(CACHE_VERSION).then(function(c){ c.put(req, clone); });
        }
        return res;
      }).catch(function(){ return cached || Response.error(); });
    })
  );
});
