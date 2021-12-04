export const formatMovie = movie => {
  const ratings = [
    ...movie.ratings,
    {
      name: 'Letterboxd',
      raw: movie.letterboxdRating,
      value: `${movie.letterboxdRating}/5`,
      count: movie.letterboxdVoteCount,
    },
  ].reduce((acc, x) => ({ ...acc, [x.name.toLowerCase()]: x }), {})

  ratings.imdb = { ...ratings.imdb, count: movie.imdbVoteCount }

  return {
    title: movie.title,
    year: movie.year,
    director: movie.director,
    genres: movie.genres,
    languages: movie.languages,
    runtime: movie.runtime,
    overview: movie.overview,
    ratings,
    posterUrl: movie.posterUrl,
    url: movie.url,
  }
}
