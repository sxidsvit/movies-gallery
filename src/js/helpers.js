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
  const moviesByGeners = { 'all': movies }
  for (let value of allGeners) {
    moviesByGeners[value] = movies.filter(movie => movie[genres].includes(value))
  }

  allGeners.unshift('all')

  return [allGeners, moviesByGeners]
}

//  Truncate paragraph length

export function truncate(str, len) {
  if (str.length > len && str.length > 0) {
    let new_str = str + ' '
    new_str = str.substr(0, len)
    new_str = str.substr(0, new_str.lastIndexOf(' '))
    new_str = new_str.length > 0 ? new_str : str.substr(0, len)
    return new_str + '...'
  }
  return str
}