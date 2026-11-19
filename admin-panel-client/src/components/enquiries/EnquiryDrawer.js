"use client";
import React, { useEffect, useRef, useState } from "react";
import { X, Loader2, Send, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import { useUnsavedGuard } from "@/components/common/UnsavedChangesGuard";
import { StatusBadge, TypePill } from "./EnquiryBadges";
import { ENQUIRY_STATUSES } from "@/data/enquiryOptions";
import {
  updateEnquiry,
  updateEnquiryStatus,
  sendEnquiryEmail,
  getEnquiryById,
} from "@/services/enquiryService";
import { fmtDateTime, toLocalInput, fromLocalInput } from "@/utils/dateFormat";
import { getErrorMessage } from "@/utils/apiError";

const NOTES_MAX = 2000;

const inputCls =
  "h-10 w-full rounded-md border border-line bg-surface px-3 text-xs outline-none focus:border-gold";
const areaCls =
  "w-full resize-none rounded-md border border-line bg-surface p-3 text-xs leading-relaxed outline-none focus:border-gold";

const DOT = {
  "Status Changed": "bg-blue-500",
  "Email Sent": "bg-emerald-500",
  "Enquiry Updated": "bg-amber-500",
};

const Section = ({ letter, title, aside, children }) => (
  <section className="mt-7">
    <div className="flex items-center justify-between border-b border-line pb-2">
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-navy">
        Section {letter} • {title}
      </h3>
      {aside && <span className="text-[10px] text-[#00000080]">{aside}</span>}
    </div>
    <div className="mt-3">{children}</div>
  </section>
);

const Label = ({ children, aside }) => (
  <div className="mb-1.5 mt-3.5 flex items-center justify-between gap-2">
    <label className="text-[10px] font-semibold uppercase tracking-wider text-[#444]">{children}</label>
    {aside && <span className="text-[10px] text-[#00000080]">{aside}</span>}
  </div>
);

const Field = ({ label, children }) => (
  <div className="min-w-0">
    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#00000080]">{label}</p>
    <div className="mt-1 break-words text-[13px] font-medium text-[#1a1a1a]">{children || "—"}</div>
  </div>
);

export default function EnquiryDrawer({ enquiry, focusReply, onClose, onChanged }) {
  const [data, setData] = useState(enquiry);

  const [status, setStatus] = useState(enquiry.status);
  const [notes, setNotes] = useState(enquiry.internalNotes);
  const [followUp, setFollowUp] = useState(toLocalInput(enquiry.followUpAt));

  const [subject, setSubject] = useState(
    `Re: Your enquiry with Cannon Avenue (Ref: ${enquiry.displayId})`
  );
  const [message, setMessage] = useState("");
  const [markResponded, setMarkResponded] = useState(true);

  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const replyRef = useRef(null);

  useEffect(() => {
    if (focusReply) replyRef.current?.scrollIntoView({ block: "start" });
  }, [focusReply]);

  const managementDirty =
    status !== data.status ||
    notes.trim() !== data.internalNotes ||
    followUp !== toLocalInput(data.followUpAt);

  const dirty = managementDirty || message.trim() !== "";

  const { requestClose, guardDialog } = useUnsavedGuard(dirty, onClose, { escape: true });

  const applyData = (next) => {
    setData(next);
    setStatus(next.status);
    setNotes(next.internalNotes);
    setFollowUp(toLocalInput(next.followUpAt));
  };

  const saveChanges = async () => {
    setSaving(true);
    setError("");
    try {
      let next = data;

      const detailsChanged =
        notes.trim() !== data.internalNotes || followUp !== toLocalInput(data.followUpAt);

      if (detailsChanged) {
        next = await updateEnquiry(data.id, {
          internalNotes: notes.trim(),
          followUpAt: fromLocalInput(followUp),
        });
        setData(next);
      }

      if (status !== next.status) {
        next = await updateEnquiryStatus(data.id, status);
      }

      applyData(next);
      toast.success("Changes saved");
      onChanged();
    } catch (err) {
      const msg = getErrorMessage(err);
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const sendResponse = async () => {
    if (!subject.trim()) return setError("Email subject is required");
    if (!message.trim()) return setError("Email message is required");

    setSending(true);
    setError("");
    try {
      await sendEnquiryEmail(data.id, {
        subject: subject.trim(),
        message: message.trim(),
        markResponded,
      });

      toast.success(`Email sent to ${data.email}`);
      setMessage("");

      // refresh the ledger and status (the email itself is already sent at this point)
      try {
        const fresh = await getEnquiryById(data.id);
        setData(fresh);
        if (markResponded) setStatus(fresh.status);
      } catch {
        /* ignore refresh failure */
      }

      onChanged();
    } catch (err) {
      const msg = getErrorMessage(err);
      setError(msg);
      toast.error(msg);
    } finally {
      setSending(false);
    }
  };

  const ledger = [
    {
      id: "created",
      action: "Enquiry Received",
      description: "Submitted by the customer through the website enquiry form.",
      by: "Website",
      at: data.createdAt,
    },
    ...data.activities,
  ];

  return (
    <>
      <div onClick={requestClose} className="fixed inset-0 z-[60] bg-black/40" />
      <aside className="fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-[620px] flex-col bg-white shadow-2xl">
        <div className="flex shrink-0 items-start justify-between border-b border-line bg-[#eaf0fb] px-5 py-4">
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-navy">Enquiry Console</p>
            <h2 className="truncate font-serif text-lg font-semibold text-[#1a1a1a]">{data.name}</h2>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-[#00000099]">{data.displayId}</span>
              <StatusBadge value={data.status} />
            </div>
          </div>
          <button
            onClick={requestClose}
            aria-label="Close"
            className="ml-3 shrink-0 rounded p-1 text-[#00000066] hover:bg-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-8">
          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
              {error}
            </div>
          )}

          <Section letter="A" title="Prospect & Lead Dossier">
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 rounded-lg border border-line bg-surface p-4 sm:grid-cols-2">
              <Field label="Full Name">{data.name}</Field>
              <Field label="Enquiry Stream">
                <TypePill value={data.type} />
              </Field>
              <Field label="Email Address">
                <a href={`mailto:${data.email}`} className="text-navy hover:underline">
                  {data.email}
                </a>
              </Field>
              <Field label="Contact Phone">
                <a href={`tel:${data.phone}`} className="text-navy hover:underline">
                  {data.phone}
                </a>
              </Field>
              {data.details.map((d) => (
                <Field key={d.label} label={d.label}>
                  {d.value}
                </Field>
              ))}
              <Field label="Received">{fmtDateTime(data.createdAt)}</Field>
            </div>
          </Section>

          <Section letter="B" title="Inbound Transmission" aside="Read-only">
            <div className="rounded-lg border border-line bg-surface p-4">
              <blockquote className="whitespace-pre-line border-l-2 border-navy/40 pl-3 text-[13px] italic leading-relaxed text-[#333]">
                {data.message}
              </blockquote>
              <p className="mt-3 text-[10px] text-[#00000080]">Intake source: Website enquiry form</p>
            </div>
          </Section>

          <Section letter="C" title="Internal Management" aside="Admin only">
            <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2">
              <div>
                <Label>Enquiry Status</Label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`${inputCls} appearance-none pr-8`}
                  >
                    {ENQUIRY_STATUSES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
              <div>
                <Label>Follow-up Target</Label>
                <input
                  type="datetime-local"
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                  className={inputCls}
                />
              </div>
            </div>

            <Label aside={`${notes.length} / ${NOTES_MAX}`}>Internal Supervisory Notes</Label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={NOTES_MAX}
              rows={4}
              placeholder="Private notes about this lead. The customer never sees this."
              className={areaCls}
            />
          </Section>

          <div ref={replyRef}>
            <Section letter="D" title="Formal Client Dispatch">
              <Label>To</Label>
              <input value={data.email} readOnly className={`${inputCls} cursor-not-allowed text-[#00000099]`} />

              <Label>Subject</Label>
              <input value={subject} onChange={(e) => setSubject(e.target.value)} className={inputCls} />

              <Label aside="Greeting and signature are added automatically">Message</Label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={8}
                placeholder="Write your reply to the customer..."
                className={areaCls}
              />

              <label className="mt-3 flex cursor-pointer items-center gap-2.5 text-xs text-[#1a1a1a]">
                <input
                  type="checkbox"
                  checked={markResponded}
                  onChange={(e) => setMarkResponded(e.target.checked)}
                  className="h-4 w-4 accent-navy"
                />
                Mark enquiry as Responded after sending
              </label>
            </Section>
          </div>

          <Section letter="E" title="Immutable Activity Ledger">
            <ol className="ml-1.5 border-l border-line">
              {ledger.map((item) => (
                <li key={item.id} className="relative pb-4 pl-5 last:pb-0">
                  <span
                    className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${
                      DOT[item.action] || "bg-navy"
                    }`}
                  />
                  <p className="text-xs font-semibold text-[#1a1a1a]">{item.action}</p>
                  {item.description && (
                    <p className="mt-0.5 break-words text-[11px] text-[#00000099]">{item.description}</p>
                  )}
                  <p className="mt-0.5 text-[10px] text-[#00000066]">
                    {fmtDateTime(item.at)} • {item.by}
                  </p>
                </li>
              ))}
            </ol>
          </Section>
        </div>

        <div className="flex shrink-0 items-center gap-3 border-t border-line bg-white px-5 py-4">
          <button
            onClick={requestClose}
            disabled={saving || sending}
            className="h-11 px-2 text-[11px] font-semibold uppercase tracking-wider text-[#444] hover:underline disabled:opacity-50"
          >
            Close
          </button>
          <button
            onClick={saveChanges}
            disabled={saving || sending || !managementDirty}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-md border border-line bg-surface text-[11px] font-semibold uppercase tracking-wider text-[#222] hover:bg-[#eaf0fb] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            Save Changes
          </button>
          <button
            onClick={sendResponse}
            disabled={saving || sending}
            className="flex h-11 flex-[1.4] items-center justify-center gap-2 rounded-md bg-navy text-[11px] font-semibold uppercase tracking-wider text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={13} />}
            Send Response
          </button>
        </div>
      </aside>

      {guardDialog}
    </>
  );
}