import test from 'ava'

import { Discord } from './index.js'

test.skip('Should successfully send a movie notification embed via Discord webhook to internal channel', async t => {
  const mockMovie = {
    title: 'Violent',
    originalTitle: 'Violent',
    year: '2014',
    director: 'Andrew Huculiak',
    genres: [],
    languages: [],
    runtime: 102,
    overview:
      'A young woman, and her last memories of the five people who loved her most, recalled while experiencing a catastrophic event.',
    releaseName: '18.12.2021.Dan.Mirvish.720p.WEB-DL.x264-gooz',
    ratings: {
      imdb: { name: 'IMDB', raw: 7.3, value: '7.3/10', count: 689 },
      letterboxd: {
        name: 'Letterboxd',
        raw: 3.81,
        value: '3.81/5',
        count: 871,
      },
    },
    posterUrl:
      'https://image.tmdb.org/t/p/w342/1ZMWrTpkJ5dZhej7mVEuMeSkoxK.jpg',
    url: 'https://passthepopcorn.me/torrents.php?id=173329&torrentid=599855',
  }
  const response = await Discord.log('internal', { embed: mockMovie })

  t.is(response.status, 204)
})

test.skip('Should successfully send an error notification via Discord webhook to internal channel', async t => {
  const error = new Error('testing')
  const response = await Discord.log('internal', { error })

  t.is(response.status, 204)
})

test.skip('Should successfully send an internal log via Discord webhook to internal channel', async t => {
  const log = Discord.internalLog()

  log.add('Hello')
  log.add('World')

  const response = await log.send()

  t.is(response.status, 204)
})
