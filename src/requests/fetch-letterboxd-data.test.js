import test from 'ava'

import { fetchLetterboxdData } from './fetch-letterboxd-data.js'

test('Fetching Letterboxd data returns desired ratings', async t => {
  const imdbId = 'tt6723592'
  const letterboxdData = await fetchLetterboxdData(imdbId)

  // Should yield something like
  //    {
  //      letterboxdRating: 3.42,
  //      letterboxdVoteCount: 399754,
  //    }

  t.regex(String(letterboxdData.letterboxdRating), /[1-9]\.[0-9]{2}/)
  t.regex(String(letterboxdData.letterboxdVoteCount), /[0-9][1-9]*/)
})

test.skip('Fetching Letterboxd data from movie without rating returns null', async t => {
  const imdbId = 'tt5881406'
  const letterboxdData = await fetchLetterboxdData(imdbId)

  t.is(letterboxdData, null)
})
