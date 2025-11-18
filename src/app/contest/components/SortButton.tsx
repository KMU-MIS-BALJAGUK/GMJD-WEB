'use client';

import { cn } from '@/lib/utils';

interface SortButtonProps {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}

const SortButton: React.FC<SortButtonProps> = ({
  onClick,
  isActive,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-sm font-medium focus:outline-none',
        {
          'text-black': isActive,
          'text-[#aaaaaa]': !isActive,
        }
      )}
    >
      {children}
    </button>
  );
};

export default SortButton;
