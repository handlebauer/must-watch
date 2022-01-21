import { config } from 'dotenv'
import fetch from 'node-fetch'

import {
  fetchMetacriticReviewCount,
  fetchRottenTomatoesReviewCount,
} from './index.js'

config()

export const fetchOmdbData = async (imdbId, details, log) => {
  const apiKey = 'aa538a64'

  const url = new URL('http://omdbapi.com')
  url.search = new URLSearchParams({ i: imdbId, apikey: apiKey })

  log.add(`    - OMDB: ${url}`)

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

  const ratings = (
    await Promise.all(
      rawRatings.map(async ({ Source: source, Value: value }) => {
        if (source === 'Rotten Tomatoes') {
          const reviewCount = await fetchRottenTomatoesReviewCount(details)

          return {
            name: 'Rotten Tomatoes',
            raw: Number(value.slice(0, -1)),
            value,
            count: reviewCount || null,
          }
        }

        if (source === 'Metacritic') {
          const reviewCount = await fetchMetacriticReviewCount(details)

          return {
            name: 'Metacritic',
            raw: Number(value.split('/')[0]),
            value,
            count: reviewCount || null,
          }
        }

        return null
      })
    )
  ).filter(Boolean)

  return { director, ratings }
}
