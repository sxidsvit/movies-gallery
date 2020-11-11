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

// ==============================

const moviesWrapper = document.querySelector('.movies-wrapper')

export function getFavorites() {
  return [...moviesWrapper.querySelectorAll('.card')]
    .filter(card => card.dataset.star === 'favorite')
    .map(card => card.dataset.id)
}
