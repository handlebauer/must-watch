import json from '../utils/import-json.js'

export const buildEmbed = async movie => {
  const title = `${movie.title} (${movie.year}) by ${movie.director}`

  const url = movie.url

  const color = 4444928

  const fields = [
    {
      name: '__Overview__',
      value: `||${movie.overview}||`,
    },
    {
      name: '__Genre(s)__',
      value: movie.genres.join(', '),
      inline: true,
    },
    {
      name: '__Language(s)__',
      value: movie.languages.join(', '),
      inline: true,
    },
    {
      name: '__Runtime__',
      value: `${movie.runtime} minutes`,
      inline: true,
    },
    {
      name: '__Ratings__',
      value: Object.values(movie.ratings)
        .map(
          ({ name, value, count }) =>
            `**${name}:** ${value}${count ? ` (${count})` : ''}`
        )
        .join('\n'),
    },
  ]

  const image = { url: movie.posterUrl }

  const author = {
    name: 'MustWatch',
    icon_url: 'https://i.imgur.com/OEXcE7w.jpg',
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
