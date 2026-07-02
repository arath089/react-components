import { useState, Children, cloneElement } from "react";

export default function Accordion({ children, defaultOpenIndex = null }) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-xl flex flex-col gap-3">
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          isOpen: openIndex === index,
          onToggle: () => handleToggle(index),
        })
      )}
    </div>
  );
}
