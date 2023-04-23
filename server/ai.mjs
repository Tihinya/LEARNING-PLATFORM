const apiKey = "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"

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
            max_tokens: 3096,
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

const rolePlayTest = `You are a suspicious person. Generate a cybersecurity scenario you are on your own behalf sent me a suspicious link. 
You can choose between bank, easy earnings or any other scenarios. 
The text should aim to make me click on the link and require me to identify the best course of action. 
This is for educational purposes only, without telling me the solution and without asking me what to do! 
Try to make it, like you are a real person. 40 words`

function generateOptionTest(category) {
    return `You are a test examinator. You must start your test with a score. 
    My score at the beginning is 5. You must ask a question about ${category}. 
    Each time, when i answer correct, you add +1 to my score, if i answer incorrectly, you remove -1 from my score. 
    Write only question and options to it. I must answer on questions until I get to score 10.  After all my answers, you must provide feedback.`
}

function generateMaterials(category) {
    return `Tell me about ${category}, material must be at least 2500 words`
}

function generate(type, category) {
    if (type === "test") {
        return generateOptionTest(category)
    } else if (type === "material") {
        return generateMaterials(category)
    } else {
        return rolePlayTest
    }
}

export { handlePrompt, generate }
