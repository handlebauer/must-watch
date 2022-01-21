import { config } from 'dotenv'

import { fetchData } from '../requests/fetch-data.js'

import formatMovie from '../utils/format-movie.js'
import { meetsThreshold } from '../threshold/meets-threshold.js'

import { addMovieToRadarr } from '../requests/fetch-radarr-data.js'

import { Discord } from '../discord/index.js'
import { SMS } from '../sms/index.js'

config()

export const processAnnounce = async (url, log) => {
  const data = await fetchData(url, log)

  if (data) {
    const movie = formatMovie(data)

    if (meetsThreshold(movie, log)) {
      const id = await addMovieToRadarr(data.imdbId, log)

      if (id) {
        await Discord.log(movie, log)
        await SMS.send(movie, log)
        await log.send()
        return id
      }
    }

    await log.send()
  }
}
