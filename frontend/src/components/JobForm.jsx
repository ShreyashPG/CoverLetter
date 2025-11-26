import React from "react";

function JobForm({ jobTitle, setJobTitle, company, setCompany, jobDescription, setJobDescription }) {
  return (
    <div className="flex flex-col space-y-3">
      <div>
        <label className="font-medium text-gray-700 mb-2">Job Title</label>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Software Engineer"
          className="border border-gray-300 rounded px-2 py-2 w-full"
        />
      </div>
      <div>
        <label className="font-medium text-gray-700 mb-2">Company Name</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Example Corp"
          className="border border-gray-300 rounded px-2 py-2 w-full"
        />
      </div>
      <div>
        <label className="font-medium text-gray-700 mb-2">Job Description</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          rows={4}
          className="border border-gray-300 rounded px-2 py-2 w-full"
        />
      </div>
    </div>
  );
}

export default JobForm;
