// src/components/Modal.tsx
'use client';

import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

export function Modal({ isOpen, title, children, onConfirm, onCancel }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg w-11/12 max-w-lg"
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <div className="px-4 py-2 border-b dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
          </div>
        )}
        <div className="px-4 py-4 text-gray-800 dark:text-gray-200">{children}</div>
        <div className="px-4 py-3 bg-gray-100 dark:bg-gray-700 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
