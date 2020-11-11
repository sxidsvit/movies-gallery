//  renderAllMovies ==================
import { getDBdata } from '../db'

const moviesWrapper = document.querySelector('.movies-wrapper')

export function renderAllMovies(movies) {

  if (!movies) {
    moviesWrapper.innerHTML = ''
    moviesWrapper.innerHTML =
      `
      <div class="allert-warning text-center " > localStorage empty</ >
        <div class="allert-warning text-center ">Reload the app to get movies from the server</div>
      `
    return
  }

  const allCards = Object.values(movies).map(({ id, img, name, year }) => {

    // get favorite movies from localStorage
    let favoriteMoviesId = getDBdata('favoriteMoviesId')

    const dataAtributes = favoriteMoviesId?.includes(id.toString())
      ? `data-id="${id}" data-star="favorite"`
      : `data-id="${id}" data-star="white" `

    const starColor = favoriteMoviesId?.includes(id.toString())
      ? 'star-gold' : 'star-white'

    return `
        <div class="card" ${dataAtributes}" >
        <div class="star ${starColor}" ></div>
        <img src="${img}" class="movie-img" alt="${name}">
        <div class="movie-body">
          <p class="movie-text text-center">${name}</p>
          <p class="movie-text text-center">${year}</p>
        </div>
      </div>
      `
  }).join('')

  moviesWrapper.innerHTML = ''
  moviesWrapper.innerHTML = allCards
}
