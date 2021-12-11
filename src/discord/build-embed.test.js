import test from 'ava'

import { buildEmbed } from './build-embed.js'

test('Building embed returns desirable object', async t => {
  const movie = {
    title: 'Violent',
    originalTitle: 'Violent',
    year: '2014',
    director: 'Andrew Huculiak',
    genres: ['Drama'],
    languages: ['English', 'Norwegian'],
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

  const embed = await buildEmbed(movie)

  // Should yield something like:
  //    const embed = {
  //      author: { name: 'MustWatch', icon_url: 'https://i.imgur.com/OEXcE7w.jpg' },
  //      title: 'Violent (2014) by Andrew Huculiak',
  //      url: 'https://passthepopcorn.me/torrents.php?id=173329&torrentid=599855',
  //      color: 4444928,
  //      fields: [
  //        {
  //          name: '__Overview__',
  //          value:
  //            '||A young woman, and her last memories of the five people who loved her most, recalled while experiencing a catastrophic event.||',
  //        },
  //        { name: '__Genre(s)__', value: 'Drama', inline: true },
  //        { name: '__Language(s)__', value: 'English, Norwegian', inline: true },
  //        { name: '__Runtime__', value: '102 minutes', inline: true },
  //        { name: '__Ratings__', value: '**IMDB:** 7.3/10 (689)\n**Letterboxd:** 3.81/5 (871)' },
  //      ],
  //      image: {
  //        url: 'https://image.tmdb.org/t/p/w342/1ZMWrTpkJ5dZhej7mVEuMeSkoxK.jpg',
  //      },
  //      footer: {
  //        text: 'handlebauer/must-watch#readme • v0.0.3',
  //        icon_url: 'https://i.imgur.com/lPzI6km.png',
  //      },
  //      timestamp: '2021-12-07T00:11:07.021Z',
  //    }

  t.regex(embed.title, /.+ \(\d{4}\) by .+/)
  t.is(embed.fields.length, 5)
})

test('Building embed with empty over, genres, languages, and runtime returns desirable object', async t => {
  const movie = {
    title: 'Violent',
    originalTitle: 'Violent',
    year: '2014',
    director: 'Andrew Huculiak',
    genres: [],
    languages: [],
    runtime: NaN,
    overview: '',
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

  const embed = await buildEmbed(movie)

  console.log(embed)

  // Should yield something like:
  //    const embed = {
  //      author: { name: 'MustWatch', icon_url: 'https://i.imgur.com/OEXcE7w.jpg' },
  //      title: 'Violent (2014) by Andrew Huculiak',
  //      url: 'https://passthepopcorn.me/torrents.php?id=173329&torrentid=599855',
  //      color: 4444928,
  //      fields: [
  //        { name: '__Ratings__', value: '**IMDB:** 7.3/10 (689)\n**Letterboxd:** 3.81/5 (871)' },
  //      ],
  //      image: {
  //        url: 'https://image.tmdb.org/t/p/w342/1ZMWrTpkJ5dZhej7mVEuMeSkoxK.jpg',
  //      },
  //      footer: {
  //        text: 'handlebauer/must-watch#readme • v0.0.3',
  //        icon_url: 'https://i.imgur.com/lPzI6km.png',
  //      },
  //      timestamp: '2021-12-07T00:11:07.021Z',
  //    }

  t.regex(embed.title, /.+ \(\d{4}\) by .+/)
  t.is(embed.fields.length, 1)
})
