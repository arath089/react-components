import { useState } from "react";

export default function TabSwitcher() {
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    {
      id: "Profile",
      content:
        "View and update your personal details, profile picture, and bio. Keep your information current so others can find and recognize you.",
    },
    {
      id: "Settings",
      content:
        "Manage your account preferences, including password, privacy controls, language, and theme. Changes here apply across the entire app.",
    },
    {
      id: "Notifications",
      content:
        "Choose which alerts you'd like to receive by email, push, or SMS. Fine-tune frequency so you only hear about what matters to you.",
    },
  ];

  const getTabClasses = (tab) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      activeTab === tab
        ? "bg-blue-600 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={getTabClasses(tab.id)}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.id}
          </button>
        ))}
      </div>
      <p className="rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </p>
    </div>
  );
}
