"use client";
import React from "react";
import Image from "next/image";
import CavLogo from "@/assets/Logo.svg";

export default function AuthShell({ children }) {
  return (
    <div className="flex min-h-dvh bg-surface">
      {/* Left brand panel (desktop) */}
      <div className="hidden w-1/2 flex-col justify-between bg-navy px-12 py-10 lg:flex">
        <div className="flex items-center gap-3">
          <Image src={CavLogo} alt="CAV logo" className="h-11 w-auto shrink-0 object-contain" priority />
          <div>
            <p className="text-lg font-semibold tracking-wide text-white">CAV</p>
            <p className="text-[10px] font-medium tracking-[0.2em] text-gold">ADMIN CONSOLE</p>
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-semibold leading-tight text-white">
            Curate every <span className="text-gold">residence,</span>
            <br />
            project &amp; enquiry.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
            The operational directorate for Cannon Avenue&rsquo;s estate registry. Sign in to continue.
          </p>
        </div>

        <p className="text-xs text-white/30">© {new Date().getFullYear()} Cannon Avenue Group</p>
      </div>

      {/* Form side */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-[420px]">
          <div className="mb-6 flex items-center justify-center gap-2.5 rounded-xl bg-navy py-5 lg:hidden">
            <Image src={CavLogo} alt="CAV logo" className="h-9 w-auto shrink-0 object-contain" priority />
            <div>
              <p className="text-sm font-semibold text-white">CAV</p>
              <p className="text-[9px] font-medium tracking-[0.2em] text-gold">ADMIN CONSOLE</p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}