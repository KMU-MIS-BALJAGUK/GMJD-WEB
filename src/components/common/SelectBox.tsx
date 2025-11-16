'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

type Option = {
  value: string;
  label: string;
};

type SingleSelectProps = {
  type: 'single';
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

type MultipleSelectProps = {
  type: 'multiple';
  options: Option[];
  placeholder?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  className?: string;
};

type SelectBoxProps = SingleSelectProps | MultipleSelectProps;

export function SelectBox(props: SelectBoxProps) {
  const { type, options, placeholder, className } = props;

  if (type === 'single') {
    const { value, onChange } = props;

    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={cn(
            `
            w-full !h-12 bg-bg-02 rounded-[8px] border-none text-[15px] px-4
            focus:ring-1 focus:ring-blue cursor-pointer
          `,
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="rounded-[8px] shadow-md" align="start">
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="px-3 py-2.5 hover:bg-bg-02 text-[15px] bg-white [&_svg]:text-blue"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (type === 'multiple') {
    const selected = props.value || [];
    const setSelected = props.onChange || (() => {});

    const toggle = (value: string) => {
      if (selected.includes(value)) {
        setSelected(selected.filter((v) => v !== value));
      } else {
        setSelected([...selected, value]);
      }
    };

    const display =
      selected.length === 0
        ? placeholder
        : selected.length === 1
        ? options.find((o) => o.value === selected[0])?.label
        : `${options.find((o) => o.value === selected[0])?.label} 외 ${selected.length - 1}개`;

    return (
      <Select>
        <SelectTrigger
          className={cn(
            `
            w-full !h-12 bg-bg-02 rounded-[8px] border-none px-4 text-[15px]
            flex items-center justify-between
            focus:ring-1 focus:ring-blue cursor-pointer
          `,
            className
          )}
        >
          <span className={selected.length === 0 ? 'text-gray-400' : ''}>{display}</span>
        </SelectTrigger>

        <SelectContent className="rounded-[8px] shadow-md max-h-[300px]" align="start">
          {options.map((opt) => (
            <div
              key={opt.value}
              className="flex items-center gap-2 px-3 py-2.5 hover:bg-bg-02 cursor-pointer bg-white"
              onClick={() => toggle(opt.value)}
            >
              <Checkbox
                checked={selected.includes(opt.value)}
                className="data-[state=checked]:bg-blue data-[state=checked]:border-blue [&_svg]:text-white"
              />
              <span className="text-[15px]">{opt.label}</span>
            </div>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return null;
}
