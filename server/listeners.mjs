import express from "express"
import { __dirname, categories, deafultState } from "./config.mjs"
import path from "path"

const currentCategorie = ""
const currentState = Object.assign({}, deafultState)

export function IndexPage(req, res) {
    res.sendFile(path.join(__dirname, "..", "src/index.html"))
}

export function MaterialsPage(req, res) {
    res.sendFile(path.join(__dirname, "..", "src/materials.html"))
}

export function SendMessage(req, res) {
    try {
        // try to send the message to ai
        res.json(currentState[currentCategorie])
    } catch (err) {
        console.error(err)
        res.status(400).json({ error: "Invalid JSON data in request body" })
    }
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
