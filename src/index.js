import '../styles/style.css';

// Models

function Driver(attributes) {
  this.ranking = attributes.ranking
  this.points = attributes.points
  this.nationality = attributes.nationality
  this.surname = attributes.surname
  this.name = attributes.name
  this.team = attributes.team
  this.teamPoints = attributes.teamPoints
  this.lastRace = attributes.lastRace
  this.wins = attributes.wins
  this.poles = attributes.poles
  this.bestPosition = attributes.bestPosition
  this.bestPositionTimes = attributes.bestPositionTimes
}



// Controllers

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

function renderDrivers() {
  const driversListContainer = document.getElementById('drivers-list');

  getJSON('data.json', function (data){
    const drivers = data
      .drivers
      .map(attributes => new Driver(attributes));

    const driversRows = document.createDocumentFragment();
    let view;

    drivers.forEach( (driver, i) => {
      view = document.createElement('div');
      view.className = 'driver-row'
      view.id = `driver-${i}`
      view.innerHTML = DriverView(driver, i+1, matchFlags(driver.nationality))
      driversListContainer.appendChild(view)
    })
  })
}

function matchFlags(nationality) {
  const flags = {
    "Germany": "01",
    "Australia": "02",
    "Brazil": "03",
    "Spain": "04",
    "United Kingdom": "05"
  }
  return flags[nationality];
}


renderDrivers()


// Views

function DriverView(driver, i, flagNumber) {
  if (typeof driver.lastRace === 'undefined') {
    driver.lastRace = '---'
  }
  const view = `
      <div class="driver-row__item driver-row__item--first">
        <span class="driver-ranking">${driver.ranking}°</span>
        <div class="driver-points-wrap"><span class="driver-points-label">Points</span><span class="driver-points">${driver.points}</span></div>
      </div>
      <div class="driver-row__item driver-row__item--second">
        <img class="driver-photo" src="images/drivers/0${i}.png" alt="">
      </div>
      <div class="driver-row__item driver-row__item--third">
        <img class="driver-flag" src="images/flags/${flagNumber}.jpg" alt="">
      </div>
      <div class="driver-details">
        <span class="driver-nationality">${driver.nationality}</span>
        <div><span class="driver-surname">${driver.surname}</span> <span class="driver-name">${driver.name}</span></div>
        <div><span class="driver-team">${driver.team}</span> <span class="driver-team-points">(${driver.teamPoints})</span></div>
      </div>
      <ul class="driver-row__item driver-races-data">
        <li class="driver-races-data__item"><span class="races-data-label">Last GP</span><span class="race-data-figure">${driver.lastRace}°</span></li>
        <li class="driver-races-data__item"><span class="races-data-label">Victories</span><span class="race-data-figure">${driver.wins}</span></li>
        <li class="driver-races-data__item"><span class="races-data-label">Poles</span><span class="race-data-figure">${driver.poles}</span></li>
        <li class="driver-races-data__item"><span class="races-data-label">Best Position</span><span class="race-data-figure">${driver.bestPosition}°</span></li>
      </ul>
  `
  return view
}
