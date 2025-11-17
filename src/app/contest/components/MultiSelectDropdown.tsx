'use client';

import { SelectBox } from '@/components/common/SelectBox';

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
  const techOptions = options.map((option) => ({ value: option, label: option }));

  return (
    <SelectBox
      type="multiple"
      options={techOptions}
      value={selectedOptions}
      onChange={onChange}
      placeholder="전체"
      className="min-w-[74px] w-auto !h-10 rounded bg-[#E6E6E6] text-[#555555] font-semibold border-none"
    />
  );
}

