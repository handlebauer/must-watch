import Letterboxd from './helpers/Letterboxd.js'

const letterboxd = new Letterboxd()

const getLid = async imdbId => {
  const {
    items: [{ id } = {}],
  } = await letterboxd.get({ path: '/films', filmId: `imdb:${imdbId}` })

  return id
}

const getDetails = async lid => {
  const {
    runTime: runtime,
    genres,
    languages,
  } = await letterboxd.get({ path: `/film/${lid}` })
  return {
    genres: genres.map(({ name }) => name),
    languages: languages.map(({ name }) => name),
    runtime,
  }
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
    return {}
  }

  const details = await getDetails(lid)
  const letterboxdStats = await getStats(lid)
  return { ...details, ...letterboxdStats }
}
