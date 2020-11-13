//  addModalMovieListener 

export function addModalMovieListener() {

  const modal = document.querySelector('.modal')
  const closeModalHandler = (e) => {
    e.preventDefault()
    const target = e.target
    if (target.classList.contains('modal')
      || target.classList.contains('modal-close')) {
      modal.classList.add('modal-hide')
      modal.removeEventListener('click', closeModalHandler)
    }
  }

  modal.addEventListener('click', closeModalHandler)
}

//  addDashboardListener

import { changeSelectedGener, changeMoviesLayout } from './handlers'

export function addDashboardListener() {

  const customSelect = document.querySelector('.custom-select')
  customSelect.addEventListener('click', changeSelectedGener)

  //  @ Movies view (grid/list) selector
  const dashboardView = document.querySelector('.dashboard-view')
  dashboardView.addEventListener('click', changeMoviesLayout)
}
