const apiKey = "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"

const chatOutput = document.getElementById("chat-output")
const userInput = document.getElementById("user-input")
const sendBtn = document.getElementById("send-btn")

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
}

let messageHistory = [
    {
        role: "user",
        content: "Save my score: my score  is " + score + " points",
    },
]

handlePrompt(
    "You are a cybersecurity specialist. Create a question with an answer choice about Phishing. On a scale from 1 to 10 I understand this topic on " +
        score +
        ". Do not write an answer.",
    messageHistory,
    summary
)
export { chatWithBot }
