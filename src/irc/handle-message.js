import { config } from 'dotenv'

import {
  fetchPtpData,
  fetchTmdbData,
  fetchOmdbData,
  fetchLetterboxdData,
} from '../requests/index.js'

import formatMovie from '../utils/format-movie.js'

import { Discord } from '../discord/index.js'

config()

export default async (_, message) => {
  // Parses for torrent URL
  const re = /(?<url>https.+)\s\//
  const { url } = message.match(re)?.groups

  // Log
  console.log(`Announce: ${url}`)

  const ptpData = await fetchPtpData(url)

  const isNewMovie = ptpData?.numberOfTorrents === 1

  if (isNewMovie) {
    console.log(` => New movie found: ${ptpData.imdbId}`)
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

    const voteCount = movie.ratings[process.env.RATING_SOURCE]?.count
    // NOTE: if the rating source doesn't include a vote count, this will assign as
    // true (i.e. we don't care about vote count for those sources with none)
    const exceedsVoteCount = voteCount
      ? voteCount > process.env.VOTE_MINIMUM
      : true

    const rating = movie.ratings[process.env.RATING_SOURCE]
    // NOTE: rating may be undefined, in which case this will always assign as false
    const exceedsRating = rating?.raw >= process.env.RATING_MINIMUM
    console.log(` => Rating: ${JSON.stringify(rating, null, 2)}`)

    if (exceedsRating && exceedsVoteCount) {
      Discord.send(movie)
    }
  }
}
