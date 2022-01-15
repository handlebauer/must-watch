export const assessThreshold = movie => {
  const voteCount = movie.ratings[process.env.RATING_SOURCE]?.count
  console.log(`  => vote count: ${voteCount}`)
  // NOTE: if the rating source doesn't include a vote count, this will assign as
  // true (i.e. we don't care about vote count for those sources with none)
  const exceedsVoteCount = voteCount
    ? voteCount > process.env.VOTE_MINIMUM
    : true

  const rating = movie.ratings[process.env.RATING_SOURCE]
  // NOTE: rating may be undefined, in which case this will always assign as false
  const exceedsRating = rating?.raw >= process.env.RATING_MINIMUM
  console.log(`  => rating: ${JSON.stringify(rating, null, 2)}`)

  return { exceedsVoteCount, exceedsRating }
}
