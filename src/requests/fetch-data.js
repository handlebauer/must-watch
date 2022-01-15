import {
  fetchPtpData,
  fetchTmdbData,
  fetchOmdbData,
  fetchLetterboxdData,
  fetchMetacriticReviewCount,
  fetchRottenTomatoesReviewCount,
} from './index.js'

export const fetchData = async url => {
  const ptpData = await fetchPtpData(url)

  const isNewMovie = ptpData?.numberOfTorrents === 1

  if (isNewMovie) {
    console.log()
    console.log(`${ptpData.title} (${ptpData.url})`)
    console.log('  => Sending requests:')

    const [tmdbData, letterboxdData] = await Promise.all([
      fetchTmdbData(ptpData.imdbId),
      fetchLetterboxdData(ptpData.imdbId),
    ])

    if (tmdbData === null) {
      console.log('  => Aborted: no TMDB data found')
      console.log('-- PROCESS COMPLETE --')
      console.log()
      return
    }

    const omdbData = await fetchOmdbData(ptpData.imdbId, {
      title: tmdbData.title,
      year: tmdbData.year,
    })

    if (omdbData === null) {
      console.log('  => Aborted: no OMDB data found')
      console.log('-- PROCESS COMPLETE --')
      console.log()
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
