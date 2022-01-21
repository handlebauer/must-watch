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
  client.connect(handleConnect(client, log))
}
