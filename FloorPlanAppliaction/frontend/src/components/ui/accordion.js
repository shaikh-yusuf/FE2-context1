// src/components/ui/accordion.js
import React, { useState } from "react";

export function Accordion({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function AccordionItem({ children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { open, setOpen })
      )}
    </div>
  );
}

export function AccordionTrigger({ children, open, setOpen, className = "" }) {
  return (
    <button className={className} onClick={() => setOpen(!open)}>
      {children} {open ? "-" : "+"}
    </button>
  );
}

export function AccordionContent({ children, open, className = "" }) {
  return open ? <div className={className}>{children}</div> : null;
}

