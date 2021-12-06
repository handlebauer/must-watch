import { config } from 'dotenv'
import fetch from 'node-fetch'

import { TMDB_BASE_URL, TMDB_API_VERSION } from '../constants.js'

config()

export const fetchTmdbData = async imdbId => {
  const url = new URL(`${TMDB_BASE_URL}/${TMDB_API_VERSION}/find/${imdbId}`)
  url.search = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY,
    external_source: 'imdb_id',
  })

  // Log
  console.log(`TMDB URL: ${url}`)

  let response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Failed with status: ${response.status} (${response.statusText})`
    )
  }

  const { movie_results: movieResults } = await response.json()

  if (movieResults.length === 0) {
    return null
  }

  const [
    {
      title: englishTitle,
      original_title: originalTitle = '',
      overview,
      poster_path: posterPath,
    },
  ] = movieResults

  url.pathname = `/${TMDB_API_VERSION}/configuration`
  url.searchParams.delete('external_source')

  response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Failed with status: ${response.status} (${response.statusText})`
    )
  }

  const {
    images: { secure_base_url: baseUrl, poster_sizes: posterSizes },
  } = await response.json()

  return {
    title:
      englishTitle +
      (englishTitle !== originalTitle ? ` - ${originalTitle}` : ''),
    overview,
    posterUrl: baseUrl + posterSizes[3] + posterPath,
  }
}
