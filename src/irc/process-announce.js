import { config } from 'dotenv'

import {
  fetchPtpData,
  fetchTmdbData,
  fetchOmdbData,
  fetchLetterboxdData,
  fetchMetacriticReviewCount,
  fetchRottenTomatoesReviewCount,
} from '../requests/index.js'

import formatMovie from '../utils/format-movie.js'

import { Discord } from '../discord/index.js'
import { SMS } from '../sms/index.js'

config()

export const processAnnounce = async url => {
  const ptpData = await fetchPtpData(url)

  const isNewMovie = ptpData?.numberOfTorrents === 1

  if (isNewMovie) {
    console.log(
      `  => new movie found: https://www.imdb.com/title/${ptpData.imdbId}`
    )
    const [tmdbData, letterboxdData] = await Promise.all([
      fetchTmdbData(ptpData.imdbId),
      fetchLetterboxdData(ptpData.imdbId),
    ])

    if (tmdbData === null) {
      return
    }

    const omdbData = await fetchOmdbData(ptpData.imdbId, {
      title: tmdbData.title,
      year: tmdbData.year,
    })

    if (omdbData === null) {
      return
    }

    const movie = formatMovie({
      ...ptpData,
      ...tmdbData,
      ...omdbData,
      ...letterboxdData,
    })

    const voteCount = movie.ratings[process.env.RATING_SOURCE]?.count
    console.log(`  => vote count: ${voteCount}`)
    // NOTE: if the rating source doesn't include a vote count, this will assign as
    // true (i.e. we don't care about vote count for those sources with none)
    const exceedsVoteCount = voteCount
      ? voteCount > process.env.VOTE_MINIMUM
      : true

    const rating = movie.ratings[process.env.RATING_SOURCE]
    // NOTE: rating may be undefined, in which case this will always assign as false
    const exceedsRating = rating?.raw >= process.env.RATING_MINIMUM
    console.log(`  => rating: ${JSON.stringify(rating, null, 2)}`)

    if (exceedsRating && exceedsVoteCount) {
      await Discord.send(movie)
      await SMS.send(movie)
    }
  }
}
