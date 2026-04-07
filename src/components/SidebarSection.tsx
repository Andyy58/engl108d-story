import { useState, type ReactNode } from "react";

interface SidebarSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export function SidebarSection({
  title,
  defaultOpen = true,
  children,
}: SidebarSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full px-4 py-1 text-slack-text-muted hover:text-slack-text transition-colors duration-100 cursor-pointer"
      >
        <svg
          className={`w-2.5 h-2.5 mr-1.5 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-90" : ""
          }`}
          fill="currentColor"
          viewBox="0 0 6 10"
        >
          <path d="M1.4 0L0 1.4 3.6 5 0 8.6 1.4 10l5-5z" />
        </svg>
        <span className="font-bold text-[13px]">{title}</span>
      </button>

      {isOpen && <div className="mt-0.5">{children}</div>}
    </div>
  );
}
