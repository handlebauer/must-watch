export default movie => {
  const title =
    movie.title +
    (movie.originalTitle !== movie.title ? ` AKA ${movie.originalTitle}` : '')
  const genres = movie.genres.map(({ name }) => name)
  const languages = movie.languages.map(({ english_name: name }) => name)

  const ratings = [
    ...movie.ratings,
    movie.letterboxdRating && {
      name: 'letterboxd',
      raw: movie.letterboxdRating,
      value: `${movie.letterboxdRating}/5`,
      count: movie.letterboxdVoteCount,
    },
  ]
    .filter(Boolean)
    .reduce((acc, x) => ({ ...acc, [x.name]: x }), {})

  ratings.imdb = { ...ratings.imdb, count: movie.imdbVoteCount }

  return {
    title,
    originalTitle: movie.originalTitle,
    year: movie.year,
    director: movie.director,
    genres,
    languages,
    runtime: movie.runtime,
    overview: movie.overview,
    ratings,
    posterUrl: movie.posterUrl,
    url: movie.url,
  }
}
