import { getJSON, sortDataByKey } from '../utils/';
import Driver from '../models/';
import { passDataToView } from './DataToView';


export function renderDrivers() {

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

renderDrivers()
