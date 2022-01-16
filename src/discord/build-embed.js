import { DISCORD_AUTHOR_ICON_URL } from '../constants.js'
import json from '../utils/import-json.js'

import { formatNumber } from '../utils/format-number.js'

export const buildEmbed = async movie => {
  const title = `${
    movie.title === movie.originalTitle
      ? movie.title
      : `${movie.title} AKA ${movie.originalTitle}`
  } (${movie.year}) by ${movie.director}`

  const url = movie.url

  const color = 4444928

  const fields = [
    movie.overview && {
      name: '__Overview__',
      value: `||${movie.overview}||`,
    },
    movie.genres.length && {
      name: '__Genre(s)__',
      value: movie.genres.join(', '),
      inline: true,
    },
    movie.languages.length && {
      name: '__Language(s)__',
      value: movie.languages.join(', '),
      inline: true,
    },
    movie.runtime && {
      name: '__Runtime__',
      value: `${movie.runtime} minutes`,
      inline: true,
    },
    {
      name: '__Ratings__',
      value: Object.values(movie.ratings)
        .map(
          ({ name, value, count }) =>
            `**${name}:** ${value}${count ? ` (${formatNumber(count)})` : ''}`
        )
        .join('\n'),
    },
  ].filter(Boolean)

  const image = { url: movie.posterUrl }

  const author = {
    name: 'MustWatch',
    icon_url: DISCORD_AUTHOR_ICON_URL,
  }

  const { version, homepage } = await json('../../package.json')
  const footerText = `${homepage.split('.com/')[1]} • v${version}`
  const footer = {
    text: footerText,
    icon_url: 'https://i.imgur.com/lPzI6km.png',
  }

  const timestamp = new Date()

  return {
    author,
    title,
    url,
    color,
    fields,
    image,
    footer,
    timestamp,
  }
}
