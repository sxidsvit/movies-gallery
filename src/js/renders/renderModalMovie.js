//  renderModalMovie   =====================

import { addModalMovieListener } from '../listeners'
import { getDBdata } from '../db'

const movieContent = document.querySelector('.modal > .movie-content')

export const renderModalMovie = (id) => {

  const modalMovie = getDBdata('movies').[id]

  if (!modalMovie) {
    movieContent.innerHTML = ''
    movieContent.innerHTML =
      `
      <div class="allert-warning text-center">localStorage empty. &nbsp;</div>
      <div class="allert-warning text-center ">Reload app to get movies from the server</div>
      `
    return
  }

  const { name, img, description, year, genres, director, starring } = modalMovie

  const genresList = genres
    .map(genre => `<span>${genre}</span>`)
    .join('')

  const starringList = starring
    .map(star => `&nbsp;<span>${star}</span>`)
    .join(',')

  const content = `
      <div class="modal-close">&times;</div>
      <div class="movie-content-left">
        <img src=${img} class="movie-img"
          alt="${name}">
        <div class="movie-star-year">
          <div class="movie-star">&star;</div>
          <div class="movie-year">${year}</div>
        </div>
        <div class="movie-geners">${genresList}
        </div>
      </div>
     
      <div class="movie-content-right">
        <div class="movie-title">${name}</div>
        <div class="movie-description">
         ${description}
        </div>
        <div class="movie-director">
          <span class="movie-text-bold">Director:</span>
          ${director}
        </div>
        <div class="movie-starting">
          <span class="movie-text-bold">Starting 2:&nbsp;</span>
          ${starringList}
          <span>Tony Goldwyn&nbsp;</span>
        </div>
       </div>

      </div>
    `
  movieContent.innerHTML = ''
  movieContent.innerHTML = content
  addModalMovieListener()
}
