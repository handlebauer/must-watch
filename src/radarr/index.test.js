import test from 'ava'

import { fetchRadarrMovieDetails, addNewMovieToRadarr } from './index.js'

const imdbId = 'tt6723592'

test('Fetches placeholder data for POST /movie request', async t => {
  const details = await fetchRadarrMovieDetails(imdbId)
  t.context.details = details
})

test('Add new movie to radarr', async t => {
  const details = await fetchRadarrMovieDetails(imdbId)
  const response = await addNewMovieToRadarr(details)
  console.log(response)
})
