import test from 'ava'

import { fetchMetacriticReviewCount } from './fetch-metacritic-deta.js'

test.skip('Searching Metacritic by title should return desired review count', async t => {
  const params = { title: 'The Tragedy of Macbeth', year: 2021 }
  const reviewCount = await fetchMetacriticReviewCount(params)

  t.is(typeof reviewCount, 'number')
  t.is(reviewCount, 46)
})

test.skip('Searching Metacritic for a title and year that will not match a result should return null', async t => {
  const params = {
    title: 'this will not work',
    year: 1990,
  }
  const reviewCount = await fetchMetacriticReviewCount(params)

  t.is(reviewCount, null)
})
