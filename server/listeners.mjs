import { __dirname, categories, deafultState } from "./config.mjs"
import path from "path"
import { generate, handlePrompt } from "./ai.mjs"

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

export function MaterialsMessages(req, res) {
    if (currentCategorie === "") {
        res.redirect("/")
        return
    }

    if (State[currentCategorie]["material"].length > 0) {
        res.json(State[currentCategorie]["material"].slice(1))
        return
    }
    const catecorieSnap = currentCategorie
    handlePrompt(
        generate("material", currentCategorie),
        State[catecorieSnap]["material"],
        ({ content, role }) => {
            State[catecorieSnap]["material"].push({ role, content })
            res.json(State[currentCategorie]["material"].slice(1))
        }
    ).catch((e) => {
        console.log(e)
        res.status(500).end()
    })
}

export function SendPrompt(req, res) {
    const type = req.params.type
    if (currentCategorie === "" || !["test", "material"].includes(type)) {
        res.status(403).end()
        return
    }

    const prompt =
        State[currentCategorie][type].length > 0
            ? req.body.message
            : generate(type, currentCategorie)

    const catecorieSnap = currentCategorie
    handlePrompt(prompt, State[catecorieSnap][type], ({ content, role }) => {
        State[catecorieSnap][type].push({ role, content })
        res.json(State[currentCategorie][type].slice(1))
    }).catch((e) => {
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
        if (State[categorie]["test"].length > 0) {
            res.json(State[categorie]["test"].slice(1))
            return
        }
        const catecorieSnap = currentCategorie
        handlePrompt(
            generate("test", currentCategorie),
            State[catecorieSnap]["test"],
            ({ content, role }) => {
                State[catecorieSnap]["test"].push({ role, content })
                res.json(State[currentCategorie]["test"].slice(1))
            }
        ).catch((e) => {
            console.log(e)
            res.status(500).end()
        })
    } else {
        res.json({ status: "No access" })
    }
}
