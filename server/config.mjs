import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const port = 3000
const categories = [
    "Phishing",
    "Spear Phishing",
    "Whaling",
    "Personalised Attacks",
    "Abobus",
]
const deafultState = categories.reduce(
    (acc, category) => ({ ...acc, [category]: [] }),
    {}
)

export { __dirname, port, categories, deafultState }
