# Octodemo GHAS + Microsoft Defender for Cloud (DCSPM) Demo

This repository demonstrates the end-to-end integration between **GitHub Advanced Security (GHAS)** and **Microsoft Defender for Cloud (Defender CSPM / DevOps Security)**:

1. **Code Scanning (CodeQL) & Copilot Autofix**:
   - SQL Injection (`/api/orders` in `src/app.js`)
   - Command Injection (`/api/diagnostics/ping` in `src/app.js`)
   - Reflected XSS (`/search` in `src/app.js`)
   - Path Traversal (`/api/invoice` in `src/app.js`)
2. **Dependabot Alerts & Security Updates**:
   - Vulnerable transitive and direct dependencies in `package.json` (`lodash@4.17.4`, `minimist@1.2.0`, `axios@0.21.1`, `serialize-javascript@2.1.2`)
3. **Secret Scanning & Push Protection**:
   - Exposed credential patterns in `config/production.env` and push protection blocking on commits/PRs
4. **Microsoft Defender for Cloud (DCSPM)**:
   - Onboarded via the `Tamasandbox26` GitHub Security Connector (`/resourceGroups/mdc/providers/Microsoft.Security/securityConnectors/Tamasandbox26`)
   - Surfaces CodeQL, Dependabot, Secret Scanning, and Container posture findings directly in Azure Defender for Cloud Recommendations and Cloud Security Explorer.
