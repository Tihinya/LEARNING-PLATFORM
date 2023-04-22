import express from "express"
import { __dirname, categories, deafultState } from "./config.mjs"
import path from "path"
import { handlePrompt } from "../ai/ai.mjs"

let currentCategorie = ""
let currentState = Object.assign({}, deafultState)

export function IndexPage(req, res) {
    res.sendFile(path.join(__dirname, "..", "src/index.html"))
}

export function MaterialsPage(req, res) {
    res.sendFile(path.join(__dirname, "..", "src/materials.html"))
}

export function SendMessage(req, res) {
    if (currentCategorie === "") {
        res.status(403).end()
        return
    }

    const catecorieSnap = currentCategorie
    handlePrompt(
        req.body.message,
        currentState[catecorieSnap],
        ({ content, role }) => {
            currentState[catecorieSnap].push({ role, content })
            res.json(currentState[currentCategorie])
        }
    ).catch(() => res.status(500).end())
}

export function GetCategories(req, res) {
    res.json({ categories })
}

export const CustomRouter = express.Router()
CustomRouter.get("/:categorie", ServeCategorie)
function ServeCategorie(req, res) {
    const categorie = req.params.categorie

    if (categories.includes(categorie)) {
        currentCategorie = `${categorie}`
        res.json(currentState[categorie])
    } else {
        res.json({ status: "No access" })
    }
}
