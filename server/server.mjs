import express from "express"
import cors from "cors"
import path from "path"
import cfg from "./config.mjs"
const app = express()

app.use(
    cors({
        origin: "*",
        methods: "*",
    })
)
app.use(express.json())
app.use(express.static(path.join(cfg.__dirname, "..", "src")))

//get request to '/'
app.get("/", (req, res) => {
    res.sendFile(path.join(cfg.__dirname, "..", "src/index.html"))
})

app.get("/materials", (req, res) => {
    res.sendFile(path.join(cfg.__dirname, "..", "src/materials.html"))
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

app.listen(cfg.port, () => {
    console.log(`Server running at http://localhost:${cfg.port}`)
})
