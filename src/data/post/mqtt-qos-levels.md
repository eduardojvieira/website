---
publishDate: 2025-05-07T00:00:00Z
author: Eduardo Vieira
title: "MQTT Quality of Service (QoS) Levels: Ensuring Delivery in IIoT"
excerpt: "Dive deep into MQTT QoS levels and how to choose the right one for your industrial solution."
image: '~/assets/images/mqtt-qos.jpg'
category: IIoT
tags:
  - mqtt
  - qos
  - IIoT
metadata:
  canonical: https://eduardovieira.dev/mqtt-qos-levels
---

# MQTT Quality of Service (QoS) Levels: Ensuring Delivery in IIoT

In IIoT environments, communications can be intermittent or critical. MQTT offers three QoS levels to balance reliability and performance.

## QoS 0: At most once
- Fire-and-forget delivery. The message is sent once and not retried.
- Useful for non-critical or high-frequency data (e.g., continuous telemetry).
- Does not guarantee delivery; messages may be lost.

## QoS 1: At least once
- Delivery with ACK; the publisher retries until confirmation is received.
- May produce duplicates; the subscriber must handle idempotence.
- Good balance between reliability and network load.

## QoS 2: Exactly once
- Four-step exchange (PUBLISH, PUBREC, PUBREL, PUBCOMP).
- Guarantees unique delivery without duplicates.
- Higher overhead; use only for critical transactions.

## Example with Paho-MQTT
```python
import paho.mqtt.client as mqtt

client = mqtt.Client()
client.connect("broker.local", 1883)

# Publish with QoS 2
topic = "plant/area1/sensor/temperature"
payload = "23.5"
client.publish(topic, payload, qos=2)
```

## How to Choose?
- QoS 0: High-frequency, loss-tolerant data.
- QoS 1: Important data that can tolerate duplicates.
- QoS 2: Critical transactions (control commands, billing).

---
In the next post, we'll explore payload formats (JSON vs. binary) and when to use them in IIoT.
