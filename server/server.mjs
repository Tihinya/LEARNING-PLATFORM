import express from "express"
import cors from "cors"
import path from "path"
import { __dirname, port } from "./config.mjs"
import {
    IndexPage,
    MaterialsPage,
    SendMessage,
    GetCategories,
    CustomRouter,
} from "./listeners.mjs"

const app = express()
app.use(
    cors({
        origin: "*",
        methods: "*",
    })
)
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "src")))

app.get("/", IndexPage)
app.get("/materials", MaterialsPage)
app.get("/categories", GetCategories)
app.post("/message/send", SendMessage)
app.use("/", CustomRouter)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
