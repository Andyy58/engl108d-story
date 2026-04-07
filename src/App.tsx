import { useState } from "react";
import { NarrativeProvider } from "./context/NarrativeContext";
import { Sidebar } from "./components/Sidebar";
import { MainWorkspace } from "./components/MainWorkspace";

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);

  if (!hasStarted) {
    return (
      <div className="hidden h-screen w-screen text-slack-text bg-slack-bg md:flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-[24px] font-bold text-white mb-4">
            Project Knight
          </h1>
          <p className="text-slack-text-muted mb-6">
            An Slack-based threaded story.
          </p>
          <button
            onClick={() => setHasStarted(true)}
            className="bg-slack-active text-white px-6 py-2 rounded font-bold hover:bg-[#148567] transition-colors"
          >
            Click to Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <NarrativeProvider>
      {/* Responsive guard — shown only on viewports < 768px (md breakpoint) */}
      <div className="fixed inset-0 z-50 bg-slack-bg flex items-center justify-center p-8 text-center md:hidden">
        <div>
          <p className="text-[32px] mb-3">🖥️</p>
          <p className="text-white font-bold text-[18px] mb-2">
            Desktop Viewing Required
          </p>
          <p className="text-slack-text-muted text-[14px] leading-relaxed max-w-[300px]">
            For the best narrative experience, please view this project on a
            full desktop browser window.
          </p>
        </div>
      </div>

      {/* Main app — min-w prevents layout collapse below 768px */}
      <div className="flex h-screen w-screen overflow-hidden text-slack-text bg-slack-bg min-w-[768px]">
        <Sidebar />
        <MainWorkspace />
      </div>
    </NarrativeProvider>
  );
}
