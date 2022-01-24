let assets = [
  "/",
  "style.css",
  "app.js",
  "sw.js",
  "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,400;0,600;0,800;1,100;1,700&family=Spartan:wght@100;400;500;700;800&display=swap",
];

self.addEventListener("install", (event) => {
  caches.open("assets").then((cache) => {
    cache.addAll(assets);
  });
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open("assets").then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
      return cachedResponse || fetchPromise;
    })
  );
});
