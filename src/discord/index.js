import fetch from 'node-fetch'
import { buildEmbed } from './build-embed.js'

export class Discord {
  static async send(movie) {
    const embed = await buildEmbed(movie)

    const init = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ username: 'testing123', embeds: [embed] }),
    }

    const response = await fetch(process.env.DISCORD_WEBHOOK_URL, init)

    if (!response.ok) {
      throw new Error(
        `Failed with status: ${response.status} (${response.statusText})`
      )
    }
  }
}