// openModalMovieHandler
import { renderModalMovie } from './renders/renderModalMovie'

export function openModalMovie(e) {
  const id = e.target
    .closest('[data-id]')?.dataset.id
  if (!id) { return }
  renderModalMovie(id)

  const modal = document.querySelector('.modal')
  modal.classList.remove('modal-hide')
}

// getFavorites 

const moviesWrapper = document.querySelector('.movies-wrapper')

export function getFavorites() {
  return [...moviesWrapper.querySelectorAll('.card')]
    .filter(card => card.dataset.star === 'favorite')
    .map(card => card.dataset.id)
}

// Grouping movies by genres 

export function groupMoviesByGenres(movies, genres) {
  //  All geners 
  const allGeners = [...new Set(movies.map(movie => movie[genres]).flat())]

  // Grouping movies by genres
  const moviesByGeners = {}
  for (let value of allGeners) {
    moviesByGeners[value] = movies.filter(movie => movie[genres].includes(value))
  }

  return [allGeners, moviesByGeners]
}