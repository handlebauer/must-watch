import { config } from 'dotenv'

import { fetchData } from '../requests/fetch-data.js'

import formatMovie from '../utils/format-movie.js'
import { assessThreshold } from '../utils/assess-threshold.js'

import { Discord } from '../discord/index.js'
import { SMS } from '../sms/index.js'

config()

export const processAnnounce = async url => {
  const data = await fetchData(url)

  if (data) {
    const movie = formatMovie(data)

    const { exceedsRating, exceedsVoteCount } = assessThreshold(movie)

    if (exceedsRating && exceedsVoteCount) {
      // await Discord.send(movie)
      await SMS.send(movie)
    }
  }
}
