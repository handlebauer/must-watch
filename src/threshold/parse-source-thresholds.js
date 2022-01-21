import { config } from 'dotenv'

config()

export const parseSourceThresholds = () => {
  return process.env.THRESHOLD.split(',').map(string => {
    const [source, threshold] = string.split('=')

    const re = /(?<rating>\d{1,2})\((?<voteCount>\d+)\)/
    const { groups } = threshold.match(re) || {}

    return { source, ...groups }
  })
}
