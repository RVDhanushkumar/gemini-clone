import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";
dotenv.config();

export async function gemini(req,res){
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

    const {prompt} = req.body;
    if(!prompt){
        res.status(404).send("prompt feild is missing");
    }
    async function main(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `${prompt}, in simple 1-2 paragraphs only.`,
    });
        console.log(response.text);
        res.status(200).send(response.text);
    }

    await main(prompt);
}