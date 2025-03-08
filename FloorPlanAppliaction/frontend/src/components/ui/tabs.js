// src/components/ui/tabs.js
import React, { useState } from "react";

export function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
}

export function TabsList({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ value, children, activeTab, setActiveTab, className = "" }) {
  return (
    <button
      className={`${className} ${activeTab === value ? "font-bold" : ""}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, activeTab, children, className = "" }) {
  return activeTab === value ? <div className={className}>{children}</div> : null;
}

