// @ Get all movies from server 
//  and save them to localStorage
import { removeDBdata, setDBdata, getDBdata } from './db'
import { renderAllMoviesGrid } from './renders/renderAllMoviesGrid'

export async function fetchData(url) {
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

    removeDBdata('movies');
    setDBdata('movies', moviesById)

    renderAllMoviesGrid(moviesById)

  } catch (err) {
    console.log(`Problem with fetching data: ${err.message}`)
  }
}