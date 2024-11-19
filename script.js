let dgragId;

let stepText = [
  {
    title: 'Шаг 1',
    text: 'Прежде чем бронировать место, пользователю нужно выбрать офис. Перетащите нужный вариант на активный шаг.'
  },
  {
    title: 'Шаг 2',
    text: 'Отлично! Пользователь выбрал нужный офис. Но есть ли в нем доступные места? Нужно проверить'
  },
  {
    title: 'Шаг 3',
    text: 'Да, есть несколько свободных мест. Но мы об этом знаем, а пользователь еще нет :)'
  },
  {
    title: 'Шаг 4',
    text: 'Прекрасно! Пользователь увидел схему офиса. Так, это место вроде подходит...'
  },
  {
    title: 'Шаг 5',
    text: 'Место выбрано. Но вдруг его уже забрал кто-то другой?'
  },
  {
    title: 'Шаг 6',
    text: 'Ура, место свободно! Теперь дело за малым - сообщим пользователю об успешном бронировании'
  },
  {
    title: 'Ура, всё на месте!',
    text: 'Пользователь нашел своё уютное местечко у окна, а вы научились составлять упрощенную блок-схему'
  }
]

function dragover_handler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

function dragenter_handler(ev) {
  ev.preventDefault();
  ev.target.classList.add('scheme-item-enter')
}

function dragleave_handler(ev) {
  ev.preventDefault();
  ev.target.classList.remove('scheme-item-enter')
}


function drop_handler(ev) {
  ev.preventDefault();
  ev.target.classList.remove('scheme-item-enter')
  let idNumber = ev.target.id.replace('step-0', '')
  
  if (dgragId == 'variant-0' + idNumber) {
    document.getElementById(dgragId).style.display = 'none'
    ev.target.classList.add('scheme-item-done')
    ev.target.innerText = document.getElementById(dgragId).innerText
    
    stepDescription(idNumber)
  } else {
    ev.target.classList.add('scheme-item-error')
    
    setTimeout(() => {
      ev.target.classList.remove('scheme-item-error')
    }, 1000)
    
    return
  }
  
  if (idNumber == '6') {
    finalStepStyle()
    document.querySelector('.scheme-end').classList.add('scheme-start')
    return
  }
  
  previewSwitch(idNumber)
  stepSwitch(idNumber)
  stepperSet(idNumber)
}

function stepDescription(id) {
  let h1 = document.querySelector('.step-description h1')
  let p = document.querySelector('.step-description p')
  
  h1.innerText = stepText[Number(id)].title
  p.innerText = stepText[Number(id)].text
}

function stepperSet(id) {
  let current = document.querySelector(`.stepper .stepper-item:nth-child(${id})`)
  let next = document.querySelector(`.stepper .stepper-item:nth-child(${Number(id)+1})`)
  
  current.classList.remove('stepper-item-active')
  next.classList.add('stepper-item-filled')
  next.classList.add('stepper-item-active')
}

function finalStepStyle() {
  document.querySelector('.step-description').classList.add('step-description-final')
  document.querySelector('.stepper').style.display = 'none'
  document.querySelector('.variant-wrapper').style.display = 'none'
}


function dragstart_handler(ev) {
  dgragId = ev.target.id
  ev.dataTransfer.effectAllowed = "move";
}


function stepSwitch(id) {
  let current = document.getElementById(`step-0${id}`)
  let next = document.getElementById(`step-0${Number(id) + 1}`)
  
  current.removeAttribute(ondrop)
  current.removeAttribute(ondragover)
  current.removeAttribute(ondragenter)
  current.removeAttribute(ondragleave)
  
  next.setAttribute('ondrop', 'drop_handler(event)')
  next.setAttribute('ondragover', 'dragover_handler(event)')
  next.setAttribute('ondragenter', 'dragenter_handler(event)')
  next.setAttribute('ondragleave', 'dragleave_handler(event)')
  next.classList.add('scheme-item-active')
}


function previewSwitch(id) {
  let img = document.querySelector('.preview-image')
  img.setAttribute('src', `assets/preview-0${Number(id)+1}.svg`)
  img.classList.add('preview-image-animation')
  setTimeout(() => {
    img.classList.remove('preview-image-animation')
  }, 500)
}