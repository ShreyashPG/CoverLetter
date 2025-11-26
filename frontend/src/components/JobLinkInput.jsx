import React from "react";

function JobLinkInput({ jobLink, setJobLink }) {
  return (
    <div className="flex flex-col">
      <label className="font-medium text-gray-700 mb-2">
        Job Link (optional)
      </label>
      <input
        type="url"
        value={jobLink}
        onChange={(e) => setJobLink(e.target.value)}
        placeholder="https://example.com/job-posting"
        className="border border-gray-300 rounded px-2 py-2"
      />
    </div>
  );
}

export default JobLinkInput;
