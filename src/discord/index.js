import { config } from 'dotenv'
import fetch from 'node-fetch'

import { InternalLog } from './InternalLog.js'

import { BOT_NAME } from '../constants.js'
import { buildEmbed } from './build-embed.js'

config()

export class Discord {
  static async log(params, log) {
    const embed = await buildEmbed(params)

    const init = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username: BOT_NAME, embeds: [embed] }),
    }

    const response = await fetch(process.env.DISCORD_WEBHOOK_URL_LOG, init)

    if (!response.ok) {
      console.error(
        `  => Discord webhook error: ${response.status} (${response.statusText})`
      )
    }

    log.add(`  => Discord (#log): message sent`)

    return response
  }

  static async send(channel, message) {
    const init = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username: BOT_NAME, content: message }),
    }

    const response = await fetch(
      process.env.DISCORD_WEBHOOK_URL_INTERNAL_LOG,
      init
    )

    if (!response.ok) {
      console.error(
        `  => Discord webhook error: ${response.status} (${response.statusText})`
      )
    }

    console.log(`  => Discord (${channel}): message sent`)

    return response
  }

  static internalLog() {
    return new InternalLog()
  }

  static async error(error) {
    const content = `\`\`\`${error.stack}\`\`\``

    const init = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username: BOT_NAME, content }),
    }

    const response = await fetch(process.env.DISCORD_WEBHOOK_URL_LOG, init)

    if (!response.ok) {
      console.error(
        `  => Discord webhook error: ${response.status} (${response.statusText})`
      )
    }

    console.log(`  => Discord (#log): message sent`)

    return response
  }
}
