import { useEffect, useState } from "react";
import type { Message, User, MessageAttachment } from "../types";
import { useNarrative } from "../context/NarrativeContext";
import { useInView } from "../hooks/useInView";
import { getAvatarColor } from "../utils/avatar";

// NOTE: Drop your knock-brush.mp3 into src/assets/ and uncomment the import below.
import knockBrushSrc from "../assets/knock-brush.mp3";

interface MessageItemProps {
  message: Message;
  user: User;
  isGrouped: boolean;
}

export function MessageItem({ message, user, isGrouped }: MessageItemProps) {
  const { unlockConversation, conversations } = useNarrative();
  const hasTrigger = !!message.triggerAction;

  // Default to true if not explicitly set to false
  const triggerOnce = message.triggerAction?.fireOnce ?? true;
  const [shouldFire, setShouldFire] = useState(true);

  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.5,
    triggerOnce,
  });

  const isTargetUnlocked = message.triggerAction
    ? conversations.find(
        (c) => c.id === message.triggerAction!.targetConversationId,
      )?.isUnlocked
    : false;

  // Fire the narrative trigger when this message scrolls into view
  useEffect(() => {
    if (!inView || !message.triggerAction || !shouldFire) return;

    // If it's a one-time trigger and target is already unlocked globally, don't fire again.
    // This prevents re-firing when navigating between conversations (since component remounts).
    if (triggerOnce && isTargetUnlocked) return;

    const delay = message.triggerAction.delayMs ?? 0;
    const timer = setTimeout(() => {
      unlockConversation(message.triggerAction!.targetConversationId);
      if (triggerOnce) {
        setShouldFire(false);
      }

      // Play Slack-style notification sound
      const audio = new Audio(knockBrushSrc);
      audio.volume = 0.3;
      audio.play().catch(() => {
        console.log("failed");
      }); // Silently fail if browser blocks autoplay
    }, delay);

    return () => clearTimeout(timer);
  }, [
    inView,
    message.triggerAction,
    unlockConversation,
    shouldFire,
    triggerOnce,
    isTargetUnlocked,
  ]);

  const content = (
    <>
      <p className="text-[15px] leading-relaxed text-slack-text">
        {renderInlineContent(message.content)}
      </p>
      {message.attachment && renderAttachment(message.attachment)}
    </>
  );

  // ── Grouped message: same user + same minute, no repeated header ──
  if (isGrouped) {
    return (
      <div
        ref={hasTrigger ? ref : undefined}
        className="group hover:bg-slack-hover-msg -mx-5 px-5 py-0.5"
      >
        <div className="pl-12">{content}</div>
      </div>
    );
  }

  // ── Standard message ──
  return (
    <div
      ref={hasTrigger ? ref : undefined}
      className="flex items-start group hover:bg-slack-hover-msg -mx-5 px-5 py-1.5 mt-3 first:mt-0"
    >
      {/* Avatar — deterministic colored square with first initial */}
      <div
        className="w-9 h-9 rounded flex-shrink-0 mr-3 overflow-hidden flex items-center justify-center text-white text-[14px] font-bold"
        style={{ backgroundColor: getAvatarColor(user) }}
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.username}
            className="w-full h-full object-cover"
          />
        ) : (
          user.username.charAt(0).toUpperCase()
        )}
      </div>

      {/* Message header + body */}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline flex-wrap gap-x-1.5">
          <span className="font-bold text-slack-text text-[15px]">
            {user.username}
          </span>

          {user.isBot && (
            <span className="bg-slack-bot-bg text-slack-text-muted border border-slack-border text-[10px] font-bold px-1.5 py-px rounded-[3px] uppercase tracking-wider">
              APP
            </span>
          )}

          <span className="text-[12px] text-slack-text-muted font-normal hover:underline cursor-pointer">
            {message.timestamp}
          </span>
        </div>

        <div className="mt-0.5">{content}</div>
      </div>
    </div>
  );
}

// ── Attachment renderer ──
function renderAttachment(attachment: MessageAttachment) {
  if (attachment.type === "image" && attachment.url) {
    return (
      <div className="mt-2 max-w-[480px]">
        {attachment.filename && (
          <p className="text-[12px] text-slack-text-muted mb-1.5 font-medium">
            {attachment.filename}
          </p>
        )}
        <img
          src={attachment.url}
          alt={attachment.filename ?? "attachment"}
          className="rounded-lg border border-slack-border max-w-full"
        />
      </div>
    );
  }

  if (attachment.type === "code" && attachment.content) {
    return (
      <div className="mt-2 max-w-[640px]">
        {attachment.filename && (
          <div className="bg-[#222529] border border-slack-border border-b-0 rounded-t-lg px-3 py-1.5 text-[12px] text-slack-text-muted font-mono">
            {attachment.filename}
          </div>
        )}
        <pre
          className={[
            "bg-[#0d0e10] border border-slack-border p-4 overflow-x-auto",
            "text-[13px] text-[#abb2bf] font-mono leading-relaxed",
            attachment.filename ? "rounded-b-lg" : "rounded-lg",
          ].join(" ")}
        >
          <code>{attachment.content}</code>
        </pre>
      </div>
    );
  }

  return null;
}

// ── Inline content renderer ──
// Converts `backtick-wrapped` spans into styled <code> elements.
function renderInlineContent(content: string): React.ReactNode {
  const parts = content.split(/(`[^`]+`)/g);
  if (parts.length === 1) return content;

  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="bg-[#2d2f34] text-[#e8912d] px-1.5 py-0.5 rounded text-[13px] font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
