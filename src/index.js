import { getDBdata } from './js/db'
import { fetchData } from './js/fetchData'
import { renderFavorites } from './js/renders/renderFavorites'
import { openNodal, clickFavoriteUl, changeMoviesLayout } from './js/handlers'

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

const dashboardView = document.querySelector('.dashboard-view')
dashboardView.addEventListener('click', changeMoviesLayout)

const movieGallery = document.querySelector('.movie-gallery')
movieGallery.addEventListener('click', openNodal)

const favoriteUl = document.querySelector('.favorite-ul')
favoriteUl.addEventListener('click', clickFavoriteUl)
