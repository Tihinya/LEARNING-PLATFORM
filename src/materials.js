import { disabled, handleInput, updateMessages } from "./utils.js"

const spinner = document.querySelector("#spinner")
const chatInput = document.querySelector("#chat-input")

chatInput.onkeydown = handleInput("material")

spinner.classList.remove("loader_is-hidden")

fetch(`material/messages`)
    .then((r) => r.json())
    .then((r) => updateMessages(true)(...r), console.log)
    .finally(() => {
        spinner.classList.add("loader_is-hidden")
    })
