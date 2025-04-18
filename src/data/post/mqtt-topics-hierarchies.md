---
publishDate: 2025-04-30T00:00:00Z
author: Eduardo Vieira
title: "MQTT Topics and Hierarchies: Best Practices for IIoT"
excerpt: "How to design scalable, clear, and secure MQTT topics for industrial environments."
image: '~/assets/images/mqtt-topics-hierarchies.jpg'
category: IIoT
tags:
  - mqtt
  - topics
  - hierarchies
metadata:
  canonical: https://eduardovieira.dev/mqtt-topics-hierarchies
---

# MQTT Topics and Hierarchies: Best Practices for IIoT

In complex industrial environments, good MQTT topic design is key to the scalability and maintainability of your architecture.

## Hierarchy Structure
- Levels are separated by `/` and define logical segments.
  - Example: `plant/area1/machine4/sensor/temperature`
- Start with a global prefix (`plant`, `site`, `client`) to segment large deployments.

## Naming Conventions
- Use readable names, without spaces or special characters.
- Prefer lowercase and underscores: `sensor_temperature` instead of `SensorTemp`.
- Define standards within your team and document them in the repository.

## Using Wildcards
- `+` (single-level wildcard): matches one level.
  - `plant/+/machine4/#` captures `area1/machine4`, `area2/machine4`.
- `#` (multi-level wildcard): matches all remaining levels.
  - `plant/area1/#` captures everything under `area1`, including sublevels.

## Filtering and Subscriptions
- Specific subscriptions reduce broker load.
  - Avoid using global `#` except for debugging or monitoring.
- Prefer `plant/+/machine4/sensor/temperature` over `plant/area1/#` if you only need one sensor.

## Security and Access Control
- Implement ACLs in the broker (Mosquitto, EMQX) to restrict topics.
- Assign read/write permissions per client:
  ``` 
  user sensor-node
  topic read plant/area1/+/sensor/#
  topic write plant/area1/+/actuator/#
  ```

## Practical Examples
```yaml
# Subscriber for all machine4 sensors
topic: "plant/+/machine4/sensor/#"
# Publisher for commands to a specific actuator
topic: "plant/area2/machine4/actuator/valve"
```

---
Ready for the next step? In the next installment, we'll dive deeper into Quality of Service (QoS) levels and how to choose the right one for your IIoT application.
