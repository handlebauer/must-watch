import { config } from 'dotenv'
import fetch from 'node-fetch'

config()

export const fetchMovieDetails = async imdbId => {
  const url = new URL(process.env.RADARR_HOST)
  url.pathname = 'api/v3/movie/lookup'
  url.search = new URLSearchParams({
    apiKey: process.env.RADARR_API_KEY,
    term: `imdb:${imdbId}`,
  })

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Failed with status: ${response.status} (${response.statusText})`
    )
  }

  const [movie] = await response.json()

  return movie
}

export const addMovieToRadarr = async imdbId => {
  const movie = await fetchMovieDetails(imdbId)

  if (!movie) {
    console.log(`  => radarr: failed to add new movie`)
    return null
  }

  movie.qualityProfileId = 6
  movie.monitored = true
  movie.minimumAvailability = 'announced'
  movie.addOptions = { searchForMovie: true }
  movie.rootFolderPath = process.env.RADARR_ROOT_FOLDER_PATH

  const url = new URL(process.env.RADARR_HOST)
  url.pathname = 'api/v3/movie'
  url.search = new URLSearchParams({
    apiKey: process.env.RADARR_API_KEY,
    term: `imdb:${imdbId}`,
  })

  const init = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie),
  }

  const response = await fetch(url, init)

  if (!response.ok) {
    throw new Error(
      `Adding movie to radarr failed with status: ${response.status} (${response.statusText})`
    )
  }

  const { id } = await response.json()

  if (id) {
    console.log(`  => radarr: added new movie (id: ${id})`)
    return id
  }

  return null
}
