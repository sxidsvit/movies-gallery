import { getDBdata } from './js/db'
import { fetchData } from './js/fetchData'
import { renderFavorites } from './js/renders/renderFavorites'
import { openNodal, clickFavoriteUl } from './js/handlers'

// Constants 

const FullList = `http://my-json-server.typicode.com/moviedb-tech/movies/list`

//  Fetch data from server 

fetchData(FullList)

// @ Render favorite movies list

renderFavorites(getDBdata('favoriteMoviesId'))

// Hendlers 

const movieGallery = document.querySelector('.movie-gallery')
movieGallery.addEventListener('click', openNodal)

const favoriteUl = document.querySelector('.favorite-ul')
favoriteUl.addEventListener('click', clickFavoriteUl)
