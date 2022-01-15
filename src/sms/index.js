import { config } from 'dotenv'
import twilio from 'twilio'

config()
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)
const recipients = process.env.SMS_RECIPIENTS.split(',')

const buildBody = movie => {
  let body = 'Must Watch Alert: '
  body += `${
    movie.title === movie.originalTitle
      ? movie.title
      : `${movie.title} AKA ${movie.originalTitle}`
  } (${movie.year}) by ${movie.director}`
  return body
}

export class SMS {
  static async send(params) {
    const body = buildBody(params)

    recipients.forEach(recipient => {
      try {
        client.messages.create({
          body,
          to,
          from: process.env.TWILIO_NUMBER,
        })
      } catch (err) {
        console.error(`Twilio error: ${err.message}`)
      }
    })
  }
}
