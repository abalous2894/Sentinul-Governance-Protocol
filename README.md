# SENTINUL: SOVEREIGN SECURITY INFRASTRUCTURE

**Enterprise-Grade Enforcement for Autonomous AI Agents and Multi-Agent Systems**

**Version:** Genesis Phase 5 (Production)  
**Edition:** Sovereign Security Infrastructure  
**Status:** All 5 Enforcement Layers Active — Fully Hardened

> Beyond Guardrails. Real-Time Sovereignty.

---

## Overview

Sentinul is a deterministic, multi-layer security enforcement platform for autonomous AI agents operating in production environments. The platform enforces a **Sovereign Workflow** — a non-negotiable operational contract where no agent action, LLM call, or MCP tool invocation can bypass the enforcement pipeline. Every operation is inspected, logged, and subject to fail-closed decisions.

This is not a monitoring system. It is an enforcement system.

---

## Table of Contents

1. [The Sovereign Architecture](#1-the-sovereign-architecture)
2. [Key Features](#2-key-features)
   - [Skill Scanner](#skill-scanner)
   - [Intent Binder](#intent-binder)
   - [Chain Detector](#chain-detector)
   - [LLM Proxy Adapter](#llm-proxy-adapter)
3. [Installation](#3-installation)
4. [Usage](#4-usage)
   - [Proxied LLM Calls](#proxied-llm-calls)
   - [Tool Registration and Skill Scanning](#tool-registration-and-skill-scanning)
   - [Live Telemetry Dashboard](#live-telemetry-dashboard)
5. [API Reference](#5-api-reference)
6. [Security Mandate](#6-security-mandate)
7. [Configuration](#7-configuration)
8. [BYOK (Bring Your Own Key)](#8-byok-bring-your-own-key)

---

## 1. The Sovereign Architecture

Every LLM call, tool invocation, and agent action is forced through a **5-Layer Enforcement Gauntlet** before execution and again upon response. Layers execute sequentially; a block at any layer terminates the operation immediately and emits an immutable audit record. There is no bypass path.

```
INBOUND REQUEST
       │
       ▼
┌─────────────────────┐
│  LAYER 1: INTENT    │  Neural Mirror + Intent Binder
│                     │  Real-time prompt risk-scoring; semantic alignment
│  Pre-call intent    │  verification; jailbreak detection; persona-override
│  verification       │  blocking; divergence analysis against declared context
└────────┬────────────┘
         │ PASS
         ▼
┌─────────────────────┐
│  LAYER 2: SKILL     │  Skill Scanner — Proprietary Sovereign Logic
│                     │  Static analysis of tool payloads and prompt content;
│  Supply-chain gate  │  exfiltration-probe detection; code-injection pattern
│  for all tools      │  detection; supply-chain poisoning signals
└────────┬────────────┘
         │ PASS
         ▼
┌─────────────────────┐
│  LAYER 3: ROUTING   │  Routing Validator
│                     │  Pre-call cryptographic lock binding the declared model
│  Model routing      │  to the session; post-response verification that the
│  integrity lock     │  correct model identity actually responded
└────────┬────────────┘
         │ PASS
         ▼
    ── LLM CALL ──
         │
         ▼
┌─────────────────────┐
│  LAYER 4: RESPONSE  │  Response Binder — Proprietary Sovereign Logic
│                     │  Indirect prompt-injection detection; instruction
│  Post-call LLM      │  override signals; goal hijacking; persona replacement;
│  response guard     │  exfiltration-probe detection in LLM output
└────────┬────────────┘
         │ PASS
         ▼
┌─────────────────────┐
│  LAYER 5: CHAIN     │  Chain Detector — Proprietary Sovereign Logic
│                     │  Stateful, session-scoped behavioral sequencing;
│  Cross-turn attack  │  detects Salami Slicing, credential-harvesting chains,
│  sequence analysis  │  and multi-turn permission escalation campaigns
└────────┬────────────┘
         │ PASS
         ▼
  RESPONSE DELIVERED
```

Any layer returning a `CRITICAL` block produces:

- `HTTP 403` with `blockPhase` and `blockReason` in the response body
- An immutable audit log entry
- A real-time event on the Sovereign SSE governance stream

---

## 2. Key Features

### Skill Scanner

The Skill Scanner is the mandatory execution gate for all MCP tool calls and LLM prompt content entering the enforcement pipeline. It applies **Proprietary Sovereign Logic** to perform static analysis of every tool payload and prompt, detecting:

- Code-injection and command-injection patterns
- Data exfiltration probes and exfiltration-staged payloads
- Prompt-injection attempts embedded in tool arguments
- Supply-chain poisoning signals in third-party tool definitions

**Verdicts:** `TRUSTED` | `SUSPICIOUS` | `UNTRUSTED`

An `UNTRUSTED` verdict is an immediate, fail-closed block. `SUSPICIOUS` verdicts are logged and forwarded to the Chain Detector for session-level sequence analysis.

Every MCP tool execution is gated through the Skill Scanner before the tool runs. This is not configurable — it is the enforcement contract.

---

### Intent Binder

The Intent Binder performs real-time semantic alignment verification of agent reasoning against the declared operation context. It operates as an Express middleware, evaluating every privileged request that carries a reasoning descriptor, before any route handler is invoked.

It detects:

- Jailbreak attempts: instruction-override injections, persona activation attacks
- Prompt injection targeting system-level directives
- Semantic divergence between declared reasoning and the actual operation type

**Divergence levels:** `ALIGNED` | `WARNING` | `SUSPICIOUS` | `CRITICAL`

A `CRITICAL` divergence terminates the request at the middleware layer — `HTTP 403` is returned before the route handler executes. The `blockOnCritical` enforcement posture is always active and is not a runtime option.

---

### Chain Detector

The Chain Detector maintains stateful, session-scoped behavioral records across conversation turns. Its purpose is to identify **attack sequences** — coordinated patterns that exploit the fact that individual turns appear innocuous when evaluated in isolation.

Attack patterns detected include:

- **Salami Slicing:** Incremental privilege escalation where each turn stays below the individual block threshold
- **Credential Harvesting Chains:** Progressive tool calls that collectively stage a data exfiltration
- **Permission Escalation Sequences:** Multi-turn attempts to widen scope beyond original task authorization

Every enforcement event across all five layers feeds the Chain Detector for the active session. A detected chain fires a `CHAIN_DETECTION_VIOLATION` event on the governance stream and quarantines the session.

---

### LLM Proxy Adapter

The Proxy Adapter is the fail-closed gateway for all proxied LLM calls. It is the single point through which every model invocation must pass. The Adapter orchestrates all five enforcement layers and enforces provider-aware API key resolution — **API keys are never accepted in the request body**.

**Supported providers, detected automatically from the endpoint hostname:**

| Provider | Hostname |
|---|---|
| OpenAI | `api.openai.com` |
| Anthropic | `api.anthropic.com` |
| Google Gemini | `generativelanguage.googleapis.com` |
| Generic (any OpenAI-compatible) | all other hostnames |

**API key resolution order** (server-side only):

1. `X-LLM-Api-Key` request header
2. `ANTHROPIC_API_KEY` env var (for Anthropic endpoints)
3. `GEMINI_API_KEY` env var (for Gemini endpoints)
4. `OPENAI_API_KEY` env var (for OpenAI endpoints)
5. `LLM_API_KEY` env var (generic fallback)

**SSRF protection** is unconditional: private IP ranges (RFC 1918), link-local (RFC 3927), and CGNAT addresses are always blocked. `localhost` is permitted only in non-production environments.

**Block phases** — where in the pipeline the call was terminated:

| Phase | Trigger |
|---|---|
| `SSRF` | Endpoint failed SSRF/private-range validation |
| `NEURAL` | Neural Mirror returned a high-risk score |
| `INTENT` | Intent Binder blocked (jailbreak or CRITICAL divergence) |
| `SKILL_SCAN` | Skill Scanner returned `UNTRUSTED` verdict |
| `RESPONSE` | Response Binder blocked the LLM output |
| `ROUTING` | Routing Validator detected model substitution |

The Proxy Adapter returns the same `HTTP 403` shape for any block phase. It does not surface distinguishing error signals that would allow a caller to probe which enforcement layer was triggered.

---

## 3. Installation

### Prerequisites

- Node.js 20+
- PostgreSQL (via Prisma)
- Docker (recommended for production)

### Backend

```bash
cd private-backend
npm install

# These three are required — the server performs startup validation
# and will exit with a FATAL error if any are missing or undersized.
export JWT_SECRET="<minimum 64 characters>"
export INTERNAL_SERVICE_KEY="<minimum 32 characters>"
export ENCRYPTION_KEY="<minimum 32 characters>"

# Provider API keys (resolved automatically by the Proxy Adapter)
export OPENAI_API_KEY="..."
export ANTHROPIC_API_KEY="..."
export GEMINI_API_KEY="..."

npm start
```

The server performs fail-closed startup validation. A missing `JWT_SECRET`, `INTERNAL_SERVICE_KEY`, or undersized `ENCRYPTION_KEY` causes an immediate `process.exit(1)` with a diagnostic message. The server will not start in a degraded or fail-open state under any condition.

### Dashboard

```bash
cd sentinul-dashboard
npm install
npm run dev
# Runs on http://localhost:5173
```

### Docker (Production)

```bash
docker build -t sentinul:genesis .
docker run -d \
  --name sentinul \
  -p 5000:5000 \
  -e JWT_SECRET="..." \
  -e INTERNAL_SERVICE_KEY="..." \
  -e ENCRYPTION_KEY="..." \
  sentinul:genesis
```

---

## 4. Usage

### Proxied LLM Calls

All production LLM calls must be routed through the Proxy Adapter. Direct calls to LLM provider APIs that bypass this endpoint are outside the enforcement perimeter.

```bash
curl -X POST https://your-backend/api/v1/genesis/proxy/call \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -H "X-LLM-Api-Key: <provider-api-key>" \
  -d '{
    "endpoint": "https://api.openai.com/v1/chat/completions",
    "model": "gpt-4o",
    "messages": [
      { "role": "system", "content": "You are a compliance auditor." },
      { "role": "user",   "content": "Summarize the attached contract." }
    ],
    "sessionId": "sess_abc123"
  }'
```

**Blocked response (`HTTP 403`):**

```json
{
  "blocked": true,
  "blockPhase": "INTENT",
  "blockReason": "Jailbreak pattern detected (score 0.95)",
  "callId": "f3a19c...",
  "model": "gpt-4o",
  "timestamp": "2026-03-26T12:00:00.000Z"
}
```

**Clean response (`HTTP 200`):**

```json
{
  "blocked": false,
  "response": {
    "id": "chatcmpl-...",
    "choices": [{ "message": { "role": "assistant", "content": "..." } }]
  },
  "neuralRiskScore": 12,
  "intentVerdict": "ALIGNED",
  "skillScanVerdict": "TRUSTED",
  "routingIntact": true,
  "responseVerdict": "CLEAN",
  "durationMs": 843
}
```

---

### Tool Registration and Skill Scanning

Before deploying a tool or MCP server for agent use, submit its definition payload for a Skill Scan. Payloads that return `UNTRUSTED` are not permitted to execute in the enforcement pipeline.

```bash
curl -X POST https://your-backend/api/v1/skill-scan \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "toolName": "filesystem_read",
    "agentId": "agent-prod-001",
    "payload": "<tool definition or code payload as string>"
  }'
```

**Response:**

```json
{
  "verdict": "TRUSTED",
  "safety_score": 98,
  "static_findings": [],
  "scannedAt": "2026-03-26T12:00:00.000Z"
}
```

An `UNTRUSTED` verdict includes a `static_findings` array identifying detected signal categories. The category labels describe the class of threat detected. The detection logic itself is **Proprietary Sovereign Logic** and is intentionally not exposed — enforcement decisions are deterministic and fully auditable; the detection mechanism is not enumerable.

---

### Live Telemetry Dashboard

The Sovereign Dashboard provides real-time visibility into all enforcement activity across every layer.

**Access:** `https://sentinul.app` (production) or `http://localhost:5173` (local development)

| Panel | Data Source | Purpose |
|---|---|---|
| Global Health Score | `/api/v1/genesis/health` | Composite governance health; drops with EMERGENCY events |
| Live Pulse | `/api/v1/genesis/pulse` (SSE) | Real-time stream of all enforcement events |
| Proxy Call Log | `/api/v1/genesis/proxy/calls` | Per-call inspection results and block phases |
| Proxy Stats | `/api/v1/genesis/proxy/stats` | Block rate, intent flag rate, routing violations |
| Response Alerts | `/api/v1/genesis/response-scan/alerts` | QUARANTINE and CRITICAL Response Binder findings |
| Chain Sequences | `/api/v1/genesis/chain/sequences` | Detected multi-turn attack sequences |
| Routing Anomalies | `/api/v1/genesis/routing/anomalies` | Model substitution violations and lock expirations |

To consume the governance SSE stream directly:

```bash
curl -N https://your-backend/api/v1/genesis/pulse \
  -H "Authorization: Bearer <JWT>"
```

Events emitted on the stream:

- `PROXY_CALL_BLOCKED`
- `CHAIN_DETECTION_VIOLATION`
- `RESPONSE_BINDER_VIOLATION`
- `ROUTING_INTEGRITY_VIOLATION`
- `MANDATE_VIOLATION`
- `AGENT_QUARANTINED`

---

## 5. API Reference

### Proxy Adapter

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/genesis/proxy/call` | Execute a guarded LLM call through all enforcement layers |
| `GET` | `/api/v1/genesis/proxy/stats` | Aggregate call statistics: block rate, flags, violations |
| `GET` | `/api/v1/genesis/proxy/calls` | Recent call log, newest-first (`?limit=&offset=`) |

### Response Binder

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/genesis/response-scan` | Scan an LLM response for injection and hijacking signals |
| `GET` | `/api/v1/genesis/response-scan/stats` | Verdict breakdown and block rate |
| `GET` | `/api/v1/genesis/response-scan/alerts` | Recent QUARANTINE and CRITICAL findings |

### Routing Validator

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/genesis/routing/lock` | Issue a pre-call cryptographic model routing lock |
| `POST` | `/api/v1/genesis/routing/verify` | Verify post-response model identity against the lock |
| `GET` | `/api/v1/genesis/routing/stats` | Verification statistics and violation count |
| `GET` | `/api/v1/genesis/routing/anomalies` | Recent routing violations |

### Chain Detector

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/genesis/chain/event` | Record a behavioral event for a session |
| `GET` | `/api/v1/genesis/chain/sequences` | Detected chain attack sequences, newest-first |
| `GET` | `/api/v1/genesis/chain/stats` | Aggregate chain detection statistics |

### Identity and Permissions

| Method | Path | Access | Description |
|---|---|---|---|
| `POST` | `/api/v1/identity/mint` | Internal | Mint a task-scoped identity token |
| `POST` | `/api/v1/identity/verify` | Internal | Verify an identity token |
| `POST` | `/api/v1/permissions/request` | Internal | Request JIT permission for a resource |
| `POST` | `/api/v1/permissions/revoke` | Internal | Snap-shut: immediately revoke a permission |
| `GET` | `/api/v1/permissions/active` | Internal | List active permissions |

> **Internal routes** require the `X-Internal-Service-Key` header and are not reachable by external callers. The key is validated with a constant-time comparison to prevent timing-based enumeration.

---

## 6. Security Mandate

### Zero-Trust by Architecture

Sentinul operates on the principle that no agent, tool, or LLM provider is trusted by default. Trust is not established at connection time — it is re-evaluated at every layer, on every call.

The enforcement pipeline is:

**Fail-closed.** A system error in an enforcement component does not cause the call to proceed unexamined. Non-fatal bridge errors (e.g., neural mirror initialization failure) are logged at ERROR severity; the call continues with a degraded-mode record. The absence of a verdict is itself a recorded state, not a silent pass.

**Deterministic.** For any given input, the enforcement decision is identical on every invocation. There is no probabilistic acceptance threshold that can be gamed with repeated requests.

**Non-bypassable.** There is no runtime flag, request header, or body parameter that disables any enforcement layer. Security-relevant identity fields (`agentId`, cryptographic lock tokens) are never accepted from the request body — they are always derived server-side from `req.user.id` or authenticated session context.

### Sovereign Workflow

The Sovereign Workflow is the operational contract every deployment must honor:

1. No LLM call reaches a provider without passing all pre-call enforcement layers.
2. No LLM response reaches an agent without passing the Response Binder.
3. Every enforcement event is recorded, immutable, and available for audit in real-time.
4. An agent session accumulates behavioral state across turns. A pattern of individually sub-threshold events will collectively trigger Chain Detection and session quarantine.
5. API keys are secrets, not parameters. They are resolved server-side from environment variables. A caller cannot route a call to a provider using a key it controls via the request body.

### Protecting the Proprietary Moat

The detection logic within the Skill Scanner, Intent Binder, Chain Detector, and Response Binder constitutes **Proprietary Sovereign Logic**. The enforcement contracts — verdicts, block phases, audit trails, and SSE events — are fully observable. The detection logic is not.

This is intentional. An adversary who can enumerate detection thresholds can optimize attacks to stay below them. Black-box enforcement is the appropriate posture for a security-critical control plane. Observable inputs and outputs; opaque decision internals.

---

## 7. Configuration

### Required Environment Variables

| Variable | Minimum | Purpose |
|---|---|---|
| `JWT_SECRET` | 64 chars | Signs all session and identity JWTs. Fatal if absent. |
| `INTERNAL_SERVICE_KEY` | 32 chars | Guards internal control-plane routes. Fatal if absent. |
| `ENCRYPTION_KEY` | 32 chars | MFA and at-rest encryption. Fatal if absent or too short. |

Generate secure values:

```bash
node -e "const c=require('crypto'); console.log(c.randomBytes(64).toString('hex'));"
```

### Optional

| Variable | Purpose |
|---|---|
| `OPENAI_API_KEY` | Auto-selected for `api.openai.com` endpoints |
| `ANTHROPIC_API_KEY` | Auto-selected for `api.anthropic.com` endpoints |
| `GEMINI_API_KEY` | Auto-selected for `generativelanguage.googleapis.com` endpoints |
| `LLM_API_KEY` | Generic fallback for any OpenAI-compatible endpoint |
| `SWARM_SECRET` | HMAC secret for Swarm Immunity gossip protocol signing |
| `INSTANCE_ID` | Node identifier in multi-instance deployments |
| `NODE_ENV` | Set to `production` to enforce strict SSRF rules and suppress debug output |

### RSA Key Loading

RSA signing keys are loaded in priority order:

1. `/etc/secrets/` — Render production secrets mount
2. `/app/` — Docker volume mount
3. `./keys/` — Local development directory
4. `RSA_PRIVATE_KEY` / `RSA_PUBLIC_KEY` environment variables

If keys are unavailable in production, startup emits a CRITICAL warning. In development, the platform operates in mock-signing mode with console indication.

---

## 8. BYOK (Bring Your Own Key)

The BYOK Vault enables enterprise operators to supply Customer-Managed Keys (CMK) for at-rest encryption of audit records and evidence vault entries. The vault bridge reads configuration from `.sentinulrc` on startup.

```yaml
# .sentinulrc
vault:
  provider: local        # options: local | aws-kms | gcp-kms
  key_id: "cmk-prod-001"
```

The vault bridge fails loudly on initialization errors in production — it does not silently fall back to a platform-managed key. In development, it initializes in sovereign mock mode and logs the mode explicitly.

---

*Dedicated to the engineering spirit of Edward Vrona & the Hubble team.*  
*Beyond Guardrails. Real-Time Sovereignty.*



---

## License

Proprietary - Sentinul Security  
© 2026 All rights reserved

For licensing inquiries: contact@sentinul.app

---

## Acknowledgments

Built with ❤️ for enterprise AI security.

**Sentinul Team** Los Angeles, CA 🌴🛡️
