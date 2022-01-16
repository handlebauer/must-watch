import test from 'ava'

import { fetchTmdbData } from './fetch-tmdb-data.js'

test.skip('Fetching TMDB data returns desired values when IMDB ID refrences a movie result', async t => {
  const imdbId = 'tt10370710'
  const tmdbData = await fetchTmdbData(imdbId)

  // Should yield something like
  //    {
  //      type: 'Movie',
  //      title: 'Tenet',
  //      originalTitle: 'Tenet',
  //      overview: 'Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
  //      genres: [
  //        { id: 28, name: 'Action' },
  //        { id: 53, name: 'Thriller' },
  //        { id: 878, name: 'Science Fiction' }
  //      ],
  //      languages: [ { english_name: 'English', iso_639_1: 'en', name: 'English' } ],
  //      runtime: 150,
  //      posterUrl: 'https://image.tmdb.org/t/p/w342/oh8XmxWlySHgGLlx8QOBmq9k72j.jpg'
  //    }

  t.is(typeof tmdbData, 'object')
  t.is(tmdbData.title, 'Tenet')
  t.is(tmdbData.originalTitle, 'Tenet')
  t.is(tmdbData.type, 'Movie')
  t.truthy(tmdbData.overview)
  t.true(Array.isArray(tmdbData.genres))
  t.true(Array.isArray(tmdbData.languages))
  t.is(typeof tmdbData.runtime, 'number')
  t.regex(String(tmdbData.runtime), /[0-9][1-9]*/)
  t.regex(tmdbData.posterUrl, /^https.+\.jpg$/)
})

test.skip('Fetching TMDB data returns desired values when IMDB ID references a TV result', async t => {
  const imdbId = 'tt7712606'
  const tmdbData = await fetchTmdbData(imdbId)

  console.log(tmdbData)

  // Should yield something like
  //    {
  //      type: 'Miniseries',
  //      title: 'The Long Song',
  //      originalTitle: 'The Long Song',
  //      overview:
  //        'Set during the final days of slavery in 19th century Jamaica, we follow the trials, tribulations and survival of plantation slave July and her odious mistress Caroline.',
  //      genres: [{ id: 18, name: 'Drama' }],
  //      languages: [{ english_name: 'English', iso_639_1: 'en', name: 'English' }],
  //      runtime: 60,
  //      posterPath: '/rF1Gs0Wx1k2xLVmtRkYmJSclzbb.jpg',
  //      posterUrl:
  //        'https://image.tmdb.org/t/p/w342/rF1Gs0Wx1k2xLVmtRkYmJSclzbb.jpg',
  // }

  t.is(typeof tmdbData, 'object')
  t.is(tmdbData.title, 'The Long Song')
  t.is(tmdbData.originalTitle, 'The Long Song')
  t.is(tmdbData.type, 'tv')
  t.truthy(tmdbData.overview)
  t.true(Array.isArray(tmdbData.genres))
  t.true(Array.isArray(tmdbData.languages))
  t.is(typeof tmdbData.runtime, 'number')
  t.regex(String(tmdbData.runtime), /[0-9][1-9]*/)
  t.regex(tmdbData.posterUrl, /^https.+\.jpg$/)
})
