import '../styles/style.css';

function getJSON(path, callback) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.onload = function () {
    if (httpRequest.status >= 200 && httpRequest.status < 400) {
      const data = JSON.parse(httpRequest.responseText);
      if (callback) { callback(data); }
    }
  };
  httpRequest.open('GET', path, true)
  httpRequest.send()

}

(function (){
  getJSON('data.json', function (data){
    let drivers = data.drivers;
    loopOverData(drivers);
  })
})();


function loopOverData(driversData){
  let template;
  let driversListContainer = document.getElementById('drivers-list');

  for (let i = 0; i < driversData.length; i++){

    template =
    `<div class="driver-row__item driver-row__item--first">
      <span class="driver-ranking">${driversData[i].ranking}°</span>
      <div class="driver-points-wrap"><span class="driver-points-label">Points</span><span class="driver-points">${driversData[i].points}</span></div>
    </div>
    <div class="driver-row__item driver-row__item--second">
      <img class="driver-photo" src="images/drivers/.png" alt="">
    </div>
    <div class="driver-row__item driver-row__item--third">
      <img class="driver-flag" src="images/flags/.jpg" alt="">
    </div>
    <div class="driver-details">
      <span class="driver-nationality">${driversData[i].nationality}</span>
      <div><span class="driver-surname">${driversData[i].surname}</span> <span class="driver-name">${driversData[i].name}</span></div>
      <div><span class="driver-team">${driversData[i].team}</span> <span class="driver-team-points">(${driversData[i].teamPoints})</span></div>
    </div>
    <ul class="driver-row__item driver-races-data">
      <li class="driver-races-data__item"><span class="races-data-label">Last GP</span><span class="race-data-figure">${driversData[i].lastRace}°</span></li>
      <li class="driver-races-data__item"><span class="races-data-label">Victories</span><span class="race-data-figure">${driversData[i].wins}</span></li>
      <li class="driver-races-data__item"><span class="races-data-label">Poles</span><span class="race-data-figure">${driversData[i].poles}</span></li>
      <li class="driver-races-data__item"><span class="races-data-label">Best Position</span><span class="race-data-figure">${driversData[i].bestPosition}°</span></li>
    </ul>`;

    let newDriver = document.createElement('div');

    newDriver.className = 'driver-row';
    newDriver.innerHTML = template;

    driversListContainer.appendChild(newDriver);
  }
}
