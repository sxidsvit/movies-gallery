import { getDBdata } from './js/db'
import { fetchData } from './js/fetchData'
import { renderFavorites } from './js/renders/renderFavorites'
import { openNodal, clickFavoriteUl, changeMoviesLayout, changeSelectedGener } from './js/handlers'
// import { renderDashboard } from './js/renders/renderDashboard'

// Constants 

const FullList = `http://my-json-server.typicode.com/moviedb-tech/movies/list`

//  Fetch data from server 

fetchData(FullList)

// @ Render favorite movies list

renderFavorites(getDBdata('favoriteMoviesId'))

// EventListeners

// @ Movies gallery wrapper
const moviesGallery = document.querySelector('.movie-gallery')
moviesGallery.addEventListener('click', openNodal)

// @ Favorite list
const favoriteUl = document.querySelector('.favorite-ul')
favoriteUl.addEventListener('click', clickFavoriteUl)
