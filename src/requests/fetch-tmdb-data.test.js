import test from 'ava'

import { fetchTmdbData } from './fetch-tmdb-data.js'

test('Fetching TMDB data returns desired values when IMDB ID refrences a movie result', async t => {
  const imdbId = 'tt6723592'
  const tmdbData = await fetchTmdbData(imdbId)

  // Should yield something like
  //    {
  //      overview: 'Armed with only one word - Tenet...',
  //      posterUrl:
  //        'https://image.tmdb.org/t/p/w342/oh8XmxWlySHgGLlx8QOBmq9k72j.jpg',
  //    }

  t.true(typeof tmdbData === 'object')
  t.truthy(tmdbData.overview)
  t.regex(tmdbData.posterUrl, /^https.+\.jpg$/)
})

test('Fetching TMDB data returns desired values when IMDB ID references a TV result', async t => {
  const imdbId = 'tt7712606'
  const tmdbData = await fetchTmdbData(imdbId)

  // Should yield something like
  //    {
  //      overview: 'Set during the final days of slavery in 19th century...',
  //      posterUrl:
  //        'https://image.tmdb.org/t/p/w342/rF1Gs0Wx1k2xLVmtRkYmJSclzbb.jpg',
  //    }

  t.true(typeof tmdbData === 'object')
  t.truthy(tmdbData.overview)
  t.regex(tmdbData.posterUrl, /^https.+\.jpg$/)
})
