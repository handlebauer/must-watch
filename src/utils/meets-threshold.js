export const meetsThreshold = movie => {
  const rating = movie.ratings[process.env.RATING_SOURCE]

  if (!rating) {
    console.log(`  => Rating (${process.env.RATING_SOURCE}): not found`)
    return false
  }

  const exceedsRating = rating.raw >= process.env.RATING_MINIMUM

  // NOTE: if no minimum rating is specified, this will always assign as
  // true (i.e. we don't care about vote count if the user doesn't)
  const exceedsVoteCount = process.env.RATING_MINIMUM
    ? rating.count > process.env.VOTE_MINIMUM
    : true

  console.log(
    `  => Rating: ${rating.name} - ${rating.value} ${
      rating.count ? `(${rating.count})` : ''
    }`
  )

  return exceedsRating && exceedsVoteCount
}
