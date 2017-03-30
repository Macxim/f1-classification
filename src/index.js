require('file-loader?name=[name].[ext]!../index.html');
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

    const filtersButtons = document.querySelectorAll('a.main-nav__button')

    filtersButtons.forEach( (button, i) => {
      filtersButtons[i].addEventListener('click', (e) => {
        const driversContainer = document.getElementById('drivers-list')
        const buttonActiveClass = 'main-nav__button--active'

        filtersButtons.forEach(node => {
          node.classList.remove(buttonActiveClass)
        });
        e.currentTarget.classList.add(buttonActiveClass)

        drivers = sortDataByKey(drivers, filtersButtons[i].dataset.sort)

        // Remove all children of container before appending sorted ones
        while (driversContainer.hasChildNodes()) {
          driversContainer.removeChild(driversContainer.lastChild)
        }

        passDataToView(drivers)
      })
    })

    passDataToView(drivers)

  })
}


function passDataToView(drivers){
  let view;
  const driversContainer = document.getElementById('drivers-list');

  const FLAGS = {
      "Germany": "01",
      "Australia": "02",
      "Brazil": "03",
      "Spain": "04",
      "United Kingdom": "05"
  }

  const AVATARS = {
      "Vettel": "01",
      "Button": "02",
      "Webber": "03",
      "Alonso": "04",
      "Hamilton": "05",
      "Massa": "06",
      "Rosberg": "07",
      "Schumacher": "08"
  }

  drivers.forEach( (driver, i) => {
    //driver.checkUndefinedValues()
    setTimeout( () => {
      view = document.createElement('div')
      view.className = 'driver-row'
      view.setAttribute('draggable', 'true')
      view.innerHTML = DriverView(driver, AVATARS[driver.name], FLAGS[driver.nationality])
      driversContainer.appendChild(view)
      view.classList.add('is-moving-up')

      view.addEventListener('dragstart', handleDragStart, false)
      view.addEventListener('dragover', handleDragOver, false)
      view.addEventListener('dragleave', handleDragLeave, false)
      view.addEventListener('drop', handleDrop, false)
      view.addEventListener('dragend', handleDragEnd, false)

    }, 80 * i);

  })
}

function sortDataByKey (data, prop){
  return data.sort( (a, b) => (a[prop] > b[prop]) )
}

function handleDrop(e) {

  if (e.stopPropagation) {
    e.stopPropagation()
  }

  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html')
  }

  return false
}

function handleDragEnd(e) {
  document.querySelectorAll('.driver-row').forEach( row => {
    row.classList.remove('over')
  });
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault()
  }

  this.classList.add('over')
  e.dataTransfer.dropEffect = 'move'

  return false;
}

function handleDragLeave(e) {
  this.classList.remove('over')
}

let dragSrcEl = null

function handleDragStart(e) {
  this.style.opacity = '0.3'

  dragSrcEl = this

  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/html', this.innerHTML)
}



renderDrivers()




// Views

function DriverView(driver, avatar, flag) {
  const view = `
      <div class="driver-row__item driver-row__item--first">
        <span class="driver-ranking">${driver.ranking}</span>
        <div class="driver-points-wrap"><span class="driver-points">${driver.points}</span><span class="driver-points-label">Points</span></div>
      </div>
      <div class="driver-row__item driver-row__item--second">
        <img class="driver-photo" src="images/drivers/${avatar}.png" alt="">
      </div>
      <div class="driver-row__item driver-row__item--third">
        <img class="driver-flag" src="images/flags/${flag}.svg" alt="">
      </div>
      <span class="driver-nationality">${driver.nationality}</span>
      <div class="driver-details">
        <div><span class="driver-surname">${driver.surname}</span> <span class="driver-name">${driver.name}</span></div>
        <div><span class="driver-team">${driver.team}</span> <span class="driver-team-points">(${driver.teamPoints})</span></div>
      </div>
      <ul class="driver-row__item driver-races-data">
        <li class="driver-races-data__item"><span class="race-data-figure">${driver.lastRace ? driver.lastRace + "°" : "n/a"}</span><span class="races-data-label">Last GP</span></li>
        <li class="driver-races-data__item"><span class="race-data-figure">${driver.wins}</span><span class="races-data-label">Victories</span></li>
        <li class="driver-races-data__item"><span class="race-data-figure">${driver.poles}</span><span class="races-data-label">Poles</span></li>
        <li class="driver-races-data__item"><span class="race-data-figure">${driver.bestPosition}°</span><span class="race-data-figure race-data-figure--tiny">${driver.bestPositionTimes ? "(" + driver.bestPositionTimes + "x)" : ""}</span><span class="races-data-label">Best Position</span></li>
      </ul>
  `
  return view
}
