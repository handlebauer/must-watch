import { config } from 'dotenv'
import fetch from 'node-fetch'

import { InternalLog } from './InternalLog.js'

import { BOT_NAME, DISCORD_WEBHOOK_MAP } from '../constants.js'
import { buildEmbed } from './build-embed.js'

config()

export class Discord {
  static async log(channel, { embed, message, error }) {
    const body = JSON.stringify({
      username: BOT_NAME,
      ...(embed && { embeds: [await buildEmbed(embed)] }),
      ...(message && { content: message }),
      ...(error && { content: `\`\`\`${error.stack}\`\`\`` }),
    })

    const init = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body,
    }

    const response = await fetch(DISCORD_WEBHOOK_MAP[channel], init)

    if (!response.ok) {
      console.error(
        `  => Discord webhook error: ${response.status} (${response.statusText})`
      )
    }

    return response
  }

  static internalLog() {
    return new InternalLog()
  }
}
