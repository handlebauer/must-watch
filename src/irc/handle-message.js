import { processAnnounce } from './process-announce.js'

export default log => async (_, message) => {
  // Parse for torrent URL
  const re = /(?<url>https.+)\s\//
  const { url } = message.match(re)?.groups

  log.add(`PTP announce: ${url}`)
  log.send()

  processAnnounce(url, log)
}
