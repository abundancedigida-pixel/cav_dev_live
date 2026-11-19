"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

// Free text input with a dropdown of suggestions.
// The arrow always shows ALL options. Typing filters them. Any custom value is allowed.
export default function ComboBox({
  value,
  onChange,
  options,
  placeholder = "",
  className = "",
  ariaLabel,
}) {
  const wrapRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [filtering, setFiltering] = useState(false); // true only while the user is typing

  const query = value.trim().toLowerCase();
  const visible = filtering && query ? options.filter((o) => o.toLowerCase().includes(query)) : options;

  useEffect(() => {
    if (!open) return;

    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const pick = (option) => {
    onChange(option);
    setFiltering(false);
    setOpen(false);
  };

  const toggle = () => {
    setFiltering(false); // arrow click = show every option
    setOpen((v) => !v);
  };

  return (
    <div ref={wrapRef} className="relative">
      <input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setFiltering(true);
          setOpen(true);
        }}
        onFocus={() => setFiltering(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
          if (e.key === "ArrowDown") {
            setFiltering(false);
            setOpen(true);
          }
        }}
        placeholder={placeholder}
        aria-label={ariaLabel}
        autoComplete="off"
        className={`${className} pr-8`}
      />

      <button
        type="button"
        tabIndex={-1}
        onClick={toggle}
        aria-label="Show options"
        className="absolute right-0 top-0 flex h-full w-8 items-center justify-center text-[#00000099]"
      >
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && visible.length > 0 && (
        <ul className="absolute left-0 right-0 top-full z-[90] mt-1 max-h-52 overflow-y-auto rounded-md border border-line bg-white py-1 shadow-lg">
          {visible.map((o) => (
            <li key={o}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(o)}
                className={`block w-full px-3 py-2 text-left text-xs hover:bg-surface ${
                  o.toLowerCase() === query ? "bg-navy/5 font-semibold text-navy" : "text-[#1a1a1a]"
                }`}
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}