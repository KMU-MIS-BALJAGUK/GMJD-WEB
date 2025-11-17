"use client";

import { useState } from "react";

export default function MoreMenu({
  onEdit,
  onDelete,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* 점 3개 버튼 */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <span className="text-lg">⋮</span>
      </button>

      {/* 메뉴 팝업 */}
      {open && (
        <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-md z-10">
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
