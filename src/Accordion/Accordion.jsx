import { useState, Children, cloneElement } from "react";

export default function Accordion({ children, defaultOpenIndex = null }) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start">
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          isOpen: openIndex === index,
          onToggle: () => handleToggle(index),
        })
      )}
    </div>
  );
}
