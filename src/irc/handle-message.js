import {
  fetchPtpData,
  fetchTmdbData,
  fetchOmdbData,
  fetchLetterboxdData,
} from '../requests/index.js'

export const go = async (_, message) => {
  // Parses for torrent URL
  const re = /(?<url>https.+)\s\//
  const {
    groups: { url },
  } = message.match(re)

  const ptpData = await fetchPtpData(url)
  const tmdbData = await fetchTmdbData(ptpData.imdbId)
  const omdbData = await fetchOmdbData(ptpData.imdbId)
  const letterboxdData = await fetchLetterboxdData(ptpData.imdbId)
}
