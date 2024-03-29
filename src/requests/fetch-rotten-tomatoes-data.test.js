import test from 'ava'

import { fetchRottenTomatoesReviewCount } from './fetch-rotten-tomatoes-data.js'

test('Searching Rotten Tomatoes by title should return desired review count', async t => {
  const params = {
    title: 'Onoda – 10,000 Nights in the Jungle',
    year: 2021,
  }
  const reviewCount = await fetchRottenTomatoesReviewCount(params)

  t.is(typeof reviewCount, 'number')
  t.true(reviewCount > 0)
})

test.skip('Searching Rotten Tomatoes for a title and year that will not match a result should return null', async t => {
  const params = {
    title: 'this will not work',
    year: 1990,
  }
  const reviewCount = await fetchRottenTomatoesReviewCount(params)

  t.is(reviewCount, null)
})
