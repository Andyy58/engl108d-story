// ── User Entity ──
export interface User {
  id: string;
  username: string;
  avatarUrl: string;    // URL or local path; empty string = use initial fallback
  avatarColor?: string; // Optional CSS color for the initial fallback square (e.g. "#E8912D").
                        // If omitted, a color is derived automatically from the user's id.
  isBot: boolean;       // If true, renders the "APP" badge next to username
  role?: string;        // e.g., "Engineering Director" — displayed in DM header
}

// ── Trigger Action Entity ──
export interface TriggerAction {
  targetConversationId: string;
  action: "unlock_and_ping";
  delayMs?: number;   // Optional delay (ms) before the unlock fires
  fireOnce?: boolean; // Default: true — set to false to re-fire every time the
                      // message scrolls back into view (e.g. for repeating effects)
}

// ── Attachment Entity ──
export interface MessageAttachment {
  type: "image" | "code";
  url?: string;       // For type: "image" — path to image file
  language?: string;  // For type: "code" — e.g. "bash", "python", "json"
  content?: string;   // For type: "code" — the code string to display
  filename?: string;  // Optional label shown above the attachment block
}

// ── Message Entity ──
export interface Message {
  id: string;
  userId: string;             // FK → User.id
  timestamp: string;          // Pre-formatted string, e.g. "4:15 PM"
  content: string;            // Plain text; supports inline `code` via regex rendering
  dateDivider?: string;       // If set, renders a Slack-style date separator ABOVE this message
  attachment?: MessageAttachment;
  triggerAction?: TriggerAction;
}

// ── Conversation Entity ──
export interface Conversation {
  id: string;
  type: "channel" | "dm";
  name: string;               // Display name (channel slug or person's name)
  isPrivate: boolean;         // true → lock icon, false → # icon
  isUnlocked: boolean;        // Whether it appears in the sidebar
  hasUnread: boolean;         // Whether the red badge renders
  messages: Message[];
}

// ── Root Payload ──
export interface NarrativePayload {
  users: Record<string, User>;    // Dictionary keyed by user ID for O(1) lookups
  conversations: Conversation[];
}
