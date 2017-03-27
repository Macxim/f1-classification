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
  httpRequest.onload = () => {
    if (httpRequest.status >= 200 && httpRequest.status < 400) {
      const data = JSON.parse(httpRequest.responseText);
      if (callback) { callback(data); }
    }
  };
  httpRequest.open('GET', path, true)
  httpRequest.send()
}

function renderDrivers() {

  getJSON('data.json', data => {
    let drivers = data
      .drivers
      .map(attributes => new Driver(attributes));

    const filtersButtons = document.querySelectorAll('a.main-nav__button');

    filtersButtons.forEach( (button, i) => {
      filtersButtons[i].addEventListener('click', () => {
        const driversContainer = document.getElementById('drivers-list')
        
        drivers = sortDataByKey(drivers, filtersButtons[i].dataset.sort)

        // Remove all children of container before appending sorted ones
        while (driversContainer.hasChildNodes()) {
          driversContainer.removeChild(driversContainer.lastChild);
        }

        // Passing the data to the view and appending content
        passDataToView(drivers)

      })
    })

    passDataToView(drivers)

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

function matchAvatars(name) {
  const avatar = {
    "Vettel": "01",
    "Button": "02",
    "Webber": "03",
    "Alonso": "04",
    "Hamilton": "05",
    "Massa": "06",
    "Rosberg": "07",
    "Schumacher": "08"
  }
  return avatar[name];
}

function passDataToView(drivers){
  let view;
  const driversContainer = document.getElementById('drivers-list');

  drivers.forEach( (driver, i) => {
    setTimeout( () => {
      view = document.createElement('div')
      view.className = 'driver-row'
      view.setAttribute('draggable', 'true')
      view.innerHTML = DriverView(driver, matchAvatars(driver.name), matchFlags(driver.nationality))
      driversContainer.appendChild(view)
      view.classList.add('is-moving-up')
    }, 80 * i);

  })
}

function sortDataByKey (data, prop){
  return data.sort( (a, b) => (a[prop] > b[prop]) )
}

renderDrivers()


// Views

function DriverView(driver, avatar, flag) {
  if (typeof driver.lastRace === 'undefined') {
    driver.lastRace = '---'
  }
  const view = `
      <div class="driver-row__item driver-row__item--first">
        <span class="driver-ranking">${driver.ranking}°</span>
        <div class="driver-points-wrap"><span class="driver-points-label">Points</span><span class="driver-points">${driver.points}</span></div>
      </div>
      <div class="driver-row__item driver-row__item--second">
        <img class="driver-photo" src="images/drivers/${avatar}.png" alt="">
      </div>
      <div class="driver-row__item driver-row__item--third">
        <img class="driver-flag" src="images/flags/${flag}.jpg" alt="">
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
