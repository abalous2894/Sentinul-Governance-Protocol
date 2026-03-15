# Compliance Mapping: From Code Vulnerabilities to Regulatory Standards

**How Sentinul automatically links security issues to SOC2, HIPAA, GDPR, and PCI-DSS requirements.**

---

## 🎯 The Challenge

You find a vulnerability in your agent code. But which compliance frameworks does it violate?

```
Code Issue: "Unencrypted password stored in memory"
↓
Relevant Framework: ???
↓
Your Options:
  A) Manually research CWE database
  B) Hire compliance consultant
  C) Let Sentinul do it automatically
```

**Sentinul solves this automatically.**

---

## 🗺️ How Compliance Mapping Works

```
┌──────────────────────┐
│ Code Vulnerability   │
│  (SQL Injection)     │
└──────────┬───────────┘
           │
           ├──→ CWE ID: CWE-89
           │
           ├──→ CVSS Score: 9.8 (Critical)
           │
           ├──→ Compliance Impact Analysis:
           │    ├─ SOC2? YES - Security criteria
           │    ├─ HIPAA? NO - Not PHI-related
           │    ├─ GDPR? YES - Data protection
           │    └─ PCI? YES - Payment data risk
           │
           └──→ Output: Audit Report
                ├─ Vulnerability details
                ├─ Compliance violations
                ├─ Regulatory requirement cites
                └─ Cryptographic signature (proof)
```

---

## 📋 Compliance Framework Mapping

### SOC2 Type II

**What it covers:** Security, availability, processing integrity, confidentiality, privacy.

**Vulnerabilities that violate SOC2:**

| Vulnerability | SOC2 Control | Impact |
|---|---|---|
| SQL Injection | CC6.1 (Authorized access) | ❌ Unauthorized data access |
| Authentication bypass | CC6.2 (Authentication) | ❌ Access control failure |
| Unencrypted secrets | CC9.2 (Data encryption) | ❌ Confidentiality breach |
| Hardcoded API keys | CC6.1 + CC9.1 | ❌ Access control + secrets |
| Missing audit logs | CC6.2 + CC7.2 | ❌ Accountability failure |
| Privilege escalation | CC6.3 | ❌ Least privilege violation |

**Sentinul Example Report:**

```
Vulnerability: SQL Injection in query_agent.py:42
CWE: CWE-89
CVSS: 9.8 (Critical)

SOC2 Type II Violation: ✗ FAIL
├─ Criterion: CC6.1 - The entity restricts access to information 
│  and protected assets...
├─ Requirement: Use parameterized queries
├─ Impact: CRITICAL - Unauthorized access to all user data
└─ Remediation: Use parameterized queries (prepared statements)

Status: FAIL → Can remediate with fix in PR
```

---

### HIPAA (Health Insurance Portability & Accountability Act)

**What it covers:** Protected Health Information (PHI) confidentiality, integrity, availability.

**Vulnerabilities that violate HIPAA:**

| Vulnerability | HIPAA Rule | Impact |
|---|---|---|
| Unencrypted PHI transmission | 45 CFR 164.312(a)(2)(i) | ❌ Encryption required |
| Unauthorized PHI access | 45 CFR 164.308(a)(1) | ❌ Access control failure |
| Missing audit logs | 45 CFR 164.312(b) | ❌ Accountability gap |
| Shared credentials | 45 CFR 164.308(a)(5) | ❌ User identification |
| Weak password policy | 45 CFR 164.308(a)(5)(ii)(C) | ❌ Authentication control |
| No data backup | 45 CFR 164.308(a)(7) | ❌ Availability failure |
| Hardcoded database credentials | 45 CFR 164.312(a)(1) | ❌ Access control |

**Sentinul Example Report:**

```
Vulnerability: Unencrypted password in memory for HIPAA agent
CWE: CWE-312 (Cleartext storage)
CVSS: 8.2 (High)

HIPAA Violation: ✗ FAIL
├─ Rule: 45 CFR 164.312(a)(2)(i) - Encryption & decryption
├─ Requirement: All PHI must be encrypted at rest and in transit
├─ Impact: HIGH - PHI exposure violates HIPAA Breach Notification
└─ Remediation: Implement TLS for transmission, AES-256 for storage

Status: FAIL → Remediation available
```

---

### GDPR (General Data Protection Regulation)

**What it covers:** Personal data protection for EU residents.

**Vulnerabilities that violate GDPR:**

| Vulnerability | GDPR Article | Impact |
|---|---|---|
| No data encryption | Article 32 | ❌ Inadequate security |
| Missing consent tracking | Article 6 | ❌ Lawful basis unclear |
| No data deletion | Article 17 | ❌ Right to be forgotten |
| Unvalidated 3rd party access | Article 32 | ❌ Processing agreement needed |
| No privacy impact assessment | Article 35 | ❌ High-risk processing |
| Missing audit trail | Article 32 | ❌ Accountability gap |
| Data retention policy missing | Article 5 | ❌ Data minimization |

**Sentinul Example Report:**

```
Vulnerability: Agent sends personal data to external API without encryption
CWE: CWE-311 (Missing encryption)
CVSS: 7.5 (High)

GDPR Violation: ✗ FAIL
├─ Article 32: Integrity and confidentiality of personal data
├─ Requirement: All data transfers must be encrypted end-to-end
├─ Impact: HIGH - EU users' personal data exposed
├─ Remediation: Implement TLS encryption + signed Data Processing Agreement
└─ Evidence needed: Vendor's security certification (SOC2/ISO 27001)

Status: FAIL → Requires DPA + encryption
```

---

### PCI-DSS (Payment Card Industry Data Security Standard)

**What it covers:** Payment card data protection (Visa, Mastercard, Amex, etc).

**Vulnerabilities that violate PCI-DSS:**

| Vulnerability | PCI Requirement | Impact |
|---|---|---|
| Unencrypted payment data | 3.2 (Encryption) | ❌ Card data exposed |
| SQL Injection in payment flow | 6.5 (Code vulnerabilities) | ❌ Payment data accessible |
| Hardcoded API keys | 8.2 (User authentication) | ❌ Access control weak |
| No firewall | 1.0 (Network segmentation) | ❌ Unrestricted access |
| Default credentials | 2.1 (Security defaults) | ❌ Unauthorized access |
| Missing audit logs | 10.1 (Audit trails) | ❌ Accountability gap |
| No vulnerability scanning | 11.2 (Regular scanning) | ❌ Compliance failure |

**Sentinul Example Report:**

```
Vulnerability: Credit card numbers logged to plaintext file
CWE: CWE-532 (Insertion of sensitive data)
CVSS: 9.1 (Critical)

PCI-DSS Violation: ✗ FAIL
├─ Requirement: 3.1 - Render PAN unreadable
├─ Requirement: 3.2.1 - Encryption required
├─ Requirement: 10.1 - Protect logs from unauthorized access
├─ Impact: CRITICAL - PCI audit failure, payment processing revoked
└─ Remediation:
    1. Delete all logs with card numbers
    2. Implement card tokenization (don't store raw PAN)
    3. Encrypt logs with AES-256
    4. Restrict log file access to auth users only

Status: FAIL → Critical remediation needed
```

---

## 📊 Sentinul's Compliance Mapping Engine

### Behind the Scenes

```javascript
// Pseudocode: How Sentinul maps vulnerabilities

function mapVulnerabilityToCompliance(vulnerability) {
  const cweId = vulnerability.cwe;  // CWE-89
  
  const complianceMap = {
    "CWE-89": {  // SQL Injection
      soc2: { violated: true, criterion: "CC6.1", severity: "CRITICAL" },
      hipaa: { violated: true, rule: "45 CFR 164.312(a)", severity: "CRITICAL" },
      gdpr: { violated: true, article: 32, severity: "HIGH" },
      pci: { violated: true, requirement: "6.5.1", severity: "CRITICAL" },
    },
    "CWE-352": {  // CSRF
      soc2: { violated: true, criterion: "CC6.2", severity: "HIGH" },
      hipaa: { violated: false },  // Not directly related to CSRF
      gdpr: { violated: false },
      pci: { violated: true, requirement: "6.5.9", severity: "HIGH" },
    },
    // ... hundreds more mappings
  };
  
  return {
    soc2: complianceMap[cweId].soc2,
    hipaa: complianceMap[cweId].hipaa,
    gdpr: complianceMap[cweId].gdpr,
    pci: complianceMap[cweId].pci,
  };
}

// Output:
{
  soc2: { violated: true, criterion: "CC6.1", severity: "CRITICAL" },
  hipaa: { violated: true, rule: "45 CFR 164.312(a)", severity: "CRITICAL" },
  gdpr: { violated: true, article: 32, severity: "HIGH" },
  pci: { violated: true, requirement: "6.5.1", severity: "CRITICAL" },
}
```

---

## 📄 Cryptographically Signed Audit Reports

When you run Core 2 and all tests pass, Sentinul generates a **signed PDF audit report**.

### What's Inside

```
┌─────────────────────────────────────────┐
│  Sentinul Compliance Audit Report       │
│  Generated: March 14, 2026 18:45 UTC    │
├─────────────────────────────────────────┤
│                                         │
│  Project: crewai-data-team              │
│  Framework: CrewAI v0.25.1              │
│  Scan ID: scan_abc123xyz789             │
│                                         │
│  ═════════════════════════════════════  │
│  EXECUTIVE SUMMARY                      │
│  ═════════════════════════════════════  │
│                                         │
│  Vulnerabilities Found: 3               │
│  ├─ Critical: 0                         │
│  ├─ High: 1                             │
│  └─ Medium: 2                           │
│                                         │
│  All Vulnerabilities: REMEDIATED ✓      │
│  Compliance Status: PASS ✓              │
│                                         │
│  ═════════════════════════════════════  │
│  COMPLIANCE MAPPING                     │
│  ═════════════════════════════════════  │
│                                         │
│  SOC2 Type II:        ✓ COMPLIANT       │
│  HIPAA:               ✓ COMPLIANT       │
│  GDPR:                ✓ COMPLIANT       │
│  PCI-DSS:             ✓ COMPLIANT       │
│                                         │
│  ═════════════════════════════════════  │
│  DETAILED FINDINGS                      │
│  ═════════════════════════════════════  │
│                                         │
│  1. SQL Injection in database_agent.js  │
│     Severity: HIGH                      │
│     CWE: CWE-89                         │
│     Status: REMEDIATED                  │
│     ├─ SOC2: Criterion CC6.1            │
│     ├─ HIPAA: 45 CFR 164.312(a)         │
│     ├─ GDPR: Article 32                 │
│     └─ PCI: Requirement 6.5.1           │
│                                         │
│  2. Missing Input Validation...         │
│  3. Weak Password Policy...             │
│                                         │
│  ═════════════════════════════════════  │
│  DIGITAL TWIN VERIFICATION              │
│  ═════════════════════════════════════  │
│                                         │
│  All proposed fixes tested in isolated  │
│  sandbox environment:                   │
│                                         │
│  ✓ Test 1: Normal execution             │
│  ✓ Test 2: SQL Injection payload        │
│  ✓ Test 3: Jailbreak attempt            │
│  ✓ Test 4: Resource limits              │
│                                         │
│  Result: ALL TESTS PASSED               │
│                                         │
│  ═════════════════════════════════════  │
│  SIGNATURE & VERIFICATION               │
│  ═════════════════════════════════════  │
│                                         │
│  Signed by: Sentinul Security Engine    │
│  Timestamp: 2026-03-14T18:45:00Z        │
│  Signature: SHA256[a1b2c3d4e5f6...]    │
│  Validity: Cryptographically verified   │
│                                         │
│  ✓ This report is authentic and has     │
│    not been modified since signing.     │
│                                         │
│  ═════════════════════════════════════  │
│  © 2026 Sentinul, Inc.                  │
│  https://sentinul.app                   │
│  audit@sentinul.app                     │
└─────────────────────────────────────────┘
```

### Why Signed Reports Matter

| Use Case | Value |
|----------|-------|
| **Audit Defense** | "Here's proof our code was verified" |
| **Insurance** | Claim shows due diligence |
| **Investor Relations** | Demonstrates security rigor |
| **Compliance Filing** | Evidence for regulators |
| **Client Trust** | "We're SOC2-compliant" |

---

## 🎯 Real-World Example: CrewAI for Healthcare

### Scenario

You're building a **HIPAA-regulated agent** that:
- Collects patient symptoms
- Generates diagnostic suggestions
- Stores notes in database

### Your Code

```python
# ❌ VULNERABLE: Logs PHI
import logging

def diagnose_patient(patient_id: int, symptoms: str):
    logger.info(f"Patient {patient_id} symptoms: {symptoms}")  # PHI logged!
    
    # ❌ No encryption
    db.store({
        "patient_id": patient_id,
        "symptoms": symptoms,  # Plaintext!
        "diagnosis": "flu",
    })
    
    return "See doctor for flu treatment"
```

### Sentinul Analysis

```
sentinul verify src/healthcare_agent.py --api-key YOUR_KEY

Result: COMPLIANCE FAILURE

Finding 1: HIPAA Breach
├─ CWE: CWE-532 (Sensitive data in logs)
├─ HIPAA Violation: 45 CFR 164.312(b) - Audit controls
├─ Impact: CRITICAL - PHI exposure
└─ Remediation: Remove PHI from logs

Finding 2: Missing Encryption
├─ CWE: CWE-311 (Missing encryption)
├─ HIPAA Violation: 45 CFR 164.312(a)(2)(i)
├─ Impact: CRITICAL - PHI in plaintext
└─ Remediation: Encrypt data at rest with AES-256

Status: FAIL - Not HIPAA compliant
```

### Your Fix

```python
# ✅ SECURE: Encrypt & don't log PHI
import logging
from cryptography.fernet import Fernet

def diagnose_patient(patient_id: int, symptoms: str):
    # No PHI in logs - only log the action
    logger.info(f"Patient consultation completed")  # ✓ HIPAA-safe
    
    # Encrypt before storage
    cipher = Fernet(ENCRYPTION_KEY)
    encrypted_symptoms = cipher.encrypt(symptoms.encode())
    
    db.store({
        "patient_id": patient_id,
        "symptoms_encrypted": encrypted_symptoms,  # ✓ Encrypted
        "diagnosis_encrypted": cipher.encrypt("flu".encode()),
    })
    
    return "See doctor for flu treatment"
```

### Sentinul Verification

```
sentinul verify src/healthcare_agent.py --api-key YOUR_KEY

Result: COMPLIANCE VERIFIED ✓

Finding 1: HIPAA Encryption
├─ CWE: CWE-311
├─ Status: REMEDIATED ✓
├─ Digital Twin Test: Passed
└─ Compliance: ✓ PASS

Finding 2: PHI in Logs
├─ CWE: CWE-532
├─ Status: REMEDIATED ✓
├─ Digital Twin Test: Passed
└─ Compliance: ✓ PASS

Digital Twin Results:
├─ Normal operation: ✓ PASS
├─ Encryption verification: ✓ PASS (AES-256)
├─ Log sanitization: ✓ PASS (no PHI)
└─ Access control: ✓ PASS

Final Status: ✓ HIPAA COMPLIANT

Audit Report Generated: audit_2026-03-14.pdf
Signed: SHA256 verified ✓
```

---

## 📋 Compliance Checklist

Use this before deploying:

```
SOC2 Type II Pre-Deployment
───────────────────────────
□ Run: sentinul verify src/
□ All Critical/High issues remediated
□ Digital Twin tests passed
□ Audit log collection enabled
□ Access controls configured
□ Encryption configured (at rest & in transit)
□ Download signed audit report
□ Submit to SOC2 auditor

HIPAA Pre-Deployment
────────────────────
□ No PHI in logs
□ PHI encrypted at rest (AES-256)
□ PHI encrypted in transit (TLS 1.3)
□ Access controls per role
□ Audit trail enabled
□ Sentinul compliance report attached
□ Privacy Impact Assessment done
□ Business Associate Agreement signed

GDPR Pre-Deployment
───────────────────
□ Data processing agreement for 3rd parties
□ Encryption configured
□ Data retention policy set
□ Consent tracking active
□ Right to deletion implemented
□ Privacy notice updated
□ DPA signed with any vendors
□ Sentinul audit report ready

PCI-DSS Pre-Deployment
──────────────────────
□ No payment card data stored
□ PCI scanning quarterly complete
□ Firewall rules documented
□ No default credentials
□ Encrypted transmissions only
□ Audit logs enabled
□ Encryption keys rotated
□ Sentinul report attached
```

---

## 📚 Resources

- **[Twin-Core Protocol](./TWIN-CORE-PROTOCOL.md)** — How verification works
- **[Multi-Agent Security](./MULTI-AGENT-SECURITY.md)** — Framework-specific guide
- **[Getting Started](./GETTING-STARTED.md)** — First scan
- **SOC2 Docs:** https://www.aicpa.org/interestareas/informationmanagement/sodp.html
- **HIPAA Docs:** https://www.hhs.gov/hipaa/
- **GDPR Docs:** https://gdpr-info.eu/
- **PCI Docs:** https://www.pcisecuritystandards.org/

---

*Compliance Mapping: From Code to Regulations.*  
*V4 Production Hardened | March 14, 2026*
