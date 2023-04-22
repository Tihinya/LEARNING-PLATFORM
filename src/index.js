const chatBox = document.querySelector("#chat-box")
const chatInput = document.querySelector("#chat-input")
const categoriesList = document.querySelector("#categories-list")

let disabled = false

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
        category.onclick = () => {
            fetch(`/${categoryName}`)
                .then((r) => r.json())
                .catch(() => [])
                .then((r) => updateMessages(true)(...r))
        }

        categoriesList.appendChild(category)
    })
}

function updateMessages(override = false) {
    if (override) {
        chatBox.innerHTML = ""
    }

    return (...state) => {
        for (const { role, content } of state) {
            if (!["user", "assistant"].includes(role) || content === "") {
                continue
            }

            let message = document.createElement("div")

            message.className =
                role === "user"
                    ? "message"
                    : role === "assistant"
                    ? "message message_is-ai"
                    : ""
            let avatar = document.createElement("div")
            avatar.className =
                role === "user"
                    ? "message__avatar"
                    : role === "assistant"
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
    if (e.code !== "Enter" || e.shiftKey || e.ctrlKey || disabled) {
        return
    }

    e.preventDefault()

    const message = e.target.value.trim()

    if (message === "") {
        return
    }

    disabled = true
    fetch("/test/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
    })
        .then((r) => r.json())
        .catch(() => [])
        .then((r) => updateMessages(true)(...r))
        .finally(() => (disabled = false))

    updateMessages()({ role: "user", content: message })
    e.target.value = ""
}

getCategories()
