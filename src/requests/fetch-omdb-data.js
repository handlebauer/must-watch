import { config } from 'dotenv'
import fetch from 'node-fetch'

config()

export const fetchOmdbData = async imdbId => {
  const apiKey = 'aa538a64'

  const url = new URL('http://omdbapi.com')
  url.search = new URLSearchParams({ i: imdbId, apikey: apiKey })

  // Log
  console.log(`OMDB URL: ${url}`)

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Failed with status: ${response.status} (${response.statusText})`
    )
  }

  const { Ratings: rawRatings, Director: director } = await response.json()

  const ratings = rawRatings.map(({ Source: source, Value: value }) => {
    if (source === 'Internet Movie Database') {
      return { name: 'IMDB', raw: Number(value.split('/')[0]), value }
    }

    if (source === 'Rotten Tomatoes') {
      return {
        name: 'Rotten Tomates',
        raw: Number(value.substring(0, 2)),
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
