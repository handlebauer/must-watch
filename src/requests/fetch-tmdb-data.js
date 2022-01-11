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

  console.log(`    => TMDB: ${url}`)

  let response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Failed with status: ${response.status} (${response.statusText})`
    )
  }

  const { movie_results: movieResults, tv_results: tvResults } =
    await response.json()

  let result

  if (movieResults.length === 1) {
    url.pathname = `/${TMDB_API_VERSION}/movie/${imdbId}`
    url.searchParams.delete('external_source')

    response = await fetch(url)

    if (!response.ok) {
      throw new Error(
        `Failed with status: ${response.status} (${response.statusText})`
      )
    }

    const movie = await response.json()

    result = {
      type: 'Movie',
      title: movie.title,
      originalTitle: movie.original_title,
      overview: movie.overview,
      genres: movie.genres,
      languages: movie.spoken_languages,
      runtime: movie.runtime,
      posterPath: movie.poster_path,
    }
  } else if (tvResults.length == 1) {
    const [{ id: tvId }] = tvResults
    url.pathname = `/${TMDB_API_VERSION}/tv/${tvId}`
    url.searchParams.delete('external_source')

    response = await fetch(url)

    if (!response.ok) {
      throw new Error(
        `Failed with status: ${response.status} (${response.statusText})`
      )
    }
    const tvShow = await response.json()

    const [startYear] = tvShow.first_air_date.split('-')
    const [endYear] = tvShow.last_air_date.split('-')

    result = {
      type: tvShow.type,
      title: tvShow.name,
      originalTitle: tvShow.original_name,
      year: startYear === endYear ? startYear : `${startYear}-${endYear}`,
      overview: tvShow.overview,
      genres: tvShow.genres,
      languages: tvShow.spoken_languages,
      runtime: tvShow.episode_run_time[0],
      posterPath: tvShow.poster_path,
    }
  } else {
    return null
  }

  url.pathname = `/${TMDB_API_VERSION}/configuration`

  response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Failed with status: ${response.status} (${response.statusText})`
    )
  }

  const {
    images: { secure_base_url: baseUrl, poster_sizes: posterSizes },
  } = await response.json()

  const { posterPath, ...rest } = result

  return {
    ...rest,
    posterUrl: baseUrl + posterSizes[3] + posterPath,
  }
}
