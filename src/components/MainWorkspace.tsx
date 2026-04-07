import { useNarrative } from "../context/NarrativeContext";
import { ChatHeader } from "./ChatHeader";
import { MessageFeed } from "./MessageFeed";
import { ChatInput } from "./ChatInput";

export function MainWorkspace() {
  const { conversations, activeConversationId, users } = useNarrative();
  const conversation = conversations.find((c) => c.id === activeConversationId);

  if (!conversation) return null;

  return (
    <main className="flex-1 flex flex-col bg-slack-bg min-w-0">
      <ChatHeader conversation={conversation} />
      <MessageFeed conversation={conversation} users={users} />
      <ChatInput
        conversationName={conversation.name}
        conversationType={conversation.type}
      />
    </main>
  );
}
