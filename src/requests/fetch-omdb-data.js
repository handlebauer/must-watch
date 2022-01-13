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

  const {
    Ratings: rawRatings,
    Director: director,
    Error: error,
  } = await response.json()

  if (error) {
    return null
  }

  const ratings = rawRatings.map(({ Source: source, Value: value }) => {
    if (source === 'Rotten Tomatoes') {
      return {
        name: 'Rotten Tomatoes',
        raw: Number(value.slice(0, -1)),
        value,
      }
    }

    if (source === 'Metacritic') {
      return { name: 'Metacritic', raw: Number(value.split('/')[0]), value }
    }

    return null
  })

  return { director, ratings }
}
