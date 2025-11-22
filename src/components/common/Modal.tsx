'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, width = '600px', title }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fadeIn backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl animate-slideUp w-full"
        style={{ maxWidth: width, maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
          {title && <h2 className="text-2xl font-bold text-black">{title}</h2>}
          <button
            onClick={onClose}
            className="ml-auto p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* 내용 */}
        <div className="px-8 py-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
