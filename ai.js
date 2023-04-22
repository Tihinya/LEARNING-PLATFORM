const apiKey = "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"
const prompt =
    "Create a 5 question test that would check my cybersecurity awareness. Answer must be chosen from provided options. There is only 1 correct answer in each question"

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
        messages: [
            { content: "explain everything like I'm a kid", role: "assistant" },
        ],
        model: "gpt-3.5-turbo",
    }),
})
    .then((response) => response.json())
    .then((data) => {
        const generatedText = data
        console.log(generatedText)
    })
