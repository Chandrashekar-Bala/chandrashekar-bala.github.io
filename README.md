# Chandrashekar Bala — Cybersecurity Portfolio

> Cybersecurity Researcher · Offensive Security · VAPT · Security Engineering

A professional cybersecurity portfolio built to document hands-on security research, assessments, engineering projects, technical capabilities, and selected security work.

The portfolio is designed as a security research and engineering platform rather than a conventional developer profile.

---

## Overview

My work focuses on understanding how systems behave, how they can be attacked, how weaknesses can be validated, and how those findings can be translated into stronger security.

The portfolio brings together work across:

- Offensive Security
- Vulnerability Assessment & Penetration Testing
- Web Application Security
- Network & Wireless Security
- Security Operations
- Threat Intelligence & Adversary Research
- Malware Analysis
- Digital Forensics
- Exploit Research
- Security Engineering
- Linux & Systems Research
- AI / ML Security

The emphasis is on practical investigation, technical evidence, attack-path reasoning, and engineering-oriented security analysis.

---

## Featured Work

### Mediroza General Hospital — Authorized Black-Box Web Application Security Assessment

An authorized black-box web application security assessment involving reconnaissance, service enumeration, manual validation, vulnerability analysis, attack-path reconstruction, evidence collection, and impact analysis.

The assessment documented multiple security findings involving:

- Directory exposure
- Internal database-backup exposure
- SQL injection
- Authentication bypass
- Verbose database error disclosure
- Sensitive report retrieval
- Predictable storage paths
- Error-log disclosure
- Technology fingerprinting

The work was approached as an evidence-driven security assessment, with findings documented using technical impact, CWE/CVSS context, root cause, remediation, and retest considerations.

---

### RTL8812BU / RTL8822BU Linux Driver Modernization

A systems-level security engineering project focused on modernizing an RTL8812BU/RTL8822BU Linux wireless driver for newer kernel environments.

The work involved:

- Kernel-facing C analysis
- Linux kernel API compatibility
- GCC/compiler compatibility
- Kernel module build troubleshooting
- Conditional compilation
- Git-based source management
- Targeted changes across 13 source files
- Real-hardware validation
- Wireless security testing

The resulting driver work was validated against real RTL8812BU hardware with wireless security workflows including monitor mode, packet injection, packet capture, Wireshark, and Aircrack-ng.

---

### Network Reconnaissance & Attack-Surface Analysis

Structured reconnaissance and attack-surface research involving:

- WHOIS
- DNS enumeration
- Certificate discovery
- Web fingerprinting
- HTTP/HTTPS analysis
- TLS inspection
- Nmap/NSE
- Service and version enumeration
- OSINT
- Evidence-preserving scan artifacts

A key focus is distinguishing observed evidence from assumptions and using reconnaissance to build a defensible picture of the target attack surface.

---

## Security Research Areas

### Web Application Security

Hands-on security testing involving:

- SQL Injection
- Cross-Site Scripting
- Authentication
- Authorization
- Access Control
- Session behavior
- HTTP request/response analysis
- OWASP Top 10
- Burp Suite
- OWASP ZAP

### Network & Wireless Security

Research and testing involving:

- TCP/IP
- DNS
- DHCP
- Routing
- Switching
- Subnetting
- CIDR
- Network reconnaissance
- Packet capture
- Traffic analysis
- Wireless security
- Monitor mode
- Packet injection

### Threat Intelligence

Research involving:

- OSINT
- Threat-report analysis
- Infrastructure analysis
- Domains and IP addresses
- Indicators
- TTP analysis
- Adversary research
- MITRE ATT&CK

### Malware & Digital Forensics

Research involving:

- Static analysis
- Dynamic analysis
- Suspicious-file investigation
- Binary analysis
- Windows registry artifacts
- Filesystem activity
- Disk evidence
- Memory analysis
- Execution behavior
- Indicator extraction

### Exploit Research

Research involving:

- C
- Linux
- GDB
- Stack analysis
- Memory analysis
- Control-flow investigation
- Buffer-overflow research
- Proof-of-concept development
- Controlled exploitation

### Security Engineering

Engineering work involving:

- Linux
- Kernel-facing C
- Linux kernel compatibility
- Wireless driver engineering
- GCC
- Git
- Python
- Bash
- Security automation
- Technical troubleshooting

---

## Technical Stack

| Area | Technologies |
|---|---|
| Web Security | Burp Suite, OWASP ZAP, HTTP/HTTPS |
| Network Security | Nmap, Wireshark, DNS tooling |
| Exploitation | Metasploit, GDB |
| Wireless | Aircrack-ng, Wireshark |
| Malware / Forensics | Ghidra, Volatility, GDB |
| Threat Intelligence | MITRE ATT&CK, OSINT |
| Programming | Python, Bash, C, SQL |
| Systems | Linux, Kali Linux, Windows, GCC |
| Engineering | Git, Linux kernel headers, kernel build workflows |

---

## Portfolio Architecture

The portfolio is intentionally implemented as a lightweight static website.

```text
.
├── index.html
├── style.css
├── script.js
├── profile.jpg
└── assets/
    ├── resume
    ├── project assets
    ├── case-study material
    └── supporting resources
