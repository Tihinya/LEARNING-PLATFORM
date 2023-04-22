function chatWithBot(apikey) {
    const apiKey = "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"
    let messages = []

    const chatOutput = document.getElementById("chat-output")
    const userInput = document.getElementById("user-input")
    const sendBtn = document.getElementById("send-btn")

    sendBtn.addEventListener("click", () => {
        const newMessage = userInput.value
        if (newMessage !== "") {
            // display user message in chat output
            chatOutput.innerHTML += `<div><strong>You:</strong> ${newMessage}</div>`
            messages.push({ role: "user", content: newMessage })
            // clear user input
            userInput.value = ""
            // generate response from chatbot
            fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: messages,
                    max_tokens: 100,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    const botMessage = data.choices[0].message.content
                    // display chatbot message in chat output
                    chatOutput.innerHTML += `<div><strong>Chatbot:</strong> ${botMessage}</div>`
                    console.log(botMessage)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    })
}

chatWithBot("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")
export { chatWithBot }
