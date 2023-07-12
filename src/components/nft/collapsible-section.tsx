import { useState } from 'react';

const CollapsibleSection = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="border-t border-gray-200 px-4 py-6 bg-white">
      <h3 className="-mx-2 -my-3 flow-root">
        <button
          type="button"
          className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
          aria-controls="filter-section-mobile-0"
          aria-expanded={isExpanded}
          onClick={toggleExpand}
        >
          <span className="font-medium text-gray-900">{title}</span>
          <span className="ml-6 flex items-center">
            <svg
              className={`h-5 w-5 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          </span>
        </button>
      </h3>

      <div
        className={`pt-6 ${isExpanded ? '' : 'hidden'}`}
        id="filter-section-mobile-0"
      >
        <div className="space-y-6">{text}</div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
