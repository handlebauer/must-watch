import { config } from 'dotenv'
import fetch from 'node-fetch'

config()

export const fetchOmdbData = async imdbId => {
  const apiKey = 'aa538a64'

  const url = new URL('http://omdbapi.com')
  url.search = new URLSearchParams({ i: imdbId, apikey: apiKey })

  console.log(`    => OMDB: ${url}`)

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Failed with status: ${response.status} (${response.statusText})`
    )
  }

  const { Ratings: rawRatings, Director: director } = await response.json()

  const ratings = rawRatings.map(({ Source: source, Value: value }) => {
    if (source === 'Internet Movie Database') {
      return { name: 'imdb', raw: Number(value.split('/')[0]), value }
    }

    if (source === 'Rotten Tomatoes') {
      return {
        name: 'rotten_tomatoes',
        raw: Number(value.slice(0, -1)),
        value,
      }
    }

    if (source === 'Metacritic') {
      return { name: 'metacritic', raw: Number(value.split('/')[0]), value }
    }

    return {}
  })

  return { director, ratings }
}
