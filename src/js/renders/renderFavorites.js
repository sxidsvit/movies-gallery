//  renderFavorites  ===============================

import { getDBdata, removeDBdata, setDBdata } from '../db'

const favoriteUl = document.querySelector('.favorite-ul')

export const renderFavorites = (ids) => {

  let allCards = `<p>You don't have favorite movies</p>`

  if (ids?.length > 0) {

    const movies = getDBdata('movies')
    const favoriteMovies = ids.map(id => movies[id])

    removeDBdata('favoriteMovies')
    setDBdata('favoriteMovies', favoriteMovies)

    allCards = favoriteMovies.map(({ id, name }) => {
      return `
      <li class="favorite-text" data-id="${id}">
      <span class="favorite-name">&rarr;&nbsp;&nbsp;${name}</span>
      <span class="delete-mark" data-id="${id}">&times;</span>
      
      </li>
      `
    }).join('')
  }

  favoriteUl.innerHTML = ""
  favoriteUl.innerHTML = allCards
}
