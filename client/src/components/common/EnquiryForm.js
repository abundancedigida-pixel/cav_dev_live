"use client";
import React, { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SERIF, SANS } from "@/components/ui/Animations";
import api from "@/common/apiClient";
import SummaryApi from "@/common/SummaryApi";
import { toast } from "react-toastify";

/* Interest options. `layouts` controls the conditional "Preferred Home Layout" radios. */
const interests = [
  {
    value: "Independent Homes",
    layouts: ["2BHK", "3BHK", "Not Sure Yet"],
    hasHomeDetails: false,
  },
  { value: "Tailor Made", layouts: [], hasHomeDetails: true },
  { value: "Precast", layouts: [], hasHomeDetails: true },
];

const initial = {
  name: "",
  email: "",
  phone: "",
  interest: "Independent Homes",
  layout: "3BHK",
  preferredLocation: "",
  approximatePlotArea: "",
  preferredHomeType: "",
  message: "",
};

const makeInitial = (interest) => ({
  ...initial,
  interest,
  layout: interests.find((i) => i.value === interest)?.layouts.includes("3BHK")
    ? "3BHK"
    : "",
});

const labelCls =
  "block text-[10px] font-medium uppercase tracking-[0.04em] text-[#171C22]";
const fieldCls =
  "mt-2 w-full border border-[#164A7A] bg-white px-4 py-3.5 text-[15px] text-[#171C22] placeholder:text-[#8A94A3] outline-none transition-shadow focus:shadow-[0_0_0_3px_rgba(51,97,146,0.18)]";

const Req = () => <span className="text-red-600"> *</span>;

/**
 * @param {{ onSubmit?: (values: typeof initial) => Promise<void> | void }} props
 */
const EnquiryForm = ({
  onSubmit,
  defaultInterest = "Independent Homes",
  eyebrow,
  heading,
  description,
}) => {
  const [values, setValues] = useState(() => makeInitial(defaultInterest));
  const [status, setStatus] = useState("idle");

  const selected = interests.find((i) => i.value === values.interest);
  const layouts = selected?.layouts ?? [];
  const hasHomeDetails = selected?.hasHomeDetails ?? false;

  const set = (key) => (e) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const handleInterest = (e) => {
    const next = interests.find((i) => i.value === e.target.value);
    setValues((v) => ({
      ...v,
      interest: e.target.value,
      layout: next?.layouts.includes("3BHK") ? "3BHK" : "",
      preferredLocation: "",
      approximatePlotArea: "",
      preferredHomeType: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("sending");

    const payload = {
      fullName: values.name,
      email: values.email,
      phoneNumber: values.phone,
      interestType: values.interest,
      message: values.message,
    };

    if (values.interest === "Independent Homes") {
      payload.independentHomes = {
        preferredHomeLayout: values.layout,
      };
    } else if (values.interest === "Tailor Made") {
      payload.tailorMade = {
        preferredLocation: values.preferredLocation,
        approximatePlotArea: Number(values.approximatePlotArea),
        preferredHomeType: values.preferredHomeType,
      };
    } else if (values.interest === "Precast") {
      payload.precast = {
        preferredLocation: values.preferredLocation,
        approximatePlotArea: Number(values.approximatePlotArea),
        preferredHomeType: values.preferredHomeType,
      };
    }

    try {
      const response = await api({
        url: SummaryApi.createEnquiry.url,
        method: SummaryApi.createEnquiry.method,
        data: payload,
      });

      if (onSubmit) await onSubmit(response.data);

      toast.success("Thank you! Your enquiry has been submitted successfully.");

      setValues(makeInitial(defaultInterest));
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Something went wrong. Please try again or call our advisory line.",
      );
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div
      className={`${SANS} w-full bg-white p-5 sm:p-8 shadow-[0_8px_40px_-20px_rgba(11,31,58,0.35)]`}
    >
      {(eyebrow || heading || description) && (
        <div>
          {eyebrow && (
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#336192]">
              {eyebrow}
            </p>
          )}

          {heading && (
            <h2
              className={`${SERIF} mt-2 text-[#0B1F3A] text-3xl sm:text-4xl leading-[1.15]`}
            >
              {heading}
            </h2>
          )}

          {description && (
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[#44474D]">
              {description}
            </p>
          )}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-5"
        noValidate={false}
      >
        {/* Full name */}
        <div>
          <label htmlFor="enq-name" className={labelCls}>
            Full Name
            <Req />
          </label>
          <input
            id="enq-name"
            type="text"
            required
            value={values.name}
            onChange={set("name")}
            placeholder="Enter your full name"
            className={fieldCls}
          />
        </div>

        {/* Email + phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="enq-email" className={labelCls}>
              Email Address
              <Req />
            </label>
            <input
              id="enq-email"
              type="email"
              required
              value={values.email}
              onChange={set("email")}
              placeholder="Enter your email address"
              className={fieldCls}
            />
          </div>
          <div>
            <label htmlFor="enq-phone" className={labelCls}>
              Phone Number
              <Req />
            </label>
            <input
              id="enq-phone"
              type="tel"
              required
              value={values.phone}
              onChange={set("phone")}
              placeholder="+91 98765 43210"
              className={fieldCls}
            />
          </div>
        </div>

        {/* Interest */}
        <div>
          <label htmlFor="enq-interest" className={labelCls}>
            What are you interested in?
            <Req />
          </label>
          <div className="relative">
            <select
              id="enq-interest"
              required
              value={values.interest}
              onChange={handleInterest}
              className={`${fieldCls} appearance-none pr-10`}
            >
              {interests.map((i) => (
                <option key={i.value} value={i.value}>
                  {i.value}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-[#171C22]"
            />
          </div>
        </div>

        {/* Conditional layout radios */}
        {layouts.length > 0 && (
          <fieldset>
            <legend className={labelCls}>Preferred Home Layout</legend>
            <div
              className={`mt-2 grid grid-cols-1 gap-3 ${
                layouts.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
              }`}
            >
              {layouts.map((l) => (
                <label
                  key={l}
                  className={`flex cursor-pointer items-center gap-3 border px-4 py-3.5 text-[15px] text-[#171C22] transition-colors ${
                    values.layout === l
                      ? "border-[#336192] bg-[#E3EBFA]"
                      : "border-transparent bg-[#EFF3FC] hover:bg-[#E3EBFA]"
                  }`}
                >
                  <input
                    type="radio"
                    name="layout"
                    value={l}
                    checked={values.layout === l}
                    onChange={set("layout")}
                    className="h-4 w-4 accent-[#0B1F3A]"
                  />
                  {l}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {hasHomeDetails && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="enq-location" className={labelCls}>
                  Preferred Location
                  <Req />
                </label>
                <input
                  id="enq-location"
                  type="text"
                  required
                  value={values.preferredLocation}
                  onChange={set("preferredLocation")}
                  placeholder="e.g. ECR, Chennai"
                  className={fieldCls}
                />
              </div>
              <div>
                <label htmlFor="enq-plot-area" className={labelCls}>
                  Approximate Plot Area (Sq.Ft.)
                  <Req />
                </label>
                <input
                  id="enq-plot-area"
                  type="number"
                  min={0}
                  required
                  value={values.approximatePlotArea}
                  onChange={set("approximatePlotArea")}
                  placeholder="e.g. 2400"
                  className={fieldCls}
                />
              </div>
            </div>

            <div>
              <label htmlFor="enq-home-type" className={labelCls}>
                Preferred Home Type
                <Req />
              </label>
              <input
                id="enq-home-type"
                type="text"
                required
                value={values.preferredHomeType}
                onChange={set("preferredHomeType")}
                placeholder="e.g. 3BHK Villa / Duplex"
                className={fieldCls}
              />
            </div>
          </div>
        )}

        {/* Message */}
        <div>
          <label htmlFor="enq-message" className={labelCls}>
            Message
            <Req />
          </label>
          <textarea
            id="enq-message"
            required
            rows={5}
            value={values.message}
            onChange={set("message")}
            placeholder="Briefly tell us what you’re looking for..."
            className={`${fieldCls} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-[#336192] px-10 py-4 text-[13px] font-medium uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#0B1F3A] disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Submit Enquiry"}
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>

        <p className="max-w-lg text-[13px] leading-relaxed text-[#44474D]">
          Your information will be held with utmost discretion and used strictly
          to respond to your request. View our{" "}
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#164A7A] underline underline-offset-2 hover:text-[#0B1F3A]"
          >
            Privacy Charter
          </a>
          .
        </p>
      </form>
    </div>
  );
};

export default EnquiryForm;
