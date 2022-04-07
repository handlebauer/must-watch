import { config } from 'dotenv'

import { fetchData } from '../requests/fetch-data.js'

import formatMovie from '../utils/format-movie.js'
import { getMeetsThreshold } from '../threshold/get-meets-threshold.js'

import { addMovieToRadarr } from '../requests/fetch-radarr-data.js'

import { Discord } from '../discord/index.js'
import { SMS } from '../sms/index.js'

config()

export const processAnnounce = async (url, log) => {
  const data = await fetchData(url, log)

  if (data) {
    const movie = formatMovie(data)

    const meetsThreshold = getMeetsThreshold(movie, log)

    if (meetsThreshold.some) {
      await Discord.log('secondary', { embed: movie })
    }

    if (meetsThreshold.all) {
      await Discord.log('primary', { embed: movie })
      await SMS.send(movie, log)
      await addMovieToRadarr(data.imdbId, log)
    }

    await log.send()
  }
}
