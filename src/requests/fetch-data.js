import {
  fetchPtpData,
  fetchTmdbData,
  fetchOmdbData,
  fetchLetterboxdData,
} from './index.js'

export const fetchData = async (url, log) => {
  const ptpData = await fetchPtpData(url)

  const isNewMovie = ptpData?.numberOfTorrents === 1

  if (isNewMovie) {
    log.add(`${ptpData.title} (${ptpData.url})`)
    log.add('  => Sending requests')

    const [tmdbData, letterboxdData] = await Promise.all([
      fetchTmdbData(ptpData.imdbId, log),
      fetchLetterboxdData(ptpData.imdbId, log),
    ])

    if (tmdbData === null) {
      log.add('  => Aborted: no TMDB data found')
      log.add('-- PROCESS COMPLETE --')
      await log.send()
      return
    }

    const omdbData = await fetchOmdbData(
      ptpData.imdbId,
      {
        title: tmdbData.title,
        year: tmdbData.year,
      },
      log
    )

    if (omdbData === null) {
      log.add('  => Aborted: no OMDB data found')
      log.add('-- PROCESS COMPLETE --')
      await log.send()
      return
    }

    return {
      ...ptpData,
      ...tmdbData,
      ...omdbData,
      ...letterboxdData,
    }
  }

  return null
}
