import { config } from 'dotenv'
import { IRC_CHANNEL } from '../constants.js'
import handleMessage from './handle-message.js'

config()

export default handleConnect = client => () => {
  console.log(`Successfully connected as ${client.hostMask}`)

  client.say(
    'Hummingbird',
    `ENTER ${process.env.PTP_USERNAME} ${process.env.PTP_IRC_KEY} ${IRC_CHANNEL}`
  )

  client.addListener(`message${IRC_CHANNEL}`, handleMessage)
}
