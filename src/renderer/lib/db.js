const myDB = {
  name: "local",
  version: 1,
  db: null
};
const cacheName = "cache";
function openDB(name, version) {
  if (myDB.db) return myDB.db;

  return new Promise((resolve, reject) => {
    var version = version || 1;
    var request = window.indexedDB.open(name, version);
    request.onerror = function(e) {
      console.log(e.currentTarget.error.message);
      reject();
    };
    request.onsuccess = function(e) {
      myDB.db = e.target.result;
      resolve();
    };
    request.onupgradeneeded = function(e) {
      var db = e.target.result;
      if (!db.objectStoreNames.contains(cacheName)) {
        db.createObjectStore(cacheName, { keyPath: "id" });
      }
      console.log("DB version changed to " + version);
    };
  });
}
function add2Cache(item) {
  return new Promise((resolve, reject) => {
    var request = myDB.db.transaction(cacheName, "readwrite");
    var store = request.objectStore(cacheName);
    console.log("add2Cache");
    console.log(item);

    store.add(item);
    request.onsuccess = function(event) {
      console.log("数据写入成功");
      resolve();
    };

    request.onerror = function(event) {
      console.log("数据写入失败");
      reject();
    };
  });
}

function getCacheItem(id) {
  return new Promise((resolve, reject) => {
    var transaction = myDB.db.transaction(cacheName, "readwrite");
    var store = transaction.objectStore(cacheName);
    var request = store.get(id);
    request.onsuccess = function(e) {
      var item = e.target.result;
      resolve(item);
    };
    request.onerror = function(event) {
      console.log("事务失败");
      reject(event);
    };
  });
}
function readAll() {
  var objectStore = myDB.db.transaction(cacheName).objectStore(cacheName);

  objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;

    if (cursor) {
      console.log(cursor);
      cursor.continue();
    } else {
      console.log("没有更多数据了！");
    }
  };
}

function update2Cache(item) {
  return new Promise((resolve, reject) => {
    var request = myDB.db
      .transaction(cacheName, "readwrite")
      .objectStore(cacheName)
      .put(item);

    request.onsuccess = function(event) {
      console.log("数据更新成功");
      resolve();
    };

    request.onerror = function(event) {
      console.log("数据更新失败");
      reject();
    };
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    var request = myDB.db
      .transaction(cacheName, "readwrite")
      .objectStore(cacheName)
      .delete(id);

    request.onsuccess = function(event) {
      console.log("数据删除成功");
      resolve();
    };
    request.onerror = function(event) {
      console.log("数据更新失败");
      reject();
    };
  });
}

function sameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export async function getCacheData(date, id, callback) {
  await openDB(myDB.name, myDB.version);
  let cache = await getCacheItem(id);

  if (
    cache &&
    (!date || (cache.date && date && sameDay(cache.date, new Date(date))))
  ) {
    //console.log("get from cache");
    //console.log(cache);
    return cache.data;
  }
  //if (cache) await remove(id);
  //else
  cache = {};
  cache.data = await callback();

  cache.id = id;
  cache.date = (date && new Date(date)) || new Date();

  await update2Cache(cache);
  return cache.data;
}

window.getCacheData = getCacheData;
