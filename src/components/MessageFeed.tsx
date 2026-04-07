import { useEffect, useRef } from "react";
import type { Conversation, User } from "../types";
import { MessageItem } from "./MessageItem";

interface MessageFeedProps {
  conversation: Conversation;
  users: Record<string, User>;
}

export function MessageFeed({ conversation, users }: MessageFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to TOP when conversation changes — the reader must scroll down
  // through the incident log to naturally reach the trigger message.
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [conversation.id]);

  const { messages } = conversation;

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-5 py-4 scrollbar-hidden"
    >
      {messages.map((msg, i) => {
        // Consecutive grouping: hide avatar/name if same user AND same timestamp
        const prev = i > 0 ? messages[i - 1] : null;
        const isGrouped =
          prev !== null &&
          prev.userId === msg.userId &&
          prev.timestamp === msg.timestamp;

        return (
          <div key={msg.id}>
            {/* Date divider — Slack-style horizontal rule with date label */}
            {msg.dateDivider && (
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-slack-border" />
                <span className="mx-4 text-[12px] font-bold text-slack-text-muted border border-slack-border rounded-full px-3 py-0.5">
                  {msg.dateDivider}
                </span>
                <div className="flex-1 border-t border-slack-border" />
              </div>
            )}

            <MessageItem
              message={msg}
              user={users[msg.userId]}
              isGrouped={isGrouped}
            />
          </div>
        );
      })}
    </div>
  );
}
