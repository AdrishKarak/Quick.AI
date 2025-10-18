
import OpenAI from "openai";
import sql from "../config/db.js";
import {clerkClient} from "@clerk/express";

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});



export const generateArticle = async (req, res) => {
    try{
   const {userId} = req.auth();
   const {prompt , length} = req.body;
   const plan=req.plan;
     const free_usage = req.free_usage;

     if(plan != 'premium_pro' && free_usage >= 10){
         return res.json({success: false, message: 'You have used all your free usages. Upgrade to premium plan to use this feature.'})
     }

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [

                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: length
        });


     const content = response.choices[0].message.content;

     await sql`INSERT INTO creations (user_id, content, prompt, type) VALUES (${userId}, ${content}, ${prompt}, 'article')`;

     if(plan !=="premium_pro"){
         await clerkClient.users.updateUserMetadata(userId, {
             privateMetadata: {
                 free_usage: free_usage + 1
             }
         })
     }

     res.json({success: true, content})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}