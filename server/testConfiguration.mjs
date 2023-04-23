//may be exported
let score = 5

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
