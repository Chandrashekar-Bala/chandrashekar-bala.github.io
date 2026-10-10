# Chandrashekar Bala — 0xCB Cybersecurity Portfolio

> **Cybersecurity Researcher · Security Engineering · VAPT · Offensive & Defensive Security**

A professional cybersecurity research and engineering portfolio documenting technical assessments, security investigations, systems-level work, practical labs, and selected projects.

**Portfolio:** https://chandrashekar-bala.github.io/  
**GitHub:** https://github.com/Chandrashekar-Bala  
**LinkedIn:** https://www.linkedin.com/

The site is designed as an interactive security research record rather than a conventional developer landing page. Its case files and domain dossiers connect methods, evidence, technical decisions, and remediation-oriented outcomes.

---

## Professional focus

My work centers on understanding how systems behave, validating how weaknesses can be exploited, investigating technical evidence, and translating findings into practical security improvements.

Core areas include:

- Vulnerability Assessment & Penetration Testing (VAPT)
- Web and application security
- Network and wireless security
- Offensive security and attack-path analysis
- Defensive security, investigation, and incident-analysis workflows
- Threat intelligence, OSINT, and adversary research
- Malware analysis and digital forensics
- Exploit and systems research
- Linux, C, and security engineering
- Python- and Bash-based automation
- LLM application and AI-agent security assessment topics

The portfolio distinguishes hands-on project work, controlled lab research, formal credentials, and simulations. It does not present lab exercises as production incidents or job simulations as employment.

---

## Featured technical work

### 1. Mediroza General Hospital — Authorized Black-Box Web Application Security Assessment

An authorized black-box assessment of the in-scope web application, covering reconnaissance, service enumeration, manual validation, vulnerability analysis, attack-path reconstruction, evidence collection, and impact assessment.

The documented assessment contains eight findings involving:

- Directory indexing and exposed resources
- Internal database-backup exposure
- SQL injection and authentication bypass
- Verbose database error disclosure
- Sensitive report retrieval following authentication bypass
- Predictable report-storage paths
- Error-log disclosure
- Technology fingerprinting

Findings were organized around technical evidence, root cause, impact, CWE/CVSS context, remediation, and retest considerations. Sensitive patient documents, credentials, personal information, and raw database contents are excluded from the public portfolio.

**Public case record:**  
https://github.com/Chandrashekar-Bala/Independent-Web-Application-Security-Assessment-Mediroza-General-Hospital

### 2. RTL8812BU / RTL8822BU Linux Driver Modernization

A systems-level engineering project focused on Linux wireless-driver compatibility with newer kernel environments.

Work included:

- Kernel-facing C source analysis
- Linux kernel API and compiler/toolchain compatibility investigation
- Module-build troubleshooting and conditional compilation
- Git-based source management
- Targeted changes across 13 source files
- Build validation and testing on RTL8812BU-based hardware
- Investigation of wireless-security testing requirements and workflows

**Repository:**  
https://github.com/Chandrashekar-Bala/RTL8812BU-Linux-7.0.12

### 3. Network Reconnaissance & Attack-Surface Analysis

Structured reconnaissance and attack-surface research involving WHOIS, DNS enumeration, certificate discovery, web fingerprinting, HTTP/HTTPS and TLS analysis, Nmap/NSE, service and version enumeration, OSINT, and preservation of scan artifacts.

A central principle is to distinguish directly observed evidence from hypotheses and to use reconnaissance results to build a defensible view of the target attack surface.

### 4. Web Application Security Labs

Practical work across web application testing, including SQL injection, cross-site scripting, authentication and authorization, access control, session behavior, HTTP request/response analysis, and OWASP testing methodology. The portfolio includes work with PortSwigger Web Security Academy, Burp Suite, and OWASP ZAP.

### 5. Malware, Forensics & Exploit Research

Research and controlled exercises involving suspicious-file investigation, static and dynamic analysis, binary inspection, Windows artifacts, filesystem and disk evidence, memory and execution analysis, GDB, stack and control-flow investigation, and buffer-overflow research.

These are presented as research and lab work where appropriate—not as claims of production incident response.

---

## Research and capability areas

| Domain | Scope |
|---|---|
| Web & Application Security | SQL injection, XSS, authentication, authorization, access control, HTTP analysis, OWASP methodology |
| Network & Wireless Security | TCP/IP, DNS, DHCP, routing, subnetting, reconnaissance, packet capture, traffic analysis, wireless testing |
| Offensive Security | Reconnaissance, enumeration, vulnerability validation, controlled exploitation, attack-path analysis, privilege escalation research |
| Defensive Security | Security monitoring, log and alert analysis, IOC investigation, incident-analysis workflows, detection opportunities |
| Threat Intelligence & OSINT | Infrastructure analysis, domains and IPs, threat reporting, TTP analysis, MITRE ATT&CK |
| Malware Analysis & DFIR | Static/dynamic analysis exercises, binary investigation, Windows artifacts, filesystem and disk evidence, indicator extraction |
| Exploit & Systems Research | C, Linux, GDB, stack and memory analysis, control-flow investigation, controlled proof-of-concept work |
| Security Engineering | Linux, kernel-facing C, driver compatibility, GCC, Git, Python, Bash, troubleshooting and security tooling |
| LLM / AI-Agent Security | Credential-backed study of LLM application and agent security assessment topics, including prompt injection, agent/tool trust boundaries, guardrails, and supply-chain risks |

---

## Credentials

The interactive Credentials section provides a separate dossier for each credential, distinguishing the program's coverage or the exam's assessed scope from the practical skills demonstrated elsewhere in the portfolio.

- **Certified LLM Security Expert (CLLMSE)** — Red Team Leaders; issued October 10, 2026. The credential confirms successful exam completion. The dossier describes the exam's stated subject areas and links to the issuer's verification page.
- **Google Cybersecurity Professional Certificate** — completed February 2026.
- **Tata Cybersecurity Analyst Job Simulation** — Forage; identified as a job simulation.
- **Introduction to Blockchain and Web3** — edX.
- **Natural Language Processing Specialization** — Coursera.
- **Java Full Stack Developer Training** — CipherSchools.
- **Google Cloud Facilitator Program**.

**CLLMSE verification:**  
https://courses.redteamleaders.com/exam-completion/9a89fd8fba946c5f

**CLLMSE handbook:**  
https://drive.google.com/file/d/1fLN1ZHq5HED2GtWp6LKFALaD9Hbk0tnG/view?usp=sharing

Credentials are not used to imply that all covered subjects represent professional employment experience. Practical project claims are documented separately.

---

## Technical stack

| Area | Technologies and methods |
|---|---|
| Web Security | Burp Suite, OWASP ZAP, HTTP/HTTPS |
| Network Security | Nmap/NSE, Wireshark, DNS tooling, TLS inspection |
| Exploit & Systems Research | C, GDB, Linux, controlled proof-of-concept development |
| Wireless | Aircrack-ng, Wireshark, wireless-driver research |
| Malware / Forensics | Ghidra, Volatility, Windows artifacts, binary and filesystem analysis |
| Threat Intelligence | OSINT, infrastructure analysis, MITRE ATT&CK |
| Programming & Automation | Python, Bash, C, SQL |
| Systems & Engineering | Linux, Kali Linux, Windows, GCC, Git, kernel module build workflows |
| LLM Security Topics | Prompt-injection analysis, agent/tool boundaries, guardrail validation, AI supply-chain risk |

Tools are listed as part of the relevant research or engineering workflows; their presence does not imply expert-level mastery of every feature.

---

## How the portfolio works

The website is a lightweight static site with interactive dossiers and case-file navigation.

```text
.
├── index.html
├── style.css
├── script.js
├── profile.jpg
├── 404.html
├── .nojekyll
├── README.md
└── assets/
    ├── resume.pdf
    └── cllmse-certificate.pdf
```

Key interface features include:

- Security Command Center and domain dossiers
- Research Environment dossiers
- Case studies and technical case files
- Credential cards with detailed popups
- Start a Conversation with editable, topic-specific message drafts
- Referral and sharing workflow
- Command palette and keyboard navigation
- Responsive layout, theme support, and reduced-motion considerations
- Resume access, project links, and credential verification

The contact composer prepares a draft for the visitor to review and send through their own email client. It does not silently submit or transmit the message.

---

## Working method

**Discover → Validate → Investigate → Correlate → Remediate → Verify**

The approach prioritizes reproducible evidence, manual validation, clear attack-path reasoning, impact assessment, and actionable recommendations. Where a result is based on a lab or controlled exercise, it is presented as such.

## Evidence and responsible disclosure

The public portfolio intentionally excludes passwords, private patient documents, personal identifiers, raw sensitive database records, restricted assessment evidence, and other confidential material. Public case records focus on the methodology, technical finding, impact, and remediation rather than exposing the affected data.

Security testing is performed only within authorized scopes or controlled environments.

---

## Implementation

The portfolio is built with semantic HTML, custom CSS, and vanilla JavaScript, and is intended for static hosting through GitHub Pages. It does not require an application server or external form-processing backend.

Designed, developed, written, and maintained by **Chandrashekar Bala**.
