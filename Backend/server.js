import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";

import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import userRoutes from "./routes/user.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://promptlabfrontend.onrender.com"
  ],
  credentials: true
}));

// app.use(cors({
//   origin: "*", // for testing only
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected with Database!");
    } catch(err) {
        console.log("Failed to connect with Db", err);
    }
}


app.get("/ping", (req, res) => {
  res.send("pong");
});
app.use("/", userRoutes);
app.use("/api", chatRoutes);




app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
    connectDB();
});
// app.post("/test", async (req, res) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-4o-mini",
//             messages: [{
//                 role: "user",
//                 content: req.body.message
//             }]
//         })
//     };

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//         const data = await response.json();
//         //console.log(data.choices[0].message.content); //reply
//         res.send(data.choices[0].message.content);
//     } catch(err) {
//         console.log(err);
//     }
// });

