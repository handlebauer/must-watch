import { config } from 'dotenv'
import { IRC_CHANNEL } from '../constants.js'
import handleMessage from './handle-message.js'

config()

export default (client, log) => () => {
  log.add(`IRC: connected as ${client.hostMask}`)
  log.send()

  client.say(
    'Hummingbird',
    `ENTER ${process.env.PTP_USERNAME} ${process.env.PTP_IRC_KEY} ${IRC_CHANNEL}`
  )

  client.addListener(`message${IRC_CHANNEL}`, handleMessage(log))
}
