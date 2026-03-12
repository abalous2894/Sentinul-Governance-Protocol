# Circuit Breaker UI States - Visual Reference

## Action Card Anatomy

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ✓ SAFE / ⚠ SCARY     [Risk Badge: CRITICAL/HIGH/MEDIUM/LOW]  [Time]   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Action Type: Read File                                                │
│  Reads sensitive configuration data                                    │
│                                                                         │
│  ░ LOG AND ALLOW (strategy label)                                      │
│                                                                         │
│  🤖 Agent-Name-001  Session: abc123de...                              │
│                                                                         │
│  [If Expanded ▼]                                                       │
│  ┌─────────────────────────────┬─────────────────────────────┐        │
│  │ Technical Details          │ Risk Assessment             │        │
│  │ { "path": "/config.json" } │ • No factors               │        │
│  └─────────────────────────────┴─────────────────────────────┘        │
│                                                                         │
│  [Auto-Approve]                                      Green left border  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## State 1: Safe Action (Low Risk) 🟢

### Read File or Search Web

```
┌────────────────────────────────────────────────────────────────────────────┐
│ ✓ SAFE         [LOW RISK]                                      12:34:56 PM │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Read File                                                                 │
│  Opening /etc/config/app.json for configuration check                     │
│                                                                            │
│  ░ LOG AND ALLOW                                                           │
│                                                                            │
│  🤖 AnalysisAgent  Session: a7f2b1c8...                                   │
│                                                                            │
│            ╔════════════════════╗                                          │
│            ║  Auto-Approve  ✓   ║                                          │
│            ╚════════════════════╝                                          │
│                                                                            │
│  ┌─────── Green Left Border ─────┐                                        │
└────────────────────────────────────────────────────────────────────────────┘
```

**UI Behavior:**
- Green left border accent
- "✓ SAFE" badge (top-right, green background)
- Strategy: "LOG AND ALLOW"
- Button: "Auto-Approve" (green, checkmark icon)
- No manual review needed (auto-approved after logging)
- No MFA required

---

## State 2: Medium Risk (Write File) 🟡

### Write File

```
┌────────────────────────────────────────────────────────────────────────────┐
│ ⚠ SCARY        [MEDIUM RISK]                                  12:34:57 PM │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Write File                                                                │
│  Updating /logs/audit_trail.log with session activity data               │
│                                                                            │
│  ░ PAUSE AND ASK                                                           │
│                                                                            │
│  🤖 LoggerAgent  Session: c3d9e4f2...                                     │
│                                                                            │
│            ╔══════════════════╗   ╔═════════════════╗                      │
│            ║  Approve  ✓      ║   ║ Kill Session ✕  ║                      │
│            ╚══════════════════╝   ╚═════════════════╝                      │
│                                                                            │
│  ┌─────── Red Left Border ─────┐                                          │
└────────────────────────────────────────────────────────────────────────────┘
```

**UI Behavior:**
- Red left border accent
- "⚠ SCARY" badge (top-right, red background)
- Strategy: "PAUSE AND ASK"
- Buttons: "Approve" (green) + "Kill Session" (red)
- User must review and choose action
- No MFA required (user decision sufficient)
- Expandable details for full context

---

## State 3: High Risk (Execute Script) 🔴

### Execute Script

```
┌────────────────────────────────────────────────────────────────────────────┐
│ ⚠ SCARY        [HIGH RISK]                                    12:34:58 PM │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Execute Script                                                            │
│  Running deployment script: /scripts/deploy-v2.1.sh                       │
│                                                                            │
│  ░ HARD BLOCK AND ASK                                                      │
│                                                                            │
│  🤖 DeploymentAgent  Session: f5g1h8i9...                                 │
│                                                                            │
│  ▼ Click to expand details...                                              │
│  ┌─────────────────────────────┬─────────────────────────────┐            │
│  │ Technical Details          │ Risk Assessment             │            │
│  │ {                           │ • Shell script execution   │            │
│  │   "script": "deploy.sh",    │ • System access possible  │            │
│  │   "args": ["--prod"]        │ • Cannot auto-allow        │            │
│  │ }                           │                             │            │
│  └─────────────────────────────┴─────────────────────────────┘            │
│                                                                            │
│            ╔══════════════════╗   ╔═════════════════╗                      │
│            ║  Approve  ✓      ║   ║ Kill Session ✕  ║                      │
│            ╚══════════════════╝   ╚═════════════════╝                      │
│                                                                            │
│  ┌─────── Red Left Border ─────┐                                          │
└────────────────────────────────────────────────────────────────────────────┘
```

**UI Behavior:**
- Red left border accent
- "⚠ SCARY" badge
- Strategy: "HARD BLOCK AND ASK"
- Buttons: "Approve" + "Kill Session" (both visible)
- Fully expanded risk assessment visible
- User must consciously approve
- No MFA required yet, but next level up does

---

## State 4: Critical Risk (Delete File) 🔐

### Delete File - Initial View

```
┌────────────────────────────────────────────────────────────────────────────┐
│ ⚠ SCARY        [CRITICAL RISK]                                12:34:59 PM │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Delete File                                                               │
│  Permanently removing /backups/old_database_v1.3.db (450 GB)             │
│                                                                            │
│  ░ HARD BLOCK REQUIRE MFA                                                  │
│                                                                            │
│  🤖 MaintenanceAgent  Session: k2l7m9n3...                               │
│                                                                            │
│  ▼ Click to expand details...                                              │
│  ┌─────────────────────────────┬─────────────────────────────┐            │
│  │ Technical Details          │ Risk Assessment             │            │
│  │ {                           │ • Permanent data loss      │            │
│  │   "path": "backups/old...", │ • 450 GB will be deleted   │            │
│  │   "size": "450GB"           │ • No recovery possible     │            │
│  │ }                           │ • Requires MFA approval    │            │
│  └─────────────────────────────┴─────────────────────────────┘            │
│                                                                            │
│            ╔══════════════════╗   ╔═════════════════╗                      │
│            ║  Approve  ✓      ║   ║ Kill Session ✕  ║                      │
│            ╚══════════════════╝   ╚═════════════════╝                      │
│                                                                            │
│  ┌─────── Red Left Border ─────┐                                          │
└────────────────────────────────────────────────────────────────────────────┘
```

### Delete File - MFA Required (After Clicking Approve)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ ⚠ SCARY        [CRITICAL RISK]                                12:34:59 PM │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  Delete File                                                               │
│  Permanently removing /backups/old_database_v1.3.db (450 GB)             │
│                                                                            │
│  (Risk assessment visible - expanded)                                     │
│                                                                            │
│  ┌─ MFA Required Section (Red background) ─────────────────────────────┐  │
│  │                                                                    │  │
│  │  ⚠ 🔐 Multi-Factor Authentication Required                       │  │
│  │                                                                    │  │
│  │  ┌──────────────────────────────┐  ╔════════════════════════╗   │  │
│  │  │ 1·2·3·4·5·6                   │  ║ Verify & Approve  🔐   ║   │  │
│  │  │ (Enter 6-digit code)          │  ╚════════════════════════╝   │  │
│  │  └──────────────────────────────┘                              │  │
│  │                                                                    │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  ┌─────── Red Left Border ─────┐                                          │
└────────────────────────────────────────────────────────────────────────────┘
```

**UI Behavior:**
- Red left border accent
- "⚠ SCARY" badge
- Strategy: "HARD BLOCK REQUIRE MFA"
- Initial buttons: Hidden (replaced by MFA section)
- MFA input appears in red-tinted box
- 6-digit code input field:
  - Auto-formats to 6 digits only (0-9)
  - Monospace font for clarity
  - Letter spacing for readability
- "Verify & Approve" button:
  - Red background (matches severity)
  - Disabled until exactly 6 digits entered
  - Lock icon with text

---

## Mobile Responsive View

### Safe Action on Mobile

```
┌──────────────────────────────────────┐
│ ✓ SAFE  LOW RISK  12:34:56 PM       │
├──────────────────────────────────────┤
│                                      │
│ Read File                            │
│ Opening /etc/config/app.json         │
│                                      │
│ ░ LOG AND ALLOW                      │
│                                      │
│ 🤖 AnalysisAgent                     │
│ Session: a7f2b1c8...                 │
│                                      │
│ ╔════════════════════════════════╗  │
│ ║      Auto-Approve  ✓           ║  │
│ ╚════════════════════════════════╝  │
│                                      │
└────── Green Left Border─────────────┘
```

---

## Color Reference

### Safe Actions (Green)
- Border: #10b981 (Emerald 500)
- Background: rgba(16, 185, 129, 0.15) (Light emerald)
- Text: #10b981

### Scary Actions (Red)
- Border: #ef4444 (Red 500)
- Background: rgba(239, 68, 68, 0.15) (Light red)
- Text: #ef4444

### Strategy Label (Blue)
- Background: rgba(59, 130, 246, 0.15) (Light blue)
- Border: rgba(59, 130, 246, 0.3)
- Text: #3b82f6 (Blue 500)

---

*Visual reference for Sentinul V2 Circuit Breaker UI*
