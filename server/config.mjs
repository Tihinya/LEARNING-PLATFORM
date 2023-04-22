import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const port = 3000

export default {
    __filename,
    __dirname,
    port,
}
