import React from "react";

const VITE_API_URL=  import.meta.env.VITE_API_URL || 'http://localhost:5000';

function GeneratedOutput({ data }) {
  const handleDownload = () => {
    const blob = new Blob([data.letter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "CoverLetter.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-6 bg-white p-6 rounded shadow-md w-[700px]">
      <h2 className="text-xl font-bold mb-2">Generated Cover Letter</h2>
      <pre className="whitespace-pre-wrap text-gray-800">{data.letter}</pre>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={handleDownload}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Download as TXT
        </button>
        <a
          href={`${VITE_API_URL}${data.download}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}

export default GeneratedOutput;
