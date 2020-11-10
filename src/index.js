// Constants ===========================

const FullList = `http://my-json-server.typicode.com/moviedb-tech/movies/list`


// DOM elements ===========================

const moviesWrapper = document.querySelector('.movies-wrapper')
const favoriteUl = document.querySelector('.favorite-ul')
const movieContent = document.querySelector('.modal > .movie-content')
console.log('movieContent: ', movieContent);

//  Functions ===========================

//  @ Get information about films
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

// @ All movies 
fetchData(FullList)

// Movie with predefined value id 
// const id = 7
// const oneMovie = `${FullList}/${id}`
// fetchData(oneMovie)

// @ Render all movies

const renderAllMovies = (movies) => {
  const allCards = Object.values(movies).map(({ id, img, name, year }) => {

    return `
      <div class="card" data-id="${id}" data-star="white">
        <div class="star star-white" ></div>
        <img src="${img}" class="movie-img" alt="${name}">
        <div class="movie-body">
          <p class="movie-text text-center">${name}</p>
          <p class="movie-text text-center">${year}</p>
        </div>
      </div>
    `
  }).join('')
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
      <span>&rarr;&nbsp;&nbsp;${name}</span>
      <span class="delete-mark" data-id="${id}">&times;</span>
      
      </li>
      `
    }).join('')
  }

  favoriteUl.innerHTML = ""
  favoriteUl.innerHTML = allCards
}

// @ Get favorites movies 

const getFavorites = () => {
  return [...moviesWrapper.querySelectorAll('.card')]
    .filter(card => card.dataset.star === 'favorite')
    .map(card => card.dataset.id)
}

// @ Render modal movie 

const renderModalMovie = () => {
  // const allCards = Object.values(movies).map(({ id, img, name, year }) => {

  return `
<div class="modal-close">&times;</div>
      <div class="movie-content-left">
        <img src="https://images-na.ssl-images-amazon.com/images/I/5147KKVUmkL._SX342_.jpg" class="movie-img"
          alt="The Mechanic">
        <div class="movie-star-year">
          <div class="movie-star">&star;</div>
          <div class="movie-year">2010</div>
        </div>
        <div class="movie-geners">
          <span>action</span>
          <span>crime</span>
          <span>USA</span>
        </div>
      </div>
      <div class="movie-content-rigth">
        <div class="movie-title">The Mechanic</div>
        <div class="movie-description">
          Statham stars as Arthur Bishop, a professional assassin who specializes in making his hits look like
          accidents, suicides,
          or the acts of petty criminals.
        </div>
        <div class="movie-director">
          <span class="movie-text-bold">Director:</span>
          Simon West
        </div>
        <div class="movie-starting">
          <span class="movie-text-bold">Starting:&nbsp;</span>
          <span>Jason Statham,&nbsp;</span>
          <span>Ben Foster,&nbsp;</span>
          <span>Donald Sutherland,&nbsp;</span>
          <span>Tony Goldwyn&nbsp;</span>
        </div>
      </div>
    `
}
const modalMovie = renderModalMovie()
movieContent.innerHTML = ''
movieContent.innerHTML = modalMovie

// Hendlers ===========================

// Set favoriets
moviesWrapper.addEventListener('click', (e) => {
  if (e.target.closest('.star')) {
    const star = e.target.closest('.star')
    star.classList.toggle('star-gold')

    const card = e.target.closest('.card')
    card.dataset.star === "white" ? card.dataset.star = "favorite" : card.dataset.star = "white"
    const favoriteMoviesId = getFavorites()

    localStorage.removeItem('favoriteMoviesId');
    localStorage.setItem('favoriteMoviesId', JSON.stringify(favoriteMoviesId))

    renderFavorites(favoriteMoviesId)
  }
})

// remove favorites
favoriteUl.addEventListener('click', (e) => {
  const item = e.target.closest('.delete-mark')

  if (item) {
    const idRemove = item.dataset.id

    // Reset favorite for Movie Galary (data-atribute & class)

    let card = [...moviesWrapper.querySelectorAll('.card')]
      .filter(elem => +elem.dataset.id === +idRemove)[0]

    card.dataset.star === "white" ? card.dataset.star = "favorite" : card.dataset.star = "white"

    card.querySelector('.star').classList.remove('star-gold')

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
