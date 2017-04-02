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

export { handleDrop, handleDragEnd, handleDragOver, handleDragLeave, handleDragStart };
