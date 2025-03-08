// src/components/ui/button.js
import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button className={`px-4 py-2 border rounded ${className}`} {...props}>
      {children}
    </button>
  );
}

