// import PDFDocument from "pdfkit";
// import fs from "fs";

// export const generatePDF = async (text, id) => {
//   const filePath = `uploads/coverletter_${id}.pdf`;
//   const doc = new PDFDocument();
//   doc.pipe(fs.createWriteStream(filePath));
//   doc.font("Helvetica").fontSize(12).text(text, { align: "left" });
//   doc.end();
//   return filePath;
// };
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export async function generatePDF(content, id) {
  const dir = "generated_pdfs";
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const pdfPath = path.join(dir, `${id}.pdf`);
  const doc = new PDFDocument();

  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    doc.fontSize(16).text("Cover Letter", { align: "center", underline: true });
    doc.moveDown();
    doc.fontSize(12).text(content, { lineGap: 4 });

    doc.end();

    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}
