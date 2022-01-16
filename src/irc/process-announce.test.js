import test from 'ava'

import { processAnnounce } from './process-announce.js'

test.skip("Should abort when movie isn't the first uploaded movie", async t => {
  const url = 'https://passthepopcorn.me/torrents.php?id=236839'

  t.is(await processAnnounce(url), undefined)
})

test.skip("Should abort when movie is valid but doesn't meet threshold", async t => {
  const url =
    // The Worst Person in the World
    'https://passthepopcorn.me/torrents.php?id=271486&torrentid=1003975'

  const id = await processAnnounce(url)

  t.is(id, undefined)
})

test.skip('Should add movie to radarr send notifications to recipients when threshold is met', async t => {
  const url =
    // The Tragedy of Macbeth
    'https://passthepopcorn.me/torrents.php?id=271191&torrentid=1003114'

  const id = await processAnnounce(url)

  t.is(typeof id, 'number')
  // Check radarr & your phone!
})
