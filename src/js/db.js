//  localStorage 

export function getDBdata(key) {
  return JSON.parse(localStorage.getItem(key))
}

export function setDBdata(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function removeDBdata(key) {
  localStorage.removeItem(key);
}