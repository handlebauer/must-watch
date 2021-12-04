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

  const [tmdbData, omdbData, letterboxdData] = await Promise.all([
    fetchTmdbData(ptpData.imdbId),
    fetchOmdbData(ptpData.imdbId),
    fetchLetterboxdData(ptpData.imdbId),
  ])
}
