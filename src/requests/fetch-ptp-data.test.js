import test from 'ava'
import { fetchPtpData } from './fetch-ptp-data.js'

const url = 'https://passthepopcorn.me/torrents.php?id=173329&torrentid=599855'

test('Fetching PTP data returns desired values', async t => {
  const ptpData = await fetchPtpData(url)

  // Should yield something like:
  //    {
  //       url: 'https://passthepopcorn.me/torrents.php?id=173329&torrentid=599855',
  //       year: '2014',
  //       imdbId: 'tt3243772',
  //       imdbRating: 7.3,
  //       imdbVoteCount: 689,
  //       numberOfTorrents: 6
  //    }

  t.regex(ptpData.year, /\d{4}/)
  t.regex(ptpData.imdbId, /tt\d{7}/)
  t.regex(String(ptpData.imdbRating), /\d\.\d/)
  t.regex(String(ptpData.imdbVoteCount), /\d+/)
  t.regex(String(ptpData.numberOfTorrents), /[1-9][0-9]*/)
})
