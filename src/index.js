// Constants 
const FullList = `http://my-json-server.typicode.com/moviedb-tech/movies/list`

// DOM elements
const moviesWrapper = document.querySelector('.movies-wrapper')
const favoriteUl = document.querySelector('.favorite-ul')

//  Functions 

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
    localStorage.removeItem('movies');
    localStorage.setItem('movies', JSON.stringify(movies))
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

// @ Render all cards 

const renderAllCards = (movies) => {
  const allCards = movies.map(({ id, img, name, year }) => {
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

renderAllCards(JSON.parse(localStorage.getItem('movies')))

const renderFavorites = (ids) => {

  let allCards = `<p>You don't have favorite movies</p>`

  if (ids.length > 0) {

    const movies = JSON.parse(localStorage.getItem('movies'))
    const mySet = new Set(movies.map(movie => movie.id))
    const groupObj = {}
    for (let value of mySet) {
      groupObj[value] = movies.filter(item => item.id === value)[0]
    }

    const favoriteMovies = ids.map(id => groupObj[id])
    console.log('favoriteMovies: ', favoriteMovies);


    allCards = favoriteMovies.map(({ name }) => {
      return `
      <li class="favorite-text">
      <span>&rarr;&nbsp;&nbsp;${name}</span>
      <span class="delete-mark">&times;</span>
      
      </li>
      `
    }).join('')
  }

  favoriteUl.innerHTML = ""
  favoriteUl.innerHTML = allCards
}


const getFavorites = () => {
  return [...moviesWrapper.querySelectorAll('.card')]
    .filter(card => card.dataset.star === 'favorite')
    .map(card => card.dataset.id)
}


// Hendlers 

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
