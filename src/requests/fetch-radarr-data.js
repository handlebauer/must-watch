import { config } from 'dotenv'
import fetch from 'node-fetch'

import { Discord } from '../discord/index.js'

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

export const addMovieToRadarr = async (imdbId, log) => {
  const movie = await fetchMovieDetails(imdbId)

  if (!movie) {
    await Discord.error(new Error('radarr: failed to add new movie'))
    return null
  }

  movie.qualityProfileId = 6
  movie.monitored = true
  movie.minimumAvailability = 'announced'
  movie.addOptions = { searchForMovie: true }
  movie.rootFolderPath = process.env.RADARR_ROOT_FOLDER_PATH

  const url = new URL(process.env.RADARR_HOST)
  url.pathname = process.env.RADARR_PATH
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

  log.add(`  => radarr: added movie (id: ${id})`)

  return id
}
