import test from 'ava'

import { buildEmbed } from './build-embed.js'

test('Building embed returns desirable object', async t => {
  const movie = {
    title: 'The Worst Person in the World',
    originalTitle: 'Verdens verste menneske',
    year: 2021,
    director: 'Joachim Trier',
    genres: ['Comedy', 'Drama', 'Romance'],
    languages: ['Norwegian'],
    runtime: 128,
    overview:
      'Chronicles four years in the life of Julie, a young woman who navigates the troubled waters of her love life and struggles to find her career path, leading her to take a realistic look at who she really is.',
    releaseName: '18.12.2021.Dan.Mirvish.720p.WEB-DL.x264-gooz',
    ratings: {
      imdb: { name: 'IMDb', raw: 8, value: '8/10', count: 8243 },
      letterboxd: {
        name: 'Letterboxd',
        raw: 4.14,
        value: '4.14/5',
        count: 31089,
      },
      rotten_tomatoes: {
        name: 'Rotten Tomatoes',
        raw: 100,
        value: '100%',
        count: 73,
      },
      metacritic: { name: 'Metacritic', raw: 88, value: '88/100', count: 17 },
    },
    posterUrl:
      'https://image.tmdb.org/t/p/w342/4dF5NT1dxw4CItns4ckXq4309bg.jpg',
    url: 'https://passthepopcorn.me/torrents.php?id=271486&torrentid=1003975',
  }

  const embed = await buildEmbed(movie)

  console.log(embed)

  t.regex(embed.title, /.+ \(\d{4}\) by .+/)
  t.is(embed.fields.length, 6)
})

test.skip('Building embed with empty over, genres, languages, and runtime returns desirable object', async t => {
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
