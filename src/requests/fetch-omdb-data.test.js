import test from 'ava'

import { fetchOmdbData } from './fetch-omdb-data.js'

const imdbId = 'tt6723592'

test('Fetching OMDB data returns desired values', async t => {
  const omdbData = await fetchOmdbData(imdbId, { title: 'Tenet', year: 2020 })

  // Should yield something like:
  //    {
  //      director: 'Christopher Nolan',
  //      ratings: [
  //        { name: 'Rotten Tomates', raw: 70, value: '70%', count: 363 },
  //        { name: 'Metacritic', raw: 69, value: '69/100', count: 50 }
  //      ]
  //    }

  t.is(omdbData.director, 'Christopher Nolan')
  t.is(omdbData.ratings.length, 2)
})
