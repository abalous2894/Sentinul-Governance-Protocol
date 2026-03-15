# Getting Started: Your First Sentinul Scan

**5 minutes to your first security audit. No setup required.**

---

## 🚀 Option 1: Web Scanner (Fastest)

### Step 1: Visit Sentinul

Open https://sentinul.app in your browser.

You'll see:
```
┌──────────────────────────────────────────┐
│  Sentinul: Twin-Core Security Scanner    │
│                                          │
│  ⚡ Try the Twin-Core Sanitizer          │
│  Instant Multi-Agent Audit               │
│                                          │
│  [Paste your code here]                  │
│  ┌──────────────────────────────────────┐
│  │                                      │
│  │ Paste your agent skill code:         │
│  │ • CrewAI skill                       │
│  │ • AutoGen function                   │
│  │ • LangGraph node                     │
│  │ • Any Python/JS code                 │
│  │                                      │
│  └──────────────────────────────────────┘
│                                          │
│  [Scan Now →]                            │
│                                          │
│  No account required. Results in 2-3 sec│
└──────────────────────────────────────────┘
```

### Step 2: Paste Your Code

Find an agent skill in your codebase. For example, a CrewAI skill:

```python
# src/agents/database_skill.py
import json
from crewai import Agent, Task

async def query_database(user_input: str) -> str:
    """Query the database based on user input"""
    query = f"SELECT * FROM users WHERE id = {user_input}"
    result = db.execute(query)
    return json.dumps(result)

def create_database_agent():
    agent = Agent(
        role="Database Admin",
        goal="Execute user queries safely",
        tools=[],
    )
    
    task = Task(
        description="Query database for: {query}",
        agent=agent,
    )
    
    return agent
```

Copy this code and paste into the Sentinul scanner.

### Step 3: Click "Scan Now"

The scanner runs instantly:

```
Scanning...
✓ Code received (342 bytes)
✓ Analysis in progress...
✓ Checking for vulnerabilities...

Results: 2-3 seconds
```

### Step 4: See Your Results

You'll get a **Core 1 report** (free):

```
┌────────────────────────────────────────────────┐
│  SENTINUL SECURITY REPORT                      │
│                                                │
│  Risk Score: 85 / 100 (CRITICAL)               │
│                                                │
│  Vulnerabilities Found: 2                      │
│                                                │
│  ⚠️  CRITICAL: SQL Injection                   │
│      File: database_skill.py line 5            │
│      Pattern: SELECT ... {user_input}          │
│      CWE: CWE-89                               │
│      Impact: Attacker can access all user data │
│                                                │
│  ⚠️  HIGH: No Input Validation                 │
│      File: database_skill.py line 5            │
│      Pattern: user_input used directly         │
│      CWE: CWE-20                               │
│      Impact: Unexpected inputs crash the agent│
│                                                │
│  📋 COMPLIANCE IMPACT                          │
│      SOC2:   ❌ FAIL - Security compromise     │
│      HIPAA:  ✓ PASS - Not health data          │
│      GDPR:   ❌ FAIL - Data protection         │
│      PCI:    ❌ FAIL - Database access         │
│                                                │
│  TEASER FEATURES (Pro Only):                   │
│      • Exact line numbers with fix             │
│      • AI-generated code fixes                 │
│      • CWE vulnerability mappings              │
│      • Digital Twin sandbox verification       │
│      • Auto-create GitHub PRs                  │
│      • Signed compliance audit reports         │
│                                                │
│  [Upgrade to Pro →]  [Try Another Code →]     │
└────────────────────────────────────────────────┘
```

**That's it!** You've completed your first scan. 🎉

---

## 🔑 Option 2: CLI (For CI/CD)

### Step 1: Install CLI

```bash
npm install -g @sentinul/cli
```

Or with Python:
```bash
pip install sentinul-cli
```

### Step 2: Create API Key

Go to https://sentinul.app/settings/api-keys

Click "Create API Key" and copy it:
```
sk_test_abc123xyz789...
```

### Step 3: Scan Your Project

```bash
cd your-project/
sentinul scan src/agents/

# Output:
# ✓ Found 4 agent files
# ① database_skill.py (342 bytes) → Risk: 85/100 ⚠️
# ② report_agent.py (456 bytes) → Risk: 42/100 ✓
# ③ email_notifier.py (298 bytes) → Risk: 15/100 ✓
# ④ auth_guardian.py (521 bytes) → Risk: 72/100 ⚠️
#
# Summary:
#   Critical: 2 vulnerabilities
#   High: 3 vulnerabilities
#   Medium: 1 vulnerability
#   Total Risk: 62/100 (HIGH)
#
# Free scan complete. Upgrade to Pro to:
# • Get detailed fixes
# • Verify in Digital Twin
# • Create GitHub PRs
```

### Step 4: Verify a Single Fix (Pro)

```bash
sentinul verify src/agents/database_skill.py \
  --api-key sk_test_abc123xyz789 \
  --auto-fix

# Output:
# 🔍 Verifying database_skill.py...
# 
# Vulnerability: SQL Injection
# Proposed Fix: Use parameterized queries
# 
# Running Digital Twin tests...
# ✓ Test 1: Normal SQL query → PASS (12ms)
# ✓ Test 2: SQL injection payload → REJECTED (8ms)
# ✓ Test 3: Resource limits → PASS (14ms)
# 
# All tests PASSED! Fix verified.
# 
# 📝 Creating GitHub PR...
# PR URL: https://github.com/youruser/yourrepo/pull/42
# Branch: sentinul/fix/sql-injection-001
# Badge: [Sentinul Verified] ✓
```

### Step 5: (Optional) Merge PR

Go to your GitHub PR and review the fix:

```javascript
// ❌ Before
const query = f"SELECT * FROM users WHERE id = {user_input}";

// ✅ After  
const query = "SELECT * FROM users WHERE id = ?";
const result = db.execute(query, [user_input]);
```

And merge! Your code is now secure. ✓

---

## 🤖 Option 3: MCP for Claude Desktop

### Step 1: Install MCP Server

```bash
npm install -g @sentinul/mcp-server
```

### Step 2: Configure Claude

Edit your Claude Desktop config:

**Mac/Linux:** `~/.config/Claude/claude_desktop_config.json`

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Add:
```json
{
  "mcpServers": {
    "sentinul": {
      "command": "sentinul-mcp",
      "args": ["--api-key", "sk_test_abc123xyz789"]
    }
  }
}
```

Restart Claude Desktop.

### Step 3: Ask Claude to Audit Your Code

In Claude, say:

```
I have this CrewAI agent code. Can you audit it for security issues?

[Paste your agent code]

Use the Sentinul security tool to scan it, and if you find vulnerabilities, 
tell me how to fix them.
```

Claude will:
1. Send your code to Sentinul MCP
2. Get back security analysis
3. Explain the vulnerabilities  
4. Suggest fixes
5. Offer to generate a GitHub PR

Example conversation:

```
You: "Audit this CrewAI agent for security"

Claude: "I'll use Sentinul to scan this code...

Found 2 vulnerabilities:

1. SQL Injection (CRITICAL)
   - Line 5: f'SELECT * FROM users WHERE id = {user_input}'
   - Fix: Use parameterized queries
   - Impact: Attacker can dump entire user table

2. Missing Input Validation (HIGH)
   - Line 5: No check on user_input type
   - Fix: Validate input is positive integer
   - Impact: Code crashes on unexpected input

Want me to generate a GitHub PR with the fixes?"

You: "Yes, please create the PR"

Claude: "Creating PR now...
✓ Branch: sentinul/fix/sql-injection-001
✓ PR Title: Fix SQL injection in database_agent
✓ Tests: All passing in Digital Twin
✓ URL: https://github.com/youruser/yourrepo/pull/99"
```

---

## 🧪 Option 4: GitHub Actions (Continuous Scanning)

### Step 1: Create Workflow File

Create `.github/workflows/sentinul.yml`:

```yaml
name: Sentinul Security Scan

on:
  pull_request:
    paths:
      - 'src/agents/**'
      - 'src/skills/**'

jobs:
  sentinul-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Sentinul Scan
        uses: sentinul/scan-action@v1
        with:
          api-key: ${{ secrets.SENTINUL_API_KEY }}
          path: src/agents
          auto-fix: true
          fail-on-critical: true
      
      - name: Post Results
        if: always()
        uses: sentinul/comment-action@v1
        with:
          results: ${{ steps.scan.outputs.report }}
```

### Step 2: Add API Key

Go to your GitHub repo → Settings → Secrets → New secret

Name: `SENTINUL_API_KEY`  
Value: `sk_test_abc123xyz789`

### Step 3: Test It

Push a PR with vulnerable code:

```
GitHub PR automatically gets comment:

┌─────────────────────────────────────┐
│ 🔐 Sentinul Security Scan Results   │
├─────────────────────────────────────┤
│ ⚠️  CRITICAL: SQL Injection          │
│    File: src/agents/db.py:42        │
│    Fix: Use parameterized queries   │
│                                     │
│ Request changes until fixed         │
└─────────────────────────────────────┘
```

PR is blocked until vulnerabilities fixed! ✓

---

## 📚 Next Steps

### Learn the Basics

- **[Twin-Core Protocol](./TWIN-CORE-PROTOCOL.md)** — Understand how scanning works
- **[Multi-Agent Security](./MULTI-AGENT-SECURITY.md)** — Framework-specific attacks
- **[Compliance Mapping](./COMPLIANCE-MAPPING.md)** — Regulatory requirements

### Integrate with Your Team

1. **Share Sentinul with your team** → https://sentinul.app
2. **Set up GitHub Actions** → Continuous security
3. **Configure Slack notifications** → Get alerts
4. **Review compliance reports** → Monthly audits

### Scale to Production

1. **Upgrade to Pro tier** → Unlimited scans
2. **Get Digital Twin** → Verify every fix
3. **Auto-create PRs** → Deploy with confidence
4. **Get signed audit reports** → Compliance proof

---

## ❓ FAQ

### Q: Is my code stored on Sentinul servers?

**A:** No. Core 1 (free scan) processes code in memory and discards it. Core 2 (Pro) stores scans for 24 hours then deletes. You can use the zero-knowledge mode to analyze locally.

### Q: Does Sentinul support my framework?

**A:** We officially support CrewAI, AutoGen, LangGraph, and OpenClaw. Any Python/JavaScript code can be scanned with best-effort vulnerability detection.

### Q: How much does it cost?

**A:** Free tier covers Core 1 (instant scan). Pro tier ($99/mo) unlocks Core 2 (Digital Twin + auto-fixes). 

### Q: Can I use Sentinul in CI/CD?

**A:** Yes! Use the CLI or GitHub Action to block PRs if critical vulnerabilities detected.

### Q: What if I find a bug in Sentinul?

**A:** Report it at security@sentinul.app or file an issue on GitHub.

---

## 🎯 You're Ready!

1. ✅ Understand what Sentinul does
2. ✅ Scan your first agent code
3. ✅ Read about vulnerabilities
4. ✅ Get fixes verified in Digital Twin
5. ✅ Deploy with confidence

**Your autonomous agents, verified and secure.** 🛡️

---

## 📞 Support

- **Discord:** https://discord.gg/sentinul
- **Email:** support@sentinul.app
- **Docs:** https://docs.sentinul.app
- **GitHub:** https://github.com/sentinul

---

*Getting Started: Your First Sentinul Scan.*  
*V4 Production Hardened | March 14, 2026*
