import { config } from 'dotenv'
import fetch, { Headers } from 'node-fetch'

config()

export const fetchPtpData = async url => {
  const params = {
    ApiUser: process.env.PTP_API_USER,
    ApiKey: process.env.PTP_API_KEY,
  }
  const headers = new Headers(params)

  const response = await fetch(url, { headers })

  if (!response.ok) {
    throw new Error(
      `Failed with status: ${response.status} (${response.statusText})`
    )
  }

  const collection = await response.json()

  if (!collection.ImdbId) {
    return undefined
  }

  return {
    url,
    year: collection.Year,
    imdbId: `tt${collection.ImdbId}`,
    imdbRating: Number(collection.ImdbRating),
    imdbVoteCount: Number(collection.ImdbVoteCount),
    numberOfTorrents: collection.Torrents.length,
  }
}
