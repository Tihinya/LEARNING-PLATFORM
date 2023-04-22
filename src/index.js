const chatBox = document.querySelector("#chat-box")
const chatInput = document.querySelector("#chat-input")
const categoriesList = document.querySelector("#categories-list")

function getCategories() {
    fetch("/categories", {
        method: "GET",
    })
        .then((r) => r.json())
        .catch(() => [])
        .then(updateCategory)
}

function updateCategory({ categories = [] }) {
    categoriesList.innerHTML = ""

    categories.forEach((categoryName) => {
        let category = document.createElement("li")
        category.className = "categories__item"
        category.textContent = categoryName
        category.onclick(() => {
            fetch(`/${categoryName}`)
                .then((r) => r.json())
                .catch(() => [])
                .then(updateMessages(true))
        })

        categoriesList.appendChild(category)
    })
}

function updateMessages(override = false) {
    if (override) {
        chatBox.innerHTML = ""
    }

    return (...state) => {
        for (const { role, content } of state) {
            if (role === "" || content === "") {
                continue
            }

            let message = document.createElement("div")
            message.className = "message"
            let avatar = document.createElement("div")
            avatar.className =
                role === "user"
                    ? "message__avatar"
                    : role === "system"
                    ? "message__avatar message__avatar_is-ai"
                    : ""

            let container = document.createElement("div")
            container.className = "message__container"
            container.textContent = content

            message.append(avatar, container)
            chatBox.appendChild(message)
        }
    }
}

chatInput.onkeydown = (e) => {
    if (e.code !== "Enter" || e.shiftKey || e.ctrlKey) {
        return
    }

    e.preventDefault()

    let newText = messageBoxInput.innerHTML
        .replaceAll("<br>", "\n")
        .replaceAll("&nbsp;", " ")
        .trim()

    if (newText === "") {
        return
    }

    fetch("/message/send", {
        method: "POST",
        body: JSON.stringify({ message: newText })
            .then((r) => r.json())
            .catch(() => [])
            .then(updateMessages(true)),
    })

    updateMessages()({ role: "user", content: newText })

    messageBoxInput.innerHTML = ""
}

getCategories()
