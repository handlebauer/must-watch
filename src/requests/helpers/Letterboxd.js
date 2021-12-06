import { config } from 'dotenv'
import fetch from 'node-fetch'
import crypto from 'crypto'
import { v4 as uuid } from 'uuid'

config()

export default class {
  constructor() {
    this.baseUrl = 'https://api.letterboxd.com/api/v0'
    this.method = 'GET'
    this.url = null
    this.path = ''
  }

  // Generate [METHOD]\u0000[FULLY QUALIFIED URL]\u0000[BODY]
  generateSaltedString(params) {
    this.url = new URL(this.baseUrl + this.path)
    this.url.search = new URLSearchParams({
      ...params,
      nonce: uuid(),
      timestamp: Math.round(Date.now() / 1e3), // Number of seconds elapsed since January 1, 1970 00:00:00 UTC
      apikey: process.env.LETTERBOXD_API_KEY,
    })
    return `${this.method}\u0000${this.url}\u0000`
  }

  generateSignature(saltedString) {
    return crypto
      .createHmac('sha256', process.env.LETTERBOXD_API_SECRET)
      .update(saltedString)
      .digest('hex')
  }

  async get({ path, ...params }) {
    this.path = path

    const saltedString = this.generateSaltedString(params)
    const signature = this.generateSignature(saltedString)

    this.url.searchParams.append('signature', signature)

    const response = await fetch(this.url)

    if (!response.ok) {
      throw new Error(
        `Failed with status: ${response.status} (${response.statusText})`
      )
    }

    return await response.json()
  }
}
