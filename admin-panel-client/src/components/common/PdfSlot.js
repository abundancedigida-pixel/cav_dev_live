"use client";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import { FileText, UploadCloud } from "lucide-react";

// value: { url?, file?, name } | null
export default function PdfSlot({ value, onChange, title = "Upload PDF", hint = "PDF only", maxMB = 5 }) {
  const inputRef = useRef(null);

  const pick = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (file.type !== "application/pdf") return toast.error("Only PDF files are allowed");
    if (file.size > maxMB * 1048576) return toast.error(`PDF must be under ${maxMB}MB`);

    onChange({ file, name: file.name });
  };

  return (
    <div>
      {value ? (
        <div className="flex items-center gap-3 rounded-md border border-line bg-surface px-3 py-2.5">
          <FileText size={18} className="shrink-0 text-navy" />
          <div className="min-w-0 flex-1">
            {value.url && !value.file ? (
              <a
                href={value.url}
                target="_blank"
                rel="noreferrer"
                className="block truncate text-xs font-medium text-[#1a1a1a] hover:underline"
              >
                {value.name}
              </a>
            ) : (
              <p className="truncate text-xs font-medium text-[#1a1a1a]">{value.name}</p>
            )}
            {value.file && <p className="text-[10px] text-amber-600">Will be uploaded on save</p>}
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="shrink-0 rounded bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-navy hover:bg-[#eaf0fb]"
          >
            Replace
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-[84px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-navy/40 bg-surface hover:bg-[#eaf0fb]"
        >
          <UploadCloud size={18} className="text-navy" />
          <span className="mt-1 text-xs font-semibold text-navy">{title}</span>
          <span className="text-[10px] text-[#00000099]">{hint}</span>
        </button>
      )}
      <input ref={inputRef} type="file" accept="application/pdf" onChange={pick} className="hidden" />
    </div>
  );
}