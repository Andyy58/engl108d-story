import type { NarrativePayload } from "../types";

export const narrativeData: NarrativePayload = {
  users: {
    "u-bot": {
      id: "u-bot",
      username: "Risk_Alert_Bot",
      avatarUrl: "",
      isBot: true,
      avatarColor: "#e8912d",
    },
    "u-sam": {
      id: "u-sam",
      username: "Sam (Me)",
      avatarUrl: "",
      isBot: false,
      role: "Backend Engineer",
      avatarColor: "#36c5f0",
    },
    "u-casey": {
      id: "u-casey",
      username: "Casey (Intern)",
      avatarUrl: "",
      isBot: false,
      role: "Junior Developer",
      avatarColor: "#e01e5a",
    },
    "u-director": {
      id: "u-director",
      username: "Director Davis (Engineering Director)",
      avatarUrl: "",
      isBot: false,
      role: "Engineering Director",
      avatarColor: "#2eb67d",
    },
  },

  conversations: [
    {
      id: "c-incident",
      type: "channel",
      name: "trading-ops-prod",
      isPrivate: false,
      isUnlocked: true,
      hasUnread: false,
      messages: [
        {
          id: "m1",
          userId: "u-sam",
          timestamp: "3:50 PM",
          dateDivider: "Friday, April 13th - 3:50 PM",
          content:
            "Alright Casey, welcome to the Friday afternoon deployment club. Since it's your first week, I'm going to walk you through pushing code to production.",
        },
        {
          id: "m2",
          userId: "u-casey",
          timestamp: "3:51 PM",
          content:
            "Glad to be here! Though I was reading through the engineering wiki this morning... aren't Friday afternoon deploys a massive taboo?",
        },
        {
          id: "m3",
          userId: "u-sam",
          timestamp: "3:52 PM",
          content:
            "Usually, yes. But Meridian Capital is a High-Frequency Trading (HFT) firm. The actual trading algorithms that buy and sell stocks are locked down tight. We don't touch those unless it's a Tuesday and we have three managers watching.",
        },
        {
          id: "m4",
          userId: "u-sam",
          timestamp: "3:53 PM",
          content:
            "Our job as backend engineers is basically just keeping the pipes clean. Today, we're just pushing a minor, routine update to the internal logging service. Super low risk.",
        },
        {
          id: "m5",
          userId: "u-casey",
          timestamp: "3:54 PM",
          content:
            "Ah, got it. So we're just the plumbers making sure the UI dashboards look pretty for the executives.",
        },
        {
          id: "m6",
          userId: "u-sam",
          timestamp: "3:55 PM",
          content:
            "Exactly. The quants who write the trading bots are already at the bar. Just don't accidentally type `destroy_all_money` in the terminal and you'll be fine.",
        },
        {
          id: "m7",
          userId: "u-casey",
          timestamp: "3:56 PM",
          content: "Lol, noted. I will keep my hands away from the keyboard.",
        },
        {
          id: "m8",
          userId: "u-sam",
          timestamp: "4:00 PM",
          content:
            "Okay, the CI/CD pipeline is green. Hitting the deploy button now.",
        },
        {
          id: "m9",
          userId: "u-bot",
          timestamp: "4:02 PM",
          content:
            "✅ Deploy 8.4.2 to `production` successful. 0 errors detected.",
          attachment: {
            type: "code",
            filename: "deploy-pipeline.log",
            content: `[16:01:59] Build successful.
[16:02:01] Containerizing image...
[16:02:03] Pushing to all 64 edge nodes.
[16:02:04] Status: GREEN. Traffic routed.`,
          },
        },
        {
          id: "m10",
          userId: "u-sam",
          timestamp: "4:02 PM",
          content: "And we're green. See? Easy.",
        },
        {
          id: "m11",
          userId: "u-casey",
          timestamp: "4:03 PM",
          content:
            "A little anti-climactic, but I'll take it. Have a great weekend Sam!",
        },
        {
          id: "m12",
          userId: "u-bot",
          timestamp: "4:15 PM",
          dateDivider: "Friday, April 13th - 4:15 PM",
          content:
            "⚠️ ALERT: Unusual transaction volume detected on Node 4. Executing market buys at bid ceiling.",
        },
        {
          id: "m13",
          userId: "u-casey",
          timestamp: "4:16 PM",
          content: "Uh, did I jinx it? Is the bot supposed to do that?",
        },
        {
          id: "m14",
          userId: "u-sam",
          timestamp: "4:16 PM",
          content:
            "No, that's weird. The logging patch shouldn't trigger a volume alert. Let me check the dashboard. It's probably just a glitch with the bot double-counting test data.",
        },
        {
          id: "m15",
          userId: "u-bot",
          timestamp: "4:16 PM",
          content:
            "🚨 P&L INTERVAL REPORT: Meridian Capital exposure exceeded threshold.",
          attachment: {
            type: "code",
            filename: "risk-assessment.json",
            content: `{
  "status": "CRITICAL",
  "active_trades": 14592,
  "net_pnl_180s": "-10,400,000.00 USD",
  "trend": "ACCELERATING"
}`,
          },
        },
        {
          id: "m16",
          userId: "u-casey",
          timestamp: "4:16 PM",
          content:
            "Sam...? Does P&L mean Profit and Loss? Because that says minus ten million.",
        },
        {
          id: "m17",
          userId: "u-sam",
          timestamp: "4:18 PM",
          content:
            "Yeah, it does. But that number is literally impossible. We don't even have that kind of margin exposure allowed on a single node. The dashboard is definitely parsing the test-net data by mistake. Give me a sec to refresh the cache.",
        },
        {
          id: "m18",
          userId: "u-director",
          timestamp: "4:20 PM",
          content:
            "Hey Sam, Casey. Welcome to the team, Casey—sorry your first Friday is getting loud. Sam, my phone is blowing up with P1 margin alerts. You seeing this?",
        },
        {
          id: "m19",
          userId: "u-sam",
          timestamp: "4:21 PM",
          content:
            "Hey Davis. Yeah, I'm looking at it now. I'm 99% sure it's a reporting glitch. I just pushed that minor logging patch and I think it's duplicating test transactions in the UI.",
        },
        {
          id: "m20",
          userId: "u-director",
          timestamp: "4:22 PM",
          content:
            "Okay, that makes sense. Let me cross-reference with the live broker feed just to be absolutely safe. Hold tight.",
        },
        {
          id: "m21",
          userId: "u-director",
          timestamp: "4:26 PM",
          content: "Sam.... It's not a reporting glitch.",
        },
        {
          id: "m22",
          userId: "u-sam",
          timestamp: "4:26 PM",
          content: "What?",
        },
        {
          id: "m23",
          userId: "u-director",
          timestamp: "4:27 PM",
          content:
            "The broker feed confirms it. We are actively executing live market buys at the ceiling. We are bleeding cash.",
        },
        {
          id: "m24",
          userId: "u-sam",
          timestamp: "4:27 PM",
          content:
            "That's impossible! I only touched the logging service! I didn't even open the trading logic directory!",
        },
        {
          id: "m25",
          userId: "u-director",
          timestamp: "4:28 PM",
          content:
            "I know, I know. Deep breaths, Sam. Let's just stop the bleeding first, then we'll figure out how it happened. Can you run a rollback to this morning's stable build?",
        },
        {
          id: "m26",
          userId: "u-sam",
          timestamp: "4:28 PM",
          content:
            "Yes. Hitting the rollback command now. That should kill whatever is doing this.",
          attachment: {
            type: "code",
            filename: "terminal",
            content: `> kubectl rollout undo deployment/trading-engine-prod
deployment.apps/trading-engine-prod rolled back`,
          },
        },
        {
          id: "m27",
          userId: "u-bot",
          timestamp: "4:29 PM",
          content: "🔄 Rollback to build 8.4.1 initialized.",
        },
        {
          id: "m28",
          userId: "u-casey",
          timestamp: "4:29 PM",
          content: "Oh thank god. Did it stop?",
        },
        {
          id: "m30",
          userId: "u-bot",
          timestamp: "4:30 PM",
          content:
            "🚨 CRITICAL ALERT: Rogue execution detected on ALL 64 NODES. Rate of loss multiplied.",
        },
        {
          id: "m31",
          userId: "u-bot",
          timestamp: "4:31 PM",
          content: "📉 P&L INTERVAL REPORT: Net loss -$145,000,000.00.",
        },
        {
          id: "m32",
          userId: "u-sam",
          timestamp: "4:31 PM",
          content: "Oh my god. That doesn't make any sense!!",
        },
        {
          id: "m33",
          userId: "u-casey",
          timestamp: "4:32 PM",
          content:
            "What just happened?! Why did the number get bigger?! I thought you undid it!",
        },
        {
          id: "m34",
          userId: "u-sam",
          timestamp: "4:32 PM",
          content:
            "I did! I reverted the environment! The code should be exactly the same as it was when we woke up this morning! I don't understand how it's still running, let alone moving faster!",
        },
        {
          id: "m35",
          userId: "u-director",
          timestamp: "4:33 PM",
          content:
            "Okay, nobody panic. Sam, hit the digital kill switches. Sever the API keys to the broker. We'll hard-stop the system.",
        },
        {
          id: "m36",
          userId: "u-sam",
          timestamp: "4:34 PM",
          content:
            "I'm trying! The network is too saturated. The trading engine is spamming so many orders I can't even get an active connection!",
        },
        {
          id: "m37",
          userId: "u-casey",
          timestamp: "4:34 PM",
          content: "Can we restart the AWS instances from the cloud console?",
        },
        {
          id: "m38",
          userId: "u-director",
          timestamp: "4:35 PM",
          content:
            "These aren't cloud instances, Casey. We've got physical servers in a Chicago data center to reduce trading latency.",
        },
        {
          id: "m39",
          userId: "u-director",
          timestamp: "4:35 PM",
          content:
            "The API keys aren't revoking on my end either. I think the fail-safes are being completely locked out by the traffic.",
        },
        {
          id: "m40",
          userId: "u-sam",
          timestamp: "4:36 PM",
          content: "Davis, I don't know what to do. I can't stop it.",
        },
        {
          id: "m41",
          userId: "u-director",
          timestamp: "4:37 PM",
          content: "It's okay, Sam. You did everything right. I'm taking over.",
        },
        {
          id: "m42",
          userId: "u-director",
          timestamp: "4:37 PM",
          content: "I'm calling the Chicago data center directly.",
        },
        {
          id: "m43",
          userId: "u-casey",
          timestamp: "4:38 PM",
          content: "To do what??",
        },
        {
          id: "m44",
          userId: "u-director",
          timestamp: "4:38 PM",
          content:
            "To have them literaly pull the power cables out of the wall.",
        },
        {
          id: "m45",
          userId: "u-bot",
          timestamp: "4:45 PM",
          dateDivider: "Friday, April 13th - 4:45 PM",
          content: "📉 P&L INTERVAL REPORT: -$460,000,000.00 USD.",
        },
        {
          id: "m46",
          userId: "u-bot",
          timestamp: "4:46 PM",
          content: "❌ ERROR: CONNECTION TO TRADING SERVERS LOST.",
        },
        {
          id: "m47",
          userId: "u-director",
          timestamp: "4:47 PM",
          content:
            "Okay. The servers are dark and the bleeding is stopped. Everyone, please step away from your desks. Try to breathe. I am going to handle the executive team.",
        },
        {
          id: "m48",
          userId: "u-director",
          timestamp: "4:48 PM",
          content:
            "Have a good weekend, both of you. I will update you when I know more.",
          triggerAction: {
            targetConversationId: "c-director-dm",
            action: "unlock_and_ping",
            delayMs: 1500,
          },
        },
      ],
    },
    {
      id: "c-director-dm",
      type: "dm",
      name: "Director Davis",
      isPrivate: true,
      isUnlocked: false,
      hasUnread: false,
      messages: [
        {
          id: "dm1",
          userId: "u-director",
          timestamp: "11:45 PM",
          dateDivider: "Saturday, April 14th - 1:45 AM",
          content: "Hey Sam. Are you awake?",
        },
        {
          id: "dm2",
          userId: "u-director",
          timestamp: "1:45 AM",
          content:
            "We just finished the post-mortem. I wanted to tell you personally before the rumors start.",
        },
        {
          id: "dm3",
          userId: "u-director",
          timestamp: "11:46 AM",
          content:
            "When you rolled back the environment, it woke up a really old piece of dormant test code. It was tied to a deprecated library that your logging patch had accidentally removed. Because the rollback hit all our servers at once, it turned that test code live on every server.",
        },
        {
          id: "dm4",
          userId: "u-director",
          timestamp: "1:46 AM",
          content:
            "It ended up executing test trades on the live market as fast as it could manage. That's what caused the volume spike.",
        },
        {
          id: "dm5",
          userId: "u-director",
          timestamp: "1:47 AM",
          content: "Listen to me: this was NOT your fault.",
        },
        {
          id: "dm6",
          userId: "u-director",
          timestamp: "1:50 AM",
          content:
            "Meridian trusted the automated systems way too much. We didn't have good fail-safes and we never cleaned up the old test code that led to this disaster. Unforunately these bad practices were accepted by way too many people up the chain, and something like this was bound to happen sooner or later as a result. Once it started there really wasn't anything you could do.",
        },
        {
          id: "dm7",
          userId: "u-director",
          timestamp: "1:51 AM",
          content:
            "I just wanted to make sure you didn't spend the rest of the weekend blaming yourself. You are a brilliant engineer.",
        },
        {
          id: "dm8",
          userId: "u-director",
          timestamp: "1:53 AM",
          content:
            "But honestly, Sam... after $460 million in losses, the board is already talking about liquidation. I don't think there's going to be a company left for us to come back to on Monday. Take care of yourself.",
        },
      ],
    },
  ],
};
