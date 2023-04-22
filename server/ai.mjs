const apiKey = "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"
let score = 5
async function handlePrompt(newMessage, messageHistory = [], callback) {
    if (newMessage === "") {
        return
    }
    // display user message in chat output
    messageHistory.push({ role: "user", content: newMessage })
    // generate response from chatbot
    return fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: messageHistory,
            max_tokens: 2048,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error || !data.choices[0].message.content) {
                messageHistory.pop()
                throw data.error
            }
            if (callback) callback(data.choices[0].message)
            return data.choices[0].message.content
        })
}

export { handlePrompt }
