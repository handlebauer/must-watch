import { IRC_SERVER, IRC_NICK } from '../constants.js'
import { Client } from 'irc'
import handleConnect from './handle-connect.js'

const config = {
  autoConnect: false,
  port: 6667,
  userName: IRC_NICK,
  realName: IRC_NICK,
  debug: true,
}

export default () => {
  const client = new Client(IRC_SERVER, IRC_NICK, config)
  client.connect(handleConnect(client))
}
