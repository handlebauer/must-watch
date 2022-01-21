import { Discord } from './index.js'

export class InternalLog {
  constructor() {
    this.body = '\n'
  }

  add(part) {
    this.body += part + '\n'
  }

  clear() {
    this.body = '\n'
  }

  async send() {
    const message = this.toString()
    this.clear()
    return Discord.send('#internal-log', message)
  }

  toString() {
    return `\`\`\`${this.body}\`\`\``
  }
}
