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
    const correctReg = /^True/
    const wrongReg = /^False/
    if (correctReg.test(botMessage)) {
        score++
    } else if (wrongReg.test(botMessage)) {
        score--
    }
    console.log(score)
    return botMessage
}

function testPrompt() {
    let messageHistory = [
        {
            role: "user",
            content: "Save my score: my score is " + score + " points",
        },
    ]
    const startBtn = document.getElementById("start-btn")
    startBtn.addEventListener("click", () => {
        const startingPrompt =
            'Write it without saying "Sure........" , i need only question and options and without printing  scale. I want you to act as a cybersecurity assistant. Using your experience in cybersecurity, create a question with an answer choice about Phishing. Make the question no longer than 50 words. On a scale from 1 to 10 I understand this topic on 5. Do not write an answer. Write only question and options'

        let botMessage = handlePrompt(startingPrompt, messageHistory, summary)
        // const chatOutput = document.getElementById("chat-output")
        // // chatOutput.innerHTML += `<div><strong>Chatbot:</strong> ${botMessage}</div>`
    })

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

export { handlePrompt }
