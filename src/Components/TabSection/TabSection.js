import React, { useState } from "react";
import parse from "html-react-parser";

const TabSection = ({
  description,
  sideEffects,
  additionalInformation,
  moreInformation,
  faq,
}) => {
  // Utility function to replace newline characters with <br/> tags
  const replaceNewlinesWithBr = (content) => {
    if (!content) return ""; // Return empty string if content is falsy
    // Replace newline characters, ensuring only one <br/> for consecutive occurrences
    return content
      .replace(/(\r\n|\n|\r|\\n|\\r|\|){2,}/g, "<br/>")
      .replace(/(\r\n|\n|\r|\\n|\\r|\|)/g, "<br/>");
  };

  const tabs = [
    {
      title: "DESCRIPTION",
      contentTitle: "PRODUCT INTRODUCTION",
      content: description,
    },
    {
      title: "SIDE EFFECTS",
      contentTitle: "SIDE EFFECTS",
      content: sideEffects,
    },
    { title: "FAQ", contentTitle: "FREQUENTLY ASKED QUESTIONS", content: faq },
    {
      title: "ADDITIONAL INFORMATION",
      contentTitle: "ADDITIONAL INFORMATION",
      content: additionalInformation,
    },
    {
      title: "MORE INFORMATION",
      contentTitle: "MORE INFORMATION",
      content: moreInformation,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].title);

  return (
    <div className="w-auto p-4">
      <div className="border-b-2 border-gray-300 mb-4">
        <ul className="flex flex-wrap md:flex-nowrap mb-4 md:mb-0">
          {tabs.map((tab) => (
            <li
              key={tab.title}
              className={`cursor-pointer py-2 px-4 md:px-6 text-center transition-colors duration-300 ease-in-out
                ${
                  activeTab === tab.title
                    ? "border-b-4 border-[#00768a] text-[#00768a] font-semibold"
                    : "text-gray-500"
                }`}
              onClick={() => setActiveTab(tab.title)}
            >
              {tab.title}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {tabs.map(
          (tab) =>
            tab.title === activeTab && (
              <div key={tab.title} className="text-base">
                <h2 className="text-2xl font-bold mb-4">{tab.contentTitle}</h2>
                <div className="text-justify">
                  {tab.content ? (
                    parse(replaceNewlinesWithBr(tab.content))
                  ) : (
                    <p>No content available</p>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default TabSection;
