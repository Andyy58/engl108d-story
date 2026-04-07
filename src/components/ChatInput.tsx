interface ChatInputProps {
  conversationName: string;
  conversationType: "channel" | "dm";
}

export function ChatInput({ conversationName, conversationType }: ChatInputProps) {
  const placeholder =
    conversationType === "dm"
      ? `Message ${conversationName}`
      : `You do not have permission to post in #${conversationName}.`;

  return (
    <div className="px-5 pb-5 pt-2 flex-shrink-0">
      <div className="border border-slack-input-border rounded-lg bg-slack-input-bg px-4 py-3 text-slack-text-muted cursor-not-allowed text-[14px] select-none">
        {placeholder}
      </div>
    </div>
  );
}
