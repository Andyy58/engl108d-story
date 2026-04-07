# Narrative Data Format Guide

This document describes the structure of `src/data/narrative.ts` — the single file that defines every user, conversation, and message in the story.

The file exports one object: `narrativeData`, typed as `NarrativePayload`. It has two top-level keys: [`users`](#users) and [`conversations`](#conversations).

```ts
export const narrativeData: NarrativePayload = {
  users: { ... },
  conversations: [ ... ],
};
```

---

## Users

A dictionary of user profiles keyed by a unique ID. Every message references a user by this ID.

```ts
users: Record<string, User>
```

### User Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | ✅ | Unique identifier. Must match the dictionary key. Convention: `"u-name"`. |
| `username` | `string` | ✅ | Display name shown next to messages (e.g. `"Alice Chen"`). |
| `avatarUrl` | `string` | ✅ | URL/path to a square avatar image. Use `""` (empty string) to fall back to a colored initial square. |
| `avatarColor` | `string` | ❌ | CSS color for the initial fallback square (e.g. `"#E8912D"`). If omitted, a color is derived automatically from the user's `id`. This color is shared between the sidebar and the chat window. |
| `isBot` | `boolean` | ✅ | If `true`, an **APP** badge renders next to the username. Use for bots/integrations. |
| `role` | `string` | ❌ | Descriptive role (e.g. `"SRE Lead"`). Currently unused in the UI but available for future header displays. |

### Example

```ts
"u-alice": {
  id: "u-alice",
  username: "Alice Chen",
  avatarUrl: "",           // use initial fallback
  avatarColor: "#2eb67d", // optional: override the auto-assigned color
  isBot: false,
  role: "SRE Lead",
},
```

> **Avatar colors** are consistent across the sidebar and chat window — both use the same `getAvatarColor()` utility, which checks `avatarColor` first, then falls back to a deterministic hash of the user's `id` against an 8-color Slack-inspired palette.

---

## Conversations

An ordered array of conversations. Each conversation appears as a sidebar entry (if unlocked) and contains its own message list.

```ts
conversations: Conversation[]
```

### Conversation Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | ✅ | Unique identifier. Convention: `"c-name"`. |
| `type` | `"channel"` \| `"dm"` | ✅ | Controls the sidebar section it appears in and the icon/input styling. |
| `name` | `string` | ✅ | Display name. For channels, use a slug (e.g. `"incident-active-trading-bleed"`). For DMs, use the person's name (e.g. `"Director Davis"`). |
| `isPrivate` | `boolean` | ✅ | `true` → 🔒 lock icon. `false` → `#` hash icon. For DMs, typically set to `true`. |
| `isUnlocked` | `boolean` | ✅ | Whether this conversation is **visible in the sidebar on initial load**. Set to `false` for conversations you want to reveal later via a trigger. |
| `hasUnread` | `boolean` | ✅ | Whether the red unread badge shows. Typically `false` on load — triggers set this to `true` automatically. |
| `messages` | `Message[]` | ✅ | Ordered array of messages (see below). |

### Example

```ts
{
  id: "c-incident",
  type: "channel",
  name: "incident-active-trading-bleed",
  isPrivate: true,
  isUnlocked: true,     // visible from the start
  hasUnread: false,
  messages: [ ... ],
},
```

---

## Messages

Each message belongs to a conversation's `messages` array. They render top-to-bottom in the order they appear.

### Message Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | ✅ | Unique identifier. Convention: `"m1"`, `"m2"`, `"dm1"`, etc. |
| `userId` | `string` | ✅ | References a key in the `users` dictionary. |
| `timestamp` | `string` | ✅ | Pre-formatted display string (e.g. `"3:47 PM"`). Not parsed — renders exactly as written. |
| `content` | `string` | ✅ | The message body. See [Content Formatting](#content-formatting) below. |
| `dateDivider` | `string` | ❌ | If set, renders a horizontal date separator line **above** this message. Use for time jumps (e.g. `"Friday, April 13th — Late Night"`). |
| `attachment` | `MessageAttachment` | ❌ | An inline attachment below the message text. See [Attachments](#attachments). |
| `triggerAction` | `TriggerAction` | ❌ | If set, this message becomes an interactive trigger. See [Triggers](#triggers). |

### Example

```ts
{
  id: "m5",
  userId: "u-bob",
  timestamp: "3:55 PM",
  content: "There's a rounding change in `calcSpread()`. Someone swapped `Math.round` for `Math.floor`.",
  attachment: {
    type: "code",
    filename: "pricing-engine.diff",
    content: "- return Math.round(spread * multiplier * 100) / 100;\n+ return Math.floor(spread * multiplier * 100) / 100;",
  },
},
```

---

## Content Formatting

Message `content` is plain text with one special feature:

### Inline Code
Wrap text in single backticks to render it as styled inline code:

```
"Looks like someone changed `calcSpread()` without review."
```

Renders as: Looks like someone changed `calcSpread()` without review.

> **Note:** Only single backtick wrapping is supported. Multi-line code fences are not parsed in `content` — use a `code` attachment for that.

### Emoji
Standard Unicode emoji work as-is:

```
"🚨 Incident declared: P1 — Trading bleed detected."
```

---

## Attachments

An optional block rendered below the message text. Two types are supported.

### Image Attachment

Displays an inline image with an optional filename label.

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `"image"` | ✅ | Must be `"image"`. |
| `url` | `string` | ✅ | Path or URL to the image file. Relative paths resolve from the `public/` directory. |
| `filename` | `string` | ❌ | Label shown above the image (e.g. `"pnl-chart.png"`). |

```ts
attachment: {
  type: "image",
  url: "/charts/pnl-bleed.png",    // place file in public/charts/
  filename: "pnl-bleed.png",
},
```

> **Tip:** Place image files in the `public/` directory so they're served as static assets. Reference them with an absolute path like `"/images/screenshot.png"`.

### Code Attachment

Displays a formatted code block with an optional filename header bar.

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `"code"` | ✅ | Must be `"code"`. |
| `content` | `string` | ✅ | The code string to display. Use template literals (`` ` ``) for multi-line content. |
| `filename` | `string` | ❌ | Shown in a header bar above the code block (e.g. `"alert-payload.json"`). |
| `language` | `string` | ❌ | Language hint (e.g. `"json"`, `"bash"`). Currently reserved for future syntax highlighting. |

```ts
attachment: {
  type: "code",
  filename: "alert-payload.json",
  content: `{
  "severity": "P1",
  "service": "nav-recalc-pipeline",
  "region": "us-east-1"
}`,
},
```

---

## Triggers

Triggers are the interactive mechanic of the story. When a message with a `triggerAction` scrolls into the reader's viewport, it fires an event — typically unlocking a hidden conversation in the sidebar.

### TriggerAction Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `targetConversationId` | `string` | ✅ | The `id` of the conversation to unlock. |
| `action` | `"unlock_and_ping"` | ✅ | The action to perform. Currently only `"unlock_and_ping"` is supported (sets `isUnlocked: true` and `hasUnread: true` on the target). |
| `delayMs` | `number` | ❌ | Delay in milliseconds before the trigger fires. Defaults to `0`. Use `800`–`1500` for dramatic effect. |
| `fireOnce` | `boolean` | ❌ | Defaults to `true`. When `true`, the trigger fires only the first time the message enters the viewport. Set to `false` to re-fire every time the user scrolls past it. |

### Example

```ts
{
  id: "m8",
  userId: "u-bob",
  timestamp: "3:58 PM",
  content: "The PR was approved by… Director Davis.",
  triggerAction: {
    targetConversationId: "c-director-dm",  // must match a conversation id
    action: "unlock_and_ping",
    delayMs: 800,         // fires 800ms after scrolling into view
    fireOnce: true,       // won't re-fire if user scrolls away and back
  },
},
```

### How Triggers Work

1. The message renders normally in the feed.
2. An `IntersectionObserver` watches for the message to become ≥50% visible in the viewport.
3. After the optional `delayMs`, the target conversation is unlocked and a notification sound plays.
4. The newly unlocked conversation slides into the sidebar with an animated red "1" badge.

---

## Date Dividers

Add time-jump separators by setting `dateDivider` on a message. The divider renders as a horizontal line with a centered label **above** that message.

```ts
{
  id: "dm3",
  userId: "u-director",
  timestamp: "11:47 PM",
  dateDivider: "Friday, April 13th — Late Night",   // ← shown as a separator
  content: "Still there? I've been thinking about this all evening.",
},
```

Renders as:
```
─────────── Friday, April 13th — Late Night ───────────

  Director Davis  11:47 PM
  Still there? I've been thinking about this all evening.
```

---

## Consecutive Message Grouping

If two adjacent messages share the **same `userId`** and **same `timestamp`** string, the second message is automatically "grouped" — its avatar and username are hidden, and the text aligns under the previous message. This mimics Slack's real behavior.

```ts
// These two messages will be visually grouped:
{ id: "m2", userId: "u-alice", timestamp: "3:48 PM", content: "First line." },
{ id: "m3", userId: "u-alice", timestamp: "3:48 PM", content: "Second line." },
```

To avoid grouping (e.g., show the avatar again), use a slightly different timestamp:
```ts
{ id: "m2", userId: "u-alice", timestamp: "3:48 PM", content: "First line." },
{ id: "m3", userId: "u-alice", timestamp: "3:49 PM", content: "Second line." },
```

---

## Quick-Start Checklist

When writing your narrative, make sure:

- [ ] Every `userId` in a message has a matching entry in `users`
- [ ] Every `targetConversationId` in a trigger has a matching conversation `id`
- [ ] Hidden conversations have `isUnlocked: false` and `hasUnread: false`
- [ ] Trigger messages are placed **below the fold** — if they're visible on first render, they'll fire immediately and ruin the reveal
- [ ] Message `id` values are unique across all conversations
- [ ] The first conversation in the array is the one shown on initial load
