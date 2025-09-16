---
publishDate: 2025-04-12T00:00:00Z
author: Eduardo Vieira
title: 'Industrial Cybersecurity Retrofit Checklist'
excerpt: 'Practical steps to harden existing industrial automation systems without shutting down production.'
image: '~/assets/images/industrial-automation.jpg'
category: Industrial Automation
tags:
  - cybersecurity
  - industrial
  - ot security
metadata:
  canonical: https://eduardovieira.dev/industrial-cybersecurity-retrofit
---

# Industrial Cybersecurity Retrofit Checklist

Many plants run mission-critical processes on legacy PLCs and HMIs with little or no security. Retrofitting protections without stopping production is possible if you tackle it methodically. This checklist captures the steps I follow during assessments and remediation projects.

## 1. Assess the Current State

- **Network Topology:** Document all switches, firewalls, remote access paths, and unmanaged hubs.
- **Asset Inventory:** Identify firmware versions, default passwords, and outdated services.
- **Threat Modeling:** Map potential attack paths (USB, VPN, wireless, supply chain).

## 2. Segment the Network

1. Establish a dedicated OT zone with firewalls enforcing strict allowlists.
2. Create DMZ layers for historians, patch servers, and remote support tools.
3. Use VLANs and ACLs to separate production lines or critical processes.

## 3. Harden Endpoints

- Disable unused services and ports on PLCs, HMIs, and gateways.
- Change default credentials and enforce strong password policies.
- Apply firmware updates and security patches aligned with vendor recommendations.
- Add endpoint protection to engineering workstations (application whitelisting, USB control).

## 4. Secure Remote Access

- Replace shared credentials with individual accounts tied to identity providers.
- Implement multi-factor authentication and session recording for vendors.
- Prefer jump servers with audited access rather than direct VPN into OT.

## 5. Monitor and Respond

- Deploy passive network monitoring (e.g., Nozomi, Claroty, Zeek) to detect anomalies.
- Set up log aggregation and alerting for PLC program changes or unauthorized writes.
- Define incident response playbooks that include roles, communication channels, and escalation paths.

## 6. Train and Govern

- Conduct cybersecurity awareness sessions tailored to maintenance and operators.
- Establish change management processes for firmware updates and network changes.
- Schedule regular tabletop exercises to validate response readiness.

## 7. Document and Iterate

- Maintain updated architecture diagrams, inventories, and risk registers.
- Align the program with standards such as IEC 62443 or NIST 800-82.
- Review controls quarterly; emerging threats require ongoing adjustments.

## Quick Win Priorities

1. Remove direct internet access from OT machines.
2. Implement firewall rules restricting traffic to required protocols/ports.
3. Enforce MFA on remote access.
4. Backup PLC/HMI programs securely and test restoration procedures.

Retrofitting cybersecurity is a journey, but disciplined steps can reduce risk dramatically without halting production. Start with visibility, enforce segmentation, and create a culture where security is part of daily operations.
