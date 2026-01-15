import React, { useState, useEffect, useRef } from 'react';
import { Command, filterCommands } from './commands';
import { useCommandBar } from './useCommandBar';

interface CommandBarProps {
  commands: Command[];
  onCommandSelect: (command: Command) => void;
  onSearchChange?: (searchTerm: string) => void;
}

export const CommandBar: React.FC<CommandBarProps> = ({
  commands,
  onCommandSelect,
  onSearchChange,
}) => {
  const { isOpen, searchTerm, setSearchTerm, close } = useCommandBar();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const filteredCommands = filterCommands(commands, searchTerm);
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchTerm]);
  
  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(searchTerm);
    }
  }, [searchTerm, onSearchChange]);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCommands.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        onCommandSelect(filteredCommands[selectedIndex]);
        close();
      }
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        maxWidth: '90vw',
        backgroundColor: '#fff',
        border: '2px solid #000',
        borderRadius: '8px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        zIndex: 2000,
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search commands or grep resume content..."
        style={{
          width: '100%',
          padding: '16px',
          fontSize: '16px',
          border: 'none',
          outline: 'none',
          borderBottom: '1px solid #eee',
        }}
      />
      <div
        style={{
          maxHeight: '400px',
          overflowY: 'auto',
        }}
      >
        {filteredCommands.length === 0 ? (
          <div style={{ padding: '16px', color: '#666' }}>
            No commands found
          </div>
        ) : (
          filteredCommands.map((cmd, idx) => (
            <div
              key={cmd.id}
              onClick={() => {
                onCommandSelect(cmd);
                close();
              }}
              onMouseEnter={() => setSelectedIndex(idx)}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                backgroundColor: idx === selectedIndex ? '#f0f0f0' : 'transparent',
                borderLeft: idx === selectedIndex ? '3px solid #000' : '3px solid transparent',
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                {cmd.label}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {cmd.description}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

