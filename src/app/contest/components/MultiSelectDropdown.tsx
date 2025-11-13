'use client';

import { useState, useRef, useEffect } from 'react';

type MultiSelectDropdownProps = {
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
};

export default function MultiSelectDropdown({ options, selectedOptions, onChange }: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option];
    onChange(newSelectedOptions);
  };

  const getButtonText = () => {
    if (selectedOptions.length === 0) {
      return '전체';
    }
    if (selectedOptions.length === 1) {
      return selectedOptions[0];
    }
    return `${selectedOptions[0]} 외 ${selectedOptions.length - 1}개`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        style={{ minWidth: 'fit-content' }}
      >
        {getButtonText()}
        <span className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </span>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-[275px] h-[345px] bg-white border rounded-md shadow-lg overflow-y-auto">
          <ul>
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
              >
                <span>{option}</span>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  readOnly
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
