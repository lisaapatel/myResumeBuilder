import { useState, useEffect, useCallback } from 'react';

export interface UseCommandBarReturn {
  isOpen: boolean;
  searchTerm: string;
  open: () => void;
  close: () => void;
  setSearchTerm: (term: string) => void;
}

export function useCommandBar(): UseCommandBarReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K on macOS, Ctrl+K on Windows
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);
  
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setSearchTerm('');
  }, []);
  
  return {
    isOpen,
    searchTerm,
    open,
    close,
    setSearchTerm,
  };
}

