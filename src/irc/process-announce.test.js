import test from 'ava'

import { processAnnounce } from './process-announce.js'

test.skip("Should abort when movie isn't the first uploaded movie", async t => {
  const url = 'https://passthepopcorn.me/torrents.php?id=236839'

  t.is(await processAnnounce(url), undefined)
})

test('Should send notifications to recipients when threshold is met', async t => {
  const url =
    'https://passthepopcorn.me/torrents.php?id=223139&torrentid=802924'

  await processAnnounce(url)

  // Check your phone!
  t.pass()
})
