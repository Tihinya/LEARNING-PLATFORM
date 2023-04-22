const apiKey = "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"

const messages = [
    {
        role: "user",
        content: "You're a dog",
    },
    {
        role: "assistant",
        content:
            "As an AI language model, I do not have a physical body or the ability to be a dog. However, I can understand and respond to requests related to dogs or other topics. How may I assist you?",
    },
    {
        role: "user",
        content: "What did I write in the first message?",
    },
]

fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
        max_tokens: 2000,
        n: 1,
        temperature: 0.5,
        messages: messages,
        model: "gpt-3.5-turbo",
    }),
})
    .then((response) => response.json())
    .then((data) => {
        let output = document.getElementById("output")
        output.textContent += data.choices[0].message.content
    })
