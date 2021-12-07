import test from 'ava'

import { fetchLetterboxdData } from './fetch-letterboxd-data.js'

const imdbId = 'tt6723592'

test('Fetching Letterboxd data returns desired values', async t => {
  const letterboxdData = await fetchLetterboxdData(imdbId)

  // Should yield something like
  //    {
  //      genres: ['Science Fiction', 'Action', 'Thriller'],
  //      languages: ['English'],
  //      runtime: 150,
  //      letterboxdRating: 3.42,
  //      letterboxdVoteCount: 399754,
  //    }

  t.true(Array.isArray(letterboxdData.genres))
  t.true(Array.isArray(letterboxdData.languages))
  t.regex(String(letterboxdData.runtime), /[0-9][1-9]*/)
  t.regex(String(letterboxdData.letterboxdRating), /[1-9]\.[0-9]{2}/)
  t.regex(String(letterboxdData.letterboxdVoteCount), /[0-9][1-9]*/)
})
