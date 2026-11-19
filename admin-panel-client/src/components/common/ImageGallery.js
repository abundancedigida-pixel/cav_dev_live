"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

// images: [{ url }]  (featured image first, then gallery images)
export default function ImageGallery({ images, alt = "" }) {
  const [active, setActive] = useState(0);

  if (!images.length) {
    return (
      <div className="mt-5 flex aspect-[16/9] w-full items-center justify-center rounded-lg bg-surface text-xs text-[#00000066]">
        No images uploaded
      </div>
    );
  }

  const current = images[Math.min(active, images.length - 1)];

  return (
    <div className="mt-5">
      <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-surface">
        <img src={current.url} alt={alt} className="h-full w-full object-cover" />
      </div>

      {images.length > 1 && (
        <div className="mt-2 grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={`${img.url}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              className={`aspect-[4/3] overflow-hidden rounded-md border-2 ${
                i === active ? "border-navy" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={img.url} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}