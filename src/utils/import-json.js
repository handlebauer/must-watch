import { readFile } from 'fs/promises'

export default path => {
  return JSON.parse(await readFile(new URL(path, import.meta.url)))
}
