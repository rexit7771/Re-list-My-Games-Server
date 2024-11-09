require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");

const gemini = async (game) => {
    // Make sure to include these imports:
    // import { GoogleGenerativeAI } from "@google/generative-ai";
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // const Base_URL = `https://api.rawg.io/api/games?key=${process.env.API_KEY_RAWG}`

    const prompt = `Tell me summary story of the ${game} game and response must be a json format. create without \`\`\`json and \`\`\``;
    // const prompt = `Tell me about ${game} game and response must be a json format. create without \`\`\`json and \`\`\``;

    const result = await model.generateContent(prompt);
    return (JSON.parse(result.response.text().trim()));
}

module.exports = gemini