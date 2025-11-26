import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export const parseResume = async (file) => {
  if (!file) throw new Error("No file uploaded");

  // PDF
  if (file.mimetype === "application/pdf") {
    const data = await pdfParse(file.buffer);
    return data.text;
  }

  // DOCX
  if (
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    return result.value;
  }

  throw new Error("Unsupported resume format: " + file.mimetype);
};
