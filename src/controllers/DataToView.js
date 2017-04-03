import { DriverView } from '../view/';
import { handleDrop, handleDragEnd, handleDragOver, handleDragLeave, handleDragStart } from './DragAndDrop';


export function passDataToView(drivers){
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
