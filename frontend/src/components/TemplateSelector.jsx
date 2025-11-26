import React from "react";

function TemplateSelector({ selectedTemplate, setSelectedTemplate }) {
  const templates = [ "template1", "template2", "template3", "template4" ];

  return (
    <div className="flex flex-col">
      <label className="font-medium text-gray-700 mb-2">Select Template</label>
      <div className="grid grid-cols-2 gap-2">
        {templates.map((temp) => (
          <button
            key={temp}
            onClick={() => setSelectedTemplate(temp)}
            className={`border rounded px-3 py-2 ${
              selectedTemplate === temp ? "bg-blue-500 text-white" : "bg-gray-50"
            }`}
          >
            {temp}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelector;
