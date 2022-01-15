import test from 'ava'

import { processAnnounce } from './process-announce.js'

test.skip("Should abort when movie isn't the first uploaded movie", async t => {
  const url = 'https://passthepopcorn.me/torrents.php?id=236839'

  t.is(await processAnnounce(url), undefined)
})

test.skip('Should add movie to radarr send notifications to recipients when threshold is met', async t => {
  const url =
    'https://passthepopcorn.me/torrents.php?id=271191&torrentid=1003114'

  await processAnnounce(url)

  // Check radarr & your phone!
  t.pass()
})
