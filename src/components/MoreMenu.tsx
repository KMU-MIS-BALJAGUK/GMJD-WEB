"use client";

import { useState, useEffect, useRef } from "react";

export default function MoreMenu({
  onEdit,
  onDelete,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 🔥 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      {/* 점 3개 버튼 */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <span className="text-lg">⋮</span>
      </button>

      {/* 메뉴 팝업 */}
      {open && (
        <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-md z-50">
          <button
            onClick={onEdit}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
          >
            수정하기
          </button>

          <button
            onClick={onDelete}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
