"use client";

import { useState, useRef } from "react";

interface SimpleRichEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const SimpleRichEditor = ({ value, onChange }: SimpleRichEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const execCommand = (command: string, value: string | undefined = undefined) => {
    // エディタにフォーカスを当ててからコマンドを実行
    if (editorRef.current) {
      editorRef.current.focus();
    }

    // 少し待ってからコマンドを実行
    setTimeout(() => {
      document.execCommand(command, false, value);
      updateContent();
    }, 10);
  };

  const updateContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* ツールバー */}
      <div className="bg-gray-100 border-b border-gray-300 p-3 flex flex-wrap gap-2">
        {/* テキストスタイル */}
        <div className="flex gap-1 border-r border-gray-300 pr-3">
          <button
            type="button"
            onClick={() => execCommand("bold")}
            className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 font-bold text-gray-900"
            title="太字 (Ctrl+B)"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => execCommand("italic")}
            className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 italic text-gray-900"
            title="斜体 (Ctrl+I)"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => execCommand("underline")}
            className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 underline text-gray-900"
            title="下線 (Ctrl+U)"
          >
            U
          </button>
        </div>

        {/* 配置 */}
        <div className="flex gap-1 border-r border-gray-300 pr-3">
          <button
            type="button"
            onClick={() => execCommand("justifyLeft")}
            className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-900"
            title="左揃え"
          >
            <span className="text-lg">⬅</span>
          </button>
          <button
            type="button"
            onClick={() => execCommand("justifyCenter")}
            className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-900"
            title="中央揃え"
          >
            <span className="text-lg">↔</span>
          </button>
          <button
            type="button"
            onClick={() => execCommand("justifyRight")}
            className="px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-900"
            title="右揃え"
          >
            <span className="text-lg">➡</span>
          </button>
        </div>

        {/* 見出し */}
        <div className="flex gap-1 border-r border-gray-300 pr-3">
          <select
            onChange={(e) => {
              execCommand("formatBlock", e.target.value);
              e.target.value = "";
            }}
            className="px-3 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 text-gray-900"
            defaultValue=""
          >
            <option value="">見出し</option>
            <option value="h2">見出し 2</option>
            <option value="h3">見出し 3</option>
            <option value="h4">見出し 4</option>
            <option value="p">本文</option>
          </select>
        </div>

        {/* フォントサイズ */}
        <div className="flex gap-1 border-r border-gray-300 pr-3">
          <select
            onChange={(e) => execCommand("fontSize", e.target.value)}
            className="px-3 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 text-gray-900"
            defaultValue="3"
          >
            <option value="1">10px</option>
            <option value="2">13px</option>
            <option value="3">16px (標準)</option>
            <option value="4">18px</option>
            <option value="5">24px</option>
            <option value="6">32px</option>
            <option value="7">48px</option>
          </select>
        </div>

        {/* 色 */}
        <div className="flex gap-1">
          <label className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 cursor-pointer text-gray-900">
            <span className="text-sm">色</span>
            <input
              type="color"
              onChange={(e) => execCommand("foreColor", e.target.value)}
              className="w-6 h-6 border-0 rounded cursor-pointer"
              title="文字色"
            />
          </label>
        </div>
      </div>

      {/* エディタ */}
      <div
        ref={editorRef}
        contentEditable
        onInput={updateContent}
        onPaste={handlePaste}
        dangerouslySetInnerHTML={{ __html: value }}
        className="min-h-[500px] p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset text-gray-900"
        style={{
          wordBreak: "break-word",
          overflowWrap: "break-word",
          fontSize: "16px",
          lineHeight: "1.6",
          color: "#111827",
        }}
      />
    </div>
  );
};

export default SimpleRichEditor;
