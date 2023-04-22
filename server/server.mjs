import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = 3000
app.use(express.json())
app.use(
    cors({
        origin: "*",
        methods: "*",
    })
)

//get request to '/'
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/test.html"))
})

//post request to '/'
app.post("/", (req, res) => {
    try {
        console.log(req.body)
        res.json({ message: "Data received successfully!" })
    } catch (err) {
        console.error(err)
        res.status(400).json({ error: "Invalid JSON data in request body" })
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
