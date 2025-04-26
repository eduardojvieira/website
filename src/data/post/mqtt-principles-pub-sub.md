---
publishDate: 2025-04-23T00:00:00Z
author: Eduardo Vieira
title: "MQTT Principles: Publish/Subscribe, Brokers and Clients"
excerpt: Learn why MQTT is the de facto protocol for IIoT and how its publish/subscribe architecture works with brokers and clients.
image: '~/assets/images/industrial-automation.jpg'
category: IIoT
tags:
  - mqtt
  - IIoT
  - publish/subscribe
metadata:
  canonical: "https://eduardovieira.dev/mqtt-principles-pub-sub"
---

# MQTT Principles: Publish/Subscribe, Brokers and Clients

## Why MQTT?
MQTT is a lightweight messaging protocol designed for unreliable networks and constrained devices. It minimizes overhead while ensuring timely delivery, making it ideal for industrial IoT.

**Key Features:**
- Publish/Subscribe decouples producers (publishers) from consumers (subscribers).
- Brokers handle message routing and store messages if needed (retained messages).
- QoS levels guarantee delivery from at-most-once to exactly-once.

## Architecture Overview

1. **Publisher:** Sends messages to a topic without knowing recipients.
2. **Broker:** Central server routes messages based on topic subscriptions.
3. **Subscriber:** Receives messages for topics it has subscribed to.

```mermaid
flowchart LR
  Pub[Publisher] -->|"planta/area1/sensor"| Broker((Broker))
  Broker -->|"planta/area1/sensor"| Sub[Subscriber]
```

## Connecting as a Client
```python
import paho.mqtt.client as mqtt

def on_connect(client, userdata, flags, rc):
    print("Connected with code", rc)
    client.subscribe("planta/area1/sensor")

def on_message(client, userdata, msg):
    print(msg.topic, msg.payload)

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.tls_set()  # optional TLS
client.username_pw_set("user","pass")
client.connect("broker.local", 8883)
client.loop_forever()
```

## Advantages for IIoT
- Low bandwidth usage and small packet sizes.
- Supports intermittent connectivity and offline queuing.
- Simple API available in most languages and platforms.

## MQTT Topics and Hierarchies

Topics in MQTT follow a hierarchical structure using `/` delimiters:
- **Levels**: Each level defines a namespace segment (e.g., `planta/area1/maquina/sensor`).
- **Wildcards**: `+` matches a single level, `#` matches all remaining levels.

## Quality of Service (QoS) Levels

MQTT defines three QoS levels:
- **QoS 0 (At most once)**: No acknowledgment, best-effort delivery.
- **QoS 1 (At least once)**: Acknowledged delivery, may result in duplicates.
- **QoS 2 (Exactly once)**: Two-phase handshake ensures single delivery.

## Payload Formats

- **JSON** is the standard for IIoT payloads:
```json
{ "sensor_id": "S1", "value": 23.5, "unit": "°C" }
```
- Use binary or Protobuf for high-throughput or low-bandwidth scenarios.

## MQTT Versions: v3.1.1 vs v5

| Feature               | v3.1.1 | v5    |
|-----------------------|--------|-------|
| User Properties       | ❌     | ✅     |
| Shared Subscriptions  | ❌     | ✅     |
| Reason Codes          | ❌     | ✅     |

## Security Considerations

- **TLS/SSL**: Encrypt connections with certificates.
- **Authentication**: Username/password or client certificates.
- **Authorization (ACLs)**: Restrict topic access per client.

Understanding these principles is the first step to building reliable IIoT systems with MQTT.
