---
publishDate: 2025-04-26T00:00:00Z
author: Eduardo Vieira
title: 'Securing Modbus Deployments'
excerpt: 'Best practices to protect Modbus networks, from segmentation and encryption to monitoring and incident response.'
image: '~/assets/images/modbus.jpg'
category: Industrial Automation
tags:
  - modbus
  - cybersecurity
metadata:
  canonical: https://eduardovieira.dev/modbus-security-considerations
---

# Securing Modbus Deployments

Modbus was created in an era before cybersecurity threats. Yet it still powers millions of devices. Securing Modbus environments requires layered defenses that respect operational constraints. Here’s how I approach it.

## 1. Segment and Contain

- Place Modbus devices on dedicated OT VLANs or physical segments.
- Use industrial firewalls to enforce protocol filtering and connection limits.
- Create DMZ zones for gateways that bridge Modbus to enterprise networks.

## 2. Control Access

- Disable unused function codes on PLCs and RTUs (e.g., block writes if only reads are required).
- Implement role-based access in gateways; only authorized accounts can issue write commands.
- Replace shared credentials with individual logins tied to an identity provider.

## 3. Encrypt Where Possible

- Native Modbus lacks encryption, but you can encapsulate traffic inside secure tunnels (TLS VPN, IPsec).
- Prefer MQTT Sparkplug B or OPC UA for data leaving the OT network, using Modbus only at the edge.
- Use secure jump hosts for remote support, with multi-factor authentication and session logging.

## 4. Monitor Continuously

- Deploy passive network monitoring tools to detect anomalies (unexpected function codes, broadcast storms).
- Log all writes and configuration changes with timestamps and operator IDs.
- Set thresholds for communication failures; repeated CRC errors can signal tampering or noise.

## 5. Harden Devices

- Update firmware to patch known vulnerabilities.
- Disable programming ports or secure them with keys when not in use.
- Implement whitelisting on edge computers to prevent unauthorized applications.

## 6. Incident Response Plan

- Define procedures for isolating compromised devices while keeping production safe.
- Maintain offline backups of PLC/RTU configurations.
- Conduct tabletop exercises with OT and IT teams to rehearse response steps.

## 7. Vendor Coordination

Work with OEMs to understand their security roadmaps. Request vulnerability disclosures, patch timelines, and hardening guides.

Modbus will remain in our plants for years. By combining segmentation, strict access control, secure tunneling, and vigilant monitoring, you can protect these legacy networks without sacrificing uptime.
