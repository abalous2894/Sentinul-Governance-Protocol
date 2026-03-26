# Security Policy

## Our Commitment

Sentinul is a security-first enforcement platform. Every component — from the Proxy Adapter that gates LLM calls to the Skill Scanner and Intent Binder that constitute the Sovereign Perimeter — is designed to fail closed rather than degrade silently. We hold our own infrastructure to the same standard we enforce on the agents we protect.

If you identify a vulnerability in Sentinul, we want to know. Responsible disclosure is the foundation of a trustworthy security ecosystem, and we commit to treating every credible report with urgency and respect.

---

## Supported Versions

The following versions currently receive active security updates. Reports against end-of-life versions may be acknowledged but will not result in a patch.

| Version | Status |
|---|---|
| Genesis Phase 5 (`v5.x`) | ✅ Active — Full security support |
| Genesis Phase 4 (`v4.x`) | ⚠️ Critical patches only |
| V3 and earlier (`v1.x` – `v3.x`) | ❌ End of life — No security updates |

---

## Reporting a Vulnerability

**Do not disclose vulnerabilities in public GitHub issues, pull requests, or social media until a fix has been deployed and a coordinated disclosure date has been agreed upon.** Public disclosure before a patch is available puts all Sentinul deployments at risk.

### How to Report

Use one of the following channels:

1. **Private GitHub Security Advisory** — Open a private advisory directly on this repository via **Security → Advisories → New draft security advisory**. This is the preferred channel for most researchers.

2. **Email** — Send a detailed report to **security@sentinul.dev**. Use our PGP key (available at `security@sentinul.dev` on keyservers) to encrypt sensitive findings before transmission.

### What to Include

A complete report significantly reduces triage time. Please provide:

- A clear description of the vulnerability class (e.g., enforcement bypass, authentication failure, injection)
- The affected component(s): Proxy Adapter, Intent Binder, Skill Scanner, Chain Detector, Response Binder, Routing Validator, or the API surface
- A minimal reproduction case or proof-of-concept demonstrating the issue — this does not need to be a working exploit
- The observed behavior and the expected (secure) behavior
- The version and deployment configuration (if known)
- Any suggested mitigations or remediation approaches

> **Note on detection logic:** Sentinul's enforcement decisions are observable via the documented API contracts (`blockPhase`, `blockReason`, enforcement verdicts). The internal detection mechanisms that produce those decisions are **Proprietary Sovereign Logic** and are intentionally not documented. Security reports should describe the observable enforcement failure — what input produced what unexpected output — without requiring knowledge of internal thresholds or detection internals.

---

## Disclosure Process

Once a report is received, we follow this process:

| Step | Timeline | Action |
|---|---|---|
| **Acknowledge** | Within 48 hours | We confirm receipt of the report and assign a tracking reference |
| **Triage** | Within 5 business days | We assess severity, affected scope, and exploitability |
| **Update** | Within 10 business days | We provide an initial assessment and estimated fix timeline |
| **Fix** | Dependent on severity | Critical/High issues are prioritized; timeline communicated during triage |
| **Verify** | Before release | We may ask the reporter to verify that the fix addresses the issue |
| **Notify** | Upon release | We notify the reporter simultaneously with deploying the fix |
| **Credit** | Upon request | We acknowledge the reporter in the release notes unless anonymity is requested |

If a report is determined not to be a valid security vulnerability (e.g., it describes expected behavior or is out of scope), we will explain our reasoning.

---

## Scope

### In Scope

The following components are within the Sovereign Perimeter and are in scope for security research:

| Component | Description |
|---|---|
| **LLM Proxy Adapter** (`POST /api/v1/genesis/proxy/call`) | The primary enforcement entry point for all proxied LLM calls |
| **Intent Binder** (`/api/v1/genesis/proxy/call` pre-call enforcement) | Semantic alignment and jailbreak enforcement layer |
| **Skill Scanner** (`POST /api/v1/skill-scan`) | Tool and prompt payload enforcement gate |
| **Chain Detector** (`POST /api/v1/genesis/chain/event`) | Multi-turn behavioral sequence enforcement |
| **Response Binder** (`POST /api/v1/genesis/response-scan`) | Post-call LLM response enforcement layer |
| **Routing Validator** (`/api/v1/genesis/routing/*`) | Model identity and routing integrity enforcement |
| **Identity and Permission API** (`/api/v1/identity/*`, `/api/v1/permissions/*`) | Authentication, JIT permissions, and token minting |
| **BYOK Vault** | Customer-managed key handling and vault bridge initialization |
| **Authentication pipeline** | JWT validation, `INTERNAL_SERVICE_KEY` enforcement, session integrity |

We are specifically interested in any finding where an input to these components causes the platform to take an action inconsistent with its documented enforcement contract — including but not limited to:

- A blocked operation that should have proceeded
- An operation that proceeds when it should have been blocked (enforcement bypass)
- A block that leaks information about internal detection logic through distinguishable error responses
- Authentication or authorization defects on any protected endpoint
- SSRF bypasses that cause the Proxy Adapter to route calls to private IP ranges in production

### Out of Scope

The following are **not** considered in-scope security vulnerabilities:

- Third-party LLM provider downtime, rate limiting, or API changes (OpenAI, Anthropic, Google Gemini, etc.)
- Social engineering attacks against Sentinul employees or customers
- Physical security issues
- Denial-of-service attacks (volumetric or application-layer flooding)
- Vulnerabilities in dependencies that have no demonstrated impact on a Sentinul component in scope
- Security issues in LLM model behavior itself (hallucinations, model jailbreaks that are not enforcement bypasses of the Sentinul pipeline)
- Issues only reproducible against an explicitly misconfigured deployment (e.g., `NODE_ENV` not set to `production`, or an undersized `JWT_SECRET` supplied by the operator)

---

## Severity Classification

We assess severity using a combination of exploitability and impact. As a reference guide:

| Severity | Example |
|---|---|
| **Critical** | Unauthenticated enforcement bypass that allows an LLM call to reach a provider without passing any enforcement layer |
| **High** | Authenticated enforcement bypass; SSRF bypass in production; identity token forgery |
| **Medium** | Enforcement decision leaks distinguishing information about internal detection logic; privilege escalation within an authenticated session |
| **Low** | Security misconfiguration with limited blast radius; informational leakage with no direct exploit path |

Critical and High severity issues receive priority treatment. We do not publicly disclose specific remediation timelines in advance of a patch.

---

## Safe Harbor

We will not pursue legal action against security researchers who:

- Report vulnerabilities in good faith through the channels described in this policy
- Conduct research against their own deployments or a designated test environment
- Do not access, modify, or exfiltrate real user data
- Do not disrupt live production services
- Provide us a reasonable window — at minimum 90 days — to remediate before any independent public disclosure

We consider responsible disclosure a collaborative act. Researchers acting within these bounds are partners in protecting the Sovereign Perimeter.

---

## Contact

| Channel | Address |
|---|---|
| Security advisories | GitHub Security Advisory (preferred) |
| Security email | contact@sentinul.app |

*Sentinul Security Team — Los Angeles, CA*
