'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

type MultiSelectDropdownProps = {
  options: string[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
};

export default function MultiSelectDropdown({
  options,
  selectedOptions,
  onChange,
}: MultiSelectDropdownProps) {
  const toggle = (option: string) => {
    if (selectedOptions.includes(option)) {
      onChange(selectedOptions.filter((item) => item !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
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

  return (
    <Select>
      <SelectTrigger
        className={cn(
          `
          w-fit !h-10 bg-white rounded-[8px] border border-gray-300 text-[15px] px-4
          flex items-center justify-between gap-2
          focus:ring-1 focus:ring-blue-500 cursor-pointer
        `,
        )}
      >
        <span className={selectedOptions.length === 0 ? 'text-gray-500' : ''}>
          {getButtonText()}
        </span>
      </SelectTrigger>

      <SelectContent
        className="rounded-[8px] shadow-md max-h-[345px] w-[275px]"
        align="start"
      >
        {options.map((option) => (
          <div
            key={option}
            className="flex items-center gap-2 px-3 py-2.5 hover:bg-gray-100 cursor-pointer bg-white"
            onClick={() => toggle(option)}
          >
            <Checkbox
              checked={selectedOptions.includes(option)}
              className="data-[state=checked]:bg-blue data-[state=checked]:border-blue [&_svg]:text-white"
            />
            <span className="text-[15px]">{option}</span>
          </div>
        ))}
      </SelectContent>
    </Select>
  );
}

