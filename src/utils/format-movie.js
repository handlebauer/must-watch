export default movie => {
  const title =
    movie.title +
    (movie.originalTitle !== movie.title ? ` AKA ${movie.originalTitle}` : '')
  const genres = movie.genres.map(({ name }) => name)
  const languages = movie.languages.map(({ english_name: name }) => name)

  const ratings = [
    {
      name: 'IMDb',
      raw: movie.imdbRating,
      value: `${movie.imdbRating}/10`,
      count: movie.imdbVoteCount,
    },
    movie.letterboxdRating && {
      name: 'Letterboxd',
      raw: movie.letterboxdRating,
      value: `${movie.letterboxdRating}/5`,
      count: movie.letterboxdVoteCount,
    },
    ...movie.ratings,
  ]
    .filter(Boolean)
    .reduce(
      (acc, x) => ({ ...acc, [x.name.split(' ').join('_').toLowerCase()]: x }),
      {}
    )

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
