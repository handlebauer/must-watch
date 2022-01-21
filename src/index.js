import connect from './irc/index.js'
import { Discord } from './discord/index.js'

const log = Discord.internalLog()

new Promise(() => connect(log)).catch(Discord.error)

process.once('SIGINT', () => {
  log.add('MustWatch: Gracefully shutting down...')
  log.send().then(() => {
    process.exit(143)
  })
})

process.on('unhandledRejection', async error => {
  const channel = '#internal-log'
  console.log(`  => Discord (${channel}): sending unhandledRejection error`)
  await Discord.log(channel, { error })
})
