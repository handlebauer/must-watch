import { config } from 'dotenv'

import {
  fetchPtpData,
  fetchTmdbData,
  fetchOmdbData,
  fetchLetterboxdData,
} from '../requests/index.js'

import { formatMovie } from '../utils/index.js'

config()

export const go = async (_, message) => {
  // Parses for torrent URL
  const re = /(?<url>https.+)\s\//
  const {
    groups: { url },
  } = message.match(re)

  const ptpData = await fetchPtpData(url)

  const isNewMovie = ptpData.numberOfTorrents === 1
  const exceedsVotes = ptpData.imdbVoteCount > process.env.VOTE_MINIMUM || 500

  if (isNewMovie && exceedsVotes) {
    const [tmdbData, omdbData, letterboxdData] = await Promise.all([
      fetchTmdbData(ptpData.imdbId),
      fetchOmdbData(ptpData.imdbId),
      fetchLetterboxdData(ptpData.imdbId),
    ])

    const movie = formatMovie({
      ...ptpData,
      ...tmdbData,
      ...omdbData,
      ...letterboxdData,
    })

    const exceedsRating =
      movie.ratings[process.env.RATING_SOURCE].raw >= process.env.RATING_MINIMUM

    if (exceedsRating) {
      // TODO: Send notification to discord
    }
  }
}
