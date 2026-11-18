# Octodemo GHAS + Microsoft Defender for Cloud (DCSPM) Demo

This repository demonstrates the integration between **GitHub Advanced Security (GHAS)** and **Microsoft Defender for Cloud (Defender CSPM / DevOps Security)**.

The original examples below are **scan-only**. Do not execute or deploy them. The `Publish private demo runtime` workflow builds only `runtime/` and publishes a single Linux/amd64 image manifest. For deployment, substitute the full ACR `repository@sha256:...` for `__RUNTIME_IMAGE_BY_DIGEST__` in `k8s/runtime.yaml`. The runtime has no Kubernetes Service and listens only on loopback.

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
