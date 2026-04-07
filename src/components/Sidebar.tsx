import { useNarrative } from "../context/NarrativeContext";
import { SidebarSection } from "./SidebarSection";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  const { conversations, activeConversationId, setActiveConversation, users } =
    useNarrative();

  const channels = conversations.filter(
    (c) => c.type === "channel" && c.isUnlocked
  );
  const dms = conversations.filter((c) => c.type === "dm" && c.isUnlocked);

  return (
    <aside className="w-[260px] bg-slack-sidebar border-r border-slack-border flex flex-col shrink-0 select-none">
      {/* Workspace Header */}
      <div className="h-[49px] flex items-center px-4 border-b border-slack-border">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-5 h-5 rounded bg-slack-active flex items-center justify-center shrink-0">
            <span className="text-white text-[10px] font-bold">M</span>
          </div>
          <span className="font-bold text-white text-[17px] truncate">
            Meridian Capital
          </span>
        </div>
      </div>

      {/* Scrollable nav */}
      <nav className="flex-1 overflow-y-auto py-3 scrollbar-hidden">
        <SidebarSection title="Channels" defaultOpen>
          {channels.map((c) => (
            <SidebarItem
              key={c.id}
              conversation={c}
              isActive={c.id === activeConversationId}
              onClick={() => setActiveConversation(c.id)}
            />
          ))}
        </SidebarSection>

        {dms.length > 0 && (
          <SidebarSection title="Direct Messages" defaultOpen>
            {dms.map((c) => {
              // Find the user for this DM by checking the first message's userId.
              // This is the person on the "other end" whose avatar color we want.
              const dmUserId = c.messages[0]?.userId;
              const dmUser = dmUserId ? users[dmUserId] : undefined;

              return (
                <SidebarItem
                  key={c.id}
                  conversation={c}
                  isActive={c.id === activeConversationId}
                  onClick={() => setActiveConversation(c.id)}
                  dmUser={dmUser}
                />
              );
            })}
          </SidebarSection>
        )}
      </nav>
    </aside>
  );
}
