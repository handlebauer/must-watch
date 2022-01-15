import test from 'ava'

import { addMovieToRadarr } from './fetch-radarr-data.js'

test.skip('Should return newly created ID when a valid movie is added to Radarr', async t => {
  // Babyteeth
  const imdbId = 'tt8399664'

  const id = await addMovieToRadarr(imdbId)

  t.is(typeof id, 'number')
})

test.skip('Should return null when an invalid movie is added to Radarr', async t => {
  // Nonsense
  const imdbId = 'tt83996624093209249024904'

  const id = await addMovieToRadarr(imdbId)

  t.is(id, null)
})
