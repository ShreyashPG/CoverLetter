import React from "react";

function ResumeUpload({ resumeFile, setResumeFile }) {
  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  return (
    <div className="flex flex-col">
      <label className="font-medium text-gray-700 mb-2">Upload Resume</label>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.docx"
        className="border border-gray-300 rounded px-2 py-2"
      />
      {resumeFile && (
        <span className="text-sm text-gray-600 mt-1">
          Selected: {resumeFile.name}
        </span>
      )}
    </div>
  );
}

export default ResumeUpload;
