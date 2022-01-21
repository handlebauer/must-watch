import connect from './irc/index.js'
import { Discord } from './discord/index.js'

const log = Discord.internalLog()

new Promise(() => connect(log)).catch(Discord.error)

process.once('SIGINT', () => {
  log.add('Gracefully shutting down...')
  log.send().then(() => {
    process.exit(143)
  })
})
