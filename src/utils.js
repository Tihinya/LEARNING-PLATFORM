const chatBox = document.querySelector("#chat-box")

function handleInput(link) {
    let disabled = false

    return (e) => {
        if (e.code !== "Enter" || e.shiftKey || e.ctrlKey || disabled) {
            return
        }

        e.preventDefault()

        const message = e.target.value.trim()

        if (message === "") {
            return
        }

        disabled = true
        fetch(`/${link}/send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        })
            .then((r) => r.json())
            .then(
                (r) => updateMessages(true)(...r),
                (e) => console.log(e)
            )
            .finally(() => (disabled = false))

        updateMessages()({ role: "user", content: message })
        e.target.value = ""
    }
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

        chatBox.scrollTo(0, chatBox.scrollHeight)
    }
}

export { updateMessages, handleInput }
