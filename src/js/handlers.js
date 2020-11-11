//  addModalMovieListener ==========

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

//  markFavoriteMovies

import { getFavorites } from './helpers'
import { setDBdata, removeDBdata } from './db'

function markFavoriteMovies(e) {
  const star = e.target.closest('.star')
  if (star.classList.contains('star-gold')) {
    star.classList.remove('star-gold')
    star.classList.add('star-white')
  } else {
    star.classList.remove('star-white')
    star.classList.add('star-gold')
  }

  const card = e.target.closest('.card')
  card.dataset.star === "white"
    ? card.dataset.star = "favorite"
    : card.dataset.star = "white"
  const favoriteMoviesId = getFavorites()

  removeDBdata('favoriteMoviesId');

  setDBdata('favoriteMoviesId', favoriteMoviesId)

  return favoriteMoviesId
}

//  openNodal callback

import { renderFavorites } from './renders/renderFavorites'
import { openModalMovie } from './helpers'

export function openNodal(e) {
  if (e.target.closest('.star')) {
    const favoriteMoviesId = markFavoriteMovies(e)
    renderFavorites(favoriteMoviesId)
  }

  if (e.target.closest('.movie-img')) {
    openModalMovie(e)
  }

  if (e.target.closest('.favorite-name')) {
    openModalMovie(e)
  }
}


//  clickFavoriteUl callback 
const moviesWrapper = document.querySelector('.movies-wrapper')

import { getDBdata } from './db'
// import { getDBdata, setDBdata, removeDBdata } from './db'

export function clickFavoriteUl(e) {
  const item = e.target.closest('.delete-mark')

  if (item) {
    const idRemove = item.dataset.id

    // Reset favorite for Movie Galary (data-atribute & class)

    let card = [...moviesWrapper.querySelectorAll('.card')]
      .filter(elem => +elem.dataset.id === +idRemove)[0]

    card.dataset.star === "white" ? card.dataset.star = "favorite" : card.dataset.star = "white"

    card.querySelector('.star').classList.remove('star-gold')
    card.querySelector('.star').classList.add('star-white')

    // Reset favorite movies' 

    let favoriteMovies = getDBdata('favoriteMovies')
    let newFavoriteMovies = favoriteMovies.filter(movie => +movie.id !== +idRemove)
    removeDBdata('favoriteMovies')
    setDBdata('favoriteMovies', newFavoriteMovies)

    // Reset favorite movies' id

    let favoriteMoviesId = getDBdata('favoriteMoviesId')
    let newFavoriteMoviesId = favoriteMoviesId.filter(id => id !== idRemove)
    removeDBdata('favoriteMoviesId')
    setDBdata('favoriteMoviesId', newFavoriteMoviesId)

    renderFavorites(newFavoriteMoviesId)
  }
}