---
publishDate: 2025-05-09T00:00:00Z
author: Eduardo Vieira
title: 'Building a Tank Monitoring SCADA with ThingsBoard'
excerpt: 'Step-by-step approach to modeling tanks, configuring telemetry, and delivering operator dashboards using ThingsBoard.'
image: '~/assets/images/thingsboard.jpg'
category: IIoT
tags:
  - thingsboard
  - scada
metadata:
  canonical: https://eduardovieira.dev/thingsboard-scada-tank-monitoring
---

# Building a Tank Monitoring SCADA with ThingsBoard

Monitoring storage tanks requires reliable instrumentation, intuitive dashboards, and robust alarms. Here’s how I build a ThingsBoard-based solution that operations teams trust.

## 1. Instrumentation and Data Capture

- Connect level transmitters and temperature probes to PLCs or edge devices.
- Publish telemetry to ThingsBoard via MQTT or HTTP using JSON payloads:

```json
{
  "tank_id": "TK-104",
  "level_percent": 78.2,
  "temperature_c": 42.5,
  "volume_liters": 35000,
  "timestamp": "2025-05-09T12:45:00Z"
}
```

## 2. Asset Hierarchy

- Create an asset for each facility, then define tank entities with attributes (capacity, product type, safe ranges).
- Store maintenance contacts and inspection schedules as server-side attributes.

## 3. Dashboard Design

- Combine level gauges, trend charts, and alarm tables.
- Add floor plan overlays showing tank status at a glance.
- Provide quick filters (by product, temperature range) so operators find issues fast.

## 4. Alarm Configuration

- Set thresholds for high/low levels, rapid changes, and temperature deviations.
- Configure escalation: first notify operators, then maintenance if unresolved.
- Log acknowledgements and resolution notes directly in ThingsBoard.

## 5. Reporting and Analytics

- Use widgets to calculate dwell time within optimal ranges.
- Export telemetry to data lakes for forecasting and inventory reconciliation.
- Schedule automated PDF reports for daily shift handover.

## 6. Mobile Access and Security

- Enable responsive dashboards for tablets and smartphones used on the plant floor.
- Implement role-based access to ensure only authorized staff can acknowledge alarms or change setpoints.
- Use TLS certificates and SSO for secure authentication.

## 7. Integration with Operations

- Push work orders to the CMMS when tank levels cross critical thresholds.
- Share data with ERP systems to support production planning.
- Provide APIs for third-party logistics partners to view inventory status securely.

With a solid instrumentation backbone and thoughtful ThingsBoard configuration, tank monitoring becomes proactive rather than reactive. Operators gain real-time visibility and actionable insights to keep production flowing smoothly.
