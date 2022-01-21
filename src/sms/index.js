import { config } from 'dotenv'
import twilio from 'twilio'

import { Discord } from '../discord/index.js'

import { formatNumber } from '../utils/format-number.js'

config()

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)
const recipients = process.env.SMS_RECIPIENTS.split(',')

const buildBody = movie => {
  let body = 'Must Watch: '
  body +=
    movie.title === movie.originalTitle
      ? movie.title
      : `${movie.title} AKA ${movie.originalTitle}`
  body += `(${movie.year}) by ${movie.director}`

  body += '\n\n'
  body += Object.values(movie.ratings)
    .map(
      ({ name, value, count }) =>
        `${name}: ${value}${count ? ` (${formatNumber(count)})` : ''}`
    )
    .join('\n')
  return body
}

export class SMS {
  static async send(params, log) {
    const body = buildBody(params)

    const promises = recipients.map(async recipient => {
      try {
        const message = await client.messages.create({
          body,
          to: recipient,
          from: process.env.TWILIO_NUMBER,
          mediaUrl: params.posterUrl,
        })
        log.add(`  => SMS: ${message.status} for ${recipient}`)
      } catch (error) {
        Discord.error(error)
      }
    })

    await Promise.all(promises)
  }
}
