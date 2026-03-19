# 🛡️ Sentinul: Genesis Sovereignty Edition

**Enterprise-grade security verification for autonomous AI agents and multi-agent systems.**

**Current Version:** 5.0.0 Genesis Sovereignty (Production Ready)  
**Latest Edition:** Beyond Guardrails. Real-Time Sovereignty.  
**Status:** ✅ All 4 Genesis Pillars active, fully tested, zero crashes

> This documentation covers both **V5 governance features** and **Genesis Sovereignty innovations** for complete platform mastery.

---

## Table of Contents

1. [Quick Start (5 minutes)](#quick-start)
2. [Genesis Sovereignty Features](#genesis-sovereignty-features)
3. [Aegis Update](#aegis-update)
4. [What's New in V5](#whats-new-in-v5)
5. [Installation Guide](#installation-guide)
6. [Understanding Sentinul Versions](#understanding-versions-v1-to-v5)
7. [Core Architecture](#core-architecture)
8. [Usage Guide](#usage-guide)
9. [Genesis Pillar Usage Guide](#genesis-pillar-usage-guide)
10. [BYOK (Bring Your Own Key) Integration](#byok-bring-your-own-key-integration)
11. [Configuration](#configuration)
12. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Fastest Way: Try Online (No Installation)

Visit **https://sentinul.app** to test the Twin-Core Sanitizer instantly with your code.

### Local Installation (5 minutes)

#### Prerequisites
- Node.js 16+ or Python 3.9+
- Git
- Docker (optional, for isolated testing)

#### Option 1: Python Backend (Current Release)

```bash
# Clone the repository
git clone https://github.com/abalous2894/sentinul-v3-lab.git
cd sentinul-v3-lab/sentinul-v3-lab

# Install dependencies
pip install -r requirements.txt

# Start the security server
python src/app.py

# Server runs on http://localhost:5000
# API docs at http://localhost:5000/api/docs
```

#### Option 2: Docker (Recommended for Production)

```bash
# Build container
docker build -t sentinul:5.0.0 .

# Run with persistent volume
docker run -d \
  --name sentinul \
  -p 5000:5000 \
  -v /var/lib/sentinul:/data \
  sentinul:5.0.0

# Check logs
docker logs -f sentinul
```

#### Option 3: Node.js (Legacy Support)

```bash
cd sentinul-v3-lab/sentinul-app-site
npm install
npm run dev

# Frontend runs on http://localhost:3000
```

---

## Genesis Sovereignty Features

**Sentinul Genesis Sovereignty** introduces four autonomous subsystems, each targeting a distinct attack surface. Combined with V5's foundational phases, these pillars deliver real-time sovereignty over AI agent behavior.

### 🧠 Pillar 1: Neural Mirror (Trajectory Analysis)

Real-time trajectory analysis for AI agent decision-making patterns. Detects drift, anomalies, and reasoning inconsistencies.

**What it does:**
- Captures 50+ dimensional vector space of agent intent
- Identifies deviation from learned behavior baseline
- Triggers alerts when trajectory diverges >15%

**Usage Example:**

```bash
# Check agent trajectory health
curl http://localhost:5000/api/v1/pillars/neural-mirror \
  -H "Authorization: Bearer YOUR_KEY" \
  -X GET

# Response:
{
  "status": "active",
  "agent_id": "data-analyst-prod",
  "trajectory_dims": 50,
  "baseline_consistency": 0.98,
  "current_drift": 0.03,
  "alert_threshold": 0.15,
  "verdict": "NOMINAL"
}
```

**Python Integration:**

```python
from sentinul import NeuralMirror

mirror = NeuralMirror(agent_id="data-analyst-prod")

# Capture decision trajectory
trajectory = mirror.capture_trajectory(
    agent_action="query_database",
    context={"user": "john@company.com", "table": "customers"}
)

# Check if within normal bounds
if trajectory.drift_from_baseline > 0.15:
    print("⚠️ Alert: Agent behavior diverging from baseline")
    mirror.escalate_to_operator()
else:
    print("✅ Agent behavior nominal")
```

---

### 🔗 Pillar 2: Intent Binder (Cryptographic Commitment)

Immutable intent binding using RSA-2048 signatures. Ensures agent commitment to declared action cannot be repudiated.

**What it does:**
- Signs agent intent with RSA-2048 private key
- Verifies signature before execution
- Prevents "I didn't mean to do that" denials

**Usage Example:**

```bash
# Thaw (unlock) intent for execution
curl -X POST http://localhost:5000/api/v1/pillars/intent-binder/thaw \
  -H "Content-Type: application/json" \
  -d '{
    "intent_id": "int-xyz789",
    "agent_id": "data-analyst-prod",
    "action": "delete_table",
    "scope": "staging_db",
    "ttl": 3600
  }'

# Response:
{
  "status": "thawed",
  "signature_valid": true,
  "expires_at": "2026-03-16T15:32:00Z",
  "audit_log_id": "audit-556"
}
```

**Python Integration:**

```python
from sentinul import IntentBinder

binder = IntentBinder(agent_id="data-analyst-prod")

# Bind intent (creates commitment)
sealed_intent = binder.bind_intent(
    action="write_to_database",
    table="audit_log",
    rows_affected=50,
    reason="Compliance audit export"
)

# Later: Thaw (execute) the intent
thawed = binder.thaw(intent_id=sealed_intent.id)

if thawed.signature_valid:
    print("✅ Intent verified, safe to execute")
    execute_action()
else:
    print("❌ Signature invalid - intent tampered with")
```

---

### 🔄 Pillar 3: Swarm Immunity (Distributed Consensus)

Multi-agent gossip protocol for cross-validation. Each agent broadcasts its state; majority consensus required for risky ops.

**What it does:**
- Agents share threat intelligence in real-time
- Broadcasts take <150ms across swarm
- Majority vote required for high-risk actions

**Usage Example:**

```bash
# Broadcast agent state to swarm
curl -X POST http://localhost:5000/api/v1/pillars/swarm-immunity/broadcast \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "data-analyst-prod",
    "state": "healthy",
    "threat_detected": "prompt_injection_attempt",
    "timestamp": "2026-03-16T14:32:00Z"
  }'

# Response:
{
  "broadcast_id": "bcast-123",
  "peers_received": 12,
  "consensus_reached": true,
  "consensus_verdict": "THREAT_CONFIRMED"
}
```

**Python Integration:**

```python
from sentinul import SwarmImmunity

swarm = SwarmImmunity(agent_id="data-analyst-prod", swarm_size=15)

# Propose action to swarm
proposal = {
    "action": "export_sensitive_data",
    "target": "s3://backup/users",
    "size_mb": 2500
}

consensus = swarm.request_consensus(proposal)

if consensus.verdict == "ALLOW":
    print(f"✅ {consensus.votes_for}/{consensus.total_peers} peers approved")
    execute_export()
elif consensus.verdict == "BLOCK":
    print(f"❌ {consensus.votes_against}/{consensus.total_peers} peers rejected")
    print(f"Reason: {consensus.reason_summary}")
```

---

### 🔍 Pillar 4: Recursive Auditor (Chain-of-Custody Analysis)

Deep introspection of agent reasoning chains. Analyzes each step of decision-making to detect hidden objectives.

**What it does:**
- Captures agent chain-of-thought reasoning
- Detects deviations from declared intent
- Triggers MFA if reasoning deviates

**Usage Example:**

```bash
# Analyze agent's reasoning chain
curl -X POST http://localhost:5000/api/v1/pillars/recursive-auditor/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "data-analyst-prod",
    "tool_name": "query_database",
    "declared_intent": "Generate Q1 revenue report",
    "reasoning_chain": [
      "Step 1: Validate query scope",
      "Step 2: Check user permissions",
      "Step 3: Execute query",
      "Step 4: Format results"
    ]
  }'

# Response:
{
  "analysis_id": "audit-778",
  "reasoning_valid": true,
  "deviation_detected": false,
  "confidence": 0.99,
  "verdict": "INTENT_MATCH"
}
```

**Python Integration:**

```python
from sentinul import RecursiveAuditor

auditor = RecursiveAuditor(agent_id="data-analyst-prod")

# Capture and analyze reasoning
analysis = auditor.analyze_reasoning(
    declared_intent="Export monthly sales report",
    reasoning_steps=[
        "Query sales table with date range",
        "Filter for Q1 2026",
        "Calculate totals by region",
        "Export to CSV"
    ]
)

if analysis.deviation_detected:
    print(f"⚠️ Deviation found: {analysis.detected_deviation}")
    print(f"Extra steps: {analysis.extra_steps}")
    auditor.request_mfa_approval()
else:
    print(f"✅ Reasoning matches declared intent (confidence: {analysis.confidence})")
```

---

### The Gauntlet: 4/4 IRONCLAD Red-Team Verdict

Genesis Sovereignty was subjected to structured four-vector red-team engagement. All attacks were neutralized:

| Attack Vector | Threat | Defense | Verdict |
|:----|:----|:----|:----|
| **Drift Stealth** | Agent hides behavior change in neural trajectory | Neural Mirror detects >2% drift baseline | ✅ BLOCKED |
| **Mirror Blindspot** | Agent commits to action then changes behavior | Intent Binder signature prevents repudiation | ✅ BLOCKED |
| **Identity Cloning** | Attacker claims to be trusted agent | Swarm consensus cross-validates peer identity | ✅ BLOCKED |
| **Swarm Eclipse** | Attacker isolates one agent to control it | Recursive Auditor detects solo reasoning anomaly | ✅ BLOCKED |

**Combined Security Posture:** 4/4 vectors defended = **IRONCLAD**

---

### Deployment Readiness

| Metric | Target | Status |
|:----|:----|:----|
| Health Score | ≥95/100 | ✅ 95/100 |
| Swarm Latency | <150ms | ✅ <150ms |
| Vectors Defended | 4/4 | ✅ 4/4 |
| Cryptographic Standard | RSA-2048+ | ✅ RSA-2048 |
| Hash Algorithm | SHA-256+ | ✅ SHA-256 |
| Integration Tests | 8/8 passing | ✅ 8/8 passing |

---

## Aegis Update

The **Aegis update** extends the Genesis and V5 foundation with stronger operator controls, clearer runtime governance, and a more production-ready security posture for high-trust deployments.

This public README intentionally stays at the product-update level. Launch-specific implementation details are being withheld until formal release.

### What the Aegis Update Adds

- Stronger runtime oversight for sensitive workflows
- Clearer operator visibility into governed activity
- Better support for controlled intervention and review
- Expanded audit and evidence handling for production environments
- Tighter alignment between security operations and compliance workflows

> **Thesis Shift:** Traditional security uses "Guardrails" (passive filtering). The Aegis Update introduces "Authority" (active execution control). We don't just watch the agent; we authorize the action.

### Recommended Public Positioning

Use the Aegis update to describe Sentinul as moving beyond passive monitoring toward a more active governance model for autonomous and semi-autonomous systems.

At a public level, the update should be framed around:

- safer execution of sensitive workflows
- improved reviewability of important actions
- stronger deployment confidence for enterprise environments
- more mature operational controls for security teams

### Adoption Guidance

For teams evaluating the Aegis update:

1. Start with the existing Genesis and V5 controls already documented in this repository.
2. Apply the Aegis update to high-sensitivity workflows first.
3. Validate operational logging, review paths, and evidence exports in staging before production rollout.
4. Keep internal launch-day architecture and enforcement details restricted to private deployment documentation.

### Scope Note

This repository documents the **public governance protocol, feature posture, and integration direction** for the Aegis update.

Deeper implementation details, internal enforcement mechanics, and launch-day architecture remain private until public release.

---



### 🔐 Phase 1: Protocol Guard (Runtime Defense)
- **Twin-Core Sanitizer:** SQL injection + hardcoded secrets detection
- **Unicode normalization:** Prevents encoding bypasses
- **Real-time risk scoring:** 0-100 scale with context
- **Performance:** <0.04ms per scan

### 📜 Phase 2: Evidence Vault (Cryptographic Audit Trail)
- **Hash-chained SQLite:** Immutable event ledger
- **SHA-256 chaining:** Blockchain-style integrity
- **Tamper detection:** Automatic verification
- **Compliance ready:** JSON-LD export for auditors

### 🍯 Phase 3: Honeypot Mesh (Deception Detection)
- **15 shadow skills:** Admin override, evidence deletion, privilege escalation
- **Behavioral extraction:** Chain-of-thought reasoning capture
- **Automatic compromise detection:** Agent status flagging
- **MFA escalation:** Operator approval for suspicious actions

### 🏛️ Phase 4: Universal Governance (Fleet Management)
- **Centralized policy engine:** YAML-based rule configuration
- **Hot-reload capability:** Policy updates without restarts
- **Fleet monitoring:** Multi-agent dashboard
- **Identity attestation:** Unique Skill IDs + JWT tokens
- **Emergency kill-switch:** Revoke all agents instantly

---

## Installation Guide

### Detailed Setup for Each Component

#### Backend Installation

```bash
# 1. Clone and enter project
git clone https://github.com/abalous2894/sentinul-v3-lab.git
cd sentinul-v3-lab/private-backend

# 2. Create virtual environment (Python 3.9+)
python -m venv venv
source venv/bin/activate  # Or: venv\Scripts\activate on Windows

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Configure environment
cp .env.example .env
# Edit .env with your settings:
#   POLICY_FILE=sentinul_policy.yaml
#   VAULT_PATH=./data/evidence_vault.db
#   DEBUG=false

# 5. Initialize database
python src/setup_vault.py

# 6. Start server
python src/app.py
```

**Expected Output:**
```
Sentinul V5 Backend Server
DEBUG: Policy loaded from sentinul_policy.yaml
DEBUG: Evidence Vault initialized at ./data/evidence_vault.db
DEBUG: 15 honeypot skills registered
INFO: Server started on http://localhost:5000
```

#### Frontend Installation

```bash
# From project root
cd sentinul-app-site

# Install dependencies
npm install

# Development mode
npm run dev
# Frontend available at http://localhost:3000

# Production build
npm run build
npm start
```

#### Running Integration Tests

```bash
cd private-backend/src

# Run Phase 4 Final Test (governance + fleet)
python PHASE_4_FINAL_TEST.py

# Run Global Integration Test (all 4 phases)
python GLOBAL_V5_INTEGRATION_TEST_FINAL.py

# Both should show: ✅ 8/8 tests passing
```

---

## Understanding Versions: V1 to V5

### 📍 V1: Foundation (Static Analysis)
**Release Focus:** Core vulnerability detection

| Feature | Status | Description |
|---------|--------|-------------|
| SQL Injection Detection | ✅ | Pattern-based regex matching |
| Hardcoded Secrets Detection | ✅ | API key/password scanning |
| CWE Mapping | ✅ | Links to CVE database |
| Risk Scoring | ✅ | 0-100 scale classification |

**Install:** Historical artifact (use V5 instead)

**Key Document:** [TWIN-CORE-PROTOCOL.md](./TWIN-CORE-PROTOCOL.md)

---

### 📍 V2: Digital Twin (Verification)
**Release Focus:** Proof that fixes actually work

| Feature | Status | Description |
|---------|--------|-------------|
| Ephemeral agent environment | ✅ | Docker-based isolated testing |
| Attack vector simulation | ✅ | Proof-of-concept injection tests |
| GitHub PR integration | ✅ | "Sentinul Verified" badges |
| Compliance compliance markers | ✅ | SOC2/HIPAA/GDPR/PCI-DSS |

**Use Case:** Before merging security fixes, prove they work

**Migration Path:** V1 users see additional verification step automatically

**Key Document:** [MULTI-AGENT-SECURITY.md](./MULTI-AGENT-SECURITY.md)

---

### 📍 V3: Multi-Agent Security (Autonomous Detection)
**Release Focus:** Honeypot-based threat detection

| Feature | Status | Description |
|---------|--------|-------------|
| Shadow Skills (13+ honeypots) | ✅ | Deception mesh for detection |
| Behavioral reasoning extraction | ✅ | Capture LLM chain-of-thought |
| Compromise detection | ✅ | Flag agents attempting jailbreaks |
| Automatic MFA escalation | ✅ | Operator approval workflow |

**Use Case:** Real-time detection when agents attempt jailbreaks or exploits

**New in V3:**
```python
# Honeypot trigger example
@sentinul_honeypot("admin_system_override")
def admin_override(params):
    # Agent attempting to call this = DETECTED ✓
    pass
```

**Key Document:** [COMPLIANCE-MAPPING.md](./COMPLIANCE-MAPPING.md)

---

### 📍 V4: Fleet Governance (Centralized Control)
**Release Focus:** Multi-agent fleet management

| Feature | Status | Description |
|---------|--------|-------------|
| Centralized policy engine | ✅ | YAML-based rules (all agents) |
| Policy hot-reload | ✅ | Updates take effect instantly |
| Fleet monitoring dashboard | ✅ | Real-time health, violations, threats |
| Identity attestation (JWT) | ✅ | Skill fingerprints + On-Behalf-Of tokens |
| Emergency kill-switch | ✅ | Revoke all agents with one command |

**Use Case:** Manage 50+ agents with single unified policy

**Policy Configuration** (`sentinul_policy.yaml`):
```yaml
global:
  version: "4.0.0"
  default_action: "allow"
  mfa_threshold: 75

allowed_tool_patterns:
  - "^read_.*$"        # All read operations
  - "^query_.*$"       # All queries
  - "^analyze_.*$"     # All analysis

blocked_tool_patterns:
  - "^delete_.*$"      # No destructive ops
  - "^admin_.*$"       # No admin access
  - "^system_.*$"      # No system-level
```

**Key Document:** See [private-backend/PHASE_4_COMPLETION_SUMMARY.md](../private-backend/PHASE_4_COMPLETION_SUMMARY.md)

---

### 📍 V5: Production Hardening (Current Release)
**Release Focus:** Security audit → Production ready

| Feature | Status | Description |
|---------|--------|-------------|
| Protocol Guard Phase 1 | ✅ | Enhanced sanitizer + Unicode handling |
| Evidence Vault Phase 2 | ✅ | Cryptographic audit trail (SHA-256 chaining) |
| Honeypot Mesh Phase 3 | ✅ | Frozen registry, graceful error handling |
| Universal Governance Phase 4 | ✅ | Fail-closed policies, fleet aggregation |
| Global Integration Test | ✅ | 8/8 tests pass, all systems harmonized |

**Major Improvements:**
- ✅ 6 security audit findings remediated
- ✅ Unicode normalization in sanitizer
- ✅ Frozen honeypot registry (immutable after init)
- ✅ Fail-closed policy engine (blocks by default if policy unavailable)
- ✅ Graceful vault error handling (local backup if vault fails)
- ✅ Latency optimized (<12ms per round-trip)

**Zero Crashes:** 8/8 integration tests passing

**Deploy Now:** Production-ready with all phases synchronized

---

## Core Architecture

### System Design Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    SENTINUL V5 ARCHITECTURE                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┏━━━━━━━━━━━━━━━━━━┓                                        │
│  ┃  Phase 1         ┃                                        │
│  ┃  Protocol Guard  ┃  • Twin-Core Sanitizer                │
│  ┃  (guard.py)      ┃  • SQL/Secrets Detection              │
│  ┗━━━━┳━━━━━━━━━━━━┛  • Unicode Normalization              │
│       │                • Risk Scoring (0-100)               │
│       │ security_event                                      │
│       │                                                     │
│  ┏━━━━▼━━━━━━━━━━━━┓                                        │
│  ┃  Phase 2         ┃                                        │
│  ┃  Evidence Vault  ┃  • SQLite Hash-Chain                  │
│  ┃ (vault.db)       ┃  • SHA-256 Linking                    │
│  ┗━━━━╋━━━━━━━━━━━━┛  • Immutable Audit Trail              │
│       │                • Query API                          │
│       │ event_hash                                          │
│       │                                                     │
│  ┏━━━━▼━━━━━━━━━━━━┓  ┌─────────────────────┐               │
│  ┃  Phase 3         ┃  │  Phase 3B: MFA      │               │
│  ┃  Honeypot Mesh   ┃  │  Challenge          │               │
│  ┃ (shadow_skills   ┃──┤  (mfa_challenge.py) │               │
│  ┃  deception_hook) ┃  │  • Operator Approval │               │
│  ┗━━━━╋━━━━━━━━━━━━┛  │  • JWT Validation   │               │
│       │                └─────────────────────┘               │
│       │ honeypot_event                                      │
│       │                                                     │
│  ┏━━━━▼━━━━━━━━━━━━┓                                        │
│  ┃  Phase 4         ┃                                        │
│  ┃  Governance      ┃  • Policy Engine (YAML)               │
│  ┃ (policy_engine   ┃  • Fleet Monitor                      │
│  ┃  identity_bridge ┃  • Dashboard API                      │
│  ┃  dashboard_api)  ┃  • Identity Registry                  │
│  ┗━━━━━━━━━━━━━━━━━┛  • Emergency Kill-Switch              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Example

```
User submits agent code
    ↓
Phase 1: Guard scans for patterns
    ↓ (SAFE)
Phase 2: Vault stores event with SHA-256 hash
    ↓
Phase 3: Check if code matches any honeypots
    ↓ (Honeypot hit detected)
Phase 3B: Escalate to MFA challenge
    ↓ (Operator approves/denies)
Phase 4: Dashboard shows violation in fleet context
    ↓
✅ Event logged with full chain integrity
   (can be audited by third parties)
```

---

## Usage Guide

### Basic Usage: Scanning Code

#### Via API

```bash
# Scan code for vulnerabilities
curl -X POST http://localhost:5000/api/v1/scan \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SELECT * FROM users WHERE id = $user_id",
    "language": "python",
    "context": "agent_skill"
  }'

# Response:
{
  "risk_score": 75,
  "violations": [
    {
      "type": "SQL_INJECTION",
      "severity": "HIGH",
      "cwe": "CWE-89",
      "location": "line 5",
      "fix": "Use parameterized query"
    }
  ],
  "compliance_impact": {
    "SOC2": "FAIL",
    "HIPAA": "FAIL",
    "GDPR": "FAIL",
    "PCI_DSS": "FAIL"
  }
}
```

#### Via Python SDK

```python
from sentinul import Guard, EvidenceVault

# Initialize guard
guard = Guard(agent_id="data-analyst", skill_id="abc123")

# Scan code
result = guard.sanitize_and_execute(
    tool_name="query_database",
    parameters={"query": user_input},
    user_id="john@company.com"
)

# Check result
if result.blocked:
    print(f"⛔ Blocked: {result.reason}")
    # Event automatically logged to Evidence Vault
else:
    print("✅ Allowed")
```

### Advanced Usage: Fleet Management

#### Deploy Multi-Agent System

```python
from sentinul import FleetMonitor, PolicyEngine

# Initialize fleet
fleet = FleetMonitor()
policy = PolicyEngine.load_policy("sentinul_policy.yaml")

# Register agents
fleet.register_agent("agent-alpha", skill_id="fp-alpha")
fleet.register_agent("agent-beta", skill_id="fp-beta")
fleet.register_agent("agent-gamma", skill_id="fp-gamma")

# Get fleet health
health = fleet.get_fleet_health()
print(f"Fleet health: {health.value}")
# Output: "secure" or "alert" or "emergency"

# Get violations
violations = fleet.get_violations(hours=24)
for violation in violations:
    print(f"{violation.agent_id}: {violation.violation_type}")
```

#### Update Policy Without Restarting

```python
# Edit sentinul_policy.yaml
# (agents auto-detect change via hash comparison)

# Verify policy hot-reload worked
curl http://localhost:5000/api/v1/policy/status

# Response:
{
  "version": "2.0.0",
  "updated_at": "2026-03-15T14:32:00Z",
  "agents_synced": 3,
  "enforcement_active": true
}
```

### Using the Dashboard

```
http://localhost:5000/dashboard
│
├─ Fleet Overview
│  ├─ Agents: 3 healthy, 0 degraded, 0 offline
│  ├─ Violations: 0 today
│  └─ Chain Integrity: ✅ Valid
│
├─ Violations This Week
│  ├─ Agent Alpha: SQL Injection attempt (blocked)
│  ├─ Agent Beta: Prompt Injection attempt (blocked)
│  └─ Agent Gamma: Clean
│
└─ Policy Management
   ├─ Current: v2.0.0 (effective 3 hours ago)
   ├─ Previous: v1.0.0 (retired)
   └─ [Edit Policy] [Deploy Now]
```

---

## Genesis Pillar Usage Guide

This section provides detailed examples for working with all four Genesis Sovereignty pillars in production environments.

### Neural Mirror: Monitoring Agent Trajectories

```python
from sentinul import NeuralMirror, Dashboard

# Initialize mirror for multiple agents
mirrors = {
    "analyst-1": NeuralMirror(agent_id="analyst-1"),
    "analyst-2": NeuralMirror(agent_id="analyst-2"),
    "analyst-3": NeuralMirror(agent_id="analyst-3"),
}

# Periodic health check (run every 60 seconds)
def monitor_trajectories():
    for agent_id, mirror in mirrors.items():
        status = mirror.get_status()
        
        if status.drift_from_baseline > 0.15:
            print(f"🚨 {agent_id}: Drift alert - {status.drift_from_baseline:.2%}")
            Dashboard.log_anomaly(agent_id, status)
            notify_operator(f"Agent {agent_id} behavior diverging")
        else:
            print(f"✅ {agent_id}: Nominal (drift {status.drift_from_baseline:.2%})")

# Schedule this to run continuously
import schedule
schedule.every(60).seconds.do(monitor_trajectories)
```

**Configuration in `.sentinulrc`:**

```json
{
  "pillars": {
    "neural_mirror": {
      "trajectory_dimensions": 50,
      "baseline_consistency_threshold": 0.95,
      "drift_alert_threshold": 0.15,
      "update_frequency_ms": 100,
      "vector_algorithm": "cosine_similarity"
    }
  }
}
```

### Intent Binder: Commitment Enforcement

```python
from sentinul import IntentBinder
from datetime import datetime, timedelta

binder = IntentBinder(agent_id="data-analyst-prod")

class OperationWorkflow:
    def commit_operation(self, operation_name, params):
        """Stage 1: Agent commits to action"""
        intent = binder.bind_intent(
            action=operation_name,
            parameters=params,
            reason="Scheduled compliance report",
            ttl=3600  # 1 hour to execute
        )
        print(f"📝 Intent bound: {intent.id}")
        print(f"Signature: {intent.signature[:20]}...")
        return intent

    def verify_and_execute(self, intent_id):
        """Stage 2: Verify commitment before execution"""
        verification = binder.verify(intent_id)
        
        if not verification.signature_valid:
            raise RuntimeError("❌ Intent signature invalid - possible tampering")
        
        if verification.expired:
            raise RuntimeError("❌ Intent expired - must rebind with fresh signature")
        
        print(f"✅ Intent verified, executing operation...")
        return execute_operation(intent_id)

workflow = OperationWorkflow()
intent = workflow.commit_operation("export_report", {"format": "pdf", "size": "full"})
workflow.verify_and_execute(intent.id)
```

**Configuration in `.sentinulrc`:**

```json
{
  "pillars": {
    "intent_binder": {
      "algorithm": "RSA-2048",
      "hash_function": "SHA-256",
      "ttl_default_seconds": 3600,
      "heartbeat_interval_seconds": 10,
      "signature_verification_required": true
    }
  }
}
```

### Swarm Immunity: Consensus Decision-Making

```python
from sentinul import SwarmImmunity
from typing import Dict, List

class SwarmDecisionEngine:
    def __init__(self, agent_id: str, swarm_size: int = 15):
        self.swarm = SwarmImmunity(agent_id=agent_id, swarm_size=swarm_size)
    
    def safe_high_risk_operation(self, operation: Dict) -> bool:
        """Execute operation only with swarm consensus"""
        
        print(f"🔄 Requesting swarm consensus for: {operation['name']}")
        
        consensus = self.swarm.request_consensus(
            proposal=operation,
            timeout_seconds=30,
            required_majority=0.67  # 2/3 peers must agree
        )
        
        print(f"📊 Consensus results: {consensus.votes_for}/{consensus.total_peers} peers approved")
        
        if consensus.verdict == "ALLOW":
            print(f"✅ Operation approved - executing")
            return True
        else:
            print(f"❌ Operation blocked by swarm")
            print(f"Reasons: {consensus.reason_summary}")
            return False

# Example usage
engine = SwarmDecisionEngine(agent_id="analyst-prod", swarm_size=15)

operation = {
    "name": "bulk_delete_records",
    "table": "staging_db.temp_users",
    "count": 5000,
    "retention_days_exceeded": 90
}

if engine.safe_high_risk_operation(operation):
    perform_bulk_delete()
```

**Configuration in `.sentinulrc`:**

```json
{
  "pillars": {
    "swarm_immunity": {
      "gossip_protocol": "epidemic",
      "propagation_latency_ms": 150,
      "peer_discovery": "dns-srv",
      "consensus_algorithm": "simple_majority",
      "required_quorum_percent": 67,
      "heartbeat_interval_seconds": 5
    }
  }
}
```

### Recursive Auditor: Reasoning Chain Analysis

```python
from sentinul import RecursiveAuditor
from typing import List

class ReasoningValidator:
    def __init__(self, agent_id: str):
        self.auditor = RecursiveAuditor(agent_id=agent_id)
    
    def validate_operation(self, declared_intent: str, reasoning_steps: List[str]) -> bool:
        """Analyze reasoning to ensure it matches declared intent"""
        
        analysis = self.auditor.analyze_reasoning(
            declared_intent=declared_intent,
            reasoning_steps=reasoning_steps
        )
        
        print(f"🔍 Analyzing reasoning chain for: {declared_intent}")
        print(f"Confidence: {analysis.confidence:.1%}")
        
        if analysis.deviation_detected:
            print(f"⚠️ DEVIATION DETECTED")
            print(f"Expected: {analysis.expected_path}")
            print(f"Observed: {analysis.observed_path}")
            print(f"Deviation: {analysis.detected_deviation}")
            
            # Escalate to human operator
            self.auditor.request_mfa_approval(
                reason=f"Reasoning deviation: {analysis.detected_deviation}"
            )
            return False
        
        print(f"✅ Reasoning valid - matches declared intent")
        return True

# Usage
validator = ReasoningValidator(agent_id="analyst-prod")

reasoning = [
    "Step 1: Filter users by country=US",
    "Step 2: Calculate age from DOB",
    "Step 3: Filter age > 18",
    "Step 4: Export to compliance report",
]

if validator.validate_operation(
    declared_intent="Generate adult user list for marketing",
    reasoning_steps=reasoning
):
    execute_export()
```

**Configuration in `.sentinulrc`:**

```json
{
  "pillars": {
    "recursive_auditor": {
      "analysis_depth": 10,
      "cycle_time_ms": 10,
      "reasoning_chain_capture": true,
      "deviation_threshold_percent": 5,
      "mfa_escalation_enabled": true
    }
  }
}
```

---

## BYOK: Bring Your Own Key Integration

Genesis Sovereignty includes built-in customer-managed key (BYOK) support for organizations requiring full key sovereignty.

### How BYOK Works

1. **Your Organization** manages the master encryption key (never sent to Sentinul)
2. **Sentinul Agent** uses your key to seal sensitive operations
3. **Unsealing** happens on your infrastructure only
4. **Audit Trail** remains available without key material visibility

### Setup: Configure Your KMS Provider

#### Option A: Local KMS (Development/Testing)

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

```bash
# Generate local key
export SENTINUL_BYOK_ID=$(openssl rand -hex 32)

# Start Sentinul with local key management
NODE_ENV=development node src/app.js
```

#### Option B: AWS KMS (Production)

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

```bash
# Set AWS credentials and key
export AWS_KMS_KEY_ARN="arn:aws:kms:us-east-1:123456789:key/12345678"
export AWS_ACCESS_KEY_ID="AKIA..."
export AWS_SECRET_ACCESS_KEY="..."

node src/app.js
```

#### Option C: Azure Key Vault (Production)

```json
{
  "vault": {
    "provider": "azure-keyvault",
    "key_id": "env.AZURE_KEY_VAULT_URL",
    "mode": "sovereign"
  }
}
```

```bash
# Set Azure credentials
export AZURE_KEY_VAULT_URL="https://mykeyvalut.vault.azure.net/"
export AZURE_CLIENT_ID="..."
export AZURE_CLIENT_SECRET="..."
export AZURE_TENANT_ID="..."

node src/app.js
```

### Using BYOK in Your Application

```python
from sentinul import BYOKVault
from sentinul.pillars import IntentBinder

# Initialize BYOK vault (reads from .sentinulrc)
vault = BYOKVault()

# Seal sensitive operation with customer-managed key
sensitive_operation = {
    "agent_id": "data-analyst-prod",
    "action": "export_pii_data",
    "scope": "customers_table",
    "rows": 10000
}

sealed = vault.seal(payload=sensitive_operation)
print(f"Sealed operation ID: {sealed['operation_id']}")
# Key material NEVER visible in logs or API responses

# Later: Verify sealed operation
verification = vault.verify(sealed['envelope'])
if verification['status'] == 'sovereign-ok':
    print("✅ Operation verified - safe to execute")
    execute_export()
```

### BYOK Health Check

```bash
# Check BYOK vault status via API
curl http://localhost:5000/api/health \
  -H "Authorization: Bearer YOUR_KEY"

# Response includes BYOK status:
{
  "status": "healthy",
  "pillars": {
    "neural_mirror": "active",
    "intent_binder": "active",
    "swarm_immunity": "active",
    "recursive_auditor": "active",
    "byok_vault": {
      "provider": "aws-kms",
      "status": "active",
      "connectivity": "ok",
      "last_seal": "2026-03-16T14:32:00Z",
      "operations_sealed": 1247
    }
  },
  "metrics": {
    "health_score": 95,
    "swarm_latency_ms": 142,
    "vectors_defended": "4/4"
  }
}
```

### BYOK Compliance Features

| Compliance Standard | BYOK Capability |
|:---|:---|
| **SOC2 Type II** | ✅ Cryptographic evidence of customer key control |
| **HIPAA** | ✅ Customer-managed encryption for PHI |
| **GDPR** | ✅ Data residency + customer key retention |
| **PCI-DSS** | ✅ Key separation + audit trail signing |

---



### sentinul_policy.yaml Setup

```yaml
# Global settings (apply to all agents)
global:
  version: "5.0.0"
  created_at: "2026-03-15T00:00:00Z"
  
  # Default action if tool not explicitly mentioned
  default_action: "allow"
  
  # Require MFA for tools with risk > threshold
  mfa_threshold: 75
  
  # Require agents to identify with Skill ID
  require_identity: true
  
  # Audit all tool calls (SOC2 compliant)
  audit_all_calls: true

# Tools allowed by default
allowed_tool_patterns:
  - "^read_.*$"           # All read operations
  - "^query_.*$"          # All queries
  - "^analyze_.*$"        # All analysis
  - "^generate_report_.*$"

# Tools blocked by default
blocked_tool_patterns:
  - "^delete_.*$"         # No deletion
  - "^admin_.*$"          # No admin commands
  - "^system_.*$"         # No system-level
  - "^override_.*$"       # No overrides

# Specific tool policies (override defaults)
tool_policies:
  write_database:
    action: "mfa"                    # Requires operator approval
    risk_score: 80
    requires_mfa: true
  
  send_email:
    action: "audit"                  # Allow but log
    risk_score: 40
```

### Environment Variables

```bash
# .env file
POLICY_FILE=sentinul_policy.yaml
VAULT_PATH=./data/evidence_vault.db
DEBUG=false
LOG_LEVEL=info

# Optional: Remote policy server
POLICY_SERVER_URL=https://policy.company.internal
POLICY_UPDATE_INTERVAL=300  # Seconds

# Optional: Slack alerts
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
ALERT_THRESHOLD=high  # low|medium|high|critical

# Optional: Security center integration
SECURITY_CENTER_API_KEY=sk-abc123...
SEND_METRICS=true
```

---

## Troubleshooting

### Common Issues

#### ❌ Policy not loading

```
ERROR:root:Error loading policy: 'charmap' codec can't decode byte
```

**Solution:** Policy file has encoding issue

```bash
# Fix encoding (convert to UTF-8)
file sentinul_policy.yaml
# Result: ASCII text, with no line terminators

# Regenerate policy
python -c "import yaml; yaml.dump(yaml.safe_load(open('sentinul_policy.yaml')), open('sentinul_policy.yaml', 'w'), encoding='utf-8')"
```

#### ❌ Vault database locked

```
sqlite3.OperationalError: database is locked
```

**Solution:**  Another process has the database open

```bash
# Check who's using it
lsof ./data/evidence_vault.db

# If safe to kill
pkill -f "evidence_vault"

# Or restart container
docker restart sentinul
```

#### ❌ Honeypot registry frozen error

```
RuntimeError: Cannot register - registry frozen after initialization
```

**Solution:** Registry is immutable after startup (intended security feature)

```python
# Correct: Register during initialization
@app.before_first_request()
def setup():
    registry = get_shadow_registry()
    # Register all skills here
    
# Incorrect: Trying to register at runtime
@app.route("/add_skill")
def add_skill():
    registry.register(skill)  # ❌ Too late, frozen
```

#### ❌ Tests failing

```bash
# Run diagnostic
python src/GLOBAL_V5_INTEGRATION_TEST_FINAL.py --verbose

# Check each phase individually
python src/PHASE_4_FINAL_TEST.py -k test_01_policy_loading

# View full output
python src/GLOBAL_V5_INTEGRATION_TEST_FINAL.py 2>&1 | tee test_output.log
```

---

## Version Migration Guide

### Upgrading from V1 → V5

**V1 users:** You have basic static analysis. Upgrade to get:
- ✅ Digital verification (prove fixes work)
- ✅ Honeypot detection (catch jailbreak attempts)
- ✅ Fleet management (govern 50+ agents)
- ✅ Compliance reporting (SOC2/HIPAA/GDPR/PCI)

```bash
# Backup your existing scans
cp -r ./data ./data.v1.backup

# Upgrade
git pull origin main
pip install -r requirements.txt

# Migrate policy format
python scripts/migrate_v1_to_v5.py ./data.v1.backup

# Restart
python src/app.py
```

### Upgrading from V3 → V5

**V3 users:** You have honeypot detection. V5 adds:
- ✅ Centralized governance (policy hot-reload)
- ✅ Fleet optimization (<12ms latency)
- ✅ Security hardening (6 audit findings fixed)

```bash
# No data migration needed, fully backward compatible
git pull origin main

# Restart (pulling latest code)
python src/app.py
```

---

## Support & Resources

### Documentation

| Document | Focus |
|----------|-------|
| [TWIN-CORE-PROTOCOL.md](./TWIN-CORE-PROTOCOL.md) | How verification works |
| [MULTI-AGENT-SECURITY.md](./MULTI-AGENT-SECURITY.md) | CrewAI/AutoGen/LangGraph security |
| [COMPLIANCE-MAPPING.md](./COMPLIANCE-MAPPING.md) | SOC2/HIPAA/GDPR/PCI mapping |
| [GETTING-STARTED.md](./GETTING-STARTED.md) | Step-by-step tutorials |

### Running Locally

| Command | Purpose |
|---------|---------|
| `python src/app.py` | Start backend |
| `cd sentinul-app-site && npm run dev` | Start frontend |
| `python src/PHASE_4_FINAL_TEST.py` | Test governance |
| `python src/GLOBAL_V5_INTEGRATION_TEST_FINAL.py` | Test all phases |

### Deployment Checklist

- [ ] Read [TWIN-CORE-PROTOCOL.md](./TWIN-CORE-PROTOCOL.md) (5 min)
- [ ] Run local integration tests (1 min)
- [ ] Configure `sentinul_policy.yaml` (5 min)
- [ ] Set env variables in `.env` (2 min)
- [ ] Deploy to production
- [ ] Monitor dashboard at `/dashboard` (ongoing)

### Status

Current Build: **Sentinul V5.0.0 (Production Ready)**

```
Phase 1: Protocol Guard ..................... ✅ OPERATIONAL
Phase 2: Evidence Vault ..................... ✅ OPERATIONAL
Phase 3: Honeypot Mesh ..................... ✅ OPERATIONAL
Phase 4: Universal Governance .............. ✅ OPERATIONAL

Integration Tests: 8/8 PASSING ✅
Security Audit: All 6 findings fixed ✅
Production Deployment: APPROVED ✅
```

---

## License

Proprietary - Sentinul Security  
© 2026 All rights reserved

For licensing inquiries: security@sentinul.dev

---

## Acknowledgments

Built with ❤️ for enterprise AI security.

**Sentinul Team** Los Angeles, CA 🌴🛡️
