export default async (_, message) => {
  // Parses for torrent URL
  const re = /(?<url>https.+)\s\//
  const {
    groups: { url },
  } = message.match(re)
}
