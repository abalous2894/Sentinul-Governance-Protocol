# KOVERA: SOVEREIGN SECURITY INFRASTRUCTURE

**Enterprise-Grade Enforcement for Autonomous AI Agents and Multi-Agent Systems**

**Version:** Genesis Phase 5 (Production)  
**Edition:** Sovereign Security Infrastructure  
**Status:** All 5 Enforcement Layers Active — Fully Hardened

> Beyond Guardrails. Real-Time Sovereignty.

---

## Overview

**Kovera** (formerly *Sentinul*) is a deterministic, multi-layer security enforcement platform for autonomous AI agents operating in production environments. The platform enforces a **Sovereign Workflow** — a non-negotiable operational contract where no agent action, LLM call, or MCP tool invocation can bypass the enforcement pipeline. Every operation is inspected, logged, and subject to fail-closed decisions.

This is not a monitoring system. It is an enforcement system.

---

## Table of Contents

1. [The Sovereign Architecture](#1-the-sovereign-architecture)
2. [Key Features](#2-key-features)
   - [Skill Scanner](#skill-scanner)
   - [Intent Binder](#intent-binder)
   - [Chain Detector](#chain-detector)
   - [LLM Proxy Adapter](#llm-proxy-adapter)
   - [FinTech FDLP](#fintech-fdlp-regulated-data-policy)
   - [Step-Up Authorization (HITL)](#step-up-authorization-hitl)
3. [Installation](#3-installation)
4. [Usage](#4-usage)
   - [Proxied LLM Calls](#proxied-llm-calls)
   - [FinTech FDLP configuration](#fintech-fdlp-configuration-and-behavior)
   - [Non-LLM Genesis scan (FDLP)](#non-llm-genesis-scan-fdlp-only)
   - [The HITL approval flow (step-up)](#the-hitl-approval-flow-step-up)
   - [Tool Registration and Skill Scanning](#tool-registration-and-skill-scanning)
   - [Public sovereignty verification (receipt portal)](#public-sovereignty-verification-receipt-portal)
   - [Kovera MCP plugin (connectivity check)](#kovera-mcp-plugin-connectivity-check)
   - [Live Telemetry Dashboard](#live-telemetry-dashboard)
   - [Web dashboard, MFA, and settings](#web-dashboard-mfa-and-settings)
   - [Live Threat Feed (SSE)](#live-threat-feed-sse)
5. [API Reference](#5-api-reference)
6. [Security Mandate](#6-security-mandate)
7. [Configuration](#7-configuration)
   - [Kovera vs. legacy environment variables (dual-read)](#kovera-vs-legacy-environment-variables-dual-read)
8. [BYOK (Bring Your Own Key)](#8-byok-bring-your-own-key)

---

## 1. The Sovereign Architecture

Every LLM call, tool invocation, and agent action is forced through a **5-Layer Enforcement Gauntlet** before execution and again upon response. Layers execute sequentially; a block at any layer terminates the operation immediately and emits an immutable audit record. There is no bypass path.

**Cryptographic accountability:** Enforcement decisions, delegated-action outcomes, and **human-in-the-loop (HITL)** releases are written into the **Aegis audit ledger** with hash-chained entries (Merkle-oriented binding per event). That design yields a **tamper-evident history**: the agent request, the Kovera verdict, and (when applicable) the manager's step-up approval are linked in a way that breaks forensic integrity if any single row is altered—not merely a conventional append-only SQL log.

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
| `DATA_POLICY` | FinTech FDLP blocked prompt or response (regulated-data / credential pattern policy) |

The Proxy Adapter returns the same `HTTP 403` shape for any block phase. It does not surface distinguishing error signals that would allow a caller to probe which enforcement layer was triggered.

**FinTech FDLP:** When a policy pack is active (see [§4 FinTech FDLP configuration](#fintech-fdlp-configuration-and-behavior)), prompts and assistant responses are scanned for regulated-data patterns (e.g. PAN/Luhn, US SSN, US ABA routing, bearer tokens, common API-credential shapes). Matches can **block**, **redact**, or **log only**, per pack and env overrides. A block is reported as `blockPhase: "DATA_POLICY"`.

---

### FinTech FDLP (regulated data policy)

**FDLP** (FinTech Data Loss Prevention) is an optional, pack-driven layer on the **LLM Proxy Adapter** path and on **POST /api/v1/genesis/scan** (non-LLM inspection).

- **Policy definition:** `private-backend/fintech-policy-packs.yaml` — named packs (`customer_support_copilot`, `internal_ops_strict`, `fraud_aml_analyst_assistant`, `developer_docs_relaxed`, etc.) with per-direction actions `block` | `redact` | `log_only` and category toggles.
- **Default:** `default_active_pack: off` — FDLP is inactive until you set a pack via environment (below).
- **Implementation:** `private-backend/src/services/fintech/fdlp-policy.js` (resolution), `fdlp-scanner.js` (patterns / Luhn / redaction), integrated in `private-backend/src/llm-proxy-adapter.js`.

This is distinct from Skill Scanner (supply-chain / injection). FDLP targets **regulated or secret-bearing content** in chat transcripts.

---

### Step-Up Authorization (HITL)

Kovera implements a **Human-in-the-Loop (HITL) gate** for high-risk **delegated** actions—patterns that matter for POS, fintech, and operations workflows where a kiosk or agent must not move money or void transactions beyond its **passport ceiling** without explicit human authority.

- **402 Payment Required (authority required):** When an invoke exceeds the delegated passport threshold (e.g. a **$500 void** with a **$50** ceiling), the gateway returns **`HTTP 402`** with a **`PENDING_APPROVAL`** verdict—not a silent deny. The body includes **`approval_request_id`** and **`correlation_id`** for binding the manager step-up to that single intent.
- **Multi-role release:** A secondary party holding an elevated scoped role (e.g. **`MANAGER`** or **`ADMIN`**) must **`POST /api/v1/approvals/sign`** with their **manager passport `access_token`**. The broker verifies role and binds a **dual-signature** release to the pending row.
- **One-shot consumption:** The release is **cryptographically bound** to the pending **`approval_request_id`** and is **consumed** when the kiosk retries the original invoke with **`hitl_approval_request_id`** set. Replays without a fresh pending row **fail closed**.
- **Fail-closed:** Without a valid signed release, the delegated action **never** clears the gateway. Kovera blocks business only by default; **authorized exceptions** are explicit, audited, and non-replayable.

**Reference implementation:** internal Vanguard lab route **`POST /api/v1/internal/vanguard/pos-delegation/invoke`** (requires `INTERNAL_SERVICE_KEY`), approval broker in `private-backend/src/services/approval/approval-broker.js`, sign route in `private-backend/src/app.js`.

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

**HITL / POS step-up demo (end-to-end):** With the API running and **`INTERNAL_SERVICE_KEY`** set in the environment:

```bash
cd private-backend && API_URL=http://localhost:3000 INTERNAL_SERVICE_KEY="$INTERNAL_SERVICE_KEY" npm run demo:vanguard-hitl
```

This runs `scripts/vanguard-hitl-override.mjs`: kiosk passport → **402** pending → manager sign → retry **200 PERMITTED**, printing a governance receipt summary.

### Dashboard

```bash
cd sentinul-dashboard   # repository package name; Kovera dashboard frontend
npm install
# Optional: echo 'VITE_API_URL=http://localhost:3000' > .env.local
npm run dev
# Runs on http://localhost:5173 — see §4 "Web dashboard" for VITE_API_URL / Turnstile.
```

### Docker (Production)

```bash
docker build -t kovera:genesis .
docker run -d \
  --name kovera \
  -p 5000:5000 \
  -e JWT_SECRET="..." \
  -e INTERNAL_SERVICE_KEY="..." \
  -e ENCRYPTION_KEY="..." \
  kovera:genesis
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

### FinTech FDLP configuration and behavior

1. **Choose or edit packs** in `private-backend/fintech-policy-packs.yaml` (`prompt_action` / `response_action` / `categories` per pack).
2. **Activate a pack** with environment variables. Prefer **`KOVERA_*`** names; legacy **`SENTINUL_*`** names are still read with a one-time deprecation warning (see [§7 Kovera vs. legacy environment variables](#kovera-vs-legacy-environment-variables-dual-read) and `MIGRATION.md` at repo root).

| Variable | Purpose |
|---|---|
| `KOVERA_FINTECH_POLICY_PACK` | Pack id (e.g. `customer_support_copilot`, `internal_ops_strict`). Overrides YAML `default_active_pack` when set. *Legacy:* `SENTINUL_FINTECH_POLICY_PACK` |
| `KOVERA_FDLP_ENABLED` | Set to `0` / `false` to force FDLP off even if a pack is selected. *Legacy:* `SENTINUL_FDLP_ENABLED` |
| `KOVERA_FDLP_PROMPT_ACTION` | Optional override: `block` \| `redact` \| `log_only`. *Legacy:* `SENTINUL_FDLP_PROMPT_ACTION` |
| `KOVERA_FDLP_RESPONSE_ACTION` | Optional override: `block` \| `redact` \| `log_only`. *Legacy:* `SENTINUL_FDLP_RESPONSE_ACTION` |
| `KOVERA_FDLP_MAX_SCAN_CHARS` | Cap scanned characters (bounded in code). *Legacy:* `SENTINUL_FDLP_MAX_SCAN_CHARS` |
| `KOVERA_FINTECH_POLICY_PACKS_PATH` | Absolute path to an alternate YAML packs file. *Legacy:* `SENTINUL_FINTECH_POLICY_PACKS_PATH` |

With **`default_active_pack: off`** and no active pack env set, FDLP does not run. When active, proxy statistics include FDLP-related counters in the adapter’s internal stats (see `llm-proxy-adapter.js`).

---

### Non-LLM Genesis scan (FDLP-only)

Inspect chat-style **messages** without calling an LLM — useful for UI “preflight” or DLP checks using the same policy pack as the proxy.

```bash
curl -X POST https://your-backend/api/v1/genesis/scan \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      { "role": "user", "content": "…" }
    ],
    "sessionId": "optional-session-id"
  }'
```

**Note:** In production, `/api/v1/genesis/*` (including this route) is protected by the **lab API gate**: callers need a valid **user JWT** (or `x-internal-service-key`), unless `GENESIS_API_PUBLIC=1` (not recommended on the public internet).

---

### The HITL approval flow (step-up)

Use this handshake when a **delegated invoke** returns **`HTTP 402`** with **`verdict: "PENDING_APPROVAL"`** (e.g. POS void above passport ceiling). **Every call below requires the `x-internal-service-key` header** matching **`INTERNAL_SERVICE_KEY`** (the same “skeleton key” your demo scripts and internal control plane use). Obtain kiosk and manager **`permission_id` / `access_token`** pairs first via **`POST /api/v1/identity/mint`** and **`POST /api/v1/permissions/passport`** (see [§5 Identity and Permissions](#identity-and-permissions)).

**1) Invoke — exceeds ceiling → capture IDs**

```bash
curl -sS -X POST "https://your-backend/api/v1/internal/vanguard/pos-delegation/invoke" \
  -H "Content-Type: application/json" \
  -H "x-internal-service-key: $INTERNAL_SERVICE_KEY" \
  -d '{
    "permission_id": "<kiosk_permission_id>",
    "access_token": "<kiosk_access_token>",
    "tool_name": "void_transaction",
    "amount": 500,
    "location_id": "LA-01"
  }'
```

**Example `402` body (shape):**

```json
{
  "verdict": "PENDING_APPROVAL",
  "code": "PENDING_APPROVAL",
  "approval_request_id": "…",
  "correlation_id": "…",
  "framing": "HITL / POS void above passport ceiling"
}
```

**2) Manager authorizes — dual-signature release**

```bash
curl -sS -X POST "https://your-backend/api/v1/approvals/sign" \
  -H "Content-Type: application/json" \
  -H "x-internal-service-key: $INTERNAL_SERVICE_KEY" \
  -d '{
    "approval_request_id": "<approval_request_id_from_402>",
    "manager_access_token": "<manager_passport_access_token>"
  }'
```

The manager passport must carry an elevated scoped role (**`MANAGER`** / **`ADMIN`**) sufficient for the pending policy.

**3) Retry invoke — one-shot binding**

```bash
curl -sS -X POST "https://your-backend/api/v1/internal/vanguard/pos-delegation/invoke" \
  -H "Content-Type: application/json" \
  -H "x-internal-service-key: $INTERNAL_SERVICE_KEY" \
  -d '{
    "permission_id": "<kiosk_permission_id>",
    "access_token": "<kiosk_access_token>",
    "tool_name": "void_transaction",
    "amount": 500,
    "location_id": "LA-01",
    "hitl_approval_request_id": "<same_approval_request_id>"
  }'
```

Expect **`HTTP 200`** with **`verdict: "PERMITTED"`** when the release matches. For a scripted walkthrough, use **`npm run demo:vanguard-hitl`** (see [§3 Installation](#3-installation)).

---

### Tool Registration and Skill Scanning

Before deploying a tool or MCP server for agent use, submit its definition payload for a Skill Scan. Payloads that return `UNTRUSTED` are not permitted to execute in the enforcement pipeline.

```bash
curl -X POST https://your-backend/api/v1/skills/scan \
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

### Public sovereignty verification (receipt portal)

Operators and auditors can verify **Kovera sovereignty receipts** (and compatible legacy exports) without logging in:

- **Dashboard route:** open **`/verify`** on the dashboard app (e.g. `https://app.kovera.tech/verify` in production, or `http://localhost:5173/verify` locally after `npm run dev` in `sentinul-dashboard`).
- **Behavior:** upload a `.json` receipt; the UI calls **`POST /v1/public/verify-receipt`** on the configured API origin. The server returns structured verification (including **`HASH_MISMATCH`** and tamper-oriented copy when integrity checks fail). The portal surfaces clear **invalid / tamper / mismatch** messaging instead of a generic crash.
- **Optional:** Merkle / public-truth panels on the same page can bind receipts to ledger anchors when your deployment exposes the corresponding public routes.

For CI and regression testing, the dashboard includes Playwright coverage for both a golden-path verify and a **tampered-receipt** failure path (`e2e/verification-failure.spec.js`).

---

### Kovera MCP plugin (connectivity check)

The **`@kovera/mcp-server`** package installs the **`kovera-mcp`** CLI (legacy binary name **`sentinul`** may still appear on older PATH entries).

After **`kovera-mcp setup`** (or with **`API_BASE`** set to your backend root or `.../api` as documented in setup), validate wiring before opening Claude Desktop:

```bash
kovera-mcp --check
```

This command:

1. **GET** **`/api/auth/health`** on the resolved backend (from **`API_BASE`** / `config.json` **`backendUrl`**).
2. Validates the local **Aegis identity file** **`aegis-identities.json`** under **`KOVERA_MCP_DATA_DIR`**, or under the legacy default **`~/.config/sentinul/`** when the override is unset.

Exit code **`0`** means both checks passed; non-zero prints a concrete error (unreachable API, HTTP failure, or missing/invalid identity JSON). Use **`kovera-mcp --help`** for all CLI options.

---

### Live Telemetry Dashboard

The Sovereign Dashboard provides real-time visibility into all enforcement activity across every layer.

**Access:** **`https://app.kovera.tech`** (primary production dashboard), **`https://kovera.tech`** (marketing / apex where deployed), or **`http://localhost:5173`** (local development). Legacy hostnames (e.g. `sentinul.app`) may still redirect during migration—prefer the **kovera.tech** hosts for new links.

| Panel | Data Source | Purpose |
|---|---|---|
| Global Health Score (GHS) | `GET /api/v1/health/global` | Weighted score from Prisma `AuditLog` + signed precedents (public; no auth) |
| Live Pulse (REST) | `GET /api/v1/health/pulse` | Last 10 platform `AuditLog` rows with precedent joins (public; no auth) |
| Dashboard strip + Aegis timeline | `GET /api/v1/genesis/*` + `GET /api/aegis/ledger` | Live Genesis stats and hash-chained Aegis ledger (**JWT required**; `/api/v1/*` is Aegis-mediated) |
| Proxy Call Log | `GET /api/v1/genesis/proxy/calls` | Per-call inspection results and block phases |
| Proxy Stats | `GET /api/v1/genesis/proxy/stats` | Block rate, intent flag rate, routing violations |
| Governance health | `GET /api/v1/genesis/governance-health` | Recursive auditor autonomy / governance score |
| Response Alerts | `GET /api/v1/genesis/response-scan/alerts` | QUARANTINE and CRITICAL Response Binder findings |
| Chain Sequences | `GET /api/v1/genesis/chain/sequences` | Detected multi-turn attack sequences |
| Routing Anomalies | `GET /api/v1/genesis/routing/anomalies` | Model substitution violations and lock expirations |
| **Live Threat Feed** | `GET /api/v1/genesis/threats/stream` (SSE) | High-signal security events to the browser (**JWT** via `?access_token=` or session cookie; see [Live Threat Feed (SSE)](#live-threat-feed-sse)) |

**Live Pulse (REST) example:**

```bash
curl -sS "https://your-backend/api/v1/health/pulse"
```

**MCP / governance SSE:** real-time tool streams use `GET /api/mcp/sse` (MCP auth), not a separate `/api/v1/genesis/pulse` endpoint.

High-signal governance event types (ledger / exports) include:

- `PROXY_CALL_BLOCKED` (via proxy adapter + audit pipeline)
- `CHAIN_DETECTION_VIOLATION`
- `RESPONSE_BINDER_VIOLATION`
- `ROUTING_INTEGRITY_VIOLATION`
- `ROUTE_BLOCKED_BY_PERMISSION` / Aegis mediation denials
- `AGENT_QUARANTINED` (session quarantine)

---

### Web dashboard, MFA, and settings

The **Kovera dashboard** (repository folder `sentinul-dashboard`) is the operator UI for login, Genesis telemetry, and account controls.

| Area | How to use |
|---|---|
| **Local dev** | `cd sentinul-dashboard && npm install && npm run dev` → `http://localhost:5173`. Point the app at your API with `VITE_API_URL` (e.g. `http://localhost:3000` — the client normalizes to `.../api`). |
| **Production API origin** | Set `VITE_API_URL` on the static host (e.g. `https://your-api-host` or `https://host/api`) so auth and `/api/v1/*` calls target the same backend that issued the JWT. |
| **Login / signup** | Email + password; **Cloudflare Turnstile** on non-localhost hosts when the API exposes keys (`TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` on the backend, optional `VITE_TURNSTILE_SITE_KEY` on the dashboard, or `GET /api/auth/turnstile-key`). On localhost, Turnstile is bypassed for developer ergonomics. |
| **MFA (TOTP)** | After login, users with MFA enabled enter a **6-digit code** (`mfa-code` / `one-time-code` autofill). Setup lives at **`/settings/mfa`** (MFA enrollment flow). |
| **Okta SSO** | If the backend reports SSO enabled (`/api/auth/okta/config`), the login page offers **Sign in with Okta** (redirect flow to `/api/auth/okta`). |
| **Privacy & data** | **`/settings/privacy`** — deletion scheduling (GDPR/CCPA flow), MFA status summary. |
| **SIEM / telemetry** | **`/settings/siem`** — shows whether SIEM / enterprise webhook env is configured on the API host; **test buttons** fire staging-only test requests (see `docs/enterprise-defense/AUDIT_TELEMETRY_INTEGRATION.md`). |
| **Skill inventory** | **`/settings/skills`** — SBOM-style inventory and **revoke trust** by content hash (Mongo revocation list); aligns with `governance-treaty.yaml` / `skill_supply_chain`. |

**Cookies:** Session cookies use `SameSite=None` + `Secure` in production for cross-site SPA + API deployments; ensure `COOKIE_DOMAIN` matches your deployment if the UI and API share a parent domain.

---

### Live Threat Feed (SSE)

The dashboard subscribes to **Server-Sent Events** for high-signal threat notifications (e.g. probes and enforcement-adjacent traffic after quiet-path filters).

- **Endpoint:** `GET /api/v1/genesis/threats/stream`
- **Auth:** Browsers cannot set `Authorization` on `EventSource`. The client passes the JWT as a query parameter: **`?access_token=<token>`** (the stream route also accepts `Authorization: Bearer` or the session cookie when cookie parsing applies).
- **Production gate:** This path is exempt from the generic “lab API” JWT check so the dedicated stream middleware can parse `access_token`; you still need a **valid JWT** from the same API’s `JWT_SECRET`.

**Manual check (replace token):**

```bash
curl -sS -N -H "Accept: text/event-stream" \
  "https://your-backend/api/v1/genesis/threats/stream?access_token=<JWT>"
```

Event stream payloads include a `CONNECTED` heartbeat and `THREAT_SIGNAL` JSON objects consumed by the Kovera dashboard package (`sentinul-dashboard`, hook `useLiveThreatFeed`).

---

## 5. API Reference

### Proxy Adapter

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/v1/genesis/proxy/call` | Execute a guarded LLM call through all enforcement layers |
| `GET` | `/api/v1/genesis/proxy/stats` | Aggregate call statistics: block rate, flags, violations |
| `GET` | `/api/v1/genesis/proxy/calls` | Recent call log, newest-first (`?limit=&offset=`) |
| `POST` | `/api/v1/genesis/scan` | Non-LLM FDLP inspection of a `messages` array (same packs as proxy) |
| `GET` | `/api/v1/genesis/threats/stream` | SSE live threat feed; use `?access_token=` for browsers |

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
| `POST` | `/api/v1/permissions/passport` | Internal | Issue a **delegated passport** (scoped role, constraints, e.g. `maxVoidAmount`) |
| `POST` | `/api/v1/permissions/revoke` | Internal | Snap-shut: immediately revoke a permission |
| `GET` | `/api/v1/permissions/active` | Internal | List active permissions |
| `POST` | `/api/v1/approvals/sign` | Internal | **HITL:** manager signs a pending `approval_request_id` (body: `manager_access_token`) |
| `POST` | `/api/v1/internal/vanguard/pos-delegation/invoke` | Internal | Lab **POS delegation** invoke; returns **402** + `approval_request_id` when step-up required |

> **Internal routes** require the `X-Internal-Service-Key` header ( **`INTERNAL_SERVICE_KEY`** ) and are not intended for browser exposure. The key is validated with a constant-time comparison to prevent timing-based enumeration. **`INTERNAL_SERVICE_KEY`** is **required** at server startup alongside `JWT_SECRET` and `ENCRYPTION_KEY`—it is the control-plane credential for mint, passport, approvals, and `/api/v1/internal/*` gates.

---

## 6. Security Mandate

### Zero-Trust by Architecture

Kovera operates on the principle that no agent, tool, or LLM provider is trusted by default. Trust is not established at connection time — it is re-evaluated at every layer, on every call.

The enforcement pipeline is:

**Fail-closed.** A system error in an enforcement component does not cause the call to proceed unexamined. Non-fatal bridge errors (e.g., neural mirror initialization failure) are logged at ERROR severity; the call continues with a degraded-mode record. The absence of a verdict is itself a recorded state, not a silent pass.

**Deterministic.** For any given input, the enforcement decision is identical on every invocation. There is no probabilistic acceptance threshold that can be gamed with repeated requests.

**Non-bypassable.** There is no runtime flag, request header, or body parameter that disables any enforcement layer. Security-relevant identity fields (`agentId`, cryptographic lock tokens) are never accepted from the request body — they are always derived server-side from `req.user.id` or authenticated session context.

### Immutable accountability (Merkle-chain audit)

Every enforcement decision is bound into the **Aegis audit ledger** using **per-entry hashing and signatures** and **Merkle-style chaining** (e.g. Vanguard / lab simulations expose roots for verification). That yields a **cryptographically verifiable history** in which the **agent request**, the **Kovera verdict**, and—when step-up applies—the **manager HITL approval** are linked in the same tamper-evident stream. **Altering a single log entry invalidates the chain** for downstream verification, which supports **forensic integrity** and regulatory-style audit narratives beyond a plain SQL append log.

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

### Kovera vs. legacy environment variables (dual-read)

The backend and tooling **prefer `KOVERA_*` variables**. If a Kovera key is unset, the runtime falls back to the legacy **`SENTINUL_*`** name and emits a **one-time `console.warn`** that the legacy key is deprecated (see **`MIGRATION.md`** in the repository root for the full map and timeline).

Examples (non-exhaustive):

| Kovera (preferred) | Legacy (still honored) |
|---|---|
| `KOVERA_TIER` | `SENTINUL_TIER` |
| `KOVERA_API_KEY` | `SENTINUL_API_KEY` (e.g. tools / `private-backend/tools/server.mjs`) |
| `KOVERA_PASSPORT_SECRET` | `SENTINUL_PASSPORT_SECRET` |
| `KOVERA_PASSPORT_ENFORCE` | `SENTINUL_PASSPORT_ENFORCE` |
| `KOVERA_APP_SITE_PATH` | `SENTINUL_APP_SITE_PATH` (marketing static root) |
| `KOVERA_BYOK_ID` | `SENTINUL_BYOK_ID` |
| `KOVERA_FDLP_*` / `KOVERA_FINTECH_*` | `SENTINUL_FDLP_*` / `SENTINUL_FINTECH_*` |

If both are set to **different** values, **Kovera wins** and a one-time conflict warning is logged.

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
| `SIEM_ENDPOINT_URL` / `SIEM_AUTH_TOKEN` | Optional batch forwarder for Aegis-shaped SIEM posts (`siemService.js`) |
| `ENTERPRISE_TELEMETRY_WEBHOOK_URL` | Optional customer webhook for `sentinul-enterprise-telemetry/v1` (uses `X-Internal-Service-Key`) |
| `GENESIS_API_PUBLIC` | If `1`, relaxes production JWT requirement on `/api/v1/genesis/*` (and similar flags for `/api/v1/skills`, `/gavel`). **Avoid on public internet.** |
| `KOVERA_FINTECH_POLICY_PACK` / `KOVERA_FDLP_*` | FinTech FDLP — prefer these; legacy `SENTINUL_*` names still work — see [§4 FinTech FDLP configuration](#fintech-fdlp-configuration-and-behavior) and `private-backend/.env.example` |
| `TURNSTILE_SITE_KEY` | Cloudflare Turnstile **site** key (exposed to browser via `/api/auth/turnstile-key` or dashboard env) |
| `TURNSTILE_SECRET_KEY` | Turnstile **secret** (server-only; verifies `cf-turnstile-response` on login/register) |
| `SKIP_TURNSTILE` | When `true` **and** `NODE_ENV !== production`, skips Turnstile verification (local QA only) |

See `docs/enterprise-defense/AUDIT_TELEMETRY_INTEGRATION.md` for integration patterns.

### RSA Key Loading

RSA signing keys are loaded in priority order:

1. `/etc/secrets/` — Render production secrets mount
2. `/app/` — Docker volume mount
3. `./keys/` — Local development directory
4. `RSA_PRIVATE_KEY` / `RSA_PUBLIC_KEY` environment variables

If keys are unavailable in production, startup emits a CRITICAL warning. In development, the platform operates in mock-signing mode with console indication.

---

## 8. BYOK (Bring Your Own Key)

The BYOK Vault enables enterprise operators to supply Customer-Managed Keys (CMK) for at-rest encryption of audit records and evidence vault entries. The vault bridge reads configuration from **`.sentinulrc`** at startup (legacy filename retained on disk for compatibility—paths and blocks are unchanged).

You can also inject a key id via **`KOVERA_BYOK_ID`** (preferred) or legacy **`SENTINUL_BYOK_ID`** when no rc file is present (e.g. Docker).

```yaml
# .sentinulrc
vault:
  provider: local        # options: local | aws-kms | gcp-kms
  key_id: "cmk-prod-001"
```

The vault bridge fails loudly on initialization errors in production — it does not silently fall back to a platform-managed key. In development, it initializes in sovereign mock mode and logs the mode explicitly.

---

*Architected and Hardened in Los Angeles, California.*
*Beyond Guardrails. Real-Time Sovereignty.*
*Dedicated to the engineering spirit of Edward Vrona & the Hubble team.*
