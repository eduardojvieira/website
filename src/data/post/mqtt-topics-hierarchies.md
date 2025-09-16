---
publishDate: 2025-04-14T00:00:00Z
author: Eduardo Vieira
title: 'Designing MQTT Topic Hierarchies for Smart Factories'
excerpt: 'Structure MQTT topics to keep data organized, secure, and scalable across multiple plants, lines, and applications.'
image: '~/assets/images/industrial-automation.jpg'
category: IIoT
tags:
  - mqtt
  - topics
metadata:
  canonical: https://eduardovieira.dev/mqtt-topics-hierarchies
---

# Designing MQTT Topic Hierarchies for Smart Factories

A thoughtful topic hierarchy turns MQTT into a reliable backbone for industrial data. Poor design, on the other hand, creates confusion and security risks. These are the conventions I use when structuring topics for multi-site deployments.

## 1. Establish a Naming Standard

A typical format I adopt is:

```
<region>/<plant>/<area>/<line>/<asset>/<context>
```

Example: `na/mx-mty/packaging/line01/capper/process/torque`

## 2. Separate Data Domains

- `process` for telemetry and KPIs.
- `alarms` for events requiring human action.
- `commands` for control instructions.
- `_sys` for health and diagnostics.

Keeping domains distinct simplifies access control and filtering.

## 3. Use Wildcards Strategically

- `+` matches one level; `#` matches remaining levels.
- Grant permissions using wildcards, e.g., maintenance has read access to `na/+/+/+/+/process/#` but write access only to specific command topics.

## 4. Versioning and Schema Updates

- Include `v1`, `v2` in the hierarchy when payload structures change.
- Support dual topics during migration to avoid breaking consumers.

## 5. Multi-Language Considerations

- Use English for topic names to maintain consistency across global teams.
- Provide localized payload fields if necessary rather than duplicating topics.

## 6. Example Topic Map

| Topic                                                  | Purpose             |
| ------------------------------------------------------ | ------------------- |
| `na/mx-mty/packaging/line01/capper/process/oee`        | OEE metrics         |
| `na/mx-mty/packaging/line01/capper/alarms/high_torque` | Alarm notifications |
| `na/mx-mty/packaging/line01/capper/commands/set_speed` | Command topic       |
| `na/mx-mty/packaging/line01/capper/_sys/heartbeat`     | Gateway heartbeat   |

## 7. Security and Governance

- Implement ACLs that map user roles to topic patterns.
- Document topic ownership so teams know who maintains each namespace.
- Audit subscriptions and publishes regularly to spot anomalies.

## 8. Scaling Across Sites

- Reserve the first level for region or business unit to avoid collisions (`na`, `latam`, `emea`).
- Use consistent line and asset identifiers across MES, CMMS, and MQTT to simplify data correlation.

MQTT topic hierarchies are more than naming conventions—they’re the foundation of a manageable and secure IIoT ecosystem. Invest time upfront to design them well, and every integration becomes easier.
