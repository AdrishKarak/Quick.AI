import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import PDFParse from "pdf-parse";


// ✅ NEVER initialize env-based SDK at top level in serverless apps
const getAIClient = () => {
  return new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  });
};



// ========================== GENERATE ARTICLE ==========================

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium_pro" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "You have used all your free usages.",
      });
    }

    const AI = getAIClient();

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, content, prompt, type)
      VALUES (${userId}, ${content}, ${prompt}, 'article')
    `;

    if (plan !== "premium_pro") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    console.error("Generate Article Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// ========================== BLOG TITLE ==========================

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium_pro" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "You have used all your free usages.",
      });
    }

    const AI = getAIClient();

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, content, prompt, type)
      VALUES (${userId}, ${content}, ${prompt}, 'blog-title')
    `;

    res.json({ success: true, content });
  } catch (error) {
    console.error("Blog Title Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// ========================== GENERATE IMAGE ==========================

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== "premium_pro") {
      return res.json({
        success: false,
        message: "Upgrade to premium plan.",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const response = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: { "x-api-key": process.env.CLIPDROP_API_KEY },
        responseType: "arraybuffer",
      }
    );

    const base64image = `data:image/png;base64,${Buffer.from(
      response.data,
      "binary"
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
    console.error("Image Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};



// ========================== RESUME REVIEW ==========================

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    if (plan !== "premium_pro") {
      return res.json({
        success: false,
        message: "Upgrade to premium plan.",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume must be < 5MB",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await PDFParse(dataBuffer);

    const AI = getAIClient();

    const prompt = `Review the resume:\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, content, prompt, type)
      VALUES (${userId}, ${content}, 'Resume Review', 'resume-review')
    `;

    res.json({ success: true, content });
  } catch (error) {
    console.error("Resume Review Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
