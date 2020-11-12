//  renderAllMovies ==================
import { getDBdata } from '../db'
import { truncate } from '../utils'

const moviesWrapper = document.querySelector('.movies-wrapper')

export function renderAllMovies(movies) {

  if (!movies) {
    console.log('movies: ', movies);
    moviesWrapper.innerHTML = ''
    moviesWrapper.innerHTML =
      `
      <div class="allert-warning text-center " > localStorage empty</ >
        <div class="allert-warning text-center ">Reload the app to get movies from the server</div>
      `
    return
  }

  const allCards = Object.values(movies).map(({ id, img, name, year, description, genres }) => {

    // get favorite movies from localStorage
    let favoriteMoviesId = getDBdata('favoriteMoviesId')

    const dataAtributes = favoriteMoviesId?.includes(id.toString())
      ? `data-id="${id}" data-star="favorite"`
      : `data-id="${id}" data-star="white" `

    const starColor = favoriteMoviesId?.includes(id.toString())
      ? 'star-gold' : 'star-white'

    const genresList = genres
      .map(genre => `<span>${genre}</span>`)
      .join('')

    return `
        <div class="card list" ${dataAtributes}" >
          <div class="star ${starColor}" ></div>
          <div class="movie-content-left">
 
           <img src="${img}" class="movie-img" alt="${name}">
          </div>

          <div class="movie-content-rigth">

            <div class="movie-title">
              <span class="movie-text text-center">${name}</span>
              <span class="movie-text text-center">${year}</span>
            </div>

            <div class="movie-description">
              ${truncate(description, 120)}
            </div>

            <div class="movie-geners">
             ${genresList}
            </div>

          </div>

        </div>
      `
  }).join('')

  moviesWrapper.innerHTML = ''
  moviesWrapper.innerHTML = allCards
}
