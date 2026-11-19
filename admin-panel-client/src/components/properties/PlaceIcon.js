import React from "react";
import { MapPin, Train, Stethoscope, GraduationCap, ShoppingBag, Plane } from "lucide-react";

// Picks an icon from the category text. Unknown categories get a map pin.
export default function PlaceIcon({ category = "", size = 13, className = "" }) {
  const c = category.toLowerCase();

  const Icon = /transit|metro|rail|train|bus/.test(c)
    ? Train
    : /health|hospital|medical|clinic/.test(c)
    ? Stethoscope
    : /educ|school|college|universit/.test(c)
    ? GraduationCap
    : /retail|mall|shop|market/.test(c)
    ? ShoppingBag
    : /airport|flight/.test(c)
    ? Plane
    : MapPin;

  return <Icon size={size} className={className} />;
}