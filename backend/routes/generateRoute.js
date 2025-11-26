

import express from "express";
import multer from "multer";
import { parseResume } from "../services/resumeParser.js";
import { scrapeJobDescription } from "../services/jobScraper.js";
import { generateCoverLetter } from "../services/aiGenerator.js";
import { generatePDF } from "../services/pdfGenerator.js";
import GeneratedLetter from "../models/GeneratedLetter.js";
import path from "path";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Generate cover letter + PDF
router.post("/generate", upload.single("resume"), async (req, res) => {
  try {
    const { jobLink, jobTitle, company, jobDescription, template } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Resume file is required" });
    }

    const resumeText = await parseResume(req.file);

    let jobInfo = jobDescription;
    if (jobLink) jobInfo = await scrapeJobDescription(jobLink);

    const coverLetter = await generateCoverLetter({
      resume: resumeText,
      jobInfo,
      role: jobTitle,
      company,
      template,
    });

    const saved = await GeneratedLetter.create({
      company,
      role: jobTitle,
      coverLetter,
      date: new Date(),
    });

    // PDF path saved
    await generatePDF(coverLetter, saved._id);

    res.json({
      success: true,
      letter: coverLetter,
      download: `/api/download/${saved._id}`,   
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate cover letter" });
  }
});


router.get("/download/:id", (req, res) => {
  const filePath = path.resolve(`generated_pdfs/${req.params.id}.pdf`);

  res.download(filePath, "CoverLetter.pdf", (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(500).send("Could not download file");
    }
  });
});

export default router;
