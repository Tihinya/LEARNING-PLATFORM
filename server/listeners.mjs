import { __dirname, categories, deafultState } from "./config.mjs"
import path from "path"
import { handlePrompt } from "./ai.mjs"

let currentCategorie = ""
let State = Object.assign({}, deafultState)

export function IndexPage(req, res) {
    res.sendFile(path.join(__dirname, "..", "src/index.html"))
}

export function MaterialsPage(req, res) {
    if (currentCategorie === "") {
        res.redirect("/")
        return
    }
    res.sendFile(path.join(__dirname, "..", "src/materials.html"))
}

export function SendPrompt(req, res) {
    const type = req.params.type
    if (currentCategorie === "" || !["test", "material"].includes(type)) {
        res.status(403).end()
        return
    }

    const catecorieSnap = currentCategorie
    handlePrompt(
        req.body.message,
        State[catecorieSnap][type],
        ({ content, role }) => {
            State[catecorieSnap][type].push({ role, content })
            res.json(State[currentCategorie][type])
        }
    ).catch((e) => {
        console.log(e)
        res.status(500).end()
    })
}

export function GetCategories(req, res) {
    res.json({ categories })
}

export function ServeCategorie(req, res) {
    const categorie = req.params.categorie

    if (categories.includes(categorie)) {
        currentCategorie = `${categorie}`
        res.json(State[categorie]["test"])
    } else {
        res.json({ status: "No access" })
    }
}
