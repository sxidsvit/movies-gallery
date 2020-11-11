// Constants ===========================

const FullList = `http://my-json-server.typicode.com/moviedb-tech/movies/list`


// DOM elements ===========================

const movieGallery = document.querySelector('.movie-gallery')
const moviesWrapper = document.querySelector('.movies-wrapper')
const favoriteUl = document.querySelector('.favorite-ul')
const movieContent = document.querySelector('.modal > .movie-content')


//  Functions ===========================

// @ Get all movies from server 
//  and save them to localStorage

const fetchData = async (url) => {
  try {
    const response = await fetch(url)
    const movies = await response.json()
    movies.map(item => {
      if (item.name === 'The Matrix') {
        item.img = "https://image.tmdb.org/t/p/w500/zE3dfBIYNMBXQrhQaCyZl99wwS0.jpg"
      }
    })
    const mySet = new Set(movies.map(movie => movie.id))
    const moviesById = {}
    for (let value of mySet) {
      moviesById[value] = movies.filter(item => item.id === value)[0]
    }
    localStorage.removeItem('movies');
    localStorage.setItem('movies', JSON.stringify(moviesById))
  } catch (err) {
    console.log(`Problem with fetching data: ${err.message}`)
  }
}
fetchData(FullList)

// @ Render all movies

const renderAllMovies = (movies) => {

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
    let favoriteMoviesId = JSON.parse(localStorage.getItem('favoriteMoviesId'))

    const dataAtributes = favoriteMoviesId.includes(id.toString())
      ? `data-id="${id}" data-star="favorite"`
      : `data-id="${id}" data-star="white" `

    const starColor = favoriteMoviesId.includes(id.toString())
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

renderAllMovies(JSON.parse(localStorage.getItem('movies')))

// @ Render favorite movies 

const renderFavorites = (ids) => {

  let allCards = `<p>You don't have favorite movies</p>`

  if (ids.length > 0) {

    const movies = JSON.parse(localStorage.getItem('movies'))
    const favoriteMovies = ids.map(id => movies[id])

    localStorage.removeItem('favoriteMovies')
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies))

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

renderFavorites(JSON.parse(localStorage.getItem('favoriteMoviesId')))

// @ Render modal movie 

const renderModalMovie = (id) => {

  const modalMovie = JSON.parse(localStorage.getItem('movies')).[id]

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
      <div class="movie-content-rigth">
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
    `
  movieContent.innerHTML = ''
  movieContent.innerHTML = content
  addModalMovieListener()
}

// @ Select Favorite Movies

function selectFavoriteMovies(e) {
  const star = e.target.closest('.star')
  star.classList.toggle('star-gold')

  const card = e.target.closest('.card')
  card.dataset.star === "white" ? card.dataset.star = "favorite" : card.dataset.star = "white"
  const favoriteMoviesId = getFavorites()

  localStorage.removeItem('favoriteMoviesId');
  localStorage.setItem('favoriteMoviesId', JSON.stringify(favoriteMoviesId))

  return favoriteMoviesId
}

// @ Get favorites movies 

const getFavorites = () => {
  return [...moviesWrapper.querySelectorAll('.card')]
    .filter(card => card.dataset.star === 'favorite')
    .map(card => card.dataset.id)
}

// @ Open modal 

function openModalMovieHandler(e) {
  const id = e.target
    .closest('[data-id]')?.dataset.id
  if (!id) { return }
  renderModalMovie(id)

  const modal = document.querySelector('.modal')
  modal.classList.remove('modal-hide')
}

// @ Add modal movie listener

function addModalMovieListener() {

  const modal = document.querySelector('.modal')
  const closeModalHandler = (e) => {
    e.preventDefault()
    const target = e.target
    if (target.classList.contains('modal')
      || target.classList.contains('modal-close')) {
      modal.classList.add('modal-hide')
      modal.removeEventListener('click', closeModalHandler)
    }
  }

  modal.addEventListener('click', closeModalHandler)
}


// Hendlers ===========================

// Open Modal
movieGallery.addEventListener('click', (e) => {

  if (e.target.closest('.star')) {
    const favoriteMoviesId = selectFavoriteMovies(e)
    renderFavorites(favoriteMoviesId)
  }

  if (e.target.closest('.movie-img')) {
    openModalMovieHandler(e)
  }

  if (e.target.closest('.favorite-name')) {
    openModalMovieHandler(e)
  }

})

// Set favoriets
favoriteUl.addEventListener('click', (e) => {
  const item = e.target.closest('.delete-mark')

  if (item) {
    const idRemove = item.dataset.id

    // Reset favorite for Movie Galary (data-atribute & class)

    let card = [...moviesWrapper.querySelectorAll('.card')]
      .filter(elem => +elem.dataset.id === +idRemove)[0]

    card.dataset.star === "white" ? card.dataset.star = "favorite" : card.dataset.star = "white"

    card.querySelector('.star').classList.remove('star-gold')
    card.querySelector('.star').classList.add('star-white')

    // Reset favorite movies' 

    let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'))
    let newFavoriteMovies = favoriteMovies.filter(movie => +movie.id !== +idRemove)
    localStorage.removeItem('favoriteMovies')
    localStorage.setItem('favoriteMovies', JSON.stringify(newFavoriteMovies))

    // Reset favorite movies' id

    let favoriteMoviesId = JSON.parse(localStorage.getItem('favoriteMoviesId'))
    let newFavoriteMoviesId = favoriteMoviesId.filter(id => id !== idRemove)
    localStorage.removeItem('favoriteMoviesId')
    localStorage.setItem('favoriteMoviesId', JSON.stringify(newFavoriteMoviesId))

    renderFavorites(newFavoriteMoviesId)
  }
})
