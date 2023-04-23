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
    // return `Write it without saying "Sure........", I need only question and options and without printing scale.
    // I want you to act as a cybersecurity assistant.
    // Create a question 5 questions with an answer choice about ${category}.
    // Questions can have either one correct answer or several.
    // It's important to ask me a question only after I already answered previous.
    // Make the question no longer than 50 words. On a scale from 1 to 10 I understand this topic on 5.
    // Do not write an answers. Write only question one by one and options. After my last answer say how much correct answers i have.
    // Don't say correct answer while testing`

    return `Please provide a five-question test on ${category}, where each question is asked one at a time, waiting for my response before asking the next, and then provide feedback on my answers, including the number of correct answers and suggestions for improving my skills.`
}

function generateMaterials(category) {
    return `Tell me about ${category}, why is it dangerous and what can affect? Format your answer to make text more readable. Лnow i'm a newbie in this topic`
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
