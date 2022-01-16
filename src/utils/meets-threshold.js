export const meetsThreshold = movie => {
  const rating = movie.ratings[process.env.RATING_SOURCE]

  if (!rating) {
    console.log(`  => Rating (${process.env.RATING_SOURCE}): not found`)
    return false
  }

  const exceedsRating = rating.raw >= process.env.RATING_MINIMUM

  // NOTE: if the rating source doesn't include a vote count, this will assign as
  // true (i.e. we don't care about vote count for those sources with none)
  const exceedsVoteCount = rating.count
    ? rating.count > process.env.VOTE_MINIMUM
    : true

  console.log(
    `  => Rating: ${rating.name} - ${rating.value} ${
      rating.count ? `(${rating.count})` : ''
    }`
  )

  return exceedsRating && exceedsVoteCount
}
