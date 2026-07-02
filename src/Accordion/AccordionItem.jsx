export default function AccordionItem({ title, isOpen, onToggle, children }) {
  return (
    <div className="w-full rounded-lg bg-white shadow-md overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50"
      >
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <span
          className={`text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-200 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="p-6 pt-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
