function showMenu(e, id) {
  e.target.classList.add('place-active')
  e.target.focus()
  
  if(e.target.tagName == "SPAN") {
    window.location.href = '../success';
    return
  }
  
  e.target.querySelector('.place-menu').innerHTML = `
  <h4>Рабочее место ${id}</h4>
  <p>Оборудование: монитор, мышка, клавиатура</p>
  <span>Забронировать место</span>
  `
  
  e.target.onblur = function() {
    e.target.classList.remove('place-active')
  }
}