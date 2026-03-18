# Sentinul: Genesis Sovereignty Edition

**Enterprise-grade security verification for autonomous AI agents and multi-agent systems.**

**Current Version:** 5.0.0 Genesis Sovereignty  
**Tagline:** Beyond Guardrails. Real-Time Sovereignty.  
**Status:** ✅ Production-ready  
**Scope of this README:** V5 foundation + Genesis launch features only

> This README covers how to use Sentinul’s core V5 features and the Genesis update launched today. It does not include Aegis or Genesis 1.1 features.

---

## Table of Contents

- [What's Public vs. Proprietary](#whats-public-vs-proprietary)
- [Quick Start](#quick-start)
- [Installation Options](#installation-options)
- [What's New in Genesis](#whats-new-in-genesis)
- [How to Use the Previous V5 Features](#how-to-use-the-previous-v5-features)
- [How to Use the Genesis Launch Features](#how-to-use-the-genesis-launch-features)
- [BYOK Integration](#byok-integration)
- [Compliance Mappings](#compliance-mappings)
- [Documentation](#documentation)
- [FAQ](#faq)
- [Support](#support)
- [Security](#security)
- [License](#license)

---

## What's Public vs. Proprietary

### ✅ Public Governance Protocol

This repository documents the public-facing Sentinul governance model and integration patterns, including:

- Governance architecture and protocol reference
- Compliance mappings for SOC2, HIPAA, GDPR, ISO 27001, and PCI-DSS
- Open integration examples and implementation guidance
- MCP integration guidance
- Usage documentation for the V5 platform model and Genesis launch workflows

### 🔒 Proprietary Platform

The hosted Sentinul platform includes the private runtime and enterprise delivery components, including:

- Core scanning and remediation engine
- Live dashboard and fleet operations UI
- Evidence Vault runtime implementation
- Genesis launch services and backend orchestration
- Enterprise deployment features and managed support

👉 **Full platform access:** Visit [sentinul.app](https://sentinul.app)

---

## Quick Start

### Option 1: Review the Governance Protocol

```bash
git clone https://github.com/abalous2894/Sentinul-Governance-Protocol.git
cd Sentinul-Governance-Protocol
```

Start with:

- `README.md`
- `GETTING-STARTED.md`
- `TWIN-CORE-PROTOCOL.md`
- `MULTI-AGENT-SECURITY.md`
- `COMPLIANCE-MAPPING.md`

### Option 2: Try Sentinul Online

Go to:

```text
https://sentinul.app
```

Then:

```text
Sign up → Create organization → Connect repository → Run your first scan
```

### Option 3: Use the MCP Integration

```bash
npm install -g @sentinul/mcp-server
```

Claude Desktop example:

```json
{
  "mcpServers": {
    "sentinul": {
      "command": "sentinul-mcp",
      "args": ["--api-key", "YOUR_API_KEY"]
    }
  }
}
```

### Option 4: Use the API Directly

Most examples in this README use:

```text
http://localhost:5000
```

Hosted environments can use your deployed Sentinul base URL instead.

---

## Installation Options

### Prerequisites

- Node.js 16+ or Python 3.9+
- Git
- Docker optional

### Option 1: Reference-Only

Use this repository as documentation and integration guidance only.

```bash
git clone https://github.com/abalous2894/Sentinul-Governance-Protocol.git
cd Sentinul-Governance-Protocol
```

### Option 2: Full Platform via Sentinul

Use the hosted platform for scans, reporting, governance workflows, and Genesis features.

```text
1. Create an account at sentinul.app
2. Create an organization
3. Generate an API key
4. Connect a repository
5. Start scanning and governance workflows
```

### Option 3: Docker

```bash
docker build -t sentinul:5.0.0 .
docker run -d --name sentinul -p 5000:5000 sentinul:5.0.0
```

### Option 4: Local Development

```bash
git clone https://github.com/abalous2894/sentinul-v3-lab.git
cd sentinul-v3-lab/private-backend
npm install
cp .env.example .env
npm start
```

---

## What's New in Genesis

Genesis adds four launch pillars on top of the V5 security foundation.

### 1. Neural Mirror

Pre-execution simulation and behavioral prediction for proposed agent actions.

**What it does:**

- Simulates proposed execution before action runs
- Produces risk score and risk level
- Detects obfuscation patterns
- Flags actions that should require approval

### 2. Intent Binder

Human approval workflow for high-impact actions.

**What it does:**

- Registers biometric credentials
- Freezes risky actions into pending state
- Generates approval challenges
- Thaws actions only after valid biometric approval

### 3. Swarm Immunity

Shared threat intelligence across instances.

**What it does:**

- Registers threat fingerprints
- Synchronizes swarm threat feeds
- Blocks skills that match known threat patterns
- Exposes swarm health and resilience data

### 4. Recursive Auditor

Self-auditing governance loop.

**What it does:**

- Detects drift from governance boundaries
- Proposes policy hardening
- Tracks governance health over time
- Supports self-healing governance workflows

### Genesis Health Snapshot

```bash
curl http://localhost:5000/api/health
```

Example response:

```json
{
  "status": "healthy",
  "edition": "Genesis Sovereignty",
  "pillars": {
    "neural_mirror": "active",
    "intent_binder": "active",
    "swarm_immunity": "active",
    "recursive_auditor": "active"
  },
  "metrics": {
    "health_score": 95,
    "swarm_latency_ms": "<150",
    "vectors_defended": "4/4",
    "red_team_verdict": "IRONCLAD"
  }
}
```

---

## How to Use the Previous V5 Features

The Genesis launch does not replace the previous V5 workflows. Those still remain part of day-to-day Sentinul usage.

### Phase 1: Protocol Guard

Use Protocol Guard to scan code and payloads for security issues.

```bash
curl -X POST http://localhost:5000/api/v1/scan \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SELECT * FROM users WHERE id = $user_id",
    "language": "python",
    "context": "agent_skill"
  }'
```

Example result:

```json
{
  "risk_score": 75,
  "violations": [
    {
      "type": "SQL_INJECTION",
      "severity": "HIGH",
      "cwe": "CWE-89",
      "fix": "Use parameterized query"
    }
  ]
}
```

### Phase 2: Evidence Vault

Use Evidence Vault to maintain an immutable audit trail for actions and scan events.

Typical V5 behavior includes:

- SHA-256 linked audit records
- Append-only evidence storage
- Tamper detection
- Auditor-friendly export paths

### Phase 3: Honeypot Mesh

Use Honeypot Mesh to detect behavioral abuse and suspicious agent actions.

Typical use cases:

- Detect prompt-injection attempts
- Flag admin override behavior
- Escalate suspicious actions to operators
- Log compromise indicators in the audit trail

### Phase 4: Universal Governance

Use Universal Governance to manage policies across agent fleets.

Typical use cases:

- Centralized policy enforcement
- Policy hot reload
- Fleet-wide visibility
- Identity-based agent governance
- Emergency response controls

### Fleet Management Example

```python
from sentinul import FleetMonitor, PolicyEngine

fleet = FleetMonitor()
policy = PolicyEngine.load_policy("sentinul_policy.yaml")

fleet.register_agent("agent-alpha", skill_id="fp-alpha")
fleet.register_agent("agent-beta", skill_id="fp-beta")
fleet.register_agent("agent-gamma", skill_id="fp-gamma")

health = fleet.get_fleet_health()
print(health.value)
```

### Policy Example

```yaml
global:
  version: "5.0.0"
  default_action: "allow"
  mfa_threshold: 75
  require_identity: true
  audit_all_calls: true

allowed_tool_patterns:
  - "^read_.*$"
  - "^query_.*$"
  - "^analyze_.*$"

blocked_tool_patterns:
  - "^delete_.*$"
  - "^admin_.*$"
  - "^system_.*$"
  - "^override_.*$"
```

### Dashboard Usage

Use the dashboard to monitor:

- Fleet health
- Policy state
- Violations and trends
- Audit chain integrity
- Governance posture over time

---

## How to Use the Genesis Launch Features

This section covers the live Genesis routes and the recommended workflow for each launch pillar.

### Neural Mirror

Use Neural Mirror before execution when you want to simulate risk and predict behavior.

#### Simulate an action

```bash
curl -X POST http://localhost:5000/api/v1/genesis/simulate \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "agent-claude-001",
    "agentCode": "const query = `SELECT * FROM users WHERE id = ${userInput}`;",
    "permissions": ["db:read"],
    "forbidden_permissions": ["db:admin"]
  }'
```

What to look for in the response:

- `risk_score`
- `risk_level`
- `predictions`
- `obfuscation_detected`
- `should_require_approval`
- `safe`

Use this route when:

- evaluating a risky agent capability
- testing code before enabling it in production
- checking if a workflow should be routed into human approval

#### View simulation stats

```bash
curl http://localhost:5000/api/v1/genesis/simulate-stats
```

#### Clear simulation cache

```bash
curl -X POST http://localhost:5000/api/v1/genesis/clear-cache
```

#### Generate an executive report

```bash
curl -X POST http://localhost:5000/api/v1/genesis/executive-report \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "agent-claude-001",
    "action": {
      "type": "query_database",
      "resource": "logs:api",
      "operation": "read",
      "reason": "Compliance audit"
    },
    "num_simulations": 1000
  }'
```

Use this when you need a board-ready or leadership-ready summary of simulation outcomes.

---

### Intent Binder

Use Intent Binder when a high-impact action must be approved by a human.

#### Step 1: Register a biometric credential

```bash
curl -X POST http://localhost:5000/api/v1/genesis/register-biometric \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "exec-jane-smith",
    "credential_id": "cred_fido2_base64",
    "public_key": "cose_encoded_public_key",
    "biometric_type": "fido2_platform",
    "device_name": "iPhone 15 Pro",
    "device_attestation": "apple-platform-authenticator"
  }'
```

#### Step 2: Bind a risky action

```bash
curl -X POST http://localhost:5000/api/v1/genesis/bind-intent \
  -H "Content-Type: application/json" \
  -d '{
    "task_id": "task_123",
    "agent_id": "agent-claude-001",
    "action_type": "transfer",
    "resource": "treasury_account",
    "neural_mirror_safety_rate": 97.3,
    "proposal_amount": 5000000
  }'
```

Important response fields:

- `token_state`
- `risk_level`
- `risk_score`
- `requires_biometric`
- `challenge`
- `timeout_seconds`

If the task is risky enough, the action enters a pending state and waits for human approval.

#### Step 3: Fetch the challenge

```bash
curl http://localhost:5000/api/v1/genesis/challenge/task_123
```

#### Step 4: Submit biometric approval

```bash
curl -X POST http://localhost:5000/api/v1/genesis/thaw \
  -H "Content-Type: application/json" \
  -d '{
    "task_id": "task_123",
    "credential_id": "cred_fido2_base64",
    "signature_data": {
      "authenticatorData": "base64...",
      "clientDataJSON": "base64...",
      "signature": "base64...",
      "userPresence": true,
      "userVerified": true,
      "signCount": 5
    }
  }'
```

#### Step 5: Check task status

```bash
curl http://localhost:5000/api/v1/genesis/task-status/task_123
```

#### Intent statistics

```bash
curl http://localhost:5000/api/v1/genesis/intent-stats
```

Use Intent Binder when:

- an agent is about to touch money, credentials, or regulated data
- a simulation indicates high impact
- you need human-in-the-loop approval without abandoning automation

---

### Swarm Immunity

Use Swarm Immunity to share threat intelligence and block patterns across instances.

#### Check swarm health

```bash
curl http://localhost:5000/api/v1/genesis/swarm-health
```

Use this for:

- instance health verification
- resilience monitoring
- operational dashboards

#### Sync a threat feed

```bash
curl -X POST http://localhost:5000/api/v1/genesis/swarm-sync \
  -H "Content-Type: application/json" \
  -d '{
    "global_threat_feed": [
      {
        "fingerprint_id": "fp_threat_001_123456",
        "threat_category": "exfiltration_pattern",
        "behavioral_hash": "abc123def456",
        "severity": "CRITICAL",
        "created_at": "2026-03-17T14:05:00Z",
        "expires_at": "2026-03-18T14:05:00Z",
        "is_active": true
      }
    ]
  }'
```

#### Register a threat fingerprint

```bash
curl -X POST http://localhost:5000/api/v1/genesis/swarm-threat-register \
  -H "Content-Type: application/json" \
  -d '{
    "threatId": "THREAT-ECLIPSE-12345",
    "pattern": "rapid_authorization_bypass",
    "behavioral_hash": "abc123def456",
    "severity": "CRITICAL"
  }'
```

#### Check whether a skill should be blocked

```bash
curl -X POST http://localhost:5000/api/v1/genesis/swarm-threat-check \
  -H "Content-Type: application/json" \
  -d '{
    "skillName": "AuthBypass",
    "threatFingerprints": ["abc123def456", "def456ghi789"]
  }'
```

If the skill matches known threat patterns, Sentinul returns a block response and signals revocation behavior.

Use Swarm Immunity when:

- a threat found on one instance must protect the rest of the fleet
- you want distributed threat awareness
- you need cross-instance safety checks before enabling a skill

---

### Recursive Auditor

Use Recursive Auditor to perform governance self-audits and monitor governance maturity.

#### Run a self-audit

```bash
curl -X POST http://localhost:5000/api/v1/genesis/self-audit \
  -H "Content-Type: application/json" \
  -d '{
    "gavel_logs": [],
    "threat_fingerprints": [],
    "trusted_skills": {
      "pandas": "1.3.5",
      "numpy": "1.21.0"
    }
  }'
```

This is the route to use when you want Sentinul to:

- detect drift and boundary testing
- propose policy hardening
- inspect trust posture for skills
- produce governance recommendations

#### Check governance health

```bash
curl http://localhost:5000/api/v1/genesis/governance-health
```

Watch these fields closely:

- `status`
- `last_audit`
- `audit_count`
- `autonomy_level`
- `drift_detection`
- `policy_hardening`
- `skill_revocation`
- `governance_score`

Use Governance Health for:

- dashboards
- operational reviews
- board reporting
- measuring self-healing maturity over time

---

## BYOK Integration

Genesis includes customer-managed key support through the BYOK Vault Bridge.

> Current status: local provider is operational. Cloud KMS providers are enterprise preview.

### What BYOK is for

Use BYOK when:

- your organization requires key sovereignty
- compliance requires customer-managed encryption
- sensitive actions need cryptographic sealing under your control

### Configure local BYOK

`.sentinulrc`

```json
{
  "vault": {
    "provider": "local",
    "key_id": "env.SENTINUL_BYOK_ID",
    "mode": "sovereign",
    "algorithm": "HMAC-SHA256"
  }
}
```

Set the key:

```bash
export SENTINUL_BYOK_ID=$(openssl rand -hex 32)
```

### AWS KMS preview

```json
{
  "vault": {
    "provider": "aws-kms",
    "key_id": "env.AWS_KMS_KEY_ARN",
    "region": "us-east-1",
    "mode": "sovereign"
  }
}
```

### Azure Key Vault preview

```json
{
  "vault": {
    "provider": "azure-keyvault",
    "key_id": "env.AZURE_KEY_VAULT_URL",
    "mode": "sovereign"
  }
}
```

### Check BYOK status

BYOK status appears in the standard health response:

```bash
curl http://localhost:5000/api/health
```

Look for:

```json
{
  "pillars": {
    "byok_vault": {
      "provider": "local",
      "initialized": true,
      "mode": "sovereign"
    }
  }
}
```

---

## Compliance Mappings

| Standard | Coverage Focus | Relevant Sentinul Features |
|----------|----------------|----------------------------|
| **SOC2 Type II** | Auditability and control evidence | Evidence Vault, Universal Governance, BYOK |
| **HIPAA** | Access control and protected data handling | Protocol Guard, Intent Binder, BYOK |
| **GDPR** | Data protection and governance controls | Protocol Guard, Evidence Vault, Recursive Auditor |
| **ISO 27001** | Governance and control operations | Universal Governance, Swarm Immunity, Recursive Auditor |
| **PCI-DSS** | Sensitive data and access control | Protocol Guard, Intent Binder, Evidence Vault |

---

## Documentation

Start with these docs in the repository:

- `GETTING-STARTED.md`
- `TWIN-CORE-PROTOCOL.md`
- `MULTI-AGENT-SECURITY.md`
- `COMPLIANCE-MAPPING.md`

Recommended reading order:

1. `GETTING-STARTED.md`
2. `TWIN-CORE-PROTOCOL.md`
3. `MULTI-AGENT-SECURITY.md`
4. `COMPLIANCE-MAPPING.md`
5. This README’s Genesis usage section

---

## FAQ

**Q: Does this README include Aegis or Genesis 1.1?**  
No. This README is intentionally limited to the V5 foundation and the Genesis launch released today.

**Q: Can I still use the older V5 features?**  
Yes. Protocol Guard, Evidence Vault, Honeypot Mesh, and Universal Governance remain part of the platform and are still documented here.

**Q: Are the Genesis features replacements for V5?**  
No. Genesis extends the V5 foundation. The original phases still matter operationally.

**Q: Which Genesis endpoint should I start with?**  
Start with `/api/health`, then `/api/v1/genesis/simulate`, then add Intent Binder or Swarm Immunity based on your workflow.

**Q: Is BYOK required?**  
No. It is optional, but recommended for customers who require key sovereignty.

**Q: Is the full scanning engine open source?**  
No. The governance protocol and documentation are public, but the full runtime platform is proprietary.

---

## Support

- **GitHub Issues:** Documentation, protocol questions, feature requests
- **Platform Access:** [sentinul.app](https://sentinul.app)
- **Support:** `contact@sentinul.app`
- **Security Reports:** `contact@sentinul.app` with `[SECURITY]` in the subject line

---

## Security

- Cryptographic audit-trail design
- Governance-first architecture
- Customer-managed key support for sovereignty-oriented deployments
- Responsible disclosure supported through the security contact above

---

## License

- Documentation and specifications: see repository license
- Code samples and examples: see repository license
- Platform runtime: proprietary

---

**Built with 🛡️ for enterprise security teams operating autonomous systems at scale.**

**Sentinul Team | 🌴 Made in Los Angeles, California | March 2026**
