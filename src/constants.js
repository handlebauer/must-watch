import { config } from 'dotenv'

config()

export const BOT_NAME = `MustWatch`

export const IRC_SERVER = 'irc.passthepopcorn.me'
export const IRC_CHANNEL = '#ptp-announce'

export const DISCORD_AUTHOR_ICON_URL = 'https://i.imgur.com/swKKHLk.png'
export const DISCORD_WEBHOOK_MAP = {
  '#log': process.env.DISCORD_WEBHOOK_URL_LOG,
  '#runner-up-log': process.env.DISCORD_WEBHOOK_URL_RUNNER_UP_LOG,
  '#internal-log': process.env.DISCORD_WEBHOOK_URL_INTERNAL_LOG,
}

export const TMDB_BASE_URL = 'https://api.themoviedb.org'
export const TMDB_API_VERSION = 3
