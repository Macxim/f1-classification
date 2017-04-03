export function getJSON(path, callback) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.onload = () => {
    if (httpRequest.status >= 200 && httpRequest.status < 400) {
      const data = JSON.parse(httpRequest.responseText);
      if (callback) { callback(data); }
    }
  };
  httpRequest.open('GET', path, true)
  httpRequest.send()
}


export function sortDataByKey (data, prop){
  return data.sort( (a, b) => (a[prop] > b[prop]) )
}
