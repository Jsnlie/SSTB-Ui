"use client";

import { useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Link2,
  Undo2,
  Redo2,
  Eraser,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeightClassName?: string;
}

interface ToolbarAction {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  onClick: () => void;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Tulis konten di sini...",
  minHeightClassName = "min-h-[220px]",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;
    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const runCommand = (command: string, commandValue?: string) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, commandValue);
    onChange(editorRef.current.innerHTML);
  };

  const actions: ToolbarAction[] = [
    { icon: Bold, title: "Bold", onClick: () => runCommand("bold") },
    { icon: Italic, title: "Italic", onClick: () => runCommand("italic") },
    { icon: Underline, title: "Underline", onClick: () => runCommand("underline") },
    {
      icon: List,
      title: "Bullet List",
      onClick: () => runCommand("insertUnorderedList"),
    },
    {
      icon: ListOrdered,
      title: "Numbered List",
      onClick: () => runCommand("insertOrderedList"),
    },
    {
      icon: Quote,
      title: "Quote",
      onClick: () => runCommand("formatBlock", "blockquote"),
    },
    {
      icon: Link2,
      title: "Insert Link",
      onClick: () => {
        const link = window.prompt("Masukkan URL:", "https://");
        if (!link) return;
        runCommand("createLink", link);
      },
    },
    {
      icon: Eraser,
      title: "Clear Format",
      onClick: () => runCommand("removeFormat"),
    },
    { icon: Undo2, title: "Undo", onClick: () => runCommand("undo") },
    { icon: Redo2, title: "Redo", onClick: () => runCommand("redo") },
  ];

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
        {actions.map((action) => (
          <button
            key={action.title}
            type="button"
            title={action.title}
            onClick={action.onClick}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <action.icon size={16} />
          </button>
        ))}
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className={`w-full px-4 py-3 text-sm outline-none ${minHeightClassName}`}
        data-placeholder={placeholder}
        onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
      />

      <style jsx>{`
        [contenteditable][data-placeholder]:empty::before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          display: block;
        }
      `}</style>
    </div>
  );
}
