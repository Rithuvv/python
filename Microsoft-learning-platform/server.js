const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();
const PORT = 3000;

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.use(express.json());

app.use(express.static(__dirname));


app.post("/api/explain", async (req, res) => {

    try {

        const {
            completedCertification,
            nextCertification,
            domain
        } = req.body;


        if (
            !completedCertification ||
            !nextCertification ||
            !domain
        ) {

            return res.status(400).json({
                error: "Missing required information."
            });

        }


     const prompt = `
         You are an encouraging Microsoft Learning Guide.

         The student's domain is: ${domain}

         The student has JUST COMPLETED:
         ${completedCertification}

         Our application has ALREADY DECIDED that the NEXT certification is:
         ${nextCertification}

         Your ONLY job is to explain WHY this already-selected certification
         is a logical next step.

         Do NOT recommend, select, or suggest any certification.
         Do NOT say "the next step is".
         Do NOT repeat the certification name unnecessarily.

         Write exactly 1 or 2 short, beginner-friendly sentences explaining
         the connection between what the student completed and what they are
         about to learn.

         Start naturally with something like:
         "Because you've built a foundation in..."

         Be encouraging and concise.
       `;


        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });


        res.json({
            explanation: response.text
        });


    } catch (error) {

        console.error("Gemini API Error:", error);

        res.status(500).json({
            error: "Gemini request failed."
        });

    }

});


app.listen(PORT, () => {

    console.log(
        `Microsoft Learning Platform running at http://localhost:${PORT}`
    );

});