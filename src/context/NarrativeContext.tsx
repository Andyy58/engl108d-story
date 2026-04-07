import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Conversation, User } from "../types";
import { narrativeData } from "../data/narrative";

interface NarrativeContextType {
  users: Record<string, User>;
  conversations: Conversation[];
  activeConversationId: string;
  setActiveConversation: (id: string) => void;
  unlockConversation: (id: string) => void;
}

const NarrativeContext = createContext<NarrativeContextType | null>(null);

export function NarrativeProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(
    narrativeData.conversations
  );
  const [activeConversationId, setActiveConversationId] = useState<string>(
    narrativeData.conversations[0].id
  );

  const setActiveConversation = useCallback((id: string) => {
    setActiveConversationId(id);
    // Clear unread badge when user clicks into a conversation
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, hasUnread: false } : c))
    );
  }, []);

  const unlockConversation = useCallback((id: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, isUnlocked: true, hasUnread: true } : c
      )
    );
  }, []);

  return (
    <NarrativeContext.Provider
      value={{
        users: narrativeData.users,
        conversations,
        activeConversationId,
        setActiveConversation,
        unlockConversation,
      }}
    >
      {children}
    </NarrativeContext.Provider>
  );
}

export function useNarrative(): NarrativeContextType {
  const ctx = useContext(NarrativeContext);
  if (!ctx) {
    throw new Error("useNarrative must be used within a NarrativeProvider");
  }
  return ctx;
}
