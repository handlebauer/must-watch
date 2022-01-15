import Letterboxd from './helpers/Letterboxd.js'

const letterboxd = new Letterboxd()

const getLid = async imdbId => {
  const {
    items: [{ id } = {}],
  } = await letterboxd.get({ path: '/films', filmId: `imdb:${imdbId}` })

  return id
}

const getStats = async lid => {
  const {
    rating: letterboxdRating,
    counts: { ratings: letterboxdVoteCount } = {},
  } = await letterboxd.get({ path: `/film/${lid}/statistics` })

  // Better not to assume there's a rating
  if (!letterboxdRating || !letterboxdVoteCount) {
    return null
  }

  return {
    letterboxdRating: Number(letterboxdRating.toFixed(2)),
    letterboxdVoteCount,
  }
}

export const fetchLetterboxdData = async imdbId => {
  const lid = await getLid(imdbId)

  if (!lid) {
    return undefined
  }

  console.log(`    - BOXD: https://boxd.it/${lid}`)

  const letterboxdStats = await getStats(lid)
  return letterboxdStats
}
