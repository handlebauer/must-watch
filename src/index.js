import connect from './irc/index.js'
import { Discord } from './discord/index.js'

const log = Discord.internalLog()

new Promise(() => connect(log)).catch(
  async error => await Discord.log('internal', { error })
)

process.once('SIGINT', () => {
  log.add('MustWatch: Gracefully shutting down...')
  log.send().then(() => {
    process.exit(143)
  })
})

process.on('unhandledRejection', async error => {
  console.log(`  => Discord: sending unhandledRejection error`)
  await Discord.log('internal', { error })
})
