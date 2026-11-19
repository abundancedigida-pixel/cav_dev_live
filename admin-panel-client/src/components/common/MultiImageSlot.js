"use client";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Plus, X, Loader2 } from "lucide-react";
import { compressImage } from "@/utils/compressImage";

const TYPES = ["image/png", "image/jpeg", "image/webp"];
const RAW_LIMIT_MB = 25; // maximum raw file size accepted from the user

// value: [{ key, id?, url, file? }]  (existing images have id, new ones have file)
export default function MultiImageSlot({ value, onChange, maxCount = 8, maxMB = 5 }) {
  const inputRef = useRef(null);
  const [processing, setProcessing] = useState(false);

  const pick = async (e) => {
    const picked = Array.from(e.target.files || []);
    e.target.value = "";
    if (!picked.length) return;

    const room = maxCount - value.length;
    if (picked.length > room) toast.error(`You can add up to ${maxCount} images`);

    setProcessing(true);
    const next = [];

    for (const original of picked.slice(0, Math.max(0, room))) {
      if (!TYPES.includes(original.type)) {
        toast.error("Only PNG, JPG or WEBP images are allowed");
        continue;
      }
      if (original.size > RAW_LIMIT_MB * 1048576) {
        toast.error(`${original.name} must be under ${RAW_LIMIT_MB}MB`);
        continue;
      }

      try {
        const file = await compressImage(original);
        if (file.size > maxMB * 1048576) {
          toast.error(`${original.name} is still too large after compression`);
          continue;
        }
        next.push({
          key: `new-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          url: URL.createObjectURL(file),
          file,
        });
      } catch {
        toast.error(`Could not process ${original.name}`);
      }
    }

    setProcessing(false);
    if (next.length) onChange([...value, ...next]);
  };

  const remove = (item) => {
    if (item.file) URL.revokeObjectURL(item.url);
    onChange(value.filter((v) => v.key !== item.key));
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {value.map((item) => (
        <div key={item.key} className="relative aspect-[4/3]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.url} alt="" className="h-full w-full rounded-md object-cover" />
          <button
            type="button"
            onClick={() => remove(item)}
            aria-label="Remove image"
            className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow"
          >
            <X size={11} />
          </button>
        </div>
      ))}

      {value.length < maxCount && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={processing}
          className="flex aspect-[4/3] flex-col items-center justify-center rounded-md border border-dashed border-navy/40 bg-surface text-[10px] font-semibold uppercase tracking-wider text-navy hover:bg-[#eaf0fb] disabled:opacity-60"
        >
          {processing ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <>
              <Plus size={15} />
              Add
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        onChange={pick}
        className="hidden"
      />
    </div>
  );
}