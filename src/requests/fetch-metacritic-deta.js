import fetch from 'node-fetch'
import * as cheerio from 'cheerio'

const host = 'https://metacritic.com'

const fetchMetaCriticTitleByMostRecent = async query => {
  const url = new URL(host)
  url.pathname = `/search/movie/${query}/results`
  url.search = new URLSearchParams({ sort: 'recent' })

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Failed with status: ${response.status} (${response.statusText})`
    )
  }

  const html = await response.text()
  const $ = cheerio.load(html)

  const result = $('.result.first_result')

  if (result.length === 0) {
    return null
  }

  const path = result.find('a').attr('href')
  const title = result.find('a').text().trim()
  const year = Number(
    result.find('p').text().trim().split(', ')[1].split(' ')[0]
  )

  return { path, title, year }
}

export const fetchMetacriticReviewCount = async params => {
  const results = await fetchMetaCriticTitleByMostRecent(params.title)

  if (results === null) {
    return null
  }

  const { path, title, year } = results

  if (
    params.title.toLowerCase() !== title.toLowerCase() ||
    (params.year !== year &&
      params.year + 1 !== year &&
      params.year - 1 !== year)
  ) {
    return null
  }

  const url = new URL(host)
  url.pathname = path

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `Failed with status: ${response.status} (${response.statusText})`
    )
  }

  const html = await response.text()
  const $ = cheerio.load(html)

  const reviewCount = $('.based_on')
    .first()
    .text()
    .split('based on ')[1]
    .split(' ')[0]

  return Number(reviewCount)
}
