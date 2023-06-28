"use client";
import { useState } from "react";

export default function DetailTabs({ description }: { description: string }) {
  const tabItems = ["Description", "Reviews", "Shipping & Returns"];
  const [selectedItem, setSelectedItem] = useState(0);

  return (
    <div className="px-4 md:px-8">
      <ul
        role="tablist"
        className="max-w-screen-xl mx-auto border-b flex items-center gap-x-3 overflow-x-auto text-lg font-semibold mb-4"
      >
        {tabItems.map((item, idx) => (
          <li
            key={idx}
            className={`py-2 border-b-2 min-w-fit ${
              selectedItem == idx
                ? "border-indigo-600 text-indigo-600"
                : "border-white text-gray-500"
            }`}
          >
            <button
              role="tab"
              aria-selected={selectedItem == idx ? true : false}
              aria-controls={`tabpanel-${idx + 1}`}
              className="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
              onClick={() => setSelectedItem(idx)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
      {selectedItem === 0 && (
        <pre className="whitespace-pre-line">{description}</pre>
      )}

      {selectedItem === 1 && (
        <p>No review yet. Be the first one to review this product.</p>
      )}
      {selectedItem === 2 && <p>Shipping & Returns info here</p>}
    </div>
  );
}
