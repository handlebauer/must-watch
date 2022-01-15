export const meetsThreshold = movie => {
  const rating = movie.ratings[process.env.RATING_SOURCE]
  // NOTE: rating may be undefined, in which case this will always assign as false
  const exceedsRating = rating?.raw >= process.env.RATING_MINIMUM
  console.log(`  => Rating: ${rating.name} - ${rating.value} `)

  const voteCount = rating?.count
  // NOTE: if the rating source doesn't include a vote count, this will assign as
  // true (i.e. we don't care about vote count for those sources with none)
  const exceedsVoteCount = voteCount
    ? voteCount > process.env.VOTE_MINIMUM
    : true
  console.log(`  => Vote Count: ${rating.count ? rating.count : 'N/A'}`)

  return exceedsRating && exceedsVoteCount
}
