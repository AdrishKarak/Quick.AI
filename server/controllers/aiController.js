import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import FormData from "form-data";   


// ================= AI CLIENT =================

const getAIClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY missing in environment variables");
  }

  return new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  });
};



// ================= GENERATE ARTICLE =================

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;

    if (!prompt)
      return res.status(400).json({ success: false, message: "Prompt required" });

    const AI = getAIClient();

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: length || 500,
    });

    const content = response.choices?.[0]?.message?.content || "No response";

    await sql`
      INSERT INTO creations (user_id, content, prompt, type)
      VALUES (${userId}, ${content}, ${prompt}, 'article')
    `;

    res.json({ success: true, content });
  } catch (error) {
    console.error("Generate Article Error:", error.message);
    res.status(500).json({ success: false, message: "AI generation failed" });
  }
};



// ================= BLOG TITLE =================

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;

    const AI = getAIClient();

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices?.[0]?.message?.content || "No response";

    await sql`
      INSERT INTO creations (user_id, content, prompt, type)
      VALUES (${userId}, ${content}, ${prompt}, 'blog-title')
    `;

    res.json({ success: true, content });
  } catch (error) {
    console.error("Blog Title Error:", error.message);
    res.status(500).json({ success: false, message: "AI generation failed" });
  }
};



// ================= GENERATE IMAGE =================

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;

    const formData = new FormData();
    formData.append("prompt", prompt);

    const response = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const base64image = `data:image/png;base64,${Buffer.from(
      response.data
    ).toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64image);

    await sql`
      INSERT INTO creations (user_id, content, prompt, type, publish)
      VALUES (${userId}, ${secure_url}, ${prompt}, 'image', ${
      publish ?? false
    })
    `;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.error("Image Error:", error.message);
    res.status(500).json({ success: false, message: "Image generation failed" });
  }
};

export const removeImageBackground = async (req, res) => {
    try{
        const {userId} = req.auth();
        const image = req.file;
        const plan = req.plan;


        if(plan !== 'premium_pro'){
            return res.json({success: false, message: 'Upgrade to premium plan to use this feature.'})
        }


        const {secure_url} = await cloudinary.uploader.upload(image.path, {
            transformation: [
                {
                    effect: 'background_removal',
                    background_removal: 'remove the background'
                }
            ]
        })

        await sql`INSERT INTO creations (user_id, content, prompt, type ) VALUES (${userId}, ${secure_url}, 'Remove background from the image', 'image')`;

        res.json({success: true, content: secure_url})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}


export const removeImageObject = async (req, res) => {
    try {
        const { userId } = req.auth; // ✅ fixed
        const { object } = req.body;
        const image = req.file;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        if (!image) {
            return res.status(400).json({ success: false, message: "No image uploaded" });
        }

        const plan = req.plan || "free";
        if (plan !== "premium_pro") {
            return res
                .status(403)
                .json({ success: false, message: "Upgrade to premium plan to use this feature." });
        }

        // ✅ Upload image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(image.path);
        const imageUrl = cloudinary.url(uploadResult.public_id, {
            transformation: [{ effect: `gen_remove:${object}` }],
            resource_type: "image",
        });

        // ✅ Store result in database
        await sql`
            INSERT INTO creations (user_id, content, prompt, type)
            VALUES (${userId}, ${imageUrl}, ${`removed ${object} from image`}, 'image')
        `;

        res.json({ success: true, content: imageUrl });
    } catch (error) {
        console.error("Remove Image Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// ================= RESUME REVIEW =================

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;

    if (!resume)
      return res.json({ success: false, message: "Resume file missing" });

    
    const pdfParseModule = await import("pdf-parse");
    const PDFParse = pdfParseModule.default || pdfParseModule;

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await PDFParse(dataBuffer);

    const AI = getAIClient();

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: pdfData.text }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices?.[0]?.message?.content || "No response";

    await sql`
      INSERT INTO creations (user_id, content, prompt, type)
      VALUES (${userId}, ${content}, 'Resume Review', 'resume-review')
    `;

    res.json({ success: true, content });
  } catch (error) {
    console.error("Resume Review Error:", error.message);
    res.status(500).json({ success: false, message: "Resume review failed" });
  }
};
