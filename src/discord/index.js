import { config } from 'dotenv'
import fetch from 'node-fetch'

import { BOT_NAME } from '../constants.js'
import { buildEmbed } from './build-embed.js'

config()

export class Discord {
  static async send(params) {
    const embed = await buildEmbed(params)

    const init = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username: BOT_NAME, embeds: [embed] }),
    }

    const response = await fetch(process.env.DISCORD_WEBHOOK_URL, init)

    if (!response.ok) {
      throw new Error(
        `Failed with status: ${response.status} (${response.statusText})`
      )
    }
  }
}
