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
    const [tmdbData, letterboxdData] = await Promise.all([
      fetchTmdbData(ptpData.imdbId),
      fetchLetterboxdData(ptpData.imdbId),
    ])

    console.log(`New candidate found: ${tmdbData.title} (${ptpData.url})`)

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

    return {
      ...ptpData,
      ...tmdbData,
      ...omdbData,
      ...letterboxdData,
    }
  }

  return null
}
