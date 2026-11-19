"use client";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { UploadCloud, RefreshCw, Loader2 } from "lucide-react";
import { compressImage } from "@/utils/compressImage";

const TYPES = ["image/png", "image/jpeg", "image/webp"];
const RAW_LIMIT_MB = 25; // maximum raw file size accepted from the user

// value: { url, file?, name? } | null
export default function ImageSlot({
  value,
  onChange,
  title = "Upload image",
  hint = "PNG, JPG or WEBP",
  caption = "",
  maxMB = 5,
}) {
  const inputRef = useRef(null);
  const [processing, setProcessing] = useState(false);

  const pick = async (e) => {
    const picked = e.target.files?.[0];
    e.target.value = "";
    if (!picked) return;

    if (!TYPES.includes(picked.type)) return toast.error("Only PNG, JPG or WEBP images are allowed");
    if (picked.size > RAW_LIMIT_MB * 1048576) return toast.error(`Image must be under ${RAW_LIMIT_MB}MB`);

    setProcessing(true);
    try {
      const file = await compressImage(picked);
      if (file.size > maxMB * 1048576) return toast.error(`Image must be under ${maxMB}MB`);

      if (value?.file) URL.revokeObjectURL(value.url);
      onChange({ url: URL.createObjectURL(file), file, name: file.name });
    } catch {
      toast.error("Could not process this image");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      {value ? (
        <div className="flex items-center gap-3 rounded-lg border border-line bg-surface p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value.url} alt="" className="h-[72px] w-28 shrink-0 rounded-md object-cover" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-[#1a1a1a]">{value.name || "Featured image"}</p>
            {caption && <p className="mt-0.5 text-[10px] text-[#00000099]">{caption}</p>}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={processing}
              className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-navy hover:underline disabled:opacity-50"
            >
              {processing ? <Loader2 size={11} className="animate-spin" /> : <RefreshCw size={11} />}
              {processing ? "Processing..." : "Replace asset"}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={processing}
          className="flex h-[110px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-navy/40 bg-surface text-center hover:bg-[#eaf0fb] disabled:opacity-60"
        >
          {processing ? (
            <>
              <Loader2 size={20} className="animate-spin text-navy" />
              <span className="mt-1.5 text-xs font-semibold text-navy">Processing image...</span>
            </>
          ) : (
            <>
              <UploadCloud size={20} className="text-navy" />
              <span className="mt-1.5 text-xs font-semibold text-navy">{title}</span>
              <span className="mt-0.5 text-[10px] text-[#00000099]">{hint}</span>
            </>
          )}
        </button>
      )}

      <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={pick} className="hidden" />
    </div>
  );
}