import { IRC_SERVER, BOT_NAME } from '../constants.js'
import { Client } from 'irc'
import handleConnect from './handle-connect.js'

const config = {
  autoConnect: false,
  port: 6667,
  userName: BOT_NAME,
  realName: BOT_NAME,
}

export default async log => {
  log.add('Booting up...')
  await log.send()

  const client = new Client(IRC_SERVER, BOT_NAME, config)
  log.add(`IRC: connecting to ${IRC_SERVER}:${config.port}`)
  await log.send()

  client.connect(handleConnect(client, log))
}
