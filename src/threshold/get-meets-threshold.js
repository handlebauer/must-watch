import { parseSourceThresholds } from './parse-source-thresholds.js'

export const getMeetsThreshold = (movie, log) => {
  const scoreExceeded = ({ source, rating }) =>
    movie.ratings[source]?.raw >= rating
  const votesExceeded = ({ source, voteCount }) =>
    movie.ratings[source]?.count >= voteCount

  const sourceThresholds = parseSourceThresholds().map(
    ({ source, rating, voteCount }) => ({
      source,
      rating,
      voteCount,
      passed:
        scoreExceeded({ source, rating }) &&
        votesExceeded({ source, voteCount }),
    })
  )

  const thresholdExceededs = sourceThresholds.every(({ passed }) => passed)

  if (thresholdExceededs) {
    const message = sourceThresholds
      .map(({ source }) => {
        const fetchedRating = movie.ratings[source]
        return `    - Rating (${source}): ${fetchedRating.value} (${fetchedRating.count})`
      })
      .join('\n')

    log.add('  => All thresholds passed')
    log.add(message)

    return { all: true }
  }

  const someThresholdsExceeded = sourceThresholds.some(({ passed }) => passed)

  const message = sourceThresholds
    .map(({ source, passed }) => {
      const fetchedRating = movie.ratings[source]
      const label = `Rating (${source})`
      if (passed) {
        const message = `${fetchedRating.value} (${fetchedRating.count}) meets threshold`
        return `    - ${label}: ${message}`
      }
      if (!fetchedRating) {
        const message = 'unable to find rating'
        return `    - ${label}: ${message}`
      }
      if (!fetchedRating.count) {
        const message = 'unable to find vote/review count'
        return `    - ${label}: ${message}`
      }
      const message = `${fetchedRating.value} (${fetchedRating.count}) does not meet threshold`
      return `    - ${label}: ${message}`
    })
    .join('\n')

  if (someThresholdsExceeded) {
    log.add('  => Some thresholds passed')
    log.add(message)

    return { some: true }
  }

  log.add('  => Threshold failed')
  log.add(message)

  return { none: true }
}
