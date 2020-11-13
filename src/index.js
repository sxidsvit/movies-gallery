import { getDBdata } from './js/db'
import { fetchData } from './js/fetchData'
import { renderFavorites } from './js/renders/renderFavorites'
import { openNodal, clickFavoriteUl, changeMoviesLayout, changeSelectedGener } from './js/handlers'

import { renderDashboard } from './js/renders/renderDashboard'

// Constants 

const FullList = `http://my-json-server.typicode.com/moviedb-tech/movies/list`

//  Fetch data from server 

fetchData(FullList)

// @ Render dashboard

renderDashboard()

// @ Render favorite movies list

renderFavorites(getDBdata('favoriteMoviesId'))

// EventListeners

//  @ Geners' selector
const customSelect = document.querySelector('.custom-select')
customSelect.addEventListener('click', changeSelectedGener)

//  @ Movies view (grid/list) selector
const dashboardView = document.querySelector('.dashboard-view')
dashboardView.addEventListener('click', changeMoviesLayout)

// @ Movies gallery wrapper
const moviesGallery = document.querySelector('.movie-gallery')
moviesGallery.addEventListener('click', openNodal)

// @ Favorite list
const favoriteUl = document.querySelector('.favorite-ul')
favoriteUl.addEventListener('click', clickFavoriteUl)
