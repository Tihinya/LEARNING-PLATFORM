const apiKey = "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"
let score = 5
function handlePrompt(newMessage, messageHistory = [], callback) {
    if (newMessage === "") {
        return
    }
    // display user message in chat output
    messageHistory.push({ role: "user", content: newMessage })
    // generate response from chatbot
    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: messageHistory,
            max_tokens: 100,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (!data.choices[0].message.content) {
                messageHistory.pop()
                throw "Error"
            }
            callback(data)
        })
}

const summary = (data) => {
    const botMessage = data.choices[0].message.content
    const correctReg = /^Correct/
    const wrongReg = /^Wrong/
    if (correctReg.test(botMessage)) {
        score++
    } else if (wrongReg.test(botMessage)) {
        score--
    }
    const chatOutput = document.getElementById("chat-output")
    chatOutput.innerHTML += `<div><strong>Chatbot:</strong> ${botMessage}</div>`
}

function testPrompt() {
    let messageHistory = [
        {
            role: "user",
            content: "Save my score: my score is " + score + " points",
        },
    ]

    const sendBtn = document.getElementById("send-btn")
    sendBtn.addEventListener("click", () => {
        const userInput = document.getElementById("user-input")
        const chatOutput = document.getElementById("chat-output")
        chatOutput.innerHTML += `<div><strong>You:</strong> ${userInput.value}</div>`
        handlePrompt(userInput.value, messageHistory, summary)
        userInput.value = ""
    })
}

testPrompt()

export { handlePrompt, summary }
