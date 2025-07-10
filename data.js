const DataManager = {
  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  load(key, defaultValue = []) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  },
  clear(key) {
    localStorage.removeItem(key);
  }
};