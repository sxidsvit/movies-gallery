// @ Get all movies from remote server 
//  and save them to localStorage
import { removeDBdata, setDBdata, getDBdata } from './db'
import { renderAllMoviesGrid } from './renders/renderAllMoviesGrid'
import { groupMoviesByGenres } from './helpers'

// Fetch movies from remote server

export async function fetchData(url) {
  try {
    const response = await fetch(url)
    const movies = await response.json()
    movies.map(item => {
      if (item.name === 'The Matrix') {
        item.img = "https://image.tmdb.org/t/p/w500/zE3dfBIYNMBXQrhQaCyZl99wwS0.jpg"
      }
    })
    const idSet = new Set(movies.map(movie => movie.id))
    const moviesById = {}
    for (let value of idSet) {
      moviesById[value] = movies.filter(item => item.id === value)[0]
    }

    removeDBdata('movies');
    setDBdata('movies', moviesById)

    // Grouping movies by genres 

    const [allGeners, moviesByGeners] = groupMoviesByGenres(movies, 'genres')

    removeDBdata('genres');
    setDBdata('genres', allGeners)
    removeDBdata('moviesByGenres');
    setDBdata('moviesByGenres', moviesByGeners)


    const selectedGenre = getDBdata('selectedGenre') ?? 'all'
    renderAllMoviesGrid(moviesByGeners[selectedGenre])

  } catch (err) {
    console.log(`Problem with fetching data: ${err.message}`)
  }
}