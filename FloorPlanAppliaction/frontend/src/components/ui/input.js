// src/components/ui/input.js
import React from "react";

export function Input({ className = "", ...props }) {
  return <input className={`border p-2 rounded ${className}`} {...props} />;
}
