import mongoose from "mongoose";

const generatedSchema = new mongoose.Schema({
  company: String,
  role: String,
  coverLetter: String,
  date: Date,
});

export default mongoose.model("GeneratedLetter", generatedSchema);
