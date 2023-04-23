import { handleInput, updateMessages, spinner } from "./utils.js"

const chatInput = document.querySelector("#chat-input")
const categoriesList = document.querySelector("#categories-list")

let activeButton = null

fetch("/categories", {
    method: "GET",
})
    .then((r) => r.json())
    .then(updateCategory, (e) => console.log(e))

function updateCategory({ categories = [] }) {
    categoriesList.innerHTML = ""

    categories.forEach((categoryName) => {
        let category = document.createElement("li")
        category.className = "categories__item"
        category.textContent = categoryName
        category.onclick = () => {
            if (activeButton)
                activeButton.classList.remove("categories__item_is-active")
            activeButton = category
            category.classList.add("categories__item_is-active")

            spinner.classList.remove("loader_is-hidden")

            fetch(`/${categoryName}`)
                .then((r) => r.json())
                .then((r) => updateMessages(true)(...r), console.log)
                .finally(() => {
                    spinner.classList.add("loader_is-hidden")
                })
        }

        categoriesList.appendChild(category)
    })
}

chatInput.onkeydown = handleInput("test")
