import type { User } from "../types";

/**
 * Resolves the avatar background color for a user.
 *
 * Priority:
 *   1. user.avatarColor — explicitly set in narrative.ts (e.g. "#E8912D")
 *   2. Deterministic hash of user.id → curated Slack-inspired palette
 *
 * Using this single function in both MessageItem and SidebarItem guarantees
 * that a user's avatar color is always identical in both places.
 */
export function getAvatarColor(user: User): string {
  if (user.avatarColor) return user.avatarColor;

  const palette = [
    "#e8912d", // orange
    "#e01e5a", // pink/red
    "#2eb67d", // green
    "#36c5f0", // sky blue
    "#ecb22e", // yellow
    "#4a154b", // purple
    "#007a5a", // teal
    "#1264a3", // blue
  ];

  let hash = 0;
  for (let i = 0; i < user.id.length; i++) {
    hash = user.id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return palette[Math.abs(hash) % palette.length];
}
