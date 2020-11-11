import { getDBdata } from './js/db'
import { fetchData } from './js/fetchData'
import { renderAllMovies } from './js/renders/renderAllMovies'
import { renderFavorites } from './js/renders/renderFavorites'
import { openNodal, clickFavoriteUl } from './js/handlers'

// Constants 

const FullList = `http://my-json-server.typicode.com/moviedb-tech/movies/list`

//  Fetch data from server 

fetchData(FullList)

// @ Render all movies


renderAllMovies(getDBdata('movies'))

// @ Render favorite movies 

renderFavorites(getDBdata('favoriteMoviesId'))

// Hendlers 

const movieGallery = document.querySelector('.movie-gallery')
movieGallery.addEventListener('click', openNodal)

const favoriteUl = document.querySelector('.favorite-ul')
favoriteUl.addEventListener('click', clickFavoriteUl)
