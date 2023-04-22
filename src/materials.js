import { handleInput, updateMessages } from "./utils.js"

const chatInput = document.querySelector("#chat-input")

chatInput.onkeydown = handleInput("material")

fetch(`material/messages`)
    .then((r) => r.json())
    .then((r) => updateMessages(true)(...r), console.log)
