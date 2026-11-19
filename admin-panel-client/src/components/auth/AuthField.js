"use client";
import React from "react";

// Chrome autofill blue background remove
const noAutofill =
  "[&:-webkit-autofill]:[box-shadow:0_0_0_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#1a1a1a]";

export default function AuthField({ id, label, icon: Icon, right, className = "", ...inputProps }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-xs font-medium text-[#1a1a1a]">
        {label}
      </label>
      <div className="mt-1.5 flex items-center gap-2.5 overflow-hidden rounded-lg border border-line bg-white px-3.5 focus-within:border-gold">
        {Icon && <Icon size={15} className="shrink-0 text-[#00000066]" />}
        <input
          id={id}
          className={`h-11 w-full min-w-0 bg-transparent text-[13px] outline-none ${noAutofill}`}
          {...inputProps}
        />
        {right}
      </div>
    </div>
  );
}