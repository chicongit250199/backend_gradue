const NodeCache = require('node-cache');

let APP_CACHE;

export function initCache () {
  APP_CACHE = new NodeCache({ stdTTL: 900, checkperiod: 300 });
}

export function set (key, obj) {
  APP_CACHE.set(key, obj);
}

export function get (key) {
  return APP_CACHE.get(key);
}
