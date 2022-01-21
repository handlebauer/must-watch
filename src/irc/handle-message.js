import { processAnnounce } from './process-announce.js'

export default log => async (_, message) => {
  // Parse for torrent URL
  const re = /(?<url>https.+)\s\//
  const { url } = message.match(re)?.groups

  console.log(`PTP announce: ${url}`)

  processAnnounce(url, log)
}
