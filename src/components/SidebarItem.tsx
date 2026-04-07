import type { Conversation, User } from "../types";
import { getAvatarColor } from "../utils/avatar";

interface SidebarItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
  dmUser?: User; // For DM conversations: the user on the other end
}

export function SidebarItem({ conversation, isActive, onClick, dmUser }: SidebarItemProps) {
  const { type, name, isPrivate, hasUnread } = conversation;

  const icon =
    type === "dm" ? (
      <span
        className="w-4 h-4 rounded flex items-center justify-center text-[9px] text-white mr-2 shrink-0 font-bold"
        style={{ backgroundColor: dmUser ? getAvatarColor(dmUser) : "#607d8b" }}
      >
        {name.charAt(0)}
      </span>
    ) : isPrivate ? (
      <svg
        className="w-3.5 h-3.5 mr-2 shrink-0 opacity-70"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <span className="mr-1.5 text-[15px] shrink-0 opacity-70">#</span>
    );

  return (
    <button
      onClick={onClick}
      className={[
        "flex items-center w-[calc(100%-16px)] mx-2 px-2 py-[3px] rounded-md text-[15px] cursor-pointer transition-colors duration-100 animate-sidebar-in",
        isActive
          ? "bg-slack-active text-white font-bold"
          : hasUnread
          ? "text-white font-bold hover:bg-slack-hover"
          : "text-slack-text-muted hover:bg-slack-hover",
      ].join(" ")}
    >
      {icon}
      <span className="truncate">{name}</span>

      {hasUnread && !isActive && (
        <span className="bg-slack-unread text-white text-[11px] font-bold px-[7px] py-[2px] rounded-full ml-auto shrink-0 animate-badge-pop">
          1
        </span>
      )}
    </button>
  );
}
