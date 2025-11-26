import React, { useState } from "react";
import ResumeUpload from "./components/ResumeUpload";
import JobLinkInput from "./components/JobLinkInput";
import JobForm from "./components/JobForm";
import TemplateSelector from "./components/TemplateSelector";
import GeneratedOutput from "./components/GeneratedOutput";
import { api } from "./api/api";
const VITE_API_URL = import.meta.env.VITE_API_URL
function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobLink, setJobLink] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [generated, setGenerated] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!resumeFile) {
      alert("Please upload a resume.");
      return;
    }
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobLink", jobLink);
    formData.append("jobTitle", jobTitle);
    formData.append("company", company);
    formData.append("jobDescription", jobDescription);
    formData.append("template", selectedTemplate);

    setLoading(true);
    try {
      const { data } = await api.post("/generate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setGenerated(data);
      window.location.href = VITE_API_URL + data.download;
    } catch (e) {
      alert("Error: could not generate letter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center gap-6 pt-8">
      <h1 className="text-3xl font-bold">AI Cover Letter Generator</h1>

      <div className="bg-white shadow-md p-6 rounded w-[400px] space-y-4">
        <ResumeUpload resumeFile={resumeFile} setResumeFile={setResumeFile} />
        <JobLinkInput jobLink={jobLink} setJobLink={setJobLink} />
        <JobForm
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          company={company}
          setCompany={setCompany}
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
        />
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
        <button
          className="bg-blue-600 text-white w-full py-2 rounded"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Cover Letter"}
        </button>
      </div>

      {generated && <GeneratedOutput data={generated} />}
    </div>
  );
}

export default App;
