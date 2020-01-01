import localStore from "../localdata";

const myDB = {
  name: "local",
  version: 1,
  db: null
};
const cacheObj = {};
window.cacheObj = cacheObj;
const cacheName = "cache";
function openDB(name, version) {
  return new Promise((resolve, reject) => {
    if (myDB.db) return resolve(myDB.db);
    var version = version || 1;
    var request = window.indexedDB.open(name, version);
    request.onerror = function(e) {
      console.log(e.currentTarget.error.message);
      reject(e);
    };
    request.onsuccess = function(e) {
      myDB.db = e.target.result;
      resolve(myDB.db);
    };
    request.onupgradeneeded = function(e) {
      var db = e.target.result;
      if (!db.objectStoreNames.contains(cacheName)) {
        db.createObjectStore(cacheName, { keyPath: "id" });
      }
      console.log("DB version changed to " + version);
    };
    window.request = request;
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
      document.title = "数据更新成功:" + item.id;
      resolve();
    };

    request.onerror = function(event) {
      document.title = "数据更新失败:" + item.id;
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
window.removeCache = remove;
function isNotBefore(d1, d2) {
  return d1.getTime() >= d2.getTime();
}
export { cacheObj as cache };

export async function getCacheData(date, id, callback, mergeData) {
  await openDB(myDB.name, myDB.version);
  let cache = await getCacheItem(id);

  if (cache && cache.date && localStore.isShouldRemove(id, cache.date)) {
    await remove(id);
  }

  if (
    cache &&
    (!date || (cache.date && date && isNotBefore(cache.date, new Date(date))))
  ) {
    if (mergeData) {
      Object.assign(cache.data || {}, mergeData);
      await update2Cache(cache);
    }
    return cache.data;
  }
  if (!callback && !mergeData) return null;
  cache = {};
  if (callback) cache.data = await callback();
  if (mergeData) Object.assign(cache.data || {}, mergeData);
  cache.id = id;
  cache.date = new Date();

  await update2Cache(cache);
  return cache.data;
}

window.getCacheData = getCacheData;

export function getCache(id) {
  return cacheObj[id];
}
export function putCache(id, data) {
  return (cacheObj[id] = data);
}
