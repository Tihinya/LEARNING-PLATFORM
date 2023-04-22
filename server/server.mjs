import express from "express"
import cors from "cors"
import path from "path"
import { __dirname, port } from "./config.mjs"
import {
    IndexPage,
    MaterialsPage,
    SendPrompt,
    GetCategories,
    ServeCategorie,
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
app.get("/material", MaterialsPage)
app.get("/categories", GetCategories)
app.post("/:type/send", SendPrompt)
app.get("/:categorie", ServeCategorie)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
