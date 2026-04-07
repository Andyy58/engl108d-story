import type { Conversation } from "../types";

interface ChatHeaderProps {
  conversation: Conversation;
}

export function ChatHeader({ conversation }: ChatHeaderProps) {
  const { type, name, isPrivate } = conversation;

  return (
    <header className="h-[49px] flex items-center px-5 border-b border-slack-border flex-shrink-0">
      <div className="flex items-center min-w-0 gap-2">
        {type === "channel" ? (
          <span className="text-slack-text-muted flex-shrink-0">
            {isPrivate ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <span className="text-[18px] font-light">#</span>
            )}
          </span>
        ) : (
          <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
        )}
        <h1 className="font-bold text-white text-[17px] truncate">{name}</h1>
      </div>
    </header>
  );
}
