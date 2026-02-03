// import "dotenv/config";

// const getOpenAIAPIResponse = async(message) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-4o-mini",
//             messages: [{
//                 role: "user",
//                 content: message
//             }]
//         })
//     };

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//         const data = await response.json();
//         return data.choices[0].message.content; //reply
//     } catch(err) {
//         console.log(err);
//     }
// }
// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: "AIzaSyBSHmrKer2MCeQecqQNjqyxAgURCrY9O7I" });

// async function getOpenAIAPIResponse() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-pro",
//     contents: "who is virat kohli",
//   });
//   console.log(response.text);
// }

// getOpenAIAPIResponse();


import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {

  if (!message || !message.trim()) {
    return " Please enter a valid prompt.";
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: message }]
        }
      ]
    })
  };

  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;



  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (data?.error) {
      console.error("Gemini Error:", data.error);
      return ` Gemini API error: ${data.error.message}`;
    }

    if (data?.promptFeedback?.blockReason) {
      return " Prompt blocked by safety policy.";
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return " AI returned no reply. Please try again later.";
    }

    return reply;

  } catch (err) {
    console.error(err);
    return " Error occurred while connecting to Gemini API.";
  }
};

export default getOpenAIAPIResponse;
