export function DriverView(driver, avatar, flag) {
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
