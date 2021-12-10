import test from 'ava'

import { Discord } from './index.js'

test('Should successfully send Discord notification via webhook', async t => {
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
  const response = await Discord.send(mockMovie)

  t.is(response.status, 204)
})
