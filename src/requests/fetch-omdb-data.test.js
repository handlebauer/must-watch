import test from 'ava'

import { fetchOmdbData } from './fetch-omdb-data.js'

const imdbId = 'tt6723592'

test.skip('Fetching OMDB data returns desired values', async t => {
  const omdbData = await fetchOmdbData(imdbId)

  // Should yield something like:
  //    {
  //      director: 'Christopher Nolan',
  //      ratings: [
  //        { name: 'IMDB', raw: 7.4, value: '7.4/10' },
  //        { name: 'Rotten Tomates', raw: 70, value: '70%' },
  //        { name: 'Metacritic', raw: 69, value: '69/100' }
  //      ]
  //    }

  t.is(omdbData.director, 'Christopher Nolan')
  t.is(omdbData.ratings.length, 3)
  t.regex(String(omdbData.ratings[0].raw), /\d\.\d/)
  t.regex(String(omdbData.ratings[1].raw), /[0-9]*/)
  t.regex(String(omdbData.ratings[2].raw), /[0-9]*/)
})
