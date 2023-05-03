import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

const fetchRottenTomatoesFirstSearchResult = async query => {
  const host = 'https://www.rottentomatoes.com'
  const url = new URL(host)
  url.pathname = 'search'
  url.search = new URLSearchParams({ search: query })

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Failed with status: ${response.status} (${response.statusText})`
    )
  }

  const html = await response.text()
  const $ = cheerio.load(html)

  const title = $('search-page-media-row a:nth-child(2)').first().text().trim()
  const year = Number($('search-page-media-row').attr('releaseyear'))
  const movieUrl = $('search-page-media-row a').attr('href')

  return { title, year, url: movieUrl }
}

export const fetchRottenTomatoesReviewCount = async params => {
  const { title, year, url } = await fetchRottenTomatoesFirstSearchResult(
    params.title
  )

  const normalize = title => title.toLowerCase().replace(/\W/g, '')

  if (
    normalize(params.title) !== normalize(title) ||
    (params.year !== year &&
      params.year + 1 !== year &&
      params.year - 1 !== year)
  ) {
    return null
  }

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Failed with status: ${response.status} (${response.statusText})`
    )
  }

  const html = await response.text()
  const $ = cheerio.load(html)

  const reviewCount = $('a[slot="critics-count"]').text().match(/(\d+)/g)[0]

  return Number(reviewCount)
}
